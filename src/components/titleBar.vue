<template>
    <div class="title-bar">
      <div class="tag"></div>
      <span>{{text}}</span>
    </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      defaute: ''
    }
  }

}
</script>

<style lang='scss' scoped>
@import '../common/styles/mixin.scss';
  .title-bar{
    position: relative;
    display: flex;
    padding: 10px 0px;
    align-items: center;
    .tag{
      width: 30px;
      height: 10px;
      background: #00c5bc;
      border-radius: 2.5px;
      left: -25px;
      position: absolute;
    }
    span{
      padding-left: 25px ;
      font-size:$text-big;
      font-weight:400
    }
  }
</style>