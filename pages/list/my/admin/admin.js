// pages/list/my/admin/admin.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TeamInformation: {
      match: '小程序设计大赛之小程序',
      name: '菜鸡一队',
      tag: '前端',
      memberNow: 4,
      memberTotal: 6,
      need: '前端',
      desc: '参加大程序大赛，目前有Golang后台和设计的同学，但是缺少前端同学',
      contact: 'maoyining2113'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.host + '',
      method: 'POST',
      data: {
        openid: app.globalData.openid
      },

      success: function (res) {
        console.log(res);
        if (res.statusCode == 200)
          that.setData({ information: res.data.info });
        else {
          wx.showToast({
            title: '没有团队等待审核',
          })
        }

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
   * check审核函数，点击之后进去队伍详情
   */
  
    check: function (e) {
      console.log(e);
      let index = e.currentTarget.dataset.index;
      console.log(index);
      wx.navigateTo({
        url: '/pages/list/my/teamDetail/teamDetail?id=' + this.data.information[index].id,
      })
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