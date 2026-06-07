import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import api from "./services/api";
import TaskForm from "./components/TaskForm";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

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
      <div className="hero">
      <h2>Organize Your Work</h2>
      <p>
      Track tasks, deadlines and progress in one place.
    </p>
</div>
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
  <h3>📋 No Tasks Found
Create your first task to get started.</h3>
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

  <div className="edit-form">

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

    <div className="button-group">

      <button
        onClick={() =>
          updateTask(task)
        }
      >
        Save
      </button>

      <button
        className="cancel-btn"
        onClick={() => {
          setEditingId(null);
          setEditTitle("");
          setEditDescription("");
          setEditDueDate("");
        }}
      >
        Cancel
      </button>

    </div>

  </div>

) : (

  <>

    <div className="task-header">

      <h3>
        {task.title}
      </h3>

      {task.completed ? (
        <span className="badge completed-badge">
          Completed
        </span>
      ) : task.dueDate &&
        new Date(task.dueDate) <
        new Date() ? (
        <span className="badge overdue-badge">
          Overdue
        </span>
      ) : (
        <span className="badge active-badge">
          Active
        </span>
      )}

    </div>

    <p>{task.description}</p>

    <p
    style={{
    color: "#94a3b8",
    fontSize: "14px"
  }}
>
    Created:
    {" "}
    {new Date(task.createdAt)
    .toLocaleDateString()}
</p>

    <div className="button-group">

      <button
  className="complete-btn"
  onClick={() =>
    toggleTask(task.id)
  }
>
  <FaCheck /> Complete
</button>

      <button
        className="edit-btn"
           onClick={() => {
          setEditingId(task.id);
          setEditTitle(task.title);
          setEditDescription(
            task.description
          );
          setEditDueDate(
            task.dueDate || ""
          );
        }}
      >
        <FaEdit /> Edit
      </button>

      <button
  className="delete-btn"
  onClick={() =>
    deleteTask(task.id)
  }
>

        <FaTrash /> Delete
      </button>

    </div>

  </>

)}

</div>
))
)}

<footer
  style={{
    marginTop: "40px",
    opacity: 0.7,
    textAlign: "center"
  }}
>
  Built with React, Express and Node.js
</footer>

<ToastContainer
  position="top-right"
  autoClose={2000}
/>

</div>
)}

export default App;