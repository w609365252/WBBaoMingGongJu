function t(o) {
    e.showLoading("加载中"), o.setData({
        showLoadError: 0
    }), wx.request({
        url: a.globalData.host + "/recommends",
        data: {
            xcx: "bmgj",
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(a) {
            e.hideLoading(), -500 != a.data.sta ? 0 == a.data.sta && a.data.data ? o.setData({
                recommends: a.data.data
            }) : o.setData({
                showLoadError: 1
            }) : e.login(function() {
                t(o);
            });
        },
        fail: function(t) {
            e.hideLoading(), o.setData({
                showLoadError: 1
            });
        }
    });
}

var e = require("../../utils/util.js"), a = getApp();

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
        var e = this.data.swiper, a = e.imgUrls.length;
        e.current = Math.floor(Math.random() * a), this.setData({
            swiper: e
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
        var e = this.data.recommends[t.currentTarget.dataset.index];
        wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: e.appid
        }) : wx.previewImage({
            urls: [ e.qrcode ]
        });
    },
    showPic: function(t) {
        var e = t.currentTarget.dataset.pics, a = t.currentTarget.dataset.pic;
        wx.previewImage({
            current: a,
            urls: e
        });
    },
    toDetail: function(t) {
        var e = t.currentTarget.dataset.index;
        if (1 == e) {
            a = "https://xcx.qunsou.co/web-lotto/weiyou.html";
            wx.navigateTo({
                url: "/pages/webview/webview?url=" + a
            });
        } else if (0 == e) {
            var a = "https://xcx.qunsou.co/web-lotto/zhibo.html";
            wx.navigateTo({
                url: "/pages/webview/webview?url=" + a
            });
        }
    }
});