<template>
  <div class="app-container">
    <div class="app-container">
      <div class="header" style=" display: flex; justify-content: space-between; align-items: center;">
        <!-- 左侧部分，统计总数 -->
        <div style="width: 60%; display: flex; align-items: center;">
          <span>共 {{ total }} 个站点</span>
        </div>
        <!-- TODO：完成新增功能 -->
        <!-- 右侧部分，增加按钮-->
        <div @click="addSite">
          <template>
            <el-button type="danger" style="margin-right: 80px;">添加站点</el-button>
          </template>
        </div>
      </div>

      <div class="table">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <!-- *表头 -->
          <el-table-column
            prop="id"
            label="ID"
            width="60"
            sortable
          />
          <el-table-column
            prop="domain"
            label="域名"
          />
          <el-table-column
            prop="upstreamServer"
            label="上游服务器地址"
          />
          <el-table-column
            prop="comment"
            label="备注"
          />
          <el-table-column label="防护模式">
            <template #default="scope">
              <!-- * 使用 v-bind(:)表示将表达式‘1’作为JS表达式处理，因此会将数值作为属性传递 -->
              <el-switch
                v-model="scope.row.mode"
                active-color="green"
                inactive-color="brown"
                :active-value="1"
                :inactive-value="0"
                active-text="串行"
                inactive-text="并行"
                @change="handleProtectionMode(scope.row)"
              />
            </template>
          </el-table-column>
          <!-- TODO：站点操作 -->
          <el-table-column label="操 作" width="250%">
            <template #default="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编 辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-divider />
      <!-- * Footer -->
      <div style="margin: 10px 0;">

        <el-pagination
          layout="total"
          :total="total"
          style="text-align: center"
        />
        <el-dialog :visible.sync="dialogVisible" title="站点编辑" width="30%">
          <el-form
            ref="form"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
          >
            <el-form-item label="域名" prop="domain">
              <el-input v-model="ruleForm.domain" style="width: 80%" />
            </el-form-item>
            <el-form-item label="上游服务器地址" prop="upstreamServer">
              <el-input v-model="ruleForm.upstreamServer" style="width: 80%" />
            </el-form-item>
            <el-form-item label="防护模式" prop="mode">
              <el-radio v-model="ruleForm.mode" :label="1">串行</el-radio>
              <el-radio v-model="ruleForm.mode" :label="0">并行</el-radio>
            </el-form-item>
            <el-form-item label="备注" prop="comment">
              <el-input v-model="ruleForm.comment" type="textarea" style="width: 80%" />
            </el-form-item>
          </el-form>
          <div style="text-align: right; padding-right: 40px">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 认</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { validServer } from '@/utils/validate'

export default {
  name: 'SiteInfo',
  data() {
    const validateUpstreamServer = (rule, value, callback) => {
      if (!validServer(value)) {
        callback(new Error('服务器地址格式不正确'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      total: 0,
      tableData: [
        { id: 1, domain: 'hah', upstreamServer: 'http://192.168.2.122:5555', mode: 1, comment: '' },
        { id: 2, domain: 'hah', upstreamServer: 'http://192.168.2.122:5555', mode: 0, comment: '' },
        { id: 3, domain: 'hah', upstreamServer: 'http://192.168.2.122:5555', mode: 1, comment: '' },
        { id: 4, domain: 'hah', upstreamServer: 'http://192.168.2.122:5555', mode: 0, comment: '' },
        { id: 5, domain: 'hah', upstreamServer: 'http://192.168.2.122:5555', mode: 1, comment: '' }
      ],
      dialogVisible: false,
      ruleForm: {
        domain: '',
        upstreamServer: '',
        mode: null,
        comment: ''
      },
      rules: {
        upstreamServer: [
          { required: true, message: '请输入上游服务器地址', trigger: 'blur' },
          { validator: validateUpstreamServer, trigger: 'blur' }
        ],
        mode: [
          { required: true, message: '请选择防护模式', trigger: 'blur' }
        ]
      }

    }
  },
  mounted() {
    // this.acquireSiteInfo()
  },
  methods: {
    acquireSiteInfo() {
      this.loading = true
      this.$store.dispatch('scheduler/acquireSiteInfo')
        .then(response => {
          this.tableData = response.data
          this.total = length(response.data)
          this.loading = false
        })
        .catch(error => {
          this.$message.error('获取数据出错' || error.message)
        })
    },
    addSite() {
      // *新增之前清空 tableData
      Object.keys(this.ruleForm).forEach(key => {
        if (typeof (this.ruleForm[key]) === 'string') {
          this.ruleForm[key] = ''
        } else if (typeof (this.ruleForm[key]) === 'number') {
          this.ruleForm[key] = null
        }
      })
      this.dialogVisible = true
    },
    handleEdit(row) {
      const temp = JSON.parse(JSON.stringify(row))
      for (const key in temp) {
        this.ruleForm[key] = temp[key]
      }
      console.log(temp)
      this.dialogVisible = true
    },
    handleSave() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('waf/updateSiteInfo', this.ruleForm)
            .then(response => {
              this.$message({
                message: response.msg + ':' + response.status,
                type: 'success'
              })
              this.acquireSiteInfo()
            })
            .catch(error => {
              this.$message.error(error.msg || '保存网站信息失败')
            })
        } else {
          this.$message.error('表单无效')
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除该站点信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('scheduler/deleteSite', row.id)
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.acquireSiteInfo()
          })
          .catch(error => {
            this.$message.error('修改失败' | error.message)
          })
      })
        .catch(() => {})
    },
    handleProtectionMode(row) {
      const data = { id: row.id, mode: row.mode }
      this.$store.dispatch('scheduler/modifyProtectionMode', data)
        .then(() => {
          this.acquireSiteInfo()
        })
        .catch(error => {
          this.$message.error('修改失败' | error.message)
        })
    }
  }
}
</script>

<style>

</style>
