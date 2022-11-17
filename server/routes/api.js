import express from "express";
import Job from "../models/job.js";
const router = express.Router();

router.route("/jobs").get((req, res) => {
  // This will return all the data, exposing only the id and action field to the client
  Job.find({})
    .then((jobs) => res.json(jobs))
    .catch((err) => res.status(400).json("Error" + err));
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

router.route("/filter").post((req, res) => {
  // Get POST request query parameters
  const companyName = req.query.name;
  const locations = req.query.location; // need to use $regex in the query
  const description = req.query.description;
  const status = req.query.status;

  // Get all of the job postings that match
});

export default router;
