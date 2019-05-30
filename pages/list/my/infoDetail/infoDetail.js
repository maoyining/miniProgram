// pages/list/my/teamDetail/teamDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  openid:''
  },

  


  /**
   * deleteTeam
   * 传入teamID
   * 
   */

/**
 * getCheck()帖子审核函数，审核完成status=1即其他用户可查看
 */
agree(){
  var that=this;

  wx.request({
    url: app.globalData.host + '/welcome',
    method: 'POST',
    data: {
      uid:that.data.infoDetail.unum,//申请人id
      tid:that.data.infoDetail.id//队伍id
    },
    success:function(res){
      if(res.statusCode==200){
      wx.showToast({
        title: '操作成功！',
      })
    }else{
      wx.showToast({
        title: '操作失败！',
      })
    }
    wx.switchTab({
      url: '/pages/list/my/my',
    })
    }
  })
},

  /**
   * getUncheck()帖子审核函数，审核未通过status=2返回给用户
   */
  disagree(){
    var that=this;
  
    wx.request({
      url: app.globalData.host + '/unwelcome',
      method: 'POST',
      data: {
        uid:that.data.infoDetail.unum,//申请人id
        tid:that.data.infoDetail.id//队伍id
      },
      success:function(res){
        if(res.statusCode==200){
        wx.showToast({
          title: '操作成功！',
        })
      }else{
        wx.showToast({
          title: '操作失败！',
        })
      }
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
    var index=options.index;
    console.log(options);
    this.setData({ id: id });
    this.setData({ openid:app.globalData.openid  });
    var that = this;
    wx.request({
      url: app.globalData.host + '/member',
      method: 'POST',
      data: {
        openid: app.globalData.openid
      },
      success: function (res) {
        if(res.statusCode==200){
          console.log(res.data.info[id])
        that.setData({ infoDetail: res.data.info[id] });
        }else{
          console.log("error")
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
   * JionTeam用户申请加入其他队伍，先跳到信息确认框，信息确认后，返回等待队长同意弹窗
   * 之后再跳回到当前队伍，并且把申请加入按钮改为已经申请加入。
   * 审核通过会显示您已经是该队成员了
   */
  JoinTeam:function(){
    let that=this
    wx.request({
      url: app.globalData.host+'/checkinfo',
      method: 'POST',
      data: {
        openid:app.globalData.openid
      },
     
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200){
          console.log(res.data.judge)
          if(res.data.judge==true){
            wx.navigateTo({
              url: '/pages/list/my/singleInfo/Info?enter=true&id='+that.data.id,
            })
          }else{
            wx.navigateTo({
              url: '/pages/list/my/singleInfo/singleInfo',
            })
          }
        }else{
          console.log("error")
        }
      }
    })
  //   wx.navigateTo({

  //     url: "/pages/list/my/singleInfo/Info?id="+this.data.id

  //  });
  }
})