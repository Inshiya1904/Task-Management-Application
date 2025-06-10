import React, { useState } from "react";

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${day} ${month} ${hours}:${minutes} ${ampm}`;
};

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(id, editText.trim());
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <ul className="task-list">
      {tasks.length === 0 && <p>No tasks yet.</p>}
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          <div className="task-left">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />

            {editId === task.id ? (
              <form
                onSubmit={(e) => handleEditSubmit(e, task.id)}
                className="edit-form"
              >
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={(e) => handleEditSubmit(e, task.id)}
                  autoFocus
                />
              </form>
            ) : (
              <div className="task-text">
                <strong>{task.text}</strong>
                <small className="timestamp">
                  🕒 {formatDateTime(task.createdAt)}
                </small>
              </div>
            )}
          </div>
          <div className="task-actions">
            <button onClick={() => startEditing(task)}>Edit</button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete "${task.text}"?`
                  )
                ) {
                  onDelete(task.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
