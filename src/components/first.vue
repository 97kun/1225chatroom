<template>
    <div class="first">
        <div>
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
        data() {
            return {
                transitionName: 'slide-left'

            }
        },
    }
</script>

<style scoped>
    * {
        transition: all 0.5s;
    }

    .joinus {
        text-align: center;
    }

    .first {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: url("../assets/images/loginbjpc.jpg") no-repeat;
        color: white;
        overflow: hidden;
    }


    @keyframes mymove1 {
        0% {
            transform: scale(0)
        }
        100% {
            transform: scale(1)
        }
    }

    @media screen and (min-width: 1000px) {
        .box {
            width: 920px;
            height: 470px;
            position: relative;
            padding-left: 100px;
            margin-top: 50px;
        }

        .box > span {
            position: absolute;
            height: 100%;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;
        }

        a {
            color: white;
            width: 80px;
            background: rgba(0, 0, 0, 0.5);
            height: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
        }

        a:hover {
            color: white;
            text-decoration: none;
        }


        .router-link-active {
            width: 100px;
            background: rgba(255, 255, 255, 0.5);
        }

        .child-view {
            position: absolute;
            left: 100px;
            top: 0;
            width: calc(100% - 100px);
            height: 100%;
        }

        .routerbox-enter-active {
            animation: mymove1 1s;
        }

        .routerbox-leave-active {
            animation: mymove1 1s reverse;
        }
    }

    @media screen and (max-width: 1000px) {
        .box {
            width: 90vw;
            height: 50vh;
            position: relative;
            margin-top: 50px;
            padding-top: 50px;
        }

        .box > span {
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: row;
            z-index: 10;
        }

        .child-view {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding-top: 50px;
        }

        a {
            color: white;
            height: 30px;
            background: rgba(0, 0, 0, 0.5);
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .router-link-active {
            height: 50px;
            background: rgba(255, 255, 255, 0.5);
        }

        .routerbox-enter-active {
            animation: mymove1 1s;
        }

        .routerbox-leave-active {
            animation: mymove1 1s reverse;
        }
    }
</style>