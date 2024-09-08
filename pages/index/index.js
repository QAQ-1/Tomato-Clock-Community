//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    clockShow: false,
    clockHeight: 0,
    time: '5',
    timer: null,
    mTime: 300000,
    eTime: 290000,
    timeStr: '05:00',
    rate: '',
    // openid: '',
    Y: '',
    M: '',
    D: '',
    h: '',
    m: '',
    s: '',
    cateArr: [
      {
        icon: 'work',
        text: '工作'
      },
      {
        icon: 'study',
        text: '学习'
      },
      {
        icon: 'think',
        text: '思考'
      },
      {
        icon: 'write',
        text: '写作'
      },
      {
        icon: 'sport',
        text: '运动'
      },
      {
        icon: 'read',
        text: '阅读'
      }
    ],
    cateActive: '0',
    okShow: false,
    pauseShow: true,
    continueCancleShow: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //750rpx
    var res = wx.getWindowInfo();
    var rate = 750 / res.windowWidth;
    this.setData({
      rate: rate,
      clockHeight: rate * res.windowHeight
    })
  },
  getUserInfo: function (e) {
    var user = wx.getStorageSync('user')
    app.globalData.userInfo = user.userInfo
    this.setData({
      userInfo: user.userInfo,
      hasUserInfo: true
    })
  },
  slideChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  clickCate: function (e) {
    this.setData({
      cateActive: e.currentTarget.dataset.index
    })
  },
  start: function () {
    var user = wx.getStorageSync('user')
    if (!user) {
      wx.showModal({
        title: '温馨提示',
        content: '登录才能进行计时',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '/pages/me/me'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {

      var date = new Date();
      //年  
      var Y = date.getFullYear();
      //月  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //日  
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      //时  
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      //分  
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      //秒  
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

      this.setData({
        openid: app.globalData.openid,
        Y: Y,
        M: M,
        D: D,
        h: h,
        m: m,
        s: s,
        clockShow: true,
        mTime: this.data.time * 60 * 1000,
        eTime: this.data.time * 60 * 1000 - 1000,
        timeStr: parseInt(this.data.time) >= 10 ? this.data.time + ':00' : '0' + this.data.time + ':00'
      })
      this.drawBg();
      this.drawActive();
    }
  },
  drawBg: function() {
    const lineWidth = 6 / this.data.rate;//px
    const query = wx.createSelectorQuery()
    query.select('#progress_bg')
        .fields({ node:true, size: true})
        .exec((res) => {
           const canvas = res[0].node
           const ctx = canvas.getContext('2d')
           const dpr = wx.getWindowInfo().pixelRatio
           canvas.width = res[0].width * dpr
           canvas.height = res[0].height * dpr
           ctx.scale(dpr, dpr)
           ctx.lineCap='round'
           ctx.lineWidth="lineWidth"
           ctx.beginPath()
           ctx.arc(400/this.data.rate/2,400/this.data.rate/2,400/this.data.rate/2-2*lineWidth,0,2*Math.PI,false)
           ctx.strokeStyle ="#000000"
           ctx.stroke()
        })
},
drawActive: function() {
   var _this = this;
   var timer = setInterval(function (){
       var angle = 1.5 + 2*(_this.data.time*60*1000 - _this.data.mTime)/(_this.data.time*60*1000);
       var currentTime = _this.data.mTime - 100
       _this.setData({
           mTime:currentTime
       });
       if(angle < 3.5){
           if(currentTime % 1000 == 0){
               var timeStr1 = currentTime / 1000;//s
               var timeStr2 = parseInt(timeStr1 / 60); //m
               var timeStr3 = (timeStr1 - timeStr2 * 60) >= 10 ? (timeStr1 - timeStr2 * 60) :"0" +  (timeStr1 - timeStr2 * 60);
               var timeStr2 = timeStr2 >= 10 ? timeStr2:"0" + timeStr2;
               _this.setData({
                timeStr:timeStr2 + ":" + timeStr3
               })
             };
            const lineWidth = 6 / _this.data.rate;//px
            const query = wx.createSelectorQuery()
            query.select('#progress_active')
            .fields({ node:true, size: true})
            .exec((res) => {
                const canvas = res[0].node
                const ctx = canvas.getContext('2d')

                const dpr = wx.getWindowInfo().pixelRatio
                canvas.width = res[0].width * dpr
                canvas.height = res[0].height * dpr
                ctx.scale(dpr, dpr)
                ctx.lineCap='round'
                ctx.lineWidth="lineWidth"
                ctx.beginPath()
                ctx.arc(400/ _this.data.rate/2,400/_this.data.rate/2,400/_this.data.rate/2-2*lineWidth,1.5*Math.PI,angle*Math.PI,false)
                ctx.strokeStyle ="#ffffff"
                ctx.stroke()
                
           })
       } else {
           var logs = wx.getStorageSync("logs") || [];
           _this.setData({
            timeStr:"00:00",
            pauseShow: false,
            continueCancleShow: false,
            okShow: true,
         });
           logs.unshift({
               date: formatTime(new Date),
               cate: _this.data.cateActive,
               time: _this.data.time
           });
           wx.setStorageSync('logs', logs);
           
        clearInterval(timer); 
       }  
   },100);
   _this.setData({
       timer :timer
   })
},
  pause: function () {
    clearInterval(this.data.timer);
    this.setData({
      pauseShow: false,
      continueCancleShow: true,
      okShow: false
    })
  },
  continue: function () {
    this.drawActive();
    this.setData({
      pauseShow: true,
      continueCancleShow: false,
      okShow: false
    })
  },
  cancle: function () {
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '您真的要放弃吗？不再坚持一下了吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          clearInterval(that.data.timer);
          that.setData({
            pauseShow: true,
            continueCancleShow: false,
            okShow: false,
            clockShow: false
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  ok: function (event) {
    clearInterval(this.data.timer);
    this.setData({
      pauseShow: true,
      continueCancleShow: false,
      okShow: false,
      clockShow: false
    })
    wx.cloud.callFunction({
      name: "createlog",
      data: {
        Y: this.data.Y,
        M: this.data.M,
        D: this.data.D,
        h: this.data.h,
        m: this.data.m,
        s: this.data.s,
        cateActive: this.data.cateActive,
        time: this.data.time,
        openid: app.globalData.openid
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  }

})
