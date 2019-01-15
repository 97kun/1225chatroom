<template>
    <div id="chatwindow">
        <div>
            <!--<b-input-group prepend="临时名字" append="">
                <b-form-input v-model="senderId"></b-form-input>
            </b-input-group>-->
            <div id="mesbox" ref="mesbox">
                <!--<el-scrollbar style="height: 100%">-->
                <div v-for="item in messagecontent" :class="{'me':item.name===myname,'others':item.name!==myname}">
                    <div @click="goMe(item.name)" class="header-name">{{item.name}}</div>
                    <div class="text-body">
                        {{(!item.ifimg)?item.content:''}}
                        <img :src="item.content" class="mes-img" v-if="item.ifimg"/>

                    </div>
                </div>
                <!--</el-scrollbar>-->

            </div>
            <!--<b-input-group prepend="私聊对象名字" append="">
                <b-form-input v-model="receiverId"></b-form-input>
            </b-input-group>-->
            <!--<b-input-group prepend="消息：">
                <b-form-input v-model="newmes"></b-form-input>
            </b-input-group>-->
            <div class="inputbox">
                <div class="uppicturebox">
                    <input type="file" class="zhizhao" id="zhizhao" name="zhizhao" @change="up" style="">
                    <img id="pto" style="" :src="image">
                </div>
                <el-select v-model="value" placeholder="请选择私聊对象">
                    <el-option
                            v-for="item of options"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
                <b-input-group prepend="" @keyup.enter="send">
                    <b-form-input v-model="newmes"></b-form-input>
                    <b-input-group-append>
                        <b-btn variant="outline-success" @click="send">发送</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </div>
            <!--<div>
                <b-button variant="success" @click="send">发送</b-button>
            </div>-->

        </div>

    </div>
</template>

<script>

    export default {
        name: "chatwindow",
        data() {
            return {
                senderId: "",
                receiverId: "",
                messagecontent: [],
                newmes: "",
                socket: null,
                image: require('../assets/images/loading.gif'),
                sendImg: false,
                options: [],
                value: ''
            }
        },
        computed: {
            myname() {
                return this.$store.state.user.username
            }
        },
        created(){
            this.options=this.$store.state.user.friend.split('~');
        },
        methods: {
            send() {
                console.log(this.messagecontent);
                if (this.socket.readyState === WebSocket.OPEN) {
                    console.log(window.location.hash.split('#')[2]);
                    var reg = /煞笔|傻逼|沙比/ig;//正则表达式，第一个参数是目标对象，第二个参数g,表示全部替换。
                    let aftermes;
                    if (this.sendImg) {
                        aftermes = this.image;
                    } else {
                        aftermes = this.newmes.replace(reg, "**");
                    }
                    let data = `${aftermes}|${window.location.hash.split('#')[2]}`;
                    this.socket.send(this.$store.state.user.username + '~' + this.value + '~' + data);
                    this.newmes = "";
                    this.sendImg = false;
                    // console.log(mesbox)
                } else {
                    alert("WebSocket连接没有建立成功！！");
                }
            },
            up(e) {
                this.newmes = '';
                this.sendImg = true;
                var file = e.target.files[0];
                var fr = new FileReader(file);
                fr.onloadend = function (e) {
                    // console.log(e.target.result);

                    //压缩
                    //压缩方法
                    function dealImage(base64, w, callback) {
                        var newImage = new Image();
                        var quality = 0.6;    //压缩系数0-1之间
                        newImage.src = base64;
                        newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
                        var imgWidth, imgHeight;
                        newImage.onload = function () {
                            imgWidth = this.width;
                            imgHeight = this.height;
                            var canvas = document.createElement("canvas");
                            var ctx = canvas.getContext("2d");
                            if (Math.max(imgWidth, imgHeight) > w) {
                                if (imgWidth > imgHeight) {
                                    canvas.width = w;
                                    canvas.height = w * imgHeight / imgWidth;
                                } else {
                                    canvas.height = w;
                                    canvas.width = w * imgWidth / imgHeight;
                                }
                            } else {
                                canvas.width = imgWidth;
                                canvas.height = imgHeight;
                                quality = 0.6;
                            }
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                            var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
                            // 如想确保图片压缩到自己想要的尺寸,如要求在1-50kb之间，请加以下语句，quality初始值根据情况自定
                            while (base64.length / 1024 > 50) {
                                quality -= 0.01;
                                base64 = canvas.toDataURL("image/jpeg", quality);
                            }
                            // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
                            while (base64.length / 1024 < 1) {
                                quality += 0.001;
                                base64 = canvas.toDataURL("image/jpeg", quality);
                            }
                            callback(base64);//必须通过回调函数返回，否则无法及时拿到该值
                        }
                    }

                    //使用压缩
                    let _this = this;
                    dealImage(e.target.result, 800, printing);

                    function printing(base64) {
                        console.log("压缩后", base64.length / 1024);
                        // _this.picture = e.target.result;
                        _this.image = base64;
                        // _this.newmes = base64;
                        // console.log(_this.image)
                    }

                }.bind(this);
                fr.readAsDataURL(file);
            },
            goMe(name) {
                this.$router.push({path: '/Me', query: {name: name}})
            }
        },
        mounted() {
            // var socket;
            if (!window.WebSocket) {
                window.WebSocket = window.MozWebSocket;
            }
            const vm = this;

            if (window.WebSocket) {
                let r = /(用户)|(群发了一条消息)/igm;
                let ifImg = /^data:image\/(jpeg|png|gif);base64,/;
                // let maohao=/(：)(\S*)/i;
                this.socket = new WebSocket("ws://47.98.47.228:8000/websocket");
                this.socket.onmessage = function (event) {
                    /*var ta = document.getElementById('responseContent');
                    var myMsg = document.getElementById('myMsg');
                    ta.value += myMsg.value+ "\r\n";
                    ta.value += event.data + "\r\n";*/
                    console.log(event);

                    let getaftermes = event.data.replace(r, '');
                    // /^data:image\/(jpeg|png|gif);base64,/
                    // let qumaohao=getaftermes.split(maohao);
                    let address = getaftermes.indexOf('：');
                    let qumaohao = [];
                    qumaohao[0] = getaftermes.substring(0, address);
                    qumaohao[1] = getaftermes.substring(address + 1, getaftermes.length);
                    // console.log(qumaohao)
                    // console.log(ifImg);
                    // console.log(event);
                    if (qumaohao[1].split('|')[1] === window.location.hash.split('#')[2]) {
                        let mesdata = {
                            name: qumaohao[0],
                            content: qumaohao[1].split('|')[0],
                            id: getaftermes.split('|')[1],
                        };
                        mesdata.ifimg = !!mesdata.content.match(ifImg);
                        console.log(mesdata);
                        // vm.ifimg = !!mesdata.content.match(ifImg);
                        vm.messagecontent.push(mesdata);
                    }
                    let mesbox = document.getElementById('mesbox');
                    // console.log(mesbox)
                    mesbox.scrollTop = mesbox.scrollHeight;
                };

                this.socket.onopen = function (event) {
                    /*var ta = document.getElementById('responseContent');
                    ta.value = "你当前的浏览器支持WebSocket,请进行后续操作\r\n";*/
                };

                this.socket.onclose = function (event) {
                    /* var ta = document.getElementById('responseContent');
                     ta.value = "";
                     ta.value = "WebSocket连接已经关闭\r\n";*/
                };
            } else {
                alert("您的浏览器不支持WebSocket");
            }
        }
    }
