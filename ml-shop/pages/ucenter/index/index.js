const app = getApp();

Page({
  data:{
    userInfo:{
      nickName : '点击登录',
      avatarUrl:'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
  },
  // 去登陆页
  goLogin(){
    wx.navigateTo({
      url: '/pages/auth/login/login',
    })
  },

  // 生命周期钩子
  onShow(){
    // 获取用户的登录信息
    if (app.globalData.hasLogin){
      let userInfo = wx.getStorageSync('userInfo');
      this.setData({
        userInfo : userInfo,
        hasLogin : true
      })
    }
  },
  onLoad(){

  }
})