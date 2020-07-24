import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'Dashboard',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/edit',
    name: 'Example',
    meta: {
      title: '讲师管理',
      icon: 'user-edit'
    },
    children: [
      {
        path: 'edit',
        name: '讲师管理',
        component: () => import('@/views/edu/teacher/list'),
        meta: {
          title: '讲师管理',
          icon: 'user-edit'
        }
      },
      {
        path: 'teaedit/:id', 
        component: () => import('@/views/edu/teacher/teaedit'),
        hidden:true
      }
    ]
  },
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/edit',
    name: 'Example',
    meta: {
      title: '课程管理',
      icon: 'table'
    },
    children: [
      {
        path: 'edit',
        name: '专业编辑',
        component: () => import('@/views/edu/subject/subjectedit'),
        meta: {
          title: '专业编辑',
          icon: 'user-edit'
        }
      },
      {
        path: 'info/:id',
        name: '课程分类详情',
        component: () => import('@/views/edu/subject/subinfo'),
        meta: {
          title: '专业编辑',
          icon: 'table'
        }
        ,hidden:true
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Example',
    meta: {
      title: '课程管理',
      icon: 'table'
    },
    children: [
      {
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/edu/course/list'),
        meta: {
          title: '课程列表',
          icon: 'user-edit'
        }
      },
      {
        path: 'edit/:id',
        name: '课程编辑',
        component: () => import('@/views/edu/course/edit'),
        meta: {
          title: '课程编辑',
          icon: 'table'
        } 
        ,hidden:true
      },
      {
        path: 'save',
        name: '课程添加',
        component: () => import('@/views/edu/course/save'),
        meta: {
          title: '课程添加',
          icon: 'table'
        } 
      },
     

    ]
  },

  

 

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
