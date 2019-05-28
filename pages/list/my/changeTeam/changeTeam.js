// pages/list/my/changeTeam/changeTeam.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1,
    match:'',
    

  },


  ChangeTeam: function (e) {
    console.log(e.detail.value);
    let teamInfo=this.data.TeamInformation
    let teamUpdate=e.detail.value
    console.log(teamInfo)
    wx.request({
      url: app.globalData.host+"/update",
      
      method: 'POST',
      data:
      {
        "teamID": teamInfo.id,
        "cname": teamInfo.cname,
        "tname": teamInfo.tname,
        
        "memberNow": parseInt(teamUpdate.memberNow),
        "memberTotal": parseInt(teamUpdate.memberTotal),
        "desc": teamUpdate.tag,
        "need": teamUpdate.need,
        "contact": teamUpdate.contact,
       
      },
      success(res) {
        console.log(res);
        if(res.statusCode==200){
          wx.showToast({
            title: '修改队伍成功',
            duration:2000
          })
        }else{
        console.log('success');
        wx.showToast({
          title: '修改队伍失败',
          icon: 'success',
          duration: 2000
        })
        }
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
        if(res.statusCode==200){
        wx.showToast({
          title: '已删除队伍',
          icon: 'success',
          duration: 2000
        })
      }
      
      else{
        wx.showToast({
          title: '删除失败',
          duration:2000

        })
      }
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
      url: app.globalData.host + '/team/id',
      method: 'POST',
      data: {
        teamID: id
      },
     
      success: function (res) {
        console.log(res.data.info[0]);
        that.setData({ TeamInformation: res.data.info[0] });
        // console.log(res.data.data.match);
        // that.setData({ match: res.data.data.match});
        // console.log("传入得match值"+that.data.match);
      }
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
      { match: this.data.question[index] }
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