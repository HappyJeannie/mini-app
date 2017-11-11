var postsData = require("../../../data/posts-data.js");
var app = getApp();
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
    var globalData = app.globalData;
    console.log(globalData);
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
    if (app.globalData.g_isPlayingMusic && app.global.g_currentMusicPostId == that.data.postId){
      this.setData({
        isPlayMusic:true
      });
    }else{
      this.setData({
        isPlayMusic: false
      });
    }
    //监听音乐播放停止
    this.setMusicMonitor();
  },
  setMusicMonitor:function(){
    var that = this;
    //以下两个都是全局监听
    //监听音乐启动
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.music.postId;
    });
    //监听音乐停止
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
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
    var index = this.data.postId;
    if (isPlayMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayMusic:false
      });
    }else{
      //音乐播放处理
      wx.playBackgroundAudio({
        dataUrl: postsData.postList[index].music.url,
        title: postsData.postList[index].music.title, 
        coverImgUrl: postsData.postList[index].music.coverImage
      })
      this.setData({
        isPlayMusic: true
      });
    }
    
  }
})