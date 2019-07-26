function t(t, a) {
    var e = this.data.noticeBoard;
    e.showUpgradeDialog = 0, this.setData({
        noticeBoard: e
    });
}

function a(t) {
    v.buttonClicked(this);
    for (var a = this.data.enrollList, e = 0; e < a.length; e++) a[e].right = 0, a[e].isDelShow = !1;
    this.setData({
        toDetail: !0,
        enrollList: a
    });
    var s = t.currentTarget.dataset, i = s.id;
    s.index;
    6 == s.temp ? wx.navigateTo({
        url: "/groupbuy/pages/groupbuy/detail?eid=" + i
    }) : wx.navigateTo({
        url: "/pages/detail/detail?eid=" + i
    });
}

function e(t) {
    if (!this.data.toDetail) {
        var a = t.currentTarget.dataset.index, e = t.currentTarget.dataset.status, s = t.currentTarget.dataset.eid, i = t.currentTarget.dataset.hasbalance;
        this.setData({
            longtap: !0,
            index: a,
            eid: s
        });
        var n = this, d = [ "设为正常", "设为违规", "设为争议报名", "删除", "冻结提款", "解冻提款" ];
        wx.showActionSheet({
            itemList: d,
            success: function(t) {
                if (0 == t.tapIndex) l(n, a, 2 == e ? 8 : 9); else if (1 == t.tapIndex) l(n, a, 2); else if (2 == t.tapIndex) l(n, a, 3); else if (3 == t.tapIndex) {
                    if (1 == i) return void v.showModelTips("此报名费用未提取完成，不允许删除");
                    o(n);
                } else 4 == t.tapIndex ? c(n, 1, a) : 5 == t.tapIndex && c(n, 0, a);
                n.setData({
                    longtap: !1
                });
            },
            fail: function(t) {
                n.setData({
                    longtap: !1
                });
            }
        });
    }
}

function s(t) {
    if (!this.data.toDetail) {
        var a = t.currentTarget.dataset, e = a.index, s = a.type, l = a.status, c = a.cid, r = a.fee, u = a.count, h = a.drawstatus, f = a.hasbalance;
        this.setData({
            longtap: !0,
            index: e
        });
        var g = this;
        if (0 == s || 1 == s || 6 == s) {
            if (1 == s && 2 == l) return void v.showModelTips("已经结束的报名，不能退出");
            var w = [], p = g.data.enrollList[e].is_public;
            0 != s && 6 != s || (w = [  "复制报名" ], p && (w = [ "复制报名" ]));
            var T = g.data.enrollList[e].is_owner;
            wx.showActionSheet({
                itemList: w,
                success: function(t) {
                    if (1 == t.tapIndex) 0 == T ? v.showModelTips("非发起者无权进行此操作！") : g.data.authInfo && 2 == g.data.authInfo.auth_status || g.data.info && g.data.info.auth_status ? wx.showModal({
                        title: "确认设置",
                        content: p ? "确认要取消此公开活动吗？" : "设置为公开后，会显示在认证后的发起者主页，确认要设置此报名活动为公开吗？",
                        success: function(t) {
                            t.confirm && i(g);
                        }
                    }) : v.showModelTips("认证后才有此权限，请先去个人中心认证"); else if (0 == t.tapIndex) if (0 == s || 6 == s) {
                        if (6 == s && 0 == g.data.info.is_owner) return void v.showModelTips("你没有权限复制此报名活动！");
                        var a = g.data.index, e = g.data.enrollList, d = e[a].eid;
                        5 == e[a].temp ? wx.navigateTo({
                            url: "/pages/createbuy/createbuy?eid=" + d
                        }) : wx.navigateTo({
                            url: "/pages/create/create?eid=" + d
                        });
                    } else r ? 3 == h ? n(g) : v.showModelTips("付费报名，暂时无法退出") : n(g); else if (2 == t.tapIndex) {
                        if (c) return void v.showModelTips("此报名关联了小小签到，请到小小签到中去退出对应的签到");
                        if (r) if (3 == h || 0 == u && 2 == l) {
                            if (1 == f) return void v.showModelTips("此报名费用未提取完成，不允许删除");
                            wx.showModal({
                                title: "提示",
                                content: "确认要删除此报名吗？",
                                success: function(t) {
                                    t.confirm && o(g);
                                }
                            });
                        } else v.showModelTips("付费报名，需要报名结束且提款之后才能删除。"); else {
                            if (1 == f) return void v.showModelTips("此报名的收款未完成提取，不允许删除。");
                            wx.showModal({
                                title: "提示",
                                content: "确认要删除此报名吗？",
                                success: function(t) {
                                    t.confirm && o(g);
                                }
                            });
                        }
                    }
                    g.setData({
                        longtap: !1
                    });
                },
                fail: function(t) {
                    g.setData({
                        longtap: !1
                    });
                }
            });
        } else wx.showActionSheet({
            itemList: [ "取消收藏" ],
            success: function(t) {
                0 == t.tapIndex && d(g), g.setData({
                    longtap: !1
                });
            },
            fail: function(t) {
                g.setData({
                    longtap: !1
                });
            }
        });
    }
}

