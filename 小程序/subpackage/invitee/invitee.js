function a(a) {
    if (Array.isArray(a)) {
        for (var t = 0, o = Array(a.length); t < a.length; t++) o[t] = a[t];
        return o;
    }
    return Array.from(a);
}

function t(n) {
    o.showLoading("正在加载数据");
    var i = n.data.page;
    wx.request({
        url: e.globalData.host + "/enroll/v1/stat/follower_list",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: n.data.eid,
            page: i,
            unionid: n.data.unionid
        },
        method: "GET",
        success: function(e) {
            if (-500 != e.data.sta) if (0 == e.data.sta) {
                for (var i = e.data.data, s = i.length, r = 0; r < s; r++) i[r].time = o.formatDate(1e3 * i[r].time, "MM-dd HH:mm");
                var d = n.data.page;
                n.setData({
                    list: 1 == d ? i : [].concat(a(n.data.list), a(i)),
                    noMoreData: !(i.length > 8),
                    page: d + 1
                });
            } else o.showFailedToast("加载失败，", e.data.msg); else o.login(function() {
                t(n);
            });
        },
        fail: function(a) {
            o.showFailedToast("加载失败");
        },
        complete: function() {
            o.hideLoading();
        }
    });
}

var o = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        list: [],
        page: 1,
        noMoreData: !1
    },
    onLoad: function(a) {
        console.log("options : =====", a), this.setData({
            eid: a.eid || "",
            unionid: a.unionid || ""
        }), t(this);
    },
    onShow: function() {},
    onReachBottom: function() {
        this.data.noMoreData || t(this);
    }
});