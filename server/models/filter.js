import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema for our filter options
const FilterSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

// Create model for todo
const Filter = mongoose.model("Filter", FilterSchema);
export default Filter;
