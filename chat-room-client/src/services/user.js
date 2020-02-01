import axios from "axios";

const END_POINT = "http://localhost:3000/api/users";
const TOKEN = "token";

export function setToken(value) {
  localStorage.setItem(TOKEN, value);
}

export function getToken(value) {
  localStorage.setItem(TOKEN, value);
}

export async function login(user) {
  const response = await axios.post(`${END_POINT}/login`, user);
  return response;
}

export async function register(user) {
  const response = await axios.post(`${END_POINT}/register`, user);
  return response;
}
