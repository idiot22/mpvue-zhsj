<template>
  <div class="index">
    <auth v-if="isAuth" @getUserInfo='_getSetting'></auth>
    <!--search-->
    <div class="search-wraper"> 
      <van-search
            :value="value"
            :background="searchStyle.bgColor"
            placeholder="请输入搜索关键词"
            :shape="searchStyle.shape"
            use-action-slot
            class="reset"
            @change="onChange"
            @search="onSearch"
            @focus = "toPageMore">
            <view slot="action" @click="onSearch" >搜索</view>
      </van-search>
    </div>
    <!--/search-->
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
    <!--tab-->
    <div class="tab">
      <div class="row">
        <div class="col" v-for='(item, index) in tabImgUrl' :key='index'>
          <navigator :url='item.pathTo'>
            <img :src="item.imgUrl" alt="">
            <p>{{item.text}}</p>
          </navigator>
        </div>
      </div>
    </div>
    <!--/tab-->
    <!--myCourse-->
    <div class="my-course">
      <title-bar :text="'我的课程'"></title-bar>
      <div class="content-wraper">
        <scroll-view scroll-x >
          <div class='content'>
            <show-image-card
            v-for='(item,index) in mycourse' :key='index'
            :imgUrl='item.imgUrl' 
            :title="item.course" 
            :time="item.day+' '+item.time"
            :status='item.flag'>
            </show-image-card>
            <div class="marginleft">
             <card-show-more :url="'../../pages/list/main'"></card-show-more>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
    <!--myCourse-->
    <!--enrollCourse-->
    <div class="enroll-course">
      <title-bar :text="'报名课程'"></title-bar>
      <van-card
        class="card"
        num="最新课程"
        :price="item.price"
        :title="item.title"
        title-class='title-class'
        :thumb="item.courseImg"
        :origin-price="'4000'"
        v-for="(item,index) in  kcbaoming"
        :key="index"
        >
        <div slot="desc">
          <van-tag plain class='desc-tag'>一年级</van-tag>
        </div>
      </van-card>
      <div class="btn-wraper">
        <van-button style='margin:0 auto;border-radius:20px;border:2rpx #a29b9b；font-family:Source Han Serif SCS'>查看更多课程</van-button>
      </div>
    </div>
    <!--/enrollCourse-->

    <!--myActivity-->
    <div class="my-course">
      <title-bar :text="'我的活动'"></title-bar>
      <div class="content-wraper">
        <scroll-view scroll-x class='content'>
          <div class='content'>
            <show-image-card
            v-for='(item,index) in myactivity' :key='index'
            :imgUrl='item.imgUrl' 
            :title="item.course" 
            :time="item.day+' '+item.time"
            :status='item.flag'>
            </show-image-card>
            <div class="marginleft">
             <card-show-more></card-show-more>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
    <!--myActivity-->

    <!--enrollActivity-->
    <div class="enroll-course">
      <title-bar :text="'报名活动'"></title-bar>
      <van-card
        class="card"
        num="最新活动"
        :price="item.price"
        :title="item.title"
        title-class='title-class'
        :thumb="item.courseImg"
        :origin-price="'4000'"
        v-for="(item,index) in  kcbaoming"
        :key="index"
        >
        <div slot="desc">
          <van-tag plain class='desc-tag'>一年级</van-tag>
        </div>
      </van-card>
      <div class="btn-wraper">
        <van-button style='margin:0 auto;border-radius:20px;border:2rpx #a29b9b;font-family:Source Han Serif SCS'>查看更多课程</van-button>
      </div>
    </div>
    <!--enrollActivity-->

    <!--inform-->
    <div class="inform-wraper">
      <van-panel title="最新通知"  status="最近一周">
        <view>
          <van-swipe-cell id="swipe-cell" 
                :right-width="65" 
                :left-width="0" 
                async-close 
                @close="onClose"
                v-for="(item,index) in inform" :key='index'>
            <van-cell-group>
              <van-cell  :value="item.isread">
                <view slot="title" class="title">
                  <span class="iconfont icon-dian"></span>
                  <view class="van-cell-text">
                    <p>{{item.title}}</p>
                    <p class="info-desc">{{item.label}}</p>
                  </view>
                </view>
              </van-cell>
            </van-cell-group>
            <view slot="right">删除</view>
          </van-swipe-cell>
        </view>
      </van-panel>
    </div>
    <!--/inform-->
    <vue-tab-bar></vue-tab-bar>
  </div>
</template>

