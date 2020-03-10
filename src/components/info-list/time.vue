<template>
  <div class='time'>{{data}}</div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss' scope>
.time{
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  color: rgb(133, 133, 133);
  font-size:12px;
}
</style>