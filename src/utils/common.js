/**
 * 重置对象（会修改原始对象）
 * @param object
 * @param defaultVal
 */
export function resetObject (object, defaultVal = {}) {
  for (const k in object) {
    // eslint-disable-next-line no-prototype-builtins
    if (defaultVal.hasOwnProperty(k)) {
      object[k] = defaultVal[k]
    } else {
      if (Array.isArray(object[k])) object[k] = []
      if (typeof object[k] === 'string') object[k] = ''
      if (typeof object[k] === 'number') object[k] = null
      if (typeof object[k] === 'boolean') object[k] = false
    }
  }
}

export function setToken (token, refreshToken) {
  sessionStorage.setItem('token', token)
  sessionStorage.setItem('refreshToken', refreshToken)
}

export function clearToken () {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('refreshToken')
}

export function getToken () {
  return sessionStorage.getItem('token')
}

export function getRefreshToken () {
  return sessionStorage.getItem('refreshToken')
}
