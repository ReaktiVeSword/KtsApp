import { Context, useContext } from "react";

import ReposListStore from "@store/ReposListStore";

import { GithubContextType } from "./types";

const useReposContext = (
  context: Context<GithubContextType | null>
): ReposListStore | undefined => {
  const storeContext = useContext(context);
  return storeContext?.repoList;
};

export default useReposContext;
