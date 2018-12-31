<template>
    <b-navbar toggleable="md" type="dark" fixed="top" class="header">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">首页</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item to="/First">登录注册</b-nav-item>
                <b-nav-item href="http://www.zjhu.edu.cn/" target="_blank">湖狮资讯</b-nav-item>
            </b-navbar-nav>
            <b-nav-text>&nbsp;&nbsp;&nbsp;欢迎{{this.$store.state.city}}用户,当前您所在的城市温度为{{this.$store.state.wendu}}摄氏度</b-nav-text>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <!--搜索框-->
                <!-- <b-nav-form>
                     <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                     <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                 </b-nav-form>-->

                <b-nav-item-dropdown text="管理员" right>
                    <b-dropdown-item to="/Home">聊天室维护</b-dropdown-item>
                    <b-dropdown-item to="/Addnews">新闻发布</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown right>
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <em>我</em>
                    </template>
                    <b-dropdown-item to="/Chatroomlist">聊天室列表</b-dropdown-item>
                    <b-dropdown-item to="/Me">个人中心</b-dropdown-item>
                    <b-dropdown-item href="#">退出登录</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: "hnav"
    }
</script>

<style scoped>

</style>