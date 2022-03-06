export type GithubOwnerApi = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export type GithubOwnerModel = {
  id: number;
  login: string;
  avatarUrl: string;
  htmlUrl: string;
};

export const normalizeGithubOwnerModel = (
  from: GithubOwnerApi
): GithubOwnerModel => ({
  id: from.id,
  login: from.login,
  avatarUrl: from.avatar_url,
  htmlUrl: from.html_url,
});
