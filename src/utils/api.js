import axios from 'axios'

const base = ''
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let newData = ''
      for (const k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
      }
      return newData
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
