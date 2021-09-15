import Services from "../index";

const userDataUrl = "/user/data";

const getUserData = {
  async getUserMovieData(user_id, jw_id, type) {
    let response = await Services.get(
      `${userDataUrl}/userData?userId=${user_id}&jwId=${jw_id}&type=${type}`
    );
    let data = await response.data;

    return data;
  },
  async getUserSeasonData(user_id, movieUserDataId) {
    let response = await Services.get(
      `${userDataUrl}/userSeasonData?userId=${user_id}&movieUserDataId=${movieUserDataId}`
    );
    let data = await response.data;

    return data;
  },
  async getUserEpisodeData(seasonDataId) {
    let response = await Services.get(
      `${userDataUrl}/userEpisodeData?seasonDataId=${seasonDataId}`
    );
    let data = await response.data;

    return data;
  },
  async getUserCommentData(jw_id, season_jw_id, epNum) {
    let response = await Services.get(
      `${userDataUrl}/userCommentData?jwId=${jw_id}&seasonJwId=${season_jw_id}&episodeNumber=${epNum}`
    );
    let data = await response.data;

    return data;
  },
  async getUserCommentLikes(user_id, commentId) {
    let response = await Services.get(
      `${userDataUrl}/userCommentLikes?userId=${user_id}&commentId=${commentId}`
    );
    let data = await response.data;

    return data;
  },
};

const postUserData = {
  async postUserComment(user_id, jw_id, season_jw_id, episode_number, content) {
    let response = await Services.get(`${userDataUrl}/userComment`, {
      userId: user_id,
      jwId: jw_id,
      seasonJwId: season_jw_id,
      episodeNumber: episode_number,
      content: content,
    });
    let data = await response.data;

    return data;
  },
};

const patchUserData = {
  async patchMovieUserData(user_id, jw_id, type, changeObject) {
    let response = await Services.get(
      `${userDataUrl}/userData/${user_id}/${jw_id}/${type}`,
      changeObject
    );
    let data = await response.data;

    return data;
  },
  async patchUserSeasonData(user_id, season_jw_id, changeObject) {
    let response = await Services.get(
      `${userDataUrl}/userSeasonData/${user_id}/${season_jw_id}`,
      changeObject
    );
    let data = await response.data;

    return data;
  },
  async patchUserEpisodeData(user_id, season_jw_id, epNum, changeObject) {
    let response = await Services.get(
      `${userDataUrl}/userEpisodeData/${user_id}/${season_jw_id}/${epNum}`,
      changeObject
    );
    let data = await response.data;

    return data;
  },
  async patchUserComment(user_id, changeObject) {
    let response = await Services.get(
      `${userDataUrl}/userComment/${user_id}`,
      changeObject
    );
    let data = await response.data;

    return data;
  },
  async patchUserCommentData(user_id, comment_id, changeObject) {
    let response = await Services.get(
      `${userDataUrl}/userComment/${user_id}/${comment_id}`,
      changeObject
    );
    let data = await response.data;

    return data;
  },
};
export { getUserData, postUserData, patchUserData };
