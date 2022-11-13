import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Create schema for todo
const JobSchema = new Schema({
  companyName: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
  locations: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  sponsorship: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    required: false,
  },
});
// Create model for todo
const Job = mongoose.model('Job', JobSchema);
export default Job;