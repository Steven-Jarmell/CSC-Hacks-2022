import React, { useEffect, useState } from "react";
import JobPosting from "./Components/JobPosting";
import { JobEntry } from "./Types/JobEntry";
import FilterFrame from "./Components/FilterFrame";
import Filter from "./Components/Filter";
import { ActiveFilters } from "./Types/ActiveFilters";
import "./App.css";

function App() {
  const [backendData, setBackendData] = useState<JobEntry[]>([]);
  const [activeFilters, setactiveFilters] = useState<ActiveFilters>(
    {} as ActiveFilters
  );

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

  return (
    <div id="body-container">
      <div className="job-postings-container">
        <div id="active-filters-container">
          {activeFilters === ({} as ActiveFilters) ? (
            Object.values(activeFilters).map((name) => (
              <React.Fragment>
                <Filter name={name}></Filter>
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
