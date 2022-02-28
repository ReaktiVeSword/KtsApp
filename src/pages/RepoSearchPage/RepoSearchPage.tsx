import React from "react";
import { useState } from "react";
import "./RepoSearchPage.css";

import RepoTile from "@components/RepoTile/Index";
import Searchbar from "@components/Searchbar";
import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

import RepoBranchesDrawer from "./components/RepoBranchesDrawer";

const gitHubStore = new GitHubStore();

const RepoSearchPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [reposList, setReposList] = useState<RepoItem[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const searchRepo = () => {
    try {
      if (inputValue !== "") {
        setIsLoading(true);
        gitHubStore
          .getOrganizationReposList({
            organizationName: inputValue,
          })
          .then((result: ApiResponse<RepoItem[], any>) => {
            setReposList(result.data);
            setIsLoading(false);
          });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const onClickRepo = (repo: RepoItem) => setSelectedRepo(repo);

  const onClose = () => {
    setSelectedRepo(null);
  };

  const repoTiles = isLoading ? (
    <div>Ищем репозитории</div>
  ) : (
    reposList.map((repo: RepoItem): JSX.Element => {
      return (
        <RepoTile
          key={repo.id}
          repoItem={repo}
          onClick={() => onClickRepo(repo)}
        />
      );
    })
  );

  return (
    <div className={"repos-list"}>
      <Searchbar
        inputValue={inputValue}
        searchOnChange={searchOnChange}
        searchRepo={searchRepo}
      />
      <div className={"repos-list__repos"}>{repoTiles}</div>
      <RepoBranchesDrawer selectedRepo={selectedRepo} onClose={onClose} />
    </div>
  );
};

export default React.memo(RepoSearchPage);
