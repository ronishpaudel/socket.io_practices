import axios from "axios";

const url = process.env.NEXT_PUBLIC_LOCAL_HOST;

export const API = axios.create({
  baseURL: url,
});
