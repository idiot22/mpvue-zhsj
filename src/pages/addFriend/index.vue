<template>
  <div class="add-friend">
    <div class="friend-card">
      <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" round/>
      <span class="name">要面对</span>
      <van-icon name="info-o" />
    </div>
  </div>
</template>

<script>
// import api from '../../api/index'
export default{
  data () {
    return {
    }
  },
  methods: {

  },
  onLoad () {
  }

}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.friend-card{
  display: flex;

}
</style>