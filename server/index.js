import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/api.js";
import dotenv from "dotenv";
import schedule from "node-schedule";
import Job from "./models/job.js";
import parseDocument from "./util/parseDocument.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => {
    console.log(`Database connected successfully`);
  })
  .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

//handle cors related issues
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Schedule Job to update our data sets to run at midnight every night
const updateJob = schedule.scheduleJob("0 0 0 * * *", async () => {
  // Delete data from database
  Job.deleteMany()
    .then(console.log("Data Deleted"))
    .catch((err) => console.log(error));

  // Parse READAME and get list of jobs
  let jobList = await parseDocument();

  // Add jobs to database
  for (let curJob of jobList) {
    let companyName = curJob.companyName;
    let link = curJob.link ? curJob.link : "";
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

  console.log("Finished Adding Parsed Data");
});

app.use(bodyParser.json());
app.use("/api", routes);
app.use((err, req, res, next) => {
  console.log(err);
  next();
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
