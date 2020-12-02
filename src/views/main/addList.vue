<template>
    <div>
        <el-table :data="list" v-loading="showLoading">
            <!-- 表格扩展数据展示 -->
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ scope.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ scope.row.goodDesc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="name"></el-table-column>
            <el-table-column label="商品类型" prop="category"></el-table-column>
            <el-table-column label="价格" prop="price"></el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" style="width:50px;height:50px;">
                </template>
            </el-table-column>
            <el-table-column label="商品描述" prop="goodDesc"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="warning" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="remove(scope.row.name)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 模态框 -->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <span>我的商品是{{this.editObi.name}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                list:[{name:"虾饺",category:"小吃",price:"100",img:require("../../assets/imgs/cuision.jpg"),goodDesc:"这个商品非常好，吃了会生仙"},
                        {name:"小笼包",category:"小吃",price:"100",img:require("../../assets/imgs/cuision.jpg"),goodDesc:"这个商品非常好，吃了会生仙"},
                        {name:"曹氏鸭脖",category:"小吃",price:"100",img:require("../../assets/imgs/cuision.jpg"),goodDesc:"这个商品非常好，吃了会生仙"},
                        {name:"冒菜",category:"小吃",price:"100",img:require("../../assets/imgs/cuision.jpg"),goodDesc:"这个商品非常好，吃了会生仙"},
                        {name:"炒饭",category:"小吃",price:"100",img:require("../../assets/imgs/cuision.jpg"),goodDesc:"这个商品非常好，吃了会生仙"},
                        {name:"火锅",category:"小吃",price:"100",img:require("../../assets/imgs/cuision.jpg"),goodDesc:"这个商品非常好，吃了会生仙"}
                ],
                pageSize:10, //页面显示条数 
                currentPage:1,//当前显示页码
                total:300,//页面总条数
                showLoading:false,
                dialogVisible:false, //模态框显示，false为不显示
                editObi:{}
            }
        },
        methods:{
            edit(obj){
                this.editObi = {...obj}; //深拷贝 使两个对象指向不同的对象  解耦
                this.dialogVisible = true;
            },
            handleSizeChange(pageSize){
                this.showLoading = true;
                this.pageSize = pageSize;
                console.log(this.pageSize)
                setTimeout(() => {
                    this.showLoading = false;
                }, 300);
            },
            handleCurrentChange(currentPage){
                this.currentPage = currentPage
                console.log(this.currentPage)
            },
            remove(name){
                 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                            console.log(name)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                    });
            }
        }
    }

    /* 
        1、书写table
            <el-table :data="list" v-loading="showLoading">
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column  label="商品名称">
                    <template slot-scope="scope">
                        <img :src="scope.row.img">
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="warning" @click="edit(scope.row.id)">编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            edit(id){
                this.showLoading = true;
                this.showLoading = false;
            }
        2、分页的处理
           <el-pagination
            @size-change="handleSizeChange" //每页显示条数发生改变 handleSizeChange(pageSize){this.pageSize=pageSize}
            @current-change="handleCurrentChange"//页码发生改变handleCurrentChange(curentPage){this.curentPage=curentPage}
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination> 
            //调用函数将pageSize和currentPage传进去
            refresh(){
                
            }
            对于没有数据  table框窄的问题，用固定高度的办法进行解决
            当用户进行删除的时候进行提示 messageBox
        3、表格扩展数据的展示
        <el-table-column type="expand">
            <template slot-scope="scope">
                表格扩展数据的内容
            </template>    
        </el-table-column>
        4、模态框的请求，dialog
    */
</script>

<style  scoped>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>