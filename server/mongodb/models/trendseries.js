import mongoose from "mongoose";

const trendseriesSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  series: [{ type: String, required: false }],
});

const Trendseries = mongoose.model("trendseries", trendseriesSchema);

export default Trendseries;
