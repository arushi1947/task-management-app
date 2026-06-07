const API_URL = process.env.NEXT_PUBLIC_API_URL;

fetch(`${API_URL}/tasks`)

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
};

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};

export const createTask = async (task: any) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return res.json();
};

export const updateTask = async (id: string) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "completed",
    }),
  });

  return res.json();
};

export const deleteTask = async (id: string) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  return res.json();
};