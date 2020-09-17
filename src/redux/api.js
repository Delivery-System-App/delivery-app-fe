export default {
  getUser: {
    path: "/api/v1/auth/user",
  },
  register: {
    path: "/api/v1/auth/register",
    method: "POST",
    noAuth: true,
  },
  updateProfile: {
    path: "/api/v1/auth/updateuser",
    method: "POST",
    noAuth: false,
  },
  login: {
    path: "/api/v1/auth/login",
    method: "POST",
    noAuth: true,
  },
  resDetail: {
    path: "/api/v1/restaurant",
    method: "GET",
    noAuth: true,
  },
  filter: {
    path: "/api/v1/restaurant/filter/filter",
    method: "GET",
    noAuth: true,
  },
  menuList: {
    path: "/api/v1/menu/menu",
    method: "GET",
    noAuth: true,
  },
  menuDishes: {
    path: "/api/v1/menu/dishes",
    method: "GET",
    noAuth: true,
  },
  bookDishes: {
    path: "/api/v1/booking/CreateBooking",
    method: "POST",
    noAuth: false,
  },
  cancelBooking: {
    path: "/api/v1/booking/updateBooking",
    method: "POST",
    noAuth: false,
  },
  getBookingDetailOfUser: {
    path: "/api/v1/booking/GetBookingDetailOfUser",
    method: "GET",
    noAuth: false,
  },
  addUserAddress: {
    path: "/api/v1/auth/addUserAddress",
    method: "POST",
    noAuth: false,
  },
};
