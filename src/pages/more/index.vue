<template>
  <div id='more'>
    <div class="bg">
      <div class="intro">
       还有更多功能等你来发现哦 !</div>
    </div>
    <div class="content">
      <div class='item' v-for="(item,index) in itemList" :key="index" :style='{background:item.color}' @click="switchTo(item.to)">
        <img src="../../../static/images/order/bg.png" alt="" srcset="">
        <div class="left">
          <p class="name">{{item.name}}</p>
          <p class="enl">{{item.enl}}</p>
        </div>
        <div class="right">
          <van-icon :name="item.icon" color='#fff'/>
        </div>
        <div class="bg" :style='{background:item.color2}'></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: {
    itemList: [
      {
        name: '申报',
        enl: 'REPORT',
        to: '../report/main',
        icon: 'comment-o',
        color: '#74dcd1',
        color2: '#d3f4f1'
      },
      {
        name: '作品墙',
        enl: 'WORK-WALL',
        to: '../works-wall/main',
        icon: 'smile-o',
        color: '#51d792',
        color2: '#d3f5e3'
      },
      {
        name: '添加好友',
        enl: 'FRIEND',
        to: '../addFriend/main',
        icon: 'friends-o',
        color: '#d699f8',
        color2: '#f0d9fc'
      },
      {
        name: '我的小队',
        enl: 'GROUP',
        to: '../group/main',
        icon: 'circle',
        color: '#e399bc',
        color2: '#f3d2e1'
      }
    ]
  },
  methods: {
    switchTo (path) {
      this.$router.push({path: path})
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
#id{
  padding: 50px 20px;
}
.bg{
  width:100%;
  height: 200px;
  background: $main-color;
  background-image: #e399bb71;
  position: relative;
  .intro{
    width:50%;
    margin: 0px 25%;
    box-sizing: border-box;
    font-size: 13px;
    color: white;
    padding-top: 25px;
    text-align: center;
  }
}
.content{
  width:100%;
  background: white;
  position: relative;
  top: -220rpx;
  padding: 20px;
  padding-top: 40px;
  box-sizing: border-box;
  border-radius: 100rpx 100rpx 0rpx 0rpx;
  min-height: 300px;
  .item{
    background: #74dcd1;
    width: 100%;
    height: 75px;
    padding: 20px;
    display: flex;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
    margin-bottom: 20px;
    img{
      position: absolute;
      top:0px;
      width: 100%;
      height: 100%;
    }
    .left{
      flex: 2;
      color: white;
      display: flex;
      align-content: center;
      flex-direction: column;
      justify-content: center;
      .name{
        margin-bottom: 5px;
      }
      .enl{
        font-size: $text-small;
      }
    }
    .right{
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 30px;
    }
    .bg{
      width: 90%;
      height: 9rpx;
      position: absolute;
      background: #74dcd24f;
      bottom: -8rpx;
      border-radius: 0px 0px 20px 20rpx;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>