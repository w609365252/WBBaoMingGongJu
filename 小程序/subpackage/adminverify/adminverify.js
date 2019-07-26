function t(e) {
    o.showLoading("正在提交数据");
    wx.request({
        url: a.globalData.host + "/enroll/v2/admin/add",
        data: {
            eid: e.data.eid,
            access_token: wx.getStorageSync("accessToken"),
            code: e.data.code
        },
        method: "POST",
        success: function(a) {
            o.hideLoading(), -500 != a.data.sta ? 0 == a.data.sta ? e.setData({
                successBoxShow: !0
            }) : o.showFailedToast(a.data.msg) : o.login(function() {
                t(e), e.setData({
                    hasUserInfo: !0
                });
            }, function() {
                e.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(t) {
            o.hideLoading(), o.showFailedToast("网络请求超时，请重试");
        }
    });
}

var a = getApp(), o = require("../../utils/util.js");

Page({
    data: {
        code: "",
        codeDefault: "",
        successBoxShow: !1
    },
    onLoad: function(t) {
        var a = decodeURIComponent(t.scene || "");
        this.setData({
            eid: t.eid || a
        });
    },
    onShow: function() {
        var t = this;
        o.checkSession(this, function() {}, function() {
            t.setData({
                hasUserInfo: !1
            });
        });
    },
    login: function(t) {
        var a = this;
        o.showLoading("正在登录..."), o.buttonLogin(function() {
            o.hideLoading(), a.setData({
                hasUserInfo: !0
            });
        }, function() {
            o.hideLoading();
        }, t.detail);
    },
    postFormId: function(t) {
        o.postFormId(t.detail.formId);
    },
    inputCode: function(t) {
        this.setData({
            code: t.detail.value
        });
    },
    toDetail: function() {
        wx.redirectTo({
            url: "/pages/detail/detail?eid=" + this.data.eid
        });
    },
    verifyCode: function() {
        o.isTextEmpty(this.data.code) ? o.showFailedToast("请填写验证码") : t(this);
    }
});