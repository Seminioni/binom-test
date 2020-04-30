import { api } from '@/modules/api.js';

export const getMovie = id => {
  return new Promise((resolve, reject) => {
    try {
      resolve(api(`/movie/${id}`));
    } catch (e) {
      reject(e);
    }
  });
};
