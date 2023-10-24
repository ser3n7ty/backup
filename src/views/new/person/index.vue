<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="120px"
    >
      <!-- 用户名 -->
      <el-form-item label="User name" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="please enter the real name"
        />
      </el-form-item>
      <!-- TODO：添加邮箱，验证 -->
      <el-form-item label="User email" prop="email">
        <el-input
          v-model="ruleForm.email"
          placeholder="please enter the real email"
        />
      </el-form-item>
      <!-- 用户密码 -->
      <!-- TODO：规定密码格式，超时或失去焦点时判断是否合法 -->
      <el-form-item label="User pwd" prop="pwd">
        <el-input
          ref="pwd"
          :key="passwordType"
          v-model="ruleForm.pwd"
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
      <!--      &lt;!&ndash; !可设置多个管理员账号 &ndash;&gt;-->
      <!--      <el-form-item ref="identity" label="Identity" prop="identity">-->
      <!--        <el-radio-group v-model="ruleForm.identity">-->
      <!--          <el-radio label="Admin" />-->
      <!--          <el-radio label="Common" />-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->
      <!-- TODO：增加验证 -->
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
export default {
  name: 'RegisterUser',
  data() {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('username could not be empty'))
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('email could not be empty'))
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('pwd could not be empty'))
      } else {
        callback()
      }
    }
    // function validateIdentity(rule, value, callback) {
    //   console.log('验证身份')
    //   if (value !== 'Admin' && value !== 'Common') {
    //     callback(new Error('identity must be valid'))
    //   } else {
    //     callback()
    //   }
    // }

    return {
      ruleForm: {
        name: '',
        email: '',
        pwd: ''
        // 默认创建普通用户，由后端添加字段
        // identity: 'Common'
      },
      rules: {
        name: [{ validator: validateName, trigger: 'blur' }],
        // TODO:完善密码验证逻辑
        pwd: [{ validator: validatePwd, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }]
        // identity: [{ validator: validateIdentity, trigger: 'blur' }]
      },
      passwordType: 'password'
    }
  },
  // TODO：保留操作记录
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
      console.log('Submit form')
      console.log(this.$refs[form])
      this.$refs[form].validate((valid) => {
        // 发送表单给后端
        if (valid) {
          this.$message({
            message: 'Successfully submit!',
            type: 'success'
          })
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
      console.log(this.ruleForm)
      this.$refs[form].resetFields()
      this.ruleForm.pwd = ''
      this.ruleForm.identity = ''
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

.el-input {
  width: 300px;
}
</style>
