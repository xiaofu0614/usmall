<template>
  <div>
    <div
      id="main"
      style="width: 1000px; height: 500px; border: 1px solid #000"
    ></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import {mapActions,mapGetters} from 'vuex'
export default {
computed:{
     ...mapGetters({
     list: "classify/list",
   })
 },
data () {
 return {
 }
},
methods:{
      ...mapActions({
        getcateList:'classify/getcateList'
    })
},
mounted(){
  this.getcateList()
  
},
watch:{
    list:{
        handler(){
           var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: this.list.map(item=>item.children?item.children.length:0)
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option); 
        },
        deep:true
    }
}
}
</script>
<style scoped>
</style>