<template>
    <div style="width:500px;">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

             <el-form-item label="商品分类">
                <el-select v-model="form.region" placeholder="请选择商品分类">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            
            

            <el-form-item label="商品价格">
                <el-input-number placeholder="请输入内容" v-model="input1" :min="1" :max="10" @change="handleChange">
                   
                </el-input-number>
            </el-form-item>
            
            <el-form-item label="商品图片">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="商品描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">添加商品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { UP_LOAD_IMG } from "../../api/http"
    export default {
        data(){
            return {
                imageUrl:"",
                input1:0,
                form: {
                    name: '',
                    region: '',
                    desc: '',
                    UP_LOAD_IMG:""
                }
            }
        },
        methods:{
            onSubmit(){
                console.log("333");
            },
            handleChange(val){
                console.log(val);
            }
        },
        created(){
            this.UP_LOAD_IMG = UP_LOAD_IMG;
            console.log("UP_LOAD_IMG",this.UP_LOAD_IMG);
        }
    }
</script>

<style lang="less" scoped>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>