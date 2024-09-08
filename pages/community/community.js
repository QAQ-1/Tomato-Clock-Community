// pages/todayStats/todayStats.js
Page({
  data: {
    posts: [
      {
        id: 1,
        avatarUrl: '/images/avatar1.jpg', // 示例头像路径
        nickname: '用户一',
        totalTomatoes: 5,
        totalTime: 125,
        content: '    今天完成了5个番茄时钟，感觉效率很高！',
        comment: {
          nickname: '评论者一',
          text: '真棒！继续加油！'
        }
      },
      {
        id: 2,
        avatarUrl: '/images/avatar2.jpg', // 示例头像路径
        nickname: '用户二',
        totalTomatoes: 8,
        totalTime: 200,
        content: '    今天的番茄时钟让我完成了很多工作，真是太棒了！',
        comment: {
          nickname: '评论者二',
          text: '很励志！我也要试试这个方法。'
        }
      }
    ]
  },

  like() {
    wx.showToast({
      title: '点赞成功',
      icon: 'success'
    });
  },

  comment() {
    wx.navigateTo({
      url: '/pages/comment/comment'
    });
  },

  share() {
    wx.showShareMenu({
      withShareTicket: true
    });
  }
});
