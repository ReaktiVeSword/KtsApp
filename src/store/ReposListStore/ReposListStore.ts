import { ILocalStore } from "@shared/hooks/useLocalStore";
import RootStore from "@shared/store/RootStore";
import { HTTPMethod } from "@shared/store/RootStore/ApiStore/types";
import {
  GithubRepoItemApi,
  GithubRepoItemModel,
  normalizeGithubRepoItemModel,
} from "@store/models/github/githubRepoItem";
import {
  GetOrganizationReposListParams,
  IGitHubStore,
} from "@store/models/types";
import {
  CollectionT,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@utils/collection";
import { Meta } from "@utils/meta";
import { urls } from "@utils/utils";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_repos" | "_meta";

export default class ReposListStore implements IGitHubStore, ILocalStore {
  private _repos: CollectionT<number, GithubRepoItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  public page = 1;
  public searchName = "";

  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _repos: observable.ref,
      _meta: observable,
      repos: computed,
      getOrganizationReposList: action,
      nextRepos: action.bound,
      searchRepo: action.bound,
      setInputValue: action.bound,
      page: observable,
      searchName: observable,
    });
  }

  get repos(): GithubRepoItemModel[] {
    return linearizeCollection(this._repos);
  }

  isLoading(): boolean {
    return this._meta === Meta.loading;
  }

  isError(): boolean {
    return this._meta === Meta.error;
  }

  async nextRepos(): Promise<void> {
    runInAction(() => {
      this.page++;
      this.getOrganizationReposList({
        organizationName: this.searchName,
        page: this.page,
      });
    });
  }

  async searchRepo(): Promise<void> {
    runInAction(() => {
      this._repos = getInitialCollectionModel();
      this._meta = Meta.loading;
      this.page = 1;
      this.getOrganizationReposList({
        organizationName: this.searchName,
        page: this.page,
      });
    });
  }

  setInputValue(value: string): void {
    this.searchName = value;
    RootStore.query.setParam("search", this.searchName);
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    const response = await RootStore.api.request<GithubRepoItemApi[]>({
      method: HTTPMethod.GET,
      data: {
        per_page: 7,
        page: params.page,
      },
      headers: {},
      endpoint: urls.api.orgRepos(params.organizationName),
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        const repos: GithubRepoItemModel[] = [];
        for (const item of response.data) {
          repos.push(normalizeGithubRepoItemModel(item));
        }
        const prev = linearizeCollection(this._repos);
        const all = prev.concat(repos);
        this._meta = Meta.success;
        this._repos = normalizeCollection(all, (RepoItem) => RepoItem.id);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._repos = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {
    this._repos = getInitialCollectionModel();
    this._meta = Meta.initial;
    this.page = 1;
    this.searchName = "";
  }
}
