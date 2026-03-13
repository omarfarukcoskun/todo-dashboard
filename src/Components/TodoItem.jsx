import React from "react";

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <tr
      onClick={() => onToggle(todo.id)}
      className="border-b hover:bg-purple-100 transition cursor-pointer"
    >
      {/* GÖREV */}
      <td className="p-3">
        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.text}
        </span>
      </td>

      {/* DURUM */}
      <td className="p-3 font-medium">
        {todo.completed ? (
          <span className="text-green-600">Tamamlandı</span>
        ) : (
          <span className="text-yellow-600">Devam Ediyor</span>
        )}
      </td>

      {/* SİL */}
      <td className="p-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(todo.id);
          }}
          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded transition"
        >
          Sil
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;