function i(t) {
    v.showLoading("正在设置");
    var a = t.data.index, e = t.data.enrollList, s = e[a].eid, o = e[a].is_public ? 0 : 1;
    wx.request({
        url: L.globalData.host + "/enroll/v1/public",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: s,
            type: o
        },
        method: "POST",
        success: function(s) {
            v.hideLoading(), -500 != s.data.sta ? 0 == s.data.sta ? (v.showToast("设置成功"), e[a].is_public = !e[a].is_public, 
            t.setData({
                enrollList: e
            }), "function" == typeof t.getEnrollList && t.getEnrollList()) : v.showFailedToast("设置失败，", s.data.msg) : v.login(function() {
                i(t);
            });
        },
        fail: function(t) {
            v.hideLoading(), v.showFailedToast("设置失败");
        }
    });
}

function o(t) {
    v.showLoading("正在删除");
    var a = t.data.index, e = t.data.enrollList, s = e[a].eid;
    wx.request({
        url: L.globalData.host + "/enroll/v1/remove",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: s
        },
        method: "POST",
        success: function(s) {
            v.hideLoading(), -500 != s.data.sta ? 0 == s.data.sta ? (v.showToast("删除成功"), e.splice(a, 1), 
            t.setData({
                enrollList: e
            })) : v.showFailedToast("删除失败，", s.data.msg) : v.login(function() {
                o(t);
            });
        },
        fail: function(t) {
            v.hideLoading(), v.showFailedToast("删除失败");
        }
    });
}

function n(t) {
    v.showLoading("正在取消报名");
    var a = t.data.index, e = t.data.enrollList, s = e[a].eid;
    wx.request({
        url: L.globalData.host + "/enroll/v3/exit",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: s
        },
        method: "POST",
        success: function(s) {
            if (v.hideLoading(), -500 != s.data.sta) if (0 == s.data.sta) v.showToast("取消成功"), 
            e.splice(a, 1), t.setData({
                enrollList: e
            }); else {
                if (-1 == s.data.sta && 300 == s.data.errcode) return void v.showModelTips(s.data.msg);
                v.showFailedToast("取消失败", s.data.msg);
            } else v.login(function() {
                n(t);
            });
        },
        fail: function(t) {
            v.hideLoading(), v.showFailedToast("取消失败");
        }
    });
}

function d(t) {
    v.showLoading("正在取消收藏");
    var a = t.data.index, e = t.data.enrollList, s = e[a].eid;
    wx.request({
        url: L.globalData.host + "/enroll/v1/fav",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: s,
            fav: 0
        },
        method: "POST",
        success: function(s) {
            -500 != s.data.sta ? 0 == s.data.sta ? (v.showToast("已取消收藏"), e.splice(a, 1), t.setData({
                enrollList: e
            })) : v.showFailedToast("取消收藏失败", s.data.msg) : v.login(function() {
                d(t);
            });
        },
        fail: function(t) {
            v.showFailedToast("网络请求超时");
        }
    });
}

