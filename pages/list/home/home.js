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
    imgUrls: [
      '/static/images/bg_1.jpg',
      '/static/images/bg_2.jpg',
      '/static/images/bg_3.png'
      
    ],
    indicatorDots: true,//轮播图上的圆点
    autoplay: true,//自动播放
    interval:3000,   //自动切换时间间隔
    duration:600,   //滑动动画时长
    circular:true, //是否采用衔接滑动
    information:[
      { 
          
        title:'2019年浙江省大学生科技创新活动计划暨新苗人才计划',
        url:'/static/images/xm_1.jpg'},
      {
        
        title:'2019年浙江省大学生科技创新活动计划暨新苗人才计划',
        url:'/static/images/xm_1.jpg'},
      {
        
        title:'2019年浙江省大学生科技创新活动计划暨新苗人才计划',
        url:'/static/images/xm_1.jpg'},
      {
        
        title:'2019年浙江省大学生科技创新活动计划暨新苗人才计划',
        url:'/static/images/xm_1.jpg'},
      
      
    ]
	
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that=this
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
    //请求文章列表数据
    wx.request({
      url:'https://hducp.hduhelp.com/passages',
      data:{
        page:1,
        rpp:20
        //id:idArr[index]
      },
      method:'Get',
      header:{
        "Authorization":'token '+app.globalData.token,
        "content-type":"application/json" 
      },
      success:function(res){
        //let article=res.data.data.content
        console.log(res.data.data)
        //WxParse.wxParse('article', 'html', article, that,5)
        that.setData({information: res.data.data });
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
  //跳转到详情页面
  toDetail(event) {
    console.log(event)
    //获取点击跳转对应的下标，console.log真是一个很好的东西
    let index =event.currentTarget.dataset.index
    console.log(event._relatedInfo)
    wx.navigateTo({
      url:'/pages/detail/detail?index='+index
    })
  }
})
