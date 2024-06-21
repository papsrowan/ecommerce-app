import axios from "axios";

const axiosOpenInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosOpenInstance };
