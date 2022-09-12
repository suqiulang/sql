<template>
  <div>
    <el-row type="flex" justify="center" style="margin-top:100px">
       <el-col :span="8" >
           <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h1>樱花后台管理系统</h1>
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账户" prop="account">
              <el-input v-model="ruleForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                 <el-button type="primary" style="width:100%" @click="login" :loading="loading">登录</el-button>
            </el-form-item>
          </el-form>
      </el-card>
       </el-col>
    </el-row>
  </div>
</template>

<script>
import {post} from '@/utils/http.js'
import {setToken} from '@/utils/auth.js'
import { mapMutations } from 'vuex'
export default {
  name:'MyLogin',
  data(){
    return{
        loading:false,
        ruleForm:{
            account:'',
            password:''
        },
        rules:{
            account:[
                {required: true, message: '账户不能为空', triggle: 'blur' },
                {min:3,max:5,message:'长度在3到5个字符',trigger:'blur'},
            ],
            password:[
                {required:true,message:'密码不能为空',triggle:'blur'},
                {min:3,max:5,message:'长度在3到5个字符',trigger:'blur'},
                {pattern:/^\d{3,5}$/,message:'密码为3到5位数字',trigger:'blur'}
            ]
        }
    }
  },
  methods:{
    ...mapMutations(['getRole']),
    login(){
       this.$refs.ruleForm.validate((valid)=>{
          if(valid){
             this.loading=true
             post('/login',this.ruleForm).then((res)=>{
                this.getRole(res.role)
                this.loading=false
                setToken(res.token)
                sessionStorage.setItem("nickName",res.nickName)
                this.$router.push('/layout')
             }).catch((error)=>{
              this.loading=false
               console.log(error)
             })
          }
       })
    }
  }
}
</script>

<style>

</style>