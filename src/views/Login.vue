<template>
    <div class="loginBox">
        <div class="centerBox">
            <el-input placeholder="请输入账号" v-model="acc" clearable style="margin-top:30px;"></el-input>
            <el-input placeholder="请输入密码" v-model="pwd" show-password style="margin-top:20px;"></el-input>
            <el-button type="primary" style="width:100%;margin-top:30px;" @click="login">登陆</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                acc:"",
                pwd:""
            }
        },
        methods:{
            login(){
                this.$router.push("/main/index")
            }
        }
    }
</script>

<style lang="less" scoped>
    .loginBox{
        width: 100%;
        height: 100%;
        background-color: #545C64;
        display: flex;
        justify-content: center;
        align-items: center;
        .centerBox{
            padding: 10px;
            width: 400px;
            height: 250px;
            background-color: #fff;
            border-radius: 15px;
        }
    }
</style>