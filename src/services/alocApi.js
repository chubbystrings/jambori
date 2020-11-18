import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://questions.aloc.ng',
});

export default instance;
