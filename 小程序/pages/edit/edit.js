function e(t) {
    d.showLoading("正在更新报名表");
    var a = d.resetTabs(t.data.tmpTabs, "edit"), i = d.getUTCDateInSeconds(t.data.startDate), n = d.getTimeInSeconds(t.data.startTime), s = d.getUTCDateInSeconds(t.data.endDate), o = d.getTimeInSeconds(t.data.endTime), l = d.getUTCDateInSeconds(t.data.actStartDate), r = d.getTimeInSeconds(t.data.actStartTime), f = d.getUTCDateInSeconds(t.data.actEndDate), c = d.getTimeInSeconds(t.data.actEndTime), h = t.data.fee;
    h = h ? Math.round(100 * Number(h)) : 0;
    var m = t.data.authInfo, p = m.name, g = t.data.tapIndex, y = t.data.phone, D = t.data.roleIndex, _ = t.data.wxNo, v = Number(t.data.verifyCode), w = {
        eid: t.data.eid,
        title: t.data.title,
        content: t.data.rule,
        end_time: s + o,
        act_start: t.data.actVisible ? l + r : 0,
        act_end: t.data.actVisible ? f + c : 0,
        banner: t.data.banner ? t.data.banner : "",
        user_visible: parseInt(t.data.userVisibleIndex),
        visibility: t.data.userVisibleIndex ? parseInt(t.data.visibilityIndex) : 0,
        limit: parseInt(t.data.limit),
        req_info: a,
        sign_name: p && g ? p : t.data.signName,
        wx_no: _,
        group_qr: t.data.qrcode || "",
        pics: t.data.pics,
        on_behalf_limit: t.data.onBehalf ? t.data.behalfLimit[t.data.behalfIndex] : 0,
        version: u.globalData.version,
        can_quit: t.data.canQuit ? 1 : 0,
        address: t.data.address,
        longitude: t.data.longitude,
        latitude: t.data.latitude,
        verify: t.data.onVerify ? 1 : 0,
        is_public: t.data.isPublic ? 1 : 0,
        role: parseInt(t.data.roleIndex),
        phone: y,
        code: v,
        queue: t.data.queue ? 1 : 0,
        access_token: wx.getStorageSync("accessToken")
    };
    0 == t.data.count && (w.start_time = i + n, w.fee = h, 1 == D ? (w.phone = m.phone, 
    w.code = 9999999, w.wx_no = m.wx_no) : (y = d.getStorage("phone"), t.data.phone == y ? (w.phone = y, 
    w.code = 9999999) : (w.phone = t.data.phone, w.code = v))), wx.request({
      url: u.globalData.host + "/SignUpForm/UpdateActive",
        data: w,
        method: "POST",
        success: function(i) {
            d.hideLoading(), -500 != i.data.sta ? 0 == i.data.sta ? setTimeout(function() {
                wx.navigateBackMiniProgram && (t.data.cid || "checkin" == t.data.from) ? wx.navigateBackMiniProgram({
                    extraData: {
                        eid: t.data.eid,
                        req_info: a
                    },
                    success: function(e) {}
                }) : wx.navigateBack({
                    delta: 1
                });
            }, 1500) : d.showFailedToast(i.data.msg ? i.data.msg : "更新报名表失败，请重试") : d.login(function() {
                e(t, options);
            });
        },
        fail: function(e) {
            d.showFailedToast("更新报名表失败，请重试");
        }
    });
}

function t(e) {
    d.showLoading("正在删除报名表"), wx.request({
        url: u.globalData.host + "/enroll/v1/remove",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            eid: e.data.eid
        },
        method: "POST",
        success: function(a) {
            d.hideLoading(), -500 != a.data.sta ? 0 == a.data.sta ? (d.showToast("报名表删除成功"), 
            wx.switchTab({
                url: "/pages/index/index"
            })) : d.showFailedToast("报名表删除失败，", a.data.msg) : d.login(function() {
                t(e);
            });
        },
        fail: function(e) {
            d.hideLoading(), d.showFailedToast("报名表删除失败");
        }
    });
}

