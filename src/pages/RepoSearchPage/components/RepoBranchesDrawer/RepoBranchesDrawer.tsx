import { useEffect } from "react";

import useBranchesContext from "@shared/hooks/useBranchesContext";
import { BranchItem } from "@store/models/types";
import { Meta } from "@utils/meta";
import { Drawer } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

import { StoreContext } from "../../../../App";
import styles from "./RepoBranchesDrawer.module.scss";

type OwnerRepoParams = {
  owner: string;
  repo: string;
};

const RepoBranchesDrawer: React.FC = () => {
  const navigator = useNavigate();
  const store = useBranchesContext(StoreContext);

  const { owner, repo } = useParams<keyof OwnerRepoParams>() as OwnerRepoParams;

  useEffect(() => {
    store?.getReposBranchesList({
      ownerName: owner,
      repoName: repo,
    });
  }, [store, owner, repo]);

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
      {store?.meta === Meta.loading ? (
        <div>Загружаем ветки</div>
      ) : store?.meta === Meta.error ? (
        <div>Что-то пошло не так. Пожалуйста, перезагрузите страницу</div>
      ) : (
        store?.branches?.map((branch: BranchItem) => (
          <div
            className={`${styles.repoBranchesDrawer__item}`}
            key={branch.name}
          >
            {branch.name}
          </div>
        ))
      )}
    </Drawer>
  );
};

export default observer(RepoBranchesDrawer);
