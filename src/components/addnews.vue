<template>
    <div id="addnews">
        <el-input
                placeholder="请输入标题"
                v-model="newstitle"
                clearable>
        </el-input>
        <div id="editor"></div>
        <div id="editor2"></div>
        <el-button type="primary" id="subnews">提交</el-button>
    </div>
</template>

<script>
    var E = require('wangeditor');
    export default {
        name: "addnews",
        data() {
            return {
                newstitle: '',
                content:''
            }
        },
        methods:{
            init(){
                var editor = new E('#editor','#editor2');
                let _this=this;
                editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片;
                editor.create()
                document.getElementById('subnews').addEventListener('click', function () {
                    // 读取 html
                   _this.content=editor.txt.html();
                   let time=new Date()
                   let data={
                       title:_this.newstitle,
                       content:_this.content,
                       creattime:time,
                       user:'ZK'
                   };
                   console.log(data)
                   _this.axios.post('https://wd1843699377fzpwpa.wilddogio.com/news.json',data)
                       .then(re=>console.log(re))
                       .catch(error=>console.log(error))
                }, false)
            }
        },
        mounted(){
            this.init()
        }
    }
</script>

<style scoped>
#addnews{
    display: flex;
    flex-direction: column;
}
#editor2{
    height: 500px;
}
</style>