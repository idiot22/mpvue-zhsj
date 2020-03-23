<template>
  <div class="radar">
    <div class="bg">
      <img src="/static/images/order/order.png" alt="">
      <div class="title">
        <span>我的订单</span>
        <div class="line"></div>
      </div>
      <div class="intro">
        这里有所有的订单信息，请查看吧！
        (@_@)
      </div>
    </div>
    <div class="content">
      <ul class="tabs">
        <li class="tab-item"  :class="activeTab === 0 ? 'active' :''"  @click="activeTab = 0">未支付</li>
        <li class="tab-item"  :class="activeTab === 1 ? 'active' :''" @click="activeTab = 1">已确认</li>
        <li class="tab-item"  :class="activeTab === 2 ? 'active' :''" @click="activeTab = 2">已取消</li>
      </ul>
      <div class="order-info">
        <div data-v-297409b4="" class="hollow-two-circles" 
          v-for=" (item,index) in orderData[activeTab]" :key='index'>
          <div class="title">
            <span>{{item.className}}</span>
            <span class="mark" v-if='activeTab === 0'>继续支付</span>
          </div>
          <span class="time"><van-icon name="clock-o" /> {{item.date}}</span><br>
          <span class="money">￥{{item.payStatus}}</span>
          <img src="/static/images/order/finish.png" class="mark2" v-if="activeTab === 1">
          <img src="/static/images/order/quxiao.png" class="mark2" v-if="activeTab === 2">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index'
export default{
  data () {
    return {
      activeTab: 1,
      orderData: [],
      orderList0: [],
      orderList1: [],
      orderList2: []
    }
  },
  methods: {
  },
  onLoad () {
    api.getMyOrder().then((res) => {
      res.data.data.forEach(item => {
        if (item.payStatus === 0) {
          this.orderList0.push(item)
        } else if (item.payStatus === 1) {
          this.orderList1.push(item)
        } else {
          this.orderList2.push(item)
        }
      })
      this.orderData = [this.orderList0, this.orderList1, this.orderList2]
    })
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
  box-sizing: border-box;
  border-radius: 100rpx 100rpx 0rpx 0rpx;
  height: 400rpx;
}
.order-info{
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
}
//tab
  .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      cursor: pointer;
      position: relative;
      font-size: $text-medium;
      color: $color-small;
      background-color: #fff;
      display: flex;
      justify-content: center;
      &::after {
        content: "";
        width: 0;
        height: 4px;
        background-color: $main-color;
        position: absolute;
        left: 0; right: 0;
        bottom: 0;
        margin: auto;
        transition: width .4s;

      }
    }
    li.active {
      &::after {
        margin: 0 15%;
        box-sizing: border-box;
        width: 70%;
        border-radius: 5px;
      }
    }
  }
  // quan
  .hollow-two-circles {
    overflow: hidden;
    padding: 10px;
    margin-bottom: 20px;
    box-sizing: border-box;
    width: 264px;
    border-radius: 10rpx;
    height: 100px;
    position: relative;
    background: radial-gradient(circle at right bottom, transparent 6px, #fff 0) top right / 51% 40px no-repeat,
      radial-gradient(circle at left bottom, transparent 6px, #fff 0) top left / 51% 40px no-repeat,
      radial-gradient(circle at right top, transparent 6px, #fff 0) bottom right / 51% 60px no-repeat,
      radial-gradient(circle at left top, transparent 6px, #fff 0) bottom left / 51% 60px no-repeat;
    filter: drop-shadow(4rpx 4rpx 10rpx rgba(0,0,0,0.1));
}

.hollow-two-circles::after {
  content: '';
  width: 244px;
  border: 0.5px dashed $color-line;
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  margin: auto;
}
.title{
  color: $text-big;
  font-weight:800;
  margin-bottom: 10px;
  padding-left: 15px;
}
.time{
  color:$color-small;
  font-size: $text-tiny;
  padding: 15px;
}
.money{
  color: $yellow-color;
  font-size: $text-large;
  padding: 15px;
  font-weight:900
}
.mark{
  border: 1px solid $main-color;
  border-radius: 5px;
  position: absolute;
  right:10px;
  color: $main-color;
  font-weight: 300;
  font-size: $text-tiny;
  padding:3px
}
.mark2{
  position: absolute;
  width: 50px;
  height: 50px;
  right:0px;
  top:0px
}
</style>