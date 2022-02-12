import  ApiStore  from '../../shared/store/ApiStore/ApiStore';
import { HTTPMethod } from '../../shared/store/ApiStore/types';
import {ApiResp, GetOrganizationReposListParams, IGitHubStore, RepoItem} from "./types";

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore("https://api.github.com"); 

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {
        const requestParams = {
            method: HTTPMethod.GET,
            endpoint: "/orgs/" + params.organizationName + "/repos",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            data: {},
          };
          
          const test = await this.apiStore.request(requestParams);
          const result = test.data.map((elem: any) => {
            return {
              id: elem.id,
              name: elem.name,
              description: elem.description,
              stargazers_count: elem.stargazers_count,
              html_url: elem.stargazers_count,
              owner_login: elem.owner.login,
              avatar_url: elem.owner.avatar_url,
              owner_url: elem.owner.html_url,
            };
          });
      
          const response: ApiResp<RepoItem[]> = {
            success: true,
            data: result,
          };
      
          return response;
    }
}