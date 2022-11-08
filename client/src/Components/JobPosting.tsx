import { JobEntry } from "../Types/JobEntry"

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
				{status && <a href={link}>{companyName}</a>}
				{!status && <p>{companyName}</p>}
			</div>
			<div className="job-posting-body">
                {/* If theres more than 1 location, map through the list, else display the one*/}
				{locations.length > 1 ? (
                    <div>
                        <p>Locations:</p>
                        <ul className="job-posting-list">
                            {locations.map((location, i) => (
                                <li key={i}>{location}</li>
                            ))}
                        </ul>
                    </div>
				) : (
					<p>Location: {locations[0]}</p>
				)}
				<p>Job Description: {description}</p>
				<p>Sponsorship: {sponsorship}</p>
				<p>Status: {status ? "Open" : "Closed"}</p>
			</div>
		</div>
	);
};

export default JobPosting;
