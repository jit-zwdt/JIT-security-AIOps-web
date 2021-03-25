import axios from '@/utils/http'
import api from '@/api/api'

export function isExisted (rule, value, callback) {
  if (!value) {
    return callback(new Error('部门编码不可以为空'))
  }
  if (rule.extend === value) { // code unchange
    return callback()
  }
  setTimeout(() => {
    axios.get(api.sysManager.checkDepartCode + value).then((resp) => {
      if (resp.status === 200) {
        const json = resp.data
        if (json.code === 1) {
          if (json.data === true) {
            callback(new Error('部门编码已存在！'))
          } else {
            callback()
          }
        } else {
          callback(new Error('部门编码校验失败！'))
        }
      } else {
        callback(new Error('部门编码校验失败！'))
      }
    })
  }, 0)
}
