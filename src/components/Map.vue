<template>
  <div class="map">
    <div id="chart" style="width:100%;height:500px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china"; //引入中国地图
import jsonp from "jsonp";

let option = {
  title: {
    text: "vue实现疫情地图",
    x: "center",
    textStyle: {
      color: "#9c0505"
    }
  },
  tooltip: {
    trigger: "item",
    formatter: "地区：{b}<br/>确诊: {c}"
  },
  visualMap: {
    //视觉地图
    type: "piecewise", //分段型
    show: true,
    pieces: [
      { min: 10000 }, // 不指定 max，表示 max 为无限大（Infinity）。
      { min: 1000, max: 9999 },
      { min: 100, max: 999 },
      { min: 10, max: 99 },
      { min: 1, max: 9 },
      { value: 0 } // 不指定 min，表示 min 为无限大（-Infinity）。
    ],
    inRange: {
      color: ["#fff", "#ffaa85", "#660208"]
    }
  },
  series: [
    {
      type: "map",
      map: "china",
    //   data: [
    //     { name: "北京", value: 200 },
    //     { name: "湖北", value: 20000 }
    //   ],
      label: {
        show: true,
        color: "red",
        fontSize: 10
      },
      zoom: 1.5,
      itemStyle: {
        borderColor: "blue"
      },
      emphasis: {
        label: {
          color: "#fff",
          fontSize: 12
        },
        itemStyle: {
          areaColor: "green"
        }
      }
    }
  ]
};
export default {
  data() {
    return {
        myChart: ''
    };
  },
  mounted() {
    this.getData();
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById("chart"));

    // 使用刚指定的配置项和数据显示图表。
    //myChart.setOption(option);
  },
  methods: {
    //实时真实数据
    //https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427
    getData() {
      jsonp(
        "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427",
        (err, data) => {
            console.log(data.data.list)
            //map有返回值  ，foreach没有返回值
          var dataList = data.data.list.map(item => {
              
            return { name: item.name, value: item.value };
          });
          option.series[0].data = dataList;
          // 使用刚指定的配置项和数据显示图表。
          this.myChart.setOption(option);
        }
      );
    }
  }
};
</script>

<style>
</style>
