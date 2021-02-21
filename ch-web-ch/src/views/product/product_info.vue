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


      <el-table-column label="产品名称">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="开发平台">
        <template scope="scope">
          <span>{{scope.row.technologyPlatform && scope.row.technologyPlatform.substring(0,20)}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="版本">
        <template scope="scope">
          <span>{{scope.row.version}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="版本号">
        <template scope="scope">
          <span>{{scope.row.versionNum}}</span>
        </template>
      </el-table-column>

      
      

      <el-table-column prop="modifyTime" label="修改时间" :formatter="formatters">
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" :formatter="formatters">
      </el-table-column>

      <el-table-column align="center" label="备注">
        <template scope="scope">
          <span>{{scope.row.remarks}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="操作" width="100">
        <template scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column> -->

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="detailTitle" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp"  ref="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="temp.name" ></el-input>
        </el-form-item>

        <el-form-item label="开发平台" prop="technologyPlatform">
          <el-input v-model="temp.technologyPlatform" ></el-input>
        </el-form-item>

        <el-form-item label="版本" prop="version">
          <el-input v-model="temp.version" ></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="versionNum">
          <el-input v-model="temp.versionNum" ></el-input>
        </el-form-item>
         <el-form-item label="下载地址" prop="downAddress">
          <el-input v-model="temp.downAddress" ></el-input>
        </el-form-item>
        <el-form-item label="remarks备注" prop="remarks">
          <el-input v-model="temp.remarks" ></el-input>
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
import { fetchList, del, get, mod, add } from '@/api/product/product_info';

export default {
  name: 'product_info',
  data() {
    return {
      selectFormLabelWidth: "100px",
      temp: {
        id: null,
        name: '',
        technologyPlatform: '',
        version: '',
        versionNum: '',
        downAddress:'',
        remarks:''
      },
      dialogFormVisible: false,
       dialogStatus: '',
      labelWidth: '20%',
      list: null,
      total: null,
      listLoading: true,
      detailTitle:'详细',
      listQuery: {
        page: 1,
        limit: 20,
        name: null
      }
    }
  },
  mounted: function() {
        var self = this;
        self.$nextTick(function() {
            self.getList();
        });
    },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.dataList;
        this.total = response.data.total;
        this.listLoading = false;
        // console.log(this.temp)
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
      this.$message({
          type: 'info',
          message: '不支持'
        }); 
      return;
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
    resetTemp() {
      this.temp = {
         id: null,
        name: '',
        technologyPlatform: '',
        version: '',
        versionNum: '',
        downAddress:'',
        remarks:''
      };
    },
    handleUpdate(row) {
      let self = this;
      for(let item in row){
        this.temp[item]=row[item];
      }
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
    //格式化函数分流
    formatters(row, column) {
        let str = "",
            self = this;
        switch (column.property) {
            case "modifyTime":
            case "createTime":
                return this.formatterDate(row, column);
                break;
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
    }
  }
}
</script>
