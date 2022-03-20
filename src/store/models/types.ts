export type GetOrganizationReposListParams = {
  organizationName: string;
  page: number;
};

export type GetReposBranchesListParams = {
  ownerName: string;
  repoName: string;
};

export type GithubRepoOwner = {
  id: number;
  html_url: string;
  avatar_url: string;
  login: string;
};

export type RepoItem = {
  id: number;
  url: string;
  name: string;
  stargazers_count: number;
  updated_at: string;
  owner: GithubRepoOwner;
};

export type BranchItem = {
  name: string;
};

export interface IGitHubStore {
  getOrganizationReposList?(
    params: GetOrganizationReposListParams
  ): Promise<void>;

  getReposBranchesList?(params: GetReposBranchesListParams): Promise<void>;
}
