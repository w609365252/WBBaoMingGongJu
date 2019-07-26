function t(e, o) {
    a.showLoading("正在加载数据"), wx.request({
        url: i.globalData.host + "/enroll/v1/userinfo",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(i) {
            if (-500 != i.data.sta) {
                if (0 == i.data.sta) {
                    var n = i.data.data;
                    if (n) {
                        var s = n.unionid, c = (wx.getStorageSync("userInfo"), a.formatDate(1e3 * n.expire || 0, "yyyy-MM-dd"));
                        e.setData({
                            unionid: s,
                            status: n.auth_status,
                            type: n.auth_type,
                            reason: n.reason,
                            expire: c,
                            auth_type: n.auth_type,
                            code_status: n.code_status
                        }), o && wx.setClipboardData({
                            data: s,
                            success: function(t) {
                                a.showModelTips("unionid复制成功:" + s);
                            }
                        });
                    }
                }
            } else a.login(function() {
                t(e);
            });
        },
        complete: function() {
            a.hideLoading();
        }
    });
}

function e(t) {
    a.showLoading("正在提交数据"), wx.request({
        url: i.globalData.host + "/enroll/v1/auth/code",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            code: t.data.code
        },
        method: "POST",
        success: function(i) {
            if (-500 != i.data.sta) if (0 == i.data.sta) {
                i.data.data;
                a.showModelTips("验证成功"), t.setData({
                    code_status: 1
                });
            } else a.showModelTips(i.data.msg); else a.login(function() {
                e(t);
            });
        },
        complete: function() {
            a.hideLoading();
        }
    });
}

var i = getApp(), a = require("../../utils/util.js");

Page({
    data: {
        list: [ {
            icon: "/images/ic_benifit.png",
            title: "报名人数无上限",
            desc: "未认证活动，最高只支持800人，认证后，报名活动人数无上限。"
        }, {
            icon: "/images/ic_benifit.png",
            title: "更高的提现额度",
            desc: "未认证活动，单日最高提现额度 5000元，认证后，单日最高提现额度 2万元。"
        }, {
            icon: "/images/ic_benifit.png",
            title: "专属大展示位和认证主页",
            desc: "活动页面提供认证后的专属展示位，展示信息更丰富，同时拥有独立的个人主页，（非个人认证）可以修改发起人头像、名称和背景。"
        }, {
            icon: "/images/ic_benifit.png",
            title: "个性化的活动二维码",
            desc: "认证后，活动二维码中间logo显示发起者的头像，未认证，系统默认logo。"
        }, {
            icon: "/images/ic_benifit.png",
            title: "支持查看分享数据统计",
            desc: "认证后，发起者可以查看有多少用户分享了活动，通过分享邀请到多少用户参与报名。"
        }, {
            icon: "/images/ic_benifit.png",
            title: "数据长期保存",
            desc: "无需担心数据丢失问题，历史数据我们也会长期保存在云端供您随时免费下载使用。"
        }, {
            icon: "/images/ic_benifit.png",
            title: "报名满额后排队",
            desc: "认证后的发起者享有排队功能，当名额达到上限后，可以让参与者排队等候。"
        }, {
            icon: "/images/ic_benifit.png",
            title: "活动上新通知粉丝 (待更新)",
            desc: "认证后的发起者，可以让粉丝关注，有新活动时，会发系统通知，告知粉丝查看参与。"
        }, {
            icon: "/images/ic_benifit.png",
            title: "活动讨论问答区 (待更新)",
            desc: "认证后的发起者享有“问答讨论”功能，在线答疑解惑，提高用户报名参与积极性。"
        } ],
        statement: [ "认证费用：199元/年，认证有效期 1年。每年到期时，需要重新提交认证资料，审核通过后，有效期自动延长一年。如过期，原认证权益全部失效。", "认证有效期 1年。每年到期时，需要重新提交认证资料，审核通过后，有效期自动延长一年。如过期，原认证权益全部失效。" ]
    },
    onLoad: function(t) {},
    onShow: function() {
        var e = wx.getSystemInfoSync();
        this.setData({
            platform: e.platform
        }), t(this);
    },
    postFormId: function(t) {
        a.postFormId(t.detail.formId);
    },
    contactCallback: function(t) {
        a.contactCallback(t);
    },
    toAuthType: function() {
        wx.navigateTo({
            url: "/subpackage/authtype/authtype"
        });
    },
    toAuthDetail: function() {
        wx.navigateTo({
            url: "/subpackage/authdetail/authdetail?unionid=" + this.data.unionid
        });
    },
    toDemo: function() {
        wx.navigateTo({
            url: "/pages/webview/webview?url=https://mp.weixin.qq.com/s/i54Ti940p-FC49L9fqe5Hg"
        });
    },
    inputCode: function(t) {
        this.setData({
            code: t.detail.value
        });
    },
    submitCode: function(t) {
        this.data.code ? e(this) : a.showModelTips("请输入审核验证码");
    },
    authTips: function() {
        a.showModelTips("由于相关规定，iOS功能暂不可用");
    }
});