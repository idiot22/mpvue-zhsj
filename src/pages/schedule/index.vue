<template>
  <div id='schedule'>
    <div class="top">
    <div v-for="item in ['一','二','三','四','五','六','日']" class="top-text" :key='item'>周{{item}}</div>
    </div>
    <scroll-view scroll-y="true" class="scroll">
    <div style="height:1200rpx;width:730rpx;display:flex;">
        <div style="background-color:#f3f8f8;color:#6d8498;">
        <div v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]" :key='item' class="left">
            {{item}}
        </div>
        </div>
        <div v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10,11,12]" :key='index'>
            <div :style="{marginTop:(index+1)*100 + 'rpx'}" class="style1">
            </div>
        </div>

        <!--课表-->
        <div v-for="(item,index) in wlist" :key='index' :style="{position:'absolute',left:(item.xqj-1)*100+40+'rpx',marginTop:(item.skjc-1)*100+5 + 'rpx',height:item.skcd*100-5+'rpx'}">
          <div class="flex-item kcb-item" bindtap="showCarddiv" :style="{backgroundColor:colorArrays[index%9]}">
              <div class="smalltext" >{{item.kcmc}}</div>
          </div>
        </div>
    </div>
    </scroll-view>
  </div>
</template>

<script>
import {formatDate} from '../../utils/index'
import api from '../../api/index'

export default {
  data: {
    colorArrays: ['#ff9e9e', '#ffdf62', '#61e7f0', '#c2b4f6', '#0A9A84', '#FF99CC', '#FF9966', '#99CCCC'],
    wlist: [
      {xqj: 2, skjc: 1, kcmc: '扎染围巾', skcd: 2},
      {xqj: 2, skjc: 3, kcmc: '扎染半袖', skcd: 2},
      {xqj: 2, skjc: 9, kcmc: '最佳设计师', skcd: 2},
      {xqj: 2, skjc: 7, kcmc: '猎人部落', skcd: 2},
      {xqj: 3, skjc: 5, kcmc: '重回古战场', skcd: 2},
      {xqj: 4, skjc: 1, kcmc: '测试', skcd: 2},
      {xqj: 5, skjc: 4, kcmc: '扎染半袖', skcd: 2}
    ],
    time: [
      ''
    ]
  },
  onLoad: function () {
    let week = new Date().getDay()
    let dates = []
    // 获取今日日期之前的日期
    for (var i = 0; i < week; i++) {
      let date = formatDate(new Date((new Date() / 1000 - 86400 * i) * 1000))
      dates.push(date)
    }
    // 获取今日日期之后的日期
    dates.reverse()
    for (var j = week - 2; j < 6; j++) {
      let date = formatDate(new Date((new Date() / 1000 + 86400 * j) * 1000))
      dates.push(date)
    }
    api.getSchedule({
      startDate: dates[0],
      endDate: dates.pop()
    }).then((res) => {
      console.log(res)
    })
  },
  res2wlist () {
    let wlist = []
    let course = {}
    course = {xqj: 5, skjc: 3, kcmc: '342432', skcd: 2}
    wlist.push(course)
    console.log(wlist)
    return wlist
  }
}
</script>

<style lang='scss' scoped>
.style1{
    position: absolute;
    border-bottom:1rpx dashed lightgray;
    width:750rpx;
}
.flex-item {
  width: 95rpx;
  height: 95px;
}

.kcb-item {
  position: absolute;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 10px;
}

.smalltext {
  font-size: 8pt;
  color: #fff;
  padding-left: 2px;
}

.top {
  display: flex;
  flex-direction: row;
  margin-left: 35rpx;
  background-color: #f3f8f8;
  color: #6d8498;
  padding-top:5px;
  padding-bottom:5px ;
  vertical-align: middle;
  font-size:15px ;
}

.top-text {
  width: 100rpx;
  height: 45rpx;
  font-size: 11pt;
  justify-content: center;
  display: flex;
  align-items: center;
  line-height: 40px
}

.scroll {
  height: 1170rpx;
  z-index: 101;
  position: fixed;
}

.left {
  width: 35rpx;
  height: 100rpx;
  font-size: 9pt;
  justify-content: center;
  display: flex;
  align-items: center;
}
</style>