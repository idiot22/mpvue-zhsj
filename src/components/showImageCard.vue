<template>
    <navigator class="content-item" :url='url'>
        <div class="img" :style="{backgroundImage:'url('+imgUrl+')'}">
            <div class="mask">
                {{title}}
              </div>
        </div>
        <p class="time">
            <span>{{time}}</span>
        </p>
        <p class="warn">
            <span>
                <van-icon name="eye" class="eye"/>
                <span class="icon-attentionfill"> {{status}}</span>
            </span>
        </p>
    </navigator>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '无'
    },
    time: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  }

}
</script>

<style lang='scss' scoped>
@import "../common/styles/mixin.scss";
    .content-item{
      width:100%;
      margin: 0px 5px;
      .img{
        position: relative;
        width:100%;
        height: 135px;
        background-size:100% 100%;
        background-repeat:no-repeat; 
        overflow: hidden;
        border-radius: 5px
      }
      .time{
        text-align: center;
        font-size: $text-small;
        color: $color-small;
      }
      .warn{
        font-weight: bold;
        color:$main-color;
        font-size: $text-small;
        text-align:center;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
          display: flex;
          align-items: center;
          .eye{
            font-size: $text-big;
            margin-top: 5px
          }
        }
      }
      .mask{
        position:absolute;
        width:100%;
        bottom: 0px;
        background: linear-gradient(rgba(0, 0, 160, 0.06), rgba(127, 127,127, 1));
        height: 40px;
        text-align: center;
        color: white;
        font-size: $text-medium;
        font-weight: 400;
        line-height: 40px;
      }
    }
    .content-item:first-child{
      margin-left:0px
    }
        .more{
      position: absolute;
      top:0px;
      border-radius: 5px;
      display: inline-block;
      width: 70px;
      height: 135px;
      background: #f5f5f5;
      margin-left:5px;
      div{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        align-items: center;
        color:$color-small;
        .icon{
            transform: rotate(90deg)
        }
        .upgrade{
          font-size: 30px;
        }
        .see-more{
          font-size: $text-small
        }
      }
    }

</style>