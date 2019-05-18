// pages/teamList/teamList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:[
      
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    
    wx.request({
      url:app.globalData.host+'/teams/1',
      method:'Get',
      success:function(res){
        //let article=res.data.data.content
        console.log(res.data.info)
        //WxParse.wxParse('article', 'html', article, that,5)
        that.setData({information: res.data.info });
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
  toTeamDetail(e) {
    console.log(e);
      let index = e.currentTarget.dataset.index;
      console.log(index);
      wx.navigateTo({
        url: '/pages/list/my/teamDetail/teamDetail?id=' + this.data.information[index].id,
      })
  }
})