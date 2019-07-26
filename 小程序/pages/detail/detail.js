function a(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

function e(a, e) {
    var t = wx.getSystemInfoSync().SDKVersion;
    p.compareVersion(t, "2.0.7") > -1 ? a.setData({
        openSettingDialog: !0
    }) : wx.openSetting ? wx.showModal({
        title: "提示",
        content: "请授权报名工具访问相册，该操作仅会方便您保存图片到相册，请放心授权。",
        cancelText: "不想授权",
        confirmText: "去授权",
        confirmColor: "#12b7f5",
        success: function(t) {
            t.confirm ? e && wx.openSetting({
                complete: function(t) {
                    h(a, e);
                }
            }) : t.cancel && p.showModelTips("如果您不愿授权，也可以截图保存到系统相册。");
        }
    }) : p.showModelTips("如果您不愿授权，也可以截图保存到系统相册。");
}

function t(a) {
    p.showLoading("正在退出");
    var e = a.data.enroll.unionid;
    wx.request({
        url: v.globalData.host + "/enroll/v1/admin/remove",
        data: {
            unionid: e,
            access_token: wx.getStorageSync("accessToken"),
            eid: a.data.eid
        },
        method: "POST",
        success: function(e) {
            if (p.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                p.showModelTips("退出成功");
                var i = a.data.enroll;
                i.is_admin = 0, a.setData({
                    enroll: i
                });
            } else p.showModelTips(e.data.msg); else p.login(function() {
                t(a);
            });
        },
        fail: function(a) {
            p.hideLoading(), p.showModelTips("网络加载超时，请重试");
        }
    });
}

function i(a) {
    p.showLoading("正在删除");
    var e = a.data.eid;
    wx.request({
      url: v.globalData.host + "/SignUpForm/RemoveActives",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            final_word: a.data.finalWord,
            eid: e
        },
        method: "POST",
        success: function(e) {
            p.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta ? (p.showToast("删除成功"), a.toIndex()) : p.showFailedToast("删除失败，", e.data.msg) : p.login(function() {
                i(a);
            });
        },
        fail: function(a) {
            p.hideLoading(), p.showFailedToast("删除失败");
        }
    });
}

