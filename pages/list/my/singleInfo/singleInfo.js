// pages/list/my/singleInfo/singleInfo.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
 * singleInfos --提交个人信息表单，注意每个数据均不能为空
 */
CreateTeam: function (e) {
    
  //如果e.detail.value.username,或者还有其他成员为空,
  //则不会进行wx.request,并且跳出弹出框输入内容不为空
  console.log(this.data.flag)
  for (var element in e.detail.value) {
    if (!e.detail.value[element]) {
      wx.showToast({
        title: '未填写完整',
        image: '/static/images/warn.svg',
        iconsize: '16px'
      })
      this.data.flag = 1;
    }
  }

 if (this.data.flag==0) {

  var that = this;
    wx.request({
      url: app.globalData.host + '',
      method: 'POST',
      data:
      {
        "openid": app.globalData.openid,
        "userName": e.detail.value.UserName,
        "userNumber": e.detail.value.UserNumber,
        "userAcademy": e.detail.value.UserAcademy,
        "userSex": e.detail.value.UserSex,
        "userDesc": e.detail.value.UserDesc,
        "userContact": e.detail.value.UserContact,
       
      },
      success(res) {
        // var teamID = res.data.data.teamID;
        console.log(res);
          if(res.statusCode==200){
          wx.showToast({
            title: '个人信息创建成功',
            icon: 'success',
            duration: 2000
          })
         
        }else {
          wx.showToast({
            title: '创建信息失败',
            image: '/static/images/fail.svg',
            iconsize: '16px'
          })
        }
      },
    })
  }else{
    this.data.flag=0;
  }
},
})