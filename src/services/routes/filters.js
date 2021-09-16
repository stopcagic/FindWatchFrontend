import { Services } from "../index";

const filters = {
  async filter(
    type = null,
    genres = null,
    ratingMin = null,
    ratingMax = null,
    releaseYearFrom = null,
    releaseYearTo = null
  ) {

    const body = {
      type: type,
      releaseYear: {
        from: releaseYearFrom,
        to: releaseYearTo
      },
      genres: genres,
      rating: {
        min: ratingMin,
        max: ratingMax
      }
    }

    let response = await Services.post("/filter", body);
    let data = await response.data;
    return data.items;
  },
};

export { filters };
