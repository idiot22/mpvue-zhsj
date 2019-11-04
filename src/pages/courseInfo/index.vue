<template>
  <div>
    <div class="bg-wraper">
      <div>
        <p class="course-name">A4纸竞赛</p>
        <p class="grade">适用年纪:4</p>
      </div>
    </div>
    <van-tabs animated sticky>
      <van-tab title="课程简介">
        <div class="wraper">
          <div class="introduce-wraper">
            <p class="price">课程费用：500</p>
            <div class="info-wraper">
              <div class="iconfont icon-xueshimao">适用年级：4</div>
              <div><van-icon name="column" />课程归属:</div>
              <div><van-icon name="manager" />任课教师：</div>
            </div>
          </div>
          <panel :title="'课程简介'">
              <div>
                  <p class="text">本课程发达的撒法发发射点范德萨范德萨打发撒非法上访
                  的打法发范德萨打发士大夫撒旦发生的方法士大夫随风倒
                  士大夫是放大方法大胜多负少
                  </p>
              </div>
          </panel>
          <panel :title="'课程目标'">
              <div>
                  <p class="text">本课程发达的撒法发发射点范德萨范德萨打发撒非法上访
                  的打法发范德萨打发士大夫撒旦发生的方法士大夫随风倒
                  士大夫是放大方法大胜多负少
                  </p>
              </div>
          </panel>
          <panel :title="'课程准备'">
              <div>
                  <p class="text">本课程发达的撒法发发射点范德萨范德萨打发撒非法上访
                  的打法发范德萨打发士大夫撒旦发生的方法士大夫随风倒
                  士大夫是放大方法大胜多负少
                  </p>
              </div>
          </panel>
        </div>
      </van-tab>
      <van-tab title="时间">
        <div class="wraper">
          <panel :title="'报名时间'">
              <div class="bm">
                <p><van-icon name="clock-o" /> 开始：</p>
                <p><van-icon name="underway-o" /> 截止：</p>
                <p><van-icon name="friends-o" /> 人数：999</p>
              </div>
          </panel>
          <panel :title="'上课时间'">
              <div class="bm">
                <p class="iconfont icon-rili"> 开始：</p>
                <p><van-icon name="clock-o" /> 开始：</p>
                <p><van-icon name="clock-o" /> 结束：</p>
              </div>
          </panel>
        </div>
      </van-tab>
      <van-tab title="评价">
        <div>

        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import panel from '../../components/panel'
export default {
  components: {
    panel
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
.bg-wraper{
  width: 100%;
  position: relative;
  display: table;
  height: 145px;
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
      padding-bottom: 5px;
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
</style>