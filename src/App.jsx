import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storeTask = localStorage.getItem("task");
    if (storeTask) {
      setTask(JSON.parse(storeTask));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  // /// Controlled Input.
  const handleInput = (event) => {
    setNewTask(event.target.value);
  };

  //  //// Add Tasks

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const updateTask = [...task, newTask];
      setTask(updateTask);
      setNewTask("");
      toast.success("Task Added");
    }
  };

  // //// Deletes Task

  const handleDeleteTask = (index) => {
    const updateTask = [...task];
    updateTask.splice(index, 1);
    setTask(updateTask);
    toast.error("Task Deleted");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <ToastContainer position="top-center" />
      <h1>My Todolist</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleInput}
          className="text-input"
        />
        <button type="button" onClick={handleAddTask} className="add-btn">
          Add Task
        </button>
      </form>
      <ul>
        {task.map((todo, index) => {
          return (
            <main key={index}>
              <input type="checkbox" />
              <p> {todo}</p>
              <button
                onClick={() => handleDeleteTask(index)}
                className="delete-btn"
              >
                delete
              </button>
            </main>
          );
        })}
      </ul>
    </section>
  );
}

export default App;
