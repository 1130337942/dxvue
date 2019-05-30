<template>
  <div>
    关于我们
    <hr>
    <div class="anout_text">下面这是about的二级导航</div>
    <ul class="anout_2nav">
      <!-- <router-link>里写a标签 会把 路由直接渲染到a标签上(F12查看元素） -->
      <!-- <router-link exact to="/about" tag="li"><a>study</a></router-link>
      <router-link to="/about/work" tag="li">work</router-link>
      <router-link to="/about/hobby" tag="li">hobby</router-link> -->
      <!--
            to 目标导航 路径是嵌套的 不够灵活修改起来麻烦 
            :to 动态的绑定路由 利用路由的name 这样就不用嵌套写路径了
        -->
      <router-link :to='{name:"about"}' exact tag="li"><a>study</a></router-link>
      <router-link :to="{name:'work'}" tag="li">work</router-link>
      <router-link :to="{name:'hobby'}" tag="li">hobby</router-link>
    </ul>

    <hr>
    <div class="anout_text">这下面是二级导航的内容</div>
    <!-- 
            在index.js 配置好子路由后，要在相对应的路由下写上<router-view>组件
            将上面的路由下的组件内容（study.vue(第一个路由默认/about 更改了路由)、work.vue、hobby.vue）渲染到这个组件位置，
            这样样就和App.vue里的根组件<router-view>形成模版嵌套
         -->
    <router-view class="about_content"></router-view>
  </div>
</template>