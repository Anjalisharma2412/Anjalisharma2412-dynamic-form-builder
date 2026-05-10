const express = require("express");
const router = express.Router();
const Form = require("../models/Form");

router.post("/", async (req, res) => {
  const form = await Form.create(req.body);
  res.json(form);
});

router.get("/", async (req, res) => {
  const forms = await Form.find();
  res.json(forms);
});

router.get("/:id", async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
});

router.put("/:id", async (req, res) => {
  const updatedForm = await Form.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedForm);
});

router.delete("/:id", async (req, res) => {
  await Form.findByIdAndDelete(req.params.id);
  res.json({ message: "Form deleted successfully" });
});

module.exports = router;