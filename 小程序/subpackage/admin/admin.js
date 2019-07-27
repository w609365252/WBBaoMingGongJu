function a(t) {
    i.showLoading("加载中"), wx.request({
      url: e.globalData.host + "/SignUpForm/AdminList",
        data: {
            eid: t.data.eid,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(e) {
            if (i.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                var d = e.data.data;
                if (d) {
                    for (var n = 0; n < d.length; n++) d[n].date > 0 && (d[n].date = i.formatDate(1e3 * d[n].date, "yyyy-MM-dd HH:mm"));
                    t.setData({
                        admin: d
                    });
                } else i.showModelTips(e.data.msg);
            } else i.showModelTips(e.data.msg); else i.login(function() {
                a(t);
            });
        },
        fail: function(a) {
            i.hideLoading(), i.showModelTips("网络加载超时，请重试");
        }
    });
}

function t(d, n) {
    i.showLoading("正在删除");
    var o = (d.data.admin[n] || {}).unionid;
    wx.request({
      url: e.globalData.host + "/SignUpForm/RemoveAdmin",
        data: {
            unionid: o,
            access_token: wx.getStorageSync("accessToken"),
            eid: d.data.eid
        },
        method: "POST",
        success: function(e) {
            i.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta ? (i.showModelTips("删除成功"), 
            a(d)) : i.showModelTips(e.data.msg) : i.login(function() {
                t(d, n);
            });
        },
        fail: function(a) {
            i.hideLoading(), i.showModelTips("网络加载超时，请重试");
        }
    });
}

var e = getApp(), i = require("../../utils/util.js");

Page({
    data: {
        admin: []
    },
    onLoad: function(t) {
        this.setData({
            eid: t.eid
        }), a(this);
    },
    onShow: function() {},
    deleteAdmin: function(a) {
        var e = a.currentTarget.dataset.index, i = (this.data.admin[e], this);
        wx.showModal({
            title: "删除确认",
            content: "确认要删除此管理员吗？",
            success: function(a) {
                a.confirm && t(i, e);
            }
        });
    },
    addAdmin: function() {
        this.data.admin.length >= 20 ? i.showModelTips("最多允许添加20位管理员") : wx.navigateTo({
            url: "/subpackage/addadmin/addadmin?eid=" + this.data.eid
        });
    }
});