function a(e) {
    d.showLoading("正在加载数据"), wx.request({
      url: u.globalData.host + "/SignUpForm/Detail",
        data: {
            eid: e.data.eid,
            access_token: d.getToken()
        },
        method: "GET",
        success: function(t) {
            if (d.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                var i = t.data.data, n = i.req_info, s = e.data.tabs;
                if (e.setData({
                    tmpTabs: n
                }), n[0] && n[0].field_key) for (o = 0; o < s.length; o++) for (l = 0; l < n.length; l++) s[o].field_key == n[l].field_key && (s[o] = n[l], 
                n.splice(l, 1)); else for (var o = 0; o < s.length; o++) for (var l = 0; l < n.length; l++) s[o].field_name == n[l].field_name && (s[o] = n[l], 
                n.splice(l, 1));
                var r = s.concat(n), f = d.formatDate(new Date(1e3 * i.start_time), "yyyy-MM-dd"), c = d.formatDate(new Date(1e3 * i.start_time), "HH:mm"), h = d.formatDate(new Date(1e3 * i.end_time), "yyyy-MM-dd"), m = d.formatDate(new Date(1e3 * i.end_time), "HH:mm"), p = i.act_start ? d.formatDate(new Date(1e3 * i.act_start), "yyyy-MM-dd") : f, g = i.act_start ? d.formatDate(new Date(1e3 * i.act_start), "HH:mm") : c, y = i.act_start ? d.formatDate(new Date(1e3 * i.act_end), "yyyy-MM-dd") : h, D = i.act_start ? d.formatDate(new Date(1e3 * i.act_end), "HH:mm") : m, _ = u.globalData.wxReg, v = i.wx_no;
                _.test(v) || (i.wx_no = ""), e.setData({
                    title: i ? i.title : "",
                    titleDefault: i ? i.title : "",
                    rule: i ? i.content : "",
                    ruleDefault: i ? i.content : "",
                    start_time: i.start_time,
                    startDate: f,
                    startTime: c,
                    endDate: h,
                    endTime: m,
                    actStartDate: p,
                    actStartTime: g,
                    actEndDate: y,
                    actEndTime: D,
                    actVisible: !!i.act_start,
                    banner: i.banner,
                    limit: i.limit,
                    count: i.count,
                    userVisibleIndex: i.user_visible,
                    visibilityIndex: i.visibility,
                    limitCustom: 0 != i.limit,
                    titleEmpty: !i && !i.title,
                    ruleEmpty: !i && !i.content,
                    wxNo: i.wx_no || "",
                    defaultWxNo: i.wx_no || "",
                    tabs: r,
                    fee: i.fee / 100,
                    feeDefault: i.fee / 100,
                    qrcode: i.group_qr,
                    cid: i.cid,
                    pics: i.pics || [],
                    onBehalf: i.on_behalf_limit > 0,
                    behalfIndex: d.getBeHalfIndex(i.on_behalf_limit),
                    canQuit: i.can_quit,
                    longitude: i.longitude,
                    latitude: i.latitude,
                    address: i.address,
                    showBehalf: !(i.on_behalf_limit > 0),
                    onVerify: i.verify,
                    phone: i.phone || "",
                    phoneDefault: i.phone || "",
                    verifyCode: i.phone ? "9999999" : "",
                    noAuthPhone: !i.phone && null,
                    feeVisible: !!i.fee,
                    isPublic: !!i.is_public,
                    roleIndex: i.role,
                    queue: i.queue,
                    enroll: i
                }), d.setTabsInfo(e, r);
            } else d.showFailedToast("报名表数据获取失败", t.data.msg); else d.login(function() {
                a(e);
            });
        },
        fail: function(e) {
            d.hideLoading(), d.showFailedToast("报名表数据获取失败");
        }
    });
}

