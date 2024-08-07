import axios from "axios";

export const apiJson = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const apiMultipart = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});
