function e(s) {
    a.showLoading("正在加载数据"), wx.request({
      url: i.globalData.host + "/SignUpForm/my_enroll",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: s.data.eid
        },
        method: "GET",
        success: function(i) {
            if (a.hideLoading(), -500 != i.data.sta) if (0 == i.data.sta) {
                for (var o = i.data.data, d = [], n = 0, l = 0; l < o.length; l++) o[l].name = o[l].name ? o[l].name : "用户" + t(l), 
                o[l].on_behalf ? d.push(o[l]) : n = 1;
                if (0 == o.length) return void wx.navigateBack({
                    delta: 1
                });
                s.setData({
                    userList: o,
                    behalf: d,
                    selfInfoId: n
                });
            } else a.showFailedToast("获取数据失败", i.data.msg); else a.login(function() {
                e(s);
            });
        },
        fail: function(e) {
            a.hideLoading(), a.showFailedToast("获取数据失败");
        }
    });
}

function t(e) {
    return e < 10 ? "一二三四五六七八九十" : e + 1;
}

var a = require("../../utils/util.js"), i = getApp();

Page({
    data: {
        eid: ""
    },
    onLoad: function(t) {
        this.setData({
            eid: t.eid || "",
            fee: t.fee || 0,
            limit: t.limit || 1,
            verify: t.verify || 0,
            can_quit: t.can_quit
        }), e(this);
        var i = a.getStorage("enroll_goods");
        a.removeStorage("enroll_goods"), this.setData({
            goods: i
        });
    },
    onShow: function() {
        this.data.needRefresh && (e(this), this.setData({
            needRefresh: !0
        }));
    },
    toEnroll: function(e) {
        a.buttonClicked(this);
        var t = e.currentTarget.dataset.index, i = e.currentTarget.dataset.type;
        this.setData({
            needRefresh: !0
        });
        for (var s = this.data.goods, o = 0; o < s.length; o++) s[o].consume = 0;
        if ("create" == i) {
            if (this.data.userList.length > this.data.limit) return void a.showModelTips("报名发起者规定每个人最多只能代报名" + this.data.limit + "人");
            a.setStorage("enroll_goods", s), wx.navigateTo({
                url: "/pages/enroll/enroll?eid=" + this.data.eid + "&fee=" + this.data.fee + "&limit=" + this.data.limit + "&self_info_id=" + this.data.selfInfoId
            });
        } else {
            a.setStorage("enroll_goods", s);
            var d = this.data.userList, n = d[t].on_behalf, l = d[t].info_id, r = d[t].verified, f = this.data.verify;
            0 == r || 2 == r || 0 == f ? wx.navigateTo({
                url: "/pages/enroll/enroll?type=detail&eid=" + this.data.eid + "&fee=" + this.data.fee + "&on_behalf=" + n + "&info_id=" + l + "&limit=" + this.data.limit + "&verify=" + this.data.verify + "&verified=" + r
            }) : wx.navigateTo({
                url: "/pages/selfdetail/selfdetail?eid=" + this.data.eid + "&info_id=" + l + "&is_owner=1&fee=" + this.data.fee + "&status=1&verify=" + this.data.verify + "&verified=" + r + "&can_quit=" + this.data.can_quit
            });
        }
    }
});