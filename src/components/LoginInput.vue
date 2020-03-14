<template>
  <div class='input-wraper'>
    <div class="icon-wraper" :class="active == 1 ? 'icon-active' : ''">
      <i :class="['iconfont', iconName,active == 1 ? 'icon-active' : '']"></i>
    </div>
    <input :type="inputType" 
      @focus="begin(e)"
      @blur="end(e)"
      @input="$emit('input',$event.mp.detail.value)"
       :placeholder='placeholder'
       :password='password'>
    <hr class="line-bottom" :class="active == 1 ? 'line-bottom-active' : ''">
    <hr class="line-right" :class="activeRight == 1 ? 'line-right-active' : ''">
    <hr class="line-top" :class="activeTop == 1 ? 'line-top-active' : ''">
  </div>
</template>

<script>
export default {
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    iconName: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    password: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: 0,
      activeRight: 0,
      activeTop: 0
    }
  },
  methods: {
    getValue (e) {
      console.log(e)
    },
    begin () {
      this.active = 1
      setTimeout(() => {
        this.activeRight = 1
        setTimeout(() => {
          this.activeTop = 1
        }, 200)
      }, 100)
      this.$emit('focus')
    },
    end (e) {
      this.activeTop = 0
      setTimeout(() => {
        this.activeRight = 0
        setTimeout(() => {
          this.active = 0
        }, 200)
      }, 200)
      this.$emit('blur')
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../common/styles/mixin.scss";
.input-wraper{
    position:relative;
    background: $bg2-color;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    height: 40px;
    margin: auto;
    align-items: center;
    .icon-wraper{
        width: 40px;
        height: 40px;
        background: $main-color;
        line-height: 40px;
        text-align: center;
        color: white;
        margin-right: 10px;
        transition: all 0.3s ease;
        .iconfont{
          transition: all 0.3s ease;
        }
    }
    .icon-active{
      width: 32px;
      font-size: $text-small
    }
    .line-bottom{
      background: $main-color;
      width: 0%;
      height: 2px;
      position: absolute;
      bottom: 0px;
      transition: all 0.2s ease;
      &.line-bottom-active{
        width: 100%;
      }
    }
    .line-right{
      background: $main-color;
      height: 0px;
      width: 2px;
      position: absolute;
      right: 0px;
      bottom: 0px;
      transition: all 0.2s ease;
      &.line-right-active{
        height: 40px;
      }
    }
    .line-top{
      background: $main-color;
      width: 0%;
      height: 2px;
      position: absolute;
      top: 0px;
      right: 0px;
      transition: all 0.2s ease;
      &.line-top-active{
        width: 100%;
      }
    }
    input{
      font-size: $text-small
    }
    .placehoder{
      font-size:$text-small
    }
}
</style>