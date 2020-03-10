<template>
  <div id='switch-bar'>
    <div class='tabs-wrapper'>
        <div 
            class="tab"
            v-for="(item,index) in data" 
            :key="index" 
            @click="changeTab(index)"
            :class="activeTab === index ? 'tab-active' :''">
            {{item}}
        </div>
    </div>       
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    changeTab (index) {
      this.activeTab = index
      this.$emit('changeTab', index)
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../../common/styles/mixin.scss";
/*tab样式*/
.tabs-wrapper{
  box-sizing:border-box;
  position: fixed;
  top:0px;
  display: flex;
  justify-content: space-around;
  font-weight:500;
  color:$main-txt;
  font-size:14px;
  width:100%;
  height:40px;
  padding: 5px 0px; 
  background: white;
  box-shadow:0px 2px 25px rgba(0, 206, 144, 0.1);
  z-index:100;
}
.txt{
    padding:4px 5px;
}
.tab{
    padding: 5px;
}
.tab-active{
  border-radius:5px;
  background:linear-gradient(to right,#07dbd1, #03e779);
  color:white;
  box-shadow:2px 4px 10px rgba(0,0,0,0.1);
}
</style>