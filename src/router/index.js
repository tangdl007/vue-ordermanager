import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue"
Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    // 首页
    {name:"login",
    path:"/",
    component:Login},
    // 主页
    {name:"main",
    path:"/main",
    component:()=>import("../views/Main.vue"),
    children:[{
        path:"/main/index",
        name:"/main/index",
        component:()=>import("../views/main/Index.vue"),
        //自定义数据
        meta:{breadList:["首页"]}
      },

      //账户列表
      {
        path:"/main/userList",
        name:"/main/userList",
        component:()=>import("../views/main/userList.vue"),
        meta:{breadList:["账户管理","账户列表"]}
      },
      //添加账户
      {
        path:"/main/addList",
        name:"/main/addList",
        component:()=>import("../views/main/addList.vue"),
        meta:{breadList:["账户管理","添加账户"]}
      },
      //更新账户
      {
        path:"/main/updateList",
        name:"/main/updateList",
        component:()=>import("../views/main/updateList.vue"),
        meta:{breadList:["账户管理","更新账户"]}
      },
      
      //商品列表
      {
        path:"/main/productList",
        name:"/main/productList",
        component:()=>import("../views/product/productList.vue"),
        meta:{breadList:["商品管理","商品列表"]}
      },
      //添加商品
      {
        path:"/main/addProduct",
        name:"/main/addProduct",
        component:()=>import("../views/product/addProduct.vue"),
        meta:{breadList:["商品管理","添加商品"]}
      },
    ]
  },
  ]
})

// 路由拦截，router钩子函数 检验是否在登陆状态，如果在登陆状态就让他跳转如果不在就不跳转

// router.beforeEach((to,from,next)=>{
//   if(to.path != "/"){
//     // 判断登陆
//     if(to.path == "/main/"){
//       next()
//     }else{
//       next("/")
//     }
//   }else{
//     next()
//   }
// })

/* 
  import { checkToken } from "@/api"
  checkToken(localStorage.Token).then(res=>{
    if(res.data.code == 0){
      next()
    }else{
      next("/")
    }
  })

  除了首页，认何页面都应该使用懒加载的方式
  router.beforeEach((to,from,next)=>{
    //当要跳到home页面时候需要验证token
    if(to.path == "home"){
      if(localStroge.token){
        next()
      }else{
        vue.$prototype.message("");
        setTimeout(()=>{
          next("/user")
        },300)
      }
    };
    next();
  })
  

  用总线程的方式实现vue跨级传值
  Vue.prototype.$bus = new Vue();
  this.$bus.$emit("事件名",传递的参数);
  this.$bus.$on("事件名"，(res)=>{console.log("传递的数据",res)})


  监听$route值的变化
  watch:{
    $route(to){
      this.breadList = to.meta.breadList
    }
  }

  指令和{{}}只能获取自己的属性和方法

  var IP = ""
  axios.defaults.baseUrl = IP;
  export var imgPath = IP + "";
  import { imgPath } from "./http.js"
  this.imgPath = imgPath;
  //指令还是{{}} 只能访问自己的属性和方法  
*/

export default router
