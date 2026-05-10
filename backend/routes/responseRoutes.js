const express = require("express");
const router = express.Router();
const Response = require("../models/Response");

router.post("/", async (req, res) => {
  const response = await Response.create(req.body);
  res.json(response);
});

router.get("/", async (req, res) => {
  const responses = await Response.find();
  res.json(responses);
});

router.get("/:formId", async (req, res) => {
  const responses = await Response.find({
    formId: req.params.formId
  });

  res.json(responses);
});

router.delete("/:id", async (req, res) => {
  await Response.findByIdAndDelete(req.params.id);
  res.json({ message: "Response deleted successfully" });
});

module.exports = router;