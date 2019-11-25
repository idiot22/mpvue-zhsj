import { get } from '../utils/request'
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
