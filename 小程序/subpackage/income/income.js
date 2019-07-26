function t(e) {
    var o = e.data.page, n = e.data.count;
    wx.request({
        url: getApp().globalData.host + "/enroll/v1/record/income",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            page: o,
            count: n
        },
        method: "GET",
        success: function(n) {
            if (-500 != n.data.sta) {
                if (0 == n.data.sta) {
                    for (var s = n.data.data, c = 0; c < s.length; c++) s[c].time = s[c].time ? s[c].time : 0, 
                    s[c].time = a.formatDate(1e3 * s[c].time, "yyyy-MM-dd HH:mm");
                    e.setData({
                        records: s,
                        page: 20 == s.length ? o + 1 : o,
                        moreData: 20 == s.length
                    });
                }
            } else a.login(function() {
                t(e), e.setData({
                    hasUserInfo: !0
                });
            }, function() {
                e.setData({
                    hasUserInfo: !1
                });
            });
        }
    });
}

var a = require("../../utils/util.js");

getApp();

Page({
    data: {
        records: [],
        page: 1,
        count: 20
    },
    onLoad: function(a) {
        t(this);
    },
    onShow: function() {},
    onReachBottom: function() {
        this.data.moreData && t(this);
    }
});