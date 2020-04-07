<template>
  <div class="report">
    <switchBar :data='tabData' @changeTab="changeTab"></switchBar>
  </div>
</template>

<script>
import switchBar from '../../components/overallCommend/switchBar'
export default{
  components: {switchBar},
  data () {
    return {
      tabData: [ '在线申报', '历史申报' ]
    }
  },
  methods: {
  },
  onLoad () {
  }

}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';

</style>