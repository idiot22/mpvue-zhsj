# mpvue综合实践平台

## 过程

### 首页

#### 3D轮播图和翘边阴影的实现

思路:通过curIndex来控制banner的状态和播放动画

handleChange($event)监听滚动时curIndex的变化

````
    <!--swiper-->
    <div class="swiper-wraper">
      <swiper :indicator-dots="true"
        :autoplay="true"
        :circular="true"
        @change="handleChange($event)"
        previous-margin='50px'
        next-margin='50px'>
        <block v-for="(item, index) in bannerUrl" :key="index">
          <swiper-item class="img-item">
            <img :src="item" alt="" class="banner" :animation="index == curIndex ? animationBanner1 : animationBanner2">
            <div class="shadow-left" :style="{opacity:index == curIndex ? 1 : 0}"></div>
            <div class="shadow-right" :style="{opacity:index == curIndex ? 1 : 0}"></div>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!--/swiper-->
````

````
    handleChange (e) {
      this.curIndex = e.mp.detail.current
      this.bannerSmallAni()
      this.bannerBigAni()
    },
    _initBanner () {
      this.bannerSmallAni()
      this.bannerBigAni()
    },
    bannerSmallAni () {
      let animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      animation.scale(0.85).opacity(0.3).step()
      this.animationBanner2 = animation.export()
    },
    bannerBigAni () {
      let animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      animation.scale(1).opacity(1).step()
      this.animationBanner1 = animation.export()
    }
````

