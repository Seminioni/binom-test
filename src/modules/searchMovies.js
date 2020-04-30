import { api } from '@/modules/api.js';
import { MovieDoesntExistsError } from '@/modules/errors.js';

export const searchMovies = async ({ query, page = 1 }) => {
  let response;

  const resolveSearch = async promise => {
    try {
      response = await promise;

      return response.data;
    } catch (e) {
      if (response && response.data.results.length === 0) {
        throw new MovieDoesntExistsError('There is no film you are finding!');
      } else {
        throw e;
      }
    }
  };

  switch (query) {
    case 'trending':
      return resolveSearch(
        api('/trending/all/week', {
          params: {
            page,
          },
        }),
      );
    default:
      return resolveSearch(
        api(`/search/movie`, {
          params: {
            query,
            page,
          },
        }),
      );
  }
};
