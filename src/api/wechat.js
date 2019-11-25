/* eslint-disable camelcase */
import { getOpenId } from './index'
// 数据存储
export function setStorageSync (key, data) {
  mpvue.setStorageSync(key, data)
}
// 获取本地数据
export function getStorageSync (key) {
  return mpvue.getStorageSync(key)
}
// 封装微信的查看用户授权信息
// 功能：可以查看相应授权信息，如果授权就调用success，没授权就fail
export function getSetting (auth, onSuccess, onFail) {
  mpvue.getSetting({
    success (res) {
      console.log(res)
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail()
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}
// 当用户已授权获取用户的信息，就可以调用getUserInfo的接口，获取用户基本信息
export function getUserInfo (onSuccess, onFail) {
  mpvue.getUserInfo({
    success (res) {
      let { userInfo } = res
      if (userInfo) {
        onSuccess(userInfo)
        setStorageSync('userInfo', userInfo)
      } else {
        onFail()
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}
// 获取openid
export function getUserOpenId (callback) {
  mpvue.login({
    success (res) {
      if (res.code) {
        let { code } = res
        getOpenId(code).then(res => {
          let { openid, session_key } = res.data
          setStorageSync('openid', openid)
          setStorageSync('session_key', session_key)
          callback && callback()
        }).catch()
      } else {
        console.log(res)
      }
    },
    fail (res) {
      console.log(res)
    }
  })
}
