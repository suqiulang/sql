<template>
  <div>
     <el-submenu v-if="menu.children" :index="menu.url">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.name}}</span>
        </template>
        <My-menu v-for="(item,index) in menu.children" :key="index" :menu="item"></My-menu>
     </el-submenu>
     <el-menu-item v-else :index="menu.url">
        <i :class="menu.icon"></i>
        <span>{{menu.name}}</span>
     </el-menu-item>
  </div>
</template>

<script>
export default {
   name:'MyMenu',
   props:['menu']
}
</script>

<style>
.el-menu-item{
    color: #fff!important;
}
</style>