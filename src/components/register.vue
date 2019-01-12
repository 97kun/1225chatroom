<template>
    <form id="register" ref="register" @submit.prevent="submit"
          v-loading.fullscreen="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
        <div>
            <label for="reusername">用户名:</label>
            <input type="text" id="reusername" name="reusername" v-model="reusername" required placeholder="请输入用户名">
        </div>
        <div>
            <label for="repassword">密码:</label>
            <input type="password" id="repassword" v-model="repassword" name="repassword" required
                   placeholder="请输入注册密码">
        </div>
        <div>
            <label for="makesure">确认密码:</label>
            <input type="password" id="makesure" v-model="makesure" name="makesure" required placeholder="请输确认入密码">
        </div>
        <div class="uppicturebox">
            <input type="file" class="zhizhao" id="zhizhao" name="zhizhao" @change="up" style="">
            <img id="pto" style="" :src="image">
        </div>
        <button type="submit" id="submitbutton">提交</button>
    </form>
</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                // picture: require("../assets/images/loading.gif"),
                repassword: "",
                makesure: "",
                image: require("../assets/images/loading.gif"),
                reusername: '',
                loading: false
            }
        },
        mounted() {

        },
        methods: {
            submit() {
                if (this.repassword === this.makesure) {
                    let data = {
                        username: this.reusername,
                        password: this.repassword,
                        image: this.image
                    };
                    data.admin = 0;
                    this.loading = true;
                    this.axios.post('zk/im/api/usermessage/insert', data)
                        .then(re => {
                            this.loading = false;
                        })
                        .catch(error => {
                            console.log(error);
                            this.loading = false;
                        })
                } else {
                    alert("两次输入密码不同")
                }
            },
            up(e) {
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
                            // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
                            while (base64.length / 1024 > 150) {
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
                        // console.log("压缩后", base64.length / 1024);
                        // _this.picture = e.target.result;
                        _this.image = e.target.result;
                        // console.log(_this.image)
                    }

                }.bind(this);
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