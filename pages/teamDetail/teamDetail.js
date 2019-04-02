// pages/list/my/teamDetail/teamDetail.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TeamInformation:{
      match:'小程序设计大赛之小程序',
      name:'菜鸡一队',
      tag:'前端',
      memberNow:4,
      memberTotal:6,
      need:'前端',
      desc:'参加大程序大赛，目前有Golang后台和设计的同学，但是缺少前端同学',
      contact:'maoyining2113'
    }
  },

 


  /**
   * deleteTeam
   * 传入teamID
   * 
   */
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var id = options.id;
    // console.log(id);
    // this.setData({ id: id });
    // var that = this;
    // wx.request({
    //   url: 'https://hducp.hduhelp.com/team/my',
    //   method: 'GET',
    //   data: {
    //     teamID: id
    //   },
    //   header: {
    //     'Authorization': 'token ' + app.globalData.token,
    //     'content-type': "application/json; charset='utf-8'"
    //   },
    //   success: function (res) {
    //     console.log(res.data.data);
    //     that.setData({ TeamInformation: res.data.data });
    //   }
    // })

    // wx.request({
    //   url: 'https://hducp.hduhelp.com/team/question',
    //   header: {
    //     "Authorization": 'token ' + app.globalData.token,
    //     'content-type': "application/json; charset='utf-8'"
    //   },
    //   method: 'GET',
    //   success(res) {
    //     that.setData({ question: res.data.matches });
    //     that.setData({ needs: res.data.need });
    //   },
    // })

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