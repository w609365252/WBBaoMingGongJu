function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function e(t) {
    c.showLoading("正在更新报名表");
    for (var a = c.resetTabs(t.data.tmpTabs, "edit"), i = t.data.goods, s = 0; s < i.length; s++) {
        var o = i[s];
        o.count = parseInt(o.count), "" == o.fee ? o.fee = 0 : o.fee && (o.fee = Math.round(100 * Number(o.fee))), 
        o.stock_limit = o.stock_limit ? parseInt(o.stock_limit) : 0;
    }
    var n = c.getUTCDateInSeconds(t.data.startDate), d = c.getTimeInSeconds(t.data.startTime), l = c.getUTCDateInSeconds(t.data.endDate), r = c.getTimeInSeconds(t.data.endTime), u = c.getUTCDateInSeconds(t.data.actStartDate), f = c.getTimeInSeconds(t.data.actStartTime), m = c.getUTCDateInSeconds(t.data.actEndDate), g = c.getTimeInSeconds(t.data.actEndTime), p = t.data.authInfo.name, D = t.data.tapIndex, v = {
        eid: t.data.eid,
        title: t.data.title,
        content: t.data.rule,
        end_time: l + r,
        act_start: t.data.actVisible ? u + f : 0,
        act_end: t.data.actVisible ? m + g : 0,
        banner: t.data.banner ? t.data.banner : "",
        user_visible: parseInt(t.data.userVisibleIndex),
        visibility: t.data.userVisibleIndex ? parseInt(t.data.visibilityIndex) : 0,
        limit: t.data.limitCustom ? parseInt(t.data.limit) : 0,
        req_info: a,
        sign_name: p && D ? p : t.data.signName,
        wx_no: t.data.wxNo,
        group_qr: t.data.qrcode || "",
        pics: t.data.pics,
        on_behalf_limit: t.data.onBehalf ? t.data.behalfLimit[t.data.behalfIndex] : 0,
        version: h.globalData.version,
        can_quit: t.data.canQuit ? 1 : 0,
        address: t.data.address,
        longitude: t.data.longitude,
        latitude: t.data.latitude,
        verify: t.data.onVerify ? 1 : 0,
        items: i,
        replace: t.data.count ? 0 : t.data.replace,
        is_public: t.data.isPublic ? 1 : 0,
        role: parseInt(t.data.roleIndex),
        item_limit: parseInt(t.data.itemLimitIndex),
        phone: t.data.phone,
        code: parseInt(t.data.verifyCode),
        access_token: wx.getStorageSync("accessToken")
    };
    0 == t.data.count && (v.start_time = n + d);
    var y = t.data, w = y.roleIndex, T = y.authInfo;
    if (1 == w) v.phone = T.phone, v.code = 9999999, v.wx_no = T.wx_no; else {
        var _ = c.getStorage("phone");
        t.data.phone == _ ? (v.phone = _, v.code = 9999999) : (v.phone = t.data.phone, v.code = parseInt(t.data.verifyCode));
    }
    wx.request({
        url: h.globalData.host + "/enroll/v2/update",
        data: v,
        method: "POST",
        success: function(i) {
            c.hideLoading(), -500 != i.data.sta ? 0 == i.data.sta ? setTimeout(function() {
                wx.navigateBackMiniProgram && t.data.cid ? wx.navigateBackMiniProgram({
                    extraData: {
                        eid: t.data.eid,
                        req_info: a
                    },
                    success: function(t) {}
                }) : wx.navigateBack({
                    delta: 1
                });
            }, 1500) : c.showFailedToast("更新报名表失败，请重试。", i.data.msg) : c.login(function() {
                e(t, options);
            });
        },
        fail: function(t) {
            c.showFailedToast("更新报名表失败，请重试");
        }
    });
}

function a(t) {
    c.showLoading("正在删除报名表"), wx.request({
        url: h.globalData.host + "/enroll/v1/remove",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: t.data.eid
        },
        method: "POST",
        success: function(e) {
            c.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta ? (c.showToast("报名表删除成功"), 
            wx.switchTab({
                url: "/pages/index/index"
            })) : c.showFailedToast("报名表删除失败，", e.data.msg) : c.login(function() {
                a(t);
            });
        },
        fail: function(t) {
            c.hideLoading(), c.showFailedToast("报名表删除失败");
        }
    });
}

