<template>
    <div class="first">
        <div class="hidden-xs-only">
            <h1 class="joinus">JOIN US</h1>
            <div class="box">
            <span>
                <router-link to="Login">登录</router-link>
                <router-link to="Register">注册</router-link>
            </span>
                <transition name="routerbox">
                <router-view class="child-view"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "first",
        data(){
            return{
                transitionName: 'slide-left'

            }
        },
    }
</script>

<style scoped>
    *{
        transition: all 0.5s;
    }
    .first{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: url("../assets/images/loginbjpc.jpg") no-repeat;
        color: white;
        overflow: hidden;
    }
    .box{
        width: 920px;
        height: 470px;
        position: relative;
        padding-left: 100px;
        margin-top: 50px;
    }
    .box>span{
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
    }
    a{
        color: white;
        width: 80px;
        background: rgba(0,0,0,0.5);
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    a:hover{
        color: white;
        text-decoration: none;
    }
    .joinus{
        text-align: center;
    }
    .router-link-active {
        width: 100px;
        background: rgba(255,255,255,0.5);
    }
    .child-view {
        position: absolute;
        left: 100px;
        top: 0;
        width: calc(100% - 100px);
        height: 100%;
    }
    .routerbox-enter-active{
        animation: mymove1 1s;
    }
    .routerbox-leave-active{
        animation: mymove1 1s reverse;
    }
    @keyframes mymove1 {
        0%{transform: scale(0)}
        100%{transform: scale(1)}
    }
</style>