import qs from "qs";

import {
  ApiResponse,
  IApiStore,
  RequestParams,
  StatusHTTP,
  HTTPMethod,
} from "./types";

export default class ApiStore implements IApiStore {

    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    
    getconsole(str: string): string {
        throw new Error("Method not implemented.");
    }

    request<SuccessT, ErrorT = any, ReqT = {}>(
        params: RequestParams<ReqT>
      ): Promise<ApiResponse<SuccessT, ErrorT>> {
          try {
              let urlForRequest: string;
              if (params.method === HTTPMethod.GET && params.data) {
                  const resolveAddress: string = `?${qs.stringify(params.data)}`;
                  urlForRequest = this.baseUrl + params.endpoint + resolveAddress;
                } else {
                    urlForRequest = this.baseUrl + params.endpoint;
                }
                return fetch(urlForRequest, {
                    method: params.method,
                    headers: params.headers,
                })
                .then((response) => {
                    const data = response.json();
                    return data;
                })
                .then((data) => {
                    return { success: true, data: data, status: StatusHTTP.OK };
                });
            } catch (e) {
                return new Promise(() => {
                    return { success: false, data: null, status: StatusHTTP.BadRequest };
                });
            }
        }
    }