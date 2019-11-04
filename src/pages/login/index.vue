<template>
  <div class="login" style="background: url('../../../static/images/bg/2.jpg');background-size: 100% 100%;">
    <!--登录-->
    <div class="login-wraper">
      <div class="card denglu-wraper" :class="rotateAni1 === 1 ? 'ani-login' : (rotateAni1 === 2 ? 'ani-login-reverse':'')">
          <login-input :iconName="'icon-geren'"></login-input>
          <div class="input-wraper">
            <login-input :iconName="'icon-suo'"></login-input>
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
          <pull-select></pull-select>
          <div class="input-wraper">
            <login-input :iconName="'icon-geren'" placeholder="请输入姓名"></login-input>
          </div>
          <pull-select></pull-select>
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
      rotateAni1: 0
    }
  },
  methods: {
    changetTozhuce () {
      this.rotateAni1 = 1
    },
    changetTologin () {
      this.rotateAni1 = 2
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
    background: rgba(255,255,255,0.7);
    margin-top:50px;
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
  z-index: 1;
  display: none;
}
.denglu-wraper{
  backface-visibility: hidden;
  z-index: 1;
}
.fgpwd{
  text-align: center;
  margin-top:20px;
  color: $color-small;
  font-size: $text-small;
}

//动画
.ani-login{
  animation: rotate1 1s ease;
  opacity: 0;
  z-index: 2
}
.ani-zhuce{
  animation: rotate2 1s ease;
  display: block;
  z-index: 2
}
.ani-login-reverse{
  position: relative;
  animation: rotate4 1s ease;
  opacity: 1;
  backface-visibility: visible;
  z-index: 2
}
.ani-zhuce-reverse{
  position: absolute;
  animation: rotate3 1s ease;
  opacity: 0;
  display: block;
  z-index: 1
}
@keyframes rotate1 {
  0%{
    transform: rotateY(0deg);
    height: 300px;
    opacity: 1;
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
    height: 400px;
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
.login-wraper{
  position: relative;
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