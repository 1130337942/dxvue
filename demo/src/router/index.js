import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)


//@是src的目录的。在webpack.base.conf.js 有配置
import home from '@/components/home'
import about from '@/components/about'
import document from '@/components/document'
import Nofund from '@/components/404'
import user from '@/components/user'
import axios from '@/components/axios'

// 导入二级导航的文件 views 是自建的文件夹
import study from '@/views/study'
import work from '@/views/work'
import hobby from '@/views/hobby'


//导入slider侧边栏
import slider from '@/views/slider'

//配置路由信息 且 得到一个路由的实例对象
let router = new VueRouter({
  mode: 'history', // 默认路由是hash模式(就是带有/#/符号)，history是 / 符号模式
  linkActiveClass: 'is_active', //配置router-link组件导航链接类名
  //scrollBehavior()这个方法不是刷新浏览器触发，而是切换路由导航或浏览器前进后退触发
  scrollBehavior(to,from,savePosition){ 
    // console.log(to)// 进入的目标路由对象(要去向哪里)(当前所在的路由)
    // console.log(from)// 离开的路由对象(从哪里来)(从上个路由离开的)
    // console.log(savePosition)//记录滚动条的坐标(位置)，只有点击浏览器前进后退按钮才触发
    
    /*
    //vue当前版本已经有记录滚动条的位置的功能了
    if(savePosition){ //前进后退记录滚动条的位置
      return savePosition
    }else{
      return {x:0,y:0}
    }
    */

    // 根据hash值(带有#号的路径<路由>)来定位元素的位置
    /*
    在App.vue文件/documend路由后设置了hash值
    在document.vue文件设置了id为hash值的元素(相当于锚点定位)
    */
    if(to.hash){
      return {
        //selector 选择器
        selector:to.hash
      }
    }
  },
  routes: [{
      path: '/', //将根路径指向home（下面的home路由就没什么用了）
      meta:{
        index:0
      },
      component: home  //渲染组件 home.vue
    },
    // {
    //     path:'/home',
    //     name:'Home',// 给当前路由起个名字 指向这个路由
    //     component: home,
    //     alias:'/index' //别名 当前路由的别名（可以手写路径跳转该组件，但是路由home不会被激活(没有背景颜色）
    // },
    {
      path: "/about", // 一个路径对应一个组件 /是首页 /about是首页下一级路径
      // name:'about', // 如果有默认的子路由 这里name参数 就不能写在这里 要写到子路由里
      component: about,
      children: [{ // children:是当前路由的子路由
        path: '', // 默认的子路由 相当于 /about
        meta:{ //如果有默认的子路由 要配置在默认的子路由中，否则找不到
          index:2
        },
        name: 'about',
        component: study, //渲染study.vue的组件内容 路由默认/about
      }, {
        path: 'work', // path路径不能写/了,/是相对于跟路径,直接写子路由路径,相对于about
        name: 'work',
        component: work,
      }, {
        // 需求：使浏览器的路径不是嵌套方式显示 相对于根路径显示
        //解决：path:'/hobby' 这种写法 浏览器渲染成/hobby
        // 这种配置会使父级导航不会被激活，背景颜色不会亮
        path: '/hobby', // path:'hobby'这种写法 浏览器路径渲染成/about/hobby
        name: 'hobby',
        component: hobby
      }]
    }, {
      path: '/document',
      meta:{
        index:1
      },
      name: 'Document', // 给当前路由起个名字 指向这个路由
      components: { // 因为是多视图所以要用 components:{}
        default: document, // default 默认把document组件渲染到App.vue没有起名字的视图里
        //slider(是在对应的App.vue视图(组件)定义的name的名字):slider(导入slider模版import定义的的名字)
        slider: slider
      }
    }, {
      /*因为当前组件(页面)是/user 和 /user嵌套路径，所以要配置路径
        /:userId?因为动态渲染，所以不能写死的值 userId 是任何变量都可以取
        因为加了 ?(正则)代表是可以匹配也可以不匹配，路由可嵌套，也可以不嵌套
        path:'/user/:userId?'一个参数 配置后变成 /user /user/1 /user/2 /user/3 (userId 指的就是1,2,3)
        path:'/user/:tip?/:userId?'是多个参数 /user /user/vip/1 /user/vip/2 /user/common/3
        userId动态接收路径参数,在user.vue created()函数里 打印this.$route.params
      */
      //  path:'/user/:userId?' 一个参数
      path:'/user/:tip?/:userId?', // 多个参数
      meta:{
        index:3
      },
      name:"user",
      component:user
    },{
      path:'/axios/:userId?',
      meta:{
        index:4
      },
      name:'axios',
      component:axios
      
    },{
      path: '*', // *指所有类型的路径（没有定义的路径
      // component:Nofund //渲染了404.vue的组件

      // 路由 重定向
      /* 第一种写法 字符串形式*/
      // redirect:'/home'//重定向到/home的路径

      /* 第二种写法 对象的形式 */
      // redirect:{path:'/home'}

      /* 第三种写法 对象形式，key值是name*/
      // redirect:{name:'About'} //ke值事name 引用路由的名字

      /* 第四种 动态的设置重定向的目标(参数to) 对应的是函数形式*/
      redirect: (to) => { //箭头函数es6写法
        // to 目标路由对象，就是访问的路径的路由信息
        // console.log(to)
        if (to.path === '/123') {
          return '/home'
        } else if (to.path === '/asd') {
          return {
            path: '/document'
          } //对象形式
        } else {
          return {
            name: 'About'
          } //对象形式 key值name
        }
        //return '/home' //在写函数形式时一定要写return
      }
    }
  ]
})
/* 要把router实例 暴露出去 */
export default router;
// import home from '@/components/home' //@是src的目录的。在webpack.base.conf.js 有配置
// //配置home.vue（新建）组件路由 , 
// //var router 得到 router 的新实例，要注入到根实例中 new vue里
// var router = new VueRouter({
//               routes:[{
//                 path:'/' ,//根目录
//                 component:home, //渲染home 组件 component 合下面的 new vue components 的不一样
//               }]
//             })