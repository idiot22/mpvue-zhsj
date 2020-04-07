<template>
  <div class="list">
    <div class="bg">
      <div class="intro">
        按照活动名称来搜索相应活动吧</div>
    </div>
    <div class="content">
      <div class="zong-wraper">
        <div class='search-wraper' :animation='animSearch'>
          <input  class="input" :style="isStretch ? 'display:block' :''"
            @blur="searchAniBack(e)"
            v-model="searchVal"
            @input="$emit('input',$event.mp.detail.value)">
        </div>
        <div class="search-circle" @click="clickSearchAni" :animation='animBtn'>
          <span>
            <van-icon name="search"/>
          </span>
        </div>
      </div>
      <div class="list">
        <div 
          class="course-wraper" v-for='(item,index) in activeList' 
          :key="index" 
          @click="showInfo(index)">
          <div class="left">
            <van-image
              width="100"
              height="100"
              fit="fill"
              lazy-load
              :src="baseUrl+'/'+item.imageUrl"
            />
          </div>
          <div class="right">
            <div class="title">{{item.activityName}}</div>
            <div class="time">
              <van-icon name="clock-o" />&nbsp;{{item.activityStartTime+'~'+item.activityEndTime}}
              <br>
            </div>
            <div class="locale">
              <span class="place">
                <van-icon name="location-o" color="#FF9933"/>&nbsp;{{item.activityAddress}}
              </span>&nbsp;
              <span class="renshu">
                <van-icon name="friends-o"  size="15" color="#00c5bc"/>&nbsp;{{item.maxCount}}
              </span>
            </div>
            <div class="info">
              {{item.activityDescription}}
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import api from '../../api/index'
import {courseType} from '../../utils/data'
import { baseUrl } from '../../utils/const'
export default {
  data () {
    return {
      chooseKcIndex: 0,
      baseUrl: baseUrl,
      interestType: ['非兴趣', '科学益智', '舞蹈体育类'],
      courseType: courseType,
      activeList: [],
      searchVal: '',
      isStretch: false,
      animSearch: {},
      animBtn: {}
    }
  },
  methods: {
    ...mapMutations({setfilter: 'SETISFILTER'}),
    showFilter () {
      this.setfilter(true)
    },
    clickSearchAni () {
      if (!this.isStretch) {
        var animationSearch = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease-out'
        })
        var animationBtn = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease-out'
        })
        animationSearch.width(250).step()
        animationBtn.translateX(100).step()
        this.animSearch = animationSearch.export()
        this.animBtn = animationBtn.export()
        this.isStretch = true
      } else {
        this.search()
      }
    },
    searchAniBack () {
      var animationSearch = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationBtn = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      animationSearch.width(50).step()
      animationBtn.translateX(0).step()
      this.animSearch = animationSearch.export()
      this.animBtn = animationBtn.export()
      this.isStretch = false
    },
    search () {
      api.getAllActivities({
        keyword: this.searchVal
      }).then((res) => {
        this.activeList = res.data.data
      })
    },
    showInfo (index) {
      let id = this.activeList[index].activityId
      this.$router.push({ path: '../activeInfo/main', query: {id: id} })
    }
  },
  onLoad () {
    this.search()
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';

.bg{
  width:100%;
  height: 200px;
  background: $main-color;
  background-image: #03c8bb;
  position: relative;
  .intro{
    width:50%;
    margin: 0px 25%;
    box-sizing: border-box;
    font-size: 13px;
    color: white;
    padding: 25px 0px;
    text-align: center;
  }
}
.content{
  width:100%;
  background: white;
  position: relative;
  top: -220rpx;
  padding: 20px;
  padding-top: 40px;
  box-sizing: border-box;
  border-radius: 100rpx 100rpx 0rpx 0rpx;
  min-height: 300px;
}
.zong-wraper{
  display: flex;
  justify-content: center;
}
.search-circle{
  position: absolute;
  width:50px;
  height:50px;
  background: white;
  border-radius: 50px;
  line-height: 55px;
  text-align: center;
  color: $color-small;
  font-size:25px;
  left: 50%;
  margin-left: -25px;
  margin-top:-65px
}
.search-wraper{
  width:50px;
  height:50px;
  border-radius: 50px;
  position: absolute;
  top:-25px;
  background: white;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
  .input{
    display: none;
  }
}
.course-wraper{
  display: flex;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
  margin-bottom: 20px;
  box-sizing: border-box;
  .left{
    flex-shrink: 0;
    margin-right: 20px;
    border-radius: 10px;
    overflow: hidden;
  }
  .right{
    flex-grow:0;
    .title{
      color:$main-txt;
      font-size: $text-big;
      font-weight: 300;
    }
    .time{
      color:$color-shallow;
      font-size: $text-small;
    }
    .info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      color:$color-small;
      font-size:$text-small;
      margin-right:0px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding-top: 10px;
    }
    .locale{
      display: flex;
      align-items: center;
      color:$color-shallow;
      font-size: $text-small;
      .place{
        display: flex;
        align-items: center;
        color: $yellow-color;
      }
      .renshu{
        display: flex;
        color:$main-color;
        align-items: center;
      }      
    }
  }
}
</style>