function i(t) {
    c.showLoading("正在加载数据"), wx.request({
      url: h.globalData.host + "/SignUpForm/Detail",
        data: {
            eid: t.data.eid,
            access_token: c.getToken()
        },
        method: "GET",
        success: function(e) {
            if (c.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                var a = e.data.data, s = a.req_info, o = t.data.tabs;
                if (t.setData({
                    tmpTabs: s
                }), s[0] && s[0].field_key) for (y = 0; y < o.length; y++) for (n = 0; n < s.length; n++) o[y].field_key == s[n].field_key && (o[y] = s[n], 
                s.splice(n, 1)); else for (y = 0; y < o.length; y++) for (var n = 0; n < s.length; n++) o[y].field_name == s[n].field_name && (o[y] = s[n], 
                s.splice(n, 1));
                for (var d = o.concat(s), l = c.formatDate(new Date(1e3 * a.start_time), "yyyy-MM-dd"), r = c.formatDate(new Date(1e3 * a.start_time), "HH:mm"), u = c.formatDate(new Date(1e3 * a.end_time), "yyyy-MM-dd"), f = c.formatDate(new Date(1e3 * a.end_time), "HH:mm"), m = a.act_start ? c.formatDate(new Date(1e3 * a.act_start), "yyyy-MM-dd") : l, g = a.act_start ? c.formatDate(new Date(1e3 * a.act_start), "HH:mm") : r, p = a.act_start ? c.formatDate(new Date(1e3 * a.act_end), "yyyy-MM-dd") : u, D = a.act_start ? c.formatDate(new Date(1e3 * a.act_end), "HH:mm") : f, v = a.items, y = 0; y < v.length; y++) v[y].old = !0, 
                v[y].fee = v[y].fee / 100, v[y].stock_limit = v[y].stock_limit ? v[y].stock_limit : "";
                var w = h.globalData.wxReg, T = a.wx_no;
                w.test(T) || (a.wx_no = ""), t.setData({
                    title: a ? a.title : "",
                    titleDefault: a ? a.title : "",
                    rule: a ? a.content : "",
                    ruleDefault: a ? a.content : "",
                    start_time: a.start_time,
                    startDate: l,
                    startTime: r,
                    endDate: u,
                    endTime: f,
                    actStartDate: m,
                    actStartTime: g,
                    actEndDate: p,
                    actEndTime: D,
                    actVisible: !!a.act_start,
                    banner: a.banner,
                    limit: a.limit,
                    count: a.count,
                    userVisibleIndex: a.user_visible,
                    visibilityIndex: a.visibility,
                    limitCustom: 0 != a.limit,
                    titleEmpty: !a && !a.title,
                    ruleEmpty: !a && !a.content,
                    wxNo: a.wx_no || "",
                    defaultWxNo: a.wx_no || "",
                    tabs: d,
                    fee: a.fee,
                    qrcode: a.group_qr,
                    cid: a.cid,
                    pics: a.pics || [],
                    onBehalf: a.on_behalf_limit > 0,
                    behalfIndex: c.getBeHalfIndex(a.on_behalf_limit),
                    canQuit: a.can_quit,
                    longitude: a.longitude,
                    latitude: a.latitude,
                    address: a.address,
                    showBehalf: !(a.on_behalf_limit > 0),
                    showVerify: 1 != a.verify,
                    onVerify: a.verify,
                    goods: v,
                    phone: a.phone || "",
                    phoneDefault: a.phone || "",
                    verifyCode: a.phone ? "9999999" : "",
                    noAuthPhone: !a.phone && null,
                    isPublic: !!a.is_public,
                    roleIndex: a.role,
                    itemLimitIndex: a.item_limit,
                    enroll: a
                }), c.setTabsInfo(t, d);
            } else c.showFailedToast("报名表数据获取失败", e.data.msg); else c.login(function() {
                i(t);
            });
        },
        fail: function(t) {
            c.hideLoading(), c.showFailedToast("报名表数据获取失败");
        }
    });
}

