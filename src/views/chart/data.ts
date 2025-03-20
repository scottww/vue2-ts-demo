export const CHART_LIST = [
  {
    name: "柱状图",
    option: {
      color: ["#33cccc", "#0066ff"], //#0066ff
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        textStyle: {
          align: "left" //提示的文本对齐
        }
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      barGap: 0,
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          emphasis: {
            focus: "series"
          },
          showBackground: false,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)"
          }
        },
        {
          data: [20, 100, 50, 180, 30, 60, 120],
          type: "bar",
          // emphasis: {
          //   focus: "series"
          // },
          showBackground: false,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)"
          }
        }
      ]
    }
  },
  {
    name: "折线图",
    option: {
      color: ["#0066ff", "#3ad29f", "#b4b4b4"], //#0066ff
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line"
        },
        textStyle: {
          align: "left" //提示的文本对齐
        },
        showContent: true
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [56.5, 82.1, 88.7, 70.1, 53.4, 85.1, 90.1],
          type: "line",
          // smooth: true,
          seriesLayoutBy: "row"
          // emphasis: {
          //   focus: "series"
          // },
          // backgroundStyle: {
          //   color: "rgba(180, 180, 180, 0.2)"
          // }
        },
        {
          data: [51.1, 51.4, 55.1, 53.3, 73.8, 68.7, 60.1],
          type: "line",
          // smooth: true,
          seriesLayoutBy: "row"
          // emphasis: {
          //   focus: "series"
          // },
          // backgroundStyle: {
          //   color: "rgba(180, 180, 180, 0.2)"
          // }
        },
        {
          data: [25.2, 37.1, 41.2, 18, 33.9, 49.1, 50.1],
          type: "line",
          // smooth: true,
          seriesLayoutBy: "row"
          // emphasis: {
          //   focus: "series"
          // },
          // backgroundStyle: {
          //   color: "rgba(180, 180, 180, 0.2)"
          // }
        }
      ]
    }
  },
  {
    name: "饼图",
    option: {
      title: {
        text: "前端技术",
        subtext: "2023",
        left: "center"
      },
      // tooltip: {
      //   trigger: "item"
      // },
      legend: {
        // orient: "vertical",
        // left: "left",
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 20,
        bottom: 20,
      },
      grid: {
        left: '20%'
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 58, name: "Vue" },
            { value: 35, name: "Css" },
            { value: 32, name: "Javascript" },
            { value: 22, name: "NodeJs" },
            { value: 20, name: "Typescript" },
            { value: 8, name: "React" },
            { value: 10, name: "AngularJs" },
            // { value: 58, name: "Vue1" },
            // { value: 35, name: "Css2" },
            // { value: 32, name: "Javascript3" },
            // { value: 22, name: "NodeJs4" },
            // { value: 20, name: "Typescript5" },
            // { value: 8, name: "React6" },
            // { value: 10, name: "AngularJs7" }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    }
  },
  {
    name: "面积图",
    option: {
      title: {
        text: "Area Chart"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        },
        textStyle: {
          align: "left" //提示的文本对齐
        }
      },
      legend: {
        data: ["Email", "Ads", "Search Engine"],
        top: '10%'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: [220, 332, 501, 634, 690, 730, 810]
        },
        // {
        //   name: 'Union Ads',
        //   type: 'line',
        //   stack: 'Total',
        //   areaStyle: {},
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [220, 182, 191, 234, 290, 330, 310]
        // },
        {
          // name: 'Video Ads',
          name: "Ads",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: [450, 532, 701, 854, 890, 730, 1010]
        },
        // {
        //   name: 'Direct',
        //   type: 'line',
        //   stack: 'Total',
        //   areaStyle: {},
        //   emphasis: {
        //     focus: 'series'
        //   },
        //   data: [320, 332, 301, 334, 390, 330, 320]
        // },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          label: {
            show: true,
            position: "top"
          },
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: [1120, 932, 901, 934, 1190, 1330, 1220]
        }
      ]
    }
  },
  {
    name: '力引导布局',
    option: {
      // 提示框的配置
      tooltip: {
        // 显示节点的 des 属性值
        formatter: function (x:any) {
          return x.data.des;
        },
      },
      toolbox: {
        show: true,
        feature: {
          mark: {
            show: true,
          },
          // 还原，将图表恢复到初始状态
          restore: {
            title: "还原",
            onclick: () => {
              // ...点击执行相应的代码
              console.log("还原");
            },
            show: true,
          },
          saveAsImage: {
            show: true,
          },
        },
      },
      series: [
        {
          type: "graph", // 关系图
          layout: "force", // 力引导布局
          symbolSize: 50, // 节点的大小为 50
          roam: true, // 是否开启鼠标缩放和平移漫游。设置为 true 表示都开启，'scale' 只开启缩放或 'move' 只开启平移
          edgeSymbol: ["circle", "arrow"], // 边的两端符号，一个圆圈和一个箭头，用于表示关系的方向
          edgeSymbolSize: [2, 10], // 边两端符号的大小，第一个值是出发地圆圈的大小，第二个值是箭头的大小
          edgeLabel: {
            normal: {
              textStyle: {
                fontSize: 15, // 边标签的字体大小为 15
              },
              show: true, // 显示边标签
              formatter: function (x:any) {
                return x.data.name; // 边标签的内容为边数据中的 name 属性值
              },
            },
          },
          force: {
            repulsion: 2000, // 节点之间的斥力系数，值越大节点之间的距离越远
            edgeLength: [10, 50], // 边的长度范围，可根据需求调整这个范围以改变关系的显示长度
          },
          draggable: true, // 节点是否可拖拽，方便用户进行交互调整
          lineStyle: {
            normal: {
              width: 2, // 边的宽度为 2
              color: "#4b565b", // 边的颜色为深灰色
            },
          },
          label: {
            normal: {
              show: true, // 显示节点标签
              textStyle: {}, // 可以在这里进一步设置节点标签的样式，如字体大小、颜色等
            },
          },
          // 节点部分，包含节点和边的信息
          data: [
            {
              name: "至",
              des: "",
              category: 0,
              symbolSize: 50,
              itemStyle: {
                color: "#efc2c8",
              },
            },
            {
              name: "白",
              des: "",
              category: 0,
              symbolSize: 50,
              itemStyle: {
                color: "#efc2c8",
              },
            },
            {
              name: "孙",
              des: "",
              category: 0,
              symbolSize: 50,
              itemStyle: {
                color: "#efc2c8",
              },
            },
            {
              name: "紫",
              des: "",
              category: 0,
              symbolSize: 50,
              itemStyle: {
                color: "#efc2c8",
              },
            },
          ],
          // 关系部分，source 起始节点，target 目标节点，name 边的名称，des 边的描述信息
          //这个关系图的数据调整顺序，结果不变
          links: [
            {
              name: "like1",
              source: "至",
              des: "",
              target: "白",
            },
            {
              name: "like3",
              source: "孙",
              des: "",
              target: "紫",
            },
            {
              name: "like2",
              source: "白",
              des: "",
              target: "孙",
            },
            {
              name: "like4",
              source: "紫",
              des: "",
              target: "至",
            }
          ],
          // categories: categories, // 将之前定义的类目数组传递给图表配置
        },
      ],
    }
  }
];
