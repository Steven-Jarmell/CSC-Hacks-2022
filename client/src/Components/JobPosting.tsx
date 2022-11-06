type Props = {
	companyName: string;
	link: string;
	locations: string[];
	description: string;
	sponsorship: string;
	status: boolean;
};

const JobPosting = ({
	companyName,
	link,
	locations,
	description,
	sponsorship,
	status,
}: Props) => {
	return (
		<div>
			{/* Add header with a link to job if available, else just list job name */}
			<div>
				{status && <a href={link}>{companyName}</a>}
				{!status && <p>{companyName}</p>}
			</div>
			<div>
                {/* If theres more than 1 location, map through the list, else display the one*/}
				{locations.length > 1 ? (
                    <div>
                        <p>Locations:</p>
                        <ul>
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
