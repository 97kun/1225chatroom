<template>
    <div id="newslist"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="box">
            <div  v-for="item of listarr">
                <b-card
                        :title="item.title"
                        img-src="https://picsum.photos/600/300/?image=25"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    <p class="card-text">
                        <el-tag>{{item.time}}</el-tag>
                    </p>
                    <b-button variant="primary" @click="gonewsdigital(item)">查看详情</b-button>
                </b-card>
            </div>
        </div>
        <div class="bottom">
            <b-pagination-nav base-url="#" :number-of-pages="pages" v-model="currentPage"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [],
                currentPage: 1,
                currentDate: new Date(),
                loading: false
            }
        },
        computed: {
            listarr() {
                return this.items.slice((this.currentPage - 1) * 10, (this.currentPage - 1) * 10 + 10)
            },
            pages() {
                return Math.ceil(this.items.length / 10)
            }
        },
        methods: {
            linkGen(pageNum) {
                return '#page/' + pageNum + '/foobar'
            },
            getnewslist() {
                this.loading = true;
                this.axios.get('zk/im/api/informnews/selectAllNews')
                    .then(re => {
                        for (let i of re.data) {
                            console.log(i);
                            let zan = {
                                time: new Date(i.createtime).toLocaleString(),
                                title: i.title,
                                sender: i.sender,
                                content: i.content
                            }
                            this.items.push(zan)
                        }
                        this.items.reverse();
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading = false;
                    });
            },
            gonewsdigital(item) {
                this.$router.push({name: "NewsDigital", params: {data: item}})
            }
        },
        created() {
            this.getnewslist();
        }

    }
</script>
<style scoped>
    #newslist {
        padding-top: 60px;
        height: 100vh;
    }

    .box {
        display: flex;
        justify-content: space-around;
        align-items: start;
        flex-wrap: wrap;
    }

    .box>div{
        width: 25%;
        min-width: 300px;
        display: flex;
        justify-content: space-around;
        align-items: start;
        flex-wrap: wrap;
    }

    .bottom {
        position: fixed;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: 0;
    }

    .card-title{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>