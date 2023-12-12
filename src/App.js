import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

const containerStyle = {
  maxWidth: "400px",
  margin: "auto",
  marginTop: "50px",
};

const inputStyle = {
  padding: "8px",
  marginRight: "4px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "60%",
};

const buttonStyle = {
  padding: "8px",
  borderRadius: "4px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  cursor: "pointer",
  marginLeft: "6px",
};

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value;
    if (name === "") return;

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), name: name, complete: false },
    ]);

    todoNameRef.current.value = "";
  }

  function handleClearTodos() {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.complete));
  }

  function handleDelete(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function handleUpdate(id, newName) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, name: newName } : todo
      )
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Todo-List</h1>

      <div style={{ display: "flex", marginBottom: "16px" }}>
        <input
          ref={todoNameRef}
          type="text"
          style={inputStyle}
          placeholder="Enter your task"
        />
        <button onClick={handleAddTodo} style={buttonStyle}>
          Add Todo
        </button>
        <button onClick={handleClearTodos} style={buttonStyle}>
          Clear Complete
        </button>
      </div>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <div
        style={{
          marginTop: "16px",
          color: "#888",
          fontSize: "1.2em",
          fontWeight: "bold",
        }}
      >
        {todos.filter((todo) => !todo.complete).length} tasks left to do
      </div>
    </div>
  );
}

export default App;
