import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import api from "./services/api";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
  setLoading(true);
  const response = await api.get("/tasks");
  setTasks(response.data);
  setLoading(false);
};

  const addTask = async (taskData) => {
  setLoading(true);
  await api.post("/tasks", taskData);

  toast.success("Task Added");

  fetchTasks();
};

  const deleteTask = async (id) => {
  setLoading(true);

  const confirmed = window.confirm(
    "Delete this task?"
  );

  if (!confirmed) return;

  await api.delete(`/tasks/${id}`);

toast.success("Task Deleted");

fetchTasks();
};

const toggleTask = async (id) => {

  await api.patch(`/tasks/${id}/toggle`);

toast.success("Task Status Updated");

fetchTasks();
};

const filteredTasks = tasks.filter((task) => {

  const matchesSearch =
    task.title
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      );

  if (!matchesSearch) {
    return false;
  }

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

const updateTask = async (task) => {
  await api.put(`/tasks/${task.id}`, {
    title: editTitle,
    description: editDescription,
    dueDate: editDueDate,
  });

  toast.success("Task Updated");

  setEditingId(null);
  setEditTitle("");
  setEditDescription("");
  setEditDueDate("");

  fetchTasks();
};

  return (
      <div className="container">      
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      
      <input
        type="text"
        placeholder="Search Tasks..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        style={{
        padding: "10px",
        width: "100%",
        maxWidth: "500px",
        marginBottom: "15px",
        borderRadius: "8px",
}}
      />
      
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
<div className="stats-container">
  <div className="stat-card">
    <p>Active Tasks</p>
    <h2>{activeTasks}</h2>
  </div>

  <div className="stat-card">
    <p>Completed Tasks</p>
    <h2>{completedTasks}</h2>
  </div>
</div>
      
      <hr />

  {loading ? (
  <h2>Loading Tasks...</h2>
) : filteredTasks.length === 0 ? (
  <h3>No Tasks Found</h3>
) : (
  filteredTasks.map((task) => (    
    
    <div
  key={task.id}
  className="task-card"
  style={{
    border:
      task.dueDate &&
      !task.completed &&
      new Date(task.dueDate) < new Date()
        ? "2px solid red"
        : "none",
  }}
>

   {editingId === task.id ? (
  <>
    <input
      value={editTitle}
      onChange={(e) =>
        setEditTitle(e.target.value)
      }
      placeholder="Title"
    />

    <textarea
      value={editDescription}
      onChange={(e) =>
        setEditDescription(e.target.value)
      }
      placeholder="Description"
    />

    <input
      type="date"
      value={editDueDate}
      onChange={(e) =>
        setEditDueDate(e.target.value)
      }
    />

    <button
      onClick={() =>
        updateTask(task)
      }
    >
      Save
    </button>
  </>
) : (
  <h3
    style={{
      textDecoration: task.completed
        ? "line-through"
        : "none",
    }}
  >
    {task.title}
  </h3>
)}

    <p>{task.description}</p>
    <p>
  Due Date:{" "}
  {task.dueDate || "Not Set"}
</p>

    <button
  onClick={() => toggleTask(task.id)}
>
  {task.completed
    ? "Mark Active"
    : "Mark Complete"}
</button>

<button
  onClick={() => {
  setEditingId(task.id);
  setEditTitle(task.title);
  setEditDescription(task.description);
  setEditDueDate(task.dueDate || "");
}}
>
  Edit
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
<ToastContainer
  position="top-right"
  autoClose={2000}
/>
</div>
  );
}

export default App;