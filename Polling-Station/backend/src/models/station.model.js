const mongoose = require("mongoose");

const pollingStaionSchema = new mongoose.Schema(
  {
    polling: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    city: {
        type: String,
        required: true
    }
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("pollingStation", pollingStaionSchema);