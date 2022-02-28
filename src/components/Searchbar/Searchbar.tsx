import React from "react";

import "./Searchbar.css";
import Button from "@components/Button";
import Input from "@components/Input";
import SearchIcon from "@components/SearchIcon";

export type SearchbarProps = {
  inputValue: string;
  searchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchRepo?: (e: React.MouseEvent) => void;
  disabled?: boolean;
};

const Searchbar: React.FC<SearchbarProps> = ({
  inputValue,
  searchOnChange,
  searchRepo,
  disabled,
}): JSX.Element => {
  return (
    <div className="searchbar">
      <div>
        <Input
          value={inputValue}
          placeholder="Введите название организации"
          onChange={searchOnChange}
        />
      </div>
      <Button onClick={searchRepo} disabled={disabled}>
        <SearchIcon currentColor="white" />
      </Button>
    </div>
  );
};

export default React.memo(Searchbar);
