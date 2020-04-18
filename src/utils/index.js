function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function formatDate (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const t1 = [year, month, day].map(formatNumber).join('-')
  return t1
}
export function getTimeDiff (startTime, endTime) {
  let start = new Date(startTime)
  let end = new Date(endTime)
  let diffTime = end - start
  let month = diffTime.getMonth() + 1
  return month
}
export function getWeek (week) {
  let str = ''
  switch (week) {
    case 0 :
      str = '星期日'
      break
    case 1 :
      str = '星期一'
      break
    case 2 :
      str = '星期二'
      break
    case 3 :
      str = '星期三'
      break
    case 4 :
      str = '星期四'
      break
    case 5 :
      str = '星期五'
      break
    case 6 :
      str = '星期六'
      break
  }
  return str
}
export default {
  formatNumber,
  formatTime,
  formatDate
}
