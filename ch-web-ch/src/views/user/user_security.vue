<template>
  <div class="app-container calendar-list-container">
    
      <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="baseInfo.username" ></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="des">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="baseInfo.des">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">保 存</el-button>
      </div>

  </div>
</template>

<script>
import { fetchList, add, del, mod } from '@/api/sys/role_manage';

export default {
  name: 'user_base',
  data() {
    return {
      baseInfo: {
        username: 'username',
        nickname: 'nickname',
        email: 'email',
        qq: 'qq',
        weixin: 'wx',
        modifyTime: '2018.2.2',
        createTime: '2014.02.2',
        des: 'kkkk'
      },
      rules: {
        des: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ]
      },
    }
  },
}
</script>
