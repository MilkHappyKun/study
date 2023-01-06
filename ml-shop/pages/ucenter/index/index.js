const app = getApp();
const user = require('../../../utils/user')
const util = require('../../../utils/utils')
const api = require('../../../config/api')


Page({
  data:{
    userInfo:{
      nickName : '点击登录',
      avatarUrl:'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    hasLogin: false
  },
  // 
  goGoods(){
    wx.navigateTo({
      url: '/pages/goods/goods',
    })
  },
  // 去登陆页
  goLogin(){
    // 首先判断是否登录
    if(!app.globalData.hasLogin){
      wx.navigateTo({
        url: '/pages/auth/login/login',
      })
    }
  },
  // 退出登录
  exitLogin(){
    wx.showModal({
      title: '',
      confirmColor :'#b4282d',
      content: '退出登录？',
      success: (res) => {
        if (res.confirm) {
          util.request(api.AuthLogout,{},'POST');
          app.globalData.hasLogin = false;
          wx.clearStorageSync();
          wx.reLaunch({
            url: '/pages/index/index',
          });
        }
      }
    })
  },
  // 生命周期钩子
  onShow(){
    // 获取用户的登录信息
    user.checkLogin().then(res => {
      app.globalData.hasLogin = true;
      let userInfo = wx.getStorageSync('userInfo');
      this.setData({
        userInfo: userInfo,
        hasLogin : true
      });
    }).catch(()=>{
      app.globalData.hasLogin = false;
    })
  }
})