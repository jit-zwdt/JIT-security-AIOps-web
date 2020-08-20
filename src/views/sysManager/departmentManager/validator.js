import axios from '@/utils/http'

export function isExisted (rule, value, callback) {
  if (!value) {
    return callback(new Error('部门编码不可以为空'))
  }
  setTimeout(() => {
    axios.get('/sys/department/checkDepartCode/' + value).then((resp) => {
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
