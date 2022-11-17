import React, { useEffect, useState } from "react";
import JobPosting from "./Components/JobPosting";
import { JobEntry } from "./Types/JobEntry";
import FilterFrame from "./Components/FilterFrame";
import Filter from "./Components/Filter";
import "./App.css";

function App() {
  const [backendData, setBackendData] = useState<JobEntry[]>([]);

  // States for tracking what our set filter currently is
  const [company, setCompany] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // Filter state set in array to make it easier to loop
  let activeFilters = [company, location, description, status];
  let activeFilterSetters = [
    setCompany,
    setLocation,
    setDescription,
    setStatus,
  ];

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
  useEffect(() => {
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((allData) => {
        let newData: JobEntry[] = allData;

        console.log(String(allData[4].status).toLowerCase());

        // Now perform the filtering by applying the filter if it is not
        // an empty string

        if (location !== "") {
          newData = allData.filter((job: JobEntry) => {
            return job.locations.indexOf(location.toUpperCase()) !== -1;
          });
        }

        if (company !== "") {
          newData = allData.filter((job: JobEntry) => {
            return job.companyName.toLowerCase() === company.toLowerCase();
          });
        }

        if (description !== "") {
          newData = allData.filter((job: JobEntry) => {
            return job.description.includes(description.toLowerCase());
          });
        }

        if (status !== "") {
          newData = allData.filter((job: JobEntry) => {
            return (
              (job.status && status.toLowerCase() === "open") ||
              (!job.status && status.toLowerCase() === "closed")
            );
          });
        }

        // Set the backendData (data displayed) if the result did not change
        if (newData !== allData) setBackendData(newData);
      });
  }, [company, location, description, status]);

  return (
    <div id="body-container">
      <div className="job-postings-container">
        <div id="active-filters-container">
          {activeFilters.some(Boolean) ? (
            activeFilters.map((filter, i) =>
              filter !== "" ? (
                <Filter
                  key={i}
                  filter={filter}
                  setFilter={activeFilterSetters[i]}
                ></Filter>
              ) : null
            )
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
      <FilterFrame
        activeFilters={activeFilters}
        activeFilterSetters={activeFilterSetters}
        setBackendData={setBackendData}
        api={URL}
      />
    </div>
  );
}

export default App;
