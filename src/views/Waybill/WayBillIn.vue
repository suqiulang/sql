<template>
  <div>
       <h1>我是详情页面</h1>
       <button @click="back">返回</button>
  </div>
</template>

<script>
import clearCache from '@/clearCache/index'
export default {
    beforeRouteLeave (to, from, next) {
       if(to.path!=="/waybill/list"){
           clearCache(from.params.target)
       }
       next()
    },
    name:'MyBill',
    methods:{
        back(){
            this.$router.push('/waybill/list')
        },
    }

}
</script>

<style>

</style>