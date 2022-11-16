import React from "react";
import "./Filter.css";

type Props = { name: string };

const Filter = ({ name }: Props) => {
  return (
    <div className="button-container">
      <div className="button-content">
        <div className="active-filter-item">{name}</div>
        <div className="close-button">X</div>
      </div>
    </div>
  );
};

export default Filter;
