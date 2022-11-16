import React, { useEffect, useState } from "react";
import JobPosting from "./Components/JobPosting";
import { JobEntry } from "./Types/JobEntry";
import FilterFrame from "./Components/FilterFrame";
import Filter from "./Components/Filter";
import "./App.css";

function App() {
  const [backendData, setBackendData] = useState<JobEntry[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const URL = "http://localhost:5000/api/jobs";

  // Used to fetch the initial data
  useEffect(() => {
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  // Filter jobs data whenever activeFilters is modified
  useEffect(() => {}, [activeFilters]);

  return (
    <div id="body-container">
      <div className="job-postings-container">
        <div id="active-filters-container">
          {activeFilters ? (
            activeFilters.map((name, i) => (
              <React.Fragment key={i}>
                <Filter
                  name={name}
                  setActiveFilters={setActiveFilters}
                  activeFilters={activeFilters}
                ></Filter>
              </React.Fragment>
            ))
          ) : (
            <h3 className="job-postings-filter">No Filters Added</h3>
          )}
        </div>
        <div className="all-jobs-container">
          {backendData
            ? backendData.map((entry, i) => (
                <React.Fragment key={i}>
                  {
                    <JobPosting
                      companyName={entry.companyName}
                      link={entry.link}
                      status={entry.status}
                      locations={entry.locations}
                      sponsorship={entry.sponsorship}
                      description={entry.description}
                    />
                  }
                </React.Fragment>
              ))
            : "Loading..."}
        </div>
      </div>
      <FilterFrame backendData={backendData} setBackendData={setBackendData} />
    </div>
  );
}

export default App;
