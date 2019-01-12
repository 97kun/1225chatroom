<template>
    <div id="newsdigital">
        <div>
            <h1 class="title">{{digital.title}}</h1>
            <h5 class="small">{{digital.time}}&nbsp;发送者:{{digital.sender}}</h5>
            <div v-html="digital.content"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "newsdigital",
        data() {
            return {
                digital: {}
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.digital = vm.$route.params.data;
                console.log(vm.digital)
            })
        }
    }
</script>

<style scoped>
    #newsdigital {
        padding-top: 60px;
        display: flex;
        /*align-items: center;*/
        justify-content: center;

    }
    .title{
        text-align: center;
    }

    .small {
        color: #909399;
        text-align: center;
    }
    @media screen and (min-width: 1200px) {
        #newsdigital>div{
            width: 1000px;
            background: #EBEEF5;
        }
    }
</style>