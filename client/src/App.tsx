import React, { useEffect, useState } from "react";
import JobPosting from "./Components/JobPosting";
import { JobEntry } from "./Types/JobEntry";
import FilterFrame from "./Components/FilterFrame";
import "./App.css";

function App() {
  const [backendData, setBackendData] = useState<JobEntry[]>([]);

  const URL =
    "https://raw.githubusercontent.com/pittcsc/Summer2023-Internships/dev/README.md";

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        // Gets just the job posting text
        let splitData = data.substring(data.indexOf("Akuna") - 1);
        splitData = splitData.substring(0, splitData.indexOf("<!--") - 4);

        // Split the text at the '|'
        let filteredData: string[] = splitData.split("|");

        // Make a list of all the jobs
        let allJobs = [];

        // Parse through the filtered data
        for (let i = 0; i < filteredData.length; i += 3) {
          // If the line is blank, skip it
          while (
            filteredData[i] === "\n" ||
            filteredData[i].trim().length === 0
          ) {
            i++;
          }

          let curEntry: JobEntry = {} as JobEntry;

          // Special case that needs hard coding to deal with
          if (filteredData[i].includes("Jump Trading")) {
            curEntry.companyName = "Jump Trading";
            curEntry.description =
              filteredData[i + 2] +
              filteredData[i + 3] +
              filteredData[i + 4] +
              filteredData[i + 5] +
              filteredData[i + 6];
            curEntry.link = filteredData[i].substring(
              filteredData[i].indexOf("(") + 1,
              filteredData[i].toLowerCase().indexOf(")")
            );
            curEntry.sponsorship = "Unavailable/Unknown";
            curEntry.status = true;
            curEntry.locations = "Chicago, IL";

            allJobs.push(curEntry);

            i += 6;
            continue;
          }

          // Check if the job is closed
          // If it is closed there is no link attached to it
          if (
            filteredData[i].indexOf("[") !== -1 &&
            filteredData[i].indexOf("]") !== -1
          ) {
            curEntry.companyName = filteredData[i].substring(
              filteredData[i].indexOf("[") + 1,
              filteredData[i].indexOf("]")
            );
            curEntry.link = filteredData[i].substring(
              filteredData[i].indexOf("(") + 1,
              filteredData[i].toLowerCase().indexOf(")")
            );
            curEntry.status = true;
          } else {
            curEntry.companyName = filteredData[i];
            curEntry.link = "";
            curEntry.status = false;
          }

          // Location tends to be a semi-colon separated list
          // Need to revise this in the future to account for anomolies
          curEntry.locations = filteredData[i + 1];

          // Description occurs after location
          let description: string = filteredData[i + 2];
          curEntry.description = description;

          let lowerCaseDescription = description.toLowerCase();

          // Naiive way to determine sponsorship or not
          if (
            lowerCaseDescription.includes("sponsorship") &&
            !lowerCaseDescription.includes("not") &&
            !lowerCaseDescription.includes("no")
          ) {
            curEntry.sponsorship = "Available";
          } else {
            curEntry.sponsorship = "Unavailable/Unknown";
          }

          // Add job to the list
          allJobs.push(curEntry);
        }

        setBackendData(allJobs);
      });
  }, []);

  return (
    <div id="body-container">
      <div className="job-postings-container">
        <h3 className="job-postings-filter">Filters: None</h3>
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
      <FilterFrame />
    </div>
  );
}

export default App;
