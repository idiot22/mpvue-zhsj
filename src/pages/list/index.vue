<template>
  <div class="list">
    <filter :filterData='filterData'></filter>
    <div class="title-bar">
      <div class="filter-wraper" @click="showFilter">
        <span>筛选</span>
        <i class="iconfont icon--xialajiantou"></i>
      </div>
      <div class="search-wraper">
        <van-search
          :value="value"
          placeholder="请输入搜索关键词"
          :shape="'round'"
          :background="'#f2f2f2'"
          @change="onChange"
          @search="onSearch"
          @focus = "toPageMore">
        </van-search>
      </div>
    </div>
    <div class="content">
      <van-card
          class="card"
          num="最新课程"
          :price="item.price"
          :title="item.title"
          title-class='title-class'
          :thumb="item.courseImg"
          :origin-price="'4000'"
          v-for="(item,index) in  list"
          :key="index"
          >
          <div slot="desc">
            <van-tag plain class='desc-tag'>一年级</van-tag>
          </div>
      </van-card>    
    </div>
  </div>
</template>

<script>
import filter from '../../components/filter'
import {mapMutations} from 'vuex'
export default {
  components: {
    filter
  },
  data () {
    return {
      filterData: [
        {
          title: '年级',
          type: 'radio',
          children: [{
            label: '一年级',
            value: '1'
          },
          {
            label: '二年级',
            value: '2'
          },
          {
            label: '三年级',
            value: '3'
          },
          {
            label: '四年级',
            value: '4'
          },
          {
            label: '五年级',
            value: '5'
          },
          {
            label: '六年级',
            value: '6'
          }
          ]
        },
        {
          type: 'radio',
          title: '类型',
          value: '类型',
          children: [
            {
              label: '研学',
              value: '0'
            },
            {
              label: '实践',
              value: '1'
            },
            {
              label: '兴趣',
              value: '2'
            }
          ]
        },
        {
          type: 'radio',
          title: '星期',
          value: '星期',
          children: [{
            label: '星期一',
            value: '星期一'
          },
          {
            label: '星期二',
            value: '星期二'
          },
          {
            label: '星期三',
            value: '星期三'
          },
          {
            label: '星期四',
            value: '星期四'
          },
          {
            label: '星期五',
            value: '星期五'
          },
          {
            label: '星期六',
            value: '星期六'
          },
          {
            label: '星期日',
            value: '星期日'
          }

          ]
        },
        {
          type: 'radio',
          title: '时间',
          value: '时间',
          children: [{
            label: '08:30-10:00',
            value: '08:30-10:00'
          },
          {
            label: '10:20-11:50',
            value: '10:20-11:50'
          },
          {
            label: '14:30-16:00',
            value: '14:30-16:00'
          },
          {
            label: '16:20-17:50',
            value: '16:20-17:50'
          },
          {
            label: '18:15-19:45',
            value: '18:15-19:45'
          }

          ]
        }
      ],
      list: [
        {
          courseImg: 'http://localhost/zhsj/image/courses/cooker.jpg',
          title: '小小美食家',
          flag: '进行中',
          day: '周六',
          time: '15:00-17:00',
          price: '3500'
        },
        {
          courseImg: 'http://localhost/zhsj/image/courses/活动02.jpg',
          title: '折纸课程',
          flag: '一天后',
          day: '周日',
          time: '15:00-17:00',
          price: '5500'
        },
        {
          courseImg: 'http://localhost/zhsj/image/courses/活动03.jpg',
          title: '航模制作',
          flag: '六天后',
          day: '周五',
          time: '19:00-21:00',
          price: '6000'

        }
      ]
    }
  },
  methods: {
    ...mapMutations({setfilter: 'SETISFILTER'}),
    showFilter () {
      this.setfilter(true)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.list{
  width: 100%;
  height: 100%;
  .filter{
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
  }
  .title-bar{
    display: flex;
    .filter-wraper{
      background: #f2f2f2;
      width:60px;
      font-size:$text-medium;
      display: flex;
      padding-left: 15px;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      color: $color-small;
    }
    .search-wraper{
      flex: 1
    }
  }
  .content{
    padding-top: 20px;
  }
}

</style>