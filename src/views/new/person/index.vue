<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="120px"
    >
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="ruleForm.username"
          placeholder="请输入真实姓名"
        />
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="ruleForm.email"
          placeholder="请输入邮箱"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input
          ref="password"
          :key="passwordType"
          v-model="ruleForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          auto-complete="off"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btnGroup">
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >注 册
        </el-button>
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import { validPwd } from '@/utils/validate'

export default {
  name: 'RegisterUser',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('email format is not correct'))
      } else {
        callback()
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (!validPwd(value)) {
        callback(new Error('upper and lower case letters and numbers, 8-16 digits'))
      } else {
        callback()
      }
    }

    return {
      ruleForm: {
        username: '',
        email: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户真实姓名' },
          { min: 2, message: '名字不得少于2个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePwd, trigger: 'blur' },
          { required: true, message: '请输入密码' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' },
          { required: true, message: '请输入邮箱' }
        ]
      },
      passwordType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      console.log(this.$refs.pwd)
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    submitForm(form) {
      console.log(this.$refs[form])
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$loading = true
          this.$store
            .dispatch('user/register', this.ruleForm)
            .then(() => {
              this.$loading = false
              this.$message({
                message: '成功注册！',
                type: 'success'
              })
            })
            .catch((err) => {
              this.$message({
                message: err,
                type: 'error'
              })
            })
          this.$refs[form].resetFields()
        } else {
          this.$message({
            message: 'Something error!',
            type: 'warning'
          })
          return false
        }
      })
    },
    resetForm(form) {
      this.$refs[form].resetFields()
      this.ruleForm.password = ''
      this.$message({
        message: '重置成功!',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.app-container {
  display: grid;
  place-items: center;
  height: 80vh;
}
.show-pwd {
  position: absolute;
  right: 10px;
  font-size: 14px;
}

.el-input{
  width: 375px;
}
</style>
