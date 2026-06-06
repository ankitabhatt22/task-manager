const express = require("express");
const router = express.Router();

let tasks = [];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {

  const task = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || "",
    dueDate: req.body.dueDate || null,
    completed: false,
    createdAt: new Date()
  };

  tasks.unshift(task);

  res.status(201).json(task);
});

module.exports = router;