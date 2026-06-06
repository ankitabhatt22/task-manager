import { useEffect, useState } from "react";
import api from "./services/api";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await api.get("/tasks");
    setTasks(response.data);
  };

  const addTask = async (taskData) => {
    await api.post("/tasks", taskData);

    fetchTasks();
  };

  const deleteTask = async (id) => {

  const confirmed = window.confirm(
    "Delete this task?"
  );

  if (!confirmed) return;

  await api.delete(`/tasks/${id}`);

  fetchTasks();
};

const toggleTask = async (id) => {

  await api.patch(
    `/tasks/${id}/toggle`
  );

  fetchTasks();
};

const filteredTasks = tasks.filter((task) => {

  if (filter === "active") {
    return !task.completed;
  }

  if (filter === "completed") {
    return task.completed;
  }

  return true;
});

const activeTasks = tasks.filter(
  (task) => !task.completed
).length;

const completedTasks = tasks.filter(
  (task) => task.completed
).length;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <TaskForm addTask={addTask} />

      <div style={{ margin: "20px 0" }}>

  <button
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button
    onClick={() => setFilter("active")}
    style={{ marginLeft: "10px" }}
  >
    Active
  </button>

  <button
    onClick={() => setFilter("completed")}
    style={{ marginLeft: "10px" }}
  >
    Completed
  </button>

</div>
<div style={{ marginTop: "20px" }}>
        <h3>Active Tasks: {activeTasks}</h3>

        <h3>
          Completed Tasks: {completedTasks}
        </h3>
      </div>
      
      <hr />

  
    {filteredTasks.length === 0 ? (
    <h3>No Tasks Found</h3>
    ) : (
    filteredTasks.map((task) => (    
  <div key={task.id}>

    <h3
  style={{
    textDecoration: task.completed
      ? "line-through"
      : "none"
  }}
>
  {task.title}
</h3>

    <p>{task.description}</p>

    <button
  onClick={() => toggleTask(task.id)}
>
  {task.completed
    ? "Mark Active"
    : "Mark Complete"}
</button>

<button
  onClick={() => deleteTask(task.id)}
  style={{ marginLeft: "10px" }}
>
  Delete
</button>

    <hr />
  </div>
))
)}
</div>
  );
}

export default App;