import { Services } from "../index";

const fetch = {
  async search(expression) {
    let response = await Services.get(`/search?expression=${expression}`);
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },

  async getMovieInfo(jw_id, type, user_id) {
    let response = await Services.get(
      `/jw_info?jw_id=${jw_id}&type=${type}&user_id=${user_id}`
    );
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };;
  },
  async getSeasonInfo(show_id) {
    let response = await Services.get(`/jw_season_info?show_id=${show_id}`);
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },
  async getByProperty(user_id, property) {
    let response = await Services.get(`/${user_id}/${property}`);
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },
  async getRecommended(user_id) {
    let response = await Services.get(`/recommendations?userId=${user_id}`);
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },
  async getUpdates(user_id) {
    let response = await Services.get(`/notifications?userId=${user_id}`);
    let data = await response.data;
    let status = response.status

    return {
      status: status,
      message: data,
    };
  },
};

export { fetch };
