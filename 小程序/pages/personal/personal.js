function t(a, o) {
    wx.request({
      url: n.globalData.host + "/User/UserInfo",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(n) {
            if (-500 != n.data.sta) {
                if (0 == n.data.sta) {
                    var i = n.data.data;
                    if (i) {
                        var s = i.unionid, c = wx.getStorageSync("userInfo");
                        a.setData({
                            unionid: s,
                            avatar: c.avatarUrl,
                            nickname: c.nickName,
                            status: i.auth_status,
                            type: i.auth_type
                        }), o && wx.setClipboardData({
                            data: s,
                            success: function(t) {
                                e.showModelTips("unionid复制成功:" + s);
                            }
                        });
                    }
                }
            } else e.login(function() {
                t(a);
            });
        }
    });
}

function a(t) {
    wx.request({
        url: getApp().globalData.host + "/enroll/v1/vip",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(o) {
            if (-500 != o.data.sta) {
                if (0 == o.data.sta) {
                    var n = wx.getStorageSync("userInfo"), i = o.data.data || 0;
                    t.setData({
                        showDev: i,
                        avatar: n.avatarUrl,
                        nickname: n.nickName
                    });
                }
            } else e.login(function() {
                a(t), t.setData({
                    hasUserInfo: !0
                });
            }, function() {
                t.setData({
                    hasUserInfo: !1
                });
            });
        }
    });
}

var e = require("../../utils/util.js"), o = require("../../tmp/tmp.js"), n = getApp();

Page({
    data: {
        avatar: "",
        nickname: "",
        noticeCount: 0,
        showDev: 0,
        buttonClicked: !1,
        unionid: "",
        noticeBoard: n.globalData.noticeBoard,
        testHost: n.globalData.host.indexOf("pre.") > 0 ? 1 : 0,
        status: 0,
        personalInfoClicked: e.getStorage("personalInfoClicked") || !1
    },
    onLoad: function(t) {
        o.noticeBoard(this);
        var n = this;
        o.wxLogin(this, function() {
            a(n), e.getContactUserInfo(n);
        });
        var i = wx.getSystemInfoSync().SDKVersion;
        this.setData({
            SDKVersion: i
        });
    },
    onShow: function() {
        t(this), e.checkSession(this);
        var o = wx.getStorageSync("userInfo");
        this.setData({
            avatar: o.avatarUrl,
            nickname: o.nickName,
            longtap: !1
        }), a(this), e.getContactUserInfo(this);
    },
    contactCallback: function(t) {
        e.contactCallback(t);
    },
    openNoticeBoard: function() {
        wx.navigateTo({
            url: "/pages/webview/webview?url=https://mp.weixin.qq.com/s/rMkaVAqC8gPH3BIrSMywnQ"
        });
    },
    longtap: function() {
        this.setData({
            longtap: !0
        }), wx.navigateTo({
            url: "/subpackage/network/network"
        });
    },
    toDev: function() {
        e.buttonClicked(this), wx.navigateTo({
            url: "/subpackage/dev/dev"
        });
    },
    toCollection: function() {
        e.buttonClicked(this), wx.navigateTo({
            url: "/subpackage/collection/collection"
        });
    },
    toRecommend: function() {
        e.buttonClicked(this), wx.navigateTo({
            url: "/subpackage/recommend/recommend"
        });
    },
    toFeature: function() {
        e.buttonClicked(this), wx.navigateTo({
            url: "/pages/feature/feature"
        });
    },
    toHelp: function() {
        e.buttonClicked(this);
        wx.navigateTo({
            url: "/pages/webview/webview?url=https://mp.weixin.qq.com/s/E9ggVPFWUiiFMr2RFOMKdg"
        });
    },
    payRecord: function() {
        e.buttonClicked(this), wx.navigateTo({
            url: "/subpackage/payrecord/payrecord"
        });
    },
    drawRecord: function() {
        e.buttonClicked(this), wx.navigateTo({
            url: "/subpackage/income/income"
        });
    },
    postFormId: function(t) {
        e.postFormId(t.detail.formId);
    },
    getUserInfo: function(t) {
        if (this.data.longtap) this.setData({
            longtap: !1
        }); else if (!((t.detail.errMsg || "").indexOf("fail") >= 0)) {
            var a = this;
            e.showLoading("正在获取用户信息..."), e.buttonLogin(function() {
                e.hideLoading();
            }, function() {
                e.hideLoading();
            }, t.detail);
            var o = t.detail.userInfo;
            a.setData({
                avatar: o.avatarUrl,
                nickname: o.nickName
            });
        }
    },
    onShareAppMessage: function() {
        return {
            title: "我发现了一个超级好用的活动报名工具，快来试试",
            path: "/pages/default/default"
        };
    },
    changeHost: function() {
        var t = 1;
        if (this.data.testHost) {
            a = "https://api-xcx-qunsou.weiyoubot.cn/xcx";
            n.globalData.host = a, t = 0;
        } else {
            var a = "https://pre.weiyoubot.cn/xcx";
            n.globalData.host = a;
        }
        this.setData({
            testHost: t
        }), wx.setStorageSync("host", a), e.showToast("切换成功");
    },
    toVoucher: function() {
        e.buttonClicked(this), wx.navigateTo({
            url: "/pages/voucherlist/voucherlist"
        });
    },
    toAuthType: function() {
        2 == this.data.status ? wx.navigateTo({
            url: "/pages/homepage/homepage?unionid=" + this.data.unionid
        }) : wx.navigateTo({
            url: "/subpackage/authentication/authentication?status=" + this.data.status
        });
    },
    toPersonalInfo: function() {
        e.buttonClicked(this), this.setData({
            personalInfoClicked: !0
        }), e.setStorage("personalInfoClicked", !0), wx.navigateTo({
            url: "/pages/personalinfo/personalinfo"
        });
    }
});