<template>
  <div class="app-container calendar-list-container">
     
      <el-form class="small-space" :model="baseInfo" :rules="rules" ref="baseInfo" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <label> 用户名:</label> <label>{{baseInfo.username}}</label>
        <br/>
        <br/>
        <label> 注册时间:</label> <label>{{baseInfo.createTime | formatterDate}}</label>
        <br/>
        <br/>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="baseInfo.nickname" ></el-input>
        </el-form-item>
        <br/>
        <label>头像:</label> <img :src="baseInfo.avatar" class="avatar">
        <br/>
        <br/>
        <el-form-item label="email" prop="email">
          <el-input v-model="baseInfo.email" ></el-input>
        </el-form-item>
        <br/>
        <br/>
        <label> 角色:</label> <label>{{baseInfo.roleNames}}</label>
        <br/>
        <br/>
        <el-form-item label="qq" prop="qq">
          <el-input v-model="baseInfo.qq" ></el-input>
        </el-form-item>

        <el-form-item label="weixin" prop="weixin">
          <el-input v-model="baseInfo.weixin" ></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="des">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="baseInfo.des">
          </el-input>
        </el-form-item>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">保 存</el-button>
      </div> -->

  </div>
</template>

<script>
import { getBaseInfo } from '@/api/login';


export default {
  name: 'user_base',
  data() {
    return {
      baseInfo: {
        username: 'unknown'
        // nickname: 'nickname',
        // avatar: 'http://www.chunhuitech.cn:9528/avatar.gif',
        // email: 'email',
        // qq: 'qq',
        // weixin: 'wx',
        // roleNames: 'admin,user',
        // createTime: 1510309299964,
        // des: 'kkkk'
      },
      rules: {
        des: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    this.initData();
  },
   methods: {
     update() {      
    },
    initData() {
        this.listLoading = true;
        getBaseInfo(this.$store.getters.token).then(response => {
          this.baseInfo = response.data;
        })
      },
   },
   filters: {
        formatterDate: function(value) {
            let result = value;
            let time = new Date(value),
            year = time.getFullYear(),
            month = (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1),
            day = (time.getDate() < 10 ? '0' : '') + time.getDate(),
            hour = (time.getHours() < 10 ? '0' : '') + time.getHours(),
            minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes(),
            second = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();
            result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            return result;
        }
    }
}
</script>
<style>
.avatar {
    width: 80px;
    height: 80px;

}
</style>