<template>
  <div class="login" style="background: url('../../../static/images/bg/2.jpg');background-size: 100% 100%;">
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
                {{regionArray[0][regionIndex[0]]}}，{{regionArray[1][regionIndex[1]]}}，{{regionArray[2][regionIndex[2]]}}
                </span>
              </i>
            </div>
          </picker>
          <login-input :iconName="'icon-geren'"></login-input>
          <div class="input-wraper">
            <login-input :iconName="'icon-suo'"  :password='true' @focus="focuspwd" @blur="blurpwd"></login-input>
          </div>
          <van-button 
            :round='true' 
            size='large' 
            :form-type='true'>
            登录
          </van-button>
          <p class="zhuce " @click="changetTozhuce" >注册</p>
          <p class="fgpwd">忘记密码?</p>
      </div>
      <!--/登录-->
      <!--注册-->
      <div class="card zhuce-wraper" :class="rotateAni1 === 1 ? 'ani-zhuce' : (rotateAni1 === 2 ? 'ani-zhuce-reverse':'')">
          <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="regionIndex" :range="regionArray">
            <div class="picker">
              <i class="iconfont icon-dituzuobiao">
                <span class="place">
                {{regionArray[0][regionIndex[0]]}}，{{regionArray[1][regionIndex[1]]}}，{{regionArray[2][regionIndex[2]]}}
                </span>
              </i>
            </div>
          </picker>
          <pull-select :placeholder="'请选择年级'" :array='gradeArray'></pull-select>
          <div class="input-wraper">
            <login-input :iconName="'icon-geren'" placeholder="请输入姓名"></login-input>
          </div>
          <pull-select :placeholder="'请选择性别'" :array='sexArray'></pull-select>
          <div class="input-wraper">
            <login-input :iconName="'icon-cardid'" placeholder="请输入身份证后六位"></login-input>
          </div>
          <van-button 
            :round='true' 
            size='large' 
            :form-type='true'>
            注册
          </van-button>
          <p class="zhuce" @click="changetTologin">登录</p>
      </div>
      <!--/注册-->
      </div>
  </div>
</template>

<script>
import LoginInput from '../../components/LoginInput'
import pullSelect from '../../components/pullSelect'
export default {
  components: {
    LoginInput,
    pullSelect
  },
  data () {
    return {
      rotateAni1: 0,
      regionArray: [['全国', '上海', '云南', '内蒙古', '北京', '吉林', '四川', '天津', '宁夏', '安徽'], ['东莞', '中山', '云浮', '佛山', '广州', '惠州', '揭阳', '梅州'], ['爱实践', '北师大']],
      regionIndex: [0, 0, 0],
      gradeArray: ['一年级',
        '二年级',
        '三年级',
        '四年级',
        '五年级',
        '六年级' ],
      sexArray: [
        '男',
        '女'
      ],
      isFocusPwd: -1
    }
  },
  methods: {
    changetTozhuce () {
      this.rotateAni1 = 1
    },
    changetTologin () {
      this.rotateAni1 = 2
    },
    bindMultiPickerChange (e) {
      console.log('picker发送选择改变，携带值为', e)
      this.region = e
    },
    bindMultiPickerColumnChange (e) {
      console.log(e)
    },
    focuspwd () {
      this.isFocusPwd = 0
      console.log(this.isFocusPwd)
    },
    blurpwd () {
      this.isFocusPwd = 1
      console.log(this.isFocusPwd)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.login{
    width: 100%;
    padding: 0px 5%;
    height: 100%;
    padding-top:1px; 
    overflow: hidden;
}
.card{
    position: relative;
    z-index: 100;
    background: white;
    width: 90%;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
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