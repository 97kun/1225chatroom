<template>
    <div id="addnews"
         v-loading="loading2"
         element-loading-text="上传中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
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
                content:'',
                loading2:false
            }
        },
        methods:{
            init(){
                var editor = new E('#editor','#editor2');
                let _this=this;
                editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片;
                editor.create();
                document.getElementById('subnews').addEventListener('click', function () {
                    // 读取 html
                   _this.content=editor.txt.html();
                   let time=new Date();
                   let data={
                       title:_this.newstitle,
                       content:_this.content,
                       createtime:time,
                       sender:'ZK'
                   };
                    _this.loading2=true;
                   _this.axios.post('zk/im/api/informnews/insert',data)
                       .then(re=>{
                           _this.loading2=false;
                           _this.$notify({
                               title: '成功',
                               message: '发布成功',
                               type: 'success'
                           });
                           _this.newstitle='';
                           _this.content='';
                           editor.txt.html('');
                       })
                       .catch(error=>{
                           console.log(error);
                           _this.loading2=false;
                           this.$notify.error({
                               title: '错误',
                               message: '发布失败'
                           });
                       })
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
    height: calc(100vh - 180px);
}
</style>