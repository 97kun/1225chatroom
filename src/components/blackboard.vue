<template>
    <div id="blackboard">
        <ul>
            <li><span>粉笔颜色：</span><input type="color" id="color" v-model="color"></li>
            <li><input type="range" min="1" max="10" id="px" v-model="pxSize"> 粉笔头粗细： <span id="p">{{pxSize}}</span></li>
            <li><button id="btn1">重置</button></li>
            <li><button id="btn2">切换至抹布模式</button><span id="moshi"></span></li>
        </ul>
        <canvas id="canvas" ref="canvas" height="500" width="1200"></canvas>
    </div>
</template>

<script>
    export default {
        name: "blackboard",
        data(){
            return {
                pxSize:'5',
                color:''
            }
        }
    }
</script>

<style scoped>
    #blackboard{
        background: rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    ul{
        width: 1200px;
    }
    ul,li{
        list-style: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    #canvas{
        display: block;
        background: url("../assets/images/d80313ae330ff9ea3024197ab1e433d1.jpg") no-repeat;
        background-size: 100% 100%;
        padding: 20px 20px;
    }
    #color{
        width: 50px;
        height: 50px;
    }
    #btn1,#btn2{
        width: 150px;
        height: 30px;
        background: #0c5460;
        color: white;
        border: 0;
    }
</style>