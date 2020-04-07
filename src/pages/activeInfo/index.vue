<template>
  <div class="active-info">
    <div class="bg">
      <div class="over"></div>
      <img :src="baseUrl+activeInfo.imageLong" alt="" srcset="">
    </div>
    <div class="content">
      <scroll-view>
        <div class="title">{{activeInfo.activityName}}</div>
        <div class="jianjie">
          {{activeInfo.activityDescription}}
        </div>
        <div class='info-title'>活动信息</div>
        <p>
          <span>
          <van-icon name="clock-o" />&nbsp;时间：
          </span>
          {{activeInfo.startTime+'~'+activeInfo.endTime}}
        </p>
        <p>
          <span>
            <van-icon name="location-o" />&nbsp;地点：
          </span>
          {{activeInfo.activityAddress}}
        </p>
        <p>
          <span>
          <van-icon name="friends-o" />&nbsp;参赛人数：
          </span>
          {{activeInfo.contestantCount}}
        </p>
        <p>
          <span>
            <van-icon name="manager-o" />&nbsp;教练数：
          </span>
          {{activeInfo.coachCount}}
        </p>

        <div class='info-title' style='padding-bottom: 15px;'>相关活动</div>
        <div class="active-wraper" v-for='(item,index) in processList' :key="index">
          <img src="../../../static/images/order/bg.png" alt="" srcset="">
          <div class="left">
            <div>{{item.processDetail}}</div>
            <div class="info">{{item.processType}}</div>
            <van-tag round color='#85e4df'>{{item.ruleDetail}}</van-tag>
          </div>
          <div class="right">
            <van-button color='#85e4df' size="small" @click="showGroup(item.processId)">立即报名</van-button>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import api from '../../api/index'
import {baseUrl} from '../../utils/const'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      baseUrl: baseUrl,
      activeInfo: {},
      processList: []
    }
  },
  computed: {
    ...mapState(['studentId'])
  },
  methods: {
    showGroup (processId) {
      this.$router.push({ path: '../group/main', query: {id: this.studentId, processId: processId} })
    }
  },
  onLoad () {
    let id = this.$route.query.id
    api.getActivyDetail(id).then((res) => {
      this.activeInfo = res.data.activityInfoEntity
      this.processList = res.data.processesList
    })
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.bg{
  width:100%;
  height: 200px;
  background: $color-line;
  position: relative;
  .over{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0px;
    left:0px;
    background: rgba($color: #000000, $alpha: 0.1);
  }
  img{
    width:100%;
    height:100%
  }
}
.content{
  position: relative;
  top:-50px;
  border-radius: 100rpx 100rpx 0rpx 0rpx;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
  background: white;
  .title{
    font-size: 20px;
    color:$main-txt;
    font-weight:800;
    margin-bottom: 10px;
  }
  .jianjie{
    font-size:$text-small;
    color:$color-small;
    background: $bg2-color;
    padding: 10px;
    border-radius: 10px;
  }
  .info-title{
    color: $main-color;
    font-size: $text-medium;
    margin-top: 20px;
    font-weight: 800;
  }
  p{
    font-size: $text-medium;
    border-bottom: 1px $color-line solid;
    padding: 15px 0px;
    color: $color-small;
    span{
      color: $main-txt;
    }
  }
}
.active-wraper{
  display: flex;
  padding:10px 20px;
  border-radius: 10px;
  background: rgb(116,220,209);
  color: white;
  position:relative;
  margin-bottom:20px;
  img{
    width:100%;
    height: 90%;
    position: absolute;
    bottom:0px;
    left:0px;
    opacity: 0.7;
  }
  .left{
    flex: 1;
    color: white;
    font-size: $text-big;
    .info{
      font-size: $text-small;
    }
    div{
      margin-bottom: 2px;
    }
  }
  .right{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>