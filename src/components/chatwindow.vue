<template>
    <div id="chatwindow">
        <div>
            <!--<b-input-group prepend="临时名字" append="">
                <b-form-input v-model="senderId"></b-form-input>
            </b-input-group>-->
            <div id="mesbox" rel="mesbox">
                <el-scrollbar style="height: 100%">
                    <div v-for="key in messagecontent">
                        <div></div>
                        <div>
                            <p></p>
                            <p>{{key}}</p>
                        </div>
                    </div>
                </el-scrollbar>

            </div>
            <!--<b-input-group prepend="私聊对象名字" append="">
                <b-form-input v-model="receiverId"></b-form-input>
            </b-input-group>-->
            <!--<b-input-group prepend="消息：">
                <b-form-input v-model="newmes"></b-form-input>
            </b-input-group>-->
            <b-input-group prepend="" @keyup.enter="send">
                <b-form-input v-model="newmes"></b-form-input>
                <b-input-group-append>
                    <b-btn variant="outline-success" @click="send">发送</b-btn>
                </b-input-group-append>
            </b-input-group>
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
                socket: null
            }
        },
        methods: {
            send() {
                console.log(this.messagecontent)
                if (this.socket.readyState === WebSocket.OPEN) {
                    console.log(window.location.hash.split('#')[2]);
                    var reg = /煞笔|傻逼|沙比/ig;//正则表达式，第一个参数是目标对象，第二个参数g,表示全部替换。
                    var aftermes = this.newmes.replace(reg, "**");
                    let data = `${aftermes}|${window.location.hash.split('#')[2]}`;
                    this.socket.send(this.$store.state.user.username + ',' + this.receiverId + ',' + data);
                    this.newmes = "";
                    // console.log(mesbox)
                } else {
                    alert("WebSocket连接没有建立成功！！");
                }
            }
        },
        created() {
            // var socket;
            if (!window.WebSocket) {
                window.WebSocket = window.MozWebSocket;
            }
            const vm = this;
            if (window.WebSocket) {
                this.socket = new WebSocket("ws://47.98.47.228:8000/websocket");
                this.socket.onmessage = function (event) {
                    /*var ta = document.getElementById('responseContent');
                    var myMsg = document.getElementById('myMsg');
                    ta.value += myMsg.value+ "\r\n";
                    ta.value += event.data + "\r\n";*/
                    console.log(event)
                    let r = /(用户)|(群发了一条消息)/igm;
                    let getaftermes = event.data.replace(r, '');
                    console.log(event)
                    if (getaftermes.split('|')[1] === window.location.hash.split('#')[2]) {
                        vm.messagecontent.push(getaftermes.split('|')[0]);
                    }
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
<style>
    .el-scrollbar__thumb{
        background: red;
        animation: mymovescr 1s infinite;
    }
    @keyframes mymovescr {
        0%{transform: scale(0.5)}
        100%{transform: scale(1)}
    }
</style>
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

    @media screen and (min-width: 780px) {
        #mesbox {
            height: 80vh;
            /*overflow-y: scroll;*/
            padding-bottom: 50px;
            overflow: hidden;
        }
    }

    @media screen and (max-width: 780px) {
        #mesbox {
            height: 85vh;
            overflow: auto;
            padding-bottom: 50px;
        }
    }

</style>