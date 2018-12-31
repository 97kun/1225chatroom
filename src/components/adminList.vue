<template>
    <div id="adminlist">
        <el-button type="success" @click="toEditChatroom" plain>新增聊天室</el-button>
        <el-table
                :data="tableData"
                border
                align="center"
                header-align="center"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="name"
                    align="center"
                    label="聊天室名称">
            </el-table-column>
            <el-table-column
                    prop="date"
                    align="center"
                    label="创建日期">
            </el-table-column>
            <el-table-column
                    prop="mas"
                    align="center"
                    label="创建者">
            </el-table-column>
            <el-table-column
                    prop="labels"
                    align="center"
                    label="标签">
            </el-table-column>
            <el-table-column
                    prop="describe"
                    align="center"
                    label="聊天室描述">
            </el-table-column>
            <el-table-column
                    prop="type"
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
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        methods: {
            handleClick(row) {
                this.$router.push({path:'/Editchatroom',query:{data:row}})
            },
            toEditChatroom(){
                this.$router.push({path:'/Editchatroom'})
            }
        },

        data() {
            return {
                tableData: [{
                    date: '2016-05-03',
                    name: '一号',
                    mas: '上海',
                    labels: ['奋青','破案群'],
                    type:'动漫',
                    describe: '上海市普陀区金沙江路 1518 弄',
                    id: 200333
                }, {
                    date: '2016-05-02',
                    name: '二号',
                    mas: '上海',
                    labels: ['奋青','破案群'],
                    type:'动漫',
                    describe: '上海市普陀区金沙江路 1518 弄',
                    id: 200333
                }, {
                    date: '2016-05-04',
                    name: '三号',
                    mas: '上海',
                    labels: ['奋青','破案群'],
                    type:'动漫',
                    describe: '上海市普陀区金沙江路 1518 弄',
                    id: 200333
                }, {
                    date: '2016-05-01',
                    name: '四号',
                    mas: '上海',
                    labels: ['奋青','破案群'],
                    type:'动漫',
                    describe: '上海市普陀区金沙江路 1518 弄',
                    id: 200333
                }]
            }
        }
    }
</script>
<style scoped>
    #adminlist{
        display: flex;
        flex-direction: column;
    }
</style>