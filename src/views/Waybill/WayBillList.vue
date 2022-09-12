<template>
  <div>
     <breadCrumb></breadCrumb>
     <el-card class="mt">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model="params.waybillNo" placeholder="请输入订单号"></el-input>
            </el-col>
            <el-col :span="6">
                <el-input v-model="params.name" placeholder="请输入客户名称"></el-input>
            </el-col>
            <el-col :span="6">
                <div class="block">
                    <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="6" class="tr">
                <el-button type="primary" size="small" @click="inquire">查询</el-button>
                <el-button type="primary" size="small">充值</el-button>
            </el-col>
        </el-row>
     </el-card>
     <el-card class="box-card mt">
      <div slot="header" class="clearfix">
        <el-radio-group v-model="params.bill" @change="change">
          <el-radio-button :label="1">全部订单(50)</el-radio-button>
          <el-radio-button :label="2">装货中(10)</el-radio-button>
          <el-radio-button :label="3">运输中(20)</el-radio-button>
          <el-radio-button :label="4">已完成(10)</el-radio-button>
          <el-radio-button :label="5">运单异常(10)</el-radio-button>
        </el-radio-group>
      </div>
      <el-table
              element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
           height="150"
           v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column type="selection" fixed>
          </el-table-column>
          <el-table-column type="index">
          </el-table-column>
          <el-table-column
            prop="no"
            label="订单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="下单时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="客户名称">
          </el-table-column> 
          <el-table-column
            prop="cargon"
            label="货物名称">
          </el-table-column>
          <el-table-column
            prop="count"
            label="件数">
          </el-table-column>
          <el-table-column
            prop="start"
            label="起始城市">
          </el-table-column>
          <el-table-column
            prop="end"
            label="目的城市">
          </el-table-column>
          <el-table-column
            prop="price"
            label="运费">
          </el-table-column>
          <el-table-column
            prop="name"
            label="客户名称">
          </el-table-column>
          <el-table-column
            prop="needRecive"
            label="是否接货"
            width="180"
            >
            <template slot-scope="scope">
              {{scope.row.needRecive==1?"需要接货":"不需要接货"}}
            </template>
          </el-table-column>
          <el-table-column
            prop="plateNumber"
            label="车牌号">
          </el-table-column>
          <el-table-column
            prop="driver"
            label="司机">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="percent"
            label="运输进度"
            width="180px">
            <template slot-scope="scope">
              <el-progress :percentage="scope.row.percent"></el-progress>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
            fixed="right"
          >
             <template>
                  <el-button size="mini" type="primary"  @click="details">详情</el-button>
                  <el-button size="mini"  type="success">修改</el-button>
             </template>
          </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      class="tr"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import clearCache from '@/clearCache/index'
import moment from 'moment'
import {post} from "@/utils/http"
import breadCrumb from '@/components/BreadList.vue'
export default {
  created(){
     this.getWayBill()
  },
   beforeRouteLeave (to, from, next) {
       if(to.path!=='/waybill/list/detail'){
          //this.$route.meta.keepLive=true
          clearCache(this)
       }
       next()
   },
   data(){
    return{
      loading:true,
      total:0,
      tableData:[],
      params:{
        waybillNo:'',
        name:'',
        bill:1,
        startDate:'',
        endDate:''
      },
      date:'',
      paging:{
        page:1,
        pageSize:10,
      }
    }
   },
  name:"MyWayBill",
  components:{breadCrumb},
  methods:{
     async getWayBill(){
        this.params.startDate=moment(this.date[0]).format('YYYY-MM-DD')
        this.params.endDate=moment(this.date[1]).format('YYYY-MM-DD')
         const res=await post('/waybilllist',{...this.params,...this.paging})
         this.tableData=res.data.list
         this.total=res.data.total
         this.loading=false

     },
     inquire(){
       this.getWayBill()
     },
     change(){
        this.getWayBill()
     },
     handleSizeChange(val){
        this.paging.pageSize=val
        this.getWayBill()
     },
     handleCurrentChange(val){
        this.paging.page=val
        this.getWayBill()
     },
     details(){
        this.$router.push({name:'wayBillIn',params:{target:this}})
     },
    //清除缓存
  },
}
</script>

<style>

</style>