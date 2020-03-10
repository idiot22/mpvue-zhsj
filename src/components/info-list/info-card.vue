<template>
  <div class='info-wrapper'>
    <div class='title'>
      <p>{{data.title}}</p>
      <van-tag v-if='data.isRead' round color="#f0f0f0" text-color="#a3a3a3">已读</van-tag>
      <van-tag v-else round type="danger">未读</van-tag>
    </div>
    <div class='xinxi' >
        <p>发布人：{{data.issuer}}  &nbsp; &nbsp; 发布时间：{{data.time}}</p>
    </div>
    <div class='info-txt'>{{data.content}}</div>
   </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
        title: '',
        isRead: false,
        issuer: '',
        time: '',
        content: ''
      }

    }
  }

}
</script>

<style scoped>
.info-wrapper:hover{
  background: rgb(250, 250, 250);
}
.info-wrapper{
  border-radius: 8px;
  background: white;
  padding: 10px;
  box-shadow: 2px 0px 10px rgb(243, 243, 243);
  margin-bottom:20rpx;
}
.info-wrapper{
    margin: 0rpx 30rpx 30rpx 30rpx;
    background: white;
}
.info-wrapper .title{
  display: flex;
  justify-content: space-between;
  font-size:32rpx;
  padding-bottom:10rpx 
}
.info-wrapper .xinxi{
  font-size:25rpx;
  color:rgb(82, 82, 82);
  padding-bottom:10rpx 
}
.info-wrapper .info-txt{
  font-size:28rpx;
  color:rgb(128, 128, 128);
}
</style>