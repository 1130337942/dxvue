<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="nav-box">
      <ul class="nav">
         <!-- 
            router-link 默认标签相当于a链接标签 取消了a标签的默认事件
            设置 tag 属性 改变 其标签 tag='li' 变成li标签
          -->
        <!-- <router-link to="/home" tag="li">home</router-link> -->
        <!-- event="mouseover" 这个属性事改变路由切换的行为，鼠标移入切换路由 -->
        <!-- 
          exact 不包含根路径激活(就是点击其他同级路由根路径不会被激活) 精确路径(根路径就是 home组件)
          如果不加这个参数 点击/about(跟路径的下一级路径)时 根路径 也会被激活
          因为 /about 包含跟路径
          -->
        <router-link to='/' exact tag="li" >
          <span>home</span>
        </router-link>
        <router-link :to="{path:'/document#aaa'}" tag="li" active-class="only_active">
          <span>document</span>
        </router-link>
        <!-- :to='about' 动态的设置路由 -->
        <router-link :to='about' tag='li' event="mouseover">
          <span>关于我门</span>
        </router-link>
        <router-link :to='{name:"user"}' tag="li" event="mouseover">
          <span>user</span>
        </router-link>
        <router-link :to='{name:"axios"}' tag="li">
          <span>通信(请求)</span>
        </router-link>
      </ul>
    </div>

    <!-- <router-view><router-view/> -->
    <!-- <router-view>
      简写 是预留的一个组件(视图) 在定义 组件的时候不要用这个名字
      在渲染的时候会把上面的路由下的模版替换到这里
    -->
    <!-- 
      在 组件加 class="center" 类名，会匹配对应的每个组件根节点加载类名(可以审查元素查看
    -->
    <!-- 
      name="slider" 给该视图组件定义个名字
      在index.js找到对应的路由配置该视图组件，将对应的模版渲染这个位置
     -->
    <!-- <router-view class="slider" name="slider"/> --> <!--侧边栏 -->
    <!-- <router-view class="center"/> -->

    <!-- 导航切换过渡动效transition -->
    <!-- 运用transtion组件 css 样式写在了下面的style样式里，
    在document.vue 因为用到两个组件 所以每个组件运用一个transition 
    而且在document.vue 运用到锚点 id=aaa，路由# aaa(app.vue)
    跟transition配合 锚点定位好像就不准了（问题？）（学习视屏是把侧边栏去掉了，只留了.center部分） -->
    <!-- mode 模式(transtions的一个属性) 过渡模式有 in-out 合 out-in(这个运用的多些)
     out-in：离开的元素先运动 （设置 name="left" 可以把这个模式去掉）
     -->
     <span>路由元信息meta <br> 当前当航的下标index{{$route.meta.index}}</span>
     <!-- <transition name="left" mode="out-in">  -->
    <transition  :name="transition_names"> 
      <!-- 侧边栏 -->
      <router-view class="slider" name="slider"/> 
    </transition>
    <!-- <transition name="left" mode="out-in"> -->
    <!-- :name="transition_names" 动态设置name参数 -->
    <transition :name="transition_names">
      <router-view class="center"/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        about:'/about', //动态的配置路由
        transition_names:"left"
      }
    },
    watch:{ //watch 是个对象 监控路由信息 当导航发生变化route也会发生变化
      $route(to,from){ //接收两个参数 to:目标 from:离开
        //meta 是路由元信息 在路由配置中(index.js)meta可以配置一些数据，
        // 用在路由信息对象中访问meta中数据：{{$route.meta}}(渲染)
        // console.log(to.meta.index) //目标导航的下标 
        // console.log(from.meta.index) //离开当航的下标
        if(to.meta.index<from.meta.index){
          this.transition_names = "right"
        }else{
           this.transition_names = "left"
        }
      }
    }
  }
</script>

<style>
  /* 使用过渡动效 要设置绝对定位样式(reset.css 里.center)
    这样就是不会出现文档流上下显隐
  */
  /* 进入 */
  .v-enter{
    opacity: 0;
  }
  .v-enter-to{ /*目标位置 */
    opacity: 1;
  }
  .v-enter-active{ /* 运动时间 */
    transition: 1s;
  }
  /* 离开 */
  .v-leave{
    opacity: 1;
  }
  .v-leave-to{
    opacity: 0;
  }
  .v-leave-active{
    transition: 1s;
  }
  /* -----使组件向左运动--- */
  /* v- 是默认的前缀，可以改变你想用的运动方式 
  使用:在transition组件加上name="left" */
  /* 进入   */
  .left-enter{/* 设置起始位置 屏幕左边 */
    transform: translateX(100%); /*距离屏幕100%的位置*/
  }
  .left-enter-to{ /* 目标位置 结束 */
    /* transform: translateX(0);*/ /*默认值(位置)可以不用写*/
  }
  .left-enter-active{ /* 运动时间 动画时间 */
    transition: 1s;
  }
  /* 离开 */
  .left-leave{/* 设置起始位置 屏幕内*/
    /* transform: translateX(0);*/ /*默认值(位置)可以不用写*/
  }
  .left-leave-to{ /* 目标位置 结束 屏幕外面*/
    transform: translateX(-100%); 
  }
  .left-leave-active{ /* 运动时间 动画时间 */
    transition: 1s;
  }
/* ----使用组件向右运动--- */ 
/* 使用name="right" 在transition组件中 */
.right-enter{
  transform: translateX(-100%); /*距离屏幕-100%的位置*/
}  
.right-enter-active{ /* 运动时间 动画时间 */
  transition: 1s;
}
.right-leave-to{
  transform: translateX(100%);
}
.right-leave-active{ /* 运动时间 动画时间 */
  transition: 1s;
}
</style>