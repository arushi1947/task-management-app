"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getTasks,
  getUsers,
  createTask,
  updateTask,
  deleteTask,
} from "@/lib/api";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");


  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setCurrentUser(user);

    fetchData();
  };

  const fetchData = async () => {
    const tasksData = await getTasks();
    const usersData = await getUsers();

    setTasks(tasksData);
    setUsers(usersData);
  };

  const getUserEmail = (userId: string) => {
    const user = users.find((u: any) => u.id === userId);
    return user ? user.email : "Unknown User";
  };

  const handleCreateTask = async () => {
    if (!title || !description || !assignedTo) {
      alert("Please fill all fields");
      return;
    }

    await createTask({
      title,
      description,
      assigned_to: assignedTo,
      created_by: currentUser?.id
    });

    setTitle("");
    setDescription("");
    setAssignedTo("");

    fetchData();
  };

  const handleComplete = async (id: string) => {
    await updateTask(id);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchData();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-400 mt-1">
            Welcome, {currentUser?.user_metadata?.full_name || currentUser?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div className="border border-gray-700 p-5 rounded-lg">
          <p className="text-gray-400 text-sm">
            Total Tasks
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {tasks.length}
          </h2>
        </div>

        <div className="border border-gray-700 p-5 rounded-lg">
          <p className="text-gray-400 text-sm">
            Pending Tasks
          </p>

          <h2 className="text-3xl font-bold mt-2 text-yellow-400">
            {
              tasks.filter(
                (task) => task.status === "pending"
              ).length
            }
          </h2>
        </div>

        <div className="border border-gray-700 p-5 rounded-lg">
          <p className="text-gray-400 text-sm">
            Completed Tasks
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {
              tasks.filter(
                (task) => task.status === "completed"
              ).length
            }
          </h2>
        </div>

      </div>

      <div className="space-y-4 border border-gray-700 p-6 rounded-lg mb-10">

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-700 bg-black text-white p-3 rounded w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-700 bg-black text-white p-3 rounded w-full"
        />

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border border-gray-700 bg-black text-white p-3 rounded w-full"
        >
          <option value="" className="bg-gray-900 text-white">
            Select User
          </option>

          {users.map((user: any) => (
            <option
              key={user.id}
              value={user.id}
              className="bg-gray-900 text-white"
            >
              {user.email}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreateTask}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded"
        >
          Create Task
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Tasks
        </h2>

        {tasks.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-gray-700 rounded-lg">
            <p className="text-gray-400">
              No tasks available.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Create your first task above.
            </p>
          </div>
        ) : (
          tasks.map((task: any) => (
            <div
              key={task.id}
              className="border border-gray-700 p-5 rounded-lg mb-4 hover:border-blue-500 transition"
            >
              <h3 className="font-bold text-lg">
                {task.title}
              </h3>

              <p>{task.description}</p>

              <p className="mt-2">
                Assigned To:
                {" "}
                {getUserEmail(task.assigned_to)}
              </p>

              <div className="mt-2">

                {task.status === "pending" ? (
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                    Pending
                  </span>
                ) : (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Completed
                  </span>
                )}

              </div>

              <div className="flex gap-3 mt-4">
                {task.status !== "completed" && (
                  <button
                    onClick={() => handleComplete(task.id)}
                    className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded"
                  >
                    Complete
                  </button>
                )}

                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
  </div>
  );
}