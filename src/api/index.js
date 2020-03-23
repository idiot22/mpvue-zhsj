import { get, post } from '../utils/request'
import { APP_ID, APP_SECRET } from '../utils/const'
const wxApi = 'https://api.weixin.qq.com/sns/jscode2session'

export function getOpenId (code) {
  console.log(code)
  return get(wxApi, {code,
    appid: APP_ID,
    secret: APP_SECRET,
    js_code: code,
    grant_type: 'authorization_code'
  })
}
// 登录注册页
function getProvince () {
  return get(`teacher/provinces`)
}

function getCity (province) {
  return get(`teacher/provinces/${province}/cities`)
}

function getOrganizations (province, city) {
  return get(`teacher/provinces/${province}/cities/${city}/organizations`)
}

function userLogin (params, options) {
  return post(`api/login/student`,
    params, options)
}
function userRegist (params) {
  return post(`student/unfilter/register?${params}`)
}

// 首页
function getSchedule (params) {
  return get(`student/getSchedule`, params)
}
function getCourseList (params) {
  return get(`student/initCourseList`, params)
}
// 通知消息
function getNotices (id, params) {
  return get(`/student/notice/13955062-7391-4477-8a34-e76960605700`, params)
}
function getMessages (params) {
  return get(`/student/getMessages`, params)
}
function isRead (params) {
  return post(`/student/read?messageId=${params}`)
}

// 获取学生课程
function getStudentClass () {
  return get(`/student/initStudentClass`)
}
// 获取雷达数据
function getRadar (params) {
  return get('/student/initRadar', params)
}
// 获取订单
function getMyOrder (params) {
  return get('/student/getMyOrder', params)
}
export default {
  getProvince,
  getCity,
  getOrganizations,
  userLogin,
  userRegist,
  getSchedule,
  getCourseList,
  getNotices,
  getMessages,
  isRead,
  getStudentClass,
  getRadar,
  getMyOrder
}
