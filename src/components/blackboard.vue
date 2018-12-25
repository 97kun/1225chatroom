<template>
    <div id="blackboard">
        <ul  class="hidden-md-and-down">
            <li><span>粉笔颜色：</span><input type="color" id="color"></li>
            <li><input type="range" min="1" max="10" id="px" v-model="pxSize"> 粉笔头粗细： <span id="p">{{pxSize}}</span></li>
            <li><button id="btn1">重置</button></li>
            <li><button id="btn2">切换至抹布模式</button><span id="moshi"></span></li>
        </ul>
        <canvas id="canvas" ref="canvas" height="500" width="1000"  class="hidden-md-and-down"></canvas>
    </div>
</template>

<script>
    export default {
        name: "blackboard",
        data(){
            return {
                pxSize:'5',
            }
        },
        mounted(){
          this.init()
        },
        methods:{
            //画布回调
            init(){
                var canvas=document.getElementById("canvas");
                var color=document.getElementById("color");
                var px=document.getElementById("px");
                var btn1=document.getElementById("btn1");
                var btn2=document.getElementById("btn2");

                var col=null;
                var size=5;
                var cachu=false;
                color.onchange=function () {
                    col = this.value;
                };
                px.onchange=function () {
                    p.innerHTML=this.value;
                    size=this.value;
                };
                var cv=canvas.getContext("2d");
                // 获取鼠标相对于画布的位置
                function getmouse(e){
                    let ev=e||window.event;
                    return {'x':ev.layerX,'y':ev.layerY};
                };
                // 路径起始点设置
                function beg(obj){
                    cv.moveTo(obj.x-20,obj.y-20);
                    cv.stroke();
                };
                // 跟随鼠标划线
                function act(obj){
                    // 判断模式
                    if (!cachu){
                        cv.lineTo(obj.x-20,obj.y-20);
                        cv.strokeStyle=col;
                        cv.lineWidth=size;
                        cv.stroke();
                    } else {
                        cv.clearRect(obj.x-30,obj.y-30,20,20);
                    }
                };
                canvas.onmousedown=function (e) {
                    cv.beginPath();
                    cv.lineCap="round"
                    beg(getmouse(e));
                    canvas.onmousemove=function (e) {
                        act(getmouse(e))
                    };
                };
                document.onmouseup=function () {
                    canvas.onmousemove=null;
                    cv.closePath();
                }
                btn1.onclick=function () {
                    cv.clearRect(0,0,canvas.width,canvas.height);
                };
                btn2.onclick=function () {
                    cachu=!cachu;
                    cachu?(btn2.innerHTML="切换至粉笔模式"):(btn2.innerHTML="切换至抹布模式");
                }
            }
        }
    }
</script>

<style scoped>
    #blackboard{
        color: wheat;
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