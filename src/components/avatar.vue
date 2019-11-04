<template>
  <div class="avatar-wraper">
      <div class="circle1" :style="{transform:'scale('+ scale +') !important' }">
          <div class="circle2" :style="{backgroundImage:'url('+src+')'}">
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    scale: {
      type: Number,
      default: 1
    }
  },
  computed: {
    url () {
      return `url(${this.src})`
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../common/styles/mixin.scss";
.avatar-wraper{
  .circle1{
      width: 65px;
      height: 65px;
      background: rgba(255, 255, 255,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transform-origin: left;
      .circle2{
          border: 2px white solid;
          background:$color-shallow;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          background-size: 100% 100%;
      }
  }

}
</style>