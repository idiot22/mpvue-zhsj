<template>
  <div class="login" style="background-size: 100% 100%;">
    <img src="../../../static/images/bg/2.jpg" alt="" srcset="" class="bg">
    <!--登录-->
    <div class="owl-wraper">
      <div class="left-hand"  :class="[isFocusPwd == 0 ? 'ani-left-hand' : (isFocusPwd == 1 ? 'ani-left-hand-leave' : '')]"></div>
      <img src="../../../static/images/owl/owl-login-arm.png" class="left-arm" :class="[isFocusPwd == 0 ? 'ani-left-arm' : (isFocusPwd == 1 ? 'ani-left-arm-leave' : '')]">
      <img src="../../../static/images/owl/owl-login-arm.png" class="right-arm"  :class="[isFocusPwd == 0 ? 'ani-right-arm' : (isFocusPwd == 1 ? 'ani-right-arm-leave' : '')]"> 
      <img src="../../../static/images/owl/owl-login.png" class="body">
      <img src="../../../static/images/owl/mouth.png" alt="" class="body mouth">
      <div class="right-hand" :class="[isFocusPwd == 0 ? 'ani-right-hand' : (isFocusPwd == 1 ? 'ani-right-hand-leave' : '')]"></div>
    </div>
    <div class="login-wraper">
      <div class="card denglu-wraper" :class="rotateAni1 === 1 ? 'ani-login' : (rotateAni1 === 2 ? 'ani-login-reverse':'')">
          <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="regionIndex" :range="regionArray">
            <div class="picker">
              <i class="iconfont icon-dituzuobiao">
                <span class="place">
                {{province}}，{{city}}，{{schoolName}}
                </span>
              </i>
            </div>
          </picker>
          <login-input 
            :iconName="'icon-geren'"
            @input="getName"></login-input>
          <div class="input-wraper">
            <login-input
              @input="getPwd"
              :iconName="'icon-suo'"  
              :password='true' 
              @focus="focuspwd" 
              @blur="blurpwd"></login-input>
          </div>
          <navigator url="../index/main">
            <van-button 
              @click="login"
              :round='true' 
              size='large' 
              :form-type='true'>
              登录
            </van-button>
          </navigator>
          <p class="zhuce " @click="changetTozhuce" >注册</p>
          <p class="fgpwd">忘记密码?</p>
      </div>
      <!--/登录-->
      <!--注册-->
      <div class="card zhuce-wraper" 
          :class="rotateAni1 === 1 ? 'ani-zhuce' : (rotateAni1 === 2 ? 'ani-zhuce-reverse':'')">
          <picker mode="multiSelector" 
            @change="bindMultiPickerChange" 
            @columnchange="bindMultiPickerColumnChange" 
            :value="regionIndex" 
            :range="regionArray">
            <div class="picker">
              <i class="iconfont icon-dituzuobiao">
                <span class="place">
                {{province}}，{{city}}，{{schoolName}}
                </span>
              </i>
            </div>
          </picker>
          <pull-select :placeholder="'请选择年级'" :array='gradeArray' @select="getGrade"></pull-select>
          <div class="input-wraper">
            <login-input :iconName="'icon-geren'" placeholder="请输入姓名" @input="getName"></login-input>
          </div>
          <pull-select :placeholder="'请选择性别'" :array='sexArray' @select="getSex"></pull-select>
          <div class="input-wraper">
            <login-input 
              :iconName="'icon-cardid'" 
              placeholder="请输入身份证后六位" 
              :password='true' 
              @input="getIdcard"></login-input>
          </div>
          <navigator url='../index/main'>
            <van-button 
              @click="regist"
              :round='true' 
              size='large' 
              :form-type='true'>
              注册
            </van-button>
          </navigator>
          <p class="zhuce" @click="changetTologin">登录</p>
      </div>
      <!--/注册-->
      </div>
  </div>
</template>

