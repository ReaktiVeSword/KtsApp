import { createContext } from "react";

import useQueryStore from "@shared/hooks/useQueryStore";
import BranchListStore from "@store/BranchListStore";
import { GithubContextType } from "@store/hooks/types";
import ReposListStore from "@store/ReposListStore";
import { useLocalObservable } from "mobx-react-lite";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RepoSearchPage from "./pages/RepoSearchPage";
import RepoBranchesDrawer from "./pages/RepoSearchPage/components/RepoBranchesDrawer";

export const StoreContext = createContext<GithubContextType | null>(null);
const Provider = StoreContext.Provider;

function App() {
  useQueryStore();
  const repoList = useLocalObservable(() => new ReposListStore());
  const branchList = useLocalObservable(() => new BranchListStore());

  return (
    <Provider
      value={{
        repoList,
        branchList,
      }}
    >
      <Routes>
        <Route path="/repos/*" element={<RepoSearchPage />} />
        {/* <Route path="/repos/:owner" element={<RepoSearchPage />} />
          <Route path="/repos/:owner/:repo" element={<RepoBranchesDrawer />} /> */}
        <Route path="*" element={<Navigate to="/repos" />} />
      </Routes>
    </Provider>
  );
}

export default App;
