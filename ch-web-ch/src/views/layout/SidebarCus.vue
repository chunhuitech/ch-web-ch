<template>
  <el-menu mode="vertical" theme="dark" nique-opened router >
    <el-submenu v-for="item in menuList" :index='item.path'>
           <template slot="title">
              <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
           </template>
					 <template v-if="item.children.length">
						 <el-menu-item v-for="subitem in item.children" :index="subitem.path">
								{{subitem.name}}
						</el-menu-item>
					 </template>
					</el-submenu>
  </el-menu>
</template>

<script>
import { getRight } from '@/api/login';

export default {
  data() {
        return {
          menuList:[]
            // menuList:[{id:"1", name: '系统设置',path:'/systemSet/',resUrl:'',
            //           children:[{id:"11", name: '用户管理',path:'/systemSet/userManage',resUrl:'../user/user_manage'},
            //                     {id:"12", name: '角色管理',path:'/systemSet/roleManage',resUrl:'../user/role_manage'}]
            //           }]

            // menuList:[{id:"1", name: '系统设置',path:'/1',resUrl:'',
            //           children:[{id:"2", name: '用户管理',path:'/2',resUrl:'../user/user_manage'},
            //                     {id:"3", name: '角色管理',path:'/3',resUrl:'../user/role_manage'}]
            //           }]
        }
    },
    created() {
      // this.getMenuList();
    },
    
    mounted: function() {
        var seft = this;
        seft.$nextTick(function() {
					seft.getMenuList();
        });
    },

    methods:{
      getMenuList(){
        let seft=this;
        getRight(seft.$store.getters.token).then(response => {
          seft.menuList = response.data.menus;
          seft.$store.commit('SET_MENULIST',seft.menuList);
        })
      },
    },
    
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
}
</style>
