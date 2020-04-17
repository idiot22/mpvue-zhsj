<template>
  <div class="wall">
    <div class="bg">
      <img src="/static/images/zuopin/zuopin.png" alt="">
      <div class="title">
        <span>作品墙</span>
        <div class="line"></div>
      </div>
      <div class="intro">
        这里有好多我的作品，每一个都很不错啊！
      </div>
    </div>
    <div class="content">
      <van-tabs :active="activeTab" :ellipsis='false' @change="changeTab">
        <van-tab :title="item.className"  v-for='(item,index) in classData' :key='index' ></van-tab>
      </van-tabs>
      <div class="hezi-wraper">
        <div class="left">
          <div class="zuopin-wraper" v-for='(item,index) in wallDataLeft' :key="index">
              <van-image
                width="100%"
                height="100"
                fit='fill'
                :src="baseUrl+'/'+item.fileUrl"
              />
            <div class="msg-wraper">
              <p>
                <van-tag type="primary" color='#00c5bc'>{{postType[item.postType] ?postType[item.postType]:""}}</van-tag>
                <span class="title">{{item.postTitle}}</span>
              </p>
              <p class="msg">{{item.postContent}}</p>
              <p class="trump">
                <span class="dianzan"><van-icon name="like-o" />&nbsp;{{item.thumbUpNumbers}}</span>
                <span class="time">{{item.buildTime ? item.buildTime:''}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="zuopin-wraper" v-for='(item,index) in wallDataRight' :key="index">
              <van-image
                width="100%"
                height="100"
                fit='fill'
                :src="baseUrl+'/'+item.fileUrl"
              />
            <div class="msg-wraper">
              <p>
                <van-tag type="primary" color='#00c5bc'>{{postType[item.postType] ?postType[item.postType]:""}}</van-tag>
                <span class="title">{{item.postTitle}}</span>
              </p>
              <p class="msg">{{item.postContent}}</p>
              <p class="trump">
                <span class="dianzan"><van-icon name="like-o" />&nbsp;{{item.thumbUpNumbers}}</span>
                <span class="time">{{item.buildTime ? item.buildTime:''}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  </div>
</template>

<script>
import api from '../../api/index'
import {postType} from '../../utils/data'
import {baseUrl} from '../../utils/const'
import { getTimeDiff } from '../../utils/index'

export default{

  data () {
    return {
      activeTab: 0,
      classData: [],
      wallData: [],
      postType: postType,
      baseUrl: baseUrl
    }
  },
  computed: {
    wallDataLeft () {
      let index = Math.floor(this.wallData.length / 2)
      return this.wallData.slice(0, index)
    },
    wallDataRight () {
      let index = Math.floor(this.wallData.length / 2)
      return this.wallData.slice(index + 1)
    }
  },
  methods: {
    getWorkData () {
      api.initStudentClass().then((res) => {
        this.classData = res.data.data
        return api.getWorkWall({classId: this.classData[this.activeTab].classId})
      }).then((res) => {
        this.wallData = res.data.data
      })
    },
    changeTab (data) {
      this.activeTab = data.target.index
      this.getWorkData()
    },
    timeMonth (startTime) {
      return getTimeDiff(startTime, new Date())
    }
  },
  onLoad () {
    this.getWorkData()
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.bg{
  width:100%;
  height: 280px;
  background: $main-color;
  background-image: linear-gradient(to right, #1edcb4, #03c8bb);
  position: relative;
  img{
    position: absolute;
    right: -140rpx;
    width: 400rpx;
    height: 400rpx;
    transform: rotate(-30deg) scale(0.7);
    top: -40rpx;
  }
  .title{
    font-size: 40rpx;
    padding: 30rpx;
    padding-bottom: 40rpx;
    color: white;
    font-weight: 900;
    .line{
      width: 160rpx;
      height: 25rpx;
      background: rgba(138,236,232,0.5);
      border-radius: 5rpx;
      margin-left: 20rpx;
      margin-top: -20rpx;
    }
  }
  .intro{
    width:50%;
    padding-left: 70rpx;
    font-size: 13px;
    color: white;
  }
}
.content{
  width:100%;
  background: white;
  position: relative;
  top: -300rpx;
  padding: 20px;
  padding-top: 0px;
  box-sizing: border-box;
  border-radius: 100rpx 100rpx 0rpx 0rpx;
  overflow: hidden;
  min-height: 300px;
}
.hezi-wraper{
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  align-items: flex-start;
  .left{
    flex:1
  }
  .right{
    flex:1
  }
}
.zuopin-wraper{
  margin-bottom: 20px;
  overflow: hidden;
  width: 160px;
  border-radius: 10px;
  box-shadow: 0 0 20rpx rgba(0,0,0,0.2);
    img{
      object-fit:cover;  
      width: 100%;
    }
  .msg-wraper{
    padding: 10px;
    padding-top: 5px;
    .title{
      font-size: $text-medium;
      color: $main-txt;
      padding-left: 5px;
      padding-bottom: 10px;
      font-weight: 800;
    }
    .msg{
      padding-top: 5px;
      font-size: $text-small;
      color: $color-small;
    }
    .trump{
      padding-top: 10px;
      position:relative;
      display: flex;
      justify-content: space-between;
      .dianzan{
        display: flex;
        align-items: center;
        font-size: $text-small;
        color: $color-shallow;
        width: 50%;
      }
      .time{
        position: absolute;
        right:0px;
        font-size: $text-small;
        color: $color-shallow;
        width:64px;
        overflow: hidden;
        white-space: nowrap; 
      }
    }
  }

}
</style>
