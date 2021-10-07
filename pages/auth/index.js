import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx";
Page({
  // 获取用户信息
  async handleGetUserInfo(e){
    try {
      // 1 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail;
      // 2 获取小程序登录成功后的code
      const { code } = await login();
      const loginParams={ encryptedData, rawData, iv, signature ,code};
      //  3 发送请求 获取用户的token
      const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
      // 4 把token存入缓存中 同时跳转回上一个页面
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1  /* 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 */
      });
    } catch (error) {
      console.log(error);
    }
  },

  /* getUserProfile(){
    wx.getUserProfile({
      desc: '登录',
      success: async (res)=>{
        // 1 获取用户信息
        console.log(res)
        const { encryptedData, rawData, iv, signature } = res;
        // 2 获取小程序登录成功后的code
        const { code } = await login();
        const loginParams={ encryptedData, rawData, iv, signature ,code};
        //  3 发送请求 获取用户的token
        const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
        // 4 把token存入缓存中 同时跳转回上一个页面
        wx.setStorageSync("token", token);
        wx.navigateBack({
          delta: 1  
        });
      },
      fail: (err)=>{
        console.log(err)
      }
    })
  } */

})