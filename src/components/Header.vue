<template>
  <div class="header_line">
        <div class="header_item">
         <el-dropdown class=" fr"  @command="handleCommand">
            <span class="el-dropdown-link">
                欢迎您！{{nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人中心</el-dropdown-item>
                <el-dropdown-item command="b">修改资料</el-dropdown-item>
                <el-dropdown-item command="c">推出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
         <p class="fr date">今天是进阿里的<span>{{handleTime}}</span>天</p>
         <div class="clear"></div>
        </div>
  </div>
</template>

<script>
import {get} from '@/utils/http'
import {removeToken} from '@/utils/auth'
export default {
  name:'MyHeader',
 data(){
    return{
        nickName:'',
        date:''
    }
 },
  mounted(){
    this.nickName=sessionStorage.getItem("nickName")
    get('/date').then(({date})=>{
       this.date=date
    })
  },
  computed:{
    handleTime(){
        const now=new Date()
        const ago=new Date(this.date)
        const time=Math.floor((now-ago)/1000/60/60/24)
        return time
    }
  },
  methods:{
    handleCommand(command){
      if(command=="c"){
         removeToken()
         this.$router.push('/')
      }
    },
  }
}
</script>

<style lang="less" scoped>
.date{
  margin-right:50px;
  color:#2c3e50;
  span{
    color:#40a9ff;
    font-size:24px;
  }
}
.header_line{
  line-height: 60px;
}
.header_item{
  background-color: #fff;
  box-shadow:1px 1px 5px -3px;
}
</style>