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
      <div>
        <template>
          <el-button type="primary" style="margin-right: 70px;" @click="importImage">导入镜像</el-button>
          <!-- <el-button type="danger" style="margin-right: 70px;" @click="deleteBatch">批量删除</el-button> -->
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
        <el-table-column
          prop="id"
          label="ID"
          width="60"
        />
        <el-table-column
          prop="name"
          label="镜像名称"
        />
        <el-table-column
          prop="tag"
          label="镜像标签"
        />
        <el-table-column
          prop="imageId"
          label="镜像uuid"
        />
        <el-table-column
          prop="createTime"
          label="导入时间"
        />
        <el-table-column
          prop="updateTime"
          label="修改时间"
        />
        <el-table-column label="操 作" width="250%">
          <template #default="scope">
            <el-button size="mini" type="primary" @click="createContainer(scope.row.imageId)">创建实例</el-button>
            <el-button size="mini" type="danger" @click="deleteImage(scope.row.id)">移除镜像</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        layout="total"
        :total="total"
        style="text-align: center"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'ImageInfo',
  data() {
    return {
      // 上线部署为 true
      search: null,
      loading: false,
      total: 0,
      tableData: [
        { id: 1, name: 'image', tag: '1.0', imageId: '78854555', createTime: '111', updateTime: '222' },
        { id: 2, name: 'image', tag: '1.0', imageId: '78854555', createTime: '', updateTime: '' }
      ]
    }
  },
  created() {
  },
  methods: {
    load() {
      this.loading = true
      this.$store
        .dispatch('waf/queryImage', this.search)
        .then((res) => {
          this.tableData = res
        })
        .catch((err) => {
          this.$message({
            message: 'Error:' + err,
            type: 'error'
          })
        })
    },
    createContainer(imageId) {
      this.$store
        .dispatch('waf/createContainer', imageId)
        .then(response => {
          this.$message({
            message: response.msg + ':' + response.status,
            type: 'success'
          })
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
    },
    deleteImage(id) {
      this.$store
        .dispatch('waf/deleteImage', id)
        .then(response => {
          this.$message({
            message: response.msg + ':' + response.status,
            type: 'success'
          })
          // 移除镜像之后重新加载
          this.load()
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
    },
    importImage() {
    }
    // deleteBatch() {
    //   console.log('批量删除')
    // }
  }
}
</script>

<style scoped>
.status-badge-release {
  width: 10px; /* 小色块的宽度 */
  height: 10px; /* 小色块的高度 */
  display: inline-block; /* 行内块元素，以确保文字和小色块在同一行 */
  background-color: rgb(72, 179, 72); /* 已启用的小色块颜色 */
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
  background-color: rgb(255, 0, 0);
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

