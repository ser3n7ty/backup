<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../..//public/me.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <div @click="visible = true">
            <el-dropdown-item divided>
              <span style="display:block;">修改密码</span>
            </el-dropdown-item>
          </div>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">注销</span>
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
      <div class="pop">
        <el-dialog :visible.sync="visible" title="修改用户密码" width="30%">
          <el-form ref="form" :rules="rule" :model="form" label-width="120px">
            <div class="pwdInput">
              <el-form-item label="旧密码" prop="oldPwd">
                <el-input
                  v-model="form.oldPwd"
                  placeholder="请输入当前用户的现有密码"
                  style="width: 80%; position: relative"
                  tabindex="2"
                />
              </el-form-item>
              <el-form-item label="新密码" prop="newPwd">
                <el-input
                  v-model="form.newPwd"
                  placeholder="请输入用户新密码"
                  style="width: 80%; position: relative"
                  tabindex="2"
                />
              </el-form-item>
            </div>
            <div style="text-align: right; padding-right: 40px">
              <el-button @click="visible = false">取 消</el-button>
              <el-button type="primary" @click="handleSubmitPwd">确 认</el-button>
            </div>
          </el-form>
        </el-dialog>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { validPwd } from '@/utils/validate'

export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const validatePwd = (rule, value, callback) => {
      if (!validPwd(value)) {
        callback(new Error('密码格式不正确，请输入长度为8-16位的同时包含大小写字母和特殊符号(不包含空格的密码'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      name: '',
      email: '',
      roles: '',
      permissions: '',
      form: {
        oldPwd: '',
        newPwd: ''
      },
      rule: {
        oldPwd: [
          { required: true, message: '请输入现有的用户密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePwd, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleSubmitPwd() {
      console.log('修改密码')
      this.$store.dispatch('user/')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
