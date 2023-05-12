import Vue from "vue";
import VueRouter, { RawLocation, RouteConfig } from "vue-router";
// import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
// import VirtualList from "../views/VirtualList.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Dashboard,
    redirect: "/guide",
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/guide",
        name: "QuickGuide",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "QuickGuide" */ "../views/QuickGuide.vue"
          ),
        meta: {
          title: "快速向导"
        }
      },
      {
        path: "/skeleton",
        name: "Skeleton",
        component: () =>
          import(
            /* webpackChunkName: "Skeleton" */ "../views/skeleton/index.vue"
          ),
        meta: {
          title: "骨架屏"
        }
      },
      {
        path: "/virtualList",
        name: "VirtualList",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "VirtualList" */ "../views/VirtualList.vue"
          ),
        meta: {
          title: "虚拟列表"
        }
      },
      {
        path: "/components",
        name: "Components",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Components" */ "../views/Tabs0.vue"),
        meta: {
          title: "组件"
        }
      },
      {
        path: "/classComponents",
        name: "ClassComponents",
        component: () =>
          import(
            /* webpackChunkName: "ClassComponents" */ "../views/classComponents/index.vue"
          ),
        meta: {
          title: "类组件"
        }
      },
      {
        path: "/chart",
        name: "Chart",
        component: () =>
          import(/* webpackChunkName: "Chart" */ "../views/chart/index.vue"),
        meta: {
          title: "图表"
        }
      },
      {
        path: "/table",
        name: "Table",
        component: () =>
          import(
            /* webpackChunkName: "Table" */ "../views/tableRender/index.vue"
          ),
        meta: {
          title: "表格"
        }
      },
      {
        path: "/decorator",
        name: "Decorator",
        component: () =>
          import(
            /* webpackChunkName: "Decorator" */ "../views/decorator/index.vue"
          ),
        meta: {
          title: "装饰器"
        }
      },
      {
        path: "/loadReadFile",
        name: "LoadReadFile",
        component: () =>
          import(
            /* webpackChunkName: "LoadReadFile" */ "../views/loadReadFile/index.vue"
          ),
        meta: {
          title: "读取文件"
        }
      },
      {
        path: "/widge",
        name: "Widge",
        component: () =>
          import(/* webpackChunkName: "Widge" */ "../views/widge/index.vue"),
        meta: {
          title: "常用网站"
        }
      },
      {
        path: "/input",
        name: "Input",
        component: () =>
          import(/* webpackChunkName: "Input" */ "../views/input/index.vue"),
        meta: {
          title: "组件input"
        }
      },
      {
        path: "/color",
        name: "Color",
        component: () =>
          import(/* webpackChunkName: "Color" */ "../views/color/index.vue"),
        meta: {
          title: "颜色卡"
        }
      },
      {
        path: "/color2",
        name: "Color2",
        component: () =>
          import(/* webpackChunkName: "Color" */ "../views/color/index2.vue"),
        meta: {
          title: "颜色卡2"
        }
      },
      {
        path: "/indicators",
        name: "Indicators",
        component: () =>
          import(/* webpackChunkName: "Indicators" */ "../views/indicators/index.vue"),
        meta: {
          title: "指示器"
        }
      },
      {
        path: "/carousel",
        name: "Carousel",
        component: () =>
          import(/* webpackChunkName: "Carousel" */ "../views/carousel/index.vue"),
        meta: {
          title: "走马灯"
        }
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      title: "关于"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue")
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404"
  }
];

const router = new VueRouter({
  routes
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: RawLocation) {
  return (originalPush.call(this, location) as any).catch((err: any) => err);
};

export default router;
