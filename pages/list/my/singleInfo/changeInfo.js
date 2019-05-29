// pages/list/my/singleInfo/changeInfo.js
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
    this.setData({ openid:app.globalData.openid  });
    var that = this;
    wx.request({
      url: app.globalData.host + '/checkinfo',
      method: 'POST',
      data: {
        openid:app.globalData.openid
      },
      success: function (res) {
        if(res.statusCode==200){
        console.log(res.data.info[0]);
        that.setData({ Info: res.data.info[0] });
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
  ChangeInfos: function (e) {
    
    //如果e.detail.value.username,或者还有其他成员为空,
    //则不会进行wx.request,并且跳出弹出框输入内容不为空
    let updateinfo=e.detail.value
    console.log(updateinfo)
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
        url: app.globalData.host + '/changeinfo',
        method: 'POST',
        data:
        {
          "openid": app.globalData.openid,
          "userName": updateinfo.Username,//姓名
          "userNumber": updateinfo.UserNumber,//学号
          "userAcademy": updateinfo.UserAcademy,//学院
          "userSex": updateinfo.UserSex,//性别
          "userDesc": updateinfo.UserDescribes,//自我介绍
          "userContact": updateinfo.UserContact,//联系方式
         
        },
        success(res) {
          // var teamID = res.data.data.teamID;
          console.log(res);
            if(res.statusCode==200){
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
           
          }else {
            wx.showToast({
              title: '修改失败',
              image: '/static/images/fail.svg',
              iconsize: '16px'
            })
          }
        },
      })
    }else{
      this.data.flag=0;
    }
  }
})