<script>
import LoginInput from '../../components/LoginInput'
import pullSelect from '../../components/pullSelect'
import api from '../../api/index'
import md5 from 'js-md5'
import { mapMutations, mapState } from 'vuex'
import * as types from '../../store/mutation-types'
export default {
  components: {
    LoginInput,
    pullSelect
  },
  data () {
    return {
      idcard: '',
      name: '',
      studentName: '',
      password: '',
      orgList: [],
      rotateAni1: 0,
      regionArray: [],
      regionIndex: [12, 16, 0],
      grade: null,
      sex: null,
      gradeArray: ['一年级',
        '二年级',
        '三年级',
        '四年级',
        '五年级',
        '六年级',
        '七年级',
        '八年级',
        '九年级',
        '小班',
        '中班',
        '大班',
        '成人' ],
      sexArray: [
        '男',
        '女'
      ],
      isFocusPwd: -1
    }
  },
  watch: {
    regionArray () {

    }
  },
  computed: {
    ...mapState(['studentId']),
    province () {
      return this.regionArray.length !== 0 ? this.regionArray[0][this.regionIndex[0]] : ''
    },
    city () {
      return this.regionArray.length >= 2 ? this.regionArray[1][this.regionIndex[1]] : ''
    },
    schoolName () {
      return this.regionArray.length === 3 ? this.regionArray[2][this.regionIndex[2]] : ''
    },
    schoolOrg () {
      return this.regionArray.length === 3 ? this.regionArray[2][this.regionIndex[2]] : ''
    },
    orgId () {
      return (this.regionArray.length === 3 && this.orgList.length >= 1) ? this.orgList[this.regionIndex[2]].orgId : ''
    }
  },
  onLoad () {
    api.getProvince().then((res) => {
      this.regionArray.push(res.data.data)
      api.getCity(this.province).then((res) => {
        this.regionArray.push(res.data.data)
        api.getOrganizations(this.province, this.city).then((res) => {
          let schoolList = []
          res.data.data.forEach(item => {
            schoolList.push(item.orgName)
          })
          this.orgList = res.data.data
          this.regionArray.push(schoolList)
        })
      })
    })
  },
  methods: {
    ...mapMutations({
      setStudentId: types.SET_STUDENT_ID
    }),
    getIdcard (value) {
      this.idcard = value
    },
    getSex (value) {
      this.sex = this.sexArray[value]
    },
    getGrade (value) {
      this.grade = value
    },
    getName (value) {
      this.studentName = value
      this.name = value
    },
    getPwd (value) {
      this.password = value
    },
    changetTozhuce () {
      this.rotateAni1 = 1
    },
    changetTologin () {
      this.rotateAni1 = 2
    },
    bindMultiPickerChange (e) {
      console.log('picker发送选择改变，携带值为', e)
      this.regionIndex = e.mp.detail.value
    },
    // 数列变化时获取相应城市，学校的数据
    bindMultiPickerColumnChange (e) {
      let column = e.mp.detail.column // 判断是那一列移动
      let index = this.regionIndex.slice() // 克隆，用于监听regionIndex
      index[e.mp.detail.column] = e.mp.detail.value
      this.regionIndex = index
      if (column === 0) {
        // 重置
        index[e.mp.detail.column] = e.mp.detail.value
        index[1] = 0
        index[2] = 0
        this.regionIndex = index
      } else if (column === 1) {
        // 重置
        index[e.mp.detail.column] = e.mp.detail.value
        index[2] = 0
      }
      api.getCity(this.province).then((res) => {
        this.regionArray.splice(1, 1, res.data.data)
        api.getOrganizations(this.province, this.city).then((res) => {
          let schoolList = []
          if (res.data.data.length !== 0) {
            res.data.data.forEach(item => {
              schoolList.push(item.orgName)
            })
          } else {
            schoolList = ['']
          }
          this.orgList = res.data.data
          this.regionArray.splice(2, 1, schoolList)
        })
      })
    },
    focuspwd () {
      this.isFocusPwd = 0
    },
    blurpwd () {
      this.isFocusPwd = 1
    },
    login () {
      let options = {headers: {'content-type': 'application/x-www-form-urlencoded'}}
      api.userLogin({
        studentName: this.studentName,
        password: md5(this.password),
        orgId: this.orgId
      }, options).then((res) => {
        this.setStudentId(res.detail)
        if (res.code === 200) {
          this.$router.push({ path: '../index/main', isTab: true })
        }
      })
    },
    regist () {
      // 表单验证
      if (this.orgId.length === 0) {
        wx.showToast({
          title: '学校尚未选择',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (!this.grade) {
        wx.showToast({
          title: '年级尚未选择',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (this.studentName === '') {
        wx.showToast({
          title: '姓名尚未填写',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (!this.sex) {
        wx.showToast({
          title: '性别尚未选择',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (this.idcard.length !== 6) {
        wx.showToast({
          title: '身份证后6位错误',
          icon: 'none',
          duration: 2000
        })
        return
      }
      api.userRegist(`grade=${this.grade}&name=${this.studentName}&sex=${this.sex}&idcard=${this.idcard}&school=${this.orgId}`)
        .then((res) => {
          if (res.code === 200) {
            this.changetTologin()
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.login{
    position: relative;
    width: 100%;
    padding: 50px 5%;
    height: 100%;
    padding-top:50px; 
    overflow: hidden;
    .bg{
      position: absolute;
      left:0px;
      top:0px;
      width:100%;
      height:100%
    }
}
.card{
    position: relative;
    z-index: 100;
    background: white;
    width: 90%;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
    padding: 20px;
    box-sizing: border-box;
    padding: 20px;
    padding-top: 50px;
    box-sizing: border-box;
}
.input-wraper{
  margin: 20px  0px 20px 0px;
}
.input-wraper:last-child{
  margin: 20px  0px 40px 0px;
}
.zhuce{
  text-align: center;
  margin-top:5px;
  color: $main-color;
}
.zhuce-wraper{
  position: absolute;
  top: 0;
  margin: auto;
  display: none;
}
.denglu-wraper{
  backface-visibility: hidden;
}
.fgpwd{
  text-align: center;
  margin-top:20px;
  color: $color-small;
  font-size: $text-small;
}
.picker{
  display: flex;
  justify-content: space-around;
  padding-bottom: 20px;
  .iconfont{
    color: rgb(199, 70, 70);
    .place{
      color: $color-small
    }
  }
}
//猫头鹰
.owl-wraper{
  position: relative;
  width: 100%;
  height: 100px;
  .left-hand,.right-hand{
    position: absolute;
    width: 34px;
    height: 24px;
    border-radius: 50%;
    background-color: #472d20;
    bottom: -12px;
    left: 80px;
    z-index: 300
  }
  .right-hand{
    position: absolute;
    bottom: -12px;
    left: 225px;
  }
  .left-arm,.right-arm{
    position: absolute;
    width: 80rpx;
    height: 130rpx;
    left: 125px;
    top: 65px;
    opacity: 0;
    z-index: 80
  }
  .right-arm{
    transform: scaleX(-1);
    left: 280rpx;
  }
  .body{
    position: absolute;
    left: 50%;
    transform: translateX(-60%);
    width: 200px;
    height: 100px;
    top: 9px;
  }
  .mouth{
    z-index: 300;
  }

}
.login-wraper{
  position: relative;
}
//动画
.ani-login{
  animation: rotate1 1s ease;
  opacity: 0;
  z-index: 200
}
.ani-zhuce{
  animation: rotate2 1s ease;
  display: block;
  z-index: 200
}
.ani-login-reverse{
  position: relative;
  animation: rotate4 1s ease;
  opacity: 1;
  backface-visibility: visible;
  z-index: 200
}
.ani-zhuce-reverse{
  position: absolute;
  animation: rotate3 1s ease;
  opacity: 0;
  display: block;
  z-index: 100
}
@keyframes rotate1 {
  0%{
    transform: rotateY(0deg);
    height: 300px;
    opacity: 100;
  }
  100%{
    transform: rotateY(180deg);
    height: 360px;
    opacity: 0;
  }
}
@keyframes rotate2 {
  0%{
    transform: rotateY(180deg);
    height: 300px;
    opacity: 0;
  }
  100%{
    transform: rotateY(0deg);
    height: 430px;
    opacity: 1;
  }
}
@keyframes rotate3 {
  0%{
    transform: rotateY(0deg);
    height: 360px;
    opacity: 1;
  }
  100%{
    transform: rotateY(180deg);
    height: 260px;
    opacity: 0;
  }
}
@keyframes rotate4 {
  0%{
    transform: rotateY(180deg);
    opacity: 0;
  }
  100%{
    transform: rotateY(0deg);
    opacity: 1;
  }
}
//猫头鹰动画
.ani-left-hand{
  animation: left-hand-ani 0.3s ease;
  animation-fill-mode: forwards
}
.ani-left-hand-leave{
  animation: left-hand-ani-leave 0.3s ease;
  animation-fill-mode: forwards
}
@keyframes left-hand-ani {
  0%{
    transform: translate(0,0);
    opacity: 1;
  }
  100%{
    transform: translate(40px,-10px);
    opacity: 0;
  }
}
@keyframes left-hand-ani-leave {
  0%{
    transform: translate(40px,-10px);
    opacity: 0;
  }
  100%{
    transform: translate(0,0);
    opacity: 1;
  }
}
.ani-left-arm{
  animation: left-arm-ani 0.5s ease;
  transform-origin: right bottom;
  animation-fill-mode: forwards
}
.ani-left-arm-leave{
  animation: left-arm-ani-leave 0.5s ease;
  transform-origin: right bottom;
  animation-fill-mode: forwards
}
@keyframes left-arm-ani {
  0%{
    transform:translate(-20px,20px) scale(1,0.5);
    opacity: 0;
  }
  30%{
    opacity: 0;
  }
  100%{
    transform:translate(0,0) scale(1,1);
    opacity: 1;
  }
}
@keyframes left-arm-ani-leave {
  0%{
    transform:translate(0,0) scale(1,1);
    opacity: 1;
  }
  100%{
    transform:translate(-20px,20px) scale(1,0.5);
    opacity: 0;
  }
}

.ani-right-hand{
  animation: right-hand-ani 0.3s ease;
  animation-fill-mode: forwards
}
.ani-right-hand-leave{
  animation: right-hand-ani-leave 0.3s ease;
  animation-fill-mode: forwards
}
@keyframes right-hand-ani {
  0%{
    transform: translate(0,0);
    opacity: 1;
  }
  100%{
    transform: translate(-40px,-10px);
    opacity: 0;
  }
}
@keyframes right-hand-ani-leave {
  0%{
    transform: translate(-40px,-10px);
    opacity: 0;
  }
  100%{
    transform: translate(0,0);
    opacity: 1;
  }
}
.ani-right-arm{
  animation: right-arm-ani 0.5s ease;
  transform-origin: right bottom;
  animation-fill-mode: forwards
}
.ani-right-arm-leave{
  animation: right-arm-ani-leave 0.5s ease;
  transform-origin: right bottom;
  animation-fill-mode: forwards
}
@keyframes right-arm-ani {
  0%{
    transform:translate(20px,20px) scale(-1,0.5);
    opacity: 0;
  }
  100%{
    transform:translate(0,0) scale(-1,1);
    opacity: 1;
  }
}
@keyframes right-arm-ani-leave {
  0%{
    transform:translate(0,0) scale(-1,1);
    opacity: 1;
  }
  100%{
    transform:translate(20px,20px) scale(-1,0.5);
    opacity: 0;
  }
}
</style>
<style>
page{
  width:100%;
  height: 100%;
  overflow: hidden;
}
.van-button--large{
  background: #00c5bc;
  background: #00c5bc !important;
  color: white !important;
}
.van-button--default{
  border: none !important;
}
</style>