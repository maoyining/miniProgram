// pages/list/my/teamDetail/teamDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  openid:''
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
 * getCheck()帖子审核函数，审核完成status=1即其他用户可查看
 */
getCheck(){
  var that=this;
  var id=that.data.id;
  let status=1;
  wx.request({
    url: app.globalData.host + '/pass',
    method: 'POST',
    data: {
      openid: app.globalData.openid,
      teamID: id
    },
    success:function(res){
      console.log('审核通过');
      wx.showToast({
        title: '操作成功！',
      })
    }
  })


},

  /**
   * getUncheck()帖子审核函数，审核未通过status=2返回给用户
   */
  getUncheck() {
    var that = this;
    var id = that.data.id;
    let status = 1;
    wx.request({
      url: app.globalData.host + '/unpass',
      method: 'POST',
      data: {
        teamID: id,
        openid:app.globalData.openid
      },
      success: function (res) {
        console.log('审核未通过');
        wx.showToast({
          title: '操作成功！',
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
    this.setData({ openid:app.globalData.openid  });
    var that = this;
    wx.request({
      url: app.globalData.host + '/team/id',
      method: 'POST',
      data: {
        teamID: id
      },
      success: function (res) {
        console.log(res.data.info[0]);
        that.setData({ TeamInformation: res.data.info[0] });
   
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