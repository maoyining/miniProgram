//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
   
    teamData:{},
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    index:0,
    
  
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
        that.setData({match:that.data.question[0]});
        console.log(that.data.question);
        console.log("比赛默认值："+that.data.match);  
        that.setData({str:res.data.need[0]});
        console.log("需求默认值："+that.data.str);
       
      },
    })
  
   
  },

  /**
 * CreateTeam --提交队伍表单，注意每个数据均不能为空
 */
  CreateTeam: function (e) {
    var that = this;
    console.log(this.data.match);
    var str='';
    console.log("提交时需求默认值：" + that.data.str);
    var i;
    for (i =0; i < that.data.need.length-1; i++) {
      console.log(that.data.need[i]);
      str =str + that.data.need[i]+' ';
    }
    str=str+that.data.need[i];
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
        if(res.statusCode!=200){
          wx.showToast({
            title: '创建队伍失败',
            duration: 2000
          })
        }
        else{
            wx.showToast({
              title: '创建队伍成功',
              icon:'success',
              duration:2000
            }),
            that.setData({form_info:''}) 
        } 
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
