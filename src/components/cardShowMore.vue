<template>
    <navigator :url='url'>
        <div class="more">
            <div>
                <p class="icon"><van-icon name="upgrade" class="upgrade"/></p>
                <p class='see-more'>查看更多</p>
            </div>
        </div>
    </navigator>
</template>

<script>

export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../common/styles/mixin.scss";
    navigator{
      height: 135px;
    }
    .more{
      width: 70px;
      height: 100%;
      border-radius: 5px;
      display: inline-block;
      background: #f5f5f5;
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