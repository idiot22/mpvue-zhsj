<template>
  <div>
    <vue-tab-bar></vue-tab-bar>
  </div>
</template>

<script>
import vueTabBar from '@/components/vueTabBar.vue'

export default {
  components: {
    vueTabBar
  },

  data () {
    return {
    }
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
