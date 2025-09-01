import { useState, useEffect, useCallback } from "react";
import api from "../services/api.js";
import TaskForm from "./TaskForm.jsx";
import NotificationMessage from "../utils/NotificationMessage.jsx";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { RiCheckboxBlankFill, RiCheckboxFill } from "react-icons/ri";

export default function TaskList() {
  // State variables for managing tasks, UI feedback, and editing mode
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // useCallback memoizes the fetchTasks function to prevent re-creation on every render,
  // which is good practice for functions used in useEffect dependencies.
  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  }, []);

  // useEffect to fetch tasks on initial component mount.
  // The empty dependency array `[]` ensures it runs only once.
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handler for deleting a task.
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      // Optimistically update the UI by filtering out the deleted task
      setTasks(tasks.filter((task) => task._id !== id));
      // Display a success notification
      setNotification({ message: "Task deleted successfully!", type: "delete" });
    } catch (err) {
      console.error("Failed to delete task:", err);
      setNotification({ message: "Failed to delete task", type: "error" });
    }
  };

  // Handler for toggling a task's completion status.
  const handleToggleStatus = async (task) => {
    try {
      await api.patch(`/tasks/${task._id}/toggle`);
      // Update the state to reflect the new status without a full re-fetch
      setTasks(
        tasks.map((t) =>
          t._id === task._id
            ? { ...t, status: t.status === "completed" ? "pending" : "completed" }
            : t
        )
      );
      // Display a notification based on the new status
      setNotification({
        message: `Task marked as ${task.status === "completed" ? "pending" : "completed"}!`,
        type: "success",
      });
    } catch (err) {
      console.error("Failed to toggle status:", err);
      setNotification({ message: "Failed to update task status", type: "error" });
    }
  };

  // Handler for the form's onSave event.
  // It resets the editing state and refreshes the task list.
  const handleSave = () => {
    setEditingTask(null);
    fetchTasks();
  };

  // Function to dismiss the notification message.
  const handleDismissNotification = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <div className="max-w-2xl mt-2 mx-auto">
      {/* Conditionally render a single NotificationMessage component based on state */}
      {notification.message && (
        <NotificationMessage
          message={notification.message}
          type={notification.type}
          onDismiss={handleDismissNotification}
        />
      )}

      {/* The form for adding or editing a task */}
      <TaskForm task={editingTask} onSave={handleSave} />

      <h2 className="text-2xl mb-4">Tasks</h2>
      {tasks.length === 0 && <p>No tasks available.</p>}
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`flex justify-between items-center p-2 border-b ${
              task.status === "completed" ? "bg-green-100" : "bg-white"
            }`}
          >
            {/* Task details container (70% width, handles text overflow) */}
            <div className="w-7/10 overflow-hidden pr-4">
              <h3
                className={`font-bold text-lg uppercase whitespace-nowrap overflow-hidden text-ellipsis ${
                  task.status === "completed" ? "line-through" : ""
                }`}
              >
                {task.title}
              </h3>
              <p className="text-gray-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {task.description}
              </p>
              <p className="text-gray-500 mt-2">Status: {task.status}</p>
            </div>

            {/* Button container (30% width, centered) */}
            <div className="w-3/10 flex items-center justify-center space-x-2">
              {/* Edit button */}
              <button
                onClick={() => setEditingTask(task)}
                className="p-1 bg-yellow-500 text-white rounded"
              >
                <FaEdit />
              </button>
              {/* Toggle status button */}
              <button onClick={() => handleToggleStatus(task)} className="px-2">
                {task.status === "completed" ? (
                  <RiCheckboxFill className="text-green-500 w-8 h-8" />
                ) : (
                  <RiCheckboxBlankFill className="text-gray-500 w-8 h-8" />
                )}
              </button>
              {/* Delete button */}
              <button
                onClick={() => handleDelete(task._id)}
                className="p-1 bg-red-500 text-white rounded"
              >
                <AiFillDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}