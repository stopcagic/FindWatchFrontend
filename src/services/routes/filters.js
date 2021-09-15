import Services from "../index";

const filters = {
  async filter(
    type = "movie",
    genres = null,
    ratingMin = null,
    ratingMax = null,
    releaseYearFrom = null,
    releaseYearTo = null
  ) {
    let response = await Services.post("/user/login", {
      type: "movie",
      releaseYear: {
        from: releaseYearFrom,
        to: releaseYearTo,
      },
      genres: genres,
      rating: {
        min: ratingMin,
        max: ratingMax,
      },
    });
    let data = await response.data;
    return data;
  },
};

export { filters };
