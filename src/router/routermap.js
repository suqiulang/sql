export default[
    {
        path:'/',
        name:'Login',
        component:()=>import('@/views/Login.vue')
    },
    {
        path:'/layout',
        name:'Layout',
        component:()=>import('@/views/Layout.vue'),
        redirect:'/index',
        children:[
            {
              path:'/index',
              name:'Index',
              component:()=>import('@/views/index/index.vue')
            },
            {
               path:'/order/list',
               name:'OrderList',
               meta:{bread:['订单管理','订单列表']},
               component:()=>import('@/views/order/Order.vue')
            },
            {
                path:'/waybill/list',
                name:'WayBill/list',
                meta:{bread:["运单管理","运单列表"],keepLive:true},
                component:()=>import('@/views/Waybill/WayBillList.vue')
            },
            {
                path:'/waybill/list/detail',
                name:'wayBillIn',
                component:()=>import('@/views/Waybill/WayBillIn.vue')
            }
        ]
    },
]
