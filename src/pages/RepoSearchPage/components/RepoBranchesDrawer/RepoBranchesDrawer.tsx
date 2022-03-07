import { memo, useEffect, useState } from "react";

import "antd/dist/antd.css";
import { useStoreContext } from "@main/App";
import { ApiResponse } from "@shared/store/ApiStore/types";
import { Drawer } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { BranchItem, RepoItem } from "src/store/GitHubStore/types";

import styles from "./RepoBranchesDrawer.module.scss";

const RepoBranchesDrawer: React.FC = () => {
  const storeContext = useStoreContext();
  const navigator = useNavigate();

  type OwnerRepoParams = {
    owner: string;
    repo: string;
  };

  const { owner, repo } = useParams<keyof OwnerRepoParams>() as OwnerRepoParams;
  const [branchList, setBranchList] = useState<BranchItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      storeContext?.store
        .getReposBranchesList({
          ownerName: owner,
          repoName: repo,
        })
        .then((result: ApiResponse<BranchItem[], any>) => {
          setBranchList(result.data);
          setIsLoading(false);
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [owner, repo]);

  const onClose = () => {
    navigator(-1);
  };

  return (
    <Drawer
      title="Ветки репозитория"
      placement="left"
      onClose={onClose}
      visible={true}
    >
      {isLoading ? (
        <div>Загружаем ветки</div>
      ) : (
        branchList.map(
          (branch: BranchItem): JSX.Element => (
            <div
              className={`${styles.repoBranchesDrawer__item}`}
              key={branch.name}
            >
              {branch.name}
            </div>
          )
        )
      )}
    </Drawer>
  );
};

export default memo(RepoBranchesDrawer);
