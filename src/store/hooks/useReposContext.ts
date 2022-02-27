import { Context, useContext, useState } from "react";

import { ApiResponse } from "@shared/store/ApiStore/types";
import { RepoItem } from "@store/GitHubStore/types";

import { GithubContextType, ReposContextType } from "./types";

const useReposContext = (
  context: Context<GithubContextType | null>
): ReposContextType => {
  const storeContext = useContext(context);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reposList, setReposList] = useState<RepoItem[]>([]);

  const loadRepos = async (
    value: string,
    page: number,
    perPage: number = 7
  ) => {
    storeContext?.store
      .getOrganizationReposList({
        organizationName: value,
        page,
        perPage,
      })
      .then((result: ApiResponse<RepoItem[], any>) => {
        if (page === 1) {
          setReposList(result.data);
        } else {
          setReposList(reposList.concat(result.data));
        }
        setIsLoading(false);
      });
  };

  return { reposList, isLoading, loadRepos };
};

export default useReposContext;
