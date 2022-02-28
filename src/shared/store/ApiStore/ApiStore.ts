import qs from "qs";

import {
  ApiResponse,
  HTTPMethod,
  IApiStore,
  RequestParams,
  StatusHTTP,
} from "./types";

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getRequestData<ReqT>(
    params: RequestParams<ReqT>
  ): [string, RequestInit] {
    let endPoint = `${this.baseUrl}${params.endpoint}`;
    const req: RequestInit = {
      method: params.method,
      headers: { ...params.headers },
    };

    if (params.method === HTTPMethod.GET) {
      if (Object.keys(params.data).length !== 0) {
        endPoint = `${endPoint}?${qs.stringify(params.data)}`;
      } else {
        endPoint = `${endPoint}`;
      }
    } else if (params.method === HTTPMethod.POST) {
      req.body = JSON.stringify(params.data);
      req.headers = {
        ...params.headers,
        "Content-Type": "application/json;charset=UTF-8",
      };
    }

    return [endPoint, req];
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    try {
      const response = await fetch(...this.getRequestData(params));
      return {
        success: response.ok,
        data: await response.json(),
        status: response.status,
      };
    } catch (e) {
      return {
        success: false,
        data: e,
        status: StatusHTTP.BadRequest,
      };
    }
  }
}
