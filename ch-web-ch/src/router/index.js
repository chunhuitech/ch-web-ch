import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  { path: '/portal', component: _import('portal/index'), hidden: true },
  // { path: '/dashboard', component: _import('dashboard/index'), hidden: true },
  {
    path: '/dashboard',
    component: Layout,
    name: 'Dashboard',
    hidden: true,
    children: [{ path: '/dashboard', component: _import('dashboard/index'), hidden: true }]
  },
  {
    // path: '/',
    // component: Layout,
    // redirect: '/dashboard',
    // name: 'Dashboard',
    // hidden: true,
    // children: [{ path: 'dashboard', component: _import('dashboard/index') }]
    path: '/',
    redirect: '/portal',
    name: 'Portal',
    hidden: true,
    children: [{ path: 'portal', component: _import('portal/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/example/',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example',
    icon: 'zujian',
    children: [
      { path: 'index', name: 'Form', icon: 'zonghe', component: _import('page/form') }
    ]
  },

  {
    path: '/example2/',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example2',
    icon: 'zujian',
    children: [
      { path: 'index2', component: Layout, redirect: 'noredirect', name: 'Form2', icon: 'zonghe',
        children: [{ path: 'index3', name: 'Table', component: _import('table/index') }]
      }
    ]
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 'index', name: 'Table', component: _import('table/index'), meta: { role: ['admin'] }}]
  },

  {
    path: '/101',
    component: Layout,
    redirect: 'noredirect',
    name: '账号设置',
    icon: 'zujian',
    children: [
      { path: '/102', name: '个人资料',
        component: resolve => require(['../views/user/user_base'], resolve)
        // component: _import('user/user_manage')
      },
      { path: '/103', name: '安全设置',
        component: resolve => require(['../views/user/user_security'], resolve)
        // component: _import('user/role_manage')
      }
    ]
  },

  {
    path: '/90',
    component: Layout,
    redirect: 'noredirect',
    name: '产品管理',
    icon: 'wujiaoxing',
    children: [
      { path: '/91', name: '产品活跃度',
        component: resolve => require(['../views/product/product_activity'], resolve)
      }
    ]
  },

  {
    path: '/80',
    component: Layout,
    redirect: 'noredirect',
    name: '资源管理',
    icon: 'shouce',
    children: [
      { path: '/82', name: '分类管理',
        component: resolve => require(['../views/resource/class_manage'], resolve)
      },
      { path: '/81', name: '点读资源',
        component: resolve => require(['../views/resource/page_manage'], resolve)
      }
    ]
  },

  {
    path: '/1',
    component: Layout,
    redirect: 'noredirect',
    name: '系统设置',
    icon: 'zujian',
    children: [
      { path: '/2', name: '用户管理',
        component: resolve => require(['../views/user/user_manage.vue'], resolve)
        // component: _import('user/user_manage')
      },
      { path: '/3', name: '角色管理',
        component: resolve => require(['../views/user/role_manage'], resolve)
        // component: _import('user/role_manage')
      }
    ]
  },
  { path: '/portal', component: _import('portal/index'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]
/*
对path的处理两种方案
１.有层级关系　访问时要组合
一级父类route以 / 开头和结束  子类不需要/ 开头,但要连接上其父类对应的字段
如：一级 /systemSet  二级为 userManage  组合后为 /systemSet/userManage
http://localhost:9528/#/systemSet/userManage
2.对path直接使用一个不重复的任意数据，也可以用id 存放时以 /　开头
访问时无论是哪一层　直接　/后加id值就可以了。
这个值生成后，要在两个地方配置，一个是本文件中的path字段，一个是数据库表 admin_menu 中的path字段
关键在于只要构造好对应的父子关系就行了　children　字段

*****
采用第2种方案后，同时要在 admin_role_menu 表中添加对应权限记录
*/