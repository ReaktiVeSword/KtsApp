import React from "react";

import styles from "./Input.module.scss";

export type InputProps = {
  value?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  onChange,
}): JSX.Element => {
  return (
    <input
      className={`${styles.input}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default React.memo(Input);
