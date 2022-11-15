import { useEffect, useState } from "react";
import { FilterData } from "../Types/FilterData";
import FilterDropdown from "./FilterDropdown";
import "./FilterFrame.css";

const FilterFrame = () => {
  // Get filters object from API here and then use each filter type to create our filters
  const [filterData, setFilterData] = useState<FilterData[]>([]);

  const URL = "/Filters.json";

  // Use fetch because this will later be used dynamically
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
      <form action="" method="" id="filter-form">
        <h1 className="filter-title">Filter</h1>
        {filterData
          ? filterData.map((entry, i) => (
              <div key={i} className="select-container">
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
};

export default FilterFrame;
