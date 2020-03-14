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
export default {
  getProvince,
  getCity,
  getOrganizations,
  userLogin,
  userRegist
}
