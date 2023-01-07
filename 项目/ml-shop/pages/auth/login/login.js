// 登陆页面
const util = require('../../../utils/utils');
const user = require('../../../utils/user');
const app = getApp();

Page({
  data: {},
  // 直接微信登陆
  wxLogin(e){
    // 判断是否登录
    if(e.detail.userInfo == undefined){
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登陆失败');
      return;
    }
    // 登陆然后返回个人中心
    user.checkLogin().catch(()=>{
      user.loginByWeixin(e.detail.userInfo).then(res =>{
        app.globalData.hasLogin = true;
        wx.navigateBack({delta : 1});
      }).catch(()=>{
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登陆失败');
      });
    });
  },
  // 通过账号登陆
  accountLogin(){
    wx.navigateTo({
      url: '/pages/auth/accountLogin/accountLogin',
    })
  }
})