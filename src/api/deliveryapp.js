import axios from "axios";

export default axios.create({
  //this will change every 8 hours so we need to update it
  baseURL: "http://localhost:4000/api/auth",
});
