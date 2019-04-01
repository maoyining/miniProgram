//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userName:'毛忆宁',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    showView:true,
    showView1:true,
  
    gridCol: 3,
    skin: false,
    information:''

  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    showView:(options.showView == 'true'? true:false)

  },

  /**
  * getTeam 获取我创建的团队信息（单条详情）
  * 需要传递参数teamID
  */
  getTeam: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      url: '/pages/list/my/teamDetail/teamDetail?id=' + this.data.information[index].id,
    })
    wx.request({
      url: 'https://hducp.hduhelp.com/team/my',
      method: 'GET',
      data: {
        teamID: this.data.information[index].id
      },
      header: {
        'Authorization': 'token ' + app.globalData.token,
        'content-type': "application/json; charset='utf-8'"
      },
      success: function (res) {
        console.log(res);

      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickMe() {
    this.setData({userName: ' lalaland!'})
  },
  onChangeShowState:function(){
    var that=this;
    that.setData({showView:(!that.data.showView)})
    /**
      * 获取我创建的团队信息(列表)
      * page:页码（首页=1）
      * rpp:每页的显示量，最大值为20
      */
    var that = this;
    wx.request({
      url: 'https://hducp.hduhelp.com/teams/my',
      method: 'GET',
      data: {
        page: 1,
        rpp: 5
      },
      header: {
        "Authorization": 'token ' + app.globalData.token,
        'content-type': "application/json; charset='utf-8'"
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200)
          that.setData({ information: res.data.data });
        else {
          wx.showToast({
            title: '您还没有团队',
          })
        }

      }
    })
  },
  /**
   * 下拉刷新函数
   */
  onPullDownRefresh(){
    wx.stopPullDownRefresh()
  },

  onChangeShowStateTeam: function (e) {
    var that = this;
    
    that.setData({ showView1: (!that.data.showView1) })

  },
  /**
  * postKey:提交查询条件，储存为key
  */
  postKey: function (e) {
    console.log(e.detail.value.key)
    this.setData({ key: e.detail.value.key })
    /**
 * 根据key值查询所需的团队
 * key:任意关键字（寻找匹配项队名，比赛名，队伍ID,tag)
 * page:页码
 * rpp:每页记录数,最大数为20
 */


    var that = this;
    console.log(this.data.key);
    wx.request({
      url: 'https://hducp.hduhelp.com/teams',
      method: 'GET',
      data: {
        page: '1',
        rpp: '20',
        key: this.data.key
      },
      header: {
        'Authorization': 'token ' + app.globalData.token,
        'content-type': "application/json; charset='utf-8'"
      },
      success: function (res) {
        console.log(res);
       that.setData({ id: res.data.data[0].id });
       console.log(that.data.id);
        console.log(res);
        wx.navigateTo({
          url: '/pages/list/my/teamDetail/teamDetail?id=' + that.data.id,
        })

      }
    })
  },




})
