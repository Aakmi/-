<template>
    <div class="login-container">
        <div class="login-box">
            <!--头像区域-->
            <div class="touxiang-box">
                <img src="../assets/touxiang.jpg">
            </div>
            <!--表单区域-->
            <!--用户名-->
            <el-form ref="loginformref" class="login-form" :model="loginform" :rules="rules">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user" v-model="loginform.username"></el-input>
                </el-form-item>

                <!--密码-->
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" v-model="loginform.password" show-password></el-input>
                </el-form-item>

                <!--按钮区域-->
                <el-form-item class="buttons">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetloginform">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            loginform: {
                username: 'admin',
                password: '123456'
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
                ],

            }
        }

    },
    methods: {
        resetloginform() {
            this.$refs.loginformref.resetFields();

        },
        login() {
            this.$refs.loginformref.validate(async valid => {
                if (!valid) return;
                const { data: res } = await this.$http.post('login', this.loginform);
                if (res.meta.status !== 200) return this.$message.error("登录失败");
                this.$message.success("登录成功");


                window.sessionStorage.setItem("token", res.data.token);
                this.$router.push("/home")
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.login-container {
    background-color: #2b4b6b;
    height: 100%;
}

.login-box {
    height: 300px;
    width: 450px;
    background-color: white;
    border-radius: 3px;
    position: absolute; //实现垂直居中
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .touxiang-box {
        height: 130px;
        width: 130px;
        border: 1px solid white;
        padding: 10px;
        border-radius: 50%;

        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;



        img {
            height: 100%;
            width: 100%;
            border-radius: 50%;


        }
    }

}

.login-form {

    position: absolute;
    bottom: 0;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;


}

.buttons {
    display: flex;
    justify-content: flex-end;
}
</style>