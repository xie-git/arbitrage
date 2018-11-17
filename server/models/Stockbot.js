import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StockBotSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Stocks"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
export default mongoose.model("Stockbot", StockBotSchema);
