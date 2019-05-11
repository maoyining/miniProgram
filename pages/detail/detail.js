// pages/detail/detail.js
const app = getApp()

var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls1: '/static/images/collection1.png',
    imgUrls2:'/static/images/like1.png',
    imgUrls3: '/static/images/share1.png',
    flag1:true,
    flag2:true,
    
},
click1:function(){
  if(this.data.flag1==true){
    this.setData({
        imgUrls1: '/static/images/collection2.png',
        flag1:false,
    })
    
 }else{
   this.setData({
    imgUrls1: '/static/images/collection1.png',
    flag1:true
   })
   
 }
},

click2:function(){
  if(this.data.flag2==true){
    this.setData({
        imgUrls2: '/static/images/like2.png',
        flag2:false,
    })
    
 }else{
   this.setData({
    imgUrls2: '/static/images/like1.png',
    flag2:true
   })
   
 }
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //这个options会收集你传过来的参数
      let index=options.index
      index=parseInt(index)
      index=index+1
      console.log(index)
     // let idArr=['nfieajlfkvos','qwertyuiasdfghjk','3','6']

      var that=this
      wx.request({
        url:app.globalData.host+"/article/content",
        data:{
          // page:2,
          //rpp:20
          pid:index
        },
        method:'POST',
       
        success:function(res){
          let article=res.data
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