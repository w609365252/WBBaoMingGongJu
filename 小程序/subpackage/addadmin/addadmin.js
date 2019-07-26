function a(o) {
    t.showLoading("正在获二维码");
    wx.request({
        url: e.globalData.host + "/enroll/v2/admin/qrcode",
        data: {
            eid: o.data.eid,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(e) {
            if (t.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                var s = e.data.data, d = t.formatDate(1e3 * s.expire_at, "MM-dd HH:mm");
                o.setData({
                    qrcode: s.url,
                    code: s.code,
                    expire: d
                });
            } else t.showFailedToast(e.data.msg); else t.login(function() {
                a(o), o.setData({
                    hasUserInfo: !0
                });
            }, function() {
                o.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(a) {
            t.hideLoading(), t.showFailedToast("网络请求超时，请重试");
        }
    });
}

var e = getApp(), t = require("../../utils/util.js");

Page({
    data: {
        qrcode: "",
        code: ""
    },
    onLoad: function(e) {
        this.setData({
            eid: e.eid
        }), a(this);
    },
    showPic: function() {
        var a = this.data.qrcode;
        wx.previewImage({
            urls: [ a ]
        });
    },
    copyCode: function() {
        wx.setClipboardData({
            data: this.data.code
        });
    }
});