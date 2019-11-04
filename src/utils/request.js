function initFly () {
  if (mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  } else {
    return null
  }
}

export function get (url, params = {}) {
  let fly = initFly()
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

export function post (url, params) {
  let fly = initFly()
  if (fly) {
    // eslint-disable-next-line no-new
    return new Promise((resolve, reject) => {
      fly.post(url, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
