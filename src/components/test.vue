<template>
    <div id="test">
        <div>
            <b-input-group prepend="临时名字" append="">
                <b-form-input v-model="senderId"></b-form-input>
            </b-input-group>
            <b-input-group prepend="私聊对象名字" append="">
                <b-form-input v-model="receiverId"></b-form-input>
            </b-input-group>
            <b-input-group prepend="消息：" >
                <b-form-input v-model="newmes"></b-form-input>
            </b-input-group>
            <div>
                <b-button variant="success" @click="send">发送</b-button>
            </div>
            <div id="mesbox" rel="mesbox">
                <p v-for="key in messagecontent">{{key}}</p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "test",
        data(){
            return{
                senderId:"",
                receiverId:"",
                messagecontent:[],
                newmes:"",
                socket:null
            }
        },
        methods:{
            send(){
                if(this.socket.readyState == WebSocket.OPEN){
                    this.socket.send(this.senderId+','+this.receiverId+','+this.newmes);
                    // console.log(mesbox)
                }else{
                    alert("WebSocket连接没有建立成功！！");
                }
            }
        },
        created(){
            // var socket;
            if(!window.WebSocket){
                window.WebSocket = window.MozWebSocket;
            }
            const vm=this;
            if(window.WebSocket){
                this.socket = new WebSocket("ws://47.98.47.228:8888/websocket");
                this.socket.onmessage = function(event){
                    /*var ta = document.getElementById('responseContent');
                    var myMsg = document.getElementById('myMsg');
                    ta.value += myMsg.value+ "\r\n";
                    ta.value += event.data + "\r\n";*/
                    // console.log(event);
                    vm.messagecontent.push(event.data);
                    mesbox.scrollTop = mesbox.scrollHeight;
                };

                this.socket.onopen = function(event){
                    /*var ta = document.getElementById('responseContent');
                    ta.value = "你当前的浏览器支持WebSocket,请进行后续操作\r\n";*/
                };

                this.socket.onclose = function(event){
                    /* var ta = document.getElementById('responseContent');
                     ta.value = "";
                     ta.value = "WebSocket连接已经关闭\r\n";*/
                };
            }else{
                alert("您的浏览器不支持WebSocket");
            }
        }
    }
</script>

<style scoped>
#test{
    padding-top: 56px;
}
    #mesbox{
        height: 600px;
        overflow: auto;
        padding-bottom: 50px;
    }
</style>