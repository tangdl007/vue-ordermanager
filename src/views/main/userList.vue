<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="address" label="地址">
        <template slot-scope="scope">
          <span  v-show="scope.row.isedit">{{ scope.row.address }}</span>
          <el-input v-model="scope.row.address" v-show="!scope.row.isedit"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="clickDelet(scope)">{{scope.row.isedit?"编辑":"删除"}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- 
      total 总页数
      size-change  每页显示总数量改变
      current-change  当前页面改变
      page-sizes  每页显示条数数组
      page-size 每页显示多少条
      current-page  当前页面
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 消息提示 -->
    <el-button type="text">点我</el-button>

    <!--
       图片上传
      action 上传地址
      on-success 成功回调
      before-upload 失败回调
      data 用于上传参数
     -->
    <el-upload
      class="avatar-uploader" 
      action="https://jsonplaceholder.typicode.com/posts/" 
      :show-file-list="false"
     
      >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { getChinaTime } from "../../utlis/utlis.js";
export default {
  data() {
    return {
      loading:false,
      imageUrl:"",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      currentPage: 4, //当前页面
      total: 100,
      pageSize: 20,
      address: ""
    };
  },
  methods: {
    clickDelet(scope){
      // console.log(scope);

      scope.row.isedit = false;

      this.$bus.$emit("changName",this.currentPage)
      // if(val.row.isedit){
      //   this.tableData[val.$index].isedit = false;
      // }else{
      //   this.tableData[val.$index].isedit = true;
      // }
    },
    handleDelete(val){
      console.log(val);
    },
    handleSelectionChange(val) {
      console.log("多选", val);
      let newArr = val.map(item => item.address);
      this.address = JSON.stringify(newArr);
      console.log("选择的地址字符串数组", this.address);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //成功
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          //失败
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  created() {
    let r = getChinaTime("Wed Jun 26 01:59:49 UTC 2019");
    console.log("获取的时间", r);

    this.tableData.forEach(item=>{
       item.isedit = true;
      }
    )
  }
};
</script>

<style scoped>
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