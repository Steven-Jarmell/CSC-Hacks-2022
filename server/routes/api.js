import express from "express";
import Job from "../models/job.js";
import parseDocument from "../util/parseDocument.js";
const router = express.Router();

router.route("/jobs").get((req, res) => {
	// This will return all the data, exposing only the id and action field to the client
	Job.find({})
		.then((jobs) => res.json(jobs))
		.catch((err) => res.status(400).json("Error" + err));
});

router.route("/update").get(async (req, res) => {
  // Delete data from database
	Job.deleteMany()
		.then(console.log("Data Deleted"))
		.catch((err) => console.log(error));
	
  // Parse READAME and get list of jobs
  let jobList = await parseDocument();

  // Add jobs to database
  for (let curJob of jobList) {
    let companyName = curJob.companyName;
    let link = curJob.link ? curJob.link : '';
    let status = curJob.status;
    let locations = curJob.locations;
    let description = curJob.description;
    let sponsorship = curJob.sponsorship;

    const newJob = new Job({
      companyName,
      link,
      locations,
      description,
      sponsorship,
      status,
    });

    newJob
		.save()
		.then()
		.catch((err) => res.status(400).json("Error: " + err));
  }

  res.send('hello');
});

router.route("/add").post((req, res) => {
	const companyName = req.body.companyName;
	const link = req.body.link;
	const locations = req.body.locations;
	const description = req.body.description;
	const sponsorship = req.body.sponsorship;
	const status = req.body.status;

	const newJob = new Job({
		companyName,
		link,
		locations,
		description,
		sponsorship,
		status,
	});

	newJob
		.save()
		.then(() => res.json("Job added"))
		.catch((err) => res.status(400).json("Error: " + err));
});

export default router;
