import API from "./axios";

export const loginUser = (data) => API.post("/auth/login", data);

export const getInstitutes = () => API.get("/institute");
