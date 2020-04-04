<template>
  <div class="panel">
      <div class="title">{{title}}</div>
      <div class="content">
          <slot>3534</slot>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    title: ''
  }

}
</script>

<style lang='scss'>
@import "../common/styles/mixin.scss";
.panel{
  width: 100%;
  padding: 10px;
  background: white;box-sizing: border-box;
  margin-top: 20px; 
  .title{
    font-weight: bold;
    font-size: 15px;
    color: $main-color;
    padding-bottom: 10px;
    border-bottom:#E0E3DA 1px solid;
    box-sizing: border-box;
  }
  .content{
    padding-top:10px; 
  }
}
</style>