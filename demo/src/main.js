
/* eslint-disable */
import Vue from 'vue'
/* 引入根组件（App.vue）*/
import App from './App'
// @是src的目录的。在webpack.base.conf.js 有配置
import router from '@/router'// 引入router文件下的index.js（自动找到index.js）

/* 
引入css文件，没有加后缀名是 因为 在build/webpack.base.conf.js 中
增加了 extensions: ['.js', '.vue', '.json', '.css'], css的配置
配置完后 要重启服务器 
*/
import '@/assets/css/app'

Vue.config.productionTip = false
/* 启动vue项目 */
/* eslint-disable no-new */ /* 忽略下面检查 */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
  
})

// new Vue({
//   el: '#app', /* 挂载点 */
//   router, /* router:router (变量名合属性名一样时 不用写key:value 形式。可以简写 router) */
//   components: { App }, /* 注册根组件 */
//   template: '<App/>' /* 使用模版 根组件(标签的形式) */
// })


// -------------------------------------------
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
