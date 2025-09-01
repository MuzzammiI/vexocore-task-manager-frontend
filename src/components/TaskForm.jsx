import { useEffect, useState } from "react";
import api from "../services/api.js";
import NotificationMessage from "../utils/NotificationMessage.jsx";

export default function TaskForm({ task, onSave }) {
  // Use a single state object to manage form fields for better organization.
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  // Consolidated notification state to handle all messages and types.
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [error, setError] = useState("");

  // useEffect to sync local state with the parent `task` prop.
  // This runs only when the `task` prop changes, ensuring the form is updated for editing.
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
      });
    } else {
      // Clear the form fields when switching to 'add' mode.
      setFormData({
        title: "",
        description: "",
      });
    }
  }, [task]);

  // Handle input changes using a single function.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Centralized handler for all form submissions (add or update).
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        // Update existing task
        await api.put(`/tasks/${task._id}`, formData);
        setNotification({ message: "Task updated successfully!", type: "update" });
      } else {
        // Create new task
        await api.post("/tasks", formData);
        setNotification({ message: "Task created successfully!", type: "success" });
      }

      // After successful save, reset the form and call the parent's `onSave` function.
      setFormData({ title: "", description: "" });
      onSave();
    } catch (err) {
      // Display a generic error notification on failure.
      const errorMessage = err.response?.data?.message || "Failed to save task";
      setError(errorMessage);
    }
  };

  // Function to dismiss notifications.
  const onDismissNotification = () => {
    setNotification({ message: "", type: "" });
    setError(""); // Clear error message as well
  };

  return (
    <div className="mb-6 mt-15">
      <h3 className="text-xl mb-4">{task ? "Edit Task" : "Add Task"}</h3>
      {/* Conditionally render notifications from the single state */}
      {notification.message && (
        <NotificationMessage
          message={notification.message}
          type={notification.type}
          onDismiss={onDismissNotification}
        />
      )}
      {error && (
        <NotificationMessage
          message={error}
          type="error"
          onDismiss={onDismissNotification}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border"
            ></textarea>
          </div>
        </div>

        <button type="submit" className={`p-2 text-white ${task ? "bg-blue-500" : "bg-green-500"}`}>
          {task ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}