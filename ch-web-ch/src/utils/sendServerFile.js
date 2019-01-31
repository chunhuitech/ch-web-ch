import axios from 'axios'

let baseUrl = process.env.BASE_API;

axios.defaults.withCredentials = true;//默认不支持传cookie
export const sendServerFileFuc = obj => {
  // export function sendServerFile(obj) {
  let url=baseUrl+obj.url;
  if (!obj.method || obj.method.toLocaleLowerCase() == "post") {
    return axios.post(url, obj.data).
      then(res => {
        obj && obj.suc && obj.suc(res);
      }).catch(error => {
        obj && obj.err && obj.err(error);
      });
  }

}