function s(t, e, a, i) {
    var o = a[i];
    wx.uploadFile({
        url: h.globalData.host + "/file/v1/upload",
        filePath: o,
        name: "file",
        formData: {
            access_token: c.getStorage("accessToken"),
            type: e
        },
        success: function(o) {
            "pic" != e && c.hideLoading();
            var n = o.data, d = JSON.parse(n);
            if (0 == d.sta) {
                var l = d.data.urls[0];
                if ("banner" == e) t.setData({
                    banner: l
                }); else if ("qrcode" == e) t.setData({
                    qrcode: l
                }); else if ("pic" == e) {
                    var r = t.data.pics;
                    r.push(l), t.setData({
                        pics: r
                    }), a.length - 1 > i ? s(t, e, a, i + 1) : c.hideLoading();
                }
            } else c.showFailedToast(d.msg);
        },
        fail: function(t) {
            c.hideLoading(), c.showFailedToast("上传图片失败，请重试");
        }
    });
}

function o(t) {
    wx.chooseLocation({
        success: function(e) {
            console.log(e), t.setData({
                longitude: e.longitude,
                latitude: e.latitude,
                address: e.name
            });
        },
        fail: function(e) {
            var a = e.errMsg;
            console.log(a), a && (a.indexOf("fail auth") > -1 || a.indexOf("fail:auth") > -1) && (wx.openSetting ? wx.showModal({
                title: "提示",
                content: "选择地点需要授权报名工具访问您的地理位置。",
                cancelText: "不想授权",
                confirmText: "去授权",
                confirmColor: "#12b7f5",
                success: function(e) {
                    e.confirm ? wx.openSetting({
                        complete: function(e) {
                            o(t);
                        }
                    }) : e.cancel && c.showModelTips("由于您拒绝授权，因此无法选择地点");
                }
            }) : c.showModelTips("由于您拒绝授权，因此无法选择地点"));
        }
    });
}

