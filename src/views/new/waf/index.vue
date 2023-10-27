<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="120px"
    >
      <!-- Waf 名字 -->
      <el-form-item label="Waf name" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="enter the name"
        />
      </el-form-item>
      <!-- IP 信息 -->
      <el-form-item label="Waf IP" prop="ip">
        <el-input
          v-model="ruleForm.ip"
          placeholder="enter the ip"
        />
      </el-form-item>
      <!-- 端口信息 -->
      <el-form-item label="Waf Port" prop="port">
        <el-input
          v-model="ruleForm.port"
          placeholder="enter the port"
        />
      </el-form-item>
      <!-- 管理信息 -->
      <el-form-item label="Link" prop="link">
        <el-input
          v-model="ruleForm.link"
          placeholder="enter the web admin address for the current waf"
        />
      </el-form-item>
      <!-- 描述信息 -->
      <el-form-item
        label="Waf Desc"
        desc-quot-
        prop="description"
      >
        <el-input
          v-model="ruleForm.description"
          placeholder="enter the desc of the waf"
        />
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btnGroup">
        <el-button
          type="primary"
          rule-form-
          @click="submitForm('ruleForm')"
        >Import
        </el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validIP } from '@/utils/validate'

export default {
  name: 'NewWaf',
  data() {
    // TODO: 完成 Waf 导入信息的验证
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('name could not be empty'))
      } else {
        callback()
      }
    }
    const validateIP = (rule, value, callback) => {
      // console.log('ip', value)
      if (value === '') {
        callback(new Error('ip could not be empty'))
      } else if (!validIP(value)) {
        callback(new Error('ip format is not correct'))
      } else {
        callback()
      }
    }
    const validatePort = (rule, value, callback) => {
      // console.log(value, typeof (value))
      // console.log(Number(value), typeof (Number(value)))
      if (value === '') {
        callback(new Error('port could not be empty'))
      } else if (Number(value) <= 0 || Number(value) > 65535) {
        callback(new Error('port is not correct'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        // 后端请求自动生成
        // id: '',
        name: '',
        ip: '',
        port: '',
        // link 和 description 可以为空，但是不能都为空
        link: '',
        description: ''
      },
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        ip: [
          { validator: validateIP, trigger: 'blur' }
        ],
        port: [
          { validator: validatePort, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        console.log('submit')
        if (this.ruleForm.description === '' && this.ruleForm.link === '') {
          this.$message({
            message: 'link and desc can not both be empty',
            type: 'error'
          })
          return false
        }
        // TODO:发送表单给后端
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
      this.$refs[form].resetFields()
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
.el-input {
  width: 375px;
}
</style>
