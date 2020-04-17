<template>
  <div class="add-friend">
      <van-tabs :active="activeTab" :ellipsis='false' @change="changeTab">
        <van-tab :title="item.className"  v-for='(item,index) in classData' :key='index' ></van-tab>
      </van-tabs>
    <div class="friend-card" v-for='(item,index) in friendList' :key="index">
      <div class="left">
        <van-image width="40" height="40" src="https://img.yzcdn.cn/vant/cat.jpeg" round/>
        <span class="name">{{item.name}}</span>
        <img v-if ="item.sex === '男'" src="../../../static/images/zuopin/man.png" alt="" srcset="" class="sex">
        <img v-else src="../../../static/images/zuopin/woman.png" alt="" srcset="" class="sex">
      </div>
      <div class="right">
        <van-button color="linear-gradient(to right, #8de0dc, #50dd9b)" size="mini" round>添加</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index'
export default{
  data () {
    return {
      activeTab: 0,
      classData: [],
      friendList: []
    }
  },
  methods: {
    changeTab (data) {
      this.activeTab = data.target.index
      this.getWorkData()
    },
    getWorkData () {
      api.initStudentClass().then((res) => {
        this.classData = res.data.data
        console.log(this.classData)
        return api.getFriendList({classId: this.classData[this.activeTab].classId})
      }).then((res) => {
        this.friendList = res.data.data
      })
    }
  },
  onLoad () {
    this.getWorkData()
  }

}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.friend-card{
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: white;
  justify-content: space-between;
  border-bottom: 1px solid $color-line;
  .left{
    display: flex;
    align-items: center;
    font-size: $text-medium;
    color: $main-txt;
    .sex{
      width:15px;
      height:15px
    }
    .name{
      margin: 0px 10px
    }
  }
}
</style>