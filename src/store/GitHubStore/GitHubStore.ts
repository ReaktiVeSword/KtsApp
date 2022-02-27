import { urls } from "@utils/utils";

import ApiStore from "../../shared/store/ApiStore/ApiStore";
import { ApiResponse, HTTPMethod } from "../../shared/store/ApiStore/types";
import {
  GetOrganizationReposListParams,
  GetReposBranchesListParams,
  IGitHubStore,
  RepoItem,
} from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore("https://api.github.com");

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], any>> {
    return await this.apiStore.request({
      method: HTTPMethod.GET,
      data: {
        per_page: params.perPage,
        page: params.page,
      },
      headers: {},
      endpoint: urls.api.orgRepos(params.organizationName),
    });
  }

  async getReposBranchesList(
    params: GetReposBranchesListParams
  ): Promise<ApiResponse<RepoItem[], any>> {
    return await this.apiStore.request({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: urls.api.repoBranches(params.ownerName, params.repoName),
    });
  }
}
