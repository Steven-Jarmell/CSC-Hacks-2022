import { useEffect, useState } from "react";
import { FilterData } from "../Types/FilterData";
import FilterDropdown from "./FilterDropdown";
import "./FilterFrame.css";

function FilterFrame() {
  // Get filters object from API here and then use each filter type to create our filters
  const [filterData, setFilterData] = useState<FilterData[]>([]);

  const URL = "/Filters.json";

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFilterData(data);
      });
  }, []);

  return (
    //TODO: Add endpoint for filter post request
    <div id="form-container">
      <h1 className="filter-title">Filter</h1>
      <form action="" method="post" id="filter-form">
        {filterData
          ? filterData.map((entry) => (
              <div className="select-container">
                <h3>{entry.filterName}</h3>
                <FilterDropdown
                  name={entry.filterName}
                  options={entry.options}
                />
              </div>
            ))
          : "Loading Filters..."}

        <input type="submit" value="Search" id="form-submit" />
      </form>
    </div>
  );
}

export default FilterFrame;
