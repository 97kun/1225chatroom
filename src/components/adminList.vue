<template>
    <div id="adminlist">
        <el-button type="success" @click="toEditChatroom" plain>新增聊天室</el-button>
        <el-table
                :data="tableData"
                border
                align="center"
                cell-class-name="tbcell"
                header-align="center"
                row-class-name="tbrow"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="chatRoomName"
                    align="center"
                    label="聊天室名称">
            </el-table-column>
            <el-table-column
                    prop="creatTime"
                    align="center"
                    label="创建日期">
            </el-table-column>
            <el-table-column
                    prop="creator"
                    align="center"
                    label="创建者">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    align="center"
                    label="标签">
            </el-table-column>
            <el-table-column
                    prop="describe"
                    align="center"
                    label="聊天室描述">
            </el-table-column>
            <el-table-column
                    prop="chatRoomType"
                    align="center"
                    label="聊天室类型"
                    width="120">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"
                    width="250">
                <template slot-scope="scope">
                    <el-button type="primary"  @click="handleClick(scope.row)">编辑</el-button>
                    &nbsp;&nbsp;&nbsp;
                    <el-button type="danger" icon="el-icon-delete" circle @click="deletechatroom(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getchatlist(){
                this.axios.get('zk/im/api/chatroom/getAllChartRoom')
                    .then(re=>{
                        for (let i of re.data){
                            i.tag=JSON.parse(i.tag);
                            i.creatTime=new Date(i.creatTime).toLocaleString()
                        }
                        this.tableData=re.data;
                    })
                    .catch(error=>console.log(error))
            },
            handleClick(row) {
                this.$router.push({path:'/Editchatroom',query:{data:row}})
            },
            toEditChatroom(){
                this.$router.push({path:'/Editchatroom'})
            },
            deletechatroom(row){
                this.$confirm('此操作将永久删除该聊天室！, 是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.axios.post(`zk/im/api/chatroom/deleteByPrimaryKey?chatId=${row.chatId}`)
                        .then(re=>{
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getchatlist();
                        })
                        .catch(error=>{
                            this.$message({
                                type: 'warning',
                                message: '删除失败!'
                            });
                            console.log(error)
                        })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
        },
       created(){
            this.getchatlist()
       }
    }
</script>
<style scoped>
    #adminlist{
        display: flex;
        flex-direction: column;
    }

</style>
<style>
    .tbcell .cell{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
</style>
