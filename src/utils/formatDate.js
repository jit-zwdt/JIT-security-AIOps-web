const timesMethod = {
  // 当前时间转日期格式
  // 时间戳转换成日期时间
  getTimestamp: function (timestamp) {
    if (timestamp) {
      var date = new Date(timestamp * 1000) // 时间戳为10位需*1000(为秒)，时间戳为13位的话不需乘1000(毫秒)
      var Y = date.getFullYear()
      var M =
        date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var m =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var s = date.getSeconds()
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    }
  },
  getDatestamp: function (time) {
    // 把时间日期转成时间戳
    return (new Date(time)).getTime() / 1000
  },
  fun_date: function (num) {
    var date1 = new Date()
    // var time1 = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() // time1表示当前时间
    var date2 = new Date(date1)
    date2.setDate(date1.getDate() + num)
    var time2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()
    return time2
  },
  formattedTime: function (seconds) {
    // 把秒数转化成"天-时-分-秒"或者"时-分-秒"的形式
    seconds = parseInt(seconds)
    var s = seconds % 60
    var minutes = parseInt(seconds / 60)
    var m = minutes % 60
    var hours = parseInt(minutes / 60)
    var h = hours % 24
    var d = parseInt(hours / 24)

    if (d > 0) {
      return d + '天' + h + '小时' + m + '分' + s + '秒'
    } else {
      return h + '小时' + m + '分' + s + '秒'
    }
  },
  getConvertTime: function (value) {
    var theTime = parseInt(value)// 秒
    var middle = 0// 分
    var hour = 0// 小时

    if (theTime > 60) {
      middle = parseInt(theTime / 60)
      theTime = parseInt(theTime % 60)
      if (middle > 60) {
        hour = parseInt(middle / 60)
        middle = parseInt(middle % 60)
      }
    }
    var result = '' + parseInt(theTime) + '秒'
    if (middle > 0) {
      result = '' + parseInt(middle) + '分' + result
    }
    if (hour > 0) {
      result = '' + parseInt(hour) + '小时' + result
    }
    return result
  }
}
export {
  timesMethod
}
