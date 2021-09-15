import axios from "axios";

let Services = axios.create({
  baseURL: "http://localhost:5000",
  // timeout: 10000,
});

Services.interceptors.request.use((request) => {
  try {
    //request.headers["Authorization"] = "Bearer " + auth.getToken();
  } catch (e) {
    console.error(e);
  }
  return request;
});

Services.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response.status == 401 || 403) {
    //   auth.logout();
    // }
    return error.response;
  }
);

export default Services;
