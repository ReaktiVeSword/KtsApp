import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

export type ReposContextType = {
  reposList: RepoItem[];
  isLoading: boolean;
  loadRepos: (value: string, page: number) => Promise<void>;
};

export type GithubContextType = {
  store: GitHubStore;
};
