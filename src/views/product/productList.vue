<template>
    <div>
        <el-table
        :data="tableData"
        >
            <el-table-column type="index"></el-table-column>

            <el-table-column   label="分类名称">
                 <template slot-scope="scope">
                    <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
                    <el-input v-model="scope.row.cateName" v-show="scope.row.isedit" />
                </template>
            </el-table-column>

            <el-table-column    label="是否启用" >
                <template slot-scope="scope">
                    <el-switch
                        :disabled="!scope.row.isedit"
                        v-model="scope.row.flag"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope)">{{scope.row.isedit?"完成":"编辑"}}</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination></el-pagination>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tableData:[{cateName:"夏天很好",flag:1},
                    {cateName:"夏天很好",flag:2},
                    {cateName:"夏天很好",flag:1},
                    {cateName:"夏天很好",flag:2},
                    {cateName:"夏天很好",flag:1},
                    {cateName:"夏天很好",flag:2}]
            }
        },
        created(){
            for(let i=0;i<this.tableData.length;i++){
                this.tableData[i].flag = this.tableData[i].flag == 1;
                this.$set(this.tableData[i],"isedit",false)
                // this.tableData[i].isedit = false;
            }
            console.log("重组后的数据",this.tableData);
        },
        methods:{
            handleEdit(scope){ 
                
                if(scope.row.isedit){
                    scope.row.isedit = false
                }else{
                    scope.row.isedit = true
                }

            },
            handleDelete(scope){
                console.log(scope);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>