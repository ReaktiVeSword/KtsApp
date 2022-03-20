import { Context, useContext } from "react";

import BranchListStore from "@store/BranchListStore";
import { GithubContextType } from "@store/hooks/types";

const useBranchesContext = (
  context: Context<GithubContextType | null>
): BranchListStore | undefined => {
  const storeContext = useContext(context);
  return storeContext?.branchList;
};

export default useBranchesContext;
