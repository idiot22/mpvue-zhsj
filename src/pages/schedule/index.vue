<template>
  <div id='schedule'>
    <div class="top">
    <div v-for="item in ['一','二','三','四','五','六','日']" class="top-text" :key='item'>周{{item}}</div>
    </div>
    <scroll-div scroll-y="true" class="scroll">
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
        <div v-for="(item,index) in wlist" :key='index'>
        <div class="flex-item kcb-item" bindtap="showCarddiv" >
            <div class="smalltext" >{{item.kcmc}}</div>
        </div>
        </div>
    </div>
    </scroll-div>
  </div>
</template>

<script>
// import { myCourseBiaoAPI } from '../../../util/api.js'
export default {
  data: {
    colorArrays: ['#ff9e9e', '#ffdf62', '#61e7f0', '#c2b4f6', '#0A9A84', '#FF99CC', '#FF9966', '#99CCCC'],
    wlist: [
    ],
    time: [
      ''
    ]
  },
  onLoad: function () {
    // myCourseBiaoAPI().then(res => {
    //   let wlist = this.res2wlist(res)
    //   this.setData({
    //     wlist: wlist
    //   })
    // })
  },
  res2wlist (res) {
    let wlist = []
    for (let i in res) {
      let course = {}
      course.kcmc = res[i].courseName
      course.skcd = 2
      let date = new Date('2018/01/01' + ' ' + res[i].courseStartTime)
      if (date <= new Date('2018/01/01 10:00')) {
        course.skjc = 1
      } else if (date <= new Date('2018/01/01 11:50')) {
        course.skjc = 3
      } else if (date <= new Date('2018/01/01 16:00')) {
        course.skjc = 5
      } else if (date <= new Date('2018/01/01 17:50')) {
        course.skjc = 7
      } else if (date <= new Date('2018/01/01 19:45')) {
        course.skjc = 9
      }
      switch (res[i].week) {
        case '星期一':
          course.xqj = 1
          break
        case '星期二':
          course.xqj = 2
          break
        case '星期三':
          course.xqj = 3
          break
        case '星期四':
          course.xqj = 4
          break
        case '星期五':
          course.xqj = 5
          break
        case '星期六':
          course.xqj = 6
          break
        case '星期七':
          course.xqj = 7
          break
      }
      wlist.push(course)
    }
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
  height: 100px;
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