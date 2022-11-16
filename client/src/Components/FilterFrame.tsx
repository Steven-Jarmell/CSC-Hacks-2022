import { useEffect, useState } from "react";
import { FilterData } from "../Types/FilterData";
import { JobEntry } from "../Types/JobEntry";
import FilterDropdown from "./FilterDropdown";
import "./FilterFrame.css";

type Props = {
  backendData: JobEntry[];
  setBackendData: React.Dispatch<React.SetStateAction<JobEntry[]>>;
};

const FilterFrame = ({ backendData, setBackendData }: Props) => {
  // Get filters object from API here and then use each filter type to create our filters
  const [filterData, setFilterData] = useState<FilterData[]>([]);

  const [companyName, setCompanyName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [jobStatus, setJobStatus] = useState<string>("");

  const URL = "/Filters.json";

  const jobNames: string[] = backendData.map((entry) => {
    return entry.companyName;
  });

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFilterData(data);
      });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let newData: JobEntry[] = backendData;

    console.log(String(backendData[4].status).toLowerCase());

    if (location !== "") {
      newData = backendData.filter((job) => {
        return job.locations.indexOf(location.toUpperCase()) !== -1;
      });
    } else if (companyName !== "") {
      newData = backendData.filter((job) => {
        return job.companyName.toLowerCase() === companyName.toLowerCase();
      });
    } else if (jobDescription !== "") {
      newData = backendData.filter((job) => {
        return job.description.includes(jobDescription.toLowerCase());
      });
    } else if (jobStatus !== "") {
      newData = backendData.filter((job) => {
        return (
          (job.status && jobStatus.toLowerCase() === "open") ||
          (!job.status && jobStatus.toLowerCase() === "closed")
        );
      });
    }

    if (newData !== backendData) setBackendData(newData);
  };

  return (
    //TODO: Add endpoint for filter post request
    <div id="form-container">
      <form action="" method="" id="filter-form" onSubmit={handleSubmit}>
        <h1 className="filter-title">Filter</h1>
        {filterData
          ? filterData.map((entry, i) => (
              <div key={i} className="select-container">
                <h3>{entry.filterName}</h3>
                <FilterDropdown
                  name={entry.filterName}
                  options={i === 0 ? jobNames : entry.options}
                  formInput={
                    i === 0
                      ? setCompanyName
                      : i === 1
                      ? setLocation
                      : i === 2
                      ? setJobDescription
                      : setJobStatus
                  }
                  backendData={backendData}
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
