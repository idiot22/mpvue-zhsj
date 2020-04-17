<template>
  <div class="index">
    <!--swiper-->
    <div class="swiper-wraper" :class="'bg'+curIndex">
      <swiper :indicator-dots="false"
        :autoplay="true"
        :circular="true"
        @change="handleChange($event)"
        previous-margin='40px'
        next-margin='40px'>
        <block v-for="(item, index) in bannerUrl" :key="index">
          <swiper-item class="img-item">
            <img :src="item" alt="" class="banner" :animation="index == curIndex ? animationBanner1 : animationBanner2">
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
          </navigator>
          <p>{{item.text}}</p>
        </div>
      </div>
    </div>
    <!--/tab-->
    <!--myCourse-->
    <div class="my-course">
      <title-bar :text="'课程报名'" :nav="'course-list'"></title-bar>
      <div class="content-wraper">
        <div class="course-wraper" v-for='(item,index) in courseList' :key="index" @click="showInfo(index)">
          <div class="left">
            <van-image
              width="100"
              height="100"
              fit="fill"
              lazy-load
              :src="baseUrl+'/'+item.courseImgUrl"
            />
          </div>
          <div class="right">
            <div class="title">{{item.className}}</div>
            <div class="tag">
              <van-tag type="success" round plain color='#00c5bc' v-if="courseType[item.courseType]">{{courseType[item.courseType]}}</van-tag>&nbsp;
              <van-tag type="success" round plain color='#00c5bc' v-if="interestType[item.courseType]">{{interestType[item.courseType]}}</van-tag>
            </div>
            <div class="time">{{item.payStartTime}}~{{item.payEndTime}}</div>
            <div class="info">
              <span class="money">￥{{item.coursePrice}}</span>
              <span class="yuliang">x{{item.remain}}</span>
            </div>
          </div>
        </div>
        <van-button plain round  size="large" @click="changeOther('course')">换一批</van-button>
      </div>
      
    </div>
    <!--myCourse-->
    <!--enrollCourse-->
    <div class="enroll-course">
      <title-bar :text="'活动报名'" :nav="'active-list'"></title-bar>
      <div class="enroll-wraper">
      <div 
          class="course-wraper" v-for='(item,index) in activeList' 
          :key="index" 
          @click="showInfo(index)">
          <div class="left">
            <van-image
              width="100"
              height="100"
              fit="fill"
              lazy-load
              :src="baseUrl+'/'+item.imageUrl"
            />
          </div>
          <div class="right">
            <div class="title">{{item.activityName}}</div>
            <div class="time">
              <van-icon name="clock-o" />&nbsp;{{item.activityStartTime+'~'+item.activityEndTime}}
              <br>
            </div>
            <div class="locale">
              <span class="place">
                <van-icon name="location-o" color="#FF9933"/>&nbsp;{{item.activityAddress}}
              </span>&nbsp;
              <span class="renshu">
                <van-icon name="friends-o"  size="15" color="#00c5bc"/>&nbsp;{{item.maxCount}}
              </span>
            </div>
            <div class="info">
              {{item.activityDescription}}
            </div>
          </div>
        </div>
        <van-button plain round text='#00c5bc' size="large" @click="changeOther('activy')">换一批</van-button>
      </div>
    
    </div>
    <!--/enrollCourse-->
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
import api from '../../api/index'
import {courseType, courseImg} from '../../utils/data'
import { baseUrl } from '../../utils/const'
export default {
  components: {
    vueTabBar,
    titleBar,
    showImageCard,
    cardShowMore,
    Auth
  },
  computed: {
  },
  data () {
    return {
      baseUrl: baseUrl,
      courseImgPath: courseImg,
      courseType: courseType,
      keyword: '',
      minPrice: 0,
      maxPrice: 9007199254740991,
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
      courseList: [],
      activeList: [],
      courseListTotal: [],
      activeListTotal: []
    }
  },
  methods: {
    changeOther (flag) {
      if (flag === 'course') {
        let len = this.courseListTotal.length
        let a = Math.floor(Math.random() * len)
        if (a >= 3) {
          a = a - 3
        }
        this.courseList = this.courseListTotal.slice(a, a + 3)
      }
      if (flag === 'activy') {
        let len = this.activeListTotal.length
        let a = Math.floor(Math.random() * len)
        if (a >= 3) {
          a = a - 3
        }
        this.activeList = this.activeListTotal.slice(a, a + 3)
      }
    },
    search () {
      api.getCourseList({
        keyword: '',
        minPrice: 0,
        maxPrice: 9007199254740991
      }).then((res) => {
        this.courseListTotal = res.data.data
        this.courseList = this.courseListTotal.slice(0, 3)
      })
      api.getAllActivities({
        keyword: ''
      }).then((res) => {
        this.activeListTotal = res.data.data
        this.activeList = this.activeListTotal.slice(0, 3)
      })
    },
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
  },
  onLoad () {
    console.log(3443)
    this.search()
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.bg0{
  background: linear-gradient(rgb(42, 179, 156),rgb(63, 182, 178));
}
.bg1{
  background: linear-gradient(#d99c9c,#e38aa9);
}
.bg2{
  background: linear-gradient(#7eaae3,#5f8be6);
}
.swiper-wraper{
  padding-top: 1rpx;
  padding-top: 120rpx;
  
}
.search-wraper{
  position: fixed;
  top:0px;
  z-index: 10;
  width: 100%;
}
.index{
  padding-bottom: $bottom-pad 
}
.banner{
  position: relative;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
  width: 100%;
  height:100%;
}



//tab
.tab{
  width: 90%;
  padding: 5px 0px;
  margin: 0px 5%;
  margin-top: 10px;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
  img{
    width:40px;
    height: 40px;
  }
  .row{
    display: flex;
    justify-content: space-around; 
    padding:0px 10px; 
    .col{
      width: 20%;
      text-align: center;
      p{
        font-size: $text-tiny;
        color: $color-small 
      }
    }
  }
}
.content-wraper{
 padding: 0px 5%;
}

.course-wraper{
  display: flex;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  .left{
    margin-right: 20px;
    border-radius: 10px;
    overflow: hidden;
  }
  .right{
    .title{
      color:$main-txt;
      font-size: $text-big;
      font-weight: 300;
    }
    .time{
      color:$color-shallow;
      font-size: $text-small;
      padding: 5px 0px;
    }
    .info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .money{
        color:$yellow-color;
        font-size:$text-large;
        font-weight: 800;
      }
      .yuliang{
        color:$main-color;
        font-size:$text-medium;
        margin-right:0px        
      }
    }
  }
}
.enroll-wraper{
  padding: 0px 5%;
.course-wraper{
  display: flex;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  box-sizing: border-box;
  .left{
    flex-shrink: 0;
    margin-right: 20px;
    border-radius: 10px;
    overflow: hidden;
  }
  .right{
    flex-grow:0;
    .title{
      color:$main-txt;
      font-size: $text-big;
      font-weight: 300;
      overflow: hidden;
    }
    .time{
      color:$color-shallow;
      font-size: $text-small;
    }
    .info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      color:$color-small;
      font-size:$text-small;
      margin-right:0px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding-top: 10px;
    }
    .locale{
      display: flex;
      align-items: center;
      color:$color-shallow;
      font-size: $text-small;
      .place{
        display: flex;
        align-items: center;
        color: $yellow-color;
      }
      .renshu{
        display: flex;
        color:$main-color;
        align-items: center;
      }      
    }
  }
}
}
</style>
