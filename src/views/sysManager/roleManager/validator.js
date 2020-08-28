import axios from '@/utils/http'

export function isRoleNameExisted (rule, value, callback) {
  const title = '角色名称'
  if (!value) {
    return callback(new Error(title + '不可以为空'))
  }
  if (rule.extend === value) { // code unchange
    return callback()
  }
  setTimeout(() => {
    axios.get('/sys/role/checkRoleName/' + value).then((resp) => {
      if (resp.status === 200) {
        const json = resp.data
        if (json.code === 1) {
          if (json.data === true) {
            callback(new Error(title + '已存在！'))
          } else {
            callback()
          }
        } else {
          callback(new Error(title + '校验失败！'))
        }
      } else {
        callback(new Error(title + '校验失败！'))
      }
    })
  }, 0)
}

export function isRoleSignExisted (rule, value, callback) {
  const title = '角色标识'
  if (!value) {
    return callback(new Error(title + '不可以为空'))
  }
  if (rule.extend === value) { // code unchange
    return callback()
  }
  setTimeout(() => {
    axios.get('/sys/role/checkRoleSign/' + value).then((resp) => {
      if (resp.status === 200) {
        const json = resp.data
        if (json.code === 1) {
          if (json.data === true) {
            callback(new Error(title + '已存在！'))
          } else {
            callback()
          }
        } else {
          callback(new Error(title + '校验失败！'))
        }
      } else {
        callback(new Error(title + '校验失败！'))
      }
    })
  }, 0)
}
