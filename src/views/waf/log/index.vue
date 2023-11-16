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
    </div>
    <!-- TODO: 点击某一行，通过 uuid 查询更多详细信息 -->
    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="id"
          label="ID"
          width="80"
        />
        <el-table-column
          prop="sourceip"
          label="源 IP"
        />
        <!-- <el-table-column
          prop="url"
          label="源地址"
        /> -->
        <el-table-column
          prop="method"
          label="请求方法"
        >
          <template slot-scope="scope">
            <div>
              <span
                :class="{
                  'method-badge-get': scope.row.method === 'get',
                  'method-badge-post': scope.row.method === 'post',
                  'method-badge-put': scope.row.method === 'put',
                  'method-badge-delete': scope.row.method === 'delete',
                  'method-badge-default': !['get', 'post', 'put', 'delete'].includes(scope.row.method)
                }"
              >{{ scope.row.method }} </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="请求发起时间"
        />
        <el-table-column
          prop="time"
          label="处理时间"
        >
          <template slot-scope="scope">
            {{ scope.row.time }} ms
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="响应状态"
          width="180"
        >
          <template slot-scope="scope">
            <div>
              <span :class="{'status-badge-release': scope.row.status === '0', 'status-badge-intercept': scope.row.status === '1'}" />
              {{ scope.row.status === '0' ? '放行' : '拦截' }}
            </div>
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

    </div>
  </div>
</template>

<script>

export default {
  name: 'UserInfo',
  data() {
    return {
      // 上线部署为 true
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        { id: 1, method: 'put', sourceip: '192.168.1.2', startTime: '2023-11-02T15:25:24', time: 5726, status: '0' },
        { id: 2, method: 'get', sourceip: '192.168.1.2', startTime: '2023-11-02T15:25:24', time: 4575, status: '1' },
        { id: 3, method: 'post', sourceip: '192.168.1.2', startTime: '2023-11-02T15:25:24', time: 4254, status: '0' },
        { id: 4, method: 'delete', sourceip: '192.168.1.2', startTime: '2023-11-02T15:25:24', time: 3457, status: '0' }
      ]
    }
  },
  methods: {
    load() {
      this.loading = true
      this.$store
        .dispatch('waf/queryWafLog', this.currentPage, this.pageSize, this.search)
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
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.load()
    }
  }
}
</script>

<style scoped>
.status-badge-release {
  width: 10px; /* 小色块的宽度 */
  height: 10px; /* 小色块的高度 */
  display: inline-block; /* 行内块元素，以确保文字和小色块在同一行 */
  background-color: green; /* 已启用的小色块颜色 */
  margin-right: 5px; /* 用于分隔小色块和文字的间距 */
}

.status-badge-intercept {
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
.method-badge-get {
  background-color: green;
  color: white; /* 文字颜色 */
  padding: 3px 5px; /* 调整内边距以获得所需的样式 */
  border-radius: 5px; /* 圆角边框 */
}

.method-badge-post {
  background-color: blue;
  color: white;
  padding: 3px 5px;
  border-radius: 5px;
}

.method-badge-put {
  background-color: orange;
  color: white;
  padding: 3px 5px;
  border-radius: 5px;
}

.method-badge-delete {
  background-color: red;
  color: white;
  padding: 3px 5px;
  border-radius: 5px;
}

.method-badge-default {
  background-color: gray;
  color: white;
  padding: 3px 5px;
  border-radius: 5px;
}

</style>

