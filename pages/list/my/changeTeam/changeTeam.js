// pages/list/my/changeTeam/changeTeam.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1,
    match:''

  },


  ChangeTeam: function (e) {
    var that = this;
    var id=this.data.teamID;
    console.log(that.data.teamID);
    console.log(that.data.match);
    console.log(e.detail.value);
    console.log(that.data.need[1]);
    wx.request({
      url: 'https://hducp.hduhelp.com/team',
      header: {
        'Authorization': 'token ' + app.globalData.token,
        'content-type': "application/json; charset='utf-8'"
      },
      method: 'PUT',
      data:
      {
        "id": that.data.teamID,
        "match": that.data.match,
        "name": e.detail.value.name,
        "tag": e.detail.value.tag,
        "memberNow": parseInt(e.detail.value.memberNow),
        "memberTotal": parseInt(e.detail.value.memberTotal),
        "desc": e.detail.value.desc,
        "need": that.data.need[1],
        "contact": e.detail.value.contact,
        "status": 1
      },
      success(res) {
        console.log('success');
        wx.showToast({
          title: '修改队伍成功',
          icon: 'success',
          duration: 2000
        })
      },

    })
  },


  /**
   * deleteTeam
   * 传入teamID
   * 
   */
  DeleteTeam: function () {
    console.log(this.data.teamID);
    var id = this.data.teamID;
    wx.request({
      url: 'https://hducp.hduhelp.com/team?teamID=' + this.data.id,
      method: 'DELETE',

      header: {
        'Authorization': 'token ' + app.globalData.token,
        'content-type': "application/json; charset='utf-8'"
      },
      success: function (res) {
        console.log(res);
        //that.setData({ TeamInformation: res.data.data });
        wx.showToast({
          title: '已删除队伍',
          icon: 'success',
          duration: 2000
        })
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    that.setData({ teamID: id });
    /**
     * getTeam
     * 获取团队详情信息。并将其保存在TeamInformaton中
     */
    wx.request({
      url: 'https://hducp.hduhelp.com/team/my',
      method: 'GET',
      data: {
        teamID: id
      },
      header: {
        'Authorization': 'token ' + app.globalData.token,
        'content-type': "application/json; charset='utf-8'"
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({ TeamInformation: res.data.data });
      }
    })

    wx.request({
      url: 'https://hducp.hduhelp.com/team/question',
      header: {
        "Authorization": 'token ' + app.globalData.token,
        'content-type': "application/json; charset='utf-8'"
      },
      method: 'GET',
      success(res) {
        that.setData({ question: res.data.matches });
        that.setData({ needs: res.data.need });
      },
    })
  },



  /*比赛名称*/
  pickerChangeMatches(e) {
    var index = this.data.index
    this.setData(
      { index: e.detail.value },
    )
    console.log('比赛复选框的选择:' + e.detail.value);
    console.log('比赛值为：' + this.data.question[index])
    this.setData(
      { match: JSON.stringify(this.data.question[index]) }
    )
    console.log(this.data.question);
    console.log(this.data.match);
  },

  /*比赛需求*/

  checkboxChangeNeed(e) {
    console.log('需求复选框的选择:' + e.detail.value);
    this.setData({ need: e.detail.value })
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