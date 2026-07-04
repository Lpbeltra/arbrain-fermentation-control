import axios from "axios";

export const api = axios.create({
  // No Docker a URL vem do build (VITE_API_URL=/api, via proxy do nginx);
  // rodando localmente com "npm run dev" usa a API direto na porta 5134
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5134/api",
  headers: {
    "Content-Type": "application/json",
  },
});