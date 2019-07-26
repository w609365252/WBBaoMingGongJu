function t(i) {
    e.showLoading("正在加载数据"), wx.request({
        url: a.globalData.host + "/enroll/v1/notice/detail",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: i.data.eid
        },
        method: "GET",
        success: function(a) {
            if (e.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                var o = a.data.data;
                i.setData({
                    content: o.content
                });
            } else -1 == a.data.sta && "data not found" == a.data.msg ? i.toDetail() : e.showFailedToast("获取数据失败", a.data.msg); else e.login(function() {
                t(i);
            });
        },
        fail: function(t) {
            e.hideLoading(), e.showFailedToast("获取数据失败");
        }
    });
}

var a = getApp(), e = require("../../utils/util.js");

Page({
    data: {
        content: ""
    },
    onLoad: function(a) {
        this.setData({
            eid: a.eid || ""
        }), t(this);
    },
    toDetail: function() {
        e.buttonClicked(this), wx.redirectTo({
            url: "/pages/detail/detail?eid=" + this.data.eid
        });
    }
});