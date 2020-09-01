import { fireRequest } from "./fireRequest";

export const getUser = () => {
  return fireRequest("getUser");
};

export const login = (body) => {
  console.log(body);
  return fireRequest("login", [], body);
};
export const register = (body) => {
  console.log(body);
  return fireRequest("register", [], body);
};
