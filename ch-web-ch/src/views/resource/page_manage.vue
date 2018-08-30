<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      

      <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加分页</el-button>
    </div>
  
  </div>
</template>

<script>
import { fetchList, add, del, mod } from '@/api/sys/user_manage';

export default {
  name: 'page_manage',
  data() {
    return {
      states: [
          { key: 0, display_name: '正常' },
          { key: 1, display_name: '已删除' }
      ]
    }
  },
  mounted: function() {
    },
  methods: {
    
    handleFilter() {
    },
     handleCreate() {
    }
  }
}
</script>
