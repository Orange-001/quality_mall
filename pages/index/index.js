// 输入wx-page回车自动生成
//Page Object
import { request } from '../../request/request.js'
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航 数组
    catesList: [],
    // 楼层数据
    floorList:[]
  },
  // 页面开始加载 就会触发
  onLoad: function(options){
    // 1 发送异步请求获取轮播图数据  优化的手段可以通过es6的 promise来解决这个问题
    /* wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        this.setData({
          swiperList: result.data.message
        })
      }
     }); */
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  // 获取轮播图数据
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      result.forEach((val,idx,arr) => {
        arr[idx].navigator_url = arr[idx].navigator_url.replace("main","index")
      });
      // console.log(result)
      this.setData({
        swiperList: result
      })
    })
  },
  // 获取 分类导航数据
  getCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        catesList: result
      })
    })
  },
  // 获取 楼层数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      result.forEach((val1,idx1,arr1)=>{
        arr1[idx1].product_list.forEach((val,idx,arr) => {
          arr[idx].navigator_url = arr[idx].navigator_url.replace("?","/index?")
        });
      })
      this.setData({
        floorList: result
      })
      // console.log(this.data.floorList)
    })
  }
});