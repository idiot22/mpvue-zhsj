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
function initStudentClass () {
  return get('/student/initStudentClass')
}
// 作品墙
function getWorkWall (params) {
  return get('/student/getAllProduct', params)
}
// 提交作品课程
function getMyCourse (params) {
  return get('/student/getMyCourse', params)
}
// 提交
function uploadImg (params) {
  let options = {headers: {'content-type': 'application/x-www-form-urlencoded'}}
  return post('/student/postProduct', params, options)
}
// 获取活动列表
function getAllActivities (params) {
  return post('/api/activity/getAllActivities', params)
}
// 获取活动详情
function getActivyDetail (id) {
  return post(`/api/activity/activityDetail/activity/${id}`)
}
// getTeam
function getTeam (id) {
  return get(`/student/Team/${id}`)
}
// 报名
function signUp (params, teamId, processId, contactId) {
  let options = {headers: {'content-type': 'application/x-www-form-urlencoded'}}
  return post(`/student/Team/${teamId}/${processId}/${contactId}`, params, options)
}
// 获取学生的详细信息
function getStudentDetail () {
  return get('/student/getStudentDetail')
}
// 创建group
function addGroup (params, item) {
  return post(`/student/Team/${item.studentId}?processId=${item.processId}&teamName=${item.teamName}&teamType=${item.teamType}&parentMen=${item.parentMen}&parentWomen=${item.parentWomen}`, params)
}
// 素养
function initCurrencyType () {
  return get('/student/initCurrencyType')
}
// 申报
function report (params) {
  return post('/student/customDeclare', params)
}
// 获取历史申报
function getMyDeclare (week) {
  return get('/student/getMyDeclare', {week: week})
}
// 提交作品
function postZuopin (params) {
  let options = {headers: {'content-type': 'multipart/form-data'}}
  return post('/student/postProduct', params, options)
}
function getUserInfo (params) {
  return get('/student/getStudentInfo')
}
function getFriendList (params) {
  return get('/student/getAllStudent', params)
}
function addFriend (params) {
  let options = {headers: {'content-type': 'application/x-www-form-urlencoded'}}
  return post('/student/addFriend', params, options)
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
  getMyOrder,
  initStudentClass,
  getWorkWall,
  getMyCourse,
  uploadImg,
  getAllActivities,
  getActivyDetail,
  getTeam,
  signUp,
  getStudentDetail,
  addGroup,
  initCurrencyType,
  report,
  getMyDeclare,
  postZuopin,
  getUserInfo,
  getFriendList,
  addFriend
}
