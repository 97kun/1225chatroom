<template>
    <div id="clock">
        <canvas id="myCanvas" width="500" height="500"></canvas>
    </div>
</template>

<script>
    export default {
        name: "clock",
        methods: {
            init() {
                //获取画布
                var myCanvas = document.getElementById("myCanvas");
                //获取执行期上下文（创建画笔）
                var ctx = myCanvas.getContext('2d');
                //获取时间
                renderTime();

                function renderTime() {
                    var date = new Date();
                    var h = date.getHours();
                    var m = date.getMinutes();
                    var s = date.getSeconds();
                    var ms = date.getMilliseconds();
                    var n = date.toLocaleDateString();
                    var sliderS = s + ms / 1000;
                    var sliderM = m + sliderS / 60;
                    var sliderH = h + sliderM / 60;

                    //设置画笔颜色、宽度
                    ctx.strokeStyle = '#99FFFF';
                    ctx.lineWidth = 18;
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#99FFFF'

                    //canvas背景填充渐变色
                    var grd = ctx.createRadialGradient(250, 250, 5, 250, 250, 300);
                    grd.addColorStop(0, '#03303a');
                    grd.addColorStop(1, '#000');
                    ctx.fillStyle = grd;
                    ctx.fillRect(0, 0, 500, 500);

                    //绘时
                    ctx.beginPath();
                    ctx.arc(250, 250, 200, degToRad(270), degToRad(sliderH * 30 - 90));
                    ctx.stroke();
                    //绘分
                    ctx.beginPath();
                    ctx.arc(250, 250, 170, degToRad(270), degToRad(sliderM * 6 - 90));
                    ctx.stroke();
                    //绘秒
                    ctx.beginPath();
                    ctx.arc(250, 250, 140, degToRad(270), degToRad(sliderS * 6 - 90));
                    ctx.stroke();
                    //文字时间
                    var S = ('0' + s).slice(-2);
                    var M = ('0' + m).slice(-2);
                    var H = ('0' + h).slice(-2);
                    var str = `${H}:${M}:${S}`;
                    var str2 = `${n}`;
                    ctx.font = '25px Helvetica';
                    ctx.fillStyle = '#fff';
                    ctx.fillText(str, 200, 250);
                    ctx.fillText(str2, 190, 275);
                };
                setInterval(renderTime, 30);

                //将角度转化为弧度，弧度=角度*Math.PI/180
                function degToRad(deg) {
                    return deg * Math.PI / 180;
                }
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>

</style>