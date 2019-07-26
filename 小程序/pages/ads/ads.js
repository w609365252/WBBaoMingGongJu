function t(o) {
    a.showLoading("加载中"), o.setData({
        showLoadError: 0
    }), wx.request({
        url: e.globalData.host + "/recommends",
        data: {
            xcx: "bmgj",
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(e) {
            a.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta && e.data.data ? o.setData({
                recommends: e.data.data
            }) : o.setData({
                showLoadError: 1
            }) : a.login(function() {
                t(o);
            });
        },
        fail: function(t) {
            a.hideLoading(), o.setData({
                showLoadError: 1
            });
        }
    });
}

var a = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        showLoadError: 0,
        recommends: null,
        swiper: {
            imgUrls: [ "https://cdn-xcxcustom.weiyoubot.cn/20170914/d28d13c75c6cc2b4d8bb7dce359adf34.jpg", "https://cdn-xcxcustom.weiyoubot.cn/20170914/beb583d2394dc6795268e5626ea0a196.jpg" ],
            indicatorDots: !0,
            autoplay: !0,
            interval: 5e3,
            duration: 1e3
        },
        recommendsOther: [ {
            description: "微信内多群直播讲课神器！支持语音、文本、图片等内容的实时直播和转发！",
            title: "微友课堂",
            logo: "https://cdn-xcxcustom.weiyoubot.cn/20170914/d9e31447b12b8bc0a1cfae9ae51ae5a4.png"
        }, {
            description: "顶尖微群营销管理机器人！拥有定时群发，自动回复等众多群营销管理功能。",
            title: "微友助手",
            logo: "https://cdn-xcxcustom.weiyoubot.cn/20170914/c50d00bb718fd2b18b7b5c5aa40fbc18.png"
        } ]
    },
    onLoad: function() {
        var a = this.data.swiper;
        a.current = Math.floor(3 * Math.random()), this.setData({
            swiper: a
        }), t(this);
    },
    refresh: function() {
        t(this);
    },
    onShareAppMessage: function() {
        return {
            title: "更多群工具",
            path: "/subpackage/recommend/recommend"
        };
    },
    try: function(t) {
        var a = this.data.recommends[t.currentTarget.dataset.index];
        wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: a.appid
        }) : wx.previewImage({
            urls: [ a.qrcode ]
        });
    },
    showPic: function(t) {
        var a = t.currentTarget.dataset.pics, e = t.currentTarget.dataset.pic;
        wx.previewImage({
            current: e,
            urls: a
        });
    },
    toDetail: function(t) {
        var a = t.currentTarget.dataset.index;
        1 == a ? wx.navigateTo({
            url: "/subpackage/weiyou/weiyou"
        }) : 0 == a && wx.navigateTo({
            url: "/subpackage/zhibo/zhibo"
        });
    }
});