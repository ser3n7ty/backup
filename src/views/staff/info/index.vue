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
      <el-popconfirm title="Sure to remove?" @confirm="deleteBatch">
        <template #reference>
          <el-button type="danger" style="margin-right: 50px;">批量删除</el-button>
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
          width="75"
          sortable
        />
        <el-table-column
          prop="username"
          label="用 户 名"
        />
        <el-table-column
          prop="email"
          label="邮 箱"
        />
        <el-table-column
          prop="role"
          label="职 能"
        />
        <el-table-column
          prop="permission"
          label="权 限"
        />
        <el-table-column label="操 作" width="300">
          <!-- scope 是一个用户访问表格数据的作用域对象 -->
          <template #default="scope">
            <el-button size="mini" @click="handleEditInfo(scope.row)">编辑信息</el-button>
            <el-button size="mini" @click="handleEditPwd(scope.row)">修改密码</el-button>
            <el-popconfirm style="margin: 10px" title="确认删除？" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button size="mini" type="danger">删 除</el-button>
              </template>
            </el-popconfirm>
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
      <el-dialog :visible.sync="infoDialogVisible" title="修改基本信息" width="30%">
        <el-form :model="infoForm" label-width="120px">

          <el-form-item label="Username">
            <el-input v-model="infoForm.username" style="width: 80%" />
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="infoForm.email" style="width: 80%" />
          </el-form-item>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="infoDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 认</el-button>
            </span>
          </template>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import { validPwd } from '@/utils/validate'

export default {
  name: 'UserInfo',
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
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        { id: 1, username: 'admin', email: 'test@example.com', role: 'admin', permission: 'all things' },
        { id: 1, username: 'admin', email: 'test@example.com', role: 'admin', permission: 'all things' }
      ],
      ids: [],

      infoForm: {
      },
      rules: {
        username: [
          { validator: validateName, trigger: 'blur' },
          { min: 2, message: 'more than one character', trigger: 'blur' }
        ],
        password: [{ validator: validatePwd, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }]
      },
      passwordType: 'password',

      // 部署后修改为 true
      loading: false,
      infoDialogVisible: false,
      pwdDialogVisible: false

    }
  },
  methods: {
    load() {
      this.loading = true
      this.$store
        .dispatch('user/query', this.currentPage, this.pageSize, this.search)
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
    // TODO：更新用户信息
    handleEditInfo(row) {
      this.infoForm = JSON.parse(JSON.stringify(row))
      this.infoDialogVisible = true
    },
    handleEditPwd(row) {

    },
    // 提交用户信息的更新表单
    // 根据参数区别不同的表单信息
    save(form) {
      this.$store
        .dispatch('user/updateInfo', form)
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
    handleSelectionChange(val) {
      this.ids = val.map(v => v.id)
    },
    handleDelete(id) {
      this.$store.commit('user/deleteUser', id)
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
</style>

