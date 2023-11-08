<template>
  <div class="app-container">
    <!--  功能区域 -->
    <div style="margin: 10px 0" />
    <!-- 搜索框 -->
    <div class="search" style="margin: 10px 0; display: flex; justify-content: space-between; align-items: center;">
      <!-- 左侧部分，搜索框和查询按钮 -->
      <div style="width: 60%; display: flex; align-items: center;">
        <el-input v-model="search" placeholder="输入要查找的内容" style="width: 60%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="load">搜 索</el-button>
      </div>

      <!-- 右侧部分，批量删除按钮 -->
      <el-popconfirm title="确定删除吗？" @confirm="deleteBatch">
        <template #reference>
          <el-button type="danger" style="margin-right: 80px;">批量删除</el-button>
        </template>
      </el-popconfirm>
    </div>

    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- 表头 -->
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="id"
          label="ID"
          width="60"
          sortable
        />
        <el-table-column
          prop="name"
          label="名 字"
          width="70"
        />
        <el-table-column
          prop="ip"
          label="IP 地址"
        />
        <el-table-column
          prop="port"
          label="端 口"
          width="80"
        />
        <el-table-column
          prop="startTime"
          label="开始时间"
        />
        <el-table-column
          prop="time"
          label="运行时间"
          width="80"
        />
        <!-- TODO: 设置 SPA 的链接跳转 -->
        <el-table-column
          prop="configUrl"
          label="配置地址"
        />
        <el-table-column
          prop="description"
          label="描述信息"
        />
        <el-table-column
          prop="status"
          label="运行状态"
          width="120"
        >
          <template #default="scope">
            <div>
              <span :class="{'status-badge-active': scope.row.status === '0', 'status-badge-inactive': scope.row.status === '1'}" />
              {{ scope.row.status === '0' ? '正常运行' : '已停止' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="enable"
          label="启用状态"
          width="120"
        >
          <template slot-scope="scope">
            <div>
              <span :class="{'status-badge-active': scope.row.enable === '0', 'status-badge-inactive': scope.row.enable === '1'}" />
              {{ scope.row.enable === '0' ? '已启用' : '已停用' }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操 作" width="250%">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编 辑</el-button>
            <el-button size="mini" @click="changeEnable">{{ scope.row.enable === '0' ? '下线' : '上线' }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin: 10px 0">

      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <el-dialog :visible.sync="dialogVisible" title="修改信息" width="30%">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="名字" prop="name">
            <el-input v-model="form.name" style="width: 80%" />
          </el-form-item>
          <el-form-item label="IP地址" prop="ip">
            <el-input v-model="form.ip" style="width: 80%" />
          </el-form-item>
          <el-form-item label="端口" prop="port">
            <el-input v-model="form.port" style="width: 80%" />
          </el-form-item>
          <el-form-item label="配置信息" prop="configUrl">
            <el-input v-model="form.configUrl" style="width: 80%" />
          </el-form-item>
          <el-form-item label="描述信息" prop="description">
            <el-input v-model="form.description" type="textarea" style="width: 80%" />
          </el-form-item>
        </el-form>
        <div style="text-align: right; padding-right: 40px">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { validIP } from '@/utils/validate'

export default {
  name: 'UserInfo',
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
      enable: '',
      status: '',
      search: '',
      // 部署后修改为 true
      loading: false,
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        { id: 1, name: 'hah', ip: '192.168.2.1', port: 8899, enable: '0', status: '1', configUrl: 'localhost', startTime: '2023-11-03T21:47:46', time: 584, description: 'there are some thing...' },
        { id: 2, name: 'hah', ip: '192.168.2.1', port: 8899, enable: '1', status: '1', configUrl: 'localhost', startTime: '2023-11-03T21:47:46', time: 584, description: 'there are some thing...' },
        { id: 3, name: 'hah', ip: '192.168.2.1', port: 8899, enable: '1', status: '0', configUrl: 'localhost', startTime: '2023-11-03T21:47:46', time: 584, description: 'there are some thing...' },
        { id: 4, name: 'hah', ip: '192.168.2.1', port: 8899, enable: '0', status: '0', configUrl: 'localhost', startTime: '2023-11-03T21:47:46', time: 584, description: 'there are some thing...' }
      ],
      ids: [],
      form: {
        name: '',
        ip: '',
        port: '',
        configUrl: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入 waf 名字', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请输入 waf 的 IP 地址', validator: validateIP, trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入 waf 的端口', validator: validatePort, trigger: 'blur' }
        ],
        configUrl: [
          { required: true, message: '请输入第三方配置地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    load() {
      this.loading = true
      this.$store
        .dispatch('waf/queryWafInfo', this.currentPage, this.pageSize, this.search)
        .then((res) => {
          if (res.status === 'success') {
            this.loading = false
            this.tableData = res.data.list
            this.total = res.data.total
            this.search = ''
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(() => {
          this.$message({
            message: 'Something error',
            type: 'error'
          })
        })
    },
    handleEdit(row) {
      const temp = JSON.parse(JSON.stringify(row))
      for (const key in temp) {
        if (key !== 'id' && key !== 'enable' && key !== 'status') {
          console.log(key)
          this.form[key] = temp[key]
        }
      }
      this.dialogVisible = true
    },
    save() {
      console.log(this.$refs['form'])
      this.$refs['form'].validate((valid) => {
        console.log('表单有效')
        if (valid) {
          this.$store
            .dispatch('waf/updateWaf', this.form)
            .then((res) => {
              if (res.status !== 'success') {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
            })
            .catch(() => {
              this.$message({
                message: 'Something error',
                type: 'error'
              })
            })
        } else {
          this.$message({
            message: '表单无效',
            type: 'error'
          })
        }
      })
    },
    // op 为 0 启用，为 1 停用
    changeEnable(id, enable) {
      const op = enable === '0' ? '1' : '0'
      this.$store
        .dispatch({ type: 'waf/changeEnable', id: id, enable: op })
        .then((res) => {
          if (res.status === 'success') {
            this.$message({
              message: op === '0' ? '成功启用' : '成功停用',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch((err) => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
    },
    handleSelectionChange(val) {
      this.ids = val.map(v => v.id)
    },
    handleDelete(id) {
      console.log('Delete waf')
      this.$store.dispatch('waf/deleteWaf', id)
        .then((res) => {
          if (res.status !== 'success') {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
        .catch(() => {
          this.$message({
            message: 'Something error',
            type: 'error'
          })
        })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.load()
    },
    deleteBatch() {
      this.ids.forEach(id => {
        this.handleDelete(id)
      })
    }
  }
}
</script>

<style scoped>
.status-badge-active {
  width: 10px; /* 小色块的宽度 */
  height: 10px; /* 小色块的高度 */
  display: inline-block; /* 行内块元素，以确保文字和小色块在同一行 */
  background-color: green; /* 已启用的小色块颜色 */
  margin-right: 5px; /* 用于分隔小色块和文字的间距 */
}

.status-badge-inactive {
  width: 10px;
  height: 10px;
  display: inline-block;
  background-color: red; /* 已停用的小色块颜色 */
  margin-right: 5px;
}
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

