var postsData = require("../../../data/posts-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var postData = postsData.postList[postId];
    this.setData({
      postData:postData,
      postId : postId
    });
    var postsCollected = wx.getStorageSync("posts_collected");
    if(postsCollected){
      var postCollected = postsCollected[postId];
      this.setData({
        collected:postCollected
      });
    }else{
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
      this.setData({
        collected: false
      });
    }
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
  onCollectionTap:function(event){
    //收藏功能实现
    // wx.getStorageSync(key);
    //同步调用的方法
    this.getPostsCollectedSyc();
    //更新缓存
    //wx.setStorageSync("posts_collected", postsCollected);
    //更新页面状态
    // this.setData({
    //   collected: postCollected
    // });
    //this.showMoal(postsCollected, postCollected); 
  },
  getPostsCollectedAsy:function(){
    //异步读取本地数据
    var that = this;
    wx.getStorage({
      key:"posts_collected",
      success:function(res){
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.postId];
        //收藏状态取反
        postCollected = !postCollected;
        postsCollected[that.data.postId] = postCollected;
        that.showMoal(postsCollected, postCollected); 
      }
    });
  },
  getPostsCollectedSyc:function(){
    //同步读取本地数据
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.postId];
    postCollected = !postCollected;
    postsCollected[this.data.postId] = postCollected;
    this.showMoal(postsCollected, postCollected); 
  },
  onShareTap:function(event){
    //底部弹出选项操作
    // wx.removeStorageSync(key);
    // wx.clearStorageSync();
    var itemList = [
      "分享到微信好友",
      "分享到朋友圈",
      "分享到微博",
      "分享到QQ"
    ];
    wx.showActionSheet({
      itemList: [
        "分享到微信好友",
        "分享到朋友圈",
        "分享到微博",
        "分享到QQ"
      ],
      itemColor:"#405f80",
      success:function(res){
        // res.cancel 是否点击取消
        // res.tapIndex  数组元素的序号
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '现在还不能实现分享'
        })
      }
    })
  },
  showToast: function (postCollected){
    //是否收藏成功提示
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000
    })
  },
  showMoal:function(postsCollected,postCollected){
    //提示信息显示
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected?'是否收藏文章？':"是否取消收藏？",
      showCancel:"true",
      cancelText:"取消",
      cancelColor:"#333",
      confirmText:"确认",
      confirmColor:"#405f80",
      success:function(res){
        //收藏和不收藏的变量在res中
        if(res.confirm){
          wx.setStorageSync("posts_collected", postsCollected);
          that.showToast(postCollected);
          that.setData({
            collected:postCollected
          });
        }
      }
    })
  },
  onMusicTap:function(event){
    var isPlayMusic = this.data.isPlayMusic;
    if (isPlayMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayMusic:false
      });
    }else{
      //音乐播放处理
      wx.playBackgroundAudio({
        dataUrl: 'http://dl.stream.qqmusic.qq.com/C400001udJ173V0rrp.m4a?vkey=B57E316A818B4DB6109F5194D429D53ABA44B1CBD87C290510B7444C36A27B04AB4B30CFCB617747257C6615FFB1952287A1D10EAC68EA12&guid=5710102420&uin=0&fromtag=66',
        title: "遗憾", coverImgUrl: "https://y.gtimg.cn/music/photo_new/T002R300x300M000004VO2Bs2IQqN5.jpg?max_age=2592000"
      })
      this.setData({
        isPlayMusic: true
      });
    }
    
  }
})