import Axios from 'axios';

export default Axios.create({
  baseURL: 'http://sixtybpm-local:8888/wp-json/wp/v2',
  params: {
    format: 'json'
  }
});
