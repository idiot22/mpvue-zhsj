<template>
  <div class="report">
    <switchBar :data='tabData' @changeTab="changeTab"></switchBar>
    <div class="online-wraper" v-if="activeTab === 0">
        <div class="title-wraper">
          <picker  @change="bindDateChange1" :value="suyangIndex" :range="suyangList" :range-key="'subcurrencyName'">
            <div>----选择素养----</div>
            <div>{{suyangList[suyangIndex].subcurrencyName}}</div>
          </picker>
        </div>
        <div class="rate-wraper">
          <div class="rate">
            <span>评分：</span>
            <van-rate :value="rate" @change="changeRate" />
          </div>
          <div class="input">
            <div class="wraper">
              <textarea placeholder='请输入申报内容' v-model="content"></textarea>
            </div>
          </div>
        </div>
        <div class="btn-wraper">
          <van-button round type="primary" size="large" color='#00c5bc' @click="submitReport">提交申报</van-button>
        </div>
    </div>
    <div class="history-wraper" v-if="activeTab === 1">
        <van-tabs :active="activeHistory">
        <van-tab :title="'第'+item+'周'" v-for="item in weeks" :key='item'>
          <van-divider contentPosition="center">暂无申报记录</van-divider>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import switchBar from '../../components/overallCommend/switchBar'
import api from '../../api/index'
export default{
  components: {switchBar},
  data () {
    return {
      suyangIndex: 0,
      tabData: [ '在线申报', '历史申报' ],
      activeTab: 0,
      activeHistory: 0,
      rate: 0,
      weeks: [7, 6, 5, 4, 3, 2, 1],
      suyangList: [],
      content: ''
    }
  },
  methods: {
    changeTab (e) {
      this.activeTab = e
    },
    changeRate (e) {
      this.rate = e.mp.detail
    },
    bindDateChange1 (e) {
      this.suyangIndex = e.mp.detail.value
    },
    submitReport () {
      let params = {
        classId: '',
        content: this.content,
        contentId: -1,
        currencyId: this.suyangList[this.suyangIndex].currencyId,
        score: this.rate,
        subcurrencyId: this.suyangList[this.suyangIndex].subcurrencyId,
        yn: 1
      }
      api.report(params).then((res) => {
        console.log(res)
        if (!res) {
          mpvue.showToast({
            title: '提交失败',
            icon: 'none'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  onLoad () {
    api.initCurrencyType().then((res) => {
      this.suyangList = res.data.data
    })
  }

}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.online-wraper{
  padding-top: 60px;
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
    .rate-wraper{
      margin: 20px 20px;
      background: white;
      border-radius: 10px;
      padding: 20px;
      .rate{
        color: $color-small;
        font-size:$text-medium;
        display: flex;
        align-items: center;
      }
      .input{
        background:rgb(247,248,250);
        border-radius: 10px;
        padding: 10px;
        margin-top: 20px;
        font-size: $text-medium;
        color: $color-small;
        .wraper{
          width: 100%;
          textarea{
            width:100%
          }
        }
      }
    }
    .btn-wraper{
      padding: 0px 20px;
      text-align: center;
    }
}
.history-wraper{
  padding-top: 40px
}
</style>