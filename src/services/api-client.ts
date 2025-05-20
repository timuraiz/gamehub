import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "95d160eea0294f10ac122494b9c1f6e5",
  },
});