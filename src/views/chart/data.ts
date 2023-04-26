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
        orient: "vertical",
        left: "left"
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "55%",
          data: [
            { value: 58, name: "Vue" },
            { value: 35, name: "Css" },
            { value: 32, name: "Javascript" },
            { value: 22, name: "NodeJs" },
            { value: 20, name: "Typescript" },
            { value: 8, name: "React" },
            { value: 10, name: "AngularJs" }
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
        data: ["Email", "Ads", "Search Engine"]
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
  }
];
