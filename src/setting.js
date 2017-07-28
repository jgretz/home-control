import axios from 'axios';

export default () =>
  axios.get('http://gretzlab.com/api/tv')
    .then(response => response.data[0].allowedOn);
