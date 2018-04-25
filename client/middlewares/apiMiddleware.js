import axios from 'axios';

export default function apiMiddleware(url, method, data, headers = {}) {
  const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  return axios({ url, method, data, headers: { ...HEADERS, headers } })
      .then(res => {
        return res;
      });
}