</script>
<style scoped>
    #chatwindow {
        padding-top: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
    }


    #chatwindow > div {
        width: 1000px;
        /*overflow: hidden;*/
    }

    .uppicturebox {
        transition: all 1s;
    }

    #mesbox {
        display: flex;
        flex-direction: column;
    }

    #mesbox > div {
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;

    }

    #mesbox > div:last-child {
        margin-bottom: 200px;
    }

    .header-name {
        height: 50px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        padding: 5px;
    }

    .header-name:hover {
        cursor: pointer;
    }

    .others {
        align-self: flex-start;
        display: flex;
        flex-direction: column;
    }

    .others > div {
        align-self: flex-start;
    }

    .others .header-name {
        background: aquamarine;
    }

    .me {
        align-self: flex-end;
        display: flex;
        flex-direction: column;
    }

    .me .header-name {
        background: orangered;
    }

    .text-body {
        padding: 10px 50px;
        background: antiquewhite;
        border-radius: 20px;
    }

    .me > div {
        align-self: flex-end;
    }


    @media screen and (min-width: 780px) {
        .uppicturebox {
            width: 160px;
            height: 130px;
            margin-right: 32px;
            position: relative;
            transform: scale(0.3);
        }

        .uppicturebox:hover {
            transform: scale(1);
        }

        .zhizhao {
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
        }

        .uppicturebox img {
            width: 100%;
            height: 100%;
        }

        #mesbox {
            height: 70vh;
            /*overflow-y: scroll;*/
            overflow: auto;
        }

        .mes-img {
            width: 500px;
            height: 280px;
        }
    }

    @media screen and (max-width: 780px) {
        .uppicturebox {
            width: 100px;
            height: 100px;
            position: relative;
            transform: scale(0.3);
        }

        .uppicturebox:hover {
            transform: scale(1);
        }

        .zhizhao {
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
        }

        .uppicturebox img {
            width: 100%;
            height: 100%;
        }

        #mesbox {
            height: calc(100vh - 196px);
            overflow: auto;
        }

        .mes-img {
            width: 200px;
            height: 150px;
        }
    }

</style>