import { ILocalStore } from "@shared/hooks/useLocalStore";
import RootStore from "@shared/store/RootStore";
import { HTTPMethod } from "@shared/store/RootStore/ApiStore/types";
import {
  GithubBranchItemApi,
  GithubBranchItemModel,
  normalizeCollectionGithubBranchItemModel,
} from "@store/models/github/githubBranch";
import { GetReposBranchesListParams, IGitHubStore } from "@store/models/types";
import {
  CollectionT,
  getInitialCollectionModel,
  linearizeCollection,
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

type PrivateFields = "_branches" | "_meta";

export default class BranchListStore implements IGitHubStore, ILocalStore {
  private _branches: CollectionT<string, GithubBranchItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<BranchListStore, PrivateFields>(this, {
      _branches: observable.ref,
      _meta: observable,
      branches: computed,
      meta: computed,
      getReposBranchesList: action,
    });
  }

  get branches(): GithubBranchItemModel[] {
    return linearizeCollection(this._branches);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getReposBranchesList(
    params: GetReposBranchesListParams
  ): Promise<void> {
    const response = await RootStore.api.request<GithubBranchItemApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: urls.api.repoBranches(params.ownerName, params.repoName),
    });
    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        this._meta = Meta.success;
        this._branches = normalizeCollectionGithubBranchItemModel(
          response.data
        );
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._branches = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {
    this._branches = getInitialCollectionModel();
    this._meta = Meta.initial;
  }
}
