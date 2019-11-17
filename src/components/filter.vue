<template>
  <div class="filter-wraper"  :style="toggleFilter">
    <scroll-view scroll-y='true' style="height: 85%;">
      <div :class="['lei','ani-up']" v-for="(item, index) in filterData" :key='index' :style="{'animation-delay':(index-1)*0.1+'s'}">
          <h1 class="title">{{item.title}}</h1>
            <div class="btn-wraper">
                <div class="btn"  v-for="(content, index2) in item.children" :key="index2">{{content.label}}</div>
            </div>
      </div>
    </scroll-view>
    <div class="bottom-wraper">
      <van-button type="danger" :round='true' size="large" @click="onConfirm">确定</van-button>
      <van-button type="default" :round='true' size="large">重置</van-button>
    </div>
  </div>
</template>

<script>
import {showJson} from '../utils/util'
import {mapState, mapMutations} from 'vuex'
export default {
  props: {
    filterData: {
      type: Array,
      default: []
    }
  },
  computed: {
    ...mapState(['isFilter']),
    toggleFilter () {
      console.log(this.isFilter)
      return showJson({display: this.isFilter ? 'block' : 'none'})
    }
  },
  methods: {
    ...mapMutations({setfilter: 'SETISFILTER'}),
    onConfirm () {
      this.setfilter(false)
    }
  },
  created () {
    console.log(this.filterData)
  }
}
</script>

<style lang='scss' scoped>
@import "../common/styles/mixin.scss";
.filter-wraper{
    position: fixed;
    z-index: 300;
    top:0px;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    padding: 30px 0px;
    overflow: hidden;
    .btn-wraper{
        display: flex;
        flex-wrap: wrap;
        .btn{
            padding: 5px 10px;
            font-size: 14px;
            border: 1px solid $main-color;
            border-radius: 10px;
            display: inline-block;
            margin: 10px;
        }
    }
    box-sizing: border-box;
    .lei{
     color: $main-color;
     opacity: 0;
     .title{
         font-weight: bold;
         font-size: $text-large;
         margin-bottom: 5px; 
         margin-top: 10px;
     }
    }
    .ani-up{
      animation: upani 1s ease;
      animation-fill-mode: forwards;
    }
    @keyframes upani {
      0%{
        transform: translateY(40px);
        opacity: 0;
      }
      100%{
        transform: translateY(0px);
        opacity: 1;
      }
    }
    .bottom-wraper{
      display: flex;
      width: 100%;
      justify-content: space-around
    }
}
</style>
<style>
scroll-view{
  margin: 20px !important; 
  box-sizing: border-box;
}
.van-button--large{
  width: 100px !important;
  height: 40px !important;
  line-height: 38px !important;
}
</style>