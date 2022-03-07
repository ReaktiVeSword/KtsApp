import { Context, useContext, useState } from "react";

import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

import { ReposContextType } from "./types";

const useReposContext = (): ReposContextType => {
  const store = new GitHubStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reposList, setReposList] = useState<RepoItem[]>([]);

  const loadRepos = async (
    value: string,
    page: number,
    perPage: number = 7
  ) => {
    try {
      store
        .getOrganizationReposList({
          organizationName: value,
          page,
          perPage,
        })
        .then((result: ApiResponse<RepoItem[], any>) => {
          setIsLoading(true);
          if (page === 1) {
            setReposList(result.data);
          } else {
            setReposList(reposList.concat(result.data));
          }
          setIsLoading(false);
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return { reposList, isLoading, loadRepos };
};

export default useReposContext;
