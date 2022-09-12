import serve from './service.js'
export function get(url,params){
   const config={
        url,
        method:'get'
    }
    if(params){
        config.data=params
    }
    return serve(config)
}
export function post(url,params){
    const config={
         url,
         method:'post'
     }
     if(params){
         config.data=params
     }
     return serve(config)
 }