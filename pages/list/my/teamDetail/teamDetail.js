// pages/list/my/teamDetail/teamDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  ChangeTeam: function (e) {
    console.log('跳转的id' + this.data.id);
    wx.navigateTo({
      url: '/pages/list/my/changeTeam/changeTeam?id=' + this.data.id,
    })
  },


  /**
   * deleteTeam
   * 传入teamID
   * 
   */
  DeleteTeam: function () {
    console.log(this.data.id);
    var id = this.data.id;
    wx.request({
      //还需修改
      // url: 'https://hducp.hduhelp.com/team?teamID=' + ,
      url: app.globalData.host + "/delete",
      method: 'POST',
      data: {
        teamID: id
      },
      success: function (res) {
        console.log(res);
        //that.setData({ TeamInformation: res.data.data });
        wx.showToast({
          title: '删除成功',
          icon: 'success',
        })
        console.log('已删除');
        wx.switchTab({
          url: '/pages/list/my/my',
        })
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    console.log(id);
    this.setData({ id: id });
    var that = this;
    wx.request({
      url: app.globalData.host + '/myteam',
      method: 'POST',
      data: {
        openid: app.globalData.openid,
        teamID: id
      },
      success: function (res) {
        console.log(res.data.info[0]);
        that.setData({ TeamInformation: res.data.info[0] });
        // that.setData({need:res.data.info.need});
      }
    })
    //console.log(TeamInformation)
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