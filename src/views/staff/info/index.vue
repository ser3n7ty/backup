<template>
  <div class="app-container">
    <!--  功能区域 -->
    <div style="margin: 10px 0" />
    <!-- 搜索框 -->
    <div class="search" style="margin: 10px 0; display: flex; justify-content: space-between; align-items: center;">
      <!-- 左侧部分，搜索框和查询按钮 -->
      <div style="width: 60%; display: flex; align-items: center;">
        <el-input v-model="search" placeholder="input the key word" style="width: 60%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="load">search</el-button>
      </div>

      <!-- 右侧部分，批量删除按钮 -->
      <el-popconfirm title="确定删除吗？" @confirm="deleteBatch">
        <template #reference>
          <el-button type="danger" style="margin-right: 110px;">批量删除</el-button>
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
          sortable
        />
        <el-table-column
          prop="username"
          label="username"
        />
        <el-table-column
          prop="email"
          label="email"
        />
        <el-table-column
          prop="role"
          label="role"
        />
        <el-table-column
          prop="permission"
          label="permission"
        />
        <el-table-column label="Operations" width="240">
          <!-- scope 是一个用户访问表格数据的作用域对象 -->
          <template #default="scope">
            <!-- TODO:访问控制 -->
            <!-- 可编辑个人账号 -->
            <!-- 有且仅有管理员可删除账号 -->
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button size="mini" type="danger">删除</el-button>
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
      <el-dialog v-model="dialogVisible" title="Update" width="30%">
        <el-form :model="form" label-width="120px">

          <el-form-item label="username">
            <el-input v-model="form.username" style="width: 80%" />
          </el-form-item>
          <el-form-item label="email">
            <el-input v-model="form.email" style="width: 80%" />
          </el-form-item>
          <el-form-item label="password">
            <el-input
              v-model="form.password"
              style="width: 80%"
              :type="passwordType"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="save">Confirm</el-button>
          </span>
        </template>
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
      // TODO: 需要进行代码重构
      userInfo: '',
      form: {
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
      passwordType: 'password',
      search: '',
      // 部署后修改为 true
      loading: false,
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        { id: 1, username: 'admin', email: 'test@example.com', role: 'admin', permission: 'all things' },
        { id: 1, username: 'admin', email: 'test@example.com', role: 'admin', permission: 'all things' },
        { id: 1, username: 'admin', email: 'test@example.com', role: 'admin', permission: 'all things' },
        { id: 1, username: 'admin', email: 'test@example.com', role: 'admin', permission: 'all things' },
        { id: 1, username: 'admin', email: 'test@example.com', role: 'admin', permission: 'all things' },
        { id: 1, username: 'admin', email: 'test@example.com', role: 'admin', permission: 'all things' }
      ],
      ids: []
    }
  },
  created() {
    const userStr = sessionStorage.getItem('userInfo') || '{}'
    this.userInfo = JSON.parse(userStr)
    // TODO: ？请求服务端，判断当前登录用户的合法性
  },
  methods: {
    // 刷新页面数据
    // 提供搜索功能，当 search 为空时，返回当前 page 大小为 size 的 info
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
    handleEdit(row) {

    },
    save() {
      this.$store
        .dispatch('user/update', this.form)
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