[**翘边阴影**](https://blog.csdn.net/willspace/article/details/52781055)

[skew](http://www.lvyestudy.com/css3/css3_9.5.aspx)

- （1）skewX()方法会保持高度，沿着X轴倾斜；
- （2）skewY()方法会保持宽度，沿着Y轴倾斜；
- （3）skew(x,y)方法会先按照skewX()方法倾斜，然后按照skewY()方法倾斜；

#### 横向滚动注意

1.**scroll-view 要设置明确的宽**

2.**scroll-view的最外层div要加以下样式**

```
overflow:hidden;
  white-space:nowrap
```

3.**scroll-view 中需要滑动的元素应该使用 display：inline-block，来使元素横向排版；**

### 个人中心

1.用scroll-view实现上划下拉功能，下拉到临界点有回弹效果，但是scroll中的内容不会显示在组件外，要实现上拉功能，只能copy一层card，通过scroll派发的事件监听scrollY的值，来使外面一层card移动。

2.当移到下拉临界点，外面card消失，让在scroll里面的card显性，这样就可以有回弹效果

3.上划监听scrollY来控制各种临界位置的变化

4.:style不能直接以返回对象的方式绑定

### 列表页

#### 筛选功能

1.实现进入页面时，选择btn的延迟向上播放并opacity渐变

+ 都给元素添加相同的动画

  ```
      .ani-up{
        animation: upani 1s ease;
        animation-fill-mode: forwards; //使元素状态停留在最后一帧
      }
      @keyframes upani {
        0%{
          transform: translateY(40px);
          opacity: 0;
        }
        100%{
          transform: translateY(0px);
          opacity: 1;
        }
      }
  ```

+ 给元素用延迟animation-delay

  ```
  :style="{'animation-delay':(index-1)*0.1+'s'}" //index越大延长越长
  ```

2.全局控制筛选页面的显示与隐藏

+ 配置vuex

### 登录页

1.输入框动画效果

### 用户授权

+ 先判断用户授权了什么

  > getSetting可以查看用户开放了什么功能接口，从而可以调用相应接口
  >
  > 查看用户信息就看getsetting返回有无userInfo的值，有的话就可以调用getUserInfo的接口，获取用户信息

  ```
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
  ```

+ 如果用户授权了可以获取用户信息

  > getUserInfo就可以获取到用户的信息，比如头像，省份等

  ```
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
  ```

  - 没有授权就让用户授权

    ```
    //点击按钮就开放getUserInfo的接口
    <button
      @getuserinfo="getUserInfo"
      open-type="getUserInfo"
    >
      授权登录
    </button>
    ```

### 获取用户openId

+ wx.login获取临时的code，通过code去获取openid

+ https://api.weixin.qq.com/sns/jscode2session发起get请求，将code和appid和appsecret传入，服务器就会返回相应的openid

  ```
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
  ```

       ````
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
       ````



## api

### api接口

1.登录

| 内容 | url                                                          | 获取方法 | 参数 |
| ---- | ------------------------------------------------------------ | -------- | ---- |
| 省份 | https://zhsj.bnuz.edu.cn/ComprehensiveSys//teacher/provinces | get      |      |
| 城市 |                                                              |          |      |
| 学校 |                                                              |          |      |



## 新增功能：

1.每日答题区域

## 用户体验

1.图片组件的开发

提供图片懒加载、预加载等功能

## 代码模块化

1.对于wx的api封装都放入wechat.js

## 问题

### vant

1.引入vant按钮，用color属性修改不了btn颜色

```
<van-button color="#7232dd">单色按钮</van-button>
```

**解决**

```
//新增一个不带scoped的style，写入要修改的类名和样式
<style>
.van-button--large{   
  background: #00c5bc !important; //!important提高优先级
  color: white !important;
}
</style>
```

### 布局

1.scroll-view横向滚动无效（看首页过程解决）

2.:style="{backgroundImage:'url('+item.imgUrl+')'}"

3.隐藏scroll-view滚动条，详情见兼容

### 动画

### 小程序

1. ```
   :style="topBarStyle" //不能这样绑定
   computed:{
       topBarStyle () {
           return {
             opacity: 1
           }
         }
       }
   }
   ```

   解决

   ```
   :style="topBarStyle" //不能这样绑定
   computed:{
       topBarStyle () {
           return showJson({
             opacity: 1
           })
         }
   }
   
   // 将对象转变为style字符串
   export function showJson (style) {
     let s = []
     for (let i in style) {
       s.push(i + ':' + style[i])
     }
     s = s.join(';')
     return s
   }
   ```

   

## 小技巧

### 动画

1.让css animation 动画停在最后一帧

```
animation-fill-mode: forwards;
```

2.播放延迟

```
animation-delay
```

### 小程序

- onPageScroll
- onReachBottom
- onshow在每次页面出现就会调用一次，mouted出现一次，页面就会缓存起来，下次出现也不会调用

### 样式布局

1.:style="{backgroundImage:'url('+item.imgUrl+')'}"

2.背景

background-size: 100% 100%;

### mpvue

1.**用于查看vuex相关数据，方便bug排查**

`在store目录下的index.js中引入vuex内置的打印功能如下：`

```
 import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

```

## 性能

https://www.jianshu.com/p/6903d3158390

## 兼容

1.scroll-view隐藏滚动条

安卓端

```
::-webkit-scrollbar {

  width: 0;

  height: 0;

  color: transparent;

}
```

但ios端还是看的见滚动

所以加宽scroll-view的内容，使它溢出view，看不见滚动条

```
给scroll-view设置padding-left让scroll-view的宽度大于手机的宽度（也就是让滚动条超出屏幕不显示在屏幕内）
```

## 第三方库的安装

```bash
npm i -D sass-loader node-sass
```

```bash
npm i -S mpvue-router-patch
```

```bash
npm i -S flyio
```

## 之后查询

1.mapmutation

## mpvue与小程序与vue

### mpvue中使用vuex注意事项

vue

```
import store from './vuex'，
new Vue({
  el: '#app',
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  components: { App },
  template: '<App/>'
})
```

mpvue

```
import store from './vuex'
Vue.prototype.$store=store;//添加即可
```

## wx接口

1.用微信接口时，可以新建一个wechat文件，放微信接口

2.wx. =mpvue.