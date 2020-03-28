<template>
  <div class="tijiao">
    <div class="wraper">
      <div class="course">
        <van-dropdown-menu class="tijiao-drop" active-color="#00c5bc" >
          <span class="course-icon">
            <van-icon name="notes-o" color="#00c5bc"/>
          </span>
          <van-dropdown-item v-model="classId" :options="courseList" />
        </van-dropdown-menu>
        <div class="line"></div>
      </div>
      <div class="title">
        <span class="title-icon">
          <van-icon name="comment-o" color="#00c5bc"/>
        </span>
          <span>标题：</span>
          <input type="text" class="input" v-model="postTitle">
      </div>
      <div class="content">
           <textarea rows="30" cols="25" placeholder="请输入作品描述" class="input" v-model="postContent"></textarea>
      </div>
      <div class="upload">
        <div class="img-wraper">
          <van-icon  v-if='uploadList' name="clear" class="clear" @click="clearImg"/>
          <div class="uploader-wraper" @click="uploadImg">
            <img v-if='uploadList' :src="uploadList" alt="" srcset="">
            <van-icon v-else name="photograph" />
          </div>
        </div>
      </div>   
    </div>
    
    <van-button color="linear-gradient(to right, #1edcb4, #03c8bb)" size="large" round @click="submit">提交作品</van-button>
  </div>
</template>

<script>
import api from '../../api/index'
import {baseUrl} from '../../utils/const'
export default {
  data () {
    return {
      classId: '',
      postTitle: '',
      postContent: '',
      postType: '',
      topicId: 'form_post_yanxue',
      postFile: '',
      uploadNum: 0,
      uploadList: null,
      showUpload: true,
      courseList: [],
      baseUrl: baseUrl
    }
  },
  methods: {
    submit () {
      let that = this
      mpvue.uploadFile({
        url: 'https://zhsj.bnuz.edu.cn/ComprehensiveSys/student/postProduct', // 仅为示例，非真实的接口地址
        filePath: that.uploadList[0],
        name: 'file',
        formData: {
          classId: that.classId,
          postTitle: that.postTitle,
          postContent: that.postContent,
          postType: that.postType,
          topicId: that.topicId
        },
        success (res) {
          console.log(res, 'fdfd')
        },
        fail (res) {
          console.log(res)
        }
      })
      mpvue.uploadFile({
        url: 'https://zhsj.bnuz.edu.cn/ComprehensiveSys/student/postProduct', // 仅为示例，非真实的接口地址
        filePath: this.uploadList,
        name: 'file',
        formData: {
          classId: this.classId,
          postTitle: this.postTitle,
          postContent: this.postContent,
          postType: this.postType,
          topicId: this.topicId
        }
      })
    },
    // 上传图片
    uploadImg () {
      var that = this
      mpvue.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths
          that.uploadList = tempFilePaths
          that.uploadNum = that.uploadList.length
        }
      })
    },
    // 删除图片
    clearImg (e) {
      this.uploadList = null
    }

  },
  onLoad () {
    api.getMyCourse({keyword: ''}).then((res) => {
      let arr = res.data.data
      this.classId = arr[0].classId
      for (var i = 0; i < 3; i++) {
        let object = {}
        object.text = arr[i].className
        object.value = arr[i].classId
        this.courseList.push(object)
      }
    })
  }
}
</script>

<style lang='scss' scoped>
@import '../../common/styles/mixin.scss';
.tijiao{
  padding:5%;
  padding-top:10%
}
.wraper{
  width: 100%;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  padding:20px;
  box-sizing: border-box;
  .course{
    position: relative;
    .course-icon{
      position: absolute;
      left: 5%;
      transform: translateY(-50%);
      top:50%
    }
  }
  .title{
    display: flex;
    height: 50px;
    align-items: center;
    padding-left: 5%;
    border-bottom:0.5px solid $color-line;
    .title-icon{
      padding-right: 2%;
      display: flex;
    }
  }
  .content{
    padding-left: 5%;
    border-bottom:0.5px solid $color-line;
    padding-top: 10px;
    padding-right: 5%;
    width: 100%;
    box-sizing: border-box;
  }
  .upload{
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
  .input{
    color:$color-small
  }
  .line{
    width:100%;
    height:0.5px;
    background: $color-line;
  }
}
// 上传图片
.img-wraper{
  position: relative;
  .uploader-wraper{
    position: relative;
    width:90px;
    height: 90px;
    background: rgb(247,248,250);
    color: rgb(220,222,224);
    font-size: 30px;
    border-radius: 10px;
    text-align: center;
    line-height: 90px;
    overflow: hidden;
    img{
      width: 100%;
      height:100%
    }
  }
  .clear{
      position: absolute;
      color:red;
      font-size:20px;
      right:0px;
      z-index: 100;
      transform: translateX(50%) translateY(-50%);
  }
}

</style>
<style lang='scss'>
.tijiao-drop{
  .van-popup--top{
    width:90%;
    margin-left:5%;
  }
  .van-overlay{
    width: 90%;
    margin-left:5%;
    background: rgba(0,0,0,0) !important;
  }
  .van-popup--safe{
    box-shadow: 0px 2px 8px rgba(0,0,0,0.3);
  }
  .van-dropdown-menu__item{
    justify-content: flex-start;
    padding-left: 10%;
  }
}
</style>
