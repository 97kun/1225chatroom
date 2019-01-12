<template>
    <div class="nav">
        <b-navbar toggleable="md" type="dark" fixed="top" class="header">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand to="/">首页</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <b-nav-item to="/First"  v-if="!this.$store.getters.loginstatus">登录注册</b-nav-item>
                    <b-nav-item to="Newslist">探索世界</b-nav-item>
                    <b-nav-item href="http://www.zjhu.edu.cn/" target="_blank">湖狮资讯</b-nav-item>
                </b-navbar-nav>
                <b-nav-text>&nbsp;&nbsp;&nbsp;欢迎{{this.$store.state.city}}用户,当前您所在的城市温度为{{this.$store.state.wendu}}摄氏度
                </b-nav-text>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown text="管理员" right>
                        <b-dropdown-item to="/Home">聊天室维护</b-dropdown-item>
                        <b-dropdown-item to="/Addnews">新闻发布</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>
                        <!-- Using button-content slot -->
                        <template slot="button-content">
                            <em >{{(!this.$store.getters.loginstatus)?'请登录':this.$store.state.user.username}}</em>
                        </template>
                        <b-dropdown-item to="/Chatroomlist">聊天室列表</b-dropdown-item>
                        <b-dropdown-item to="/Me">个人中心</b-dropdown-item>
                        <b-dropdown-item @click="exit">退出登录</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "hnav",
        methods: {
            exit() {
                localStorage.removeItem('user');
                this.$store.state.user = {};
                this.$store.state.logined = false;
                this.$router.push({path: "/Login"})
            }
        }
    }
</script>

<style>
    .nav {
        z-index: 99999999999;
    }

    .el-loading-mask {
        z-index: 99;
    }
</style>