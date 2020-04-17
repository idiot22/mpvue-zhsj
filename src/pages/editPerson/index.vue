<template>
  <div class="personInfo">
    <van-cell-group>
      <van-field
        v-model="name"
        label="姓名"
        left-icon="user-o"
        placeholder="显示图标"
      />
      <van-field
        v-model="sex"
        label="性别"
        left-icon="like-o"
        placeholder="显示图标"
      />
      <van-field
        v-model="birthday"
        label="生日"
        left-icon="birthday-cake-o"
        placeholder="birthday"
      />
      <van-field
        v-model="address"
        label="地址"
        left-icon="location-o"
        placeholder="address"
      />
      <van-field
        v-model="familyNumber"
        label="家长电话"
        left-icon="phone-o"
        placeholder="familyNumber"
      />
      <van-field
        v-model="nation"
        label="国家"
        left-icon="location-o"
        placeholder="nation"
      />
      <van-field
        v-model="idcard"
        label="身份证"
        left-icon="credit-pay"
        placeholder="idcard"
      />
      <van-field
        v-model="grade"
        label="年级"
        left-icon="star-o"
        placeholder="grade"
      />
    </van-cell-group>
  </div>
</template>

<script>
import api from '../../api/index'
export default {
  data () {
    return {
      name: 'X112',
      sex: '男',
      birthday: '1997-09-25',
      address: '',
      familyNumber: '',
      nation: '',
      idcard: '',
      grade: 4
    }
  },
  methods: {},
  onLoad () {
    api.getUserInfo().then((res) => {
      this.userInfo = res.data
      console.log(this.userInfo)
    })
  }
}
</script>

<style lang='scss'>
@import '../../common/styles/mixin.scss';

</style>