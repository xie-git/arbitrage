import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StocksSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  symbol: {
    type: String,
    required: true,
    unique: true
    // dropDups: true
  },
  price: {
    type: String,
    required: true
  },
  change: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
export default mongoose.model("Stocks", StocksSchema);
