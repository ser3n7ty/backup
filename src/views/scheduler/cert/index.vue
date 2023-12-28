<template>
  <div class="app-container">
    <!--  功能区域 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="证书" name="cert">
        <div class="overview">
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
            <el-table-column label="操 作" width="250%">
              <template #default="scope">
                <el-button size="mini" type="primary" @click="createContainer(scope.row.imageId)">创建实例</el-button>
                <el-button size="mini" type="danger" @click="deleteImage(scope.row.id)">移除镜像</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-divider />
        <div class="footer">
          <el-pagination
            layout="total"
            :total="total"
            style="text-align: center"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="上传证书" name="upload">
        <!-- TODO: 修改为自定义的上传方法 -->
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text" style="text-align: center">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip" style="text-align: center">上传.cert文件和</div>
        </el-upload>
      </el-tab-pane>
    </el-tabs>

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
      activeName: 'overview',
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
          this.tableData = res.data
          this.total = length(res.data)
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
    }
  }
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px; /* 设置上传区域高度 */
}

.upload-demo {
  height: 50%;
  width: 100%; /* 设置上传区域宽度 */
  text-align: center;
}

.el-upload__text em {
  color: #409EFF; /* 设置强调文字颜色 */
  font-style: normal; /* 设置强调文字为正常样式 */
}
</style>

