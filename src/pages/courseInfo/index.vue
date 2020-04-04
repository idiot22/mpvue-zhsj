<template>
  <div>
    <div class="bg-wraper">
      <img :src="baseUrl +data.courseImgUrl" alt="">
      <div style="position:absolute;top: 30px;">
        <p class="course-name">{{data.className}}</p>
        <p class="grade">适用年纪:{{data.fitGradeId}}</p>
      </div>
    </div>
        <div class="wraper">
          <div class="panel2">
              <div class="title">课程信息</div>
              <div class="content">
                <p style="margin-bottom:10px">
                  <van-icon name="gold-coin-o" class="iconfont"/>
                   支付时间：{{data.payStartTime+'~'+data.payEndTime}}
                </p>
                <p style="margin-bottom:10px"> 
                  <van-icon name="calender-o" class="iconfont"/>
                  开班时间：{{data.otherTimeDto[0].courseStartDate+'~'+data.otherTimeDto[0].courseEndDate}}
                </p>
                <p>
                  <van-icon name="clock-o" class="iconfont"/> 
                  上课时间：{{data.otherTimeDto[0].courseStartTime+'~'+data.otherTimeDto[0].courseEndTime}}
                </p>
              </div>
          </div>
          <div class="panel2">
              <div class="title">课程任务</div>
              <div class="content">
                <p>{{data.courseMission}}</p>
              </div>
          </div>
          <div class="panel2">
              <div class="title">课程目标</div>
              <div class="content">
                <p>{{data.courseTarget}}</p>
              </div>
          </div>
          <div class="panel2">
              <div class="title">课程描述</div>
              <div class="content">
                <p>{{courseExplanation}}</p>
              </div>
          </div>
          <div class="panel2">
              <div class="title">课程准备</div>
              <div class="content" style="padding-bottom: 60px;">
                <p>{{coursePrepare}}</p>
              </div>
          </div>
          <van-submit-bar
            :price="data.coursePrice"
            button-text="创建订单"
            @submit="onSubmit"
          />
        </div>
  </div>
</template>

<script>
import panel from '../../components/panel'
import { baseUrl } from '../../utils/const'
export default {
  props: {
    data: {
      type: Object
    }
  },
  components: {
    panel
  },
  data () {
    return {
      baseUrl: baseUrl
    }
  },
  computed: {
    coursePrepare () {
      return this.data.coursePrepare ? this.data.coursePrepare : '无'
    },
    courseExplanation () {
      return this.data.courseExplanation ? this.data.courseExplanation : '无'
    }
  },
  methods: {
    onSubmit () {
      console.log('创建订单')
    }
  }
}
</script>
<style lang="scss">
page {
  background-color:#fbf9fe;
}
</style>
<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
//bg
.wraper{
  height: 300px;
}
.bg-wraper{
  width: 100%;
  position: relative;
  display: table;
  height: 145px;
  img{
    width:100%;
    height:100%;
  }
  &::before{
    position: absolute;
    top:0px;
    left:0px;
    content: '';
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,0.2)
  }
  div{
    position: relative;
    z-index: 2;
    display: table-cell;
    vertical-align:middle;
    color: white;
    padding: 20px;
    .course-name{
      font-weight: 800;
      padding-bottom: 5px;
      font-size: $text-large;
    }
  }
}

//课程简介
.wraper{
  padding: 2.5%;
}
.introduce-wraper{
  padding:2.5%;
  background: white;
  width: 100%;
  box-sizing: border-box;
  .price{
    color: $yellow-color;
    font-weight:bold;
    font-size:18px;
    margin-bottom: 10px;
  }
  .info-wraper{
    border: #adadb0 solid 1px;
    color: $color-small;
    padding: 15px;
    font-size:$text-medium;
    div{
      margin: 5px 
    }
  }
}
.text{
  text-indent: 28px;
  font-size: $text-medium;
  color: $color-small;
  line-height: 25px
}
.bm{
  font-size: $text-medium;
  color: $color-small;
  line-height: 25px
}
//panel
.panel2{
  width: 100%;
  padding: 10px;
  background: white;box-sizing: border-box;
  color: $color-small;
  font-size: $text-small;
  .title{
    font-weight: bold;
    font-size: 15px;
    color: $main-color;
    padding-bottom: 10px;
    border-bottom:#E0E3DA 1px solid;
    box-sizing: border-box;
  }
  .content{
    padding-top:10px; 
    p{
      display: flex;
      align-items: center;
    }
  }
}
</style>