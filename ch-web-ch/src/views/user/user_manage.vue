<template>
  <div class="app-container calendar-list-container">
        <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.username">
      </el-input>

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.status" placeholder="状态">
        <el-option v-for="item in userStatus" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>
    
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号"  width="100">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.username}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="昵称">
        <template scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="roles" label="角色" :formatter="formatters">
      </el-table-column>

      <el-table-column align="center" label="email">
        <template scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="qq">
        <template scope="scope">
          <span>{{scope.row.qq}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="weixin">
        <template scope="scope">
          <span>{{scope.row.weixin}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="修改时间" :formatter="formatters">
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" :formatter="formatters">
      </el-table-column>

      <el-table-column align="center" label="操作" width="100">
        <template scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" ></el-input>
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="temp.nickname" ></el-input>
        </el-form-item>

        <el-form-item label="头像" prop="avatar">
          <el-input v-model="temp.avatar" ></el-input>
        </el-form-item>

        <el-form-item label="email" prop="email">
          <el-input v-model="temp.email" ></el-input>
        </el-form-item>

        <el-form-item label="所属角色：" :label-width="labelWidth">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="temp.roleIds" @change="handleCheckedProdsChange">
                <el-checkbox v-for="item in allRoles" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
        </el-form-item>

        <el-form-item label="qq" prop="qq">
          <el-input v-model="temp.qq" ></el-input>
        </el-form-item>

        <el-form-item label="weixin" prop="weixin">
          <el-input v-model="temp.weixin" ></el-input>
        </el-form-item>

        <el-form-item label="状态：" >
          <el-select size="mini" v-model="temp.status">
              <el-option v-for="item in states" :key="item.key" :label="item.display_name" :value="item.key">
              </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="描述" prop="des">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.des">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, add, del, mod, get, exist } from '@/api/sys/user_manage';

import { fetchList as fetchRole } from '@/api/sys/role_manage';

export default {
  name: 'user_manage',
  data() {
    return {
       temp: {
        id: null,
        username: '',
        nickname: '',
        avatar: '',
        email: '',
        qq: '',
        weixin: '',
        status: 0,
        roleIds: [],
        des: ''
      },
      userStatus: [
          { key: 127, display_name: '全部' },
          { key: 0, display_name: '正常' },
          { key: 1, display_name: '已删除' },
          { key: 2, display_name: '禁止登录' }
      ],
      states: [
          { key: 0, display_name: '正常' },
          { key: 1, display_name: '已删除' },
          { key: 2, display_name: '禁止登录' }
      ],
      checkAll: false,
      allRoles:[],
      isIndeterminate:true,
      listQueryRole: {
        systemId: 1,
        page: 1,
        limit: 100
      },
      
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        des: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ]
      },
      labelWidth: '20%',
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        status: 0,
        username: null
      },
     
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      }
    }
  },
  mounted: function() {
        var self = this;
        self.$nextTick(function() {
            self.getRoleList();
            self.getList();
        });
    },
  // created() {
  //   this.getRoleList();
  //   this.getList();
  // },
  methods: {
    getRoleList() {
      let self =this;
      fetchRole(this.listQueryRole).then(response => {
        this.allRoles = [];
        console.log(self.temp)
        response.data.dataList.map(function(val){
            self.allRoles.push({
              id:val.id,
              name:val.name
            })
          });
      })
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.dataList;
        this.total = response.data.total;
        this.listLoading = false;
        console.log(this.temp)
      })
    },
    handleCheckAllChange(event) {
        let self=this;
        if(event.target.checked){
            self.temp.roleIds =  [];
            self.allRoles && self.allRoles.map(function (val) {
                self.temp.roleIds.push(val.id);
            })
        }else {
            self.temp.roleIds =  [];
        }
        self.isIndeterminate = false;
    },
    handleCheckedProdsChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.allRoles.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.allRoles.length;
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(row).then(response => {
          if(response.code == 0){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
     handleCreate() {
      this.checkAll=false;
      this.isIndeterminate = false;
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      let self = this;
      for(let item in row){
        if(item == 'roles') continue;
        this.temp[item]=row[item];
      }
      this.temp.roleIds=[];
      row.roles.length&&row.roles.map(function(val){
        self.temp.roleIds.push(val.roleId)
      });
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
    },
    create() {
      this.$refs['temp'].validate((valid) => {
        if (valid) {
            add(this.temp).then(response => {
            if(response.code == 0){
              this.dialogFormVisible = false;
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
              this.getList();
            }
          })
        } else {
          return false;
        }
      });
    },
    update() {
      this.$refs['temp'].validate((valid) => {
        if (valid) {
            mod(this.temp).then(response => {
              if(response.code == 0){
                this.dialogFormVisible = false;
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                });
                this.getList();
              }
            })
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.temp = {
        id: null,
        username: '',
        nickname: '',
        avatar: '',
        email: '',
        qq: '',
        weixin: '',
        status: 0,
        roleIds: [],
        des: ''
      };
    },
    //格式化函数分流
    formatters(row, column) {
        let str = "",
            self = this;
        switch (column.property) {
            case "modifyTime":
            case "createTime":
                return this.formatterDate(row, column);
                break;
            case "roles":
                return this.formatterRole(row, column);
            default:
                str = row[column.property];
                break;
        }
        return str;
    },
    formatterDate(row, column) {
        let date = new Date(row[column.property]);
        return date.getFullYear() + "-"
          + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "-"
            + (date.getDate() > 9 ? date.getDate(): "0" + date.getDate())+" "
            +(date.getHours() > 9 ? date.getHours(): "0" + date.getHours())+":"
            +(date.getMinutes() > 9 ? date.getMinutes(): "0" + date.getMinutes()) +":"
            +(date.getSeconds() > 9 ? date.getSeconds(): "0" + date.getSeconds());
    },
    formatterRole(row, column) {
        let rolesArray = row[column.property];
        let roleInfo = '';
        for (var i = 0; i < rolesArray.length; i++) {
            roleInfo += rolesArray[i].roleName
            if( i < rolesArray.length - 1){
              roleInfo +=',';
            }
        };
        return roleInfo;
    }
  }
}
</script>
