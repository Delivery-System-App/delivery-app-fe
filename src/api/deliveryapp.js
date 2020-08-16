import axios from "axios";

export default axios.create({
  //this will change every 8 hours so we need to update it
  baseURL: "http://localhost:3000/api/v1/auth",
});
