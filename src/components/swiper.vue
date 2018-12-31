<template>
    <div id="swiperbox">
        <swiper :options="swiperOption" ref="mySwiper" id="swiperOption">
            <!-- slides -->
            <swiper-slide class="swiperslide1">I'm Slide 1</swiper-slide>
            <swiper-slide class="swiperslide2">I'm Slide 2</swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>

    </div>
</template>

<script>
    export default {
        name: "swiperbox",
        data() {
            return {
                swiperOption: {
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                    loop: true, // 循环模式选项
                    autoplay: true,
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
        /*display: none;*/
    }

    #swiperOption {
        width: 100%;
        height: 500px;
    }

    .swiperslide1 {
        background: url("../assets/images/hu2.jpg") no-repeat;
    }

    .swiperslide2 {
        background: url("../assets/images/hu1.jpg") no-repeat;
    }
</style>