import Services from "../index";

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
        status: true,
      };
    }
  },
  async signup(username, email, password) {
    let response = await Services.post("/user/register", {
      username: username,
      email: email,
      password: password,
    });
    let data = await response.data;

    return data;
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
    } else return "Korisnik nije prijavljen.";
  },
  getAuthenticated() {
    let user = auth.getUser();
    if (user && user.token) return true;
    else return false;
  },
};

const updateProfile = {
  async updatePassword(user_id, new_password) {
    let response = await Services.patch({
      userId: user_id,
      password: new_password,
    });
    let data = await response.data;

    return data;
  },
  async updateUsername(user_id, username) {
    let response = await Services.patch({
      userId: user_id,
      username: username,
    });

    let data = await response.data;

    return data;
  },
};
export { auth, updateProfile };
