// pages/list/my/singleInfo/Info.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     enter:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    console.log(options)
    if(options.enter=="true"){
      this.setData({ enter:"true",id:parseInt(options.id)  });
    }else{
      this.setData({ enter:"false"  });
    }
  //   this.setData({ enter:"true"  });
    
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
        that.setData({ Infos: res.data.info[0] });
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
  /**
   * toChange修改个人信息，仅提供跳转功能
   */
  toChange:function(){
    wx.navigateTo({

      url: "/pages/list/my/singleInfo/changeInfo"
   });
  },
  jointeam:function(){
    //正式申请加入队伍
    let that=this
    wx.request({
      url: app.globalData.host + '/comjoin',
      method: 'POST',
      data: {
        uid:app.globalData.openid,
        tid:that.data.id
      },
      success: function (res) {
        if(res.statusCode==200){
          wx.showToast({
            title: '报名成功！',
            duration:2000
          })
        
        }else{
          wx.showToast({
            title: '不可重复报名！',
            duration:2000
          })
         
        }
        wx.switchTab({
          url: '/pages/teamList/teamList',
        })
      }
    })
  }
})