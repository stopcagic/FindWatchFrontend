import { Services } from "../index";

const movies = {
  async mostPopular() {
    let response = await Services.get(`/movies/mostPopular/`);
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },
  async inTheaters() {
    let response = await Services.get(`/movies/inTheaters/`);
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },
  async commingSoon() {
    let response = await Services.get(`/movies/commingSoon/`);
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },
  async top250() {
    let response = await Services.get(`/movies/top250/`);
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },
};

export { movies };
