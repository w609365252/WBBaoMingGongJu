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
                console.log("============="), console.log(s);
                var n = s.data.data;
                e.setData({
                    income: n.income,
                    revenue: n.revenue,
                    draw_status: n.draw_status,
                    status: n.status,
                    today_count: n.today_count,
                    amount_limit: n.amount_limit,
                    draw_amount: n.draw_amount,
                    today_amount: n.today_amount
                }), a(e, n);
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
    o >= s && (o = s), s < 0 && (o = 0);
    var i = 0;
    2 != a.status ? i = 0 : (0 == t.data.has_draw && o > 0 && (i = 1), 1 == t.data.has_draw && o > 0 && (i = 2), 
    1 != a.draw_status && 2 != a.draw_status || (i = 3), 3 == a.draw_status && 0 == o && (i = 4), 
    4 == a.draw_status && (i = 5)), t.setData({
        btnStatus: i,
        restFee: o,
        totalFee: n
    });
}

function e(t) {
    o.showLoading("正在加载数据");
    var a = 100 * t.data.fee;
    a = Math.round(a), wx.request({
        url: getApp().globalData.host + "/enroll/v2/draw",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: t.data.eid,
            amount: a
        },
        method: "POST",
        success: function(a) {
            -500 != a.data.sta ? 0 == a.data.sta ? (o.showToast("申请已提交"), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 2e3)) : o.showModelTips(a.data.msg) : o.login(function() {
                e(t), t.setData({
                    hasUserInfo: !0
                });
            }, function() {
                t.setData({
                    hasUserInfo: !1
                });
            });
        },
        complete: function() {
            o.hideLoading();
        }
    });
}

var o = require("../../utils/util.js");

getApp();

Page({
    data: {
        total: 0,
        draw_status: 0,
        fee: 0
    },
    onLoad: function(a) {
        console.log(a), a.eid && (this.setData({
            eid: a.eid,
            has_draw: a.has_draw,
            auth: a.auth
        }), t(this));
    },
    onShow: function(t) {
        o.getContactUserInfo(this);
    },
    draw: function() {
        if (!this.data.buttonClicked) if (o.buttonClicked(this), this.data.fee <= 0) o.showModelTips("请输入正确的提款金额"); else if (this.data.fee < .3) o.showModelTips("最小提款额度为0.3元"); else {
            var t = 100 * this.data.fee, a = this.data.restFee;
            if (console.log("feeCents : " + t), console.log("restFee : " + a), 1 == o.comparativeNumber(t, a)) return 5e3 == this.data.amount_limit ? void wx.showModal({
                title: "温馨提示",
                content: "未认证用户单日提款额度为 5000 元，认证用户是 20000 元，你已达 5000 元上限，如需更多额度，请先去认证。",
                confirmText: "去认证",
                confirmColor: "#12b7f5",
                success: function(t) {
                    t.confirm && o.toPersonal();
                }
            }) : void o.showModelTips("提款额度不能大于剩余额度");
            this.data.today_count >= 20 ? o.showModelTips("您今天的提款次数已经使用完，请明天再来提款") : e(this);
        }
    },
    inputFee: function(t) {
        var a = parseFloat(t.detail.value) || 0;
        this.setData({
            fee: a
        });
    },
    inputAll: function() {
        var t = this.data.restFee / 100;
        this.setData({
            feeDefault: t,
            fee: t
        });
    },
    contactCallback: function(t) {
        o.contactCallback(t);
    },
    showDialogTips: function() {
        wx.showModal({
            title: "温馨提示",
            content: "未认证用户单日提款额度为 5000 元，认证用户是 20000 元，你已达 5000 元上限，如需更多额度，请先去认证",
            confirmText: "去认证",
            confirmColor: "#12b7f5",
            success: function(t) {
                t.confirm && o.toPersonal();
            }
        });
    },
    maxAmountTips: function() {
        o.showModelTips("微信规定单人单日最高可提取 2万，你今日的提款额度已达 2万上限，请明日再来继续提款。");
    },
    toAuth: function() {
        o.toPersonal();
    }
});