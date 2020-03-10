<template>
  <div id='overallCommend'>
      <switchBar :data='tabData' @changeTab="changeTab"></switchBar>
      <div id='content'>
        <!--综合评价-->
        <div id='commend'>
            <div class="title-wraper">
                <div>----综合评价----</div>
                <div>第7周</div>
            </div>
            <commendCard :data='responList'></commendCard>
        </div>
        <!--/综合评价-->
      </div>
  </div>
</template>

<script>
import switchBar from '../../components/overallCommend/switchBar'
import commendCard from '../../components/overallCommend/commendCard'
export default {
  components: { switchBar, commendCard },
  data () {
    return {
      tabData: [ '综合表现', '家庭评价', '孩子自评' ],
      responList: {
        logoPath: '/static/images/overallcommend/group.png',
        title: '责任担当',
        subtitle: [
          { txt: '学校评价',
            msgs: ['很有担当', 'hj哼又单独']},
          { txt: '学校评价',
            msgs: ['很有担当', 'hj哼又单独']},
          { txt: '学校评价',
            msgs: ['很有担当', 'hj哼又单独']}
        ]
      }
    }
  },
  methods: {
    changeTab (i) {
      console.log('ddd')
    }
  }
}
</script>

<style lang='scss'>
@import '../../common/styles/mixin.scss';
page{
  background: rgb(251,249,254);
}
#content{
    padding: 120rpx 20px;
}
#commend{
    // 综合评价
    .title-wraper{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        background:rgba(41,240,150,0.1);
        color:#55c07c;
        border-radius:15px 0px;
        text-align: center;
        padding: 10px 0px;
    }
    // 综合评价
}

</style>