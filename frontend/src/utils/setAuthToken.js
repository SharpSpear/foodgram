import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    axios.defaults.headers.common["Authorization"] = null;
  }
};

export default setAuthToken;