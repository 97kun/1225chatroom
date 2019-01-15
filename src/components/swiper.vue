<template>
    <div id="swiperbox">
        <swiper :options="swiperOption" ref="mySwiper" id="swiperOption">
            <!-- slides -->
            <swiper-slide class="slide swiperslide1">等你畅聊</swiper-slide>
            <swiper-slide class="slide swiperslide2">等你畅聊</swiper-slide>
            <swiper-slide class="slide swiperslide3">等你畅聊</swiper-slide>
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
                    loop: true, // 循环模式选项
                    autoplay: true,
                    lazy:true,
                    effect:'cube',
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                    },

                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper

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
        width: 100%;
        height: 100px;
        margin: 20px auto;
        /*display: none;*/
    }

    #swiperOption {
        width: 100%;
        height: 200px;
    }

    .slide{
        font-size: 15px;
        color: white;
    }
    .swiperslide1 {
        background: url("../assets/images/7472d092f7e907221c512e7656932b3.jpg") no-repeat;
    }

    .swiperslide2 {
        background: url("../assets/images/340dffd6adf4f4c005d685f3169e330.jpg") no-repeat;
    }

    .swiperslide3{
        background: url("../assets/images/1b4d36434343c4bc70646e9e366c63b.jpg") no-repeat;
    }
    .slide{
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
    }
</style>