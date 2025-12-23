import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const projectsEndpoints = {
  getAll: () => api.get("/projects"),
  getById: (id: string) => api.get(`/projects/id/${id}`),
};

export const tasksEndpoints = {};

export const usersEndpoints = {};
