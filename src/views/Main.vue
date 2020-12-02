<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="currentHash"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <el-menu-item index="/main/index">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>账户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/main/userList">账户列表</el-menu-item>
            <el-menu-item index="/main/addList">添加账户</el-menu-item>
            <el-menu-item index="/main/updateList">更新账户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/main/productList">商品列表</el-menu-item>
            <el-menu-item index="/main/addProduct">添加商品</el-menu-item>
            <el-menu-item index="/main/updateList">更新账户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>

    </el-aside>
    <el-container>
      <el-header style="display:flex;align-items:center;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      breadList:[],
      currentHash:"2",
      list: [
        { url: "/main/index", name: "导航一", icon: "el-icon-menu" },
        { url: "/main/index", name: "导航二", icon: "el-icon-menu" },
        { url: "/main/index", name: "导航三", icon: "el-icon-menu" },
        {
          url: "/main/index1",
          name: "导航四",
          icon: "el-icon-menu",
          children: [
            { url: "1-1", name: "选项1" },
            { url: "1-2", name: "选项7" },
            { url: "1-3", name: "选项1" }
          ]
        },
        {
          url: "/main/index2",
          name: "导航五",
          icon: "el-icon-menu",
          children: [
            { url: "2-1", name: "选项1" },
            { url: "2-2", name: "选项8" },
            { url: "2-3", name: "选项1" }
          ]
        },
        {
          url: "/main/index3",
          name: "导航六",
          icon: "el-icon-menu",
          children: [
            { url: "3-1", name: "选项1" },
            { url: "3-2", name: "选项9" },
            { url: "3-3", name: "选项1" }
          ]
        }
      ]
    };
  },
  created(){
    console.log("110",this.$route.path);
    this.currentHash = this.$route.path;

    //接收bus中的值
    this.$bus.$on("changName",(res)=>{
      console.log("接收bus中的值",res);
    })

    /* 
      Vue.prototype.$bus = new Vue()

      this.$bus.$emit("事件名"，传递的参数)

      this.$bus.$on("事件名"，()=>{
        接收传递的参数
      })
    */

    this.breadList = this.$route.meta.breadList;
  },
  watch:{
    //两个参数 to ，from  to去哪里  from 从哪里来
    $route(to){
      this.breadList = to.meta.breadList;
    }
  }
};
</script>

<style lang="less" scoped>
@base: #545c64;
.el-menu {
  border-right: none;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
}

.el-aside {
  background-color: @base;
}

.el-main {
  background-color: #e9eef3;
}
</style>