function l(t, a, e) {
    v.showLoading("加载中"), wx.request({
        url: L.globalData.host + "/enroll/v1/censor",
        data: {
            eid: t.data.eid,
            censor_status: e,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(s) {
            if (v.hideLoading(), -500 != s.data.sta) if (0 == s.data.sta) {
                v.showToast("操作成功");
                var i = t.data.enrollList;
                i[a].censor_status = e, t.setData({
                    enrollList: i
                });
            } else v.showFailedToast("加载失败，请重试。", s.data.msg); else v.login(function() {
                l(t, a, e);
            });
        },
        fail: function(t) {
            v.hideLoading(), null == oldNotices && v.hideLoading(), v.showFailedToast("网络请求超时");
        }
    });
}

function c(t, a, e) {
    v.showLoading("加载中"), wx.request({
        url: L.globalData.host + "/enroll/v1/freeze",
        data: {
            eid: t.data.eid,
            freeze: a,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(s) {
            if (v.hideLoading(), -500 != s.data.sta) if (0 == s.data.sta) {
                v.showToast("操作成功");
                var i = t.data.enrollList;
                i[e].freeze = a, t.setData({
                    enrollList: i
                });
            } else v.showFailedToast("加载失败，请重试。", s.data.msg); else v.login(function() {
                c(t, a, e);
            });
        },
        fail: function(t) {
            v.hideLoading(), null == oldNotices && v.hideLoading(), v.showFailedToast("网络请求超时");
        }
    });
}

function r() {
    this.setData({
        huomaDialog: !1
    });
}

function u() {
    var t = this.data.huoma;
    wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
        appId: t.appid
    }) : wx.previewImage({
        urls: [ t.qrcode ]
    }), this.closeHuomaDialog();
}

function h(t) {
    var a = this;
    v.showLoading("正在登录..."), v.buttonLogin(function() {
        v.hideLoading(), a.setData({
            hasUserInfo: !0
        }), "function" == typeof a.successCb && a.successCb();
    }, function() {
        v.hideLoading();
    }, t.detail);
}

function f(t) {
    var a = t.currentTarget.dataset.index, e = this.data.adsList[a], s = this.data.adFrom;
    v.toAdDetail(e, s);
}

function g(t) {
    v.buttonClicked(this);
    var a = t.currentTarget.dataset.index, e = this.data.adsList[a].banner;
    wx.previewImage({
        urls: [ e ]
    });
}

function w(t) {
    var a = t.currentTarget.dataset.index, e = this.data.recommend[a], s = this.data.adFrom;
    console.log(e), v.toAdDetail(e, s, "success");
}

function p(t) {
    var a = t.detail.current, e = this.data.adsList[a], s = this.data.adFrom;
    v.adShow(e, s);
}

function T() {
    this.setData({
        fieldTypeDialog: !1
    });
}

function x(t) {
    v.buttonClicked(this);
    var a = t.currentTarget.dataset.type;
    this.data.chageType ? (this.closeUiFieldType(), this.setData({
        fieldTypeIndex: a
    })) : (this.setData({
        tabsEdit: !1
    }), this.closeUiFieldType(), wx.navigateTo({
        url: "/pages/customfield/customfield?type=" + a
    }));
}

var v = require("../utils/util.js"), L = getApp();

module.exports = {
    noticeBoard: function(a, e) {
        a.successCb = e, a.closeUpgradeDialog = t;
    },
    enRoll: function(t, i) {
        t.successCb = i, t.toDetail = a, t.longtap = s, t.collect = d, t.setStatus = e;
    },
    huoma: function(t, a) {
        t.successCb = a, t.closeHuomaDialog = r, t.toHuoma = u;
    },
    wxLogin: function(t, a) {
        t.successCb = a, t.login = h;
    },
    ads: function(t, a, e, s, i) {
        t.successCb = s, t.setData({
            adFrom: e
        }), t.toAdDetail = f, t.showAdPic = g, t.toRecommendDetail = w, t.swiperChange = p, 
        v.getAds(t, a, e, function() {
            "function" == typeof s && s();
        }, i);
    },
    fieldType: function(t, a) {
        t.successCb = a, t.closeUiFieldType = T, t.toCustom = x;
    }
};