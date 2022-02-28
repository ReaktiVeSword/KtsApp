import React from "react";
import "./Input.css";

export type InputProps = {
  value: string;
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
      className={"input"}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default React.memo(Input);
