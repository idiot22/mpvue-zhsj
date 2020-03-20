<template>
  <div class="info-list">
    <van-tabs  animated>
        <van-tab title="通知">
          <div style='height:100%' class="msg-pad">
            <div v-if='infoList.length>0'>
              <infoCard v-for='(item,index) in infoList' :data='item' :key='index'></infoCard>
            </div>
            <van-divider v-if='infoList.length === 0' contentPosition="center">暂无通知</van-divider>
            <van-divider v-else contentPosition="center">我也是有底线的</van-divider>
          </div>
        </van-tab>
        <van-tab title='选课'>
            <div v-if='msgList1.length>0' class="msg-pad">
              <infoCard @clickMsg="clickMsg" v-for='(item,index) in msgList1' :data='item' :key='index'></infoCard>
            </div>
            <van-divider v-if='msgList1.length === 0' contentPosition="center">暂无选课通知</van-divider>
            <van-divider v-else contentPosition="center">我也是有底线的</van-divider>
        </van-tab>
        <van-tab title="考勤">
            <div v-if='msgList2.length>0' class="msg-pad">
              <infoCard @clickMsg="clickMsg" v-for='(item,index) in msgList2' :data='item' :key='index' :type="'msg'"></infoCard>
            </div>
            <van-divider v-if='msgList2.length === 0' contentPosition="center">暂无考勤通知</van-divider>
            <van-divider v-else contentPosition="center">我也是有底线的</van-divider>          
        </van-tab>
        <van-tab title="通知">
            <div v-if='msgList3.length>0' class="msg-pad">
              <infoCard @clickMsg="clickMsg" v-for='(item,index) in msgList3' :data='item' :key='index' :type="'msg'"></infoCard>
            </div>
            <van-divider v-if='msgList3.length === 0' contentPosition="center">暂无评价通知</van-divider>
            <van-divider v-else contentPosition="center">我也是有底线的</van-divider>          
        </van-tab>
    </van-tabs>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import timeShow from '../../components/info-list/time'
import infoCard from '../../components/info-list/info-card'
import {mapState} from 'vuex'
import api from '../../api/index'
import Dialog from '../../../static/vant2/dialog/dialog'
export default {
  components: { timeShow, infoCard },
  data () {
    return {
      weekList: [ { text: '所有周次', value: '' },
        { text: '第一周', value: 1 },
        { text: '第二周', value: 2 },
        { text: '第三周', value: 3 },
        { text: '第四周', value: 4 },
        { text: '第五周', value: 5 },
        { text: '第六周', value: 6 },
        { text: '第七周', value: 7 },
        { text: '第八周', value: 8 },
        { text: '第九周', value: 9 } ],
      week: '',
      timeData: '2018年12月10日',
      active: 0,
      infoList: [],
      msgList: []
    }
  },
  computed: {
    ...mapState(['studentId']),
    msgList1 () {
      return this.msgList.filter((item) => {
        return item.type === 1
      })
    },
    msgList2 () {
      return this.msgList.filter((item) => {
        return item.type === 2
      })
    },
    msgList3 () {
      return this.msgList.filter((item) => {
        return item.type === 3
      })
    }
  },
  methods: {
    clickMsg (data) {
      api.isRead(data.id).then((res) => {
        Dialog.alert({
          title: data.className,
          message: data.content
        }).then(() => {
        // on close
        })
      })
    },
    changeweek (value) {
      let ele = value.mp.detail
      api.getNotices(this.studentId, {week: ele}).then((res) => {
        this.infoList = res.data.data
      })
    }
  },
  onLoad () {
    api.getNotices(this.studentId, {week: this.week}).then((res) => {
      this.infoList = res.data.data
    })
    api.getMessages({type: 1}).then((res) => {
      this.msgList = res.data.data
    })
  }
}
</script>

<style scope lang='scss'>
page{
  background: rgb(251,249,254);
}
.info-list{
  background: rgb(251,249,254)
}
.dropdown{}
.msg-pad{
  padding-top: 50rpx;
}
</style>