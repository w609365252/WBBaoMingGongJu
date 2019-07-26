var e = require("../../utils/util.js"), t = getApp();

Page({
    data: {
        brand: "",
        model: "",
        pixelRatio: "",
        screenWidth: "",
        screenHeight: "",
        windowWidth: "",
        windowHeight: "",
        statusBarHeight: "",
        language: "",
        version: "",
        system: "",
        platform: "",
        fontSizeSetting: "",
        SDKVersion: "",
        unionid: "",
        authorize: ""
    },
    onLoad: function(t) {
        var n = this.getSystemInfo();
        console.log(n);
        var o = e.getStorage("accessToken");
        if (this.setData({
            brand: n.brand,
            model: n.model,
            pixelRatio: n.pixelRatio,
            screenWidth: n.screenWidth,
            screenHeight: n.screenHeight,
            windowWidth: n.windowWidth,
            windowHeight: n.windowHeight,
            statusBarHeight: n.statusBarHeight,
            language: n.language,
            version: n.version,
            system: n.system,
            platform: n.platform,
            fontSizeSetting: n.fontSizeSetting,
            SDKVersion: n.SDKVersion,
            isLogin: o ? "已登录" : "未登录",
            timeZone: -new Date().getTimezoneOffset() / 60
        }), wx.getSetting) {
            var i = [];
            wx.getSetting({
                success: function(e) {
                    var t = e.authSetting;
                    console.log(t), t["scope.userInfo"] && i.push("用户信息"), t["scope.userLocation"] && i.push("地理位置"), 
                    t["scope.address"] && i.push("通讯地址"), t["scope.invoiceTitle"] && i.push("发票抬头"), 
                    t["scope.werun"] && i.push("微信运动步数"), t["scope.record"] && i.push("录音功能"), t["scope.writePhotosAlbum"] && i.push("保存到相册"), 
                    t["scope.camera"] && i.push("摄像头"), s.setData({
                        authorize: i.join(",")
                    });
                }
            });
        }
        o && this.getUnionid();
        var s = this;
        wx.getNetworkType({
            success: function(e) {
                s.setData({
                    network: e.networkType
                });
            }
        });
    },
    onShow: function() {},
    getSystemInfo: function() {
        try {
            return wx.getSystemInfoSync();
        } catch (e) {
            this.getSystemInfo();
        }
    },
    getUnionid: function() {
        var n = this;
        wx.request({
            url: t.globalData.host + "/common/userinfo",
            data: {
                access_token: e.getStorage("accessToken")
            },
            method: "GET",
            success: function(t) {
                if (-500 != t.data.sta) {
                    if (0 == t.data.sta && t.data.data) {
                        var o = t.data.data.unionid;
                        n.setData({
                            unionid: o
                        });
                    }
                } else e.login(function() {
                    n.getUnionid();
                });
            }
        });
    },
    copy: function() {
        var t = this.data, n = "手机品牌: " + t.brand + "\n手机型号: " + t.model + "\n微信语言: " + t.language + "\n微信版本号: " + t.version + "\n操作系统版本: " + t.system + "\n客户端平台: " + t.platform + "\n客户端基础库版本: " + t.SDKVersion + "\n权限信息: " + t.authorize + "\n网络类型: " + t.network + "\n是否登录成功: " + t.isLogin + "\nunionid: " + t.unionid + "\n时区:" + t.timeZone;
        wx.setClipboardData({
            data: n,
            success: function(t) {
                e.showModelTips("信息复制成功");
            }
        });
    },
    toIndex: function() {
        e.toIndex();
    }
});