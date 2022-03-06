import RepoTile from '@components/RepoTile/RepoTile';
import SearchIcon from '@components/SearchIcon';
import RootStore from '@shared/store/RootStore';
import useReposContext from '@store/hooks/useReposContext';
import { GithubRepoItemModel } from '@store/models/github/githubRepoItem';
import { Meta } from '@utils/meta';
import { urls } from '@utils/utils';
import { Input, Button, Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import qs from 'qs';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from 'src/App';
import RepoBranchesDrawer from './components/RepoBranchesDrawer';
import styles from './RepoSearchPage.module.scss';

const RepoSearchPage: React.FC = () => {
  const store = useReposContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const parsed = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    queryParse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryParse = () => {
    if (parsed && parsed.search) {
      RootStore.query.setParam('search', parsed?.search.toString());
      store?.setInputValue(parsed?.search.toString());
    }
  };

  const onClickRepo =
    (repo: GithubRepoItemModel): (() => void) =>
      (): void => {
        navigate(urls.router.openRepo(repo.owner.login, repo.name));
      };

  const repoTiles = () => {
    if (store?.meta === Meta.loading) {
      return <div>Ищем репозитории</div>;
    } else if (store?.repos.length) {
      return store?.repos.map(
        (repo: GithubRepoItemModel): JSX.Element => {
          return (
            <RepoTile
              repoItem={repo}
              key={repo.id}
              onClick={onClickRepo(repo)}
            />
          );
        }
      );
    }
    return null;
  };

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    store?.setInputValue(value);
  };

  return (
    <>
      <div className={`${styles.reposList}`}>
        <div className={`${styles.reposList__search}`}>
          <Input
            value={store?.searchName}
            placeholder='Введите название организации'
            onChange={searchOnChange}
          />
          <Button onClick={store?.searchRepo}>
            <SearchIcon currentColor={'white'} />
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
          {store?.meta === Meta.error ? (
            <div>
              Что-то пошло не так. Пожалуйста, перезагрузите
              страницу
            </div>
          ) : null}
        </div>
      </div>
      <Routes>
        <Route
          path='/repos/:owner/:repo'
          element={RepoBranchesDrawer}
        />
      </Routes>
    </>
  );
};

export default observer(RepoSearchPage);