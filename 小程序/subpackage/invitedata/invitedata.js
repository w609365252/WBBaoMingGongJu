function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

function a(r) {
    e.showLoading("正在加载数据");
    var i = r.data.page;
    wx.request({
        url: o.globalData.host + "/enroll/v1/stat/refer_list",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: r.data.eid,
            page: i
        },
        method: "GET",
        success: function(o) {
            if (-500 != o.data.sta) if (0 == o.data.sta) {
                var i = o.data.data, n = r.data.page;
                r.setData({
                    list: 1 == n ? i.referers : [].concat(t(r.data.list), t(i.referers)),
                    total_referer: i.total_referer,
                    total_follower: i.total_follower,
                    noMoreData: !(i.referers.length > 8),
                    page: n + 1
                });
            } else e.showFailedToast("加载失败，", o.data.msg); else e.login(function() {
                a(r);
            });
        },
        fail: function(t) {
            e.showFailedToast("加载失败");
        },
        complete: function() {
            e.hideLoading();
        }
    });
}

var e = require("../../utils/util.js"), o = getApp();

Page({
    data: {
        list: [],
        total_referer: 0,
        total_follower: 0,
        page: 1,
        noMoreData: !1
    },
    onLoad: function(t) {
        console.log("options : =====", t), this.setData({
            eid: t.eid || "",
            auth: parseInt(t.auth) || 0,
            showDev: parseInt(t.showDev) || 0
        }), a(this);
    },
    onShow: function() {},
    userDetail: function(t) {
        var a = this.data, o = a.auth, r = a.showDev;
        if (o > 0 || r) {
            var i = t.currentTarget.dataset.index, n = this.data.list[i].unionid;
            wx.navigateTo({
                url: "/subpackage/invitee/invitee?eid=" + this.data.eid + "&unionid=" + n
            });
        } else wx.showModal({
            title: "温馨提示",
            content: "你还未认证，仅认证过的用户才可以使用该功能，请知晓。",
            confirmText: "立即认证",
            confirmColor: "#12b7f5",
            success: function(t) {
                t.confirm && e.toPersonal();
            }
        });
    },
    onReachBottom: function() {
        this.data.noMoreData || a(this);
    }
});