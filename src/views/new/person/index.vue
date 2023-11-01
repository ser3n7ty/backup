<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="120px"
    >
      <!-- 用户名 -->
      <el-form-item label="User name" prop="username">
        <el-input
          v-model="ruleForm.username"
          placeholder="please enter the real name"
        />
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="User email" prop="email">
        <el-input
          v-model="ruleForm.email"
          placeholder="please enter the real email"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="User password" prop="password">
        <el-input
          ref="password"
          :key="passwordType"
          v-model="ruleForm.password"
          :type="passwordType"
          placeholder="enter the password"
          auto-complete="off"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <!-- TODO：发送验证验证码 -->
      <!-- 按钮 -->
      <el-form-item class="btnGroup">
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >Create
        </el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
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
    const validateName = (rule, value, callback) => {
      console.log('validName' + value)
      if (value === '') {
        callback(new Error('username could not be empty'))
      } else if (value.length <= 1) {
        callback(new Error('more than one character'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      console.log('validEmail' + value)
      if (value === '') {
        callback(new Error('email could not be empty'))
      } else if (!validEmail(value)) {
        callback(new Error('email format is not correct'))
      } else {
        callback()
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('pwd could not be empty'))
      } else if (!validPwd(value)) {
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
          { validator: validateName, trigger: 'blur' },
          { min: 2, message: 'more than one character', trigger: 'blur' }
        ],
        password: [{ validator: validatePwd, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }]
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
      this.$refs[form].validate((valid) => {
        // TODO:发送表单给后端
        if (valid) {
          this.$message({
            message: 'Successfully submit!',
            type: 'success'
          })
          // this.$loading = true
          // this.$store
          //   .dispatch('user/register', this.ruleForm)
          //   .then(() => {
          //     this.$loading = false
          //   })
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
        message: 'Successfully reset!',
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
