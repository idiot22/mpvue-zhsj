<template>
    <div class="title-bar">
      <div class="tag"></div>
      <span>{{text}}</span>
      <span class='more' @click="swithchTo()">查看更多<van-icon name="arrow" /></span>
    </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      defaute: ''
    },
    nav: {
      type: String,
      defaute: ''
    }
  },
  methods: {
    swithchTo () {
      console.log('ddsfdsf')
      this.$router.push({path: `../${this.nav}/main`})
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../common/styles/mixin.scss';
  .title-bar{
    position: relative;
    display: flex;
    padding: 10px 5%;
    padding-top: 20px;
    align-items: center;
    .tag{
      width: 5px;
      height: 20px;
      background: #00c5bc;
      border-radius: 2.5px;
      position: absolute;
    }
    span{
      padding-left: 20px ;
      font-size:$text-big;
      font-weight:500
    }
    .more{
      position: absolute;
      right:5%;
      font-size:$text-small;
      color:$color-shallow;
      line-height: 30px;
      display: flex;
      align-items: center;
    }
  }
</style>