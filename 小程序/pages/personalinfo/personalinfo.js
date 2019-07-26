function t(n) {
    wx.request({
        url: getApp().globalData.host + "/enroll/v1/identity",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(e) {
            if (-500 != e.data.sta) {
                if (0 == e.data.sta) {
                    var o = wx.getStorageSync("userInfo"), i = e.data.data;
                    n.setData({
                        avatar: o.avatarUrl,
                        nickname: o.nickName,
                        status: i.status
                    });
                }
            } else a.login(function() {
                t(n);
            });
        }
    });
}

var a = require("../../utils/util.js");

require("../../tmp/tmp.js"), getApp();

Page({
    data: {
        avatar: "",
        nickname: "",
        status: 0
    },
    onLoad: function(a) {
        t(this);
    },
    onShow: function() {
        var t = wx.getStorageSync("userInfo");
        this.setData({
            avatar: t.avatarUrl,
            nickname: t.nickName
        });
    },
    postFormId: function(t) {
        a.postFormId(t.detail.formId);
    },
    confirmGetUserInfo: function(t) {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "如果头像和昵称没有更新，请点击“重新授权”，试一试。",
            showCancel: !0,
            confirmText: "重新授权",
            confirmColor: "#12b7f5",
            success: function(n) {
                1 == n.confirm && a.getUserInfo(t);
            }
        });
    },
    getUserInfo: function(t) {
        if (!((t.detail.errMsg || "").indexOf("fail") >= 0)) {
            var n = this;
            a.showLoading("正在获取用户信息..."), a.buttonLogin(function() {
                a.hideLoading();
            }, function() {
                a.hideLoading();
            }, t.detail);
            var e = t.detail.userInfo;
            n.setData({
                avatar: e.avatarUrl,
                nickname: e.nickName
            });
        }
    },
    toAuthPage: function() {
        a.buttonClicked(this), wx.navigateTo({
            url: "/subpackage/personalauth/personalauth"
        });
    }
});