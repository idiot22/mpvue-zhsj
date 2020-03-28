<template>
  <div class="plan">
    <div class="bg">
      <img src="/static/images/zuopin/zuopin.png" alt="">
      <div class="title">
        <div class="data">28</div>
        <div class="tiqi">2020.03<br>星期六</div>
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss">
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
    font-size: 80rpx;
    padding: 70rpx;
    padding-bottom: 40rpx;
    color: white;
    font-weight: 900;
    display: flex;
    align-items: center;
    .data{
      font-size: 80rpx;
      padding-right: 10px;
    }
    .tiqi{
      font-size: 25rpx;
      line-height: 25rpx;
    }
    .line{
      width: 160rpx;
      height: 25rpx;
      background: rgba(138,236,232,0.5);
      border-radius: 5rpx;
      margin-left: 20rpx;
      margin-top: -20rpx;
    }
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
</style>
