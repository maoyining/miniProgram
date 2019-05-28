// pages/list/my/singleInfo/Info.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    console.log(id);
    this.setData({ id: id });
    this.setData({ openid:app.globalData.openid  });
    var that = this;
    wx.request({
      url: app.globalData.host + '',
      method: 'POST',
      data: {
        teamID: id
      },
      success: function (res) {
        console.log(res.data.info[0]);
        that.setData({ Infos: res.data.info[0] });
   
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

  },
  /**
   * toChange修改个人信息，仅提供跳转功能
   */
  toChange:function(){
    wx.navigateTo({

      url: "/pages/list/my/singleInfo/changeInfo"
   });
  }
})