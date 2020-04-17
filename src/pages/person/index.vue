<template>
  <div class="person">
    <div class="person-bgimg" style='background-image:url(../../static/images/bg/1.jpg)'></div>
    <div class="top-bar" :style="topBarStyle">
      <div class="avatar">
          <avatar :src="''" :scale='0.62' ></avatar>
      </div>
      <span class="name" :class="showTop ?  'ani-name' : ''">{{userInfo.studentName}}</span>
    </div>
    <div class="person-info-wraper" :style="{top:personTop+'px',opacity:scrollY <= 0 ? 0 : ''}">
      <div class="avatar-wraper">
        <avatar :src="''" :scale='avatarScale'></avatar>
        <div class="person-info">
          <div class="name-wraper">
            <span class="name" :style="showTop ? 'opacity:0' : ''">{{userInfo.studentName}}</span>
            <i class="iconfont icon-bianji" @click="switchTo"></i>
          </div>
          <div class="info">
              年级：{{userInfo.gradeId+'年级'}}
          </div>
          <div class="num-wraper">
            <p>积分<span class="num">&nbsp;{{userInfo.integral}}</span></p>
            <p>获赞<span class="num">&nbsp;{{userInfo.thumbUpNum}}</span></p>
          </div>
        </div>
      </div>
      <hr class="line">
      <buddle-tab-bar :tabBig='tabFixed'></buddle-tab-bar>
      <div class="tabShow">
        <empty></empty>
      </div>
    </div>
    <div class="scroll">
      <scroll-view class='scroll' scroll-y="true" style="height: 430px;" @scroll='scroll'>
            <div class="person-info-wraper person-info-wraper2"  :style="scrollY <= 0 ? 'opacity:1' : ''">
              <div class="avatar-wraper">
                <avatar :src="''"></avatar>
                <div class="person-info">
                  <div class="name-wraper">
                    <span class="name">{{userInfo.studentName}}</span>
                    <i class="iconfont icon-bianji" @click="switchTo"></i>
                  </div>
                  <div class="info">
                      年级：{{userInfo.gradeId+'年级'}}
                  </div>
                  <div class="num-wraper">
                    <p>积分<span class="num">&nbsp;{{userInfo.integral}}</span></p>
                    <p>获赞<span class="num">&nbsp;{{userInfo.thumbUpNum}}</span></p>
                  </div>
                </div>
              </div>
              <hr class="line">
              <buddle-tab-bar>99899</buddle-tab-bar>
              <div class="tabShow">
                <empty></empty>
              </div>
            </div>
      </scroll-view>
    </div>
    <vue-tab-bar></vue-tab-bar>
  </div>
</template>

<script>
import vueTabBar from '@/components/vueTabBar.vue'
import Avatar from '@/components/avatar.vue'
import BuddleTabBar from '@/components/buddleTabBar.vue'
import { showJson } from '../../utils/util'
import api from '../../api/index'
import empty from '../../components/empty'
export default {
  components: {
    vueTabBar,
    Avatar,
    BuddleTabBar,
    empty
  },
  created () {
    this.bgImgHeight = 170 // 这是个人中心的背景图高，用于计算下面个人滑片的位置
  },
  data () {
    return {
      personTop: this.bgImgHeight,
      scrollY: 0,
      avatarScale: 1,
      showTop: false,
      tabFixed: false,
      bgScale: 1,
      userInfo: {}
    }
  },
  methods: {
    switchTo () {
      this.$router.push({path: '../editPerson/main'})
    },
    scroll (e) {
      this.scrollY = e.mp.detail.scrollTop
      let top = this.bgImgHeight - this.scrollY
      if (this.personTop === undefined || top > -104) {
        this.personTop = this.bgImgHeight - this.scrollY // 操控外面个人滑片的移动
        this.tabFixed = false
      } else {
        this.tabFixed = true
      }
    }
  },
  computed: {
    avatarScale () {
      return this.bgImgHeight / (this.bgImgHeight + this.scrollY)
    },
    topBarStyle () {
      if (Number(this.avatarScale) <= 0.53) {
        this.showTop = true
        return showJson({
          opacity: 1
        })
      } else {
        this.showTop = false
        return showJson({
          opacity: 0
        })
      }
    }
  },
  watch: {
    scrollY (newVal) {
      this.avatarScale = this.bgImgHeight / (this.bgImgHeight + newVal)
    }
  },
  onLoad () {
    api.getUserInfo().then((res) => {
      this.userInfo = res.data
      console.log(this.userInfo)
    })
  }
}
</script>

<style lang='scss'>
@import '../../common/styles/mixin.scss';
.person{
  position: relative;
    .person-bgimg{
      width: 100%;
      height: 180px;
      background: $color-line;
      background-size:100% 100%; 
    }
    .scroll{
      position: relative;
      top:-32rpx
    }
    .person-info-wraper{
      position: absolute;
      top:170px;
      z-index: 10;
      width: 100%;
      padding: 0px 20px;
      box-sizing: border-box;
      background: white;
      height: 900px;
      border-radius: 10px;
      .avatar-wraper{
        position: relative;
        top:-10px;
      }
      .person-info{
        .name-wraper{
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px; 
          .name{
            font-size: $text-big;
            font-family: bold;
          }
          i{
            font-size: $text-large;
          }
        }
        .info{
          display: flex;
          font-size: $text-small;
          color: $color-small;
        }
        .num-wraper{
          display: flex;
          margin-top: 10px; 
          p{
            font-size: $text-small;
            padding-right: 20px; 
            .num{
              font-weight: bold;
              font-size: $text-big;
            }
          }
        }
      }
      .line{
        width: 100%;
        background: $color-line;
        height: 1px;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
      }
    }
    .person-info-wraper2{
      top:20px;
      opacity: 0;
    }
}
//top-bar
.top-bar{
  position: fixed;
  top: 0;
  display: flex;
  padding: 10px 20px;
  width: 100%;
  background: white;
  height: 22px;
  z-index: 100;
  opacity: 0;
  .avatar{
    position: relative;
    top:-20px
  }
}
//scroll
.scroll{
  position: relative;
  top:-31rpx;
  z-index: 11;
}

//name动画
.ani-name{
  animation: change 0.3s ease
}
@keyframes change {
  0%{
    transform: translate(-60px,60px)
  }
  100%{
    transform: translate(0px,0px)
  }
}
</style>