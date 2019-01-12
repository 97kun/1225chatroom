<template>
    <div>
        <form id="login" @submit.prevent="submit"
              v-loading.fullscreen="loading"
              element-loading-text="登录中，请稍后"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <div>
                <label for="username">用户名:</label>
                <input type="text" id="username" required placeholder="请输入用户名" v-model="username">
            </div>
            <div>
                <label for="password">密码:</label>
                <input type="password" id="password" required placeholder="请输登录入密码" v-model="password">
            </div>
            <div class="code" @click="refreshCode">
                <sidentify :identifyCode="identifyCode" class="cav"></sidentify>
            </div>
            <div>
                <label for="yzm">验证码:</label>
                <input type="text" id="yzm" required placeholder="请输入验证码" v-model="yzm">
            </div>
            <button type="submit">提交</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: '',
                identifyCodes: "1234567890",
                identifyCode: "",
                yzm: "",
                loading: false
            }
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        computed: {
            // 三个框都有值时允许button被点击
            /* allow: function () {
                 return (!(this.username && this.password && this.yzm));
             }*/
        }
        ,
        methods: {
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
                // console.log(this.identifyCode);
            },
            submit(e) {
                e.preventDefault();
                if (this.yzm !== this.identifyCode) {
                    this.open7();
                } else {
                    this.loading = true;
                    let params = new URLSearchParams();
                    params.append('username', this.username);
                    params.append('password', this.password)
                    this.axios.post(`zk/im/api/usermessage/selectUser`, params)
                        .then(re => {
                            this.loading = false;
                            // console.log(re);
                            if (!!re.data) {
                                localStorage.setItem('user', JSON.stringify(re.data));
                                this.$store.state.user = re.data;
                                this.$store.state.logined = true;
                                this.open3();
                                this.$router.push({path: "/"})
                            } else {
                                this.open4();
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            this.loading = false;
                            this.open6();
                        })
                }
            },
            open3() {
                this.$notify({
                    title: '成功',
                    message: '登录成功',
                    type: 'success'
                });
            },
            open4() {
                this.$notify({
                    title: '警告',
                    message: '用户名或密码错误',
                    type: 'warning'
                });
            },
            open6() {
                this.$notify.error({
                    title: '错误',
                    message: '登录失败'
                });
            },
            open7() {
                this.$notify({
                    title: '警告',
                    message: '验证码错误',
                    type: 'warning'
                });
            },

        }
    }
</script>

<style scoped>
    #login {
        height: 100%;
        background: rgba(255, 255, 255, 0.6);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #login > div {
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

    button {
        width: 430px;
        height: 40px;
        border: 0;
        outline: none;
        background: #504c65;
        color: #ffffff;
        font-size: 18px;
    }

    button[disabled]:hover {
        cursor: not-allowed;
    }

    .cav {
        height: 60px;
    }
</style>