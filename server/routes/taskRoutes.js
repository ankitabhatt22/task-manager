const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../data/tasks.json"
);

let tasks = [];

if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(
    filePath,
    "utf8"
  );

  tasks = data ? JSON.parse(data) : [];
}
function saveTasks() {
  fs.writeFileSync(
    filePath,
    JSON.stringify(tasks, null, 2)
  );
}

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
    saveTasks();
  res.status(201).json(task);
});

router.delete("/:id", (req, res) => {

  const id = Number(req.params.id);

  tasks = tasks.filter(
    task => task.id !== id
  );
  saveTasks();

  res.json({
    message: "Task deleted"
  });
});

router.patch("/:id/toggle", (req, res) => {

  const id = Number(req.params.id);

  tasks = tasks.map(task =>
    task.id === id
      ? {
          ...task,
          completed: !task.completed
        }
      : task
  );
  saveTasks();
  res.json({
    message: "Task status updated"
  });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.map((task) =>
    task.id === id
      ? {
          ...task,
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
        }
      : task
  );

    saveTasks();

  res.json({
    message: "Task updated",
  });
});

module.exports = router;