function n(t) {
    c.showLoading("正在获取验证码..."), wx.request({
        url: h.globalData.host + "/enroll/v1/code",
        data: {
            cid: t.data.cid,
            phone: t.data.phone,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(e) {
            c.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta ? d(t) : c.showFailedToast("获取验证码失败，请重试。", e.data.msg) : c.login(function() {
                n(t);
            });
        },
        fail: function(t) {
            c.hideLoading(), c.showFailedToast("获取验证码失败，请重试");
        }
    });
}

function d(t) {
    var e = t.data.verifyCodeCountdownNum - 1;
    e > 0 ? (t.setData({
        verifyCodeCountdownNum: e,
        verifyCodeText: e + "后重新获取"
    }), setTimeout(function() {
        d(t);
    }, 1e3)) : t.setData({
        verifyCodeCountdownNum: 60,
        verifyCodeText: "获取验证码"
    });
}

var l, r = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, c = require("../../utils/util.js"), u = require("../../tmp/tmp.js"), h = getApp();

Page((l = {
    data: {
        title: "",
        rule: "",
        titleEmpty: !0,
        ruleEmpty: !0,
        startDate: "",
        endDate: "",
        endTime: "23:59",
        actStartTime: "00:00",
        actEndTime: "23:59",
        limitCustom: !0,
        limit: 10,
        limitEmpty: !1,
        banner: null,
        visibility: [ "管理员可见（保护隐私）", "任何人可见（谨慎选择）", "报名参与人可见" ],
        visibilityIndex: 0,
        userVisible: [ "什么都不显示", "人数、头像和昵称", "人数和头像", "人数" ],
        userVisibleIndex: 1,
        tabs: [ {
            field_key: 1,
            field_name: "姓名",
            status: 1,
            require: 1,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 2,
            field_name: "手机号",
            status: 0,
            require: 1,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 3,
            field_name: "微信号",
            status: 0,
            require: 1,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 4,
            field_name: "收货地址",
            status: 0,
            require: 1,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 5,
            field_name: "邮编",
            status: 0,
            require: 1,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 6,
            field_name: "备注",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 7,
            field_name: "身份证号",
            status: 0,
            require: 1,
            field_len: 50,
            field_type: 0
        } ],
        signName: c.getStorage("userInfo").nickName,
        huomaDialog: !1,
        huoma: h.globalData.huoma,
        pics: [],
        showVerifyCode: !1,
        verifyCode: "",
        verifyCodeEmpty: !0,
        verifyCodeCountdownNum: 60,
        verifyCodeText: "获取验证码",
        phone: "",
        phoneEmpty: !0,
        noAuthPhone: null,
        showMore: !0,
        onBehalf: !1,
        itemLimit: [ "无限制", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40 ],
        itemLimitIndex: 0,
        behalfLimit: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 500 ],
        behalfIndex: 0,
        fieldType: h.fieldType,
        role: [ "个人信息", "已认证信息" ],
        roleIndex: 0
    },
    onLoad: function(t) {
        c.userInfo(this);
        var e = new Date();
        if (e.setYear(e.getFullYear() + 5), console.log(t.eid), t.eid) {
            var a = !1;
            (D = this.data.tabs)[0].status = 0, t.cid && (a = !0), this.setData({
                eid: t.eid,
                maxDate: c.formatDate(e, "yyyy-MM-dd"),
                tabs: D,
                checkinHide: a
            }), i(this);
        } else {
            var s = c.getStorage("enroll");
            (e = new Date()).setYear(e.getFullYear() + 5);
            var o = c.formatDate(new Date(1e3 * s.start_time), "yyyy-MM-dd"), n = c.formatDate(new Date(1e3 * s.start_time), "HH:mm"), d = c.formatDate(new Date(1e3 * s.end_time), "yyyy-MM-dd"), l = c.formatDate(new Date(1e3 * s.end_time), "HH:mm"), r = c.formatDate(new Date(1e3 * s.act_start), "yyyy-MM-dd"), h = c.formatDate(new Date(1e3 * s.act_start), "HH:mm"), f = c.formatDate(new Date(1e3 * s.act_end), "yyyy-MM-dd"), m = c.formatDate(new Date(1e3 * s.act_end), "HH:mm"), g = this, p = s.req_info, D = g.data.tabs;
            this.setData({
                tmpTabs: s.req_info
            });
            for (var v = 0; v < D.length; v++) for (var y = 0; y < p.length; y++) D[v].field_key == p[y].field_key && (D[v] = p[y], 
            p.splice(y, 1));
            var w = D.concat(p);
            this.setData({
                eid: t.eid,
                title: s ? s.title : "",
                titleDefault: s ? s.title : "",
                rule: s ? s.content : "",
                ruleDefault: s ? s.content : "",
                start_time: s.start_time,
                startDate: o,
                startTime: n,
                endDate: d,
                endTime: l,
                actStartDate: r,
                actStartTime: h,
                actEndDate: f,
                actEndTime: m,
                maxDate: c.formatDate(e, "yyyy-MM-dd"),
                banner: s.banner,
                limit: s.limit,
                count: s.count,
                selectTabs: c.setTabsInfo(g, D),
                tabs: w,
                userVisibleIndex: s.user_visible,
                visibilityIndex: parseInt(s.visibility),
                limitCustom: 0 != s.limit,
                titleEmpty: !s && !s.title,
                ruleEmpty: !s && !s.content,
                wxNo: s.wx_no || "",
                fee: parseInt(s.fee) / 100,
                qrcode: s.group_qr,
                onBehalf: s.on_behalf_limit > 0,
                behalfIndex: c.getBeHalfIndex(s.on_behalf_limit),
                canQuit: s.can_quit,
                longitude: s.longitude,
                latitude: s.latitude,
                address: s.address,
                phone: c.getStorage("phone") || "",
                phoneDefault: c.getStorage("phone") || "",
                verifyCode: c.getStorage("phone") ? "9999999" : ""
            });
        }
        c.setSignName(this), u.huoma(this), u.fieldType(this);
    },
    onShow: function() {
        var t = wx.getStorageSync("fieldCustom");
        if (t) if (wx.removeStorageSync("fieldCustom"), this.data.tabsEdit) {
            for (var e = this.data.tabs, a = this.data.tmpTabs, i = 0; i < e.length; i++) if (1 == e[i].edit) {
                e[i] = t;
                for (var s = 0; s < a.length; s++) a[s].field_key == e[i].field_key && (a[s] = t);
            }
            this.setData({
                tabs: e,
                tmpTabs: a,
                tabsEdit: !1
            }), c.setTabsInfo(this, e);
        } else {
            e = this.data.tabs, c.getMax(e);
            t.field_key = c.uuid(), this.setData({
                tabs: this.data.tabs.concat(t)
            });
        } else {
            for (var i = 0, o = (e = this.data.tabs).length; i < o; i++) e[i].edit = !1;
            this.setData({
                tabs: e
            });
        }
        var n = c.getStorage("good_index");
        if (void 0 != n) {
            var d = this.data.goods || [], l = c.getStorage("good_pics") || [];
            d && d[n] && (d[n].pics = l, this.setData({
                goods: d
            }));
        }
    },
    chooseLocation: function() {
        o(this);
    },
    inputAddress: function(t) {
        this.setData({
            address: t.detail.value
        });
    },
    clearAddress: function(t) {
        this.setData({
            address: ""
        });
    },
    inputTitle: function(t) {
        this.setData({
            title: t.detail.value,
            titleEmpty: 0 == t.detail.value.length
        });
    },
    clearTitle: function() {
        this.setData({
            title: "",
            titleDefault: "",
            titleEmpty: !0
        });
    },
    inputLimit: function(t) {
        this.setData({
            limit: t.detail.value,
            limitEmpty: 0 == t.detail.value.length
        });
    },
    clearLimit: function() {
        this.setData({
            limit: "",
            limitEmpty: !0
        });
    },
    inputRule: function(t) {
        this.setData({
            rule: t.detail.value,
            ruleEmpty: 0 == t.detail.value.length
        });
    },
    clearRule: function() {
        this.setData({
            rule: "",
            ruleDefault: "",
            ruleEmpty: !0
        });
    },
    changeStartDate: function(t) {
        t.detail.value, this.data.endDate;
        this.setData({
            startDate: t.detail.value
        });
    },
    changeEndDate: function(t) {
        this.data.startDate, t.detail.value;
        this.setData({
            endDate: t.detail.value
        });
    },
    changeStartTime: function(t) {
        t.detail.value;
        this.setData({
            startTime: t.detail.value
        });
    },
    changeEndTime: function(t) {
        t.detail.value;
        this.setData({
            endTime: t.detail.value
        });
    },
    changeActVisible: function(t) {
        this.setData({
            actVisible: t.detail.value
        });
    },
    changeActStartDate: function(t) {
        this.setData({
            actStartDate: t.detail.value
        });
    },
    changeActEndDate: function(t) {
        this.setData({
            actEndDate: t.detail.value
        });
    },
    changeActStartTime: function(t) {
        this.setData({
            actStartTime: t.detail.value
        });
    },
    changeActEndTime: function(t) {
        this.setData({
            actEndTime: t.detail.value
        });
    },
    changeLimit: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            limitCustom: 2 == e
        });
    },
    changeVisibility: function(t) {
        this.setData({
            visibilityIndex: parseInt(t.detail.value)
        });
    },
    inputWxno: function(t) {
        this.setData({
            wxNo: t.detail.value.trim()
        });
    },
    clearWxno: function() {
        this.setData({
            wxNo: "",
            defaultWxNo: ""
        });
    },
    changeVerify: function() {
        if (this.data.count > 0 && this.data.onVerify) return c.showModelTips("已有人参与的报名，不允许再修改此开关状态。"), 
        void this.setData({
            onVerify: this.data.onVerify
        });
        this.setData({
            onVerify: !this.data.onVerify
        });
    },
    changePublic: function() {
        this.data.isPublic ? this.setData({
            isPublic: !1
        }) : 2 == this.data.authInfo.auth_status ? (c.showModelTips("设为公开活动后，该活动会出现在你的个人主页。"), 
        this.setData({
            isPublic: !0
        })) : (wx.showModal({
            title: "温馨提示",
            content: "你还未认证，仅认证过的用户才可以使用该功能，请知晓。",
            confirmText: "立即认证",
            confirmColor: "#12b7f5",
            success: function(t) {
                t.confirm && c.toPersonal();
            }
        }), this.setData({
            isPublic: !1
        }));
    },
    changeUserVisible: function(t) {
        var e = t.detail.value;
        this.setData(r({
            userVisibleIndex: e
        }, 0 == e || 3 == e ? {
            visibilityIndex: 0
        } : {}));
    },
    toCustom: function() {
        this.setData({
            tabsEdit: !1
        }), wx.navigateTo({
            url: "/pages/customfield/customfield"
        });
    },
    getPhoneNumber: function(t) {
        var e = t.detail.iv, a = t.detail.encryptedData, i = this;
        t.detail.errMsg.indexOf("fail") > 0 ? (console.log("fail   "), i.setData({
            noAuthPhone: !0
        })) : (c.showLoading("正在获取手机号"), wx.request({
            url: h.globalData.host + "/common/decrypt",
            data: {
                encrypted_data: a,
                iv: e,
                access_token: wx.getStorageSync("accessToken")
            },
            method: "POST",
            success: function(e) {
                if (console.log("======== 解密手机号： "), console.log(e), c.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                    var a = e.data.data.phoneNumber;
                    i.setData({
                        phone: a,
                        phoneDefault: a,
                        verifyCode: "9999999"
                    }), c.setStorage("phone", a);
                } else i.setData({
                    noAuthPhone: !0
                }); else c.login(function() {
                    i.getPhoneNumber(t);
                });
            },
            fail: function(t) {
                c.hideLoading(), c.showFailedToast("获取验证码失败，请重试");
            }
        }));
    },
    inputPhone: function(t) {
        var e = t.detail.value, a = c.getStorage("phone");
        this.setData({
            phone: e,
            noAuthPhone: e != a,
            verifyCode: "",
            showVerifyCode: e.length > 0 && e != this.data.originPhone
        });
    },
    clearPhone: function() {
        this.setData({
            phone: "",
            phoneDefault: "",
            verifyCode: "",
            phoneEmpty: !0,
            noAuthPhone: !1,
            showVerifyCode: !1
        });
    },
    getVerifyCode: function(t) {
        var e = this.data.phone;
        c.isTextEmpty(e) ? c.showModelTips("请补充发起人手机号信息") : (this.setData({
            phone: e
        }), n(this));
    },
    inputVerifyCode: function(t) {
        this.setData({
            verifyCode: t.detail.value,
            verifyCodeEmpty: 0 == t.detail.value.length
        });
    },
    clearVerifyCode: function() {
        this.setData({
            verifyCode: "",
            verifyCodeEmpty: !0
        });
    },
    showMore: function() {
        var t = this.data.showMore;
        this.setData({
            showMore: !t
        });
    },
    chooseImage: function(t) {
        c.buttonClicked(this);
        var e = this, a = t.currentTarget.dataset.url, i = t.currentTarget.dataset.type, o = this.data.pics;
        if (a) wx.previewImage({
            urls: "pic" == i ? o : [ a ],
            current: a
        }); else {
            if ("pic" == i && o.length > 8) return void c.showModelTips("图片最多只能上传9张");
            var n = 1;
            "pic" == i && (n = 9 - o.length), c.showLoading("上传中..."), wx.chooseImage({
                count: n,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(t) {
                    var a = t.tempFilePaths;
                    e.setData({
                        tempPaths: a,
                        tempIndex: 0
                    }), s(e, i, a, 0);
                },
                fail: function() {
                    c.hideLoading();
                }
            });
        }
    },
    removeImg: function(t) {
        var e = t.currentTarget.dataset.type;
        if ("banner" == e) this.setData({
            banner: null
        }); else if ("qrcode" == e) this.setData({
            qrcode: null
        }); else {
            var a = t.currentTarget.dataset.index, i = this.data.pics;
            i.splice(a, 1), this.setData({
                pics: i
            });
        }
    },
    openUiFieldType: function() {
        this.setData({
            fieldTypeDialog: !0,
            ruleDefault: this.data.rule
        });
    },
    huomaDialog: function() {
        this.setData({
            huomaDialog: !0
        });
    },
    toEditTab: function(t, e) {
        var a = this.data.tabs;
        a[t].edit = !0, this.setData({
            tabsEdit: !0,
            tabs: a
        }), c.setStorage("tabCurrent", a[t]), wx.navigateTo({
            url: "/pages/customfield/customfield?edit=true"
        });
    },
    changeTabs: function(t) {
        var e = this, a = t.currentTarget.dataset.index;
        if (console.log(e.data), e.data.cid && 0 == a) c.showModelTips("姓名为必填，且不可编辑"); else {
            var i = this.data.tabs, s = this.data.tmpTabs || [];
            if (i[a].status) {
                var o = [ "不选", "作为选填项", "编辑" ], n = 1;
                0 == i[a].require && (o = [ "不选", "作为必填项", "编辑" ], n = 0), wx.showActionSheet({
                    itemList: o,
                    success: function(t) {
                        if (2 == t.tapIndex) e.toEditTab(a, t); else if (1 == t.tapIndex) {
                            i[a].require = n ? 0 : 1;
                            for (o = 0; o < s.length; o++) s[o].field_key ? i[a].field_key == s[o].field_key && (s[o].require = i[a].require) : i[a].field_name == s[o].field_name && (s[o].require = i[a].require);
                            e.setData({
                                tmpTabs: s
                            }), c.setTabsInfo(e, i);
                        } else {
                            i[a].require = t.tapIndex ? 0 : 1, i[a].status = !i[a].status;
                            for (var o = 0; o < s.length; o++) s[o].field_key ? i[a].field_key == s[o].field_key && s.splice(o, 1) : i[a].field_name == s[o].field_name && s.splice(o, 1);
                            e.setData({
                                tmpTabs: s
                            }), c.setTabsInfo(e, i, a);
                        }
                    },
                    fail: function(t) {}
                });
            } else wx.showActionSheet({
                itemList: [ "作为必填项", "作为选填项", "编辑" ],
                success: function(t) {
                    2 == t.tapIndex ? e.toEditTab(a, t) : (i[a].require = t.tapIndex ? 0 : 1, i[a].status = !i[a].status, 
                    s.push(i[a]), e.setData({
                        tmpTabs: s
                    }), c.setTabsInfo(e, i, a));
                },
                fail: function(t) {}
            });
        }
    },
    changeOnBehalf: function() {
        if (this.data.count > 0 && this.data.onBehalf) return c.showModelTips("已开启的代人报名活动，不允许再修改此开关状态。"), 
        void this.setData({
            onBehalf: this.data.onBehalf
        });
        this.setData({
            onBehalf: !this.data.onBehalf,
            behalfIndex: 0
        });
    },
    changeBehalfLimit: function(t) {
        console.log(t.detail), this.setData({
            behalfIndex: parseInt(t.detail.value)
        });
    },
    changeItemLimit: function() {
        this.setData({
            itemLimit: !this.data.itemLimit
        });
    },
    changeCanQuit: function(t) {
        this.setData({
            canQuit: !this.data.canQuit
        });
    }
}, t(l, "changeItemLimit", function(t) {
    this.setData({
        itemLimitIndex: t.detail.value
    });
}), t(l, "changeRole", function(t) {
    var e = t.detail.value;
    if (1 == e && 2 != this.data.authInfo.auth_status) return wx.showModal({
        title: "温馨提示",
        content: "你还未认证，仅认证过的用户才可以使用该功能，请知晓。",
        confirmText: "立即认证",
        confirmColor: "#12b7f5",
        success: function(t) {
            t.confirm && c.toPersonal();
        }
    }), void this.setData({
        roleIndex: 0
    });
    0 == e && 1 == this.data.enroll.role && this.setData({
        phone: "",
        phoneDefault: "",
        noAuthPhone: null
    }), this.setData({
        roleIndex: e
    });
}), t(l, "addGood", function() {
    var t = this.data.goods;
    t.length > 39 ? c.showModelTips("项目总数不能超过40个") : (t.push({
        name: "",
        desc: "",
        fee: 100,
        count: "",
        pics: []
    }), this.setData({
        goods: t
    }));
}), t(l, "deleteGood", function(t) {
    var e = t.currentTarget.dataset.index, a = this.data.goods;
    if (1 != a.length) if (this.data.count > 0) c.showModelTips("此报名已有人参与，不能删除项目~"); else {
        var i = this;
        wx.showModal({
            title: "删除确认",
            content: "确认要删除此项目吗？",
            showCancel: !0,
            success: function(t) {
                t.confirm && (0 == i.data.count && i.setData({
                    replace: 1
                }), a.splice(e, 1), i.setData({
                    goods: a
                }));
            }
        });
    } else c.showModelTips("最少需要有一个项目");
}), t(l, "toUploadPics", function(t) {
    c.buttonClicked(this);
    var e = t.currentTarget.dataset.index, a = this.data.goods[e].pics;
    c.setStorage("good_index", e), c.setStorage("good_pics", a), wx.navigateTo({
        url: "/subpackage/uploadimages/uploadimages"
    });
}), t(l, "inputGood", function(t) {
    var e = t.currentTarget.dataset, a = e.index, i = e.name, s = this.data.goods, o = t.detail.value;
    if ("count" != i && "stock_limit" != i || (o = parseInt(o)), "fee" == i) {
        o = Number(o);
        o = isNaN(o) ? 1 : o.toFixed(2);
    }
    s[a][i] = o, this.setData({
        goods: s
    });
}), t(l, "clearGood", function(t) {
    var e = t.currentTarget.dataset, a = e.index, i = e.name, s = this.data.goods;
    s[a][i] = "", this.setData({
        goods: s
    });
}), t(l, "authDialogTips", function() {
    c.authDialogTips(this.data.authInfo, this.data.roleIndex);
}), t(l, "updateEnroll", function(t) {
    if (c.postFormId(t.detail.formId), !this.data.buttonClicked) if (c.buttonClicked(this), 
    c.isTextEmpty(this.data.title)) c.showModelTips("请输入标题"); else {
        var a = c.hasSensitiveWords(this.data.title);
        if (a) return c.showModelTips("标题包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
            title: c.replaceAll(this.data.title, a),
            titleDefault: c.replaceAll(this.data.title, a)
        });
        var i = c.hasSensitiveWords(this.data.rule);
        if (i) return c.showModelTips("报名描述包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
            rule: c.replaceAll(this.data.rule, i),
            ruleDefault: c.replaceAll(this.data.rule, i)
        });
        var s = this.data.limit;
        if (isNaN(s) || 0 == s && this.data.limitCustom) c.showModelTips("请输入报名人数"); else if (this.data.limitCustom && s < this.data.count) c.showModelTips("报名人数上限不能小于已报名人数"); else if (new Date().getTime() >= 1e3 * (c.getUTCDateInSeconds(this.data.endDate) + c.getTimeInSeconds(this.data.endTime))) c.showModelTips("结束时间必须大于当前时间"); else {
            for (var o = this.data.goods, n = o.length, d = 0, l = !1, r = !1, u = 0, f = 0; f < n; f++) {
                var m = o[f];
                "" == m.name && (r = !0), "" == m.desc && (r = !0), "" != m.count && 0 != m.count || (r = !0), 
                m.fee > 0 && m.fee < .5 && (u = m.fee), d += m.count * m.fee, m.stock_limit > m.count && (l = !0);
            }
            if (r) c.showModelTips("请把报名项目名称、描述、总数据填写完整，项目图片为必填项"); else if (l) c.showModelTips("每人限报数量必须小于项目总数量"); else if (u) c.showModelTips("报名项目价格必须大于0.5元"); else if (n < this.data.itemLimitIndex) c.showModelTips("参与者可报名项目数超过了创建的总报名项目数，请减少参与者可报名项目数"); else if (d > 5e5) c.showModelTips("暂时只支持总金额小于500000元的报名，即：所有项目金额总和 <= 500000 元"); else {
                if (0 == this.data.roleIndex) {
                    if ("" == this.data.phone) return void c.showModelTips("请补充发起人手机号信息");
                    var g = c.getStorage("phone");
                    if (this.data.phone == g && g) this.setData({
                        verifyCode: "9999999"
                    }); else if ("" == this.data.verifyCode) return void c.showModelTips("请填写手机验证码");
                }
                var p = this.data.wxNo;
                if (c.isTextEmpty(p) || h.globalData.wxReg.test(p)) {
                    var D = c.hasSensitiveWords(this.data.signName);
                    if (D) return c.showModelTips("署名包含敏感词，已经自动处理为*，请重新提交"), void this.setData({
                        signName: c.replaceAll(this.data.signName, D)
                    });
                    var v = c.hasSensitiveWords(this.data.wxNo);
                    if (v) return c.showModelTips("微信号包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                        wxNo: c.replaceAll(this.data.wxNo, v),
                        defaultWxNo: c.replaceAll(this.data.wxNo, v)
                    });
                    c.removeStorage("good_pics"), c.removeStorage("good_index"), e(this);
                } else c.showModelTips("请填写正确的微信号");
            }
        }
    }
}), t(l, "deleteEnroll", function() {
    var t = this;
    wx.showModal({
        title: "确认要删除这个报名表吗？",
        content: "如果删除本报名表，所有的数据将一并删除。",
        confirmColor: "#fa766f",
        confirmText: "删除",
        success: function(e) {
            e.confirm && a(t);
        }
    });
}), t(l, "toProtocol", function() {
    wx.navigateTo({
        url: "/pages/webview/webview?url=https://mp.weixin.qq.com/s/Mn_dZeERRo919Q8PG3d6lw"
    });
}), l));