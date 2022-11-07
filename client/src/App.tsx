import { useEffect, useState } from "react";

type JobEntry = {
  companyName: string,
	link: string,
  locations: string[],
	description: string,
	sponsorship: string,
	status: boolean
}

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
        let filteredData: string[] = splitData.split('|');

        // Make a list of all the jobs
        let allJobs = [];
        for (let i = 0; i < filteredData.length; i+=3) {
          if (filteredData[i] === '\n') {
            i++;
          }

          let curEntry:JobEntry = {} as JobEntry;
          
          if (filteredData[i].indexOf('[') !== -1 && filteredData[i].indexOf(']') !== -1) {
            curEntry.companyName = filteredData[i].substring(filteredData[i].indexOf('[')+1, filteredData[i].indexOf(']'));
            curEntry.link = filteredData[i].substring(filteredData[i].indexOf('(')+1, filteredData[i].toLowerCase().indexOf(')'));
            curEntry.status = true;
          } else {
            curEntry.companyName = filteredData[i];
            curEntry.link = '';
            curEntry.status = false;
          }
          
          curEntry.locations = filteredData[i+1].split(';');

          let description:string = filteredData[i+2];
          curEntry.description = description;

          let lowerCaseDescription = description.toLowerCase();
          if (lowerCaseDescription.includes('sponsorship') && !lowerCaseDescription.includes('not') && !lowerCaseDescription.includes('no')) {
            curEntry.sponsorship = "Available";
          } else {
            curEntry.sponsorship = "Unavailable/Unknown";
          }

          allJobs.push(curEntry);
        }

        setBackendData(allJobs);
        //setBackendData(filteredData);
			});
	}, []);

	// [Name Of Company](link to company)? | Location | Description
	/*
  return (
    <div>
      {backendData ? (
        <p>{backendData}</p>
      ) : (
        "Loading..."
      )}
    </div>
  );
  */
return <div>{backendData ? backendData.map((entry, i) => (
    <p key={i}>{JSON.stringify(entry)}</p>
    //<p key={i}>{i}: {entry}</p>
  )) : "Loading..."}</div>;
}

export default App;
