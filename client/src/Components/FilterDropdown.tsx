import React, { PropsWithChildren } from "react";
import "./FilterDropdown.module.css";
import { FilterData } from "../Types/FilterData";

class FilterDropdown extends React.Component {
  data: FilterData;

  constructor(props: any) {
    super(props);
    this.data = props.data;
  }

  render() {
    return (
      <select name={this.data.filterName} className="selectFilter"></select>
    );
  }
}

export default FilterDropdown;
