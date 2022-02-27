import { ApiResponse } from "src/shared/store/ApiStore/types";

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], any>>;

  getReposBranchesList(
    params: GetReposBranchesListParams
  ): Promise<ApiResponse<RepoItem[], any>>;
}

// Параметры запроса
export type GetOrganizationReposListParams = {
  organizationName: string;
  page: number;
  perPage: number;
};

export type GetReposBranchesListParams = {
  ownerName: string;
  repoName: string;
};

export type RepoItem = {
  id: number;
  url: string;
  name: string;
  stargazers_count: number;
  updated_at: string;
  owner: GithubRepoOwner;
};

export type GithubRepoOwner = {
  id: number;
  html_url: string;
  avatar_url: string;
  login: string;
};

export type BranchItem = {
  name: string;
};
