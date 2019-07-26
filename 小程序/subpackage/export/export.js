function o(e) {
    t.showLoading("正在获取数据"), wx.request({
        url: a.globalData.host + "/enroll/v1/export",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: e.data.eid
        },
        method: "POST",
        success: function(s) {
            t.hideLoading(), -500 != s.data.sta ? 0 == s.data.sta ? e.setData({
                url: s.data.data.url
            }) : (console.log(s), console.log(a.globalData.host + "/enroll/v1/export"), console.log(e.data.eid), 
            console.log(wx.getStorageSync("accessToken")), t.showFailedToast("url获取失败", s.data.msg)) : t.login(function() {
                o(e);
            });
        },
        fail: function(o) {
            console.log(o), t.hideLoading(), t.showFailedToast("url获取失败");
        }
    });
}

var t = require("../../utils/util.js"), a = getApp();

Page({
    data: {
        url: ""
    },
    onLoad: function(t) {
        this.setData({
            eid: t.eid
        }), o(this);
    },
    onShow: function() {
        t.getContactUserInfo(this);
    },
    postFormId: function(o) {
        t.postFormId(o.detail.formId);
    },
    copy: function() {
        var o = this.data.url;
        wx.setClipboardData({
            data: o,
            success: function(o) {
                t.showToast("复制成功");
            }
        });
    },
    contactCallback: function(o) {
        t.contactCallback(o);
    }
});