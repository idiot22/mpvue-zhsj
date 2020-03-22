<template>
  <div id="radar">
    <div class="select">
      <div class="subject-wraper">
        <span class="kecheng">课程：</span>
        <picker @change="changeClass" :value="classIndex" :range="studentClassList" :range-key="'className'">
          <div class="clickdown">
            <span class="picker">{{studentClassList[classIndex].className}}</span>&nbsp;
            <van-icon name="arrow-down" />
          </div>
        </picker>
      </div>
      <div class="line"/>
      <div class="weeks">
        <span v-for='(item,index) in weekList' 
          :key='index'
          @click="clickWeek(item.value)"
          :class="item.value === activeIndex ? 'active-week' : ''">{{item.text}}</span>   
      </div>
    </div>
    <div class="show-echart" >
      <div class="wrap">
          <mpvue-echarts :echarts="echarts" :onInit="onInit" />
        </div>
        <div class='notice' :animation='animationData'>
            <image src='/static/images/dianji.png'></image>
            <text>轻触雷达图查看详情</text>
      </div>
      <div class='end'>
        <navigator url="/pages/timeframe/timeframe">
          <div class='title'>测评报告</div></navigator>
          <div class='grade'>
            <div class='yuan'></div>
            <text>某某同学在科学精神及责任担当上表现的很好哦v某某同学在科学精神及责任担当上表现的很好哦
            某某同学在科学精神及责任担当上表现的很好哦v某某同学在科学精神及责任担当上表现的很好哦
            </text>
          </div>
          <div class='grade'>
            <div class='yuan'></div>
            <text>某某同学在科学精神及责任担当上表现的很好哦</text>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts/dist/diy_echarts.min'
import mpvueEcharts from 'mpvue-echarts'
import api from '../../api/index'
let commentName = ['人文底蕴', '科学精神', '学会学习', '健康生活', '责任担当', '实践创新']
var option = {
  backgroundColor: '#ffffff',
  color: ['#00c5bc'], // 选择的界限
  tooltip: {},
  xAxis: {
    show: false
  },
  yAxis: {
    show: false
  },
  radar: {
    shape: 'circle',
    splitArea: { // 不同环形的颜色
      areaStyle: {
        color: []
      },
      shadowColor: ['rgb(197, 207, 217)'] // 圆颜色
    },

    axisLine: { // 纵轴的颜色
      lineStyle: {
        color: 'rgb(197, 207, 217)'
      }
    },
    axisTick: {
      show: true
    },
    indicator: [{ // 指示的内容
      name: '人文底蕴',
      max: 100
    },
    {
      name: '科学精神',
      max: 100
    },
    {
      name: '学会学习',
      max: 100
    },
    {
      name: '健康生活',
      max: 100
    },
    {
      name: '责任担当',
      max: 100
    },
    {
      name: '实践创新',
      max: 100
    }
    ],
    name: { // 修改指示器的样式
      formatter: '{value}',
      textStyle: {
        color: 'white',
        backgroundColor: '#00c5bc',
        borderRadius: 3,
        padding: [3, 5],
        fontSize: 13
      }
    }
  },
  series: [{
    name: '预算 vs 开销',
    type: 'radar',
    data: [{
      value: [3, 40, 50, 30, 49, 40],
      name: '素养评价：'
    }
    ],
    tooltip: { // 触摸显示详情
      trigger: 'item',
      formatter: function (param) {
        // 利用循环更改显示的内容
        console.log(param)
        let length = param.value.length
        let txt = param.data.name + '\n'
        for (let i = 0; i < length; i++) {
          if (i === length - 1) {
            txt += commentName[i] + '：' + param.value[i]
            return txt
          }
          txt += commentName[i] + '：' + param.value[i] + '\n'
        }
      }}
  }]
}
let chart = null
function initChart (canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  chart.setOption(option)
  return chart
}
function refreshData (data) {
  // 刷新数据
  var option = chart.getOption()
  option.series[0].data[0].value = data
  chart.setOption(option)
}
export default {
  data () {
    return {
      classIndex: 0,
      studentClassList: [],
      echarts,
      onInit: initChart,
      weekList: [{value: 5, text: '第五周'},
        {value: 4, text: '第四周'},
        {value: 3, text: '第三周'},
        {value: 2, text: '第二周'},
        {value: 1, text: '第一周'}],
      activeIndex: 5
    }
  },

  components: {
    mpvueEcharts
  },
  methods: {
    changeClass (e) {
      this.classIndex = e.mp.detail.value
      api.getRadar({
        classId: this.studentClassList[this.classIndex].classId,
        week: this.activeIndex
      }).then((res) => {
        let scoreList = []
        res.data.statisticsEntityList.forEach((item) => {
          scoreList.push(item.num)
        })
        refreshData(scoreList)
      })
    },
    clickWeek (index) {
      this.activeIndex = index
      api.getRadar({
        classId: this.studentClassList[this.classIndex].classId,
        week: this.activeIndex
      }).then((res) => {
        let scoreList = []
        res.data.statisticsEntityList.forEach((item) => {
          scoreList.push(item.num)
        })
        refreshData(scoreList)
      })
    }
  },
  onShareAppMessage () {},
  onLoad () {
    api.getStudentClass().then((res) => {
      this.studentClassList = res.data.data
      return api.getRadar({
        classId: this.studentClassList[this.classIndex].classId,
        week: this.activeIndex
      })
    }).then((res) => {
      let scoreList = []
      res.data.statisticsEntityList.forEach((item) => {
        scoreList.push(item.num)
      })
      refreshData(scoreList)
    })
  }
}
</script>

