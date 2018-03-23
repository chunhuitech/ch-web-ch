<template>
  <div class="app-container calendar-list-container">
        <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="名称" v-model="listQuery.name">
      </el-input>

      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>
    
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号"  width="100">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template scope="scope">
          <span>{{scope.row.des}}</span>
        </template>
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
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" ></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="des">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.des">
          </el-input>
        </el-form-item>
        <el-form-item  label="菜单：" >
            <div>
              <el-tree :data="menuListData"  show-checkbox node-key="id" ref="tree_menus"  highlight-current :props="defaultProps"> </el-tree>
            </div>
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
import { fetchList, add, del, mod, get } from '@/api/sys/role_manage';

export default {
  name: 'role_manage',
  data() {
    return {
      temp: {
        id: null,
        systemId: 1,
        name: '',
        des: '',
        menus: []
      },
      menuListData:[],
      defaultProps: {
          children: 'children',
          label: 'name'
      },
      firstMenusMap:{
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
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        systemId: 1,
        page: 1,
        limit: 20,
        name: null
      },
      
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      }
    }
  },
  created() {
    // this.getList();
  },
  mounted: function() {
        this.$nextTick(function() {
            this.initData();
            this.getList();
        });
    },
  methods: {
    initData() {
      this.menuListData = this.$store.getters.menu_list;
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.dataList;
        this.total = response.data.total;
        this.listLoading = false;
      })
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
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      let self = this;
      // this.temp = Object.assign({}, row);
      for(let item in row){
        self.temp[item]=row[item]+"";
      }
      get(self.temp).then(response => {
        if(response.code == 0){
          let data=response.data;
          self.temp={
               id: data.id,
                systemId: data.systemId,
                name: data.name,
                des: data.des,
              menus:[]
          }
          data.menus.map(function(val){
            if(val.children.length>0){
              val.children.map(function(val_C){
                self.temp.menus.push(val_C.id);
              })
            }
          })
          self.setCheckedKeys("menus", self.temp.menus)
        }
      })
      this.temp.systemId = 1;
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
    },
    setCheckedKeys(str, objArr) {
        this.$refs["tree_" + str].setCheckedKeys(objArr);
    },
    create() {
      this.$refs['temp'].validate((valid) => {
        if (valid) {
          let self=this;
          let menusArr=[];
          this.$refs.tree_menus.getCheckedKeys().map(function(val){
            menusArr.push(val);
          })
          self.temp.menus = menusArr;
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
          let self=this;
          let menusArr=[];
          // console.log(this.$refs.tree_menus.getCheckedKeys())
          this.$refs.tree_menus.getCheckedKeys().map(function(val){
            menusArr.push(val);
          })
          self.temp.menus = menusArr; 
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
        systemId: 1,
        des: '',
        name: '',
        menus: []
      };
      this.setCheckedKeys("menus", [])
    }
  }
}
</script>
