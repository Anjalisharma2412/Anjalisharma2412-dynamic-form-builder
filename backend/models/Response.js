const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form"
    },

    submittedBy: String,

    responseData: Object
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);