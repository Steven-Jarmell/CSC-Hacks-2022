import React, { useState } from "react";
import "./FilterDropdown.css";

const FilterDropdown = (props: any) => {
  const [name, setName] = useState<string>(props.name);
  const [options, setOptions] = useState<string[]>(props.options);

  return (
    <select name={name} className="select-options">
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
