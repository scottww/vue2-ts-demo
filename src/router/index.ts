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
          title: "Guide 快速向导"
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
          title: "Skeleton 骨架屏"
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
          title: "VirtualList 虚拟列表"
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
          title: "Tabs 组件"
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
          title: "ClassComponents 类组件"
        }
      },
      {
        path: "/chart",
        name: "Chart",
        component: () =>
          import(/* webpackChunkName: "Chart" */ "../views/chart/index.vue"),
        meta: {
          title: "Chart 图表"
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
          title: "Table 表格"
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
          title: "Decorator 装饰器"
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
          title: "LoadReadFile 读取文件"
        }
      },
      {
        path: "/widge",
        name: "Widge",
        component: () =>
          import(/* webpackChunkName: "Widge" */ "../views/widge/index.vue"),
        meta: {
          title: "Widge 常用网站"
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
          title: "Color 颜色卡"
        }
      },
      {
        path: "/color2",
        name: "Color2",
        component: () =>
          import(/* webpackChunkName: "Color" */ "../views/color/index2.vue"),
        meta: {
          title: "Color 颜色卡2"
        }
      },
      {
        path: "/indicators",
        name: "Indicators",
        component: () =>
          import(
            /* webpackChunkName: "Indicators" */ "../views/indicators/index.vue"
          ),
        meta: {
          title: "Indicators 指示器"
        }
      },
      {
        path: "/carousel",
        name: "Carousel",
        component: () =>
          import(
            /* webpackChunkName: "Carousel" */ "../views/carousel/index.vue"
          ),
        meta: {
          title: "Carousel 走马灯"
        }
      },
      {
        path: "/categorys",
        name: "Categorys",
        component: () =>
          import(
            /* webpackChunkName: "Categorys" */ "../views/categorys/index.vue"
          ),
        meta: {
          title: "Carousel 分类菜单"
        }
      },
      {
        path: "/flexBox",
        name: "FlexBox",
        component: () =>
          import(
            /* webpackChunkName: "FlexBox" */ "../views/flexBox/index.vue"
          ),
        meta: {
          title: "FlexBox 伸缩盒"
        }
      },
      {
        path: "/backgroundClip",
        name: "BackgroundClip",
        component: () =>
          import(
            /* webpackChunkName: "BackgroundClip" */ "../views/backgroundClip/index.vue"
          ),
        meta: {
          title: "BackgroundClip 裁剪背景"
        }
      },
      {
        path: "/radio",
        name: "Radio",
        component: () =>
          import(/* webpackChunkName: "Radio" */ "../views/radio/index.vue"),
        meta: {
          title: "Radio 单选框"
        }
      },
      {
        path: "/flexAnimationCycle",
        name: "FlexAnimationCycle",
        component: () =>
          import(
            /* webpackChunkName: "FlexAnimationCycle" */ "../views/flexAnimationCycle/index.vue"
          ),
        meta: {
          title: "FlexAnimationCycle 动画循环"
        }
      },
      {
        path: "/title",
        name: "Title",
        component: () =>
          import(/* webpackChunkName: "Title" */ "../views/title/index.vue"),
        meta: {
          title: "Title 标题"
        }
      },
      {
        path: "/avatar",
        name: "Avatar",
        component: () =>
          import(/* webpackChunkName: "Avatar" */ "../views/avatar/index.vue"),
        meta: {
          title: "Avatar 头像"
        }
      },
      {
        path: "/form",
        name: "Form",
        component: () =>
          import(/* webpackChunkName: "Form" */ "../views/form/index.vue"),
        meta: {
          title: "Form 表单"
        }
      },
      {
        path: "/aInput",
        name: "AInput",
        component: () =>
          import(/* webpackChunkName: "AInput" */ "../views/aInput/index.vue"),
        meta: {
          title: "AInput"
        }
      },
      {
        path: "/aButton",
        name: "AButton",
        component: () =>
          import(
            /* webpackChunkName: "AButton" */ "../views/aButton/index.vue"
          ),
        meta: {
          title: "AButton"
        }
      },
      {
        path: "/aTabs",
        name: "ATabs",
        component: () =>
          import(/* webpackChunkName: "ATabs" */ "../views/aTabs/index.vue"),
        meta: {
          title: "ATabs"
        }
      },
      {
        path: "/aTextArea",
        name: "ATextArea",
        component: () =>
          import(
            /* webpackChunkName: "ATextArea" */ "../views/aTextArea/index.vue"
          ),
        meta: {
          title: "ATextArea"
        }
      },
      {
        path: "/aInputNumber",
        name: "AInputNumber",
        component: () =>
          import(
            /* webpackChunkName: "AInputNumber" */ "../views/aInputNumber/index.vue"
          ),
        meta: {
          title: "AInputNumber"
        }
      },
      {
        path: "/aPagination",
        name: "APagination",
        component: () =>
          import(
            /* webpackChunkName: "APagination" */ "../views/aPagination/index.vue"
          ),
        meta: {
          title: "APagination"
        }
      },
      {
        path: "/showMsg",
        name: "ShowMsg",
        component: () =>
          import(/* webpackChunkName: "ShowMsg" */ "../views/raw/index.vue"),
        meta: {
          title: "ShowMsg"
        }
      },
      {
        path: "/map",
        name: "map",
        component: () =>
          import(/* webpackChunkName: "Map2D" */ "../views/map2D/index.vue"),
        meta: {
          title: "map"
        }
      },
      {
        path: "/map_done",
        name: "map_done",
        component: () =>
          import(
            /* webpackChunkName: "MAP_DONE" */ "../views/map2D/index_done.vue"
          ),
        meta: {
          title: "map_done 完成版"
        }
      },
      {
        path: "/cesium",
        name: "Cesium",
        component: () =>
          import(/* webpackChunkName: "ShowMsg" */ "../views/cesium/index.vue"),
        meta: {
          title: "Cesium"
        }
      },
      {
        path: "/slider",
        name: "Slider",
        component: () =>
          import(/* webpackChunkName: "Slider" */ "../views/slider/index.vue"),
        meta: {
          title: "Slider"
        }
      },
      {
        path: "/mapToolBar",
        name: "mapToolBar",
        component: () =>
          import(
            /* webpackChunkName: "MapToolbar" */ "../views/mapToolBar/index.vue"
          ),
        meta: {
          title: "mapToolBar"
        }
      },
      {
        path: "/headerSection",
        name: "headerSection",
        component: () =>
          import(
            /* webpackChunkName: "HeaderSection" */ "../views/headerSection/index.vue"
          ),
        meta: {
          title: "HeaderSection 头部"
        }
      },
      {
        path: "/customTabs",
        name: "customTabs",
        component: () =>
          import(
            /* webpackChunkName: "CustomTabs" */ "../views/customTabs/index.vue"
          ),
        meta: {
          title: "customTabs"
        }
      },
      {
        path: "/road",
        name: "road",
        component: () =>
          import(
            /* webpackChunkName: "RoadNetInfoDB" */ "../views/roadNetInfoDB/index.vue"
          ),
        meta: {
          title: "road",
          isFull: true
        }
      },
      {
        path: "/xz",
        name: "xz",
        component: () =>
          import(/* webpackChunkName: "XZ" */ "../views/xz/index.vue"),
        meta: {
          title: "xz"
        }
      },
      {
        path: "/weekPlan",
        name: "weekPlan",
        component: () =>
          import(
            /* webpackChunkName: "WeekPlan" */ "../views/xz/weekPlan/index.vue"
          ),
        meta: {
          title: "weekPlan",
          isFull: true
        }
      },
      {
        path: "/urlTransform",
        name: "urlTransform",
        component: () =>
          import(
            /* webpackChunkName: "UrlTransform" */ "../views/urlTransform/index.vue"
          ),
        meta: {
          title: "URL 编码/解码"
        }
      },
      {
        path: "/carouselCard",
        name: "carouselCard",
        component: () =>
          import(
            /* webpackChunkName: "CarouselCard" */ "../views/carouselCard/index.vue"
          ),
        meta: {
          title: "carouselCard 轮播卡"
        }
      },
      {
        path: "/tableStyle",
        name: "tableStyle",
        component: () =>
          import(
            /* webpackChunkName: "TableStyle" */ "../views/tableStyle/index.vue"
          ),
        meta: {
          title: "table 样式"
        }
      },
      {
        path: "/dynamicForm",
        name: "dynamicForm",
        component: () =>
          import(
            /* webpackChunkName: "DynamicForm" */ "../views/dynamicForm/index.vue"
          ),
        meta: {
          title: "dynamicForm 动态表单"
        }
      },
      {
        path: "/wx_cloud",
        name: "wx_cloud",
        component: () =>
          import(
            /* webpackChunkName: "Wx_cloud" */ "../views/wx_cloud/index.vue"
          ),
        meta: {
          title: "wx_cloud 卫星云图"
        }
      },
      {
        path: "/chatItem",
        name: "chatItem",
        component: () =>
          import(
            /* webpackChunkName: "ChatItem" */ "../views/chatItem/index.vue"
          ),
        meta: {
          title: "chatItem 聊天选项"
        }
      },
      {
        path: "/baguaChart",
        name: "baguaChart",
        component: () =>
          import(
            /* webpackChunkName: "BaguaChart" */ "../views/baguaChart/index.vue"
          ),
        meta: {
          title: "BaguaChart 八卦图"
        }
      },
      {
        path: "/customCalendar",
        name: "customCalendar",
        component: () =>
          import(
            /* webpackChunkName: "CustomCalendar" */ "../views/customCalendar/index.vue"
          ),
        meta: {
          title: "CustomCalendar 自定义日历"
        }
      },
      {
        path: "/pdfPreview",
        name: "pdfPreview",
        component: () =>
          import(
            /* webpackChunkName: "pdfPreview" */ "../views/pdfPreview/index.vue"
          ),
        meta: {
          title: "PdfPreview 预览PDF"
        }
      },
      {
        path: "/customNumberInput",
        name: "customNumberInput",
        component: () =>
          import(
            /* webpackChunkName: "customNumberInput" */ "../views/customNumberInput/index.vue"
          ),
        meta: {
          title: "customNumberInput 自定义数字输入框"
        }
      },
      {
        path: "/customPopup",
        name: "customPopup",
        component: () =>
          import(
            /* webpackChunkName: "customPopup" */ "../views/customPopup/index.vue"
          ),
        meta: {
          title: "customPopup 自定义弹窗"
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
