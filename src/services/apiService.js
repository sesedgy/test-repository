import axios from 'axios';
import { API_CONFIG } from '../constants';

const instance = axios.create({
  baseURL: `${API_CONFIG.protocol}://${API_CONFIG.hostName}${API_CONFIG.versionPath}`,
  timeout: 1000,
});

class ApiService {
  static get(path) {
    return instance.get(`/${path}`);
  }

  static post(path, requestBody) {
    return instance.post(`/${path}`, requestBody);
  }

  static getByFullUrl(url) {
    return axios.get(url);
  }

  static async getList(promisesList) {
    let resultsList = [];
    await Promise.all(promisesList).then((results) => {
      resultsList = results;
    }).catch(() => {
      // TODO обработка ошибок
    });
    return resultsList;
  }
}

export default ApiService;
