import React, { useState, useEffect } from "react";
import { createTodo } from "../Interfaces/Todo";

const Home = () => {

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos((prev) => [...prev, createTodo(text)]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* 🔥 BAŞLIK */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Görev Takip Paneli
      </h1>

      <div className="grid grid-cols-4 gap-8">

        {/* SOL EKLEME */}
        <div>
          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border p-3 rounded w-full"
              placeholder="Yeni görev ekle..."
            />

            <button
              onClick={addTodo}
              className="bg-purple-500 text-white px-5 rounded"
            >
              + Ekle
            </button>
          </div>
        </div>

        {/* 🔥 ORTA BÜYÜK MOR TABLO */}
        <div className="col-span-2 bg-purple-100 rounded-xl shadow overflow-hidden">

          <table className="w-full text-left">

            <thead className="bg-purple-300">
              <tr>
                <th className="p-4">Görev</th>
                <th className="p-4">Durum</th>
                <th className="p-4">İşlem</th>
              </tr>
            </thead>

            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center">
                    Görev yok
                  </td>
                </tr>
              ) : (
                todos.map((todo) => (
                  <tr key={todo.id} className="border-t">

                    <td
                      onClick={() => toggleTodo(todo.id)}
                      className={`p-4 cursor-pointer ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </td>

                    <td className="p-4">
                      {todo.completed ? "Tamamlandı" : "Devam Ediyor"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-purple-400 text-white px-3 py-1 rounded"
                      >
                        Sil
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>

        {/* SAĞ KARTLAR */}
        <div className="flex flex-col gap-6">

          <div className="bg-purple-200 p-6 rounded-xl shadow">
            <p>Toplam Görev</p>
            <h2 className="text-3xl font-bold">{todos.length}</h2>
          </div>

          <div className="bg-green-200 p-6 rounded-xl shadow">
            <p>Tamamlanan</p>
            <h2 className="text-3xl font-bold">{completedCount}</h2>
          </div>

          <div className="bg-pink-200 p-6 rounded-xl shadow">
            <p>Kalan</p>
            <h2 className="text-3xl font-bold">{todos.length - completedCount}</h2>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;