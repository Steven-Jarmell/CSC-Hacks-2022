import React from "react";
import "./Filter.css";

type Props = {
  name: string;
  activeFilters: string[];
  setActiveFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

const Filter = ({ name, activeFilters, setActiveFilters }: Props) => {
  return (
    <div className="button-container">
      <div
        className="button-content"
        onClick={() =>
          setActiveFilters(
            activeFilters.filter((filterName) => {
              return filterName !== name;
            })
          )
        }
      >
        <div className="active-filter-item">{name}</div>
        <div className="close-button">X</div>
      </div>
    </div>
  );
};

export default Filter;
