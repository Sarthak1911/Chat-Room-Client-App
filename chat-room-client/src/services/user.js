import axios from "axios";

const END_POINT = "http://localhost:3000/api/users";

export function setToken(token, value) {
  localStorage.setItem(token, value);
}

export function getToken(token) {
  return localStorage.getItem(token);
}

export async function login(user) {
  const response = await axios.post(`${END_POINT}/login`, user);
  return response;
}

export async function register(user) {
  const response = await axios.post(`${END_POINT}/register`, user);
  return response;
}
