// 账号登陆
const api = require('../../../config/api')
const util = require('../../../utils/utils')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username : '',
    password : '',
  },
  // 账号登陆
  accountLogin(){
    if (this.data.password.length < 1 || this.data.username.length < 1) {
      wx.showModal({
          title: '错误信息',
          content: '请输入用户名和密码',
          showCancel: false
      });
      return false;
    };
    wx.request({
      url: api.AuthLoginByAccount,
      data: {
          username: this.data.username,
          password: this.data.password
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
          if (res.data.errno == 0) {
              app.globalData.hasLogin = true;
              wx.setStorageSync('userInfo', res.data.data.userInfo);
              wx.setStorage({
                  key: "token",
                  data: res.data.data.token,
                  success: function() {
                      wx.switchTab({
                          url: '/pages/ucenter/index/index'
                      });
                  }
              });
          } else {
              app.globalData.hasLogin = false;
              util.showErrorToast('账户登录失败');
          }
      }
  });
  },
  // 账号收集
  bindUsernameInput(e){
    this.setData({
      username : e.detail.value
    });
  },
  // 密码收集
  bindPasswordInput(e){
    this.setData({
      password : e.detail.value
    });
  },
  // 清除数据
  clearInput(e){
    switch(e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username : ''
        });
        break;
        case 'clear-password':
          this.setData({
            password : ''
          });
          break;
    }
  },
})