<template>
  <div class="add-friend">
      <van-tabs :active="activeTab" :ellipsis='false' @change="changeTab">
        <van-tab :title="item.className"  v-for='(item,index) in classData' :key='index' ></van-tab>
      </van-tabs>
    <div class="friend-card" v-for='(item,index) in friendList' :key="index" @click="showUserInfo(index)">
      <div class="left">
        <van-image width="40" height="40" :src="imgUrl[index]" round/>
        <span class="name">{{item.name}}</span>
        <img v-if ="item.sex === '男'" src="../../../static/images/zuopin/man.png" alt="" srcset="" class="sex">
        <img v-else src="../../../static/images/zuopin/woman.png" alt="" srcset="" class="sex">
      </div>
      <div class="right">
        <van-button color="linear-gradient(to right, #8de0dc, #50dd9b)" size="mini" round @click.stop="showaddUser(index)">添加</van-button>
      </div>
    </div>
    <van-action-sheet :show="showDetail" @close='closeInfo'>
      <div style="height:100%">
        <van-cell-group>
          <van-field
            v-model="familyPhone"
            label="联系电话"
            left-icon="phone-o"
          />
          <van-field
            v-model="address"
            clearable
            left-icon="location-o"
            label="地址"
          />
          <van-field
            left-icon="birthday-cake-o"
            v-model="birthday"
            clearable
            label="生日"
          />
        </van-cell-group>
      </div>
    </van-action-sheet>
    <van-action-sheet :show="showDetail2" @close='closeAdd'>
      <div class="content-input">
        <van-field
          v-model="message"
          rows="6"
          autosize
          label="申请"
          type="textarea"
          maxlength="100"
          placeholder="请输入申请内容"
          show-word-limit
        />
        <div class="btn-wraper">
          <van-button 
            color="linear-gradient(to right, #8de0dc, #50dd9b)" 
            size="small" 
            round 
            @click.stop="addUser(index)">确认申请</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import api from '../../api/index'
import { mapState } from 'vuex'
export default{
  data () {
    return {
      message: '',
      showDetail2: false,
      familyPhone: '',
      address: '',
      birthday: '',
      showDetail: false,
      activeTab: 0,
      classData: [],
      friendList: [],
      imgUrl: ['../../github/1.jpeg',
        '../../github/2.jpeg',
        '../../github/3.jpeg',
        '../../github/4.jpg',
        '../../github/5.jpg',
        '../../github/6.jpeg',
        '../../github/7.jpeg',
        '../../github/8.jpg',
        '../../github/9.jpeg',
        '../../github/10.jpg',
        '../../github/4.jpg',
        '../../github/2.jpeg',
        '../../github/9.jpeg',
        '../../github/3.jpeg',
        '../../github/4.jpg',
        '../../github/5.jpg',
        '../../github/6.jpeg',
        '../../github/7.jpeg',
        '../../github/8.jpg',
        '../../github/9.jpeg',
        '../../github/10.jpg',
        '../../github/4.jpg',
        '../../github/2.jpeg'
      ]
    }
  },
  computed: {
    ...mapState(['studentId'])
  },
  methods: {
    closeAdd () {
      this.showDetail2 = false
    },
    showaddUser () {
      this.showDetail2 = true
    },
    addUser () {
      api.addFriend({
        applyContent: this.message,
        studentId: this.studentId
      }).then((res) => {

      })
    },
    showUserInfo (index) {
      this.showDetail = true
      this.familyPhone = this.friendList[index].familyPhone
      this.address = this.friendList[index].address
      this.birthday = this.friendList[index].birthday
    },
    closeInfo () {
      this.showDetail = false
    },
    changeTab (data) {
      this.activeTab = data.target.index
      this.getWorkData()
    },
    getWorkData () {
      api.initStudentClass().then((res) => {
        this.classData = res.data.data
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
.content-input{
  padding: 0px 20px;
  padding-top: 30px;
  width:100%;
  box-sizing: border-box;
  height: 200px;
  .btn-wraper{
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }
}
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