import React from "react";
import "./Filter.css";

type Props = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const Filter = ({ filter, setFilter }: Props) => {
  return (
    <div className="button-container">
      <div className="button-content" onClick={() => setFilter("")}>
        <div className="active-filter-item">{filter}</div>
        <div className="close-button">X</div>
      </div>
    </div>
  );
};

export default Filter;
