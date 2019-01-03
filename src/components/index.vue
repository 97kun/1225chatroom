<template>
    <div id="index">
        <h1 id="midtext">今日{{this.$store.state.warm}}</h1>
        <!--黑板组件-->
        <blackboard></blackboard>

        <!--<clock></clock>-->
        <!--<swiperbox></swiperbox>-->
        <div>
            <b-button variant="success" to="Newslist">探索世界</b-button>
            <router-link :to="{path: 'chuan/aaaa',query:{age:16}}">click</router-link>
        </div>
        <!--<router-view></router-view>-->
    </div>
</template>

<script>
    import blackboard from './blackboard';
    import clock from './clock'
    import swiperbox from './swiper'

    export default {
        name: "index",
        data() {
            return {}
        },
        components: {
            blackboard,
            clock,
            swiperbox
        }

    }
</script>

<style scoped>

    #index {
        background: rgba(0, 0, 0, 0.8) url("../assets/images/china.jpg") no-repeat;
        background-attachment: fixed;
        background-size: cover;
        background-position: center center;
        padding-top: 56px;
        height: 100%;
    }

    #midtext {
        text-align: center;
        color: white;
    }


</style>