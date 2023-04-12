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
    redirect: "/virtualList",
    children: [
      {
        path: "/virtualList",
        name: "VirtualList",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "VirtualList" */ "../views/VirtualList.vue"
          )
      },
      {
        path: "/components",
        name: "Components",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Components" */ "../views/Tabs0.vue")
      },
      {
        path: "/loadReadFile",
        name: "LoadReadFile",
        component: () =>
          import(
            /* webpackChunkName: "LoadReadFile" */ "../views/loadReadFile/index.vue"
          )
      },
      {
        path: "/table",
        name: "Table",
        component: () =>
          import(
            /* webpackChunkName: "Table" */ "../views/tableRender/index.vue"
          )
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
      import(/* webpackChunkName: "about" */ "../views/About.vue")
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
