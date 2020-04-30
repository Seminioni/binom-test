import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

const appendParams = (to, from) => {
  Object.entries(from).forEach(([key, value]) => {
    to.append(key, value);
  });

  return to;
};

export const api = (url, options = {}) => {
  const apiKey = process.env.VUE_APP_TMDB_API_KEY;
  const defaultParams = new URLSearchParams();

  defaultParams.append('api_key', apiKey);

  if (!options.params) {
    options.params = {}
  }

  return instance({
    url: url + '?' + appendParams(defaultParams, options.params).toString(),
  });
};
