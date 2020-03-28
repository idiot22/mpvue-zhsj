<template>
  <div class="zuopin">
    <div class="bg">
      <img src="/static/images/zuopin/commend.png" alt="">
      <div class="title">
        <span>作品评价</span>
        <div class="line"></div>
      </div>
      <div class="intro">
        快来看看作品的得分吧！是不是拿到了一个好成绩呢？
      </div>
    </div>
    <div class="content">
      <van-tabs :active="activeTab" :ellipsis='false' @change="changeTab">
        <van-tab :title="item.className"  v-for='(item,index) in classData' :key='index' ></van-tab>
      </van-tabs>
      <div class="zuopin-card" 
        v-for='(item,index) in zuopinList'
        :key='index'>
        <div class="left">
          <div class="title">
            <div class="mark"></div>
            <span>{{item.postTitle}}</span>
            <div class="line"></div>
          </div>
          <div class="badge">
            <van-tag type="primary" plain color='#FF9933'>{{postType[item.postType]}}</van-tag>
            &nbsp;
            <van-tag type="primary" plain color='#FF9933' v-if="courseTypeDui[item.topicId]">{{courseTypeDui[item.topicId]}}</van-tag>
          </div>
          <div class="info">{{item.postContent}}</div>
          <img src="/static/images/zuopin/mark.png" alt="" srcset="">
        </div>
        <div class="right">
          <van-image
            width="100px"
            height="100px"
            fit='fill'
            :src="baseUrl+'/'+item.fileUrl"
          />
        </div>

      </div>
    </div>
    
        <div class="popbtn">
          <div class="img-style" :animation="animCollect" @click="collect">作品</div>
          <div class="img-style" :animation="animTranspond" @click="transpond">应用</div>
          <div  class="img-style" :animation="animInput" @click="input">其他</div>
          <div  class="img-plus-style" :animation="animPlus" @click="plus">
            <img src="/static/images/zuopin/add.png" alt="" srcset="">
          </div>
        </div>
  </div>
</template>

<script>
import {baseUrl} from '../../utils/const'
import api from '../../api/index'
import {courseTypeDui, postType} from '../../utils/data'
export default{
  data () {
    return {
      activeTab: 0,
      classData: [],
      zuopinList: [],
      courseTypeDui: courseTypeDui,
      postType: postType,
      baseUrl: baseUrl,
      isPopping: false, // 是否已经弹出
      animPlus: {}, // 旋转动画
      animCollect: {}, // item位移,透明度
      animTranspond: {}, // item位移,透明度
      animInput: {} // item位移,透明度
    }
  },
  onLoad () {
    this.getWorkData()
  },

  onShareAppMessage () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  methods: {
    changeTab (data) {
      this.activeTab = data.target.index
      this.getWorkData()
    },
    getWorkData () {
      api.initStudentClass().then((res) => {
        this.classData = res.data.data
        return api.getWorkWall({classId: this.classData[this.activeTab].classId})
      }).then((res) => {
        this.zuopinList = res.data.data
      })
    },

    // 点击弹出
    plus () {
      if (this.isPopping) {
        // 缩回动画
        this.popp()
        this.isPopping = false
      } else if (!this.isPopping) {
        // 弹出动画
        this.takeback()
        this.isPopping = true
      }
    },
    input () {
      console.log('input')
    },
    transpond () {
      console.log('transpond')
    },
    collect () {
      console.log('collect')
    },

    // 弹出动画
    popp () {
      // plus顺时针旋转
      var animationPlus = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationcollect = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationTranspond = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationInput = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      animationPlus.rotateZ(180).step()
      animationcollect.translate(-50, -50).rotateZ(360).opacity(1).step()
      animationTranspond.translate(-90, 0).rotateZ(360).opacity(1).step()
      animationInput.translate(-50, 50).rotateZ(360).opacity(1).step()

      this.animPlus = animationPlus.export()
      this.animCollect = animationcollect.export()
      this.animTranspond = animationTranspond.export()
      this.animInput = animationInput.export()
    },
    // 收回动画
    takeback () {
      // plus逆时针旋转
      var animationPlus = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationcollect = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationTranspond = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationInput = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      animationPlus.rotateZ(0).step()
      animationcollect.translate(0, 0).rotateZ(0).opacity(0).step()
      animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step()
      animationInput.translate(0, 0).rotateZ(0).opacity(0).step()

      this.animPlus = animationPlus.export()
      this.animCollect = animationcollect.export()
      this.animTranspond = animationTranspond.export()
      this.animInput = animationInput.export()
    }
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
    transform: rotate(-30deg);
    top: -40rpx;
  }
  .title{
    font-size: 40rpx;
    padding: 70rpx;
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
  top: -220rpx;
  padding: 20px;
  padding-top: 0px;
  box-sizing: border-box;
  border-radius: 100rpx 100rpx 0rpx 0rpx;
  overflow: hidden;
  min-height: 300px;
}

//card
.zuopin-card{
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  background: white;
  box-sizing: border-box;
  display: flex;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 2px 8px rgba(0,0,0,0.1);
  .left{
    flex-grow: 0;
    flex:2;
    padding-right: 10px;
    .title{
      position: relative;
      .mark{
        position: absolute;
        left:-10px;
        width:10px;
        height: 28px;
        background: #00c5bbc9;
      }
      .line{
        width:50px;
        height: 1px;
        background: #00c5bbb0;
        margin-left:30px;
        margin-top: 5px;
      }
      span{
        padding-left: 30px;
        padding-bottom: 10px;
        font-size: $text-big;
        font-weight: 800;
      }
    }
    .badge{
      padding: 6px;
      padding-left: 30px;
    }
    .info{
      padding-left: 30px;
      font-size: $text-small;
      color:$color-small
    }
    img{
      width:35px;
      height: 10px;
      margin-left: 30px;
    }
  }
  .right{
    flex: 1;
  }
}

.popbtn{
  position: fixed;
  right:0px;
  bottom: 0px;
.img-plus-style {
  height: 100rpx;
  width: 100rpx;
  position: absolute;
  bottom: 250rpx;
  right: 100rpx;
  z-index: 100;
  border-radius: 50rpx;
  text-align: center;
  color:white;
  line-height: 100rpx;
  font-weight: 800;
  background: #1edcb391;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.2);
  box-sizing: border-box;
  padding: 10px;
  display: inline-block;
  img{
    width: 100%;
    height: 100%;
  }
}

 
.img-style {
  height: 100rpx;
  width: 100rpx;
  text-align: center;
  position: absolute;
  bottom: 250rpx;
  right: 100rpx;
  opacity: 0;
  color:white;
  line-height: 100rpx;
  background: #1edcb38a;
  border-radius: 50rpx;
  font-weight: 800;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.2)
}
.img-style:hover{
  background: #42ffd68a;
}
}
</style>
