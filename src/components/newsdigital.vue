<template>
    <div id="newsdigital"
         v-loading="loading"
         element-loading-text="加载中，请稍后"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div>
            <el-scrollbar style="height: 100%">
                <h1 class="title">{{digital.title}}</h1>
                <h5 class="small">{{digital.time}}&nbsp;发送者:{{digital.sender}}</h5>
                <div v-html="digital.content"></div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "newsdigital",
        data() {
            return {
                digital: {},
                loading:false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                console.log(vm.$route.params.data);
                vm.digital = vm.$route.params.data;
                console.log(vm.digital)
                vm.getContent()
            })
        },
        methods:{
            getContent(){
                this.loading=true;
                this.axios.get(`zk/im/api/informnews/selectByPrimaryKey?id=${this.digital.id}`)
                    .then(re=>{
                        this.loading=false;
                        this.digital.content=re.data.content;
                    })
                    .catch(error=>{
                        this.loading=false;
                        this.$notify({
                            title: '警告',
                            message: '发生错误',
                            type: 'warning'
                        });
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>
    #newsdigital {
        width: 100vw;
        height: 100vh;
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