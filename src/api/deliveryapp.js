import axios from "axios";

export default axios.create({
  //this will change every 8 hours so we need to update it
  baseURL: "https://delivery-app-be.herokuapp.com/api/v1/auth",
});
