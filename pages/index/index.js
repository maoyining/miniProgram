//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userName: '毛忆宁',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.login({
      success: function (res) {
        let userInfo = app.globalData.userInfo
        wx.request({
          //url: 'http://118.25.136.149:8001/resistance',
          url: app.globalData.host + '/users',
          data: {
            code: res.code,
            appID: 'wxfd0ba5ed8c9d10b1',
            secret: '93331043ea682f88615207608d21530c',
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            app.globalData.openid = res.data.info;
          }
        })
      }
    })
  },
try(){
  var that=this
  wx.request({
    url: 'http://118.25.136.149:8001/resistance',
    //url: app.globalData.host + '/users',
    data: {
    
    },
    method: 'GET',
    success: function (res) {
      console.log(res.data[0])
      that.setData({ trydata: res.data[0].pname });
    }
  })
}
,
  handleClick() {
    //navigateTo保留当前页面
    //这里有一个坑点,如果跳转不过去，就要注意了，三检查：
    //检查你要跳转的位置是否在app.js中注册过。
    //检查你要跳转的地址是否有误。经常都是因为少写或者多写使得跳转无效。
    //检查你要跳转的位置是否位于TabBar中，如果是的话，要使用wx.switchTab 来跳转界面
    wx.login({
      success: function (res) {

        wx.request({
          //url: 'http://118.25.136.149:8001/resistance',
          url: app.globalData.host + '/openid',
          data: {
            code: res.code,
            appID: 'wxfd0ba5ed8c9d10b1',
            secret: '93331043ea682f88615207608d21530c',
          },
          method: 'POST',
          success: function (res) {
            console.log(res.data.info)
            app.globalData.openid = res.data.info;
          }
        })
      }
    })
    wx.switchTab({
      url: "/pages/list/home/home"
    })
    const token = app.globalData.token;
    console.log(token)
  }
})
