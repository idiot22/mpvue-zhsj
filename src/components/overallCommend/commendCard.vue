<template>
    <div class="commend-card">
        <div class="logo">
            <img :src="data.logoPath" >
        </div>
        <div class="title">
            <span>{{data.title}}</span>
            <div class="line"></div>
        </div>
        <div class="txt-wraper" v-for="(item, _index) in data.subtitle" :key='_index'>
            <div class="sub-title">
                <img src="../../../static/images/overallcommend/wode.jpg">
            <span>{{item.txt}}</span>
            </div>
            <div class="txt" v-for="msg in item.msgs" :key='msg'>{{msg}}</div>
        </div>
    </div>  
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
        logoPath: '',
        title: '',
        subtitle: [
          { txt: '',
            msgs: []}
        ]
      }
    }
  }

}
</script>

<style lang='scss'>
@import '../../common/styles/mixin.scss';
.commend-card{
    background: white;
    border-radius: 10px;
    padding: 10px;
    position: relative;
    padding-top: 60rpx;
    margin-top: 80rpx;
    margin-bottom: 30rpx;
    .logo{
        width: 50px;
        height: 50px;
        box-shadow: 0px 2px 10px rgba(0,0,0,0.05);
        border-radius: 50%;
        position: absolute;
        top: -30px;
        left: 50%;
        overflow: hidden;
        transform: translateX(-50%);
        background: white;
        padding: 20rpx;
        box-sizing: border-box;
        img{
            width:100%;
            height: 100%;
        }
    }
    .title{
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        border-bottom: 1rpx solid $bg-color;
        padding-bottom: 20rpx;
        .line{
            margin-top: 10rpx;
            width: 15%;
            height: 8rpx;
            border-radius: 30%;
            background: #07dbd1;
        }
    }
    .txt-wraper{
        padding: 20rpx 0rpx;
        .sub-title{
            padding: 10rpx 0px;
            display: flex;
            flex-direction: row;
            color: $main-txt;
            font-size: $text-big;
            img{
                width: 40rpx;
                height:40rpx;
                padding-right: 20rpx;
            }
        }
        .txt{
            background: rgb(250, 250, 250);
            font-size: $text-medium;
            color: $color-small;
            padding: 8px;
            margin: 7px 0px ;
            border-radius: 10px;
        }
    }
}
</style>