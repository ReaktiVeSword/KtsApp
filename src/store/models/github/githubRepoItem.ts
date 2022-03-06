import { CollectionT } from "@utils/collection";

import {
  GithubOwnerApi,
  GithubOwnerModel,
  normalizeGithubOwnerModel,
} from "./githubOwner";

export type GithubRepoItemApi = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  owner: GithubOwnerApi;
};

export type GithubRepoItemModel = {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  stargazersCount: number;
  updatedAt: Date;
  owner: GithubOwnerModel;
};

export const normalizeGithubRepoItemModel = (
  from: GithubRepoItemApi
): GithubRepoItemModel => ({
  id: from.id,
  name: from.name,
  description: from.description,
  htmlUrl: from.html_url,
  stargazersCount: from.stargazers_count,
  updatedAt: new Date(from.updated_at),
  owner: normalizeGithubOwnerModel(from.owner),
});

export const normalizeCollectionGithubRepoItemModel = (
  fromList: GithubRepoItemApi[]
): CollectionT<number, GithubRepoItemModel> => {
  return {
    order: fromList.map((item) => item.id),
    entities: fromList.reduce(
      (prev, item) => ({
        ...prev,
        [item.id]: normalizeGithubRepoItemModel(item),
      }),
      {}
    ),
  };
};