function i(e, t, a, n) {
    var s = a[n];
    wx.uploadFile({
      url: u.globalData.host + "/File/Upload",
        filePath: s,
        name: "file",
        formData: {
            access_token: d.getStorage("accessToken"),
            type: t
        },
        success: function(s) {
            "pic" != t && d.hideLoading();
            var o = s.data, l = JSON.parse(o);
            if (0 == l.sta) {
                var r = l.data.urls[0];
                if ("banner" == t) e.setData({
                    banner: r
                }); else if ("qrcode" == t) e.setData({
                    qrcode: r
                }); else if ("pic" == t) {
                    var u = e.data.pics;
                    u.push(r), e.setData({
                        pics: u
                    }), a.length - 1 > n ? i(e, t, a, n + 1) : d.hideLoading();
                }
            } else d.showFailedToast(l.msg);
        },
        fail: function(e) {
            d.hideLoading(), d.showFailedToast("上传图片失败，请重试");
        }
    });
}

function n(e) {
    wx.chooseLocation({
        success: function(t) {
            console.log(t), e.setData({
                longitude: t.longitude,
                latitude: t.latitude,
                address: t.name
            });
        },
        fail: function(t) {
            var a = t.errMsg;
            console.log(a), a && (a.indexOf("fail auth") > -1 || a.indexOf("fail:auth") > -1) && (wx.openSetting ? wx.showModal({
                title: "提示",
                content: "选择地点需要授权报名工具访问您的地理位置。",
                cancelText: "不想授权",
                confirmText: "去授权",
                confirmColor: "#12b7f5",
                success: function(t) {
                    t.confirm ? wx.openSetting({
                        complete: function(t) {
                            n(e);
                        }
                    }) : t.cancel && d.showModelTips("由于您拒绝授权，因此无法选择地点");
                }
            }) : d.showModelTips("由于您拒绝授权，因此无法选择地点"));
        }
    });
}

