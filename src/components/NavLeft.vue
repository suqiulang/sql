<template>
  <div>
    <h1 class="finance">邦达货运管理系统</h1>
     <el-menu router background-color="#001529" text-color="#fff" unique-opened>
        <Menu v-for="(item,index) in menu" :key="index" :menu="item"></Menu>
     </el-menu>
  </div>
</template>
<script>
import {get} from '@/utils/http'
import Menu from '@/components/Menu.vue'
export default {
    data(){
        return{
            menu:''
        }
    },
  mounted(){
     get('/menu').then(({data})=>{
        this.menu=data
     })
  },
  components:{Menu}
}

</script>

<style>
.finance{
    color:#fff;
}
</style>