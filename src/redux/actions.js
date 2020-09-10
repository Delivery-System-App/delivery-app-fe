import { fireRequest } from "./fireRequest";

export const getUser = () => {
  return fireRequest("getUser");
};

export const login = (body) => {
  return fireRequest("login", [], body);
};
export const register = (body) => {
  console.log(body);
  return fireRequest("register", [], body);
};
export const updateProfile = (body) => {
  return fireRequest("updateProfile", [], body);
};
export const resDetail = (id) => {
  return fireRequest("resDetail", [id]);
};
export const filter = (dish) => {
  return fireRequest("filter", [], { dish: dish });
};
export const menuList = (id) => {
  return fireRequest("menuList", [id]);
};
export const menuDishes = (id) => {
  return fireRequest("menuDishes", [id]);
};
export const bookDishes = (body) => {
  return fireRequest("bookDishes", [], body);
};