function o(a) {
    null == a.data.enroll && (p.showLoading("正在加载数据"), a.setData({
        showLoadError: 0
    }));
    var e = {
        eid: a.data.inviteEid ? a.data.inviteEid : a.data.eid,
        access_token: p.getToken(),
        admin: a.data.admin,
        from: "detail",
        referer: a.data.referer || ""
    }, t = !1;
    if (a.data.ts) {
        var i = parseInt(a.data.ts, 16);
        i > new Date().getTime() / 1e3 - 600 ? e.ts = i : (t = !0, p.showModelTips("设置管理员失败，二维码已过期"));
    }
    wx.request({
      url: v.globalData.host + "/SignUpForm/Detail",
        data: e,
        method: "GET",
        dataType: "json",
        success: function(e) {
            if (p.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                var i = e.data.data;
                if (6 == i.temp) {
                    var l = "/groupbuy/pages/groupbuy/detail?eid=" + a.data.eid;
                    return a.data.eid || (l = "/groupbuy/pages/groupbuy/detail?scene=" + a.data.inviteEid), 
                    void wx.redirectTo({
                        url: l
                    });
                }
                if (v.globalData.info_id) {
                    var d = a.data.eid, r = v.globalData.info_id, h = i.fee, c = i.status, u = i.verify;
                    wx.navigateTo({
                        url: "/pages/userdetail/userdetail?eid=" + d + "&info_id=" + r + "&is_owner=1&fee=" + h + "&status=" + c + "&verify=" + u + "&verified=1",
                        success: function() {
                            v.globalData.info_id = "";
                        }
                    });
                }
                var f = new Date().getFullYear(), g = new Date(1e3 * i.start_time).getFullYear(), w = new Date(1e3 * i.end_time).getFullYear();
                i.startTime = f == g ? p.formatDate(1e3 * i.start_time, "MM/dd HH:mm") : p.formatDate(1e3 * i.start_time, "yyyy/MM/dd HH:mm"), 
                i.end_time >= 4667731200 ? i.endTime = "永久" : i.endTime = f == w ? p.formatDate(1e3 * i.end_time, "MM/dd HH:mm") : p.formatDate(1e3 * i.end_time, "yyyy/MM/dd HH:mm");
                var D = new Date(1e3 * i.act_start).getFullYear(), _ = new Date(1e3 * i.act_end).getFullYear();
                i.actStartTime = f == D ? p.formatDate(1e3 * i.act_start, "MM/dd HH:mm") : p.formatDate(1e3 * i.act_start, "yyyy/MM/dd HH:mm"), 
                i.actEndTime = f == _ ? p.formatDate(1e3 * i.act_end, "MM/dd HH:mm") : p.formatDate(1e3 * i.act_end, "yyyy/MM/dd HH:mm");
                for (var T = i.req_info, x = T.length, y = 0; y < x; y++) T[y].field_key = T[y].field_key ? T[y].field_key : y + 1;
                i.pics && i.pics.length;
                (a.data.admin || a.data.ts && !t) && !a.data.adminDialogTips && (a.setData({
                    adminDialogTips: !0
                }), i.is_admin ? p.showModelTips("你已经成为该报名活动管理员") : p.showModelTips("设置失败，请和活动发起者联系，重新设置")), 
                i.sign_name_copy = i.sign_name, 1 == i.auth && 1 == i.role && (i.sign_name = i.sign_name[0] + "**"), 
                a.setData(m({
                    eid: i.eid,
                    enroll: i
                }, i.referer ? {
                    referer: i.referer
                } : {})), i.referer && (v.globalData.referer = i.referer), 0 == i.is_fans && (i.is_owner || i.info_id) && p.adShow({
                    ad_id: "subscription_id",
                    desc: "subscription"
                }, "detail"), 1 == a.data.currentTab ? s(a) : n(a);
            } else -1 == e.data.sta && "data not found" == e.data.msg ? a.setData({
                dataNotFound: !0
            }) : (null == a.data.enroll && a.setData({
                showLoadError: 1
            }), p.showFailedToast("数据加载失败", e.data.msg)); else p.login(function() {
                o(a), a.setData({
                    hasUserInfo: !0
                });
            }, function() {
                a.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(e) {
            p.hideLoading(), null == a.data.enroll && a.setData({
                showLoadError: 1
            });
        }
    });
}

function s(a, e) {
    p.showLoading("正在加载数据");
    var t = {
        eid: a.data.eid,
        access_token: p.getToken(),
        count: 10,
        info_id: a.data.info_id,
        page:a.data.baoMingPage
    };
    e && (t.lt = a.data.last_update), wx.request({
      url: v.globalData.host + "/SignUpForm/SignInList",
        data: t,
        method: "GET",
        dataType: "json",
        success: function(t) {
            if (p.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                for (var i = t.data.data, o = 0; o < i.items.length; o++) {
                    var n = i.items[o];
                    n.date && (n.date_str = p.formatDate(1e3 * n.date, "yyyy-MM-dd HH:mm"));
                }
                var l = a.data.userList;
                l= l.concat(i.items);
                var r = a.data.info_id, h = a.data.endCount || i.total, c = {
                    total: i.total,
                    userList: l,
                    noMoreData: !(d > 0),
                    endCount: d > 0 ? "" == r ? i.total : h : i.total
                };
              e ? c.last_update = d ? l[l.length - 1].last_update : 0 : c.info_id = d ? l[l.length - 1]&& l[l.length - 1].info_id : 0, 
                a.setData(c);
            } else p.showFailedToast("数据加载失败", t.data.msg); else p.login(function() {
                s(a), a.setData({
                    hasUserInfo: !0
                });
            }, function() {
                a.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(a) {
            p.hideLoading(), p.showFailedToast("数据加载失败");
        }
    });
}

function n(a) {
    p.showLoading("正在加载数据");
    var e = {
        eid: a.data.eid,
        access_token: p.getToken(),
        page: a.data.page,
        count: a.data.count
    };
    wx.request({
      url: v.globalData.host + "/SignUpForm/user_all",
        data: e,
        method: "GET",
        dataType: "json",
        success: function(e) {
            if (p.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                for (var t = e.data.data, i = t.field_list, o = i.length, s = [], l = !1, d = 0; d < o; d++) if (!i[d].field_key) {
                    l = !0;
                    break;
                }
                if (l) for (h = 0; h < t.user_infos.length; h++) {
                    for (var r = t.user_infos[h], d = 0; d < r.length; d++) "报名时间" == r[d].field_name && (r[d].field_value = p.formatDate(1e3 * r[d].field_value, "yyyy-MM-dd HH:mm"));
                    s.push(r);
                } else for (var h = 0; h < t.user_infos.length; h++) {
                    for (var r = t.user_infos[h], c = new Array(o), u = 0; u < o; u++) for (d = 0; d < r.length; d++) "报名时间" == r[d].field_name && "number" == typeof r[d].field_value && (r[d].field_value = p.formatDate(1e3 * r[d].field_value, "yyyy-MM-dd HH:mm")), 
                    (r[d].field_key == i[u].field_key || "姓名" == r[d].field_name && "昵称" == i[u].field_name) && (c[u] = r[d]);
                    s.push(c);
                }
                a.setData({
                    field_list: t.field_list,
                    tableData: s,
                    width: o > 2 ? 250 * o + 100 + "rpx" : "100%",
                    noMoreUser: t.user_infos.length < a.data.count
                });
            } else p.showFailedToast("数据加载失败", e.data.msg); else p.login(function() {
                n(a), a.setData({
                    hasUserInfo: !0
                });
            }, function() {
                a.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(a) {
            p.hideLoading(), p.showFailedToast("数据加载失败");
        }
    });
}

function l(a, e) {
    var t = a.data.enroll.is_fav, i = t ? "取消收藏" : "收藏";
    wx.request({
        url: v.globalData.host + "/enroll/v1/fav",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: a.data.eid,
            fav: t ? 0 : 1
        },
        method: "POST",
        success: function(e) {
            if (-500 != e.data.sta) if (0 == e.data.sta) {
                p.showToast(t ? "已取消收藏" : "收藏成功");
                var o = a.data.enroll;
                o.is_fav = t ? 0 : 1, a.setData({
                    enroll: o
                });
            } else p.showFailedToast(i + "失败", e.data.msg); else p.login(function() {
                l(a);
            });
        },
        fail: function(a) {
            p.showFailedToast(i + "失败");
        }
    });
}

function d(a, e) {
    p.showLoading("正在获取图片");
    wx.request({
      url: v.globalData.host + "/SignUpForm/share",
        data: {
            eid: a.data.eid,
            type: e || 0,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(t) {
            if (p.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) if (t.data.data) {
                var i = t.data.data.url, o = a.data.enroll;
                if (1 == e && o.auth > 0 && o.owner_pic.indexOf("wx.qlogo.cn") < 0) if (0 == a.data.downloadImg.length) {
                    var s = [ i, o.owner_pic ];
                    a.setData({
                        downloadImg: s
                    }), a.downLoadImages(s, 0);
                } else a.setData({
                    showShareDialog: !0
                }), setTimeout(function() {
                    a.makeShare();
                }, 100); else a.setData({
                    imageUrl: i,
                    showShareDialog: !0
                }), r(a);
            } else p.showFailedToast("获取图片失败，请重试。", t.data.msg); else p.showFailedToast("获取图片失败，请重试。", t.data.msg); else p.login(function() {
                d(a, e), a.setData({
                    hasUserInfo: !0
                });
            }, function() {
                a.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(a) {
            p.hideLoading(), p.showFailedToast("获取图片失败，请重试");
        }
    });
}

function r(a) {
    wx.saveImageToPhotosAlbum ? (p.showLoading("正在保存"), wx.getImageInfo({
        src: a.data.imageUrl,
        success: function(e) {
            h(a, e.path), a.setData({
                qrcodeDialog: !1
            });
        },
        fail: function(a) {
            p.hideLoading(), p.showModelTips("获取图片信息失败，原因:" + a.errMsg);
        }
    })) : p.showModelTips('1、点击下面的图片查看大图。2、长按或点击右上角三个点"..."保存到系统相册。3、分享给好友或群。');
}

function h(a, e) {
    wx.saveImageToPhotosAlbum({
        filePath: e,
        success: function(a) {
            p.hideLoading();
        },
        fail: function(t) {
            p.hideLoading();
            t.errMsg;
            wx.openSetting ? wx.showModal({
                title: "提示",
                content: "请授权报名工具访问相册，该操作仅会方便您保存图片到相册，请放心授权。",
                cancelText: "不想授权",
                confirmText: "去授权",
                confirmColor: "#12b7f5",
                success: function(t) {
                    t.confirm ? wx.openSetting({
                        complete: function(t) {
                            h(a, e);
                        }
                    }) : t.cancel && p.showModelTips('如果您不愿授权，也可以通过点击下面的图片查看大图，然后长按或点击右上角三个点"..."保存到系统相册。');
                }
            }) : p.showModelTips('如果您不愿授权，也可以通过点击下面的图片查看大图，然后长按或点击右上角三个点"..."保存到系统相册。');
        }
    });
}

function c(a) {
    wx.request({
        url: getApp().globalData.host + "/enroll/v1/vip",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(e) {
            -500 != e.data.sta ? 0 == e.data.sta && a.setData({
                showDev: e.data.data
            }) : p.login(function() {
                c(a), a.setData({
                    hasUserInfo: !0
                });
            }, function() {
                a.setData({
                    hasUserInfo: !1
                });
            });
        }
    });
}

function u(a) {
    wx.request({
        url: getApp().globalData.host + "/enroll/v1/notice/send",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: a.data.eid,
            content: a.data.notice
        },
        method: "POST",
        success: function(e) {
            if (-500 != e.data.sta) if (0 == e.data.sta) {
                p.showToast("发送成功");
                var t = a.data.enroll;
                t.has_notice = 1, a.setData({
                    enroll: t
                });
            } else p.showModelTips("发送失败，请重试，或者联系客服"); else p.login(function() {
                u(a), a.setData({
                    hasUserInfo: !0
                });
            }, function() {
                a.setData({
                    hasUserInfo: !1
                });
            });
        }
    });
}

function f(a) {
    p.showLoading("正在退出报名"), wx.request({
        url: v.globalData.host + "/enroll/v1/abort",
        method: "POST",
        data: {
            access_token: p.getToken(),
            tmp_id: a.data.tmp_id
        },
        success: function(e) {
            p.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta ? p.showToast("退出成功") : p.showFailedToast("退出失败", e.data.msg) : p.login(function() {
                f(a);
            });
        },
        fail: function(a) {
            p.hideLoading(), p.showFailedToast("退出失败，服务器请求超时");
        }
    });
}

function g(a) {
    p.showLoading("正在退款"), wx.request({
        url: v.globalData.host + "/enroll/v1/super/refund",
        method: "POST",
        data: {
            access_token: p.getToken(),
            eid: a.data.eid
        },
        success: function(e) {
            if (p.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) p.showToast("批量退款成功"), 
            a.closeRefundAllDialog(); else {
                if (-1 == e.data.sta && 300 == e.data.errcode) return void p.showModelTips(e.data.msg);
                p.showFailedToast("批量退款失败, ", e.data.msg);
            } else p.login(function() {
                g(a);
            });
        },
        fail: function(a) {
            p.hideLoading(), p.showFailedToast("网络请求超时" + a.errMsg);
        }
    });
}

var w, m = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (a[i] = t[i]);
    }
    return a;
}, p = require("../../utils/util.js"), D = require("../../tmp/tmp.js"), v = getApp();

Page({
    data: (w = {
        eid: "",
        showLoadError: !1,
        dataNotFound: !1,
        shareDialogHide: !0,
        shareDialogAnimate: !1,
        currentTab: 1,
        enroll: null,
        needRefresh: !1,
        userList: [],
        info_id: "",
        last_update: 0,
        tableData: null,
        ruleShow: !0,
        showDev: 1,
        noticeBoard: v.globalData.noticeBoard,
        huoma: v.globalData.huoma,
        page: 1,
        count: 100,
        baoMingPage:1,
        baoMingCount:10,
        noMoreUser: !1,
        shareFriends: !1,
        visibility: [ "仅管理员可见", "任何人可见", "报名参与人可见" ],
        code: 1234,
        huomaDialog: !1
    }, a(w, "huoma", v.globalData.huoma), a(w, "sortType", [ "报名时间倒序排列", "更新时间倒序排列" ]), 
    a(w, "sortIndex", 0), a(w, "messageClicked", !1), a(w, "statusBarHeight", 0), a(w, "redDialog", !1), 
    a(w, "wish", {
        appid: "wx3dd29bfe3e5f0d1d",
        wid: "5c502a1da379e8aaf50aeb80",
        img: "https://cdn-xcxcustom.weiyoubot.cn/20190131/8e9cffe0f7c42133897fdd4690af633e.png"
    }), a(w, "downloadImg", []), w),
    getUrlParam: function(a, e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), i = a.split("?")[1].match(t);
        return null != i ? unescape(i[2]) : null;
    },
    onLoad: function(a) {
        console.log("options =====:"), console.log(a, a.eid, a.referer);
        var e = a.eid, t = 0, i = "", s = "", n = a.referer || "", l = a.info_id;
        if (p.isTextEmpty(e)) {
            var d = decodeURIComponent(a.q);
            if ("undefined" != d) e = this.getUrlParam(d, "eid"), n = this.getUrlParam(d, "referer"); else {
                var r = decodeURIComponent(a.scene || "");
                r.indexOf("_") > 0 ? (e = r.split("_")[0], r.split("_")[1] && (t = 1)) : r.indexOf("@") > 0 ? s = r : (e = r.substr(0, 24), 
                i = r.substr(24, 32));
            }
        }
        var h = p.getStorage(e), u = p.getSystemInfo();
        this.setData({
            eid: e || "",
            inviteEid: s,
            referer: n,
            admin: t,
            ts: i,
            messageClicked: !!h,
            iPhoneX: p.getIphoneX(),
            from: a.from,
            version: p.compareVersion(u.version, "7.0.0"),
            platform: u.platform,
            statusBarHeight: u.statusBarHeight,
            pageCount: p.pageCount(),
            scale: u.screenWidth / 375
        }), v.globalData.referer = n, v.globalData.info_id = l, c(this), o(this), D.noticeBoard(this), 
        D.huoma(this), this.redDialog();
    },
    onShow: function() {
        var a = this;
        this.setData({
userList:[],
baoMingPage:1
        });
        p.checkSession(this, function() {
            a.data.needRefresh && (a.setData({
                info_id: "",
                needRefresh: !1
            }), o(a)), p.applyUpdate();
        }, function() {
            a.setData({
                hasUserInfo: !1
            });
        }), p.getContactUserInfo(this);
        var e = p.getStorage("verified") || "", t = p.getStorage("userlistIndex") || 0;
        if (e) {
            var i = this.data.userList;
            i && i[t] && (i[t].verified = parseInt(e), this.setData({
                userList: i
            })), p.removeStorage("verified");
        }
    },
    login: function(a) {
        var e = this;
        p.showLoading("正在登录..."), p.buttonLogin(function() {
            p.hideLoading(), e.setData({
                hasUserInfo: !0
            }), o(e);
        }, function() {
            p.hideLoading();
        }, a.detail);
    },
    onReachBottom: function() {
      if (this.data.currentTab==1){
        this.setData({ baoMingPage: this.data.baoMingPage+1});
        s(this);
      }
    },
    onShareAppMessage: function(a) {
        this.setData({
            shareDialogHide: !0,
            needRefresh: !1
        });
        var e = this.data.enroll;
        null == e && wx.reportAnalytics("detail_share", {
            from: a.from,
            eid: this.data.eid
        });
        var t = this, i = "/pages/detail/detail?eid=" + this.data.eid + "&referer=" + e.unionid;
        return {
            title: e ? e.title : "分享一个活动给你",
            path: i,
            success: function(a) {},
            fail: function(a) {
                var e = a.errMsg || "";
                (e.indexOf("denied") > 0 || e.indexOf("deny") > 0 || e.indexOf("no permission") > 0) && t.shareWxCircle(2);
            }
        };
    },
    inviteData: function() {
        this.closeManageDialog();
        var a = this.data, e = a.eid, t = a.showDev, i = a.enroll.auth;
        wx.navigateTo({
            url: "/subpackage/invitedata/invitedata?eid=" + e + "&auth=" + i + "&showDev=" + t
        });
    },
    contactCallback: function(a) {
        p.contactCallback(a), this.setData({
            shareDialogAnimate: !1
        }), this.closeFollowDialog();
    },
    openLocation: function(a) {
        wx.openLocation({
            latitude: this.data.enroll.latitude,
            longitude: this.data.enroll.longitude,
            name: this.data.enroll.address
        });
    },
    showShareDialog: function() {
        this.setData({
            shareDialogAnimate: !0
        });
    },
    closeShareDialog: function() {
        this.setData({
            shareDialogAnimate: !1
        });
    },
    closeDialog: function() {
        this.setData({
            showShareDialog: !1
        });
    },
    copyEid: function() {
        wx.setClipboardData({
            data: this.data.eid
        });
    },
    copyOwnerUnionid: function() {
        this.data.showDev && wx.setClipboardData({
            data: this.data.enroll.owner_unionid
        });
    },
    copyWebUrl: function() {
        this.setData({
            copyWebUrlDialog: !0,
            shareDialogAnimate: !1
        });
    },
    closeWebUrl: function() {
        this.setData({
            copyWebUrlDialog: !1
        });
    },
    inputWord: function(a) {
        this.setData({
            finalWord: a.detail.value
        });
    },
    inputChange: function(a) {
        var e = a.detail.value;
        this.setData({
            inputCode: e
        });
    },
    deleteOk: function(a) {
        this.data.inputCode == this.data.code ? i(this) : p.showModelTips("请输入正确的验证码");
    },
    refresh: function() {
        o(this);
    },
    toIndex: function() {
        wx.switchTab({
            url: "/pages/default/default"
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    toDefault: function() {
        wx.switchTab({
            url: "/pages/default/default"
        });
    },
    toEdit: function() {
      wx.navigateTo({
        url: "/pages/edit/edit?eid=" + this.data.eid
      });
      return;
        if (p.buttonClicked(this), 0 == this.data.enroll.draw_status) {
            var a = this.data.enroll;
            a.sign_name = "", wx.setStorageSync("enroll", a), this.setData({
                needRefresh: !0,
                info_id: ""
            }), this.closeManageDialog(), a.items.length > 0 ? wx.navigateTo({
                url: "/pages/editbuy/editbuy?eid=" + this.data.eid
            }) : wx.navigateTo({
                url: "/pages/edit/edit?eid=" + this.data.eid
            });
        } else p.showModelTips("已经申请提款的报名，不能进行编辑。");
    },
    ruleDetail: function(a) {
        "show" == a.currentTarget.dataset.opt ? this.setData({
            ruleShow: !0
        }) : this.setData({
            ruleShow: !1
        });
    },
    shareWxCircle: function(a) {
        p.buttonClicked(this);
        var e;
        e = 2 == a ? 2 : parseInt(a.currentTarget.dataset.id), this.setData({
            shareDialogAnimate: !1,
            shareFriends: 2 == e
        }), 0 == e ? (p.setStorage("enroll_share", this.data.enroll), wx.navigateTo({
            url: "/subpackage/shareimage/shareimage?eid=" + this.data.eid
        })) : d(this, e);
    },
    tabChange: function(a) {
        var e = a.currentTarget.dataset.id;
        this.setData({
            currentTab: e
        }), 2 == e ? (this.setData({
            page: 1,
            info_id: ""
        }), n(this)) :(this.setData({userList:[],baoMingPage:1})), s(this);
    },
    tellPhone: function() {
        this.closeContactMenuDialog();
        var a = this.data.enroll.phone + "", e = a.substr(0, 3) + "****" + a.substr(7);
        wx.showModal({
            title: "拨打电话",
            content: e,
            success: function(e) {
                e.confirm && wx.makePhoneCall({
                    phoneNumber: a
                });
            }
        });
    },
    toEnroll: function(a) {
        p.buttonClicked(this), p.setStorage("enroll", this.data.enroll);
        var e = a.currentTarget.dataset.type;
        this.setData({
            needRefresh: !0,
            info_id: ""
        }), this.closeManageDialog();
        var t = this.data.enroll, i = {
            card_appid: t.card_appid,
            card_path: t.card_path
        };
        if (p.setStorage("enroll_kf", i), "detail" == e) {
            var o = t.verified, s = t.verify;
            if (o <= 0 || 2 == o || 0 == s) wx.navigateTo({
                url: "/pages/enroll/enroll?eid=" + this.data.eid + "&info_id=" + t.info_id + "&type=detail&pay_status=" + t.pay_status + "&fee=" + t.fee + "&status=" + t.status + "&verify=" + s + "&verified=" + o + "&can_quit=" + t.can_quit
            }); else {
                var n = t.is_owner, l = a.currentTarget.dataset.infoid;
                wx.navigateTo({
                    url: "/pages/selfdetail/selfdetail?eid=" + this.data.eid + "&info_id=" + l + "&is_owner=" + n + "&fee=" + t.fee + "&status=" + t.status + "&verify=" + s + "&verified=" + o + "&can_quit=" + t.can_quit
                });
            }
        } else {
            var d = t.items, r = (t.temp, t.fee);
            if (d&&d.length||0) {
                for (var h = t.items, c = h.length, u = 0; u < c; u++) h[u].consume = 0;
                p.setStorage("enroll_goods", h), r = 0;
            }
            wx.navigateTo({
                url: "/pages/enroll/enroll?eid=" + this.data.eid + "&fee=" + r + "&pay_status=" + t.pay_status
            });
        }
    },
    toEditEnroll: function() {
        var a = this.data.enroll;
        p.setStorage("enroll", this.data.enroll), this.setData({
            needRefresh: !0,
            info_id: ""
        });
        var e = a.items, t = (a.temp, a.fee);
        e&&e.length && (p.setStorage("enroll_goods", a.items), t = 0), wx.navigateTo({
            url: "/pages/enrollmanage/enrollmanage?eid=" + this.data.eid + "&fee=" + t + "&limit=" + a.on_behalf_limit + "&verify=" + a.verify + "&can_quit=" + a.can_quit
        });
    },
    export: function() {
        p.buttonClicked(this), 0 != this.data.total ? (this.closeManageDialog(), wx.navigateTo({
            url: "/subpackage/export/export?eid=" + this.data.eid
        })) : p.showModelTips("暂无任何数据");
    },
    collect: function(a) {
        l(this);
    },
    userDetail: function(a) {
        var e = a.currentTarget.dataset.verified, t = a.currentTarget.dataset.index, i = this.data.enroll, o = i.verify, s = i.is_owner, n = i.is_admin, l = i.visibility;
        if (v.globalData.showDev = this.data.showDev, s || n || this.data.showDev || 1 == l || 2 == l && i.info_id) {
            this.setData({
                needRefresh: !1
            }), p.setStorage("userlistIndex", t);
            var d = a.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/pages/userdetail/userdetail?eid=" + this.data.eid + "&info_id=" + d + "&is_owner=" + (s || n) + "&fee=" + this.data.enroll.fee + "&status=" + this.data.enroll.status + "&verify=" + o + "&verified=" + e
            });
        }
    },
    selfDetail: function(a) {
        var e = a.currentTarget.dataset.type, t = a.currentTarget.dataset.verified, i = this.data.enroll, o = i.verify, s = i.is_owner;
        if (p.setStorage("detail_phone", i.phone), s || this.data.showDev || "look" == e) {
            var n = a.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/pages/selfdetail/selfdetail?eid=" + this.data.eid + "&info_id=" + n + "&is_owner=" + s + "&fee=" + this.data.enroll.fee + "&status=" + this.data.enroll.status + "&verify=" + o + "&verified=" + t + "&can_quit=" + this.data.enroll.can_quit
            });
        }
    },
    userEnroll: function(a) {
        var e = this.data.enroll, t = e.verify;
        p.setStorage("detail_phone", e.phone), wx.navigateTo({
            url: "/pages/enrollusers/enrollusers?eid=" + this.data.eid + "&verify=" + t + "&fee=" + this.data.enroll.fee + "&status=" + this.data.enroll.status + "&can_quit=" + this.data.enroll.can_quit
        });
    },
    showBanner: function(a) {
        var e = a.currentTarget.dataset.pic;
        this.setData({
            needRefresh: !1
        }), wx.previewImage({
            urls: [ e ]
        });
    },
    copy: function() {
        this.data.showDev && wx.setClipboardData({
            data: this.data.eid
        });
    },
    postFormId: function(a) {
        p.postFormId(a.detail.formId);
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
    toHelp: function() {
        wx.navigateTo({
            url: "/pages/webview/webview?url=https://mp.weixin.qq.com/s/E9ggVPFWUiiFMr2RFOMKdg"
        });
    },
    copyUrl: function() {
        var a = "pages/detail/detail?eid=" + this.data.eid;
        wx.setClipboardData({
            data: a,
            success: function(a) {
                p.showToast("复制成功");
            }
        });
    },
    showAll: function(a) {
        var e = a.currentTarget.dataset.index, t = a.currentTarget.dataset.idx, i = this.data.tableData[e], o = [], s = 100, n = this.data.showAll;
        if (n) {
            for (var l = i.length, d = 0; d < l; d++) o.push(250);
            this.setData({
                tdWidth: o,
                width: l > 2 ? 250 * l + 100 + "rpx" : "100%",
                showAll: !1
            });
        } else {
            for (d = 0; d < i.length; d++) {
                var r = i[d], h = 250;
                d == t && (h = (h = 30 * r.field_value.toString().length) > 250 ? h : 250), o.push(h), 
                s += h;
            }
            this.setData({
                tdWidth: o,
                width: s + "rpx",
                showAll: !0
            });
        }
    },
    showAllTitle: function(a) {
        var e = a.currentTarget.dataset.idx, t = this.data.field_list, i = [], o = 100;
        if (this.data.showAll) {
            for (var s = t.length, n = 0; n < s; n++) i.push(250);
            this.setData({
                tdWidth: i,
                width: s > 2 ? 250 * s + 100 + "rpx" : "100%",
                showAll: !1
            });
        } else {
            for (n = 0; n < t.length; n++) {
                var l = t[n], d = 250;
                n == e && (d = (d = 30 * l.field_name.length) > 250 ? d : 250), i.push(d), o += d;
            }
            this.setData({
                tdWidth: i,
                width: o + "rpx",
                showAll: !0
            });
        }
    },
    otherUser: function(a) {
        "prev" == a.currentTarget.dataset.type ? this.setData({
            page: this.data.page - 1
        }) : this.setData({
            page: this.data.page + 1
        }), n(this);
    },
    showWxDialog: function() {
        this.closeContactMenuDialog(), this.setData({
            wxDialog: !0
        });
    },
    closeWxDialog: function() {
        this.setData({
            wxDialog: !1
        });
    },
    copyWx: function() {
        this.closeWxDialog();
        var a = this.data.enroll.wx_no;
        wx.setClipboardData({
            data: a,
            success: function(a) {
                p.showToast("复制成功");
            }
        });
    },
    closePathDialog: function() {
        this.setData({
            pathDialog: !1
        });
    },
    copyPath: function(a) {
        this.closePathDialog();
        var e = "/pages/detail/detail?eid=" + this.data.eid, t = a.currentTarget.dataset.type;
        2 == t && (e = "wxfaa08012777a431e"), 3 == t && (e = "gh_ae6449501a82"), wx.setClipboardData({
            data: e,
            success: function(a) {
                p.showToast("复制成功");
            }
        });
    },
    copyWebPath: function() {
        this.closePathDialog();
        var a = "http://m.baominggongju.com/?eid=" + this.data.eid + "&referer=" + this.data.enroll.unionid;
        wx.setClipboardData({
            data: a,
            success: function(a) {
                p.showToast("复制成功");
            }
        });
    },
    manage: function() {
        this.data.enroll.is_owner || this.data.showDev ? this.setData({
            manageDialogShow: !0
        }) : this.setData({
            adminDialogShow: !0
        });
    },
    closeManageDialog: function() {
        this.setData({
            manageDialogShow: !1,
            adminDialogShow: !1
        });
    },
    toQrcode: function() {
        var a = this.data.enroll, e = a.group_qr;
        a.follow.qrcode && (e = a.follow.qrcode), p.setStorage("qrcode", e), wx.navigateTo({
            url: "/subpackage/qrcode/qrcode"
        });
    },
    toSetQrcode: function() {
        p.buttonClicked(this), v.globalData.needRefresh = !1, wx.navigateTo({
            url: "/subpackage/enrollfollow/enrollfollow?eid=" + this.data.eid
        });
    },
    copyEnroll: function() {
        if (!this.data.buttonClicked) {
            p.buttonClicked(this);
            var a = this.data.eid;
            this.closeManageDialog(), this.closeShareDialog(), 5 == this.data.enroll.temp ? wx.navigateTo({
                url: "/pages/createbuy/createbuy?eid=" + a
            }) : wx.navigateTo({
                url: "/pages/create/create?eid=" + a
            });
        }
    },
    deleteEnroll: function() {
        this.setData({
            deleteConfirmDialog: !0,
            code: Math.random().toString().substring(2, 6),
            manageDialogShow: !1,
            adminDialogShow: !1
        });
    },
    closeDeleteConfirmDialog: function() {
        this.setData({
            deleteConfirmDialog: !1
        });
    },
    entryFee: function() {
        this.closeManageDialog();
        var a = this.data.enroll;
        wx.navigateTo({
            url: "/subpackage/entryfee/entryfee?eid=" + this.data.eid + "&has_draw=" + a.has_draw + "&follow=" + a.is_fans + "&auth=" + a.auth
        });
    },
    moreSetting: function() {
        this.closeManageDialog(), this.setData({
            needRefresh: !0
        }), wx.navigateTo({
            url: "/subpackage/moresetting/moresetting?eid=" + this.data.eid
        });
    },
    huomaDialog: function() {
        this.setData({
            huomaDialog: !0
        });
    },
    downloadQrcode: function() {
        var a = this.data.enroll;
        this.setData({
            imageUrl: a.group_qr
        }), r(this);
    },
    showPic: function(a) {
        var e = a.currentTarget.dataset.index, t = this.data.enroll.pics, i = t[e];
        wx.previewImage({
            urls: t,
            current: i
        });
    },
    showQrcode: function(a) {
        var e = a.currentTarget.dataset.pic;
        wx.previewImage({
            urls: [ e ]
        });
    },
    showPath: function() {
        this.setData({
            pathDialog: !0,
            manageDialogShow: !1,
            shareDialogAnimate: !1
        });
    },
    notice: function() {
        var a = this.data.enroll.has_notice;
        a ? p.showModelTips("每个活动只有一次发送通知机会，你已用完，请知晓。") : this.setData({
            noticeDialogShow: !0,
            manageDialogShow: !1
        });
    },
    closeNoticeDialog: function() {
        this.setData({
            noticeDialogShow: !1
        });
    },
    inputNotice: function(a) {
        this.setData({
            notice: a.detail.value
        });
    },
    sendNotice: function() {
        p.buttonClicked(this);
        var a = this.data.notice;
        if (p.isTextEmpty(a)) p.showModelTips("请输入通知内容"); else if (a.length < 5) p.showModelTips("通知内容至少5个字"); else {
            var e = p.hasSensitiveWords(a);
            if (e) return p.showModelTips("通知内容包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                notice: p.replaceAll(a, e),
                noticeDefault: p.replaceAll(a, e)
            });
            var t = this;
            wx.showModal({
                title: "发送确认",
                content: "每个报名活动只有1次发送通知机会，你确认要发送吗？",
                success: function(a) {
                    a.confirm && (t.setData({
                        noticeDialogShow: !1
                    }), u(t));
                }
            });
        }
    },
    contactMenu: function(a) {
        var e = a.currentTarget.dataset.type;
        this.setData(m({
            contactMenuDialog: !0
        }, e ? {
            hideMessageItem: !0
        } : {}));
    },
    closeContactMenuDialog: function() {
        this.setData({
            contactMenuDialog: !1
        });
    },
    toHomePage: function() {
        this.setData({
            needRefresh: !0
        }), wx.navigateTo({
            url: "/pages/homepage/homepage?unionid=" + this.data.enroll.owner_unionid
        });
    },
    toAuth: function() {
        this.data.enroll.is_owner && wx.navigateTo({
            url: "/subpackage/authentication/authentication?unionid=" + this.data.enroll.owner_unionid
        });
    },
    showPhone: function() {
        1 == this.data.enroll.auth && this.data.showDev && this.toHomePage();
    },
    exitMoney: function() {
        var a = this;
        wx.showModal({
            title: "温馨提示",
            content: "付款未完成，确实退出吗？如果退出，已支付的费用将自动退回。",
            showCancel: !0,
            confirmText: "继续支付",
            confirmColor: "#12b7f5",
            cancelText: "退出",
            success: function(e) {
                e.confirm ? wx.navigateTo({
                    url: "/subpackage/enrollpay/enrollpay?eid=" + a.data.eid + "&fee=" + a.data.fee + "&tmp_id=" + a.data.tmp_id + "&paid=" + a.data.paid
                }) : e.cancel && f(a);
            }
        });
    },
    changeSort: function(a) {
      this.setData({ userList: [], baoMingPage: 1 });
        0 == a.detail.value ? s(this) : s(this, 1);
    },
    toZhini: function() {
        var a = this.data.enroll, e = a.card_appid, t = a.card_path;
        wx.navigateToMiniProgram && wx.navigateToMiniProgram({
            appId: e,
            path: t
        }), this.setMessageClick();
    },
    setMessageClick: function() {
        this.closeContactMenuDialog(), p.setStorage(this.data.eid, 1);
        var a = this.data.enroll;
        a.notice_count = 0, this.setData({
            enroll: a
        });
    },
    exitManage: function() {
        var a = this;
        wx.showModal({
            title: "确认退出管理员吗？",
            content: "如果点击“确认”，你将失去管理员资格，相应管理权限也将一并取消。",
            confirmColor: "#12b7f5",
            success: function(e) {
                e.confirm && (t(a), a.closeManageDialog());
            }
        });
    },
    redDialog: function() {
        var a = p.formatDate(new Date(), "yyyy-MM-dd"), e = p.getStorage("wishIsShow");
        "2019-02-04" != a && "2019-02-05" != a || e == a || this.setData({
            redDialog: !0
        }), p.setStorage("wishIsShow", a);
    },
    toWishs: function(a) {
        var e = this.data.wish;
        wx.navigateToMiniProgram({
            appId: e.appid,
            path: "/pages/detail/detail?wid=" + e.wid
        });
    },
    closeRedDialog: function() {
        this.setData({
            redDialog: !1
        });
    },
    setAdmin: function() {
        this.closeManageDialog(), wx.navigateTo({
            url: "/subpackage/admin/admin?eid=" + this.data.eid
        });
    },
    followSub: function() {
        this.closeManageDialog(), wx.navigateTo({
            url: "/subpackage/enrollfollow/enrollfollow?eid=" + this.data.eid
        });
    },
    toCheckin: function() {
        this.closeManageDialog(), wx.navigateTo({
            url: "/subpackage/checkin/checkin?eid=" + this.data.eid
        });
    },
    downLoadImages: function(a, e) {
        p.showLoading("正在生成图片");
        var t = a.length, i = this, o = i.data.imageInfos || [];
        wx.getImageInfo({
            src: a[e],
            success: function(s) {
                a[e] = s.path, o.push(s), e == t - 1 ? (i.setData({
                    downloadImg: a,
                    imageInfos: o
                }), i.makeShare()) : i.downLoadImages(a, e + 1);
            }
        });
    },
    makeShare: function(a) {
        console.log("downloadImg ==== :", this.data.downloadImg), v.globalData.scale = this.data.scale;
        var e = wx.createCanvasContext("shareQrCode");
        p.drawRect(e, {
            x: 0,
            y: 0,
            w: 300,
            h: 300,
            bg: "#fff"
        }), p.drawImage(e, {
            x: 0,
            y: 0,
            w: 300,
            h: 300,
            src: this.data.downloadImg[0]
        }), p.drawArc(e, {
            lineWidth: 70,
            strokeStyle: "#fff",
            lineCap: "round",
            x: 150,
            y: 150,
            r: 18,
            sAngle: 0,
            eAngle: 2 * Math.PI,
            wise: !0
        }), p.drawImage(e, {
            x: 102,
            y: 102,
            w: 96,
            h: 96,
            src: this.data.downloadImg[1]
        }), p.drawArc(e, {
            lineWidth: 22,
            strokeStyle: "#fff",
            lineCap: "round",
            x: 150,
            y: 150,
            r: 58,
            sAngle: 0,
            eAngle: 2 * Math.PI,
            wise: !0
        }), e.draw(), console.log("success ==== draw done:");
        var t = this;
        setTimeout(function() {
            t.saveImg();
        }, 100), p.hideLoading(), this.setData({
            showShareDialog: !0
        });
    },
    prevCanvas: function() {
        var a = this.data.scale;
        console.log("scalse ==== : ", a), wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 300 * a,
            height: 300 * a,
            canvasId: "shareQrCode",
            success: function(a) {
                wx.previewImage({
                    urls: [ a.tempFilePath ]
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    saveImg: function() {
        var a = this.data.scale, t = this;
        this.data.canvas_h;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 300 * a,
            height: 300 * a,
            canvasId: "shareQrCode",
            success: function(a) {
                var i = a.tempFilePath;
                wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
                    filePath: i,
                    success: function(a) {
                        p.hideLoading(), p.showModelTips("已保存到您的相册，可以去看看");
                    },
                    fail: function(a) {
                        p.hideLoading(), a.errMsg.indexOf("cancel") > -1 || e(t, i);
                    }
                }) : p.showModelTips("您的微信版本太低，建议点击图片，长按保存到本地。");
            }
        });
    },
    refundAllDialog: function() {
        this.setData({
            refundAllDialog: !0,
            manageDialogShow: !1,
            code: Math.random().toString().substring(2, 6)
        });
    },
    closeRefundAllDialog: function() {
        this.setData({
            refundAllDialog: !1
        });
    },
    refundAll: function() {
        this.data.inputCode == this.data.code ? g(this) : p.showModelTips("请输入正确的验证码");
    }
});