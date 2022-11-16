import React, { useEffect } from "react";
import { JobEntry } from "../Types/JobEntry";
import "./FilterDropdown.css";

type Props = {
  name: string;
  options: string[];
  formInput: React.Dispatch<React.SetStateAction<string>>;
  backendData?: JobEntry[];
};

const FilterDropdown = ({ name, options, formInput, backendData }: Props) => {
  useEffect(() => {}, [backendData]);
  return (
    <select
      name={name}
      className="select-options"
      onChange={(event) => formInput(event.target.value)}
    >
      <option value="">Select...</option>
      {options.map((option, i) => (
        <option key={i} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
