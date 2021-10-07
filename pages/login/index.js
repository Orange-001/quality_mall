// pages/login/index.js
Page({

  /* handleGetUserInfo(e){
    console.log(e)
    console.log(e.detail)
    const {userInfo} = e.detail
    console.log(userInfo)
    wx.setStorageSync("userinfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  } */
  getUserProfile(){
    wx.getUserProfile({
      desc: '登录',
      success: (res)=>{
        const {userInfo} = res
        wx.setStorageSync("userinfo", userInfo);
        wx.navigateBack({
          delta: 1
        });
      },
      fail: (err)=>{
        console.log(err)
      }
    })
  }

})