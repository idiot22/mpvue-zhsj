<template>
  <div class="vuetabbar">
      <div class="tab-bar">
          <ul>
              <li v-for="(item,index) in tabList" :key="index" @click="linkTo(index)">
                <div class="tab-wraper">
                  <img  class='icon'
                  :class="tabIndex == index ? 'icon-ani' : ''"
                  :src="tabIndex == index ? item.selectedIconPath : item.iconPath" alt="">
                  <p class="text" :class="tabIndex == index ? 'text-active' : ''">{{item.text}}</p>
                </div>
                <div class="cicle-wraper" :class="tabIndex == index ? 'circle-ani' : ''">
                  <img src="../../static/tabs/tabCirle.png" alt="">
                </div>
                <div :class="tabIndex == index ? 'bg-circle-ani' : ''" 
                class="bg-circle"></div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import * as types from '../store/mutation-types'
export default {
  props: ['text'],
  data () {
    return {
      animationData: {},
      tabList: [
        {
          text: '发现',
          iconPath: '../../static/tabs/discover.png',
          selectedIconPath: '../../static/tabs/discover-c.png',
          pagePath: '../../pages/index/main'
        },
        {
          text: '课程',
          iconPath: '../../static/tabs/course.png',
          selectedIconPath: '../../static/tabs/course-c.png',
          pagePath: '../../pages/plan/main'
        },
        {
          text: '作品',
          iconPath: '../../static/tabs/tijiao.png',
          selectedIconPath: '../../static/tabs/tijiao-c.png',
          pagePath: '../../pages/zuopin/main'
        },
        {
          text: '我的',
          iconPath: '../../static/tabs/my.png',
          selectedIconPath: '../../static/tabs/my-c.png',
          pagePath: '../../pages/person/main'
        }
      ]
    }
  },
  onshow () {
  },
  computed: {
    ...mapState(['tabIndex'])
  },
  methods: {
    ...mapMutations({setTabIndex: types.SET_TABINDEX}),
    linkTo (index) {
      this.setTabIndex(index)
      this.activeIndex = this.tabIndex
      wx.switchTab({
        url: this.tabList[index].pagePath
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../common/styles/mixin.scss";
.vuetabbar{
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 48px;
    z-index: 100;
    background: white;
    .tab-bar{
        box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.05);
        width: 100%;
        height: 100%;
        ul{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            li{
                width: 25%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .tab-wraper{
                  position: relative;
                  z-index: 3;
                  img{
                      width: px(40);
                      height: px(40);
                  }
                  p{
                      font-size:$text-tiny;
                      text-align: center;
                      color: #b7b7b7;
                  }
                  .text-active{
                    color: #00c5bc;
                  }
                }
                .bg-circle{
                  position: absolute;
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  z-index:2;
                }
            }
            .cicle-wraper{
             position: absolute;
             top:-10px;
             z-index: 1;
             display: none;
             img{
                width: px(140);
                height: px(100);
             }
            }
            .circle-ani{
               transform: translateY(-11px);
               animation:popbg 0.5s;
               display: block;
             }
            .icon-ani{
               transform: translateY(-7px);
               animation:popicon 0.5s;
             }
            .bg-circle-ani{
              animation:bigpop 0.5s;
              opacity: 1;
              transform: translateY(-10px);
              background: linear-gradient(#45ffc7, #00c5bc);
            }
            
            // .cicle-wraper-active{
            //   top:-22px;
            // }
        }
    }
}
.card {
  padding: 10px;
}
@keyframes popbg {
    0%{
      transform: translateY(0)
    }
    60%{
      transform: translateY(-11px)
    }
    80%{
      transform: translateY(-8px)
    }
    100%{
       transform: translateY(-11px)
     }
}
@keyframes popicon {
    0%{
      transform: translateY(0)
    }
    60%{
      transform: translateY(-7px)
    }
    80%{
      transform: translateY(-4px)
    }
    100%{
       transform: translateY(-7px)
     }
}
@keyframes bigpop {
    0%{
      opacity: 0;
      transform: translateY(0) scale(0);
      transform: scale(0)
    }
    60%{
      opacity: 0.3;
      transform: translateY(-11px) scale(0.8);
       transform: scale(0.8)
    }
    80%{
      transform: translateY(-5px) scale(1)
    }
    100%{
      opacity: 1;
       transform: translateY(-11px) scale(1)
     }
}
</style>