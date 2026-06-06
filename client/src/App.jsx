import { useEffect, useState } from "react";
import api from "./services/api";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <TaskForm addTask={addTask} />

      <hr />

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;