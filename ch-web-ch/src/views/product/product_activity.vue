<template>
  <div class="app-container calendar-list-container">
        <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="操作系统" v-model="listQuery.os">
      </el-input>

      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="区域" v-model="listQuery.area">
      </el-input>

      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="事件" v-model="listQuery.eventName">
      </el-input>

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.procId" placeholder="产品">
        <el-option v-for="item in productInfos" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
    
      <el-date-picker  style="width: 200px;" v-model="timeRange" type="daterange" placeholder="选择时间范围" @change="selectChange"></el-date-picker>
   
      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
    </div>
    
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号"  width="100">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="产品名称">
        <template scope="scope">
          <span>{{scope.row.procName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="标志">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.clientFlag}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="操作系统">
        <template scope="scope">
          <span>{{scope.row.os && scope.row.os.substring(0,10)}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="IP">
        <template scope="scope">
          <span>{{scope.row.netIp}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="地区">
        <template scope="scope">
          <span>{{scope.row.area}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="事件">
        <template scope="scope">
          <span>{{scope.row.eventName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="次数">
        <template scope="scope">
          <span>{{scope.row.eventCount}}</span>
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
        <el-form-item label="操作系统" prop="os">
          <el-input v-model="temp.os" ></el-input>
        </el-form-item>

        <el-form-item label="区域" prop="area">
          <el-input v-model="temp.area" ></el-input>
        </el-form-item>

        <el-form-item label="内网ip" prop="ip">
          <el-input v-model="temp.ip" ></el-input>
        </el-form-item>

        <el-form-item label="remarks备注" prop="remarks">
          <el-input v-model="temp.remarks" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, del, get } from '@/api/product/product_activity';

export default {
  name: 'product_activity',
  data() {
    return {
      selectFormLabelWidth: "100px",
      temp: {
        id: null,
        os: '',
        area: '',
        ip: '',
        remarks: ''
      },
      productInfos: [
          { key: 0, display_name: '全部' },
          { key: 1, display_name: 'Doraemon 32位' },
          { key: 2, display_name: 'Doraemon 64位' },
          { key: 3, display_name: '微信小程序' },
          { key: 4, display_name: 'wyyt' }
      ],
      dialogFormVisible: false,
      timeRange:[],
      labelWidth: '20%',
      list: null,
      total: null,
      listLoading: true,
      detailTitle:'详细',
      listQuery: {
        page: 1,
        limit: 20,
        procId: 0,
        os: null,
        area: null,
        eventName: null,
        startTime: 0,
        endTime: 0
      }
    }
  },
  mounted: function() {
        var self = this;
        self.timeRange[0] = this.listQuery.startTime;
        self.timeRange[1] = this.listQuery.endTime;
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
    selectChange() {
        this.listQuery.startTime=new Date(this.timeRange[0]).getTime();
        this.listQuery.endTime=new Date(this.timeRange[1]).getTime() + 1000 * 60 * 60 * 24 - 1;
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
    handleUpdate(row) {
      let self = this;
      for(let item in row){
        this.temp[item]=row[item];
      }
     
      this.dialogFormVisible = true;
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
