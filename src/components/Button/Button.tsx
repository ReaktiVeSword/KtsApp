import React from "react";

import styles from "./Button.module.scss";

export type SearchButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
};

const Button: React.FC<React.PropsWithChildren<SearchButtonProps>> = ({
  onClick,
  children,
  disabled,
}): JSX.Element => {
  return (
    <button
      className={`${styles.button}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
