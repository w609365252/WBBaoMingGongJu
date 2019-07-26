function t(a) {
    wx.request({
        url: getApp().globalData.host + "/enroll/v1/vip",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(n) {
            if (-500 != n.data.sta) {
                if (0 == n.data.sta) {
                    var o = wx.getStorageSync("userInfo"), c = n.data.data || 0;
                    a.setData({
                        showDev: c,
                        avatar: o.avatarUrl,
                        nickname: o.nickName
                    }), e.setStorage("isDev", c);
                }
            } else e.login(function() {
                t(a), a.setData({
                    hasUserInfo: !0
                });
            }, function() {
                a.setData({
                    hasUserInfo: !1
                });
            });
        }
    });
}

var e = require("../../utils/util.js"), a = require("../../tmp/tmp.js");

getApp();

Page({
    data: {
        page: 1,
        moreData: !1,
        enrollList: null,
        type: 0,
        adId: "5a0eb1accc3c56664623910cc87a3127",
        createImages: [ "https://cdn-xcxcustom.weiyoubot.cn/20190116/b8d2d9300c6feb151e116f519f621199.png", "https://cdn-xcxcustom.weiyoubot.cn/20190116/ded0fb95840a15f4b8ec8cdb079d773c.png", "https://cdn-xcxcustom.weiyoubot.cn/20190116/9a3487daf01dd61a17fad799ea7b604f.png", "https://cdn-xcxcustom.weiyoubot.cn/20190116/dc124d16b964a0694f5ca891f5b604d8.png", "https://cdn-xcxcustom.weiyoubot.cn/20190116/5fa91d5ba34d8662f5d4bcb768c05a49.png", "https://cdn-xcxcustom.weiyoubot.cn/20190116/5e06d1e4e1d653c2c215661052716f59.png" ]
    },
    onLoad: function(t) {
        var n = t.eid || "";
        e.isTextEmpty(n) && (n = decodeURIComponent(t.scene || "")), n && wx.navigateTo({
            url: "/pages/detail/detail?eid=" + n
        }), a.enRoll(this);
    },
    toVerify: function() {
        wx.navigateTo({
            url: "/subpackage/adminverify/adminverify"
        });
    },
    onShow: function(n) {
        var o = this;
        e.checkSession(this, function() {
            o.setData({
                toDetail: !1,
                page: 1
            }), t(o), a.ads(o, o.data.adId, "index");
        }, function() {
            o.setData({
                hasUserInfo: !1
            });
        });
    },
    onHide: function() {},
    login: function(t) {
        if (t.detail.errMsg.indexOf("fail") >= 0) e.hideLoading(); else {
            var a = this;
            e.showLoading("正在登录..."), e.buttonLogin(function() {
                e.hideLoading(), a.setData({
                    hasUserInfo: !0
                }), a.toCreate(t);
            }, function() {
                e.hideLoading();
            }, t.detail);
        }
    },
    toCreate: function(t) {
        e.buttonClicked(this);
        var a = t.currentTarget.dataset.type;
        a < 4 ? wx.navigateTo({
            url: "/pages/create/create?temp=" + a
        }) : 4 == a ? wx.navigateTo({
            url: "/pages/createbuy/createbuy"
        }) : 6 == a && wx.navigateTo({
            url: "/groupbuy/pages/groupbuy/create"
        });
    },
    postFormId: function(t) {
        e.postFormId(t.detail.formId);
    },
    onShareAppMessage: function() {
        return {
            title: "我发现了一个超级好用的活动报名工具，快来试试"
        };
    },
    reAuthorize: function() {
        var t = this;
        wx.openSetting({
            complete: function(a) {
                e.login(function() {
                    t.setData({
                        hasUserInfo: !0
                    }), getEnrollList(t);
                });
            }
        });
    },
    openPcDialog: function() {
        e.adClick({
            ad_id: "index_to_pc_click",
            desc: "首页点击试试电脑端创建"
        }, "index"), this.setData({
            pcDialog: !0
        });
    },
    closePcDialog: function() {
        this.setData({
            pcDialog: !1
        });
    },
    copyUrl: function() {
        e.adClick({
            ad_id: "index_to_pc_copy",
            desc: "首页复制电脑端链接"
        }, "index"), wx.setClipboardData({
            data: "http://baominggongju.com/?from=xcx",
            success: function() {
                e.showToast("网址复制成功");
            }
        });
    }
});