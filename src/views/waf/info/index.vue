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
      <div @click="deleteBatch">
        <template>
          <el-button type="danger" style="margin-right: 80px;">批量删除</el-button>
        </template>
      </div>
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
        <!-- *展开行 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="Waf 名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="类型">
                <span>{{ wafType(props.row) }}</span>
              </el-form-item>
              <el-form-item label="IP 地址">
                <span>{{ props.row.ip }}</span>
              </el-form-item>
              <el-form-item label="镜像名称">
                <span>{{ props.row.image_name }}</span>
              </el-form-item>
              <el-form-item label="端口">
                <span>{{ props.row.port }}</span>
              </el-form-item>
              <el-form-item label="CPU 占用">
                <span>{{ props.row.cpu }}%</span>
              </el-form-item>
              <el-form-item label="运行状态">
                <span>{{ wafType(props.row) }}</span>
              </el-form-item>
              <el-form-item label="内存占用">
                <span>{{ props.row.mem }} MB</span>
              </el-form-item>
              <el-form-item label="权值">
                <span>{{ props.row.weight }}</span>
              </el-form-item>
              <el-form-item label="描述信息">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- *表头 -->
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
          width="130"
        />
        <el-table-column
          prop="ip"
          label="IP 地址"
          width="150"
        />
        <el-table-column
          prop="port"
          label="端 口"
          width="80"
        />
        <el-table-column
          prop="cpu"
          label="CPU 占用"
        >
          <template #default="scope">
            <span> {{ scope.row.cpu }}%</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="mem"
          label="内存占用"
        >
          <template #default="scope">
            <span> {{ scope.row.mem }} MB</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
        >
          <template #default="scope">
            <div>
              <span>{{ wafType(scope.row) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="image_name"
          label="镜像名称"
        />
        <el-table-column
          prop="status"
          label="运行状态"
          width="140"
        >
          <template #default="scope">
            <div>
              <span
                :class="{
                  'online': scope.row.status === 0,
                  'offline': scope.row.status === 1,
                  'abnormal': ![0, 1].includes(scope.row.status)
                }"
              > {{ wafStatus(scope.row) }}
              </span></div>
          </template>
        </el-table-column>

        <el-table-column label="操 作" width="250%">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编 辑</el-button>
            <el-button v-show="scope.row.status == 1" size="mini" @click="changeWafStatus('0')">上线</el-button>
            <el-button v-show="scope.row.status == 0" size="mini" @click="changeWafStatus('1')">下线</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- * Footer -->
    <div style="margin: 10px 0;">

      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="text-align: center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <el-dialog :visible.sync="dialogVisible" title="修改信息" width="30%">
        <el-form
          ref="form"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="名字" prop="name">
            <el-input v-model="ruleForm.name" style="width: 80%" />
          </el-form-item>
          <el-form-item label="IP地址" prop="ip">
            <el-input v-model="ruleForm.ip" style="width: 80%" />
          </el-form-item>
          <el-form-item label="端口" prop="port">
            <el-input v-model="ruleForm.port" style="width: 80%" />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-radio v-model="ruleForm.type" label="0">Docker</el-radio>
            <el-radio v-model="ruleForm.type" label="1">软件 Waf</el-radio>
            <el-radio v-model="ruleForm.type" label="2">其他</el-radio>
          </el-form-item>
          <el-form-item v-if="editImageName" label="镜像名称" prop="image_name">
            <el-input v-model="ruleForm.image_name" style="width: 80%" />
          </el-form-item>
          <el-form-item label="描述信息" prop="description">
            <el-input v-model="ruleForm.description" type="textarea" style="width: 80%" />
          </el-form-item>
        </el-form>
        <div style="text-align: right; padding-right: 40px">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSave">确 认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { validIP } from '@/utils/validate'
export default {
  name: 'WafInfo',
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
      search: '',
      // TODO：部署后修改为 true
      loading: false,
      dialogVisible: false,
      editImageName: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [
        { id: 1, name: '长亭雷池WAF', ip: '192.168.102.195', port: 8899, status: 0, configUrl: 'localhost', weight: 9, cpu: '15.12', mem: '55.222', type: 0, image_name: 'hahha', createTime: '2023-11-03 21:47:46', description: 'there are some thing...' },
        { id: 2, name: '这是5个字', ip: '192.168.2.1', port: 8899, status: 1, configUrl: 'localhost', weight: 9, cpu: '15.12', mem: '55.222', type: 1, image_name: 'hahha', createTime: '2023-11-03 21:47:46', description: 'there are some thing...' },
        { id: 3, name: '很长长长的名字', ip: '192.168.2.1', port: 8899, status: 2, configUrl: 'localhost', weight: 7, cpu: '15.12', mem: '55.222', type: 2, image_name: 'hahha', createTime: '2023-11-03 21:47:46', description: 'there are some thing...' },
        { id: 4, name: 'hah', ip: '192.168.2.1', port: 8899, status: 2, configUrl: 'localhost', weight: 8, cpu: '15.12', mem: '55.222', type: 0, image_name: 'hahha', createTime: '2023-11-03 21:47:46', description: 'there are some thing...' }
      ],
      ids: [],
      ruleForm: {
        name: '',
        ip: '',
        port: '',
        type: '',
        image_name: '',
        configUrl: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请输入 Waf 的 IP 地址', validator: validateIP, trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入端口', validator: validatePort, trigger: 'blur' }
        ],
        configUrl: [
          { required: true, message: '请输入第三方配置地址', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择 Waf 类型' }
        ],
        description: [
          { message: '请输入该 Waf 的描述信息', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    wafStatus() {
      // 通过 Map 方法遍历 tableData 中的每一行数据
      // 并根据 type 属性的值返回相应的字符串
      // 最终得到一个包含了所有类型对应字符串的数组
      // return this.tableData.map(row => {
      //   if (row.status === 0) {
      //     return '已上线'
      //   } else if (row.status === 1) {
      //     return '已下线'
      //   } else {
      //     return '异常'
      //   }
      return row => {
        if (row.status === 0) {
          return '已上线'
        } else if (row.status === 1) {
          return '已下线'
        } else {
          return '异常'
        }
      }
    },
    wafType() {
      return row => {
        if (row.type === 0) {
          return 'Docker'
        } else if (row.status === 1) {
          return '软件 Waf'
        } else {
          return '其他'
        }
      }
    }
  },
  watch: {
    'ruleForm.type': function(newVal) {
      if (newVal === '0') {
        this.editImageName = true
      } else {
        this.editImageName = false
      }
    }
  },
  methods: {
    load() {
      this.loading = true
      this.$store
        .dispatch('waf/queryWafInfo', this.currentPage, this.pageSize, this.search)
        .then((data) => {
          this.loading = false
          this.tableData = data.list
          this.total = data.total
          this.search = ''
        })
        .catch(error => {
          this.$message({
            message: error.message || '页面加载出错',
            type: 'error'
          })
        })
    },
    handleEdit(row) {
      const temp = JSON.parse(JSON.stringify(row))
      for (const key in temp) {
        if (key !== 'id' && key !== 'status' && key !== 'type') {
          this.ruleForm[key] = temp[key]
        }
      }
      this.dialogVisible = true
    },
    handleSave() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('waf/updateWafInfo', this.ruleForm)
            .then(response => {
              this.$message({
                message: response.msg + ':' + response.status,
                type: 'success'
              })
            })
            .catch(error => {
              this.$message({
                message: error.msg || '保存信息失败',
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
    // op 为 0 表示上线， 1 表示下线
    changeWafStatus(id, op) {
      this.$store
        .dispatch({ type: 'waf/changeWafStatus', id: id, op: op })
        .then(response => {
          this.$message({
            message: response.msg + ':' + response.status,
            type: 'success'
          })
          // 更新完成后刷新页面
          this.load()
        })
        .catch(error => {
          this.$message({
            message: error.message || '更新 Waf 状态出错',
            type: 'error'
          })
        })
    },
    handleDelete(id) {
      this.$store
        .dispatch('waf/deleteWaf', id)
        .then((response) => {
          this.$message({
            message: response.msg + ':' + response.status,
            type: 'success'
          })
        })
        .catch(error => {
          this.$message({
            message: error.msg || '移除 Waf 失败',
            type: 'error'
          })
        })
    },
    deleteBatch() {
      this.ids.forEach(id => {
        this.handleDelete(id)
      })
    },
    //* 处理页面变化
    handleSelectionChange(val) {
      this.ids = val.map(v => v.id)
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
.online {
  background-color: green;
  color: white; /* 文字颜色 */
  padding: 3px 5px; /* 调整内边距以获得所需的样式 */
  border-radius: 5px; /* 圆角边框 */
}
.offline {
  background-color: blue;
  color: white;
  padding: 3px 5px;
  border-radius: 5px;
}

.abnormal{
  background-color: red;
  color: white;
  padding: 3px 5px;
  border-radius: 5px;
}
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

