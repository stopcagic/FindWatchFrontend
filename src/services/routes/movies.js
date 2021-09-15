import Services from "../index";

const movies = {
  async mostPopular() {
    let response = await Services.get(`/movies/mostPopular/`);
    let data = await response.data;

    return data;
  },
  async inTheaters() {
    let response = await Services.get(`/movies/inTheaters/`);
    let data = await response.data;

    return data;
  },
  async commingSoon() {
    let response = await Services.get(`/movies/commingSoon/`);
    let data = await response.data;

    return data;
  },
  async top250() {
    let response = await Services.get(`/movies/top250/`);
    let data = await response.data;

    return data;
  },
};

export { movies };
