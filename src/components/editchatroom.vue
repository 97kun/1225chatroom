<template>
    <div id="editchatroom">
        <div class="formbox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="聊天室名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="聊天室类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择聊天室类型">
                        <el-option label="娱乐" value="娱乐"></el-option>
                        <el-option label="动漫" value="动漫"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签" prop="labels">
                    <el-checkbox-group v-model="ruleForm.labels">
                        <el-checkbox label="奋青" name="type"></el-checkbox>
                        <el-checkbox label="努力" name="type"></el-checkbox>
                        <el-checkbox label="吃瓜群" name="type"></el-checkbox>
                        <el-checkbox label="破案群" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="群描述" prop="describe">
                    <el-input type="textarea" v-model="ruleForm.describe"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'editchatroom',
        data() {
            return {
                ruleForm: {
                    name: '',
                    type: '',
                    labels: '',
                    describe: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 1 到 40 个字符', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择聊天室类型', trigger: 'change'}
                    ],
                    labels: [
                        {type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change'}
                    ],
                    describe: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            resetdata(re){
                console.log(!!re.data);
                if (!!re.data){
                    this.ruleForm=re.data
                } else {
                    this.ruleForm={
                        name: '',
                        type: '',
                        labels: '',
                        describe: ''
                    };
                }
            }
        },
        created(){
          this.resetdata(this.$route.query)
        },
        watch:{
            '$route'(to,from){
                if (to.path==='/Editchatroom'){
                    this.resetdata(to.query)
                }
            }
        }
    }
</script>
<style scoped>
    #editchatroom {
        padding-top: 90px;
        height: 100%;
    }

    .formbox {
        max-width: 800px;
        margin: 0 auto;
    }
</style>