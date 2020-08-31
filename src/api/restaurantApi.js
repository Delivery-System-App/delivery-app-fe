import axios from "axios";

// export default axios.create({
//   baseURL: "https://developers.zomato.com/api/v2.1",
//   headers: { "user-key": "f9f44a8e1ca3f927da2c23a1ce877b2e" },
// });

export default axios.create({
  baseURL: "https://delivery-app-be.herokuapp.com/api/v1/restaurant",
  // headers: { "user-key": "f9f44a8e1ca3f927da2c23a1ce877b2e" },
});
