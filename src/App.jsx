import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleEdit = (e, id) => {
    const task = todos.find((item) => item.id === id);
    setTodo(task.todo);
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleDelete = (e, id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  const handleToggleCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-blue-100 min-h-[80vh] max-w-2xl shadow-2xl shadow-blue-400/50 hover:shadow-blue-500/70 transition-all duration-300">
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className="text-xl font-bold">Add a Task</h2>
          <div className="flex gap-3">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a task..."
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-700 px-5 py-2 text-white rounded-lg font-semibold shadow-md transition-all"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 my-3">
          <input type="checkbox" onChange={handleToggleCompleted} checked={showCompleted} className="w-5 h-5" />
          <label className="font-bold">Show Completed Tasks</label>
        </div>
        <h2 className="text-xl font-bold mt-4">Your Tasks</h2>
        <div className="todos mt-3">
          {todos.filter(item => item.isCompleted === showCompleted).length === 0 && <div className="text-gray-500">No tasks to display</div>}
          {todos.filter(item => item.isCompleted === showCompleted).map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 bg-white rounded-lg shadow-md my-2 transition-all hover:scale-[1.02]"
            >
              <div className="flex gap-3 items-center">
                <input
                  onChange={handleCheckBox}
                  type="checkbox"
                  checked={item.isCompleted}
                  name={item.id}
                  className="w-5 h-5"
                />
                <div className={`text-lg ${item.isCompleted ? "line-through text-gray-500" : ""}`}>
                  {item.todo}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white rounded-lg text-sm font-bold shadow-md transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-red-500 hover:bg-red-700 px-4 py-2 text-white rounded-lg text-sm font-bold shadow-md transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
