<template>
    <div class="home">
        <div class="content hidden-xs-only">
            <div class="left">
                <el-row class="tac">
                    <el-col :span="24">
                        <el-menu
                                :router=true
                                default-active="Adminlist"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose"
                                background-color="rgba(0,0,0,0.2)"
                                text-color="#fff"
                                active-text-color="#ffd04b">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>聊天室管理</span>
                                </template>
                                <el-menu-item-group>
                                    <template slot="title">聊天室概览</template>
                                    <el-menu-item index="Adminlist">聊天室详细列表</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-info"></i>
                                    <span>新闻管理</span>
                                </template>
                                <el-menu-item-group>
                                    <template slot="title">新闻概览</template>
                                    <el-menu-item index="Addnews">新闻发布</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <div class="right">
                <!--路由展示区-->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%;
        position: relative;
        padding-left: 250px;
        padding-top: 60px;
    }

    .header {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.9);
        position: absolute;
        left: 0;
        top: 0;
    }

    .logo {
        height: 50px;
        margin-left: 50px;
    }

    .left {
        width: 250px;
        height: 100%;
        position: fixed;
        left: 0;
        top: 56px;
        background: rgba(41, 48, 56, 0.8);
    }

    .el-menu {
        border-right: 0;
    }
</style>