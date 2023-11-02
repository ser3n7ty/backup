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
          <el-button type="danger" style="margin-right: 110px;">Betch Remove</el-button>
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
          prop="name"
          label="Name"
        />
        <el-table-column
          prop="ip"
          label="IP"
        />
        <el-table-column
          prop="port"
          label="Port"
        />
        <el-table-column
          prop="status"
          label="Status"
        />
        <el-table-column
          prop="description"
          label="Description"
        />
        <el-table-column label="Operations" width="240">
          <!-- scope 是一个用户访问表格数据的作用域对象 -->
          <template #default="scope">
            <!-- TODO:访问控制 -->
            <!-- 可编辑个人账号 -->
            <!-- 有且仅有管理员可删除账号 -->
            <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
            <el-popconfirm title="Sure to delete?" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button size="mini" type="danger">Delete</el-button>
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
          <el-form-item label="Name">
            <el-input v-model="form.name" style="width: 80%" />
          </el-form-item>
          <el-form-item label="IP">
            <el-input v-model="form.ip" style="width: 80%" />
          </el-form-item>
          <el-form-item label="Port">
            <el-input v-model="form.port" style="width: 80%" />
          </el-form-item>
          <el-form-item label="Status">
            <el-input v-model="form.status" style="width: 80%" />
          </el-form-item>
          <el-form-item label="Desc">
            <el-input v-model="form.description" style="width: 80%" />
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

export default {
  name: 'UserInfo',
  data() {
    return {
      // TODO: 需要进行代码重构
      // 用于验证身份
      userInfo: '',
      search: '',
      // 部署后修改为 true
      loading: false,
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        { id: 1, name: 'hah', ip: '192.168.2.1', port: 8899, status: 'alive', description: 'there are some thing...' }
      ],
      ids: [],
      form: {
        // name: '',
        // ip: '',
        // port: '',
        // status: '',
        // description: ''
      }
    }
  },
  // 用于判断身份
  created() {
    const userStr = sessionStorage.getItem('userInfo') || '{}'
    this.userInfo = JSON.parse(userStr)
  },
  methods: {
    load() {
      this.loading = true
      this.$store
        .dispatch('waf/query', this.currentPage, this.pageSize, this.search)
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
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
      // console.log('edit', this.dialogVisible)
      // console.log(this.form.name, this.form.ip, this.form.port, this.form.status, this.form.description)
    },
    save() {
      this.$store
        .dispatch('waf/update', this.form)
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
      this.$store.commit('waf/deleteWaf', id)
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

