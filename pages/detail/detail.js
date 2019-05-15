// pages/detail/detail.js
const app = getApp()

var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls1: '/static/images/collection1.png',
    imgUrls2: '/static/images/like1.png',
    imgUrls3: '/static/images/share1.png',
    flag1: true,
    flag2: true,


  },
  click1: function () {
    if (this.data.flag1 == true) {
      this.setData({
        imgUrls1: '/static/images/collection2.png',
        flag1: false,
      })

    } else {
      this.setData({
        imgUrls1: '/static/images/collection1.png',
        flag1: true
      })

    }
  },

  click2: function () {
    if (this.data.flag2 == true) {
      this.setData({
        imgUrls2: '/static/images/like2.png',
        flag2: false,

      })

    } else {
      this.setData({
        imgUrls2: '/static/images/like1.png',
        flag2: true
      })

    }
  },
  Login: function (e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      if(this.data.openid){
      //直接跳转页面到发帖组队页面
      wx.switchTab({
        url:'/pages/list/write/write'
      })
      console.log("跳转");
      }else{
      wx.login({
        success: function (res) {
          let userInfo = app.globalData.userInfo
          wx.request({
            url: app.globalData.host + '/users',
            data: {
              code: res.code,
              appID: 'wxfd0ba5ed8c9d10b1',
              secret: '93331043ea682f88615207608d21530c',
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl,
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if(res.statusCode==200){

                wx.setStorage({
                  key:"openid",
                  data: res.data.info
                })
                wx.switchTab({
                  url:'/pages/list/write/write'
                })
              }else{
                //弹出框框   您未授权，无法组队！
                wx.showModal({
                  title:'警告',
                  content:'您未授权，无法组队',
                  showCancel:false,
                })
                 console.log('您未授权成功,无法组队！')
              }
            }
          })
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //这个options会收集你传过来的参数

    wx.getStorage({//从本地缓存中取出openid
      key:"openid",
      success:function(res){
        that.setData({
          openid:res.data.openid
        });
        console.log(res)
      },
    })

    let index = options.index
    index = parseInt(index)
    index = index + 1
    var that = this

    wx.request({
      url: app.globalData.host + "/article/content",
      data: {
        pid: index
      },
      method: 'POST',

      success: function (res) {
        let article = res.data
        console.log(article)
        WxParse.wxParse('article', 'html', article, that, 5)
      }

    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})