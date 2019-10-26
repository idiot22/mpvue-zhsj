<template>
  <div>
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
    <!--/tab-->
    <vue-tab-bar></vue-tab-bar>
  </div>
</template>

<script>
import vueTabBar from '@/components/vueTabBar.vue'
import { bannerUrl } from '@/utils/data.js'
export default {
  components: {
    vueTabBar
  },
  data () {
    return {
      searchStyle: {
        bgColor: '#f2f2f2',
        shape: 'round'
      },
      bannerUrl: bannerUrl,
      animationBanner2: {},
      animationBanner1: {},
      curIndex: 0
    }
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
    }
  },
  mounted () {
    console.log(bannerUrl)
    this._initBanner()
  },
  created () {
    console.log(111)
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

<style lang='scss'scoped>
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
</style>
