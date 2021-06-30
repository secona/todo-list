import axios from 'axios';

export const configAxios = () => {
  axios.defaults.validateStatus = function (status) {
    return status < 500;
  };
};
