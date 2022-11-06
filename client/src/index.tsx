import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import JobPosting from "./Components/JobPosting";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<JobPosting
		companyName={"Amazon Robotics"}
		link={
			"https://www.amazon.jobs/en/jobs/1999770/amazon-robotics-software-development-engineer-sde-intern-summer-2023"
		}
		locations={["Boston, MA"]}
		description={"Software Development Engineer"}
		sponsorship={"No Information"}
		status={true}
	/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
