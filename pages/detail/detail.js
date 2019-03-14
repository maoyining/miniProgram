// pages/detail/detail.js
const app = getApp()

var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //detailObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //这个options会收集你传过来的参数
      let index=options.index
      console.log(index)
      let idArr=['nfieajlfkvos','qwertyuiasdfghjk','3','6']

      var that=this
      wx.request({
        url:'https://hducp.hduhelp.com/passage',
        data:{
          // page:2,
          //rpp:20
          id:idArr[index]
        },
        method:'Get',
        header:{
          "Authorization":'token '+app.globalData.token,
          "content-type":"application/json" 
        },
        success:function(res){
          let article=res.data.data.content
          console.log(article)
          WxParse.wxParse('article', 'html', article, that,5)
         // that.setData({detailObj: res.data.data });
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