import { memo, useEffect, useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile/Index";
import SearchIcon from "@components/SearchIcon";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import useReposContext from "@store/hooks/useReposContext";
import { urls } from "@utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import { StoreContext } from "../../App";
import RepoBranchesDrawer from "./components/RepoBranchesDrawer";
import styles from "./RepoSearchPage.module.scss";

const gitHubStore = new GitHubStore();

const RepoSearchPage: React.FC = () => {
  type OwnerParams = {
    owner: string;
  };

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { owner } = useParams<keyof OwnerParams>() as OwnerParams;

  const { isLoading, reposList, loadRepos } = useReposContext(StoreContext);

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const searchRepo = async () => {
    if (inputValue !== "") {
      setPage(1);
      //await loadRepos(inputValue, 1);
      navigate(`/repos/${inputValue}`);
    }
  };

  const onClickRepo =
    (repo: RepoItem): (() => void) =>
    (): void => {
      navigate(urls.router.openRepo(repo.owner.login, repo.name));
    };

  const repoTiles = () => {
    if (isLoading) {
      return <div>Ищем репозитории</div>;
    } else if (reposList.length) {
      return reposList.map((repo: RepoItem): JSX.Element => {
        return (
          <RepoTile repoItem={repo} key={repo.id} onClick={onClickRepo(repo)} />
        );
      });
    }
    return null;
  };

  useEffect(() => {
    if (owner !== "") {
      setPage(1);
      loadRepos(owner, 1);
    }
  }, [owner]);

  const nextRepos = async () => {
    setPage(page + 1);
    await loadRepos(inputValue, page + 1);
  };
  return (
    <div>
      <div className={`${styles.reposList}`}>
        <div className={`${styles.reposList__search}`}>
          <Input
            value={inputValue}
            placeholder="Введите название организации"
            onChange={searchOnChange}
          />
          <Button onClick={searchRepo}>
            <SearchIcon />
          </Button>
        </div>
        <div className={`${styles.reposList__repos}`}>
          {reposList.length ? (
            <InfiniteScroll
              hasMore={true}
              loader={<div>Загрузка</div>}
              next={nextRepos}
              dataLength={reposList.length}
            >
              {repoTiles()}
            </InfiniteScroll>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(RepoSearchPage);
