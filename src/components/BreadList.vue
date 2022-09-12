<template>
  <div>
      <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in bread" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script>
export default {
name:'MyBread',
  data(){
        return{
            bread:[]
        }
    },
    created(){
        this.breadCrumb()
    },
    methods:{
        breadCrumb(){
            this.bread=this.$route.meta.bread||[]
        }
    }
}
</script>

<style>

</style>