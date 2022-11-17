import React, { useEffect } from "react";
import { JobEntry } from "../Types/JobEntry";
import "./FilterDropdown.css";

// This component serves as each individual
// dropdown for selecting filters

type Props = {
  name: string;
  options: string[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const FilterDropdown = ({ name, options, setFilter }: Props) => {
  return (
    <select
      name={name}
      className="select-options"
      onChange={(event) => setFilter(event.target.value)}
    >
      <option value="">Select...</option>
      {options.map((option, i) => (
        <option
          key={i}
          value={name === "Location" ? option : option.toLowerCase()}
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
