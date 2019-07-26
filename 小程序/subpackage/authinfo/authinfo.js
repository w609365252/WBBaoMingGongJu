function t(a) {
    o.showLoading("正在加载数据"), wx.request({
        url: e.globalData.host + "/enroll/v1/auth/info",
        method: "GET",
        dataType: "json",
        data: {
            access_token: o.getToken(),
            unionid: a.data.unionid
        },
        success: function(e) {
            if (o.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                var n = e.data.data;
                n.auth_time = o.formatDate(1e3 * n.auth_time, "yyyy/MM/dd"), n.expire = o.formatDate(1e3 * n.expire, "yyyy/MM/dd"), 
                a.setData({
                    info: n
                });
            } else o.showFailedToast("数据加载失败", e.data.msg); else o.login(function() {
                t(a);
            });
        },
        fail: function(t) {
            o.showFailedToast("数据加载失败");
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
        success: function(e) {
            -500 != e.data.sta ? 0 == e.data.sta && t.setData({
                showDev: e.data.data
            }) : o.login(function() {
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

var e = getApp(), o = require("../../utils/util.js");

Page({
    data: {},
    onLoad: function(a) {
        console.log(a), this.setData({
            unionid: a.unionid,
            auth_type: a.auth_type
        }), this.setTitle(), t(this);
    },
    onShow: function() {
        a(this);
    },
    setTitle: function() {},
    makeCall: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.info.op_phone
        });
    }
});