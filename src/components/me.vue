<template>
    <div id="me">
        <el-card class="box-card"
                 v-loading.fullscreen="loading"
                 element-loading-text="登录中，请稍后"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <div slot="header" class="clearfix">
                <span>{{this.$route.query.name}}的个人信息</span>
                <el-button style="float: right; padding: 3px 0" v-if="itIsMe" @click="changeUserDate" type="text">确认修改</el-button>
                <el-button style="float: right; padding: 3px 0" v-if="!itIsMe" v-show="iffriend" @click="chat" type="text">添加好友</el-button>
            </div>
            <div>
                <el-form ref="form" class="form" :model="form" label-width="80px">
                    <div class="uppicturebox">
                        <input type="file" class="zhizhao" id="zhizhao" name="zhizhao" :disabled="!itIsMe" @change="up" style="">
                        <img id="pto" style="" :src="form.image">
                    </div>
                    <el-form-item label="姓名">
                        <el-input v-model="form.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.gender" :disabled="!itIsMe">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="form.age" :disabled="!itIsMe"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" :disabled="!itIsMe"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.phone" :disabled="!itIsMe"></el-input>
                    </el-form-item>
                    <el-form-item label="修改密码"  v-if="itIsMe">
                        <el-button type="primary" icon="el-icon-edit" circle @click="showpassword"></el-button>
                    </el-form-item>
                    <el-form-item label="密码" v-show="ifpassword">
                        <el-input v-model="password" :disabled="!itIsMe"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "me",
        data() {
            return {
                usermes: JSON.parse(localStorage.getItem('user')),
                form: {},
                password:'',
                image: require("../assets/images/loading.gif"),
                itIsMe: false,
                ifpassword:false,
                loading: false
            }
        },
        computed: {
            state() {
                return this.$store.state
            },
            iffriend(){
                let friends=this.$store.state.user.friend.split('~');
                return !friends.includes(this.$route.query.name);
            }

        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                console.log(vm.$route.query.name);
                if (vm.$route.query.name === vm.$store.state.user.username) {
                    vm.itIsMe = true;
                    vm.form = vm.$store.state.user;
                    vm.form.gender = vm.$store.state.user.gender.toString();
                    console.log(vm.form)
                } else {
                    vm.itIsMe = false;
                    vm.axios.get(`zk/im/api/usermessage/selectUserByUserName?username=${vm.$route.query.name}`)
                        .then(re => {
                            console.log(re);
                            vm.form = re.data;
                            vm.form.gender = re.data.gender.toString();
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            })
        },
        methods: {
            changeUserDate() {
                this.loading=true;
                let data = this.form;
                if (this.ifpassword){
                    data.password=this.password;
                }
                this.axios.post('zk/im/api/usermessage/updateByPrimaryKey', data)
                    .then(re => {
                        if (re.data ===1){
                            this.loading=false;
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$router.go(-1);
                        } else {
                            this.loading=false;
                            this.$notify.error({
                                title: '错误',
                                message: '修改失败'
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading=false;
                        this.$notify.error({
                            title: '错误',
                            message: '修改失败'
                        });
                    })
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
                        console.log("压缩后", base64.length / 1024);
                        // _this.picture = e.target.result;
                        _this.form.image = base64;
                        // console.log(_this.image)
                    }

                }.bind(this);
                fr.readAsDataURL(file);
            },
            showpassword(){
                this.ifpassword=!this.ifpassword;
            },
            addfriends(){
                console.log(this.$store.state.user);
                let friend=this.$store.state.user.friend+'~'+this.$route.query.name;
                let data = this.$store.state.user;
                data.friend=friend;
                this.axios.post('zk/im/api/usermessage/updateByPrimaryKey', data)
                    .then(re => {
                        if (re.data ===1){
                            this.loading=false;
                            this.re();
                            this.$notify({
                                title: '成功',
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$router.go(-1);
                        } else {
                            this.loading=false;
                            this.$notify.error({
                                title: '错误',
                                message: '添加失败'
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading=false;
                        this.$notify.error({
                            title: '错误',
                            message: '添加失败'
                        });
                    })

            },
            re(){
                this.axios.get(`zk/im/api/usermessage/selectUserByUserName?username=${this.$store.state.user.username}`)
                    .then(re=>{
                        localStorage.setItem('user',re.data);
                        this.$store.commit('refresh');
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>
    #me {
        min-height: 100vh;
        padding-top: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547381146975&di=755d1603a8fb57581060f39407359c10&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F85%2F83%2F02%2F86358f75eaf0eac5bdac87b08451e9cf.jpg") no-repeat;
        background-size: 100% 100%;
        background-attachment: fixed;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 80vw;
    }

    .uppicturebox {
        width: 160px;
        height: 130px;
        margin: 0 auto;
        margin-bottom: 25px;
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
    .form{
        display: flex;
        flex-direction: column;
    }
</style>