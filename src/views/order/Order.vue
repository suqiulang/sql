<template>
  <div>
      <bread-Crumb></bread-Crumb>
      <el-card class="mt">
         <el-row :gutter="24">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="paramsData.searchValue" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="8" :offset="8" class="operate">
                 <el-button size="mini" type="primary" @click="visible=true">新建订单</el-button>
                 <el-button size="mini" :disabled="!selectData.length" @click="operate(1)">审核</el-button>
                 <el-button size="mini" :disabled="!selectData.length" @click="operate(2)">修改</el-button>
                 <el-button size="mini" :disabled="!selectData.length" @click="operate(3)">作废</el-button>
            </el-col>
         </el-row>
      </el-card>
       <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
           height="300"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          >
          <el-table-column
            fixed="left"
            type="selection"
            >
          </el-table-column>
          <el-table-column
            label="序号"
            type="index">
          </el-table-column>
          <el-table-column
            prop="id"
            label="订单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="status"
            label="订单状态"
            width="180">
              <template slot-scope="scope">
                   <span v-if="scope.row.status==1">待审核</span>
                   <span v-if="scope.row.status==2">已审核</span>
                   <span v-if="scope.row.status==3">审核通过</span>
                   <span v-if="scope.row.status==4">审核拒绝</span>
              </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="下单时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="客户名称"
            width="180">
          </el-table-column>
            <el-table-column
            prop="start"
            label="起始城市"
            width="180">
          </el-table-column>
          <el-table-column
            prop="cargo"
            label="货物名称"
            width="180">
          </el-table-column>
           <el-table-column
            prop="count"
            label="件数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位"
            width="180">
          </el-table-column>
           <el-table-column
            prop="price"
            label="运费"
            width="180">
          </el-table-column>
          <el-table-column
            prop="from"
            label="订单来源"
            width="180">
          </el-table-column>
          <el-table-column
            prop="pay"
            label="是否支付"
            width="180">
            <template slot-scope="scope">
                <span>{{scope.row.pay===1?"已支付":"未支付"}}</span>
            </template> 
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.row)">编辑
                </el-button>
                <el-button type="success" size="mini" @click="remove(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div class="block">
    <el-pagination
    class="tr"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
    <OrderDialog :visible="visible" @operate="visible=false" :create="create" @edit="edit" @getTable="getTable"></OrderDialog>
  </div>
</template>

<script>
import OrderDialog from './OrderDialog.vue'
import breadCrumb from '@/components/BreadList.vue';
import {post} from '@/utils/http'
// import breadCrumb from '@/mixins/breadCrumb'
export default {
name:'MyOrder',
data(){
  return{
    create:{},
    visible:false,
     istrue:true,
     loading:true,
     selectData:[],
     tableData:[],
     total:0,
     paramsData:{
        page:1,
        pageSize:10,
        searchValue:''
     }
  }
},
mounted(){
    this.getTable()
},
components:{ breadCrumb, OrderDialog },
methods:{
  async getTable(){
      const res=await post('/orderList',this.paramsData)
      this.tableData=res.data.list
      this.total=res.data.total
      this.loading=false
   },
   handleSizeChange(val){
      this.paramsData.pageSize=val
      this.getTable()
   },
   handleCurrentChange(val){
     this.paramsData.page=val
   },
   handleSelectionChange(val){
       this.selectData=val
   },
   operate(val){
    const id=this.selectData.map(item=>item.id)
      if(val==1){
          this.$notify({
          title: '成功',
          message: `${id}审核成功`,
          type: 'success'
        });
      }
     if(val==2){
        this.$notify({
          title: '成功',
          message: `${id}修改成功`,
          type: 'success'
        });
     }
     if(val==3){
        this.$notify({
          title: '成功',
          message: `${id}作废成功`,
          type: 'success'
        });
     }
   },
   remove(id){
    this.$notify({
          title: '成功',
          message: `${id}删除成功`,
          type: 'success'
        })
   },
   edit(data){
      this.visible=true
      // const {name,start,end,cargo,count,unit,from,pay,price}=data
      // this.create={name,start,end,cargo,count,unit,from,pay,price}
      // this.$bus.$emit("nav")
      this.create = data
   }
}
}
</script>

<style>
.operate{
  text-align: right;
}
</style>