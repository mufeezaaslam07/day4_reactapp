import React from "react";
import Todo from "./Todo";

export default function TodoList({
  todos,
  toggleTodo,
  handleDelete,
  handleUpdate,
}) {
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          toggleTodo={toggleTodo}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          todo={todo}
        />
      ))}
    </div>
  );
}
