<template>
    <div id="addnews">
        <el-input
                placeholder="请输入标题"
                v-model="input10"
                clearable>
        </el-input>
        <div id="editor"></div>
        <div id="editor2"></div>
    </div>
</template>

<script>
    var E = require('wangeditor');
    export default {
        name: "addnews",
        data() {
            return {
                input10: ''
            }
        },
        mounted(){
            var editor = new E('#editor','#editor2');
            editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片;
            editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                'video',  // 插入视频
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ]
            editor.create()
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