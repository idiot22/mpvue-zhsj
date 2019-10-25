# zhsj

## 过程



## mpvue小技巧

1.px =>1rpx

到build=>util.js中修改

````
  var px2rpxLoader = {
    loader: 'px2rpx-loader',
    options: {
      baseDpr: 1,
      rpxUnit: 0.5===》改成1
    }
  }
````

## 代码合理性

### css

## 动画

1.小程序接口

````
  <div :animation='animationData'></div>
  data(){
      return{
		animationData:{}
      }
  }
  upAndBulletAni () {
      let animation = wx.createAnimation({  //生成animation对象
        duration: 300,
        timingFunction: 'ease-out'
      })
      this.animation = animation
      this.animation.translateY(-11).step()//添加动画
      this.animation.translateY(-9).step()
      this.animation.translateY(-11).step()
      this.animation.translateY(-11).step()
      this.animationData = this.animation.export()//把动画给相应dom
    }
````



## 问题



### 动画不起作用

不能使用以下形式来key动画

````
animation:rotateani 0.3 infinite;
@keyframes rotateani {
    0%{
      transform: rotate(0deg)
    }
    100%{
       transform: rotate(0deg)
     }
}
````

### **基于mpvue开发微信小程序,vue能用的,用mpvue哪些情况不能用**

不能直接获取dom，而且也不支持属性绑定时用方法，就不能传值