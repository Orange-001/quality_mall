/* 
1 输入框绑定 值改变事件 input事件
  1 获取到输入框的值
  2 合法性判断 
  3 检验通过 把输入框的值 发送到后台
  4 返回的数据打印到页面上
2 防抖 （防止抖动） 定时器  节流 
  0 防抖 一般 输入框中 防止重复输入 重复发送请求
  1 节流 一般是用在页面下拉和上拉 
  1 定义全局的定时器id
3 参考
　　https://blog.csdn.net/wangningjing87/article/details/100703736
4 我的理解
  1、防抖一般是单位时间内多次事件，最后一次再执行（先设置定时器=null，每次进来直接清除，然后设置定时器）
    节流一般是单位时间内多次事件，执行第一次（先设置定时器=null，每次进来判断是否为空，非空则return，空则设置定时器，定时器内部完成后就设置为null）
  2、节流函数，只允许一个函数在 X 毫秒内执行一次。
    与防抖相比，节流函数最主要的不同在于它保证在 X 毫秒内至少执行一次我们希望触发的事件 handler。
    也即是说：多次触发事件的情况下，节流保证单位时间内必定执行，而防抖则不一定（因为用户可能一直在点击，没停过）。
    */
import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goods:[],
    // 取消 按钮 是否显示
    isFocus:false,
    // 输入框的值
    inpValue:""
  },
  TimeId: null,
  // 输入框的值改变 就会触发的事件
  handleInput(e){
    // 1 获取输入框的值
    const {value}=e.detail;
    // 2 检测合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      // 值不合法
      return;
    }
    // 3 准备发送请求获取数据
    this.setData({
      isFocus:true
    })
    // if(this.TimeId){ return }  节流代码步骤1
    clearTimeout(this.TimeId);  //防抖代码
    this.TimeId=setTimeout(() => {
      this.qsearch(value);
      // this.TimeId = null   节流代码步骤2
    }, 1000);
  },
  // 发送请求获取搜索建议 数据
  async qsearch(query){
    const res=await request({url:"/goods/qsearch",data:{query}});
    // console.log(res);
    this.setData({
      goods:res
    })
  },
  // 点击 取消按钮
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})