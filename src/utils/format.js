export function formatTodate (date, format) {
  if (!date) {
    return ''
  }
  let d = ''
  d = new Date(date)

  // 年
  if (/YYYY/.test(format)) {
    format = format.replace(/YYYY/, d.getFullYear())
  }
  // 月份
  let month = ''
  month = d.getMonth() + 1
  if (/MM/.test(format)) {
    let monthStr = ''
    monthStr = month < 10 ? '0' + month : month
    format = format.replace(/MM/, monthStr)
  } else if (/M/.test(format)) {
    format = format.replace(/M/, month)
  }
  // 日期
  let dates = ''
  dates = d.getDate()
  if (/DD/.test(format)) {
    let dateStr = ''
    dateStr = dates < 10 ? '0' + dates : dates
    format = format.replace(/DD/, dateStr)
  } else if (/D/.test(format)) {
    format = format.replace(/D/, dates)
  }
  // 小时
  let hours = ''
  hours = d.getHours()
  if (/HH/.test(format)) {
    let hoursStr = ''
    hoursStr = hours < 10 ? '0' + hours : hours
    format = format.replace(/HH/, hoursStr)
  } else if (/H/.test(format)) {
    format = format.replace(/H/, hours)
  } else if (/hh/.test(format)) {
    let hoursMin = ''
    let hoursStr = ''
    hoursMin = hours > 12 ? hours - 12 : hours
    hoursStr = hoursMin < 10 ? '0' + hoursMin : hoursMin
    format = format.replace(/hh/, hoursStr)
  } else if (/h/.test(format)) {
    let hoursMin = ''
    hoursMin = hours > 12 ? hours - 12 : hours
    format = format.replace(/h/, hoursMin)
  }
  // 分
  let minutes = ''
  minutes = d.getMinutes()
  if (/mm/.test(format)) {
    let minutesStr = ''
    minutesStr = minutes < 10 ? '0' + minutes : minutes
    format = format.replace(/mm/, minutesStr)
  } else if (/m/.test(format)) {
    format = format.replace(/m/, minutes)
  }
  // 秒
  let seconds = ''
  seconds = d.getSeconds()
  if (/ss/.test(format)) {
    let secondsStr = ''
    secondsStr = seconds < 10 ? '0' + seconds : seconds
    format = format.replace(/ss/, secondsStr)
  } else if (/s/.test(format)) {
    format = format.replace(/s/, seconds)
  }
  return format
}

export function compareDate (d1, d2) {
  let reg = ''
  reg = new RegExp('-', 'g')
  return ((new Date(d1.replace(reg, '/'))) > (new Date(d2.replace(reg, '/'))))
}
