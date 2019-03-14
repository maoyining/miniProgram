//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userName:'毛忆宁',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getToken:function(){
    wx.request({
      url:'https://hducp.hduhelp.com/passage',
      data:{
        //page:1,
       // rpp:20
        id:'nfieajlfkvos'
      },
      method:'Get',
      header:{
        "Authorization":'token '+app.globalData.token,
        "content-type":"application/json" 
      },
      success:function(res){
        console.log(res);
      }

    })

    
  },
  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickMe() {
    this.setData({userName: ' lalaland!'})
  },
  handleClick(){
    //navigateTo保留当前页面
    //这里有一个坑点,如果跳转不过去，就要注意了，三检查：
    //检查你要跳转的位置是否在app.js中注册过。
    //检查你要跳转的地址是否有误。经常都是因为少写或者多写使得跳转无效。
    //检查你要跳转的位置是否位于TabBar中，如果是的话，要使用wx.switchTab 来跳转界面
    wx.switchTab({
      url:"/pages/list/home/home"
    })
    const token=app.globalData.token;
    console.log(token)
  }
})
