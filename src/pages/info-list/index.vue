<template>
  <div class="info-list">
    <van-tabs  animated>
        <van-tab >
            内容 {{ index }}
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>