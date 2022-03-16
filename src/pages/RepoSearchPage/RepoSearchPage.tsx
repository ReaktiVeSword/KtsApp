import { useCallback, useEffect } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile/Index";
import SearchIcon from "@components/SearchIcon";
import { StoreContext } from "@main/App";
import RootStore from "@shared/store/RootStore";
import useReposContext from "@store/hooks/useReposContext";
import { GithubRepoItemModel } from "@store/models/github/githubRepoItem";
import { Meta } from "@utils/meta";
import { urls } from "@utils/utils";
import { observer } from "mobx-react-lite";
import qs from "qs";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./RepoSearchPage.module.scss";

const RepoSearchPage: React.FC = () => {
  const store = useReposContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    queryParse();
  }, []);

  const queryParse = useCallback(() => {
    RootStore.query.setLocation(location.search);
    const parsed = RootStore.query.getParsed();
    if (parsed && parsed.search) {
      RootStore.query.setParam("search", parsed?.search.toString());
      store?.setInputValue(parsed?.search.toString());
    }
  }, []);

  const onClickRepo = useCallback(
    (repo: GithubRepoItemModel): (() => void) =>
      (): void => {
        navigate(urls.router.openRepo(repo.owner.login, repo.name));
      },
    []
  );

  const repoTiles = useCallback(() => {
    if (store?.isLoading()) {
      return <div>Ищем репозитории</div>;
    }
    try {
      return store?.repos.map((repo: GithubRepoItemModel): JSX.Element => {
        return (
          <RepoTile repoItem={repo} key={repo.id} onClick={onClickRepo(repo)} />
        );
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    }
  }, [store?.repos]);

  const searchOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      store?.setInputValue(value);
    },
    []
  );

  return (
    <>
      <div className={`${styles.reposList}`}>
        <div className={`${styles.reposList__search}`}>
          <Input
            value={store?.searchName}
            placeholder="Введите название организации"
            onChange={searchOnChange}
          />
          <Button onClick={store?.searchRepo}>
            <SearchIcon currentColor={"white"} />
          </Button>
        </div>
        <div className={`${styles.reposList__repos}`}>
          {store?.repos.length ? (
            <InfiniteScroll
              hasMore={true}
              loader={<div>Загрузка</div>}
              next={store?.nextRepos}
              dataLength={store?.repos.length}
            >
              {repoTiles()}
            </InfiniteScroll>
          ) : null}
          {store?.isError() ? (
            <div>Что-то пошло не так. Пожалуйста, перезагрузите страницу</div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default observer(RepoSearchPage);
