<template>
  <div class="info-list">
    <van-tabs  animated>
        <van-tab title="评价">
          <timeShow :data="timeData"></timeShow>
          <infoCard v-for='(item,index) in infoList' :data='item' :key='index'></infoCard>
        </van-tab>
        <van-tab title='选课'>
        </van-tab>
        <van-tab title="考勤">
        </van-tab>
        <van-tab title="通知">
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import timeShow from '../../components/info-list/time'
import infoCard from '../../components/info-list/info-card'
export default {
  components: { timeShow, infoCard },
  data () {
    return {
      timeData: '2018年12月10日',
      active: 0,
      infoList: [
        {
          title: 'dsfs',
          isRead: false,
          issuer: '信院团委',
          time: '2019-09-2',
          content: '的地方放大方法大烦烦烦反对士大夫士大夫发射点十分发达范德萨'
        },
        {
          title: 'dsfs',
          isRead: true,
          issuer: '信院团委',
          time: '2019-09-2',
          content: '的地方放大方法大'
        }
      ]
    }
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
</style>