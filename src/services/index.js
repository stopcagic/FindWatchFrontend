import axios from "axios";

let Services = axios.create({
  baseURL: "https://findwatch.herokuapp.com/",
  // timeout: 10000,
});

Services.interceptors.request.use((request) => {
  try {
    request.headers["Authorization"] = "Bearer " + auth.getToken();
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

const auth = {
  async login(email, password) {
    let response = await Services.post("/user/login", {
      email: email,
      password: password,
    });
    let data = await response.data;
    let status = response.status;

    if (status === 400)
      return {
        status: false,
        message: data,
      };
    else {
      localStorage.setItem("user", JSON.stringify(data));
      return {
        status: 200,
      };
    }
  },
  async signup(username, email, password, repeatPassword) {

    let response = await Services.post("/user/register", {
      username: username,
      email: email,
      password: password,
      repeat_password: repeatPassword
    });
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },
  logout() {
    localStorage.removeItem("user");
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  getToken() {
    let user = auth.getUser();
    if (user && user.token) {
      return user.token;
    } else return "User not logged In.";
  },
  getUserId() {
    let user = auth.getUser();
    if (user && user.user_id) {
      return user.user_id;
    } else return "User not logged In.";
  },
  getAuthenticated() {
    let user = auth.getUser();
    if (user && user.token) return true;
    else return false;
  },
};

const getUser = {
  async get(userId) {
    let response = await Services.get(`/user?userId=${userId}`)

    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  }
}

const updateProfile = {
  async updatePassword(user_id, new_password) {
    let response = await Services.patch("/user", {
      userId: user_id,
      password: new_password,
    });
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },
  async updateUsername(user_id, username) {

    let response = await Services.patch("/user", {
      userId: user_id,
      username: username,
    });

    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },
};


export { Services, auth, updateProfile, getUser };
