<template>
  <div class="app-container">
    <!--  功能区域 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="通用" name="general">
        <el-card class="box-card">
          <div slot="header" class="number">
            <span>拟态Waf 执行体数量</span>
            <div class="block">
              <el-slider
                v-model="selectedValue"
                :step="1"
                :min="1"
                :max="6"
                show-stops
                show-input
              />
            </div>
            <el-alert
              title="修改执行体最大上线数量之后在下方需要手动指定最大数量的 waf 上线"
              type="info"
              show-icon
              center
            />
            <el-divider />
            <div class="shuttle">
              <!-- * value: 右侧数据源，data: 左侧数据源 -->
              <el-transfer
                v-model="value"
                :titles="['未上线 Waf', '已上线 Waf']"
                :data="data"
                :button-texts="['下线', '上线']"
                @change="handleChange"
              />
            </div>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="其他" name="upload">
        <span>其他</span>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>

export default {
  name: 'ProtectionConfiguration',
  data() {
    return {
      // value: 1,
      onlineNumber: 4,
      selectedValue: this.onlineNumber,
      activeName: 'general',
      wafData: [
        { id: 1, name: '长亭雷池Waf', status: 1 },
        { id: 2, name: 'Openresty', status: 0 },
        { id: 3, name: 'X-waf', status: 0 },
        { id: 4, name: 'NAXSI', status: 1 },
        { id: 5, name: 'httpwaf', status: 0 },
        { id: 6, name: 'coraza', status: 2 },
        { id: 7, name: 'hah', status: 1 },
        { id: 8, name: 'VeryNginx', status: 2 },
        { id: 9, name: 'NGX_WAF', status: 0 }
      ],
      data: [],
      value: []
    }
  },
  mounted() {
    this.getWafInfo()
  },
  methods: {
    getWafInfo() {
      // this.$store.dispatch('scheduler/getSchedulerWafInfo')
      //   .then(response => {
      //     this.wafData = response.data
      //     this.onlineNumber = this.wafData.filter(item => item.status === 1).length
      //   })
      //   .catch(error => {
      //     this.$message.error('获取信息失败' | error.message)
      //   })
      this.data = this.gainOfflineData()
      this.value = this.gainOnlineData()
      console.log(this.data)
      console.log(this.value)
    },

    gainOfflineData() {
      return this.wafData.map(item => ({
        key: item.id,
        label: item.id + '.' + item.name,
        disabled: item.status === 2
      }))
    },

    gainOnlineData() {
      return this.wafData.filter(item => item.status === 1).map(item => item.id)
    },

    handleChange(newTargetKeys) {
      const maxRightItems = this.onlineNumber
      // 当右侧选中项数量超过最大限制时，只保留最前面的 maxRightItems 个选项
      if (newTargetKeys.length >= maxRightItems) {
        const exceededItems = newTargetKeys.slice(maxRightItems)
        if (newTargetKeys.length > maxRightItems) {
          this.value = this.value.filter(item => !exceededItems.includes(item))
          this.$message({
            message: '上线 Waf 已达最大数量',
            type: 'warning'
          })
        }
        this.$store.dispatch('scheduler/modifyOnlineWaf', this.value)
          .then(() => {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
          })
          .catch(error => {
            this.$message.error('更新失败' | error.message)
          })
      }
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}
.el-slider {
  width: 80%;
  margin: 0 auto
}
 /* 调整穿梭框宽度 */
.el-transfer {
  width: 80%; /* 设置穿梭框宽度为80% */
  margin: 0 auto; /* 穿梭框居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-alert {
  width: 40%;
  margin: 0 auto; /* 穿梭框居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