<style lang = 'scss' scoped>
@import '../../common/styles/mixin.scss';
.select{
  background: $main-color;
  color: white;
  padding-bottom: 150rpx;
}
.subject-wraper{
  padding: 20rpx;
  display: flex;
  justify-content:center;
  align-content: center;
  span{
    font-size: $text-medium;
  }
}
.kecheng{
  font-size: $text-big;
  text-align: center;
  padding-top: 5px;
}
.line{
  background: $shen-color;
  width: 100%;
  height:1px
}
.weeks{
  padding: 20rpx;
  display: flex;
  justify-content: space-around;
}

.weeks span{
  padding: 10rpx 25rpx;
  border: 1px solid rgb(234, 251, 255);
  color: rgb(234, 251, 255);
  font-size: $text-small;
  border-radius: 50px;
  transition: all 0.5s ease;
}
.active-week{
  padding: 10rpx 25rpx;
  border: 1px solid rgb(234, 251, 255);
  color: $main-color !important;
  font-size: $text-small;
  border-radius: 50px;
  background: rgb(234, 251, 255);
  box-shadow: 4rpx 4rpx  4px #688b87c2
}
.clickdown{
  font-size: $text-tiny;
  background: $shen-color;
  padding: 10rpx 20rpx;
  border-radius: 50rpx;
}
page{
    background: #fbf9fe;
}
#radar{
    
}
.show-echart{
  position: relative;
  top:-140rpx;
  border-radius: 50rpx  50rpx 0px 0px;
  overflow: hidden;
}
.wrap {
  width: 100%;
  height: 300px;
  padding-top: 30px;
  border-radius: 50rpx 50rpx 0 0;
  overflow: hidden;;
  background: white;
}
.notice{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}
.notice image{
  width:20px;
  height:20px
}
.notice text{
  font-size:12px;
  color:rgb(141, 141, 141)
}
.end{
  box-sizing: border-box;
  margin-top:30px ;
  width:90%;
  padding: 10px;
  background: white;
  box-shadow: 0px 2px 15px #f5f5f5;
  border-radius: 10px;
  margin: 5%;
}
.grade{
  margin-top: 5px ;
  display: flex;
}
.grade text{
  font-size:12px;
  color: #999;
}
.title{
  font-size: 14px;
  color: rgb(54, 54, 54);
  flex-shrink:0 
}
.yuan{
  width: 8px;
  height:8px;
  background-color: rgba(0, 197,188, 0.2);
  border-radius: 50%;
  flex-shrink:0 ;
  margin-top:5px;
  margin-right:5px  
}
</style>