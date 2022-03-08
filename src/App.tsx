import { createContext, useContext, useState } from "react";

import GitHubStore from "@store/GitHubStore";
import { GithubContextType } from "@store/hooks/types";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import RepoSearchPage from "./pages/RepoSearchPage";
import RepoBranchesDrawer from "./pages/RepoSearchPage/components/RepoBranchesDrawer";

export const StoreContext = createContext<GithubContextType | null>({
  store: new GitHubStore(),
});

export const useStoreContext = () => useContext(StoreContext);

function App() {
  const [gitHubStore] = useState(() => new GitHubStore());
  return (
    <StoreContext.Provider value={{ store: gitHubStore }}>
      <BrowserRouter>
        <Routes>
          <Route path="/repos/*" element={<RepoSearchPage />} />
          <Route path="/repos/:owner" element={<RepoSearchPage />} />
          <Route path="/repos/:owner/:repo" element={<RepoBranchesDrawer />} />
          <Route path="*" element={<Navigate to="/repos" />} />
        </Routes>
      </BrowserRouter>
    </StoreContext.Provider>
  );
}

export default App;
