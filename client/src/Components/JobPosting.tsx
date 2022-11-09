import { JobEntry } from "../Types/JobEntry";
import "./JobPosting.css";

const JobPosting = ({
	companyName,
	link,
	locations,
	description,
	sponsorship,
	status,
}: JobEntry) => {
	return (
		<div className="job-posting-container">
			{/* Add header with a link to job if available, else just list job name */}
			<div className="job-posting-header">
				{status && (
					<a className="job-posting-company" href={link}>
						{companyName}
					</a>
				)}
				{!status && <p className="job-posting-company">{companyName}</p>}
			</div>
			<div className="job-posting-body">
				<p>
					<span className="job-posting-subtitle">Location:</span> {locations}
				</p>
				<p>
					<span className="job-posting-subtitle">Job Description:</span>{" "}
					{description}
				</p>
				<p>
					<span className="job-posting-subtitle">Sponsorship:</span>{" "}
					{sponsorship}
				</p>
				<p>
					<span className="job-posting-subtitle">Status:</span>{" "}
					{status ? (
						<span className="job-posting-status-open">Open</span>
					) : (
						<span className="job-posting-status-closed">Closed</span>
					)}
				</p>
			</div>
		</div>
	);
};

export default JobPosting;
