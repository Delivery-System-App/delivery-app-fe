import axios from "axios";

export default axios.create({
  //this will change every 8 hours so we need to update it
  baseURL: "http://eeb327698b72.ngrok.io",
});
