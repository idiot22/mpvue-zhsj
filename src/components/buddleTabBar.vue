<template>
  <div class="tab-bar">
      <div class='tab-title'>
          <div class="tab" v-for="(item, index) in tabData" :key='index' @click="changeTab(index)"
            :class="[curIndex === index ? 'activeTab' : '', curIndex === index && tabBig ? 'textbig' : '']">
              <div class="tabname">{{item.num}}</div>
              <div>{{item.name}}</div>
          </div>
          <div class="hua-line" :animation='lineAni' :class="isPop === 1 ? 'active-line' : ''"></div>
      </div>
      <div class="tab-content-wraper">

      </div>
  </div>
</template>

<script>
export default {
  props: {
    tabData: {
      type: Array,
      default: [
        {name: '课程', num: 10},
        {name: '活动', num: 10},
        {name: '作业', num: 10}
      ]
    },
    tabBig: false
  },
  data () {
    return {
      curIndex: 0,
      lineAni: { },
      step: 160,
      isPop: 0
    }
  },
  methods: {
    changeTab (index) {
      this.isPop = 0
      this.curIndex = index
      let ani = mpvue.createAnimation({
        duration: 200,
        timingFunction: 'ease'
      })
      if (index === 0) {
        ani.left(5).step()
      } else {
        ani.left(this.step * index).step()
      }
      this.lineAni = ani.export()
      setTimeout(() => {
        this.isPop = 1
      }, 200)
    }
  }

}
</script>

<style lang='scss' scoped>
@import "../common/styles/mixin.scss";
.tab-bar{
    width: 100%;
    .tab-title{
        position: relative;
        padding: 15px 0px;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.5px solid $color-line;
        .tab{
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: $text-medium;
            transition: all 0.3s ease;
            .tabname{
                font-weight: bold;
                font-size: $text-small;
                transition: all 0.3s ease;
            }
        }
    }
    .hua-line{
        position: absolute;
        bottom: 0px;
        width: 10px;
        height: 4px;
        background: $main-color;
        left: 8px;
    }
}
.activeTab{
    font-weight:bold;
    color: $main-color; 
}
.active-line{
    animation: anitan 0.1s ease;
    
}
.textbig{
  transition: all 0.3s ease;
  transform: scale(1.5) translateY(-10px);
  .tabname{
    opacity: 0;
  }
}
@keyframes anitan {
    0%{
        transform: translate(10px)
    }
    50%{
        transform: translate(-10px)
    }
    100%{
        transform: translate(0px)
    }
}
</style>