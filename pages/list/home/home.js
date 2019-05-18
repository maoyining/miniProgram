//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
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
          
       //s title:'2019年浙江省大学生科技创新活动计划暨新苗人才计划',
        url:'/static/images/t1.jpg'},
      {
        
        //title:'2019年浙江省大学生科技创新活动计划暨新苗人才计划',
        url:'/static/images/t2.jpg'},
      {
        
       // title:'2019年浙江省大学生科技创新活动计划暨新苗人才计划',
        url:'/static/images/t3.jpg'},
      {
        
      //  title:'2019年浙江省大学生科技创新活动计划暨新苗人才计划',
        url:'/static/images/t4.jpg'},
      
      
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
      url:app.globalData.host+"/articles",
  
      method:'Get',
      
      success:function(res){
        //let article=res.data.data.content
        console.log(res.data.info)
        //WxParse.wxParse('article', 'html', article, that,5)
        that.setData({information: res.data.info });
      }
    })
    wx.login({
      success: function (res) {
        //let userInfo = app.globalData.userInfo
        wx.request({
          url: app.globalData.host + '/openid',
          data: {
            code: res.code,
            appID: 'wxfd0ba5ed8c9d10b1',
            secret: '93331043ea682f88615207608d21530c',
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            if(res.statusCode==200){
              app.globalData.openid=res.data.info
            }else{
               console.log('您未授权成功,无法组队！')
            }
          }
        })
      }
    })

  } ,
  
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
