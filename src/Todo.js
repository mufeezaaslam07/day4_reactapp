import React, { useState } from "react";

export default function Todo({ todo, toggleTodo, handleDelete, handleUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(todo.name);

  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  function handleDeleteClick() {
    handleDelete(todo.id);
  }

  function handleUpdateClick() {
    handleUpdate(todo.id, newName);
    setIsEditing(false);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px",
        margin: "8px 0",
      }}
    >
      <label style={{ flex: "1" }}>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
          style={{ marginRight: "8px" }}
        />
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        ) : (
          <span
            style={{ textDecoration: todo.complete ? "line-through" : "none" }}
          >
            {todo.name}
          </span>
        )}
      </label>
      <div>
        {isEditing ? (
          <button onClick={handleUpdateClick}>Save</button>
        ) : (
          <>
            <button
              style={{ marginRight: "6px" }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button onClick={handleDeleteClick}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
