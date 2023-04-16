import axios from "axios";

const todoHttp = axios.create({
  baseURL: "https://643ad46dbd3623f1b9bcc93f.mockapi.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default todoHttp;
