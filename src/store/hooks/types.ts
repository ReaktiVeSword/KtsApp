import BranchListStore from "@store/BranchListStore";
import { RepoItem } from "@store/models/types";
import ReposListStore from "@store/ReposListStore";

export type ReposContextType = {
  reposList: RepoItem[];
  isLoading: boolean;
  loadRepos: (value: string, page: number) => Promise<void>;
};

export type GithubContextType = {
  repoList: ReposListStore;
  branchList: BranchListStore;
};
