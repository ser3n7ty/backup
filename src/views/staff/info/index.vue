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
      <el-popconfirm title="确定删除?" @confirm="deleteBatch">
        <template #reference>
          <el-button type="danger" style="margin-right: 50px;">批量删除</el-button>
        </template>
      </el-popconfirm>
    </div>

    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
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
          <template #default="scope">
            <el-button size="mini" @click="handleEditInfo(scope.row)">编辑信息</el-button>
            <!-- <el-button size="mini" @click="handleEditPwd(scope.row)">修改密码</el-button> -->
            <el-button size="mini" type="danger" @click="Delete(scope.row)">删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-divider />

    <div style="text-align: center">
      <el-pagination
        layout="total"
        :total="total"
      />
      <el-dialog :visible.sync="infoDialogVisible" title="修改基本信息" width="30%">
        <el-form ref="infoForm" :rules="infoRule" :model="infoForm" label-width="120px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="infoForm.username" style="width: 80%" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="infoForm.email" style="width: 80%" />
          </el-form-item>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="infoDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 认</el-button>
            </span>
          </template>
          <div style="text-align: right; padding-right: 40px">
            <el-button @click="infoDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmitInfo">确 认</el-button>
          </div>
        </el-form>
      </el-dialog>

      <!--  <el-dialog :visible.sync="pwdDialogVisible" title="修改用户密码" width="30%">
        <el-form ref="pwdForm" :rules="pwdRule" :model="pwdForm" label-width="120px">
          <div class="pwdInput">
            <el-form-item label="新密码" prop="password">
              <el-input
                ref="password"
                v-model="pwdForm.password"
                :type="passwordType"
                placeholder="请输入当前用户的新密码"
                style="width: 80%;position: relative"
                tabindex="2"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                  style="position: absolute; right: 80px; top: 50%; transform: translateY(-50%) "
                />
              </span>
            </el-form-item>
          </div>
          <div style="text-align: right; padding-right: 40px">
            <el-button @click="pwdDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmitPwd">确 认</el-button>
          </div>
        </el-form>
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
// import { validPwd } from '@/utils/validate'

export default {
  name: 'UserInfo',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('email format is not correct'))
      } else {
        callback()
      }
    }
    // const validatePwd = (rule, value, callback) => {
    //   if (!validPwd(value)) {
    //     callback(new Error('password format is not correct'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      total: 0,
      search: '',
      tableData: [
        { id: 1, username: 'admin', email: 'test@example.com', role: 'admin', permission: 'all things' },
        { id: 2, username: 'admin', email: 'test@example.com', role: 'admin', permission: 'all things' }
      ],
      ids: [],

      infoForm: {
        username: '',
        email: ''
      },
      infoRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'string', min: 2, message: '用户名不少于 1 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, message: '邮箱格式不正确', trigger: 'blur' }
        ]
      },
      // pwdForm: {
      //   password: ''
      // },
      // pwdRule: {
      //   password: [
      //     { required: true, message: '请输入密码', trigger: 'blur' },
      //     { validator: validatePwd, trigger: 'blur' }
      //   ]
      // },
      // passwordType: 'password',
      loading: false,
      infoDialogVisible: false
      // pwdDialogVisible: false

    }
  },
  methods: {
    load() {
      this.loading = true
      this.$store
        .dispatch({
          type: 'user/query',
          search: this.search
        })
        .then((res) => {
          if (res.status === 'success') {
            this.loading = false
            this.tableData = res.data.list
            this.total = res.data.total
            this.search = ''
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error('Error: ' + error)
        })
    },
    handleEditInfo(row) {
      const temp = JSON.parse(JSON.stringify(row))
      for (const key in temp) {
        if (key !== 'id' && key !== 'role' && key !== 'permission') {
          this.infoForm[key] = temp[key]
        }
      }
      this.infoDialogVisible = true
    },
    // handleEditPwd(row) {
    //   this.pwdDialogVisible = true
    // },
    handleSubmitInfo() {
      console.log(this.$refs['infoForm'])
      this.$refs['infoForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/updateInfo', this.infoForm)
            .then(response => {
              if (response.code === 200) {
                this.infoDialogVisible = false
              }
            })
            .catch(error => {
              this.$message.error(error)
            })
        }
      })
    },
    // handleSubmitPwd() {
    //   this.$refs['pwdForm'].validate((valid) => {
    //     if (valid) {
    //       this.$store.dispatch('user/changePassword', this.pwdForm)
    //         .then(response => {
    //           if (response.code === 200) {
    //             this.pwdDialogVisible = false
    //           }
    //         })
    //         .catch(error => {
    //           this.$message.error(error)
    //         })
    //     }
    //   })
    // },
    // showPwd() {
    //   if (this.passwordType === 'password') {
    //     this.passwordType = ''
    //   } else {
    //     this.passwordType = 'password'
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.password.focus()
    //   })
    // },
    handleSelectionChange(val) {
      this.ids = val.map(v => v.id)
    },
    Delete(row) {
      this.handleDelete(row.id)
      this.load()
    },
    handleDelete(id) {
      this.$store.dispatch('user/deleteUser', id)
        .then((res) => {
          if (res.status !== 'success') {
            this.$message.error(res.msg)
          }
        })
        .catch((error) => {
          this.$message.error(error)
        })
    },
    deleteBatch() {
      this.ids.forEach(id => {
        this.handleDelete(id)
      })
      this.load()
    }
  }
}
</script>

<style scoped>
</style>

