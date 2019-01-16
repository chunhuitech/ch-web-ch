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
           <el-button size="small" type="danger" @click="handleDianDuList(scope.row)">点读
          </el-button>
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

    <el-dialog :title="detailTitleDianDuList" :visible.sync="dialogDianDuListFormVisible">
      <el-button class="filter-item" style="margin-left: 20px;" @click="handleCreateDianDu" type="primary" icon="edit">添加</el-button>
      <el-form class="small-space" :model="temp"  ref="temp" label-position="left" label-width="70px" style='width: 600px; margin-left:10px;'>
       <el-table :data="listDianDu" v-loading.body="listDianDuLoading" border fit highlight-current-row style="width: 100%">

          <el-table-column align="center" label="序号"  width="100">
            <template scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>

          <el-table-column label="名称">
            <template scope="scope">
              <span class="link-type" @click="handleUpdateDianDu(scope.row)">{{scope.row.title}}</span>
            </template>
          </el-table-column>

          <el-table-column label="所属分类">
            <template scope="scope">
              <span >{{scope.row.recordId}}</span>
            </template>
          </el-table-column>

          <el-table-column label="排序号">
            <template scope="scope">
              <span >{{scope.row.sortNum}}</span>
            </template>
          </el-table-column>

           <el-table-column label="左边坐标">
            <template scope="scope">
              <span >{{scope.row.leftPosition}}</span>
            </template>
          </el-table-column>

           <el-table-column label="上边坐标">
            <template scope="scope">
              <span >{{scope.row.topPosition}}</span>
            </template>
          </el-table-column>

          <el-table-column label="宽度">
            <template scope="scope">
              <span >{{scope.row.width}}</span>
            </template>
          </el-table-column>

           <el-table-column label="高度">
            <template scope="scope">
              <span >{{scope.row.height}}</span>
            </template>
          </el-table-column>


        <el-table-column align="center" label="操作" width="100">
            <template scope="scope">
              <el-button size="small" type="danger" @click="handleDeleteDianDu(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDianDuListFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="detailTitleDianDu" :visible.sync="dialogDianDuFormVisible">
      <el-form class="small-space" :model="tempDianDu"  ref="tempDianDu" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <!-- <el-form-item label="分类" prop="recordId">
          <el-select v-model="tempDianDu.recordId" placeholder="请选择">
            <el-option v-for="item in calssIds" :key="item.id" :label="item.cnName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>   -->
         <el-form-item label="recordId" prop="recordId">
          <el-input v-model="tempDianDu.recordId" ></el-input>
        </el-form-item>
         <el-form-item label="资源" prop="resourceId">
          <el-select v-model="tempDianDu.resourceId"  placeholder="请选择">
            <el-option v-for="item in resourceIds" :key="item.id" :label="item.title" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>      
        <el-form-item label="标题" prop="title">
          <el-input v-model="tempDianDu.title" ></el-input>
        </el-form-item>

        <el-form-item label="text" prop="text">
          <el-input v-model="tempDianDu.text" ></el-input>
        </el-form-item>

         <el-form-item label="排序号(页号)" prop="sortNum">
          <el-input v-model="tempDianDu.sortNum" ></el-input>
        </el-form-item>

        <el-form-item label="左侧坐标" prop="leftPosition">
          <el-input v-model="tempDianDu.leftPosition" ></el-input>
        </el-form-item>

        <el-form-item label="上侧坐标" prop="topPosition">
          <el-input v-model="tempDianDu.topPosition" ></el-input>
        </el-form-item>

        <el-form-item label="宽度" prop="width">
          <el-input v-model="tempDianDu.width" ></el-input>
        </el-form-item>

        <el-form-item label="高度" prop="height">
          <el-input v-model="tempDianDu.height" ></el-input>
        </el-form-item>

        <el-form-item label="开始时间点" prop="beginPoint">
          <el-input v-model="tempDianDu.beginPoint" ></el-input>
        </el-form-item>

        <el-form-item label="结束时间点" prop="endPoint">
          <el-input v-model="tempDianDu.endPoint" ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDianDuFormVisible = false">取 消</el-button>
        <el-button v-if="dialogDianDuStatus=='create'" type="primary" @click="createDianDu">确 定</el-button>
        <el-button v-else type="primary" @click="updateDianDu">确 定</el-button>
      </div>
    </el-dialog>

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
import { fetchListDianDu, addDianDu, delDianDu, modDianDu } from '@/api/resource/pointread_manage';
import { fetchListResource } from '@/api/resource/resource_manage';
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
      tempDianDu: {
        id: null,
        recordId: 0, 
        resourceId: 0,
        sortNum: 0,
        leftPosition: 0,
        topPosition: 0,
        width: 0,
        height: 0,
        beginPoint: 0,
        endPoint: 0,
        title: '',
        text: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      dialogDianDuListFormVisible: false,
      dialogDianDuFormVisible: false,
      dialogDianDuStatus: '',
      timeRange:[],
      labelWidth: '20%',
      list: null,
      listDianDu: null,
      listDianDu: null,
      total: null,
      totalDianDu: null,
      listLoading: true,
      listDianDuLoading: true,
      detailTitle:'详细',
      detailTitleDianDuList:'点读列表',
      selectRecordId: 0,
      detailTitleDianDu:'点读详细',
      calssIds: [{
                id: 0,
                cnName: "--请选择--"
            }],
      resourceIds: [{
            id: 0,
            title: "--请选择--"
        }],
      listQueryDianDu: {
        page: 1,
        limit: 20,
        pageId: 0
      },
      listQueryResource: {
        page: 1,
        limit: 20,
        id: 0
      },
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
    getAllResourceIds() {
      fetchListResource(this.listQueryResource).then(response => {
              this.resourceIds = response.data.dataList;
            })
    },
    handleFilter() {
      this.getList();
    },
    getListDianDu() {
      this.listDianDuLoading = true;
      fetchListDianDu(this.listQueryDianDu).then(response => {
        this.listDianDu = response.data.dataList;
        this.totalDianDu = response.data.total;
        this.listDianDuLoading = false;
        // console.log(this.temp)
      })
    },
    handleCreateDianDu() {
      this.resetTempDianDu();
      this.tempDianDu.recordId = this.selectRecordId;
      this.dialogDianDuStatus = 'create';
      this.dialogDianDuFormVisible = true;
    },
    resetTempDianDu() {
      this.tempDianDu = {
        id: null,
        recordId: 0, 
        resourceId: 0,
        sortNum: 0,
        leftPosition: 0,
        topPosition: 0,
        width: 0,
        height: 0,
        beginPoint: 0,
        endPoint: 0,
        title: '',
        text: ''
      };
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
          } else if(response.code == 900018){
            this.$message({
              message: '其下有数据，不能删除',
              type: 'info'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleDeleteDianDu(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDianDu(row).then(response => {
          alert(response.code)
          if(response.code == 0){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          this.getListDianDu();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleDianDuList(row) {
      let self = this;
      self.selectRecordId = row.id;
      self.listQueryDianDu.pageId = row.id;
      self.getListDianDu();
      self.listQueryResource.id = row.classId;
      self.getAllResourceIds();
      this.dialogDianDuListFormVisible = true;
    },
    handleUpdateDianDu(row) {
      let self = this;
      for(let item in row){
        this.tempDianDu[item]=row[item];
      }
      this.dialogDianDuStatus = 'update';
      this.dialogDianDuFormVisible = true;
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
    createDianDu() {
      this.$refs['tempDianDu'].validate((valid) => {
        if (valid) {
            addDianDu(this.tempDianDu).then(response => {
            if(response.code == 0){
              this.dialogDianDuFormVisible = false;
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
              this.getListDianDu();
            }
          })
        } else {
          return false;
        }
      });
    },
    updateDianDu() {
      this.$refs['tempDianDu'].validate((valid) => {
        if (valid) {
            modDianDu(this.tempDianDu).then(response => {
              if(response.code == 0){
                this.dialogDianDuFormVisible = false;
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                });
                this.getListDianDu();
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
