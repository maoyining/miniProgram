//index.js
//获取应用实例
const app = getApp()
Page({
  data: {

    teamData: {},
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    index: 0,
    competeName: ['全国大学生数学建模竞赛', '浙江省新苗人才计划大赛', '中国互联网+创新创业大赛', 'ACM程序设计大赛'],
    flag: 0,
    cname: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow:function(){
  
  },
  onLoad: function () {
   

  },
  bindPickerChange(e) {
    // console.log('picker',e)
    var index = e.detail.value;
    this.setData({
      index: e.detail.value
    })
    this.setData(
      { cname: this.data.competeName[index] }
    )
    console.log(this.data.cname);
  },

  /**
 * CreateTeam --提交队伍表单，注意每个数据均不能为空
 */
  CreateTeam: function (e) {
    
    //如果e.detail.value.tname,或者还有其他成员为空,
    //则不会进行wx.request,并且跳出弹出框输入内容不为空
    //然后memberNow>memberTotal也会跳出弹出框提示错误
    //把比赛名称那里修改成下拉选择框,四种比赛类型的名称为：
    //全国大学生数学建模竞赛、浙江省新苗人才计划大赛、中国互联网+创新创业大赛、ACM程序设计大赛
    console.log(this.data.flag)
    for (var element in e.detail.value) {
      if (!e.detail.value[element]) {
        wx.showToast({
          title: '表单未填写完整',
          icon:'warn',
          image: '/static/images/警告.png'
        })
        this.data.flag = 1;
      }
      else if (e.detail.value.memberNow >= e.detail.value.memberTotal) {

        wx.showToast({
          title: '现有人数比期望人数少',
          image: '/static/images/警告.png',
          iconsize: '16px'
        })
        this.data.flag = 1;
      }
    }

   if (this.data.flag==0) {
console.log(this.data.cname)
var that = this;
      wx.request({
        url: app.globalData.host + '/team',
        method: 'POST',
        data:
        {
          "openid": app.globalData.openid,
          "tname": e.detail.value.tname,
          "memberNow": parseInt(e.detail.value.memberNow),
          "memberTotal": parseInt(e.detail.value.memberTotal),
          "contact": e.detail.value.contact,
          "desc": e.detail.value.desc,
          "need": e.detail.value.need,
          "cname": that.data.cname
        },
        success(res) {
          // var teamID = res.data.data.teamID;
          console.log(res);
            if(res.statusCode==200){
            wx.showToast({
              title: '创建队伍成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({ form_info: '' })
          }else {
            wx.showToast({
              title: '创建队伍失败',
              icon: 'fail',
              duration: 2000
            })
          }
        },
      })
    }else{
      this.data.flag=0;
    }
},


  /*比赛名称*/

  pickerChangeMatches(e) {
    console.log('比赛复选框的选择:' + e.detail.value);
    var index = e.detail.value;
    this.setData(
      { index: e.detail.value },
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