<script>
import vueTabBar from '@/components/vueTabBar.vue'
import { bannerUrl, tabImgUrl } from '@/utils/data.js'
import titleBar from '@/components/titleBar.vue'
import showImageCard from '@/components/showImageCard.vue'
import cardShowMore from '@/components/cardShowMore.vue'
import { getSetting, getUserInfo, getUserOpenId } from '@/api/wechat.js'
import Auth from '../../base/Auth'
export default {
  components: {
    vueTabBar,
    titleBar,
    showImageCard,
    cardShowMore,
    Auth
  },
  data () {
    return {
      isAuth: false,
      searchStyle: {
        bgColor: '#f2f2f2',
        shape: 'round'
      },
      bannerUrl: bannerUrl,
      animationBanner2: {},
      animationBanner1: {},
      curIndex: 0,
      tabImgUrl: tabImgUrl,
      mycourse: [{
        flag: '进行中',
        imgUrl: 'http://localhost/zhsj/image/courses/课程.jpg',
        course: 'David',
        day: '2019-04-19',
        time: '15:00'
      },
      {
        flag: '一天后',
        imgUrl: 'http://localhost/zhsj/image/courses/课程02.jpg',
        course: 'Susan',
        day: '2019-04-19',
        time: '15:00'
      },
      {
        flag: '六天后',
        imgUrl: 'http://localhost/zhsj/image/courses/课程03.jpg',
        course: 'Helen',
        day: '2019-04-19',
        time: '15:00'
      },
      {
        flag: '一天后',
        imgUrl: 'http://localhost/zhsj/image/courses/coding.png',
        course: 'Mathew',
        day: '2019-04-19',
        time: '15:00'
      }
      ],
      kcbaoming: [{
        courseImg: 'http://localhost/zhsj/image/courses/cooker.jpg',
        title: '小小美食家',
        flag: '进行中',
        day: '周六',
        time: '15:00-17:00',
        price: '3500'
      },
      {
        courseImg: 'http://localhost/zhsj/image/courses/活动02.jpg',
        title: '折纸课程',
        flag: '一天后',
        day: '周日',
        time: '15:00-17:00',
        price: '5500'
      },
      {
        courseImg: 'http://localhost/zhsj/image/courses/活动03.jpg',
        title: '航模制作',
        flag: '六天后',
        day: '周五',
        time: '19:00-21:00',
        price: '6000'

      }
      ],
      inform: [{
        title: '课程：您的少儿编程课已成功报名',
        isread: '已读',
        label: '上课时间：每周六 10：00-11：30',
        border: true
      },
      {
        title: '课程：您报名的少儿英语有作业需要提交',
        isread: '未读',
        label: '上课时间：每周六 10：00-11：30',
        border: true
      },
      {
        title: '活动：您报名的PCA马术夏令营地点变更',
        isread: '已读',
        label: '原计划于鄂尔多斯市举行的开营市改为包头市',
        border: true
      }
      ],
      myactivity: [{
        flag: '进行中',
        imgUrl: 'http://localhost/zhsj/image/courses/课程.jpg',
        course: 'David',
        day: '2019-04-19',
        time: '15:00'
      },
      {
        flag: '一天后',
        imgUrl: 'http://localhost/zhsj/image/courses/课程02.jpg',
        course: 'Susan',
        day: '2019-04-19',
        time: '15:00'
      },
      {
        flag: '六天后',
        imgUrl: 'http://localhost/zhsj/image/courses/课程03.jpg',
        course: 'Helen',
        day: '2019-04-19',
        time: '15:00'
      },
      {
        flag: '一天后',
        imgUrl: 'http://localhost/zhsj/image/courses/coding.png',
        course: 'Mathew',
        day: '2019-04-19',
        time: '15:00'
      }
      ]
    }
  },
  computed: {
  },
  methods: {
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
    },
    onClose (event) {
      // const { instance } = event.detail
      // Dialog.confirm({
      //   message: '确定删除吗？'
      // }).then(() => {
      //   instance.close()
      // })
    },
    _getSetting () {
      getSetting('userInfo',
        () => {
          this.isAuth = false
          this._getUserInfo()
        },
        () => {
          this.isAuth = true
          console.log('没有获取到相应的授权信息,需要授权')
        })
    },
    _getUserInfo () {
      getUserInfo(
        (res) => {
          console.log(res)
        },
        () => {
          console.log('没有获取到用户信息')
        })
    }
  },
  mounted () {
    this._initBanner()
    this._getSetting()
    getUserOpenId()
  },
  created () {
    wx.hideTabBar({
      false: () => {
        setTimeout(() => {
          wx.hideTabBar()
        }, 500)
      }
    })
    // let app = getApp()
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.search-wraper{
  position: fixed;
  top:0px;
  z-index: 10;
  width: 100%;
}
.index{
  padding-top: 120rpx;
  padding-bottom: $bottom-pad 
}
.banner{
  position: relative;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
  width: 100%;
  height:90%;
}
.shadow-left {
  left: 22px;  
  right:12px; 
  transform: skew(-12deg) rotate(-4deg); 
  transition:all 0.7s ease
}
.shadow-right {
  left: 12px;  
  right:22px; 
  transform: skew(12deg) rotate(4deg); 
  transition:all 0.7s ease
}
.shadow-left, .shadow-right {
  position:absolute; 
  top:20px;bottom: 22px;  
  background: transparent; 
  box-shadow: 0 6px 10px rgba(0,0,0,0.3);  
  z-index: -1; 
  background: #fff; 
}


//tab
.tab{
  padding-bottom: 10px; 
  img{
    width:35px;
    height: 30px;
  }
  .row{
    display: flex;
    justify-content: space-around; 
    padding:0px 20px; 
    .col{
      width: 20%;
      text-align: center;
      p{
        font-size: $text-small;
        color: $color-small 
      }
    }
  }
}
//mycourse
.my-course{
  width: 100%;
  .content{
    width: 100%;
    .content-wraper{
      display: flex;
      white-space: nowrap;
    }
    .course-wraper{
      width: 100px;
      height: 135px;
      background: red
    }
  }
}
.content-wraper{
  padding-left: 25px; 
  .content{
    display: flex;
    white-space: nowrap;
    position: relative;
  }
}

//enrollCourse
.title-class{
  font-size:$text-big
}
.desc{
  padding: 10px; 
}
.card{
  background-color: white
}
.btn-wraper{
  text-align: center;
  margin-bottom:30px 
}

//inform
.inform-wraper{
  padding: 30px 0px;
  background: $bg-color
}
.title{
  display: flex
}
.info-desc{
  color: #999;
  font-size: $text-small;
  margin-top: 3px;
  line-height: 18px;
}

//附加
.marginleft{
  margin-left: 10px 
}
</style>
