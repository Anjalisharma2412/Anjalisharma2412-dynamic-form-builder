const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  id: String,
  label: String,
  fieldType: String,
  placeholder: String,
  required: Boolean,
  options: [String],

  validationRules: {
    minLength: Number,
    maxLength: Number
  },

  styleConfig: {
    width: String,
    alignment: String
  }
});

const formSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    themeConfig: {
      primaryColor: String,
      font: String,
      layout: String
    },

    fields: [fieldSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);