<template>
    <div id="index">
        <h1 id="midtext">今日{{this.$store.state.warm}}</h1>
        <!--黑板组件-->
        <blackboard  class="hidden-md-and-down"></blackboard>
        <swiperbox class="hidden-lg-and-up"></swiperbox>
        <clock  class="hidden-lg-and-up clock"></clock>
    </div>
</template>

<script>
    import blackboard from './blackboard';
    import swiperbox from './swiper';
    import clock from './clock';

    export default {
        name: "index",
        data() {
            return {}
        },
        components: {
            blackboard,
            swiperbox,
            clock
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
        overflow: hidden;
    }

    #midtext {
        text-align: center;
        color: white;
    }

    .clock{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%,0) scale(0.5);
    }

    @media screen and (max-width: 990px) {
        #midtext{
            font-size: 20px;
        }
    }

</style>