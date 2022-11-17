import { resolve } from "path";
import React, { useEffect, useState } from "react";
import { FilterData } from "../Types/FilterData";
import { JobEntry } from "../Types/JobEntry";
import FilterDropdown from "./FilterDropdown";
import "./FilterFrame.css";

// Serves as the frame for the filtering component
// This is to be used as the big picture component
// that contains all other relevant components to filtering

type Props = {
  activeFilters: string[];
  activeFilterSetters: React.Dispatch<React.SetStateAction<string>>[];
  setBackendData: React.Dispatch<React.SetStateAction<JobEntry[]>>;
  api: string;
};

const FilterFrame = ({
  activeFilters,
  activeFilterSetters,
  setBackendData,
  api,
}: Props) => {
  // Get filters object from API here and then use each filter type to create our filters
  const [filterData, setFilterData] = useState<FilterData[]>([]);

  // Had to set local states of the filter
  const [company, setCompany] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // Change to be API endpoint when implemented
  const URL = "/Filters.json";

  // Gets the filter options for the dropdowns
  useEffect(() => {
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFilterData(data);
      });
  }, []);

  // Needs to set each of the App scale filters
  const handleSubmit = (e: any) => {
    e.preventDefault();
    activeFilterSetters[0](company);
    activeFilterSetters[1](location);
    activeFilterSetters[2](description);
    activeFilterSetters[3](status);
  };

  return (
    <div id="form-container">
      <form id="filter-form" onSubmit={handleSubmit}>
        <h1 className="filter-title">Filter</h1>
        {filterData
          ? filterData.map((entry, i) => (
              <div key={i} className="select-container">
                <h3>{entry.filterName}</h3>
                <FilterDropdown
                  name={entry.filterName}
                  options={entry.options}
                  setFilter={
                    i === 0
                      ? setCompany
                      : i === 1
                      ? setLocation
                      : i === 2
                      ? setDescription
                      : setStatus
                  }
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
