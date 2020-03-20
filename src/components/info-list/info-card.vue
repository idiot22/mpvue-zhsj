<template>
  <div class='info-wrapper' >
    <section v-if="type==='info'" class='info-content'>
      <div class="left">
        <van-image 
          width="100"
          :src="baseUrl+'/'+data.resourceURL"
          height="100">
        </van-image>
      </div>
      <div class="right">
        <div class='title'>
          <p>{{data.className}}</p>
          <div v-if='data.isRead'>
            <van-tag v-if='data.isRead' round color="#f0f0f0" text-color="#a3a3a3">已读</van-tag>
            <van-tag v-else round type="danger">未读</van-tag>
          </div>
        </div>
        <div class='xinxi' >
            <p>发布人：{{data.teacherName}}  &nbsp; &nbsp; <br>发布时间：{{data.noticeTime}}</p>
        </div>
        <div class='info-txt'>{{data.noticeContent}}</div>
      </div>
    </section>
    <section v-else @click="clickMsg(data)">
        <div class='title'>
          <p>{{data.className}}</p>
            <van-tag v-if='data.isRead || read' round color="#f0f0f0" text-color="#a3a3a3">已读</van-tag>
            <van-tag v-else round type="danger">未读</van-tag>
        </div>
        <div class='xinxi' >
            <p>发布人：{{data.senderName}}  &nbsp; &nbsp; <br>发布时间：{{data.createTime}}</p>
        </div>
        <div class='info-txt'>{{data.content}}</div>
    </section>    
   </div>
</template>

<script>
import {baseUrl} from '../../utils/const'
export default {
  props: {
    type: {
      type: String,
      default: 'info'
    },
    data: {
      type: Object,
      default: {
        className: '',
        isRead: null,
        teacherName: '',
        noticeTime: '',
        noticeContent: '',
        resourceURL: ''
      }
    }
  },
  data () {
    return {
      baseUrl: baseUrl,
      read: 0
    }
  },
  methods: {
    clickMsg (data) {
      this.read = 1
      this.$emit('clickMsg', data)
    }
  }
}
</script>

<style scoped lang='scss'>
.info-content{
  display: flex;
}
.img-err{
  font-size:80rpx
}
.left{
  width: 2rem;
  height: 2rem;
  margin-right: 10px;
}
img{
  width:100%;
  height:100%
}
.right{
  flex-grow:2
}
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