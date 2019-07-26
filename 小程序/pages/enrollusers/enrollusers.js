function t(s) {
    a.showLoading("正在加载数据"), wx.request({
        url: i.globalData.host + "/enroll/v1/my_enroll",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: s.data.eid
        },
        method: "GET",
        success: function(i) {
            if (a.hideLoading(), -500 != i.data.sta) if (0 == i.data.sta) {
                for (var n = i.data.data, d = [], o = 0; o < n.length; o++) n[o].name = n[o].name ? n[o].name : "用户" + e(o), 
                n[o].on_behalf && d.push(n[o]);
                if (0 == n.length) return void wx.navigateBack({
                    delta: 1
                });
                s.setData({
                    userList: n,
                    behalf: d
                });
            } else a.showFailedToast("获取数据失败", i.data.msg); else a.login(function() {
                t(s);
            });
        },
        fail: function(t) {
            a.hideLoading(), a.showFailedToast("获取数据失败");
        }
    });
}

function e(t) {
    return t < 10 ? "一二三四五六七八九十" : t + 1;
}

var a = require("../../utils/util.js"), i = getApp();

Page({
    data: {
        eid: ""
    },
    onLoad: function(e) {
        this.setData({
            eid: e.eid || "",
            fee: e.fee || 0,
            verify: e.verify || 0,
            status: e.status || 2,
            can_quit: e.can_quit
        }), t(this);
    },
    onShow: function() {
        this.data.needRefresh && (t(this), this.setData({
            needRefresh: !0
        }));
    },
    toEnroll: function(t) {
        a.buttonClicked(this);
        var e = t.currentTarget.dataset.index;
        t.currentTarget.dataset.type;
        this.setData({
            needRefresh: !0
        });
        var i = this.data.userList, s = (i[e].on_behalf, i[e].info_id), n = i[e].verified;
        wx.navigateTo({
            url: "/pages/selfdetail/selfdetail?eid=" + this.data.eid + "&info_id=" + s + "&is_owner=1&fee=" + this.data.fee + "&verify=" + this.data.verify + "&verified=" + n + "&status=" + this.data.status + "&can_quit=" + this.data.can_quit
        });
    }
});