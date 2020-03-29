<template>
  <div class="plan">
    <div class="bg">
      <!-- <img src="/static/images/zuopin/zuopin.png" alt=""> -->
      <div class="title">
        <div class="data">{{today}}</div>
        <div class="tiqi">{{todate}}<br>{{toweek}}</div>
        <img src="/static/images/zuopin/course.png" alt="" srcset="">
      </div>
      <div class="datalist">
        <div class="weeks">
            <div class="week" v-for="(item,index) in weeks" :key="item">
              <span>{{item.value}}</span>
              <span class="date" :class="activeIndex === index ? 'date-active':''" @click="changeClass(index)">{{dates[index]}}</span>
            </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="riqi-select">
          <picker mode="date" :value="startDate" @change="bindDateChange1">
            <div class="picker">
              <van-icon name="notes-o" />&nbsp;{{startDate}}
            </div>
        </picker>
        <div style='padding:0px 10px'> 至 </div>
        <picker mode="date" :value="endDate" @change="bindDateChange2">
          <div class="picker">
            <van-icon name="notes-o" />&nbsp;{{endDate}}
          </div>
        </picker>
        <span></span>
      </div>
      <div class="course-wraper" v-for='(day,index) in daylist' :key='index'>
        <timeShow :data="day[0].courseDate"></timeShow>
        <div class="daycourse-wraper" v-for='(item,_index) in day' :key='_index'>
          <h2>
            <span class="time">
              <van-icon name="clock-o" /> {{item.courseStartTime+'-'+item.courseEndTime}}
            </span>
            <p> &nbsp;{{item.className}}</p>
          </h2>
          <span>
            <van-icon name="manager-o" />&nbsp;{{item.teacherName}}&nbsp;
            <van-icon name="location-o" />&nbsp;{{item.classroomName}}
          </span>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index'
import {formatDate, getWeek} from '../../utils/index'
import timeShow from '../../components/info-list/time'
export default {
  components: {timeShow},
  data () {
    return {
      activeIndex: 0,
      todate: '',
      toweek: '',
      today: '',
      daylist: [],
      startDate: '2020-03-28',
      endDate: '2020-03-29',
      weeks: [
        {value: '周一'},
        {value: '周二'},
        {value: '周三'},
        {value: '周四'},
        {value: '周五'},
        {value: '周六'},
        {value: '周日'}
      ],
      dates: [],
      courseList: []
    }
  },
  watch: {
    courseList (newVal) {
      let daylist = []
      let daySchedule = []
      for (var i = 0; i < newVal.length; i++) {
        newVal[i].courseStartTime = newVal[i].courseStartTime.slice(0, 5)
        newVal[i].courseEndTime = newVal[i].courseEndTime.slice(0, 5)
        if (i === 0 || newVal[i].courseDate === newVal[i - 1].courseDate) {
          daySchedule.push(newVal[i])
          continue
        }
        daylist.push(daySchedule)
        daySchedule = []
        daySchedule.push(newVal[i])
      }
      this.daylist = daylist
    }
  },
  methods: {
    bindDateChange1 (e) {
      this.startDate = e.mp.detail.value
      api.getSchedule({
        startDate: this.startDate,
        endDate: this.endDate
      }).then((res) => {
        this.courseList = res.data.data
      })
    },
    bindDateChange2 (e) {
      this.endDate = e.mp.detail.value
      api.getSchedule({
        startDate: this.startDate,
        endDate: this.endDate
      }).then((res) => {
        this.courseList = res.data.data
      })
    },
    changeClass (index) {
      this.activeIndex = index
      this.startDate = this.endDate = formatDate(new Date((new Date() / 1000 + 86400 * index) * 1000))
      api.getSchedule({
        startDate: this.startDate,
        endDate: this.endDate
      }).then((res) => {
        this.courseList = res.data.data
      })
    }

  },
  onLoad () {
    // 初始化日期数据
    this.startDate = this.endDate = formatDate(new Date())
    this.toweek = getWeek(new Date().getDay())
    this.todate = formatDate(new Date()).slice(0, 7)
    this.today = new Date().getDate()
    for (var i = 0; i < 7; i++) {
      let date = formatDate(new Date((new Date() / 1000 + 86400 * i) * 1000))
      this.dates.push(date.slice(8, 10))
    }
    api.getSchedule({
      startDate: this.startDate,
      endDate: this.endDate
    }).then((res) => {
      this.courseList = res.data.data
    })
  }
}
</script>
<style lang="scss">
@import '../../common/styles/mixin.scss';
.bg{
  width:100%;
  height: 280px;
  background: $main-color;
  background-image: linear-gradient(to right, #1edcb4, #03c8bb);
  position: relative;
  img{
    position: absolute;
    width:25px;
    height:25px;
    left:150px
  }
  .title{
    position:relative;
    font-size: 80rpx;
    padding: 70rpx;
    padding-bottom: 20rpx;
    color: white;
    font-weight: 900;
    display: flex;
    align-items: center;
    .data{
      font-size: 90rpx;
      padding-right: 10px;
    }
    .tiqi{
      font-size: 25rpx;
      line-height: 30rpx;
      font-weight: 400;
    }
    .line{
      width: 160rpx;
      height: 25rpx;
      background: rgba(138,236,232,0.5);
      border-radius: 5rpx;
      margin-left: 20rpx;
      margin-top: -20rpx;
    }

  }
  .datalist{
    .weeks{
        display: flex;
        justify-content: space-around;
        color: white;
        .week{
          display: flex;
          flex-direction: column;
          align-content: center;
          .date{
            font-size: $text-medium;
            text-align: center;
            margin-top: 5px;
            width: 30px;
            height: 30px;
            line-height: 30px;
          }
          .date-active{
            color: $main-color;
            background: white;
            border-radius: 50px;
          }
        }
      }
    }
}
.content{
  width:100%;
  background: white;
  position: relative;
  top: -220rpx;
  padding: 20px;
  padding-top: 0px;
  box-sizing: border-box;
  border-radius: 100rpx 100rpx 0rpx 0rpx;
  overflow: hidden;
  min-height: 300px;
  .riqi-select{
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
  }
  .picker{
    display: flex;
    align-items: center;
    font-size: $text-medium;
  }
}

.daycourse-wraper{
  width:100%;
  background: $bg2-color;
  border-radius: 10px;
  padding: 20px;
  box-sizing:border-box;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 15px;
  h2{
    margin-bottom: 10px;
    font-size: $text-medium;
    font-weight: 800;
    color: $main-txt;
    display: flex;
    align-items: center;
  }
  span{
    color:$color-small;
    font-size: $text-medium;
  }
  .time{
    color:$main-color;
    font-size: $text-large;
    display: flex;
    align-items: center;
  }
}
</style>
