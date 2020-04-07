<template>
  <div class="list">
    <div class="group-wraper" v-for="(item,index) in teamList" :key='index'>
      <div class="left">
        <h1>{{item.teamName}}</h1>
        <div class="contact-name">队长：{{item.contactName}}</div>
        <span class="type">小队类型：{{item.teamType}}</span>
      </div>
      <div class="right">
        <van-button type="primary" size="small" color='#00c5bc' @click="signUp(item)">立即报名</van-button>
      </div>
    </div>
    <div class="btn-wraper">
      <van-button type="primary" size="large" round
      color='#00c5bc'
      @click="addGroup">创建小队</van-button>
    </div>
  </div>
</template>

<script>
import api from '../../api/index'
export default{
  data () {
    return {
      teamList: [],
      processId: ''
    }
  },
  methods: {
    signUp (e) {
      api.signUp({teamProcessId: e.processId}, e.teamId, this.processId, e.contactId).then((res) => {
        console.log(res)
      })
    },
    addGroup () {
      this.$router.push({ path: '../addGroup/main', query: {processId: this.processId} })
    }
  },
  onLoad () {
    let id = this.$route.query.id
    this.processId = this.$route.query.processId
    api.getTeam(id).then((res) => {
      this.teamList = res.data.data
    })
  }

}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.group-wraper{
  display: flex;
  margin:20px 20px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  .left{
    flex:1;
    h1{
      color:$main-txt;
      font-size: $text-big;
      font-weight: 300;
    }
    .contact-name{
      color:$color-small;
      font-size: $text-small;
    }
    .type{
      color:$color-small;
      font-size: $text-small;
    }
  }
  .right{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.btn-wraper{
  margin-top: 20px;
  text-align: center;
  padding: 20px;
}
</style>