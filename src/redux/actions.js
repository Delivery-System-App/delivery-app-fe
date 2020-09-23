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

export const filter = (dish, location) => {
  return fireRequest("filter", [], { dish: dish, location: location });
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

export const cancelBooking = (id, body) => {
  return fireRequest("cancelBooking", [id], body);
};

export const getBookingDetailOfUser = () => {
  return fireRequest("getBookingDetailOfUser");
};

export const addUserAddress = (body) => {
  return fireRequest("addUserAddress", [], body);
};

export const deleteUserAddress = (id) => {
  return fireRequest("deleteUserAddress", [id]);
};

export const addReview = (id, body) => {
  console.log(id, body);
  return fireRequest("addReview", [id], body);
};
