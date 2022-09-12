import Mock from 'mockjs'
// 登录接口
Mock.setup({
    timeout:100
})
Mock.mock("http://localhost:8080/login",'post',(res)=>{
     const {account,password}=JSON.parse(res.body)
     if(account=='user',password=='12345'){
          return{
               code:200,
               success:true,
               message:'成功',
               token:'kdfiekdf',
               nickName:'小明',
               role:'administration'
          }
     }else{
          return{
               code:100,
               success:false,
               message:'失败'
          }
     }
})
//时间接口
Mock.mock("http://localhost:8080/date","get",()=>{
  return{
     code:200,
     success:true,
     message:'成功',
     date:'2022-2-2 00:00:00'
  }
})
// 菜单
const menuList = [
    {
        name: "首页",
        icon: "el-icon-s-home",
        url: "/index",
    },
    {
        name: "订单管理",
        icon: "el-icon-s-order",
        url: "/order",
        children: [
            {
                name: "订单列表",
                icon: "el-icon-user",
                url: "/order/list",
            }
        ]
    },
    {
        name: "运单管理",
        icon: "el-icon-menu",
        url: "/waybill",
        children: [
            {
                name: "运单录入",
                icon: "el-icon-notebook-2",
                url: "/waybill/in",
            },
            {
                name: "运单列表",
                icon: "el-icon-truck",
                url: "/waybill/list",
            }
        ]
    },
    {
        name: "发车管理",
        icon: "el-icon-s-order",
        url: "/depart",
        children: [
            {
                name: "发车数据单",
                icon: "el-icon-tickets",
                url: "/depart/data",
            }
        ]
    },
    {
        name: "承运商管理",
        icon: "el-icon-user",
        url: "/carrier",
        children: [
            {
                name: "承运商列表",
                icon: "el-icon-chat-square",
                url: "/carrier/list",
            },
            {
                name: "车辆列表",
                icon: "el-icon-bank-card",
                url: "/carrier/trucks",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/carrier/list",
            },
        ]
    },
    {
        name: "客户管理",
        icon: "el-icon-chat-dot-square",
        url: "/customer",
    },
    {
        name: "财务管理",
        icon: "el-icon-user",
        url: "/my",
        children: [
            {
                name: "客户对账单",
                icon: "el-icon-chat-square",
                url: "/customer/info",
            },
            {
                name: "承运商对账单",
                icon: "el-icon-bank-card",
                url: "/record",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/record",
            },
        ]
    },
    {
        name: "个人中心",
        icon: "el-icon-chat-dot-square",
        url: "/personal",
    },
]
//  菜单接口
Mock.mock("http://localhost:8080/menu",'get',()=>{
     return {
          code:200,
          success:true,
          message:'成功',
          data:menuList
     }
})
// 折线图接口
Mock.mock("http://localhost:8080/line",'get',()=>{
    return {
        code:200,
        success:true,
        message:'成功',
        data:{
            "22-1":30,
            "22-2":84,
            "22-3":56,
            "22-4":47,
            "22-5":30,
            "22-6":50,
            "22-7":80
        }
    }
})
// 订单管理-订单列表
Mock.mock("http://localhost:8080/orderList",'post',(res)=>{
   const {page,pageSize} =JSON.parse(res.body)
   console.log(page,pageSize)
   return{
     code:200,
     success:true,
     message:'成功',
     data:Mock.mock({
        [`list|${pageSize}`]:[{
            'id|+1':10000,//订单号
            'status|1':[1,2,3,4],//订单状态1待审核 2已审核3审核通过4审核拒绝
            'date':Mock.Random.date(),//下单时间
            'name|1':['诺来科技有限公司','辉华股份有限公司','川聚物流有限公司','成越材料有限公司','聚博纺织有限公司'],
            'start':Mock.Random.city(true),//起始城市
            'cargo|1':["日用品","纺织品","生鲜","建材","电器"],//货物名称
            'count':Mock.Random.integer(10,200),//件数
            'unit|1':["方","吨"],//单位
            "price":Mock.Random.integer(5000,50000),//运费
            'from|1':["移动端","pc端"],
            'pay|1':[1,2],//是否支付 1已支付 2未支付
        }],
       'total':47
     })
   }
})
// 新建订单接口
Mock.mock("http://localhost:8080/create","post",(res)=>{
   const {name,start,end,cargo,count,unit,from,pay}=JSON.parse(res.body)
   console.log(`订单接口数据${name,start,end,cargo,count,unit,from,pay}`)
   return{
        code:200,
        success:true,
        message:'成功',
   }
})
//运单管理-运单列表
Mock.mock('http://localhost:8080/waybilllist', 'post',(req)=>{
    const {page,pageSize,waybillNo,name,startDate,endDate,bill}= JSON.parse(req.body)
    console.log("服务器接到的参数",page,pageSize,waybillNo,name,startDate,endDate,bill)
    return{
        code:200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'no|+1': 10000,//订单号
                'date': Mock.Random.date(),//下单时间
                'name|1': ["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],//客户名称
                'cargo|1': ["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count': Mock.Random.integer(10, 200),//件数
                'start': Mock.Random.city(true),//起始城市
                'end': Mock.Random.city(true),//目的城市,
                "price":Mock.Random.integer(5000,50000),//运费
                "needRecive|1":[1,2],//1需要接货 2不需要接货
                "plateNumber":["京A123456","苏C66666","鲁B45678"],//车牌号
                "driver":Mock.Random.cname(),
                'tel|1': [15020026703,13515338794,18561041278,1831509786],
                "percent|1":[23,45,77,89,90,87],  
            }],
            "total": 47
        })
    }
})
// 根据token拿角色
Mock.mock("http://localhost:8080/role",'get',()=>{
   return{
    code:200,
    success:true,
    message:'成功',
    role:'administration'
   }
})