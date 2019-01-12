<template>
    <div id="me">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>我的个人信息</span>
                <el-button style="float: right; padding: 3px 0" @click="s"  type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "me",
        data(){
            return {
                usermes:JSON.parse(localStorage.getItem('user'))
            }
        },
        methods:{
            s(){
                console.log(this.usermes)
            }
        }
    }
</script>

<style scoped>
    #me {
        padding-top: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 80vw;
    }
</style>