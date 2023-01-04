/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
      wx.request({
          url: url,
          data: data,
          method: method,
          header: {
              'Content-Type': 'application/json',
              'X-Mymall-Token': wx.getStorageSync('token')
          },
          success: function(res) {

              if (res.statusCode == 200) {

                  if (res.data.errno == 501) {
                      // 清除登录相关内容
                      try {
                          wx.removeStorageSync('userInfo');
                          wx.removeStorageSync('token');
                      } catch (e) {
                          // Do something when catch error
                      }
                      // 切换到登录页面
                      wx.navigateTo({
                          url: '/pages/auth/login/login'
                      });
                  } else {
                      resolve(res.data);
                  }
              } else {
                  reject(res.errMsg);
              }

          },
          fail: function(err) {
              reject(err)
          }
      })
  });
}

// 封装提示
function showErrorToast(msg){
  wx.showToast({
    title : msg,
    image : '/static/images/icon_error.png'
  })
}

module.exports = {
  request,
  showErrorToast
}