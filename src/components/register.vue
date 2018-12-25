<template>
    <form id="register" ref="register" @submit.prevent="submit">
        <div>
            <label for="reusername">用户名:</label>
            <input type="text" id="reusername" name="reusername" required placeholder="请输入用户名">
        </div>
        <div>
            <label for="repassword">密码:</label>
            <input type="password" id="repassword" v-model="repassword" name="repassword" required placeholder="请输入注册密码">
        </div>
        <div>
            <label for="makesure">确认密码:</label>
            <input type="password" id="makesure" v-model="makesure" name="makesure" required placeholder="请输确认入密码">
        </div>
        <div class="uppicturebox">
            <input type="file" class="zhizhao" id="zhizhao" name="zhizhao" @change="up" style="">
            <img id="pto" style="" :src="picture">
        </div>
        <button type="submit" id="submitbutton">提交</button>
    </form>
</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                picture: require("../assets/images/loading.gif"),
                repassword:"",
                makesure:""
            }
        },
        methods: {
            submit() {
                if (this.repassword==this.makesure){
                    var formdata=new FormData(register);
                    for (let key of formdata.entries() ){
                        console.log(key)
                    };
                    fetch("https://wd1843699377fzpwpa.wilddogio.com/form.json",
                        {
                            method:"POST",
                            body:"0.0",
                            headers:{
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }
                    ).catch(error=>console.log(error))
                }else {
                    alert("两次输入密码不同")
                }
            },
            up(e) {
                var file = e.target.files[0];
                var fr = new FileReader(file);
                fr.onloadend = function (e) {
                    console.log(e.target.result)
                    this.picture = e.target.result;

                }.bind(this)
                fr.readAsDataURL(file);
            }
        }
    }
</script>

<style scoped>
    #register {
        height: 100%;
        background: rgba(255, 255, 255, 0.6);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #register > div {
        background: rgba(0, 0, 0, 0.6);
        margin: 5px 0;
    }

    input {
        width: 330px;
        height: 40px;
        border: 0;
        background: transparent;
        /*border-bottom: 1px solid skyblue;*/
        outline: none;
        color: white;
        padding-left: 15px;
        font-size: 16px;
    }

    label {
        width: 100px;
        text-align: right;
        padding-right: 15px;
        color: lightgoldenrodyellow;
    }

    #submitbutton {
        width: 430px;
        height: 40px;
        border: 0;
        outline: none;
        background: #504c65;
        color: #ffffff;
        font-size: 18px;
    }

    .uppicturebox {
        width: 160px;
        height: 130px;
        margin-right: 32px;
        position: relative;
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

    button[disabled]:hover {
        cursor: not-allowed;
    }
</style>