import React from "react";
import "./Filter.css";

type Props = { name: string };

const Filter = ({ name }: Props) => {
  return <span className="active-filter-item">{name}</span>;
};

export default Filter;
