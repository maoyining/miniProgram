//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    openid:'',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    showView:true,
    showView1:true,
  
    gridCol: 3,
    skin: false,
    // information:[{
    //   tname:'',
    //   cname:'',
    //   state:''
    // }
    // ]
  

  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.setData({
  
          openid:app.globalData.openid,
          showView:(options.showView == 'true'? true:false)
        })
  
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
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
      url: app.globalData.host+'/myteams',
      method: 'POST',
      data: {
        openid:app.globalData.openid
      },
     
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200){
          that.setData({ information: res.data.info });
          let i;
        for(i=0;i<res.data.info.length;i++){
          let str='information['+i+'].state'
          if (res.data.info[i].status==0){
            that.setData({[str]:'审核状态：审核中'})
          }else if(res.data.info[i].status==1){
            that.setData({[str]:'审核状态：审核通过'})
          }else{
            that.setData({[str]:'审核状态：审核未通过'})
          }

        }
        }else {
          wx.showToast({
            title: '您还没有团队',
          })
        }

      }
    })
  },

  /**
   * allTeams 管理员操作审核，将跳转到一个新的页面
   */

  allTeams(){
    console.log("我是管理员");
    wx.navigateTo({
      url: '/pages/list/my/admin/admin',
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
  * 
  * 需要传递参数teamID
  */
  getTeam1: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      url: '/pages/list/my/teamDetail/teamDetail?id=' + this.data.Information1[index].id,
    })
  },

/**
 * toAbout:关于我们
 */
toAbout:function(){
 
  wx.navigateTo({
    url: '/pages/about/about',
  })
}




})
