export default {
  getUser: {
    path: "/api/v1/auth/user",
  },
  register: {
    path: "/api/v1/auth/register",
    method: "POST",
    noAuth: true,
  },
  login: {
    path: "/api/v1/auth/login",
    method: "POST",
    noAuth: true,
  },
};
