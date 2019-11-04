<template>
    <picker bindchange="bindPickerChange" :value="index" :range="array"> 
        <div class='input-wraper'>
            <div class="icon-wraper">
            <i class='iconfont icon--xialajiantou'></i>
            </div>
        </div>
        {{array[index]}}
    </picker>
</template>

<script>
export default {
  props: {
    array: {
      type: Array,
      default: ['一年级',
        '二年级',
        '三年级',
        '四年级',
        '五年级',
        '六年纪' ]
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
    begin () {
      this.active = 1
      setTimeout(() => {
        this.activeRight = 1
        setTimeout(() => {
          this.activeTop = 1
        }, 200)
      }, 100)
    },
    end () {
      this.activeTop = 0
      setTimeout(() => {
        this.activeRight = 0
        setTimeout(() => {
          this.active = 0
          console.log(111)
        }, 200)
      }, 200)
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
    margin-bottom: 20px;
    background: linear-gradient(rgb(245, 245, 245),rgb(231, 231, 231),rgb(245, 245, 245));
    .icon-wraper{
        width: 40px;
        height: 40px;
        background: linear-gradient(rgb(196, 196, 196),rgb(170, 170, 170),rgb(196, 196, 196));
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