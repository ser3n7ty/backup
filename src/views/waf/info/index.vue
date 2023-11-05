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
          width="75"
          sortable
        />
        <el-table-column
          prop="name"
          label="名 字"
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
          prop="description"
          label="描述信息"
          width="250%"
        />
        <el-table-column
          prop="status"
          label="运行状态"
        >
          <template #default="scope">
            <div>
              <span :class="{'status-badge-active': scope.row.status === 1, 'status-badge-inactive': scope.row.status === 0}" />
              {{ scope.row.status === 1 ? '正常运行' : '已停止' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="enable"
          label="启用状态"
        >
          <template #default="scope">
            <div>
              <span :class="{'status-badge-active': scope.row.enable === 1, 'status-badge-inactive': scope.row.enable === 0}" />
              {{ scope.row.enable === 1 ? '已启用' : '已停用' }}
            </div>
          </template>
        </el-table-column>

        <!-- TODO: 样式设置 -->
        <el-table-column label="操 作" width="250%">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编 辑</el-button>
            <el-button size="mini" @click="changeEnable(scope.row.id)">停用</el-button>
            <el-popconfirm style="margin: 10px" title="确认删除吗？" @confirm="handleDelete(scope.row.id)">
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
      />

      <el-dialog :visible.sync="dialogVisible" title="Update" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="名字">
            <el-input v-model="form.name" style="width: 80%" />
          </el-form-item>
          <el-form-item label="IP地址">
            <el-input v-model="form.ip" style="width: 80%" />
          </el-form-item>
          <el-form-item label="端口">
            <el-input v-model="form.port" style="width: 80%" />
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="form.status" style="width: 80%" />
          </el-form-item>
          <el-form-item label="描述信息">
            <el-input v-model="form.description" type="textarea" style="width: 80%" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 认</el-button>
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
        { id: 1, name: 'hah', ip: '192.168.2.1', port: 8899, enable: 0, status: 1, description: 'there are some thing...' },
        { id: 2, name: 'hah', ip: '192.168.2.1', port: 8899, enable: 1, status: 1, description: 'there are some thing...' },
        { id: 3, name: 'hah', ip: '192.168.2.1', port: 8899, enable: 1, status: 0, description: 'there are some thing...' },
        { id: 4, name: 'hah', ip: '192.168.2.1', port: 8899, enable: 0, status: 0, description: 'there are some thing...' }
      ],
      ids: [],
      form: {
      }
    }
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
      this.temp = JSON.parse(JSON.stringify(row))
      this.form = this.temp
      this.dialogVisible = true
      console.log(this.dialogVisible)
    },
    save() {
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
    },
    changeEnable(id) {
      const enable = this.enable === 1 ? 0 : 1
      this.$store
        .dispatch('waf/changeEnable', id, enable)
        .then((res) => {
          if (res.status === 'success') {
            this.$message({
              message: enable === 1 ? '成功启用' : '成功停用',
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

