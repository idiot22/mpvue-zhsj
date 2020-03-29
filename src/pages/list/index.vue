<template>
  <div class="list">
    <div class="bg">
      <div class="intro">
        按照课程名来搜索相应课程！
      </div>
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
        <div class="course-wraper" v-for='(item,index) in courseList' :key="index">
          <div class="left">
            <van-image
              width="100"
              height="100"
              fit="fill"
              :src="baseUrl+'/'+item.courseImgUrl"
            />
          </div>
          <div class="right">
            <div class="title">{{item.className}}</div>
            <div class="tag">
              <van-tag type="success" round plain color='#00c5bc'>{{courseType[item.courseType]}}</van-tag>&nbsp;
              <van-tag type="success" round plain color='#00c5bc'>{{interestType[item.courseType]}}</van-tag>
            </div>
            <div class="time">{{item.payStartTime}}~{{item.payEndTime}}</div>
            <div class="info">
              <span class="money">￥{{item.coursePrice}}</span>
              <span class="yuliang">x{{item.remain}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import filter from '../../components/filter'
import {mapMutations} from 'vuex'
import api from '../../api/index'
import {courseType} from '../../utils/data'
import { baseUrl } from '../../utils/const'
export default {
  components: {
    filter
  },
  data () {
    return {
      baseUrl: baseUrl,
      interestType: ['非兴趣', '兴趣'],
      courseType: courseType,
      courseList: [],
      searchVal: '',
      isStretch: false,
      animSearch: {},
      animBtn: {},
      filterData: [
        {
          title: '年级',
          type: 'radio',
          children: [{
            label: '一年级',
            value: '1'
          },
          {
            label: '二年级',
            value: '2'
          },
          {
            label: '三年级',
            value: '3'
          },
          {
            label: '四年级',
            value: '4'
          },
          {
            label: '五年级',
            value: '5'
          },
          {
            label: '六年级',
            value: '6'
          }
          ]
        },
        {
          type: 'radio',
          title: '类型',
          value: '类型',
          children: [
            {
              label: '研学',
              value: '0'
            },
            {
              label: '实践',
              value: '1'
            },
            {
              label: '兴趣',
              value: '2'
            }
          ]
        },
        {
          type: 'radio',
          title: '星期',
          value: '星期',
          children: [{
            label: '星期一',
            value: '星期一'
          },
          {
            label: '星期二',
            value: '星期二'
          },
          {
            label: '星期三',
            value: '星期三'
          },
          {
            label: '星期四',
            value: '星期四'
          },
          {
            label: '星期五',
            value: '星期五'
          },
          {
            label: '星期六',
            value: '星期六'
          },
          {
            label: '星期日',
            value: '星期日'
          }

          ]
        },
        {
          type: 'radio',
          title: '时间',
          value: '时间',
          children: [{
            label: '08:30-10:00',
            value: '08:30-10:00'
          },
          {
            label: '10:20-11:50',
            value: '10:20-11:50'
          },
          {
            label: '14:30-16:00',
            value: '14:30-16:00'
          },
          {
            label: '16:20-17:50',
            value: '16:20-17:50'
          },
          {
            label: '18:15-19:45',
            value: '18:15-19:45'
          }

          ]
        }
      ],
      list: [
        {
          courseImg: 'http://localhost/zhsj/image/courses/cooker.jpg',
          title: '小小美食家',
          flag: '进行中',
          day: '周六',
          time: '15:00-17:00',
          price: '3500'
        },
        {
          courseImg: 'http://localhost/zhsj/image/courses/活动02.jpg',
          title: '折纸课程',
          flag: '一天后',
          day: '周日',
          time: '15:00-17:00',
          price: '5500'
        },
        {
          courseImg: 'http://localhost/zhsj/image/courses/活动03.jpg',
          title: '航模制作',
          flag: '六天后',
          day: '周五',
          time: '19:00-21:00',
          price: '6000'

        }
      ]
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
      api.getCourseList({
        keyword: this.searchVal,
        minPrice: 0,
        maxPrice: 9007199254740991
      }).then((res) => {
        this.courseList = res.data.data
      })
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
    padding: 35px 0px
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
  .left{
    margin-right: 20px;
    border-radius: 10px;
    overflow: hidden;
  }
  .right{
    .title{
      color:$main-txt;
      font-size: $text-big;
      font-weight: 300;
    }
    .time{
      color:$color-shallow;
      font-size: $text-small;
      padding: 5px 0px;
    }
    .info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .money{
        color:$yellow-color;
        font-size:$text-large;
        font-weight: 800;
      }
      .yuliang{
        color:$main-color;
        font-size:$text-medium;
        margin-right:0px        
      }
    }
  }
}
</style>