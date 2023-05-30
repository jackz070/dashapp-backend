import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      // required: true,
    },
    price: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    stock: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Item = mongoose.model("Item", ItemSchema);

export default Item;
