<template>
  <div class="add-group">
    <div class="wraper">
      <!-- 输入任意文本 -->
      <van-field v-model="teamName" label="小队名称" 
       required/>
      <van-field v-model="teamType" type="digit" label="年级" 
       required/>
      <van-field v-model="parentMen" type="digit" label="男家长人数" />
      <van-field v-model="parentWomen" type="digit" label="女家长人数" />
      <div class="mid-info">队长信息</div>
      <van-field v-model="params.userName" label="队长" disabled/>
      <van-field v-model="userName" label="队长" />
      <van-field v-model="userIdCard" label="身份证后六位" 
       required/>
      <van-field v-model="tel" type="tel" label="联系电话" 
       required/>
      <van-field v-model="userRace" label="民族" />
      <van-field v-model="wx" label="微信" />
      <div class="btn">
        <van-button round type="primary" size="large" color='#00c5bc' @click="addGroup">创建小队</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index'
import {mapState} from 'vuex'
export default{
  data () {
    return {
      teamName: '',
      teamType: null,
      parentMen: null,
      parentWomen: null,
      params: {
        gradeId: null,
        isCoach: '1',
        isCaptain: '0',
        tel: null,
        userIdCard: '',
        userName: '',
        userRace: '',
        userSex: '',
        wx: ''
      }
    }
  },
  computed: {
    ...mapState(['studentId'])
  },
  methods: {
    addGroup () {
      let processId = this.$route.query.processId
      let item = {
        processId,
        teamName: this.teamName,
        teamType: this.teamType,
        parentMen: this.parentMen,
        parentWomen: this.parentWomen,
        studentId: this.studentId
      }
      api.addGroup(this.params, item).then((res) => {
        console.log(res)
      })
    }
  },
  onLoad () {
    api.getStudentDetail().then((res) => {
      this.params.userName = res.data.name
      this.params.gradeId = res.data.gradeId
      this.params.userSex = res.data.sex
    })
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.add-group{
  height: 100%;
  margin-top: 0px;
  padding: 1px;
}
.wraper{
  position: relative;
  padding: 20px 10px;
  background: white;
  border-radius: 10px;
  margin: 20px 20px;
  margin-bottom: 40px;
  padding-bottom: 60px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  .mid-info{
    color: $main-color;
    font-size: $text-medium;
    text-align: center;
    padding: 10px 0px;
    width:100%
  }
  .btn{
    width:70%;
    position: absolute;
    bottom: 0px;
    left:50%;
    transform: translate(-50%,50%);
  }
}
</style>