import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.response.use(
  (res) => {
    if (res.data.status === 0) {
      return res.data;
    }

    throw res.data;
  },
  (res) => { throw res.response; },
);
