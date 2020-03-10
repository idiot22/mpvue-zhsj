<template>
  <div id="radar">
    <div class="wrap">
      <mpvue-echarts :echarts="echarts" :onInit="onInit" />
    </div>
    <div class='notice'>
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
</template>

<script>
import * as echarts from 'echarts/dist/diy_echarts.min'
import mpvueEcharts from 'mpvue-echarts'

function initChart (canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)

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
        name: '预算'
      }
      ]
    }]
  }

  chart.setOption(option)
  return chart
}

export default {
  data () {
    return {
      echarts,
      onInit: initChart
    }
  },

  components: {
    mpvueEcharts
  },

  onShareAppMessage () {}
}
</script>

<style lang = 'scss'scoped>
@import '../../common/styles/mixin.scss';
page{
    background: #fbf9fe;
}
#radar{
    padding-top: 50rpx;
}
.wrap {
  width: 100%;
  height: 300px;
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