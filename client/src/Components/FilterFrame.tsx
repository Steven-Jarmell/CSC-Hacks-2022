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

  // Needs to set each of the filters and then filter
  // the data on a NEW set of data
  const handleSubmit = (e: any) => {
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((allData) => {
        e.preventDefault();

        let newData: JobEntry[] = allData;
        let [companyName, location, jobDescription, jobStatus] = activeFilters;

        console.log(String(allData[4].status).toLowerCase());

        // Now perform the filtering by applying the filter if it is not
        // an empty string

        if (location !== "") {
          newData = allData.filter((job: JobEntry) => {
            return job.locations.indexOf(location.toUpperCase()) !== -1;
          });
        }

        if (companyName !== "") {
          newData = allData.filter((job: JobEntry) => {
            return job.companyName.toLowerCase() === companyName.toLowerCase();
          });
        }

        if (jobDescription !== "") {
          newData = allData.filter((job: JobEntry) => {
            return job.description.includes(jobDescription.toLowerCase());
          });
        }

        if (jobStatus !== "") {
          newData = allData.filter((job: JobEntry) => {
            return (
              (job.status && jobStatus.toLowerCase() === "open") ||
              (!job.status && jobStatus.toLowerCase() === "closed")
            );
          });
        }

        // Set the backendData (data displayed) if the result did not change
        if (newData !== allData) setBackendData(newData);
      });
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
                  setFilter={activeFilterSetters[i]}
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
