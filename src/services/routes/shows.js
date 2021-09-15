import Services from "../index";

const shows = {
  async mostPopular() {
    let response = await Services.get(`/movies/mostPopular/`);
    let data = await response.data;

    return data;
  },
};

export { shows };
