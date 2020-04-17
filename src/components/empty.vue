<template>
  <div class="empty">
      <div class="wraper">
          <img src="../../static/images/bg/empty.png" alt="" srcset="">
          <p>暂无好友</p>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
@import "../common/styles/mixin.scss";
.empty{
    padding-top: 50px;
    .wraper{
        img{
            width: 200px;
            height: 200px;
        }
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-content: center;
        align-items: center;
        color:$color-shallow
    }
}
</style>