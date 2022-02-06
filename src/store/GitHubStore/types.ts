export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>>;
}

// Параметры запроса
export type GetOrganizationReposListParams = {
    organizationName: string;
  };
  
export type RepoItem = {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    html_url: string;
    owner_login: string;
    updated_at: string;
    avatar_url: string;
    owner_url: string;
};

export type ApiResp<RepoItem> =
  | {
      success: true;
      data: RepoItem;
    }
  | {
      success: false;
      data: any;
    };