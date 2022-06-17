<template>
  <div id="picture"></div>
</template>

<script>
import {onMounted } from "vue";
import * as echarts from "echarts";
export default {
  props: {
    mychartdata: Object,
  },
  setup(props) {
    function init(data, links,height) {
       var Charts=document.getElementById("picture")
       Charts.style.height=height+'vh'
      var myChart = echarts.init(Charts);
      // 指定图表的配置项和数据                             
      var option = {
        animation: true,
        title: {
          text: "所有关系的展示",
        },
        tooltip: {
          triggeron: "click",
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph", // 类型:关系图
            layout: "force", //图的布局，类型为力导图
            symbolSize: 65, //节点大小
            focusNodeAdjacency: true, //当鼠标移动到节点上，突出显示节点以及节点的边和邻接节点
            draggable: true, //指示节点是否可以拖动
            legendHoverLink: true, //是否启用图例 hover(悬停) 时的联动高亮。
            hoverAnimation: true, //是否开启鼠标悬停节点的显示动画
            roam: true,
            edgeSymbol: ["none", "arrow"],
            cursor: "pointer",
            edgeSymbolSize: [3, 10],
            focusNodeAdjacency: true,
            itemStyle: {
              borderColor: "black",
              borderWidth: 1,
              borderType: "solid",
              symbolSize: 40,
              // normal: {
              //   //默认样式
              //   label: {
              //     show: true,
              //   },
              //   borderType: "solid", //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
              //   borderColor: "rgba(255,215,0,0.4)", //设置图形边框为淡金色,透明度为0.4
              //   borderWidth: 2, //图形的描边线宽。为 0 时无描边。
              //   opacity: 1,
              //   // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
              // },
              emphasis: {
                //高亮状态
              },
            },
            label: {
              show: true, //是否显示标签。
              textStyle: {
                fontSize: 12,
                color: "#cde6c7",
                fontStyle: "oblique", //文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                fontWeight: "bolder", //'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                fontFamily: "sans-serif", //文字的字体系列
                shadowBlur: 10,
                shadowColor: "transparent",
              },
              emphasis: {
                //高亮状态
              },
            },
            force: {
              repulsion: 4000, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              edgeLength: 450, //边的两个节点之间的距离
              gravity: 0.1, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              layoutAnimation: true, // 显示布局的迭代动画
            },
            edgeSymbolSize: [4, 50], // 边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 15,
                },
                formatter: "{c}",
                emphasis: {
                  //高亮状态
                },
              },
            },
            // layout:'',
            data: data,
            links: links,
            lineStyle: {
              opacity: 0.9,
              width: 1.1,
              curveness: 0,
              color: "#262626",
              normal: {
                color: "rgb(50, 121, 168)",
                width: "3",
                type: "dotted", //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
                curveness: 0.5, //线条的曲线程度，从0到1
                opacity: 1,
                // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
              },
              emphasis: {
                //高亮状态
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    }
    onMounted(() => {
      setTimeout(() => {
        init(props.mychartdata[0], props.mychartdata[1],props.mychartdata[2]);
      }, 1000);
    });
    return {
    };
  },
};
</script>

<style>
</style>