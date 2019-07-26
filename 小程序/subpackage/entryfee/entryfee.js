function t(e) {
    o.showLoading("正在加载数据"), wx.request({
        url: getApp().globalData.host + "/enroll/v1/revenue",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: e.data.eid
        },
        method: "GET",
        success: function(s) {
            if (-500 != s.data.sta) if (0 == s.data.sta) {
                console.log(s);
                var n = s.data.data;
                e.setData({
                    income: n.income,
                    revenue: n.revenue,
                    draw_status: n.draw_status,
                    status: n.status,
                    today_count: n.today_count,
                    draw_amount: n.draw_amount,
                    refund_total: n.refund_total,
                    amount_limit: n.amount_limit,
                    end_time: n.end_time,
                    auth: n.auth
                }), a(e, n), 4 == n.draw_status && n.draw_err && o.showModelTips(n.draw_err);
            } else o.showModelTips(s.data.msg); else o.login(function() {
                t(e), e.setData({
                    hasUserInfo: !0
                });
            }, function() {
                e.setData({
                    hasUserInfo: !1
                });
            });
        },
        complete: function() {
            o.hideLoading();
        }
    });
}

function a(t, a) {
    var e = t.data.amount_limit, o = a.revenue - a.draw_amount, s = e - a.today_amount, n = a.revenue - a.draw_amount;
    o >= s && (o = s);
    var i = 0;
    if (2 != a.status) i = 0; else {
        var u = new Date().getTime() / 1e3, d = t.data, r = d.end_time, l = d.auth;
        0 == t.data.has_draw && o > 0 && (i = 1), 1 == t.data.has_draw && o > 0 && (i = 2), 
        1 != a.draw_status && 2 != a.draw_status || (i = 3), 3 == a.draw_status && 0 == o && (i = 4), 
        4 == a.draw_status && (i = 5), 0 == a.draw_status && (i = 6), u < r + 86400 && 0 == l && (i = 7), 
        a.today_amount >= a.amount_limit && (i = 8);
    }
    t.setData({
        btnStatus: i,
        restFee: o,
        totalFee: n
    });
}

function e(t) {
    o.showLoading("正在加载数据"), wx.request({
        url: s.globalData.host + "/enroll/v1/identity",
        method: "GET",
        dataType: "json",
        data: {
            access_token: o.getToken()
        },
        success: function(a) {
            if (o.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                var s = a.data.data;
                t.setData({
                    authStatus: s.status || 0
                });
            } else o.showFailedToast("数据加载失败", a.data.msg); else o.login(function() {
                e(t);
            });
        },
        fail: function(t) {
            o.showFailedToast("数据加载失败");
        }
    });
}

var o = require("../../utils/util.js"), s = getApp();

Page({
    data: {
        total: 0,
        draw_status: 0,
        needRefresh: !1,
        authInfo: {}
    },
    onLoad: function(a) {
        o.userInfo(this), a.eid && (this.setData({
            eid: a.eid,
            has_draw: a.has_draw,
            follow: a.follow,
            auth: a.auth
        }), t(this), e(this));
    },
    onShow: function(a) {
        this.data.needRefresh && t(this), o.getContactUserInfo(this);
    },
    toInputFee: function() {
        if (!this.data.buttonClicked) {
            o.buttonClicked(this);
            var t = this.data, a = t.eid, e = t.has_draw, s = t.auth, n = this;
            if (this.data.revenue > 2e5 && 2 != this.data.authInfo.auth_status) {
                var i = this.data.authStatus;
                if (0 == i) return void this.setData({
                    showDrawBox: !0
                });
                if (1 == i) return void o.showModelTips("身份证信息审核中，审核人员会在 1 个人工作日内处理，还请耐心等待。审核通过后，即可提款。");
                if (3 == i) return void wx.showModal({
                    title: "温馨提示",
                    content: "上传的身份证照片资料有问题，审核未通过。请根据审核反馈意见，修改后重新提交。",
                    showCancel: !0,
                    confirmText: "重新提交",
                    confirmColor: "#12b7f5",
                    success: function(t) {
                        console.log(t), 1 == t.confirm && n.toAuthPage();
                    }
                });
                if (2 == i) return void wx.navigateTo({
                    url: "/subpackage/inputfee/inputfee?eid=" + a + "&has_draw=" + e + "&auth=" + s
                });
            }
            this.setData({
                needRefresh: !0
            }), wx.navigateTo({
                url: "/subpackage/inputfee/inputfee?eid=" + a + "&has_draw=" + e + "&auth=" + s
            });
        }
    },
    contactCallback: function(t) {
        o.contactCallback(t), this.closeFollowDialog();
    },
    toRefundList: function() {
        wx.navigateTo({
            url: "/subpackage/refundlist/refundlist?eid=" + this.data.eid
        });
    },
    toFollow: function() {
        this.setData({
            needRefresh: !0,
            showFollowDialog: !0
        });
    },
    closeFollowDialog: function() {
        this.setData({
            showFollowDialog: !1
        });
    },
    toAuth: function() {
        o.toPersonal();
    },
    toAuthPage: function() {
        this.setData({
            showDrawBox: !1
        }), wx.navigateTo({
            url: "/subpackage/personalauth/personalauth"
        });
    },
    closeDrawBox: function() {
        this.setData({
            showDrawBox: !1
        });
    }
});