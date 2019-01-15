<template>
    <div id="autotalk">
        <div>
            <div id="mesbox" ref="mesbox">
                <div v-for="item in messagecontent" :class="{'me':item.name==='我','others':item.name!=='我'}">
                    <div class="header-name">{{item.name}}</div>
                    <div class="text-body">
                        {{item.text}}
                    </div>
                </div>
            </div>
            <div class="inputbox">
                <b-input-group prepend="" @keyup.enter="send">
                    <b-form-input v-model="newmes"></b-form-input>
                    <b-input-group-append>
                        <b-btn variant="outline-success" @click="send">发送</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </div>
        </div>
    </div>
</template>

<script>
    import autotalklist from '../../xjson/autotalk.json';

    export default {
        name: "autotalk",
        data() {
            return {
                messagecontent: [],
                newmes: "",
            }
        },
        methods: {
            send() {
                let content = {
                    name: '我',
                    text: this.newmes
                };
                this.messagecontent.push(content);
                let getmes;
                let ran;
                if (this.newmes.length < 2) {
                    getmes = {
                        content: '多说几句话，太短了'
                    }
                } else {
                    let re0 = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
                    console.log(re0.test(this.newmes));
                    if (re0.test(this.newmes)) {
                        let re = new RegExp(this.newmes + "+", "i");
                        let jieguo = autotalklist.filter(function (x) {
                            return x.content.match(re)
                        });
                        if (jieguo.length < 1) {
                            getmes = {
                                content: '你在说啥子'
                            }
                        } else {
                            ran = ~~(Math.random() * jieguo.length);
                            getmes = jieguo[ran];
                        }
                    } else {
                        getmes = {
                            content: '你在说啥子'
                        }
                    }
                }
                let randomtime = Math.random() * 2000 + 1000;
                setTimeout(() => {
                    this.messagecontent.push({
                        name: 'AI',
                        text: getmes.content
                    });
                    mesbox.scrollTop = mesbox.scrollHeight + 150;
                }, randomtime);
                this.newmes = '';
                mesbox.scrollTop = mesbox.scrollHeight + 150;
            }
        },
        created() {
            console.log(autotalklist)
        }
    }
</script>

<style scoped>
    @import "../animatecss/animation.css";

    #autotalk {
        padding-top: 56px;
        display: flex;
        align-items: center;
        justify-content: center;

    }


    #autotalk > div {
        width: 1000px;
        /*overflow: hidden;*/
    }


    #mesbox {
        display: flex;
        flex-direction: column;
        /*padding-bottom: 150px;*/
        overflow-x: hidden;
    }


    #mesbox > div {
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;
        animation: jello 1s;
    }

    #mesbox > div:last-child {
        margin-bottom: 200px;
    }

    .header-name {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        padding: 5px;
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


        .uppicturebox img {
            width: 100%;
            height: 100%;
        }

        #mesbox {
            height: 70vh;
        }

        .mes-img {
            width: 500px;
            height: 280px;
        }
    }

    @media screen and (max-width: 780px) {

        #mesbox {
            height: calc(100vh - 196px);
            font-size: 1rem;
        }

        .mes-img {
            width: 200px;
            height: 150px;
        }

        .inputbox {
            width: 100%;
            position: fixed;
            bottom: 0;
        }
    }
</style>