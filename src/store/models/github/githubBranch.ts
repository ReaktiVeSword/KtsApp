import { CollectionT } from "@utils/collection";

export type GithubBranchItemApi = {
  name: string;
};

export type GithubBranchItemModel = {
  name: string;
};

export const normalizeGithubBranchItem = (
  from: GithubBranchItemApi
): GithubBranchItemModel => ({
  name: from.name,
});

export const normalizeCollectionGithubBranchItemModel = (
  fromList: GithubBranchItemApi[]
): CollectionT<string, GithubBranchItemModel> => {
  return {
    order: fromList.map((item) => item.name),
    entities: fromList.reduce(
      (prev, item) => ({
        ...prev,
        [item.name]: normalizeGithubBranchItem(item),
      }),
      {}
    ),
  };
};
