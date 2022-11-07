import { useEffect, useState } from "react";

type JobEntry = {
	companyName: string;
	link: string;
	locations: string[];
	description: string;
	sponsorship: string;
	status: boolean;
};

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
					if (filteredData[i] === "\n") {
						i++;
					}

					let curEntry: JobEntry = {} as JobEntry;

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
					curEntry.locations = filteredData[i + 1].split(";");

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
		<div>
			{backendData
				? backendData.map((entry, i) => <p key={i}>{JSON.stringify(entry)}</p>)
				: "Loading..."}
		</div>
	);
}

export default App;
