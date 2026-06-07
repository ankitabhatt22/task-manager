import { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTask({
      title,
      description,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  <div className="hero">
  <h2>Organize Your Work</h2>
  <p>
    Track tasks, deadlines and progress
    in one place.
  </p>
</div>

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br /><br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

      <br /><br />

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;