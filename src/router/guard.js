import router from './index'
import store from '@/store'
import asyncRouter from './asyncRoutermap'
import {getToken} from '@/utils/auth'
router.beforeEach(async (to,from ,next)=>{
    const hasToken=getToken()
    if(hasToken){
        if(to.path=="/"){
            next('/layout')
        }else{
            await store.dispatch('GetRole')
            if(to.name==null){
                let f=asyncRouter.filter((item)=>{
                   return item.meta.auth.includes(store.state.role)
                })
                console.log(f)
                for(let i=0;i<f.length;i++){
                    router.addRoute(f[i])
                }
                next({...to,replace:true})
            }else{
                next()
            }
            next()
        }
    }else{
        if(to.path=="/"){
            next()
        }else{
            next('/')
        }
    }
})