<template>
  <div class="app-container calendar-list-container">
        <div class="filter-container">
      <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="所属分类id" v-model="listQuery.classId">
      </el-input> -->
    <el-select v-model="listQuery.classId" @change="handleFilter" placeholder="请选择">
          <!-- <el-option key="0" label="全部" value="0"> -->
          <!-- </el-option> -->
          <el-option v-for="item in calssIds" :key="item.id" :label="item.cnName" :value="item.id">
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

      <el-table-column label="名称">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
        </template>
      </el-table-column>

       <el-table-column label="所属分类">
        <template scope="scope">
          <span >{{scope.row.classId}}</span>
        </template>
      </el-table-column>

      <el-table-column label="排序号">
        <template scope="scope">
          <span >{{scope.row.sortNum}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="modifyTime" label="修改时间" :formatter="formatters">
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" :formatter="formatters">
      </el-table-column>

      <el-table-column align="center" label="relativePath">
        <template scope="scope">
          <span>{{scope.row.relativePath}}</span>
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

    <el-dialog :title="detailTitle" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp"  ref="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="分类" prop="classId">
           <el-select v-model="temp.classId" @change="handleFilter" placeholder="请选择">
          <el-option v-for="item in calssIds" :key="item.id" :label="item.cnName" :value="item.id">
          </el-option>
      </el-select>
        </el-form-item>

       

        <el-form-item label="排序号(页号)" prop="sortNum">
          <el-input v-model="temp.sortNum" ></el-input>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" ></el-input>
        </el-form-item>

        <el-form-item label="label" prop="label">
          <el-input v-model="temp.label" ></el-input>
        </el-form-item>

        <el-form-item label="路径" prop="relativePath">
          <el-input v-model="temp.relativePath" ></el-input>
        </el-form-item>

        <el-form-item label="文件大小" prop="fileSize">
          <el-input v-model="temp.fileSize" ></el-input>
        </el-form-item>

        <el-form-item label="文件类型" prop="fileType">
          <el-input v-model="temp.fileType" ></el-input>
        </el-form-item>

        <el-form-item label="Html内容" prop="contentHtml">
          <el-input v-model="temp.contentHtml" ></el-input>
        </el-form-item>

        <el-form-item label="Plain内容" prop="contentPlain">
          <el-input v-model="temp.contentPlain" ></el-input>
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
import { fetchAll } from '@/api/resource/class_manage';
import { fetchList, add, del, mod } from '@/api/resource/record_manage';

export default {
  name: 'record_manage',
  data() {
    return {
      selectFormLabelWidth: "100px",
      temp: {
        id: null,
        classId: 0, 
        sortNum: 0, 
        title: '',
        label: '',
        relativePath: '',
        fileSize: 0,
        fileType: '',
        contentPlain: '',
        contentHtml: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      timeRange:[],
      labelWidth: '20%',
      list: null,
      total: null,
      listLoading: true,
      detailTitle:'详细',
      calssIds: [{
                id: 0,
                cnName: "--请选择--"
            }],
      listQuery: {
        page: 1,
        limit: 20,
        classId: 0
      }
    }
  },
  mounted: function() {
        var self = this;
        self.$nextTick(function() {
            self.getAllClass();
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
    getAllClass() {
      fetchAll(this.listQuery).then(response => {
        this.calssIds = response.data.dataList;
      })
    },
    handleFilter() {
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    resetTemp() {
      this.temp = {
        id: null,
        classId: 0, 
        sortNum: 0,
        title: '',
        label: '',
        relativePath: '',
        fileSize: 0,
        fileType: '',
        contentPlain: '',
        contentHtml: ''
      };
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
