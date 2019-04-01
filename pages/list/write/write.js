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
    teamData:{},
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    index:0,
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ]
  
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    /*请求比赛名称以及需求*/
    var that = this;
    wx.request({
      url: 'https://hducp.hduhelp.com/team/question',
      header: {
        "Authorization": 'token ' + app.globalData.token,
        'content-type': "application/json; charset='utf-8'"
      },
      method: 'GET',
      success(res) {
       
        that.setData({ question: res.data.matches });
        that.setData({ needs: res.data.need });
        console.log(that.data.question);
       
      },
    })
  
   
  },

  /**
 * CreateTeam --提交队伍表单，注意每个数据均不能为空
 */
  CreateTeam: function (e) {
    var that = this;
    console.log(this.data.match);
    var str = ''
    var i;
    for (i = 0; i < this.data.need.length; i++) {
      str = str + ' ' + this.data.need[i];
    }
    wx.request({
      url: 'https://hducp.hduhelp.com/team',
      header: {
        'Authorization': 'token ' + app.globalData.token,
        'content-type': "application/json; charset='utf-8'"
      },
      method: 'POST',
      data:
      {
        "match": that.data.match,
        "name": e.detail.value.name,
        "tag": e.detail.value.tag,
        "memberNow": parseInt(e.detail.value.memberNow),
        "memberTotal": parseInt(e.detail.value.memberTotal),
        "desc": e.detail.value.desc,
        "need": str,//that.data.need[0],
        "contact": e.detail.value.contact
      },
      success(res) {
        // var teamID = res.data.data.teamID;
        console.log(res);
        wx.showToast({
          title: '创建队伍成功',
          icon:'success',
          duration:2000
        }),
       that.setData(
          {form_info:''},
          
       )  
      },
    })


  },


  /*比赛名称*/

  pickerChangeMatches(e) {
    console.log('比赛复选框的选择:' + e.detail.value);
    var index=e.detail.value;
    this.setData(
      { index: e.detail.value},
      )
    console.log('比赛值为：' + this.data.question[index])
    this.setData(
      { match: this.data.question[index] }
    )
    console.log(this.data.question);
    //console.log(this.data.match);
  },

  /*比赛需求*/

  checkboxChangeNeed(e) {
    console.log('需求复选框的选择:' + e.detail.value);
    this.setData({ need: e.detail.value })
  },

})
