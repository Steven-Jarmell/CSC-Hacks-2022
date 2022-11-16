import React, { useEffect, useState } from "react";
import JobPosting from "./Components/JobPosting";
import { JobEntry } from "./Types/JobEntry";
import FilterFrame from "./Components/FilterFrame";
import "./App.css";

function App() {
	const [backendData, setBackendData] = useState<JobEntry[]>([]);

	const URL = "http://localhost:5000/api/jobs";

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
			<FilterFrame backendData={backendData} setBackendData={setBackendData} />
		</div>
	);
}

export default App;
