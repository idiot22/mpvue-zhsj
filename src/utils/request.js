function initFly () {
  if (mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  } else {
    return null
  }
}

let fly = initFly()
fly.config.timeout = 10 * 1000
fly.config.headers.cookie = 'SESSION=0ac88323-26ae-49a4-bb53-bcdf46eaa3c1'
fly.config.baseURL = 'https://zhsj.bnuz.edu.cn/ComprehensiveSys'
fly.interceptors.request.use((request) => {
  wx.showLoading({ title: '拼命加载中...' })
  console.log('正在加载中')
  return request
})
fly.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    if (response.data.code !== 200) {
      wx.showToast({
        title: response.data.detail,
        icon: 'none'
      })
    }
    // else {
    //   wx.showToast({
    //     title: response.data.detail,
    //     icon: 'none'
    //   })
    // }
    return promise.resolve(response.data)
  },
  (err, promise) => {
    console.log(err)
    wx.hideLoading()
    wx.showToast({
      title: err,
      icon: 'none'
    })
    return promise.resolve()
  }
)
export function get (url, params = {}) {
  if (fly) {
    // eslint-disable-next-line no-new
    return new Promise((resolve, reject) => {
      fly.get(url, params).then(res => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

export function post (url, params, options) {
  if (fly) {
    // eslint-disable-next-line no-new
    return new Promise((resolve, reject) => {
      fly.post(url, params, options).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
