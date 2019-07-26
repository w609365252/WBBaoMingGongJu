function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

function a(r) {
    var n = r.data.page, o = r.data.count;
    wx.request({
        url: getApp().globalData.host + "/enroll/v1/record/pay",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            page: n,
            count: o,
            type: r.data.type
        },
        method: "GET",
        success: function(o) {
            if (-500 != o.data.sta) {
                if (0 == o.data.sta) {
                    for (var s = o.data.data, c = 0; c < s.length; c++) s[c].time = s[c].time ? s[c].time : 0, 
                    s[c].time = e.formatDate(1e3 * s[c].time, "yyyy-MM-dd HH:mm");
                    r.setData({
                        records: 1 == n ? s : [].concat(t(r.data.records), t(s)),
                        page: n + 1,
                        moreData: 20 == s.length
                    });
                }
            } else e.login(function() {
                a(r), r.setData({
                    hasUserInfo: !0
                });
            }, function() {
                r.setData({
                    hasUserInfo: !1
                });
            });
        }
    });
}

var e = require("../../utils/util.js");

getApp();

Page({
    data: {
        currentTab: 0,
        records: [],
        page: 1,
        count: 20,
        type: 0
    },
    onLoad: function(t) {
        a(this);
    },
    onShow: function() {},
    onReachBottom: function() {
        this.data.moreData && a(this);
    },
    tabChange: function(t) {
        var e = parseInt(t.currentTarget.dataset.id);
        this.setData({
            currentTab: e,
            type: e,
            page: 1,
            moreData: !0
        }), a(this);
    }
});