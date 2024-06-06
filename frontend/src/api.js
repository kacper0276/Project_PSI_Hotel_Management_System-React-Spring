import axios from "axios";
import { API_URL } from "./App";

export const apiJson = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiMultipart = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const api = axios.create({
  baseURL: API_URL,
});
