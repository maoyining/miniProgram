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
    teamData:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   
  },
  formSubmit:function(e){
    
    //this.data.teamData=e.detail.value
    let teamData=e.detail.value
    wx.request({
      url:'https://hducp.hduhelp.com/team',
      data:{
        "match": teamData.match1,
        "name": teamData.name1,
        "tag" : teamData.tag1,  //15个字以内的简短需求说明(最容易被搜索到的关键字，不需要空格)，例子：小程序前端、Web后端、服务器运维......
        "memberNow":parseInt(teamData.memberNow1), //目前人数
        "memberTotal": parseInt(teamData.memberTotal1), //期望人数
        "desc": teamData.desc1, //目前队伍、技术人员描述
        "need":teamData.need1, //希望谁加入
        "contact": teamData.contact1
      
      },
      method:'Post',
      header:{
        "Authorization":'token '+app.globalData.token,
        "content-type":"application/json" 
      },
      success:function(res){
        //let article=res.data.data.content
        console.log(res)
        //WxParse.wxParse('article', 'html', article, that,5)
       
      }

    })
  },

})
