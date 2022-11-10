import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Create schema for todo
const JobSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  locations: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sponsorship: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});
// Create model for todo
const Job = mongoose.model('Job', JobSchema);
export default Job;