// pages/teamList/teamList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:[
      { 
          
        match:'小程序大赛',
        name:'菜鸡一队',
        need:'前端  后台',
        url:'/static/images/xm_1.jpg'},
      {
        
        match:'小程序大赛',
        name:'菜鸡二队',
        need:'算法设计 前端',
        url:'/static/images/xm_1.jpg'},
      {
        
        match:'小程序大赛',
        name:'菜鸡三队',
        need:'人工智能',
        url:'/static/images/xm_1.jpg'},
      {
        
        match:'小程序大赛',
        name:'菜鸡四队',
        need:'后台',
        url:'/static/images/xm_1.jpg'},
      
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that=this
    // wx.request({
    //   url:'https://hducp.hduhelp.com/teams',
    //   data:{
    //     key:'小程序王者',
    //     page:1,
    //     rpp:20
    //     //id:idArr[index]
    //   },
    //   method:'Get',
    //   header:{
    //     "Authorization":'token '+app.globalData.token,
    //     "content-type":"application/json" 
    //   },
    //   success:function(res){
    //     //let article=res.data.data.content
    //     console.log(res.data.data)
    //     //WxParse.wxParse('article', 'html', article, that,5)
    //     that.setData({information: res.data.data });
    //   }

    // })

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
  toTeamDetail(event) {
    console.log(event)
    //获取点击跳转对应的下标，console.log真是一个很好的东西
    let index =event.currentTarget.dataset.index
    console.log(event._relatedInfo)
    wx.navigateTo({
      url:'/pages/teamDetail/teamDetail?index='+index
    })
  }
})