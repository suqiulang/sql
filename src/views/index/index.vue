<template>
  <div>
      <el-row :gutter="24" class="mb main">
         <el-col :span="6">
            <div class="item1">
                <div class="fl">
                    <p>本月进件</p>
                    <p>6588</p>
                    <p>+12.5%与上月对比</p>
                </div>
                <div class="fr">
                <i class="el-icon-postcard ico"></i>
                </div>
                <div class="clear"></div>
            </div>  
         </el-col>
         <el-col :span="6">
            <div class="item2">
            <div class="fl">
                    <p>本月贷款</p>
                    <p>6588</p>
                    <p>+12.5%与上月对比</p>
                </div>
                <div class="fr">
                <i class="el-icon-document-copy ico"></i>
                </div>
                <div class="clear"></div>
            </div>
            </el-col>
         <el-col :span="6">
            <div class="item3">
                <div class="fl">
                <p>累计进件</p>
                <p>1233</p>
                <p>+14.5%与上月对比</p>
              </div>
              <div class="fr">
               <i class="el-icon-s-home ico"></i>
              </div>
              <div class="clear"></div>
            </div> 
         </el-col>
         <el-col :span="6">
            <div class="item4">
                <div class="fl">
                <p>累计放款</p>
                <p>7633</p>
                <p>+45.5%与上月对比</p>
              </div>
              <div class="fr">
               <i class="el-icon-chat-line-square ico"></i>
              </div>
              <div class="clear"></div>
            </div>
         </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
           <el-card>
               <div slot="header" class="clearfix">
                    <span>进件统计分析</span>
                </div>
               <div ref="analyse" style="height:200px"></div>
           </el-card>
        </el-col>
        <el-col :span="8">
           <el-card>
               <div slot="header" class="clearfix">
                    <span>进件统计分析</span>
              </div>
              <div style="height:200px" ref="percent"></div>
           </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-card>
              <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
                </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <el-calendar v-model="value"></el-calendar>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {get} from '@/utils/http'
export default {
  name:'MyIndex',
  data(){
     return{
        value:''
     }
  },
  mounted(){
    this.drawline()
    this.pieline()
  },
  methods:{
    // 折线图
   async drawline(){
        let myChart =  echarts.init(this.$refs['analyse']);
        const {data}=await get('/line')
        let keys=[]
        let values=[]
        for(let key in data){
           keys.push(key)
           values.push(data[key])
        }
        const option = {
            tooltip:{
               trigger:'axis',
               formatter: '类目是{b}:<br/>数值是 {c}'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: keys
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: values,
                type: 'line',
                smooth: true,
                areaStyle:{
                    color:{
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#4f88ff' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'white' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
                }
            ]
            }
    myChart.setOption(option)
    },
    // 饼图
    pieline(){
       let myChart =  echarts.init(this.$refs['percent']);
       const option = {
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ]
            }
        ]
        };
    myChart.setOption(option)
    }
  }
}
</script>

<style>
.item1{
     padding:10px;
    background-color: green;
}
.item2{
     padding:10px;
    background-color: red;
}
.item3{
    padding:10px;
    background-color: pink;
}
.item4{
    padding:10px;
    background-color: yellow;
}
</style>