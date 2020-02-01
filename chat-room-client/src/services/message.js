import axios from "axios";
import { getToken } from "./user";

const END_POINT = "http://localhost:3000/api/messages";

export async function getMessages() {
  const authToken = getToken("token");
  let headers = !authToken
    ? { "Content-Type": "application/json" }
    : { "Content-Type": "application/json", "x-auth-token": authToken };

  const response = await axios.get(END_POINT, { headers });

  return response;
}

export async function likeMessage(_id, username) {
  const authToken = getToken("token");
  let headers = !authToken ? {} : { "x-auth-token": authToken };

  const response = await axios.post(`${END_POINT}/${_id}`, username, {
    headers
  });

  return response;
}

export async function postMessage(username, message) {
  const authToken = getToken("token");
  let headers = !authToken ? {} : { "x-auth-token": authToken };

  const response = await axios.post(
    `${END_POINT}`,
    { username, message },
    {
      headers
    }
  );

  return response;
}
