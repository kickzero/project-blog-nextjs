import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import Cookies from "js-cookie";

type ConfigType = {
  data?: any;
  token?: string;
  method?: string;
}

const API = {
  call() {
    return axios.create({
      baseURL: 'http://wp-api.test/wp-json'
    });
  },
  callWithToken(token?: any) {
    // if(!token) token = localStorage.getItem(ACCESS_TOKEN);
    if(!token) token = Cookies.get('token');
    
    return axios.create({
      baseURL: 'http://wp-api.test/wp-json',
      headers: { Authorization: 'Bearer ' + token},
    });
  },
  callJson: async (url: string, { data, method = 'GET', token }: ConfigType = {}) => {
    const URL = `${'http://wp-api.test/wp-json'}${url}`;
    const config = {
        method,
        headers: {
            Authorization: '',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    if(token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(URL, config).then(res => res.json())
}
}

export default API;