function s(e) {
    d.showLoading("正在获取验证码..."), wx.request({
        url: u.globalData.host + "/enroll/v1/code",
        data: {
            cid: e.data.cid,
            phone: e.data.phone,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(t) {
            d.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta ? o(e) : d.showFailedToast("获取验证码失败，请重试。", t.data.msg) : d.login(function() {
                s(e);
            });
        },
        fail: function(e) {
            d.hideLoading(), d.showFailedToast("获取验证码失败，请重试");
        }
    });
}

function o(e) {
    var t = e.data.verifyCodeCountdownNum - 1;
    t > 0 ? (e.setData({
        verifyCodeCountdownNum: t,
        verifyCodeText: t + "后重新获取"
    }), setTimeout(function() {
        o(e);
    }, 1e3)) : e.setData({
        verifyCodeCountdownNum: 60,
        verifyCodeText: "获取验证码"
    });
}

var l = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, d = require("../../utils/util.js"), r = require("../../tmp/tmp.js"), u = getApp();

Page({
    data: {
        title: "",
        rule: "",
        titleEmpty: !0,
        ruleEmpty: !0,
        startDate: "",
        endDate: "",
        endTime: "23:59",
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
            status: 0,
            require: 1,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 2,
            field_name: "性别",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 4,
            options: [ "保密", "男", "女" ]
        }, {
            field_key: 3,
            field_name: "年龄",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 1
        }, {
            field_key: 4,
            field_name: "婚姻状况",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 5,
            field_name: "地址",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 6,
            field_name: "手机号",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 13
        }, {
            field_key: 7,
            field_name: "QQ号",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 1
        }, {
            field_key: 8,
            field_name: "微信号",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 19,
            field_name: "身份证号",
            status: 0,
            require: 1,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 9,
            field_name: "邮箱",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 10,
            field_name: "学校",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 11,
            field_name: "年级",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 12,
            field_name: "班级",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 13,
            field_name: "学号",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 14,
            field_name: "工作单位",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 15,
            field_name: "部门",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 16,
            field_name: "职位",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 17,
            field_name: "工号",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        }, {
            field_key: 18,
            field_name: "备注",
            status: 0,
            require: 0,
            field_len: 50,
            field_type: 0
        } ],
        signName: d.getStorage("userInfo").nickName,
        huomaDialog: !1,
        huoma: u.globalData.huoma,
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
        behalfLimit: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 500 ],
        behalfIndex: 0,
        fieldType: u.fieldType,
        role: [ "个人信息", "已认证信息" ],
        roleIndex: 0,
        queue: !1
    },
    onLoad: function(e) {
        d.userInfo(this);
        var t = new Date();
        if (t.setYear(t.getFullYear() + 5), console.log(e.eid), e.eid) {
            var i = !1;
            (y = this.data.tabs)[0].status = 0, e.cid && (i = !0), this.setData({
                eid: e.eid,
                maxDate: d.formatDate(t, "yyyy-MM-dd"),
                tabs: y,
                checkinHide: i,
                from: e.from
            }), a(this);
        } else {
            var n = d.getStorage("enroll");
            (t = new Date()).setYear(t.getFullYear() + 5);
            var s = d.formatDate(new Date(1e3 * n.start_time), "yyyy-MM-dd"), o = d.formatDate(new Date(1e3 * n.start_time), "HH:mm"), l = d.formatDate(new Date(1e3 * n.end_time), "yyyy-MM-dd"), u = d.formatDate(new Date(1e3 * n.end_time), "HH:mm"), f = d.formatDate(new Date(1e3 * n.act_start), "yyyy-MM-dd"), c = d.formatDate(new Date(1e3 * n.act_start), "HH:mm"), h = d.formatDate(new Date(1e3 * n.act_end), "yyyy-MM-dd"), m = d.formatDate(new Date(1e3 * n.act_end), "HH:mm"), p = this, g = n.req_info, y = p.data.tabs;
            this.setData({
                tmpTabs: n.req_info
            });
            for (var D = 0; D < y.length; D++) for (var _ = 0; _ < g.length; _++) y[D].field_key == g[_].field_key && (y[D] = g[_], 
            g.splice(_, 1));
            var v = y.concat(g);
            this.setData({
                eid: e.eid,
                title: n ? n.title : "",
                titleDefault: n ? n.title : "",
                rule: n ? n.content : "",
                ruleDefault: n ? n.content : "",
                start_time: n.start_time,
                startDate: s,
                startTime: o,
                endDate: l,
                endTime: u,
                actStartDate: f,
                actStartTime: c,
                actEndDate: h,
                actEndTime: m,
                maxDate: d.formatDate(t, "yyyy-MM-dd"),
                banner: n.banner,
                limit: n.limit,
                count: n.count,
                selectTabs: d.setTabsInfo(p, y),
                tabs: v,
                userVisibleIndex: n.user_visible,
                visibilityIndex: parseInt(n.visibility),
                limitCustom: 0 != n.limit,
                titleEmpty: !n && !n.title,
                ruleEmpty: !n && !n.content,
                wxNo: n.wx_no || "",
                fee: parseInt(n.fee) / 100,
                feeDefault: parseInt(n.fee) / 100,
                qrcode: n.group_qr,
                onBehalf: n.on_behalf_limit > 0,
                behalfIndex: d.getBeHalfIndex(n.on_behalf_limit),
                canQuit: n.can_quit,
                longitude: n.longitude,
                latitude: n.latitude,
                address: n.address,
                phone: d.getStorage("phone") || "",
                phoneDefault: d.getStorage("phone") || "",
                verifyCode: d.getStorage("phone") ? "9999999" : ""
            });
        }
        d.setSignName(this), r.huoma(this), r.fieldType(this);
    },
    onShow: function() {
        var e = wx.getStorageSync("fieldCustom");
        if (e) if (wx.removeStorageSync("fieldCustom"), this.data.tabsEdit) {
            for (var t = this.data.tabs, a = this.data.tmpTabs, i = 0; i < t.length; i++) if (1 == t[i].edit) {
                t[i] = e;
                for (var n = 0; n < a.length; n++) a[n].field_key == t[i].field_key && (a[n] = e);
            }
            this.setData({
                tabs: t,
                tmpTabs: a,
                tabsEdit: !1
            }), d.setTabsInfo(this, t);
        } else {
            t = this.data.tabs, d.getMax(t);
            e.field_key = d.uuid(), this.setData({
                tabs: this.data.tabs.concat(e)
            });
        } else {
            for (var i = 0, s = (t = this.data.tabs).length; i < s; i++) t[i].edit = !1;
            this.setData({
                tabs: t
            });
        }
    },
    chooseLocation: function() {
        n(this);
    },
    changeFeeVisible: function(e) {
        this.setData({
            feeVisible: e.detail.value,
            fee: 0,
            feeDefault: 0
        });
    },
    changeActVisible: function(e) {
        this.setData({
            actVisible: e.detail.value
        });
    },
    changeActStartDate: function(e) {
        this.setData({
            actStartDate: e.detail.value
        });
    },
    changeActEndDate: function(e) {
        this.setData({
            actEndDate: e.detail.value
        });
    },
    changeActStartTime: function(e) {
        this.setData({
            actStartTime: e.detail.value
        });
    },
    changeActEndTime: function(e) {
        this.setData({
            actEndTime: e.detail.value
        });
    },
    inputAddress: function(e) {
        this.setData({
            address: e.detail.value
        });
    },
    clearAddress: function(e) {
        this.setData({
            address: ""
        });
    },
    inputTitle: function(e) {
        this.setData({
            title: e.detail.value,
            titleEmpty: 0 == e.detail.value.length
        });
    },
    clearTitle: function() {
        this.setData({
            title: "",
            titleDefault: "",
            titleEmpty: !0
        });
    },
    inputLimit: function(e) {
        this.setData({
            limit: e.detail.value,
            limitEmpty: 0 == e.detail.value.length
        });
    },
    clearLimit: function() {
        this.setData({
            limit: "",
            limitEmpty: !0
        });
    },
    inputRule: function(e) {
        this.setData({
            rule: e.detail.value,
            ruleEmpty: 0 == e.detail.value.length
        });
    },
    clearRule: function() {
        this.setData({
            rule: "",
            ruleDefault: "",
            ruleEmpty: !0
        });
    },
    changeStartDate: function(e) {
        e.detail.value, this.data.endDate;
        this.setData({
            startDate: e.detail.value
        });
    },
    changeEndDate: function(e) {
        this.data.startDate, e.detail.value;
        this.setData({
            endDate: e.detail.value
        });
    },
    changeStartTime: function(e) {
        e.detail.value;
        this.setData({
            startTime: e.detail.value
        });
    },
    changeEndTime: function(e) {
        e.detail.value;
        this.setData({
            endTime: e.detail.value
        });
    },
    changeLimit: function(e) {
        var t = e.currentTarget.dataset.id;
        this.setData({
            limitCustom: 2 == t
        });
    },
    changeVisibility: function(e) {
        this.setData({
            visibilityIndex: parseInt(e.detail.value)
        });
    },
    inputWxno: function(e) {
        this.setData({
            wxNo: e.detail.value.trim()
        });
    },
    clearWxno: function() {
        this.setData({
            wxNo: "",
            defaultWxNo: ""
        });
    },
    changeVerify: function() {
        if (this.data.count > 0 && this.data.onVerify) return d.showModelTips("已有人参与的报名，不允许再修改此开关状态。"), 
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
        }) : (d.showModelTips("设为公开活动后，该活动会出现在你的个人主页。"), this.setData({
            isPublic: !0
        }));
    },
    changeUserVisible: function(e) {
        var t = e.detail.value;
        this.setData(l({
            userVisibleIndex: t
        }, 0 == t || 3 == t ? {
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
    getPhoneNumber: function(e) {
        var t = e.detail.iv, a = e.detail.encryptedData, i = this;
        e.detail.errMsg.indexOf("fail") > 0 ? (console.log("fail   "), i.setData({
            noAuthPhone: !0
        })) : (d.showLoading("正在获取手机号"), wx.request({
            url: u.globalData.host + "/common/decrypt",
            data: {
                encrypted_data: a,
                iv: t,
                access_token: wx.getStorageSync("accessToken")
            },
            method: "POST",
            success: function(t) {
                if (console.log("======== 解密手机号： "), console.log(t), d.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                    var a = t.data.data.phoneNumber;
                    i.setData({
                        phone: a,
                        phoneDefault: a,
                        verifyCode: "9999999"
                    }), d.setStorage("phone", a);
                } else i.setData({
                    noAuthPhone: !0
                }); else d.login(function() {
                    i.getPhoneNumber(e);
                });
            },
            fail: function(e) {
                d.hideLoading(), d.showFailedToast("获取验证码失败，请重试");
            }
        }));
    },
    inputPhone: function(e) {
        var t = e.detail.value, a = d.getStorage("phone");
        this.setData({
            phone: t,
            noAuthPhone: t != a,
            verifyCode: "",
            showVerifyCode: t.length > 0 && t != this.data.originPhone
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
    getVerifyCode: function(e) {
        var t = this.data.phone;
        d.isTextEmpty(t) ? d.showModelTips("请补充发起人手机号信息") : (this.setData({
            phone: t
        }), s(this));
    },
    inputVerifyCode: function(e) {
        this.setData({
            verifyCode: e.detail.value,
            verifyCodeEmpty: 0 == e.detail.value.length
        });
    },
    clearVerifyCode: function() {
        this.setData({
            verifyCode: "",
            verifyCodeEmpty: !0
        });
    },
    changeQueue: function(e) {
        var t = e.detail.value;
        1 == t && (2 != this.data.authInfo.auth_status ? (wx.showModal({
            title: "温馨提示",
            content: "你还未认证，仅认证过的用户才可以使用该功能，请知晓。",
            confirmText: "立即认证",
            confirmColor: "#12b7f5",
            success: function(e) {
                e.confirm && wx.navigateTo({
                    url: "/subpackage/authentication/authentication"
                });
            }
        }), t = !1) : d.showModelTips("开启此功能后，当活动名额已满时，参与者可以进行报名排队等待。当有名额空出时，系统自动报名成功。活动结束时，如果仍然没有名额，则报名失败，付费报名会自动原路退回报名费。")), 
        this.setData({
            queue: t
        });
    },
    showMore: function() {
        var e = this.data.showMore;
        this.setData({
            showMore: !e
        });
    },
    chooseImage: function(e) {
        d.buttonClicked(this);
        var t = this, a = e.currentTarget.dataset.url, n = e.currentTarget.dataset.type, s = this.data.pics;
        if (a) wx.previewImage({
            urls: "pic" == n ? s : [ a ],
            current: a
        }); else {
            if ("pic" == n && s.length > 8) return void d.showModelTips("图片最多只能上传9张");
            var o = 1;
            "pic" == n && (o = 9 - s.length), d.showLoading("上传中..."), wx.chooseImage({
                count: o,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    var a = e.tempFilePaths;
                    t.setData({
                        tempPaths: a,
                        tempIndex: 0
                    }), i(t, n, a, 0);
                },
                fail: function() {
                    d.hideLoading();
                }
            });
        }
    },
    removeImg: function(e) {
        var t = e.currentTarget.dataset.type;
        if ("banner" == t) this.setData({
            banner: null
        }); else if ("qrcode" == t) this.setData({
            qrcode: null
        }); else {
            var a = e.currentTarget.dataset.index, i = this.data.pics;
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
    toEditTab: function(e, t) {
        var a = this.data.tabs;
        a[e].edit = !0, this.setData({
            tabsEdit: !0,
            tabs: a
        }), d.setStorage("tabCurrent", a[e]), wx.navigateTo({
            url: "/pages/customfield/customfield?edit=true"
        });
    },
    changeTabs: function(e) {
        var t = this, a = e.currentTarget.dataset.index;
        if (console.log(t.data), t.data.cid && 0 == a) d.showModelTips("姓名为必填，且不可编辑"); else {
            var i = this.data.tabs, n = this.data.tmpTabs || [];
            if (i[a].status) {
                var s = [ "不选", "作为选填项", "编辑" ], o = 1;
                0 == i[a].require && (s = [ "不选", "作为必填项", "编辑" ], o = 0), wx.showActionSheet({
                    itemList: s,
                    success: function(e) {
                        if (2 == e.tapIndex) t.toEditTab(a, e); else if (1 == e.tapIndex) {
                            i[a].require = o ? 0 : 1;
                            for (s = 0; s < n.length; s++) n[s].field_key ? i[a].field_key == n[s].field_key && (n[s].require = i[a].require) : i[a].field_name == n[s].field_name && (n[s].require = i[a].require);
                            t.setData({
                                tmpTabs: n
                            }), d.setTabsInfo(t, i);
                        } else {
                            i[a].require = e.tapIndex ? 0 : 1, i[a].status = !i[a].status;
                            for (var s = 0; s < n.length; s++) n[s].field_key ? i[a].field_key == n[s].field_key && n.splice(s, 1) : i[a].field_name == n[s].field_name && n.splice(s, 1);
                            t.setData({
                                tmpTabs: n
                            }), d.setTabsInfo(t, i, a);
                        }
                    },
                    fail: function(e) {}
                });
            } else wx.showActionSheet({
                itemList: [ "作为必填项", "作为选填项", "编辑" ],
                success: function(e) {
                    2 == e.tapIndex ? t.toEditTab(a, e) : (i[a].require = e.tapIndex ? 0 : 1, i[a].status = !i[a].status, 
                    n.push(i[a]), t.setData({
                        tmpTabs: n
                    }), d.setTabsInfo(t, i, a));
                },
                fail: function(e) {}
            });
        }
    },
    changeOnBehalf: function() {
        if (this.data.count > 0 && this.data.onBehalf) return d.showModelTips("已开启的代人报名活动，不允许再修改此开关状态。"), 
        void this.setData({
            onBehalf: this.data.onBehalf
        });
        this.setData({
            onBehalf: !this.data.onBehalf,
            behalfIndex: 0
        });
    },
    changeBehalfLimit: function(e) {
        console.log(e.detail), this.setData({
            behalfIndex: parseInt(e.detail.value)
        });
    },
    changeCanQuit: function(e) {
        this.setData({
            canQuit: !this.data.canQuit
        });
    },
    changeRole: function(e) {
        var t = e.detail.value;
        if (1 == t && 2 != this.data.authInfo.auth_status) return wx.showModal({
            title: "温馨提示",
            content: "你还未认证，仅认证过的用户才可以使用该功能，请知晓。",
            confirmText: "立即认证",
            confirmColor: "#12b7f5",
            success: function(e) {
                e.confirm && d.toPersonal();
            }
        }), void this.setData({
            roleIndex: 0
        });
        0 == t && 1 == this.data.enroll.role && this.setData({
            phone: "",
            phoneDefault: "",
            noAuthPhone: null
        }), this.setData({
            roleIndex: t
        });
    },
    authDialogTips: function() {
        d.authDialogTips(this.data.authInfo, this.data.roleIndex);
    },
    updateEnroll: function(t) {
        if (d.postFormId(t.detail.formId), !this.data.buttonClicked) if (d.buttonClicked(this), 
        d.isTextEmpty(this.data.title)) d.showModelTips("请输入标题"); else {
            var a = d.hasSensitiveWords(this.data.title);
            if (a) return d.showModelTips("标题包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                title: d.replaceAll(this.data.title, a),
                titleDefault: d.replaceAll(this.data.title, a)
            });
            var i = d.hasSensitiveWords(this.data.rule);
            if (i) return d.showModelTips("报名描述包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                rule: d.replaceAll(this.data.rule, i),
                ruleDefault: d.replaceAll(this.data.rule, i)
            });
            s = this.data.limit;
            if (isNaN(s) || 0 == s && this.data.limitCustom) d.showModelTips("请输入报名人数"); else if (this.data.limit > 800 && 2 != this.data.authInfo.auth_status) wx.showModal({
                title: "温馨提示",
                content: "仅认证过的发起者，报名人数才能设置超过800，如有需要，请先去认证。",
                confirmText: "立即认证",
                confirmColor: "#12b7f5",
                success: function(e) {
                    e.confirm && wx.navigateTo({
                        url: "/subpackage/authentication/authentication"
                    });
                }
            }); else if (this.data.limitCustom && s < this.data.count) d.showModelTips("报名人数上限不能小于已报名人数"); else if (new Date().getTime() >= 1e3 * (d.getUTCDateInSeconds(this.data.endDate) + d.getTimeInSeconds(this.data.endTime))) d.showModelTips("结束时间必须大于当前时间"); else {
                var n = this.data.fee, s = parseInt(this.data.limit);
                if (n) {
                    if (n < .5) return void d.showModelTips("付费报名，报名费用必须大于0.5元人民币");
                    if (n > 1e4) return void d.showModelTips("付费报名，报名费用必须小于10000元人民币");
                    if (0 == s || !this.data.limitCustom) return void d.showModelTips("付费的报名需要设置报名人数，且报名人数*报名费用≤500000人民币");
                    if (s > 0 && n * s > 5e5) return void d.showModelTips("报名总金额暂只支持500000元人民币以内，请重新选择人数上限");
                }
                if (!this.data.cid && 0 == this.data.roleIndex) {
                    if ("" == this.data.phone) return void d.showModelTips("请补充发起人手机号信息");
                    var o = d.getStorage("phone");
                    if (this.data.phone == o && o) this.setData({
                        verifyCode: "9999999"
                    }); 
                    // else if ("" == this.data.verifyCode) return void d.showModelTips("请填写手机验证码");
                }
                var l = this.data.wxNo;
                if (d.isTextEmpty(l) || u.globalData.wxReg.test(l)) {
                    var r = d.hasSensitiveWords(this.data.signName);
                    if (r) return d.showModelTips("署名包含敏感词，已经自动处理为*，请重新提交"), void this.setData({
                        signName: d.replaceAll(this.data.signName, r)
                    });
                    var f = d.hasSensitiveWords(this.data.wxNo);
                    if (f) return d.showModelTips("微信号包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                        wxNo: d.replaceAll(this.data.wxNo, f),
                        defaultWxNo: d.replaceAll(this.data.wxNo, f)
                    });
                    e(this);
                } else d.showModelTips("请填写正确的微信号");
            }
        }
    },
    deleteEnroll: function() {
        var e = this;
        wx.showModal({
            title: "确认要删除这个报名表吗？",
            content: "如果删除本报名表，所有的数据将一并删除。",
            confirmColor: "#fa766f",
            confirmText: "删除",
            success: function(a) {
                a.confirm && t(e);
            }
        });
    },
    inputFee: function(e) {
        d.inputFee(this, e);
    },
    clearFee: function() {
        this.setData({
            fee: "",
            feeDefault: "",
            feeEmpty: !0
        });
    },
    toProtocol: function() {
        wx.navigateTo({
            url: "/pages/webview/webview?url=https://mp.weixin.qq.com/s/Mn_dZeERRo919Q8PG3d6lw"
        });
    }
});