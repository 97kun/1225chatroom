<template>
    <div id="chatroomlist">
        <HNav></HNav>

        <!--<div class="mt-4">-->
            <div v-for="key in (chatroombox[currentPage-1])">
                <b-card :title="key.title"
                        img-src="https://picsum.photos/600/300/?image=25"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">
                    <p class="card-text">
                        {{key.body}}
                    </p>
                    <b-button  :to="'Chatwindow'+'#'+key.chatid" target="_blank" variant="primary">Go somewhere</b-button>
                </b-card>
            </div>
        <!--</div>-->
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="pagenum" v-model="currentPage"  class="footernav"/>
    </div>
</template>

<script>
    import chatlist from '../../xjson/chatlist'
    export default {
        name: "chatroomlist",
        data(){
            return{
                chatlist:{},
                currentPage: 1,
                chatroombox:[],
                pagenum:""
            }
        },
        computed:{

        },
        methods:{
          open(e){
              console.log(e.chatid);
              this.$router.push({path:"/Chatwindow"})
          },
            linkGen (pageNum) {
                return '#page/' + pageNum + '/foobar'
            },
            sh(e){
              console.log(e.target)
            }
        },
        created(){
           /* this.axios.get("../../xjson/chatlist.json")
                .then(re=>{console.log(re)})
                .catch(error=>{console.log(error)})*/
            /*fetch("../../xjson/chatlist.json")
                .then(response=>response.json())
                .then(data=>{console.log(data)})
                .catch(error=>{console.log(error)})*/

            var allData = []; //用来装处理完的数组
            var currData = []; //子数组用来存分割完的数据
            //循环需要处理的数组
            for(var i = 0; i < chatlist.length; i++) {
                //将chartArr[i]添加到子数组
                currData.push(chatlist[i]);
                // console.log(i)
                //在这里求4的余数,如果i不等于0,且可以整除 或者考虑到不满4个或等于4个的情况就要加上  i等于当前数组长度-1的时候
                if((i != 0 && (i + 1) % 8 == 0) || i == chatlist.length - 1) {
                    //把currData加到allData里
                    allData.push(currData);
                    this.chatroombox=allData;
                    //在这里清空currData
                    currData = [];
                }
            };
            this.pagenum=this.chatroombox.length;
        }
    }

</script>

<style scoped>
#chatroomlist{
    padding-top: 56px;
}
    .card-text{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    overflow: hidden;
    }
    #chatroomlist{
        display: flex;
        justify-content: space-around;
        align-items: start;
        flex-wrap: wrap;
    }
    #chatroomlist>div{
        margin: 20px;
    }
    .footernav{
        position: fixed;
        bottom: 0;
    }
</style>