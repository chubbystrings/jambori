import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://questions.aloc.com.ng/api/v2',
  headers: { AccessToken: process.env.VUE_APP_ALOC_TOKEN, Accept: 'application/json', 'Content-Type': 'application/json' },
});

export default instance;
