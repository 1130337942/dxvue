<template>
    <div>我是通信
        <p class="axios_text">发送请求</p>
        <hr>
        <div class="userlist">
            <!-- <router-link :to="'/axios/'+item.id" v-for="(item,index) in uList" :key="index">{{item.userName}}</router-link> -->
            <!-- query 查询字符串 添加默认的查询字符串（我的关注） -->
            <router-link :to="{path:'/axios/'+item.id,query:{info:'attention'}}" v-for="(item,index) in uList" :key="index">{{item.userName}}</router-link>
        </div>
        <!-- 判断uInfo里面有没有值有值显示，没有值隐藏 -->
        <div class="user-info" v-if="uInfo.id">
            <p>姓名：{{uInfo.userName}}</p>
            <p>性别：{{uInfo.sex}}</p>
            <p>爱好：{{uInfo.hobby}}</p>
        </div>
        <hr>
        <div v-if="uInfo.is_guan_fen">
            <!-- exact 唯一 -->
            <!-- <router-link exact to="/axios/1?info=attention">我的关注</router-link>
            <router-link exact to="/axios/1?info=share">我的分享</router-link>
            因为是只需要添加查询字符串只需要写 ?后面的，前面路径为空
            //第一种写法
            <router-link exact to="?info=attention">我的关注</router-link>
            <router-link exact to="?info=share">我的分享</router-link>
             -->
            <!-- 第二种写法，动态绑定:to 对象形式 path是相对于当前路径 所以为空
            多个参数可以query:{info:'attention',a:1}-->
            <router-link exact :to="{path:'',query:{info:'attention'}}">我的关注</router-link>
            <router-link exact :to="{path:'',query:{info:'share'}}">我的分享</router-link>
            <div class="is_guan_fen">
                <div>{{uInfo.is_guan_fen}}</div>
                <div>{{$route.query}}</div>
            </div>
        </div>
        <i>这个是根据user模块用axios(vue的请求方法)写的</i>
    </div>
</template>
<script>
    /* axios npm安装 npm install axios */
    //引入axios必须要在组件里使用，不能在根组件引用(index.js)
    import axios from 'axios'
    export default {
        data(){
            return{
                uList:[],
                uInfo:{}
            }
        },
        created(){   
            var that = this
            // console.log(this)
            this.getAxiosData()
            console.log(this.$route);
            
            // that.$router.push({path: '/axios/'+that.one+'?info=attention'});
           
            
           
        },
        watch:{
            $route(){
                //  console.log(this)
                 this.getAxiosData()
            }
            // getAxiosData()
        },
        methods:{
            getAxiosData(){
                axios.get('https://www.easy-mock.com/mock/5bd19785532cbd205ac65148/vue_user')
                .then((res)=>{
                    // console.log(res)
                    //渲染用户列表
                    this.uList = res.data.data;

                    // let one = this.uList[0].id
                    // console.log(this.$route)
                    let uid = this.$route.params.userId;//userId 是index.js路由定义的

                    if(uid){
                        this.uInfo = this.uList.filter((item)=>{
                            return item.id == uid//符合这一项过滤出去
                        })[0]//是数组形式
                        // console.log(this.uInfo)

                    }
                    // console.log(this.$route.query)
                        let is_guan_fen = this.$route.query.info;
                        // console.log(is_guan_fen)
                        if(is_guan_fen == 'attention'){//关注
                            this.uInfo.is_guan_fen = this.uInfo.attention
                        }else{
                            this.uInfo.is_guan_fen = this.uInfo.share
                        }
                   
                }).catch((error)=>{
                    // console.log(error)
                    alert('请刷新网络')
                })
            }
        }
    }


     // ,{
                    //向后端传入数据的方式(get请求时)
                    //    params:{
                    //        a:'aaaa'
                    //    }
                    //向后端传入数据的方式(post请求时)
                    // {
                    //   a:'aaaa'
                    //  }
                // }
                //支持promise函数
</script>
