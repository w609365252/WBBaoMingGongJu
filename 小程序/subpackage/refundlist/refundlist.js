function a(s) {
    t.showLoading("正在加载数据");
    var o = s.data.page, i = {
        eid: s.data.eid,
        access_token: t.getToken(),
        count: 20,
        page: o,
        type: 1
    };
    wx.request({
        url: e.globalData.host + "/enroll/v1/user_list",
        data: i,
        method: "GET",
        dataType: "json",
        success: function(e) {
            if (t.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                for (var i = e.data.data, n = 0; n < i.items.length; n++) {
                    var d = i.items[n];
                    d.date && (d.date_str = t.formatDate(1e3 * d.date, "yyyy-MM-dd HH:mm"));
                }
                var r = s.data.userList, u = i.items.length, l = {
                    userList: r = 1 == o ? i.items : r.concat(i.items),
                    noMoreData: !(u > 0),
                    page: o + 1
                };
                s.setData(l);
            } else t.showFailedToast("数据加载失败", e.data.msg); else t.login(function() {
                a(s), s.setData({
                    hasUserInfo: !0
                });
            }, function() {
                s.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(a) {
            t.hideLoading(), t.showFailedToast("数据加载失败");
        }
    });
}

var t = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        userList: null,
        page: 1,
        noMoreData: !1
    },
    onLoad: function(t) {
        this.setData({
            eid: t.eid
        }), a(this);
    },
    onShow: function() {},
    onReachBottom: function() {
        this.data.noMoreData || a(this);
    }
});