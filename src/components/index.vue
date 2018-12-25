<template>
    <div id="index">
        <h1 id="midtext">今日{{this.$store.state.warm}}</h1>
        <swiper :options="swiperOption" ref="mySwiper" id="swiperOption">
            <!-- slides -->
            <swiper-slide class="swiperslide1">I'm Slide 1</swiper-slide>
            <swiper-slide class="swiperslide2">I'm Slide 2</swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div>
        </swiper>
        <div>
            <b-button variant="success" to="Test">临时聊天直通车</b-button>
            <router-link :to="{path: 'chuan/aaaa',query:{age:16}}">click</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                swiperOption: {
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                    loop: true, // 循环模式选项
                    autoplay:true,
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                    },

                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                }
            }
        },
        methods: {
            tohome() {
                this.$router.push({path: "/First"});
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted() {
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            console.log('this is current swiper instance object', this.swiper)
            // this.swiper.slideTo(3, 1000, false)
        }
    }
</script>

<style scoped>
    .swiper-container {
        width: 500px;
        height: 300px;
        margin: 20px auto;
        display: none;
    }

    #index {
        background: rgba(0,0,0,0.8) url("../assets/images/china.jpg") no-repeat;
        background-size: cover;
        background-position: center center;
        padding-top: 56px;
    }
    #midtext{
        text-align: center;
        color: white;
    }
    #swiperOption{
        width: 100%;
    }
    .swiperslide1{
        background: url("../assets/images/hu2.jpg");
    }
    .swiperslide2{
        background: url("../assets/images/hu1.jpg");
    }

</style>