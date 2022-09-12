<template>
  <div>
     <el-container>
      <el-aside width="200px">
        <Nav-left></Nav-left>
      </el-aside>
      <el-container>
        <el-header>
           <Header></Header>
        </el-header>
        <el-main class="Mymain">
          <keep-alive>
             <router-view v-if="$route.meta.keepLive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepLive"></router-view>
        </el-main>
        <el-footer class="footer">
            京icp888888号
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header"
import NavLeft from '@/components/NavLeft'
export default {
  name:'MyLayout',
  components:{Header,NavLeft}
}
</script>

<style>
.el-aside{
  height: 100vh;
  background-color: #001529;
}
.Mymain{
  height: 70vh;
  background-color: #e9eef3;
}
.footer{
  line-height: 72px;
  text-align: center;
   background-color: #e9eef3;
}
</style>