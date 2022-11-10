import React from "react";
import "./FilterDropdown.css";

class FilterDropdown extends React.Component<any> {
  name: string;
  options: string[];

  constructor(props: any) {
    super(props);
    this.name = props.name;
    this.options = props.options;
  }

  render(): React.ReactNode {
    return (
      <select name={this.name} className="select">
        {this.options.map((option) => (
          <option value={option.toLowerCase()}>{option}</option>
        ))}
      </select>
    );
  }
}

export default FilterDropdown;
