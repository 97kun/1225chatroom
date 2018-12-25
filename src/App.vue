<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" fixed="top" class="header">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand to="/">首页</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <b-nav-item to="/First">登录注册</b-nav-item>
                    <!--<b-nav-item href="http://www.zjhu.edu.cn/" target="_blank">湖狮资讯</b-nav-item>-->
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
        <transition name="approuterbox">
            <keep-alive>
                <router-view class="approuterview"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    var timer = null;

    export default {
        name: 'app',
        data() {
            return {
                // warm:"",
            }
        },
        components: {},
        created() {
            console.log("%c请你善良，看见bug默默走开就好","font-size:35px;color:blue")
            function myFun(result) {
                let cityName = result.name;
                let url = "http://wthrcdn.etouch.cn/weather_mini?city=" + cityName;
                fetch(url)
                    .then(re => re.json())
                    .then(data => {
                        console.log(data);
                        this.$store.state.city = data.data.city;
                        this.$store.state.ganmao = data.data.ganmao;
                        this.$store.state.wendu=data.data.wendu;
                    }).then(() => {
                    var l = this.$store.state.ganmao.length;
                    var count = 1;
                    this.$store.state.warm = "";
                    timer = setInterval(function () {
                        this.$store.state.warm += (this.$store.state.ganmao).substring(count - 1, count);
                        count++;
                        // console.log("0.0")
                        if (count > l) {
                            clearInterval(timer)
                        }
                    }.bind(this), 200);
                    // console.log(this.l)
                })
            }

            var myCity = new BMap.LocalCity();
            myCity.get(myFun.bind(this));
           /* fetch("https://wd1843699377fzpwpa.wilddogio.com/name.json",{
                method:"POST",
                header:{
                    "Content-type":'application/json'
                },
                body:JSON.stringify(this.$store.state)

            }).then(re=>re.json()).then(data=>{
                console.log(data)
            })
                .catch(error =>console.log(err))*/
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    /*html,body{
      height: 100%;
    }*/
    .header {
        background: rgba(0, 0, 0, 0.7);
    }

    a, span, label {
        display: inline-block;
        text-decoration: none;
    }

    h1 {
        font-weight: 400;
    }

    /*#app {
      !*min-width: 1200px;*!
      height: 100%;
    }*/
    .approuterview {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .approuterbox-enter-active {
        animation: mymove 0.5s;
    }

    .approuterbox-leave-active {
        animation: mymove 0.5s reverse;
    }

    @keyframes mymove {
        0% {
            transform: translate(-100%, 0);
            opacity: 0
        }
        100% {
            transform: translate(0, 0);
            opacity: 1
        }
    }
</style>
