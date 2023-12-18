<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="120px"
    >
      <!-- Waf 名字 -->
      <el-form-item label="名字" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入 waf 名字"
        />
      </el-form-item>
      <!-- IP 信息 -->
      <el-form-item label="IP 地址" prop="ip">
        <el-input
          v-model="ruleForm.ip"
          placeholder="输入 waf 的 IP 地址"
        />
      </el-form-item>
      <!-- 端口信息 -->
      <el-form-item label="端口" prop="port">
        <el-input
          v-model="ruleForm.port"
          placeholder="请输入 waf 开放的端口信息"
        />
      </el-form-item>
      <!-- 端口信息 -->
      <el-form-item label="配置地址" prop="configUrl">
        <el-input
          v-model="ruleForm.configUrl"
          placeholder="请输入 waf 配置的 url 链接"
        />
      </el-form-item>
      <!-- 描述信息 -->
      <el-form-item
        v-model="ruleForm.description"
        placeholder="请输入 waf 的描述信息"
        label="描述信息"
      >
        <el-input
          v-model="ruleForm.description"
          placeholder="请输入与 waf 有关的管理信息"
          type="textarea"
        />
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btnGroup">
        <el-button
          type="primary"
          rule-form-
          @click="submitForm('ruleForm')"
        >导 入
        </el-button>
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validIP } from '@/utils/validate'
// TODO: 添加新的导入方式：直接写入镜像名，通过后端启动服务
export default {
  name: 'ImportWaf',
  data() {
    const validateIP = (rule, value, callback) => {
      if (!validIP(value)) {
        callback(new Error('ip format is not correct'))
      } else {
        callback()
      }
    }
    const validatePort = (rule, value, callback) => {
      if (Number(value) <= 0 || Number(value) > 65535) {
        callback(new Error('port is not correct'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        ip: '',
        port: '',
        configUrl: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入 Waf 名字', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请输入 Waf 的 IP 地址', trigger: 'blur' },
          { validator: validateIP, trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入 Waf 的端口', validator: validatePort, trigger: 'blur' }
        ],
        configUrl: [
          { required: true, message: '请输入第三方配置地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(form) {
      console.log(this.$refs[form])
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$loading = true
          this.$store
            .dispatch('waf/addWaf', this.ruleForm)
            .then(() => {
              this.loading = false
            })
            .catch((err) => {
              this.loading = false
              this.$message({
                message: err,
                type: 'error'
              })
            })
          this.$refs[form].resetFields()
        } else {
          this.$message({
            message: '表单无效',
            type: 'error'
          })
          return false
        }
      })
    },
    resetForm(form) {
      this.$refs[form].resetFields()
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
.el-input {
  width: 375px
}
</style>
