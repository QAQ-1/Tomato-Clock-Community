// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [
      {
        nav: '(1) 首页',
        small: '/images/prompt.png',
        fun: '选择时间：滑动圆点，选择你将要进行任务的时长，默认为5分钟，最小为1分钟，最大为60分钟。',
        small: '/images/prompt.png',
        fun1: '选择任务：选择你将要进行任务的类型。',
        pic: '/images/index.png'
      },
      {
        nav: '(2) 开始倒计时',
        small: '/images/prompt.png',
        fun: '点击开始专注进入倒计时页面。',
        small: '/images/prompt.png',
        fun1: '点击暂停可以停止倒计时，暂停时可选择继续或放弃，放弃的任务不计入统计。',
        pic: '/images/time.png',
        pic: '/images/stop.png'
      },
      {
        nav: '(3) 统计',
        small: '/images/prompt.png',
        fun: '上方：用户完成任务次数和专注时长的统计，分别显示今日的和累计的。',
        small: '/images/prompt.png',
        fun1: '下方：用户完成任务的记录，可以选择查看今日或者历史所有记录。',
        pic: '/images/log.png'
      },
      {
        nav: '(4) 我的',
        small: '/images/prompt.png',
        fun: '登录：点击登录，选择允许，可通过微信昵称和个人头像登录小程序，统计功能才可以使用。',
        small: '/images/prompt.png',
        fun1: '意见反馈：直接通过微信平台反馈，欢迎提出功能异常和产品反馈。',
        pic: '/images/login.png',
      },
      {
        nav: '(5) 清除记录',
        small: '/images/prompt.png',
        fun: '清空记录：清空所有的记录，清空之后不可恢复，谨慎操作！',
        pic: '/images/delete.png'
      }
    ]
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