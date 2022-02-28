import React, { useEffect, useState } from "react";

import "./RepoBranchesDrawer.css";
import "antd/dist/antd.css";
import GitHubStore from "@store/GitHubStore";
import { Drawer } from "antd";
import { ApiResponse } from "src/shared/store/ApiStore/types";
import { BranchItem, RepoItem } from "src/store/GitHubStore/types";

export type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem | null;
  onClose: () => void;
};

const gitHubStore = new GitHubStore();

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  onClose,
}): JSX.Element => {
  const [branchList, setBranchList] = useState<BranchItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (selectedRepo) {
        setIsLoading(true);
        gitHubStore
          .getReposBranchesList({
            ownerName: selectedRepo.owner.login,
            repoName: selectedRepo.name,
          })
          .then((result: ApiResponse<BranchItem[], any>) => {
            setBranchList(result.data);
            setIsLoading(false);
          });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [selectedRepo]);

  return (
    <Drawer
      title="Ветки репозитория"
      placement="left"
      onClose={onClose}
      visible={selectedRepo !== null}
    >
      {isLoading ? (
        <div>Загружаем ветки</div>
      ) : (
        branchList.map(
          (branch: BranchItem): JSX.Element => (
            <div className="repo-branches-drawer__item" key={branch.name}>
              {branch.name}
            </div>
          )
        )
      )}
    </Drawer>
  );
};

export default React.memo(RepoBranchesDrawer);
