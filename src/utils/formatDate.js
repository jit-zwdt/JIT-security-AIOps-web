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
  }
}
export {
  timesMethod
}
