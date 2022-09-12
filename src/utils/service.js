import axios from 'axios'
import {Message} from 'element-ui'
import {getToken} from '@/utils/auth.js'
const serve= axios.create({
    baseURL:'http://localhost:8080',
    timeout:1000
})
// 请求拦截器
serve.interceptors.request.use((res)=>{
   if(getToken()){
      res.headers.token=getToken()
   }
   return res
})
// 响应拦截器
serve.interceptors.response.use((config)=>{
   const res=config.data
      if(res.success){
         return res
      }else{
         Message({
            type:'warning',
            message:res.message||'请求错误'
         })
         return Promise.reject(new Error(res.message||'请求失败'))
      }
},(error)=>{
   Message({
      type:'warning',
      message:error.message||'请求错误'
   })
})
export default serve