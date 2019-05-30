<template>
  <div>我是user
      <div class="userlist">
          <!-- 
              1. :to="'/user/'+item.id" 必须要在App.vue路由里配置对应的path路径，不然渲染不出来
              2. 使用v-for必须是(item,index)两个参数 新版本 还要加 :key='index' 使列表唯一
           -->
          <!-- <router-link  :to="'/user/'+item.id" v-for="(item,index) in userlist" :key='index'>{{item.userName}}</router-link> -->
          <!-- 
              动态路径参数可以写多个 上面一条是一个参数 
              :to里路由编译后是浏览器的路径(要用英文)
           -->
          <router-link  :to="'/user/'+ item.tip +'/'+ item.id" v-for="(item,index) in userlist" :key='index'>{{item.userName}}</router-link>
      </div>
      <hr>
      <!-- 
        v-if="userInfo.userName" 
        判断userInfo里是否有key值，如果有就显示，如果没有就隐藏
        (因为没有数据(id)userInfo就是空对象，所有就拿不到key值) -->
      <div class="user-info" v-if="userInfo.userName">
        <p>姓名：{{userInfo.userName}}</p>
        <p>性别：{{userInfo.sex}}</p>
        <p>爱好：{{userInfo.hobby}}</p>
      </div>
      <hr>
      <div class="user_list">
        <router-link to="/user/vip/1">我的关注</router-link>
        <router-link to="/user/vip/1">我的分享</router-link>
      </div>
  </div>
</template>
<script>
  let data = [{
    id: 1,
    tip:'vip',
    userName: "leo1",
    sex: '男',
    hobby: "唱歌"
  },{
    id: 2,
    tip:'vip',
    userName: "leo2",
    sex: '女',
    hobby: "跳舞"
  },{
    id: 3,
    tip:'common',
    userName: "leo3",
    sex: '女',
    hobby: "代码"
  }]
  export default {
      // 组件 data() 是个函数 return 出来是一个唯一的对象
      data(){
          return {
              userlist:data,
              userInfo:{}/*要先创造一条空的对象，等拿到数据了，在放到这个空对象里
                          渲染到div为user-info里*/
          }
      },
      /*created() 渲染这个组件会调用一次这个生命周期函数
         复用这个组件，这个函数不会再次调用了
         地址(路由)一旦发生变化，$route会重新生成一个路由对象
       */
      //created()钩子函数，在实例创建完成之后模版编译html之前调用函数(只执行一次)
      // 拿到用户id可以在这里发ajax请求 data 数据  
      created(){
        // console.log(this._data)//_data 是值data()里的数据
        // $router 是router(指main.js的根实例路由)的实例对象
        // $route 是当前激活的路由信息对象，每个组件都会有 
        // console.log(this.$router) 
        // console.log(this.$route) //this.$route 打印后 是路由信息对象
        // console.log(this.$route.params)
        /*动态路径的参数是放在this.$route.params里 
        key值就是在index.js配置对应路由的时候设置的参数(userId)
        
        query 查询字符串，对应当前路由的路径
        */

        this.getData()
        
      },
      // watch 是个对象 监听 
      /* 路径发生变化，$route会重新赋值，监控了这个属性，会执行这个函数*/
      watch:{
        //路由切换(路径发生变化肯定能得到 路由信息对象(this.$route) )
        //监控$route，如果发生变化，那就可以拿到用户id了
        $route(){
          // console.log(this)
          // console.log(this.$route.params.userId)
          this.getData()
        }
      },
      // methods 定义方法和事件方法 (只要调用就会执行) 是个对象
      methods:{
        //定义方法。在钩子函数调用
        getData(){
          // this.$route.params 动态路径参(在index.js user路由设置)数都在params对象里
          //拿到用户id，跟数据做匹配(向后端发请求,得到数据,填充userInfo)
          let id = this.$route.params.userId;
          // console.log(id)
          //要判断id是否存在，因为点击其他导航(路由)是获取不到id的，所以会报错
          //获取到用户id就显示，获取不到就不显示用户信息了
          if(id){
            //因为没有后端，所以就过滤 userlist 的数据,匹配上就渲染到页面
            // filter() 是过滤的方法。这里是用的es6的过滤方法 item是循环userlist的每一项
            this.userInfo = this.userlist.filter((item)=>{
                return item.id == id
            })[0]
            // console.log(this.userInfo)//过滤后是个数组类型，取索引值0就是过滤条件后的数据
          }else{
            //获取不到用户信息就将this.userInfo为空的对象(data()渲染数据的地方)
            this.userInfo = {}
          }
        }
      }
  }
</script>

