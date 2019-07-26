function e(t) {
    var a = d.resetTabs(t.data.tmpTabs, !1, !0), i = t.data.fee;
    i = t.data.feeVisible && i ? Math.round(100 * Number(i)) : 0, d.showLoading("正在创建报名表");
    var s = d.getUTCDateInSeconds(t.data.startDate), n = d.getTimeInSeconds(t.data.startTime), l = d.getUTCDateInSeconds(t.data.endDate), o = d.getTimeInSeconds(t.data.endTime), f = d.getUTCDateInSeconds(t.data.actStartDate), u = d.getTimeInSeconds(t.data.actStartTime), c = d.getUTCDateInSeconds(t.data.actEndDate), h = d.getTimeInSeconds(t.data.actEndTime), m = Number(t.data.verifyCode);
    1 == t.data.isDev && (m = 9999999);
    var _ = t.data.authInfo, p = void 0 === _ ? {} : _, y = p.name, g = t.data.tapIndex, D = t.data.phone, v = t.data.roleIndex, T = t.data.wxNo;
    1 == v && (D = p.phone, m = 9999999, T = p.wx_no),wx.request({
      url: r.globalData.host + "/SignUpForm/Create",
        data: {
            title: t.data.title,
            content: t.data.rule,
            start_time: s + n,
            end_time: l + o,
            act_start: t.data.actVisible ? f + u : 0,
            act_end: t.data.actVisible ? c + h : 0,
            banner: t.data.banner ? t.data.banner : "",
            limit: parseInt(t.data.limit),
            req_info: a,
            user_visible: parseInt(t.data.userVisibleIndex),
            visibility: t.data.userVisibleIndex ? parseInt(t.data.visibilityIndex) : 0,
            sign_name: y && g ? y : t.data.signName,
            wx_no: T,
            group_qr: t.data.qrcode || "",
            fee: i,
            phone: D,
            code: m,
            pics: t.data.pics,
            on_behalf_limit: t.data.onBehalf ? t.data.behalfLimit[t.data.behalfIndex] : 0,
            version: r.globalData.version,
            verify: t.data.onVerify ? 1 : 0,
            can_quit: t.data.canQuit ? 1 : 0,
            address: t.data.address,
            longitude: t.data.longitude,
            latitude: t.data.latitude,
            is_public: t.data.isPublic ? 1 : 0,
            role: parseInt(t.data.roleIndex),
            temp: t.data.temp,
            queue: t.data.queue ? 1 : 0,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(i) {
            d.hideLoading(), -500 != i.data.sta ? 0 == i.data.sta ? i.data.data && wx.showToast({
                title: "创建成功",
                icon: "success",
                success: function() {
                    setTimeout(function() {
                        wx.navigateBackMiniProgram && t.data.cid ? wx.navigateBackMiniProgram({
                            extraData: {
                                eid: i.data.data.eid,
                                req_info: a
                            },
                            success: function(e) {}
                        }) : wx.redirectTo({
                            url: "../detail/detail?eid=" + i.data.data.eid
                        });
                    }, 2500);
                }
            }) : d.showFailedToast("创建报名表失败，请重试。", i.data.msg) : d.login(function() {
                e(t);
            });
        },
        fail: function(e) {
            d.showFailedToast("创建报名表失败，请重试");
        }
    });
}

function t(e) {
    d.showLoading("正在加载数据"), wx.request({
      url: r.globalData.host + "/SignUpForm/Detail",
        data: {
            eid: e.data.eid,
            access_token: d.getToken()
        },
        method: "GET",
        success: function(a) {
            if (d.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                var i = a.data.data, s = i.req_info, n = e.data.tabs;
                if (e.setData({
                    tmpTabs: s
                }), s[0] && s[0].field_key) for (l = 0; l < n.length; l++) for (o = 0; o < s.length; o++) n[l].field_key == s[o].field_key && (n[l] = s[o], 
                s.splice(o, 1)); else for (var l = 0; l < n.length; l++) for (var o = 0; o < s.length; o++) n[l].field_name == s[o].field_name && (n[l] = s[o], 
                s.splice(o, 1));
                var f = n.concat(s), u = d.formatDate(new Date(1e3 * i.start_time), "yyyy-MM-dd"), c = d.formatDate(new Date(1e3 * i.start_time), "HH:mm"), h = d.formatDate(new Date(1e3 * i.end_time), "yyyy-MM-dd"), m = d.formatDate(new Date(1e3 * i.end_time), "HH:mm"), _ = i.act_start ? d.formatDate(new Date(1e3 * i.act_start), "yyyy-MM-dd") : u, p = i.act_start ? d.formatDate(new Date(1e3 * i.act_start), "HH:mm") : c, y = i.act_start ? d.formatDate(new Date(1e3 * i.act_end), "yyyy-MM-dd") : h, g = i.act_start ? d.formatDate(new Date(1e3 * i.act_end), "HH:mm") : m, D = r.globalData.wxReg, v = i.wx_no;
                D.test(v) || (i.wx_no = ""), e.setData({
                    title: i ? i.title : "",
                    titleDefault: i ? i.title : "",
                    rule: i ? i.content : "",
                    ruleDefault: i ? i.content : "",
                    start_time: i.start_time,
                    startDate: u,
                    startTime: c,
                    endDate: h,
                    endTime: m,
                    actStartDate: _,
                    actStartTime: p,
                    actEndDate: y,
                    actEndTime: g,
                    banner: i.banner,
                    limit: e.data.cid ? 0 : 100,
                    count: i.count,
                    userVisible: i.user_visible,
                    visibilityIndex: i.visibility,
                    limitCustom: 0 != i.limit,
                    titleEmpty: !i && !i.title,
                    ruleEmpty: !i && !i.content,
                    wxNo: i.is_owner ? i.wx_no || "" : "",
                    defaultWxNo: i.is_owner ? i.wx_no || "" : "",
                    tabs: f,
                    pics: i.pics,
                    phone: i.is_owner ? i.phone || "" : "",
                    phoneDefault: i.is_owner ? i.phone || "" : "",
                    verifyCode: i.phone ? "9999999" : "",
                    feeVisible: !!i.fee,
                    fee: i.fee / 100,
                    feeDefault: i.fee / 100,
                    address: i.address,
                    longitude: i.longitude,
                    latitude: i.latitude,
                    onVerify: i.verify,
                    onBehalf: i.on_behalf_limit > 0,
                    canQuit: i.can_quit,
                    behalfIndex: d.getBeHalfIndex(i.on_behalf_limit)
                }), d.setTabsInfo(e, f);
            } else d.showFailedToast("报名表数据获取失败", a.data.msg); else d.login(function() {
                t(e);
            });
        },
        fail: function(e) {
            d.hideLoading(), d.showFailedToast("报名表数据获取失败");
        }
    });
}

function a(e) {
    d.showLoading("正在获取验证码..."), wx.request({
        url: r.globalData.host + "/enroll/v1/code",
        data: {
            cid: e.data.cid,
            phone: e.data.phone,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(t) {
            d.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta ? i(e) : d.showFailedToast("获取验证码失败，请重试。", t.data.msg) : d.login(function() {
                a(e);
            });
        },
        fail: function(e) {
            d.hideLoading(), d.showFailedToast("获取验证码失败，请重试");
        }
    });
}

function i(e) {
    var t = e.data.verifyCodeCountdownNum - 1;
    t > 0 ? (e.setData({
        verifyCodeCountdownNum: t,
        verifyCodeText: t + "后重新获取"
    }), setTimeout(function() {
        i(e);
    }, 1e3)) : e.setData({
        verifyCodeCountdownNum: 60,
        verifyCodeText: "获取验证码"
    });
}

function s(e, t, a, i) {
    var n = a[i];
    wx.uploadFile({
      url: r.globalData.host + "/File/Upload",
        filePath: n,
        name: "file",
        formData: {
            access_token: d.getStorage("accessToken"),
            type: t
        },
        success: function(n) {
            "pic" != t && d.hideLoading();
            var l = n.data, o = JSON.parse(l);
            if (0 == o.sta) {
              console.log(o);
                var r = o.data.urls[0];
                if ("banner" == t) e.setData({
                    banner: r
                }); else if ("qrcode" == t) e.setData({
                    qrcode: r
                }); else if ("pic" == t) {
                    var f = e.data.pics;
                    f.push(r), e.setData({
                        pics: f
                    }), a.length - 1 > i ? s(e, t, a, i + 1) : d.hideLoading();
                }
            } else d.showFailedToast(o.msg);
        },
        fail: function(e) {
            d.hideLoading(), d.showFailedToast("上传图片失败，请重试");
        }
    });
}

function n(e) {
    wx.chooseLocation({
        success: function(t) {
            e.setData({
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

var l = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, d = require("../../utils/util.js"), o = require("../../tmp/tmp.js"), r = getApp();

Page({
    data: {
        title: "",
        rule: "",
        titleEmpty: !0,
        ruleEmpty: !0,
        autoFocus: !1,
        startDate: "",
        endDate: "",
        startTime: "00:00",
        endTime: "23:59",
        actStartTime: "00:00",
        actEndTime: "23:59",
        limitCustom: !0,
        limit: 100,
        limitEmpty: !1,
        banner: null,
        selectTabs: "*姓名",
        tmpTabs: [ {
            field_key: 1,
            field_name: "姓名",
            status: 1,
            require: 1,
            field_len: 50,
            field_type: 0
        } ],
        tabs: [ {
            field_key: 1,
            field_name: "姓名",
            status: 1,
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
        visibility: [ "管理员可见（保护隐私）", "任何人可见（谨慎选择）", "报名参与人可见" ],
        visibilityIndex: 0,
        signName: d.getStorage("userInfo").nickName,
        showMore: !0,
        userVisible: [ "什么都不显示", "人数、头像和昵称", "人数和头像", "人数" ],
        userVisibleIndex: 1,
        checkinHide: !1,
        showVerifyCode: !1,
        verifyCode: "",
        verifyCodeEmpty: !0,
        verifyCodeCountdownNum: 60,
        verifyCodeText: "获取验证码",
        phone: "",
        phoneEmpty: !0,
        noAuthPhone: null,
        fee: 1,
        feeDefault: 1,
        huomaDialog: !1,
        huoma: r.globalData.huoma,
        pics: [],
        onBehalf: !1,
        onVerify: !1,
        behalfLimit: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 500 ],
        behalfIndex: 0,
        isDev: d.getStorage("isDev"),
        canQuit: !0,
        address: "",
        longitude: 0,
        latitude: 0,
        fieldType: r.fieldType,
        actVisible: !1,
        feeVisible: !0,
        role: [ "个人信息", "已认证信息" ],
        roleIndex: 0,
        temp: 0,
        queue: !1
    },
    onLoad: function(e) {
        d.userInfo(this);
        var a = new Date();
        if (a.setYear(a.getFullYear() + 5), e.eid) {
            var i = this.data.tabs;
            i[0].status = 0, this.setData({
                eid: e.eid,
                maxDate: d.formatDate(a, "yyyy-MM-dd"),
                tabs: i
            }), t(this);
        } else {
            var s = new Date(), n = d.getDaysLater(5), l = d.formatDate(s, "yyyy-MM-dd"), r = d.formatDate(n, "yyyy-MM-dd"), f = "*姓名", u = [ {
                field_key: 1,
                field_name: "姓名",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 0
            } ], c = !0, h = parseInt(e.temp || 0), m = "自定义报名";
            1 == h ? (f = "*姓名，*性别，*手机号，*微信号，备注", u = [ {
                field_key: 1,
                field_name: "姓名",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 0
            }, {
                field_key: 2,
                field_name: "性别",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 4,
                options: [ "保密", "男", "女" ]
            }, {
                field_key: 6,
                field_name: "手机号",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 13
            }, {
                field_key: 8,
                field_name: "微信号",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 0
            }, {
                field_key: 18,
                field_name: "备注",
                status: 1,
                require: 0,
                field_len: 50,
                field_type: 0
            } ], c = !0, m = "活动聚会") : 2 == h ? (f = "*姓名，*手机号，*微信号，备注", u = [ {
                field_key: 1,
                field_name: "姓名",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 0
            }, {
                field_key: 6,
                field_name: "手机号",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 13
            }, {
                field_key: 8,
                field_name: "微信号",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 0
            }, {
                field_key: 18,
                field_name: "备注",
                status: 1,
                require: 0,
                field_len: 50,
                field_type: 0
            } ], c = !0, m = "课程培训") : 3 == h && (f = "*姓名，*性别，*手机号，*微信号，*身份证号，学校，学号，年级，班级，备注", 
            u = [ {
                field_key: 1,
                field_name: "姓名",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 0
            }, {
                field_key: 2,
                field_name: "性别",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 4,
                options: [ "保密", "男", "女" ]
            }, {
                field_key: 6,
                field_name: "手机号",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 13
            }, {
                field_key: 8,
                field_name: "微信号",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 0
            }, {
                field_key: 19,
                field_name: "身份证号",
                status: 1,
                require: 1,
                field_len: 50,
                field_type: 0
            }, {
                field_key: 10,
                field_name: "学校",
                status: 1,
                require: 0,
                field_len: 50,
                field_type: 0
            }, {
                field_key: 11,
                field_name: "学号",
                status: 1,
                require: 0,
                field_len: 50,
                field_type: 0
            }, {
                field_key: 12,
                field_name: "年级",
                status: 1,
                require: 0,
                field_len: 50,
                field_type: 0
            }, {
                field_key: 13,
                field_name: "班级",
                status: 1,
                require: 0,
                field_len: 50,
                field_type: 0
            }, {
                field_key: 18,
                field_name: "备注",
                status: 1,
                require: 0,
                field_len: 50,
                field_type: 0
            } ], c = !1, m = "信息登记");
            var _ = this.data.tabs;
            _ = d.checkedTabs(_, u), wx.setNavigationBarTitle({
                title: m
            }), this.setData({
                temp: h,
                feeVisible: c,
                selectTabs: f,
                tmpTabs: u,
                tabs: _,
                startDate: l,
                actStartDate: l,
                endDate: r,
                actEndDate: r,
                minDate: d.formatDate(s, "yyyy-MM-dd"),
                maxDate: d.formatDate(a, "yyyy-MM-dd"),
                phone: d.getStorage("phone") || "",
                phoneDefault: d.getStorage("phone") || "",
                verifyCode: d.getStorage("phone") ? "9999999" : ""
            });
            var p = d.getStorage("enroll_data");
            e.temp && (p = d.getStorage("enroll_data" + e.temp)), p && this.setData({
                title: p.title,
                titleDefault: p.title,
                rule: p.rule,
                ruleDefault: p.rule,
                titleEmpty: p.titleEmpty,
                ruleEmpty: p.ruleEmpty,
                startDate: p.startDate < l ? l : p.startDate,
                endDate: p.endDate < l ? r : p.endDate,
                startTime: p.startTime,
                endTime: p.endTime,
                limitCustom: p.limitCustom,
                limit: p.limit,
                limitEmpty: p.limitEmpty,
                banner: p.banner,
                selectTabs: p.selectTabs,
                tabs: p.tabs,
                tmpTabs: p.tmpTabs,
                wxNo: p.wx_no || "",
                defaultWxNo: p.wx_no || "",
                qrcode: p.qrcode || "",
                phone: d.getStorage("phone") || "",
                phoneDefault: d.getStorage("phone") || "",
                verifyCode: d.getStorage("phone") ? "9999999" : ""
            });
        }        
        (e.cid || e.title) && this.setData({
            cid: "my cid",
            title: "[小小签到]" + e.title,
            titleDefault: "[小小签到]" + e.title,
            startDate: d.formatDate(new Date().getTime(), "yyyy-MM-dd"),
            endDate: e.end || d.formatDate(new Date().getTime() + 12096e5, "yyyy-MM-dd"),
            limit: 0,
            autoFocus: !1,
            checkinHide: !0,
            feeVisible: !1
        }),d.setSignName(this), o.huoma(this), o.fieldType(this);
    },
    onUnload: function() {
        1 == wx.getStorageSync("create_enroll") ? (wx.removeStorageSync("create_enroll"), 
        wx.removeStorageSync("enroll_data"), wx.removeStorageSync("vid")) : wx.setStorageSync("enroll_data", this.data);
    },
    onShow: function() {
        d.checkSession(this);
        var e = d.getStorage("fieldCustom");
        if (e) if (console.log("自定义标签"), console.log(e), d.removeStorage("fieldCustom"), 
        this.data.tabsEdit) {
            for (var t = this.data.tabs, a = this.data.tmpTabs, i = 0; i < t.length; i++) if (1 == t[i].edit) {
                t[i] = e;
                for (var s = 0; s < a.length; s++) a[s].field_key == t[i].field_key && (a[s] = e);
            }
            this.setData({
                tabs: t,
                tmpTabs: a,
                tabsEdit: !1
            }), d.setTabsInfo(this, t);
        } else {
            t = this.data.tabs;
            e.field_key = d.uuid(), this.setData({
                tabs: this.data.tabs.concat(e)
            });
        } else {
            for (var i = 0, n = (t = this.data.tabs).length; i < n; i++) t[i].edit = !1;
            this.setData({
                tabs: t
            });
        }
        d.setAuthInfo(this);
    },
    chooseLocation: function() {
        n(this);
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
    inputPhone: function(e) {
        var t = e.detail.value, a = d.getStorage("phone");
        this.setData({
            phone: t,
            noAuthPhone: t != a,
            verifyCode: t == a ? "9999999" : "",
            showVerifyCode: t.length > 0 && t != a
        });
    },
    clearPhone: function() {
        this.setData({
            phone: "",
            phoneDefault: "",
            phoneEmpty: !0,
            noAuthPhone: !1,
            showVerifyCode: !1
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
    changeStartDate: function(e) {
        this.setData({
            startDate: e.detail.value
        });
    },
    changeEndDate: function(e) {
        this.setData({
            endDate: e.detail.value
        });
    },
    changeStartTime: function(e) {
        this.setData({
            startTime: e.detail.value
        });
    },
    changeEndTime: function(e) {
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
            visibilityIndex: e.detail.value
        });
    },
    changeUserVisible: function(e) {
        var t = e.detail.value;
        this.setData(l({
            userVisibleIndex: t
        }, 0 == t || 3 == t ? {
            visibilityIndex: 0
        } : {}));
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
        var t = this, a = e.currentTarget.dataset.url, i = e.currentTarget.dataset.type, n = this.data.pics;
        if (a) wx.previewImage({
            urls: "pic" == i ? n : [ a ],
            current: a
        }); else {
            if ("pic" == i && n.length > 8) return void d.showModelTips("图片最多只能上传9张");
            var l = 1;
            "pic" == i && (l = 9 - n.length), wx.chooseImage({
                count: l,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    var a = e.tempFilePaths;
                    t.setData({
                        tempPaths: a,
                        tempIndex: 0
                    }), d.showLoading("上传中..."), s(t, i, a, 0);
                },
                fail: function() {
                    d.hideLoading();
                }
            });
        }
    },
    getPhoneNumber: function(e) {
        var t = e.detail.iv, a = e.detail.encryptedData, i = this;
        e.detail.errMsg.indexOf("fail") > 0 ? i.setData({
            noAuthPhone: !0
        }) : (d.showLoading("正在获取手机号"), wx.request({
            url: r.globalData.host + "/common/decrypt",
            data: {
                encrypted_data: a,
                iv: t,
                access_token: wx.getStorageSync("accessToken")
            },
            method: "POST",
            success: function(t) {
                if (d.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
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
    getVerifyCode: function(e) {
        var t = this.data.phone;
        d.isTextEmpty(t) ? d.showModelTips("请补充发起人手机号信息") : (this.setData({
            phone: t
        }), a(this));
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
        if (t.data.cid && 0 == a) d.showModelTips("姓名为必填，且不可编辑"); else {
            var i = this.data.tabs, s = this.data.tmpTabs || [];
            if (i[a].status) {
                var n = [ "不选", "作为选填项", "编辑" ], l = 1;
                0 == i[a].require && (n = [ "不选", "作为必填项", "编辑" ], l = 0), wx.showActionSheet({
                    itemList: n,
                    success: function(e) {
                        if (2 == e.tapIndex) t.toEditTab(a, e); else if (1 == e.tapIndex) {
                            i[a].require = l ? 0 : 1;
                            for (n = 0; n < s.length; n++) s[n].field_key ? i[a].field_key == s[n].field_key && (s[n].require = i[a].require) : i[a].field_name == s[n].field_name && (s[n].require = i[a].require);
                            t.setData({
                                tmpTabs: s
                            }), d.setTabsInfo(t, i);
                        } else {
                            i[a].require = e.tapIndex ? 0 : 1, i[a].status = !i[a].status;
                            for (var n = 0; n < s.length; n++) s[n].field_key ? i[a].field_key == s[n].field_key && s.splice(n, 1) : i[a].field_name == s[n].field_name && s.splice(n, 1);
                            t.setData({
                                tmpTabs: s
                            }), d.setTabsInfo(t, i, a);
                        }
                    },
                    fail: function(e) {}
                });
            } else wx.showActionSheet({
                itemList: [ "作为必填项", "作为选填项", "编辑" ],
                success: function(e) {
                    2 == e.tapIndex ? t.toEditTab(a, e) : (i[a].require = e.tapIndex ? 0 : 1, i[a].status = !i[a].status, 
                    s.push(i[a]), t.setData({
                        tmpTabs: s
                    }), d.setTabsInfo(t, i, a));
                },
                fail: function(e) {}
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
    changeOnBehalf: function() {
        this.setData({
            onBehalf: !this.data.onBehalf
        });
    },
    changeBehalfLimit: function(e) {
        this.setData({
            behalfIndex: parseInt(e.detail.value)
        });
    },
    changeVerify: function() {
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
    login: function(e) {
        if (!(e.detail.errMsg.indexOf("fail") > 0)) {
            var t = this;
            d.showLoading("正在登录..."), d.buttonLogin(function() {
                d.hideLoading(), t.setData({
                    hasUserInfo: !0
                }), t.createEnroll(e);
            }, function() {
                d.hideLoading();
            }, e.detail);
        }
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
        this.setData({
            roleIndex: t
        });
    },
    postFormId: function(e) {
        d.postFormId(e.detail.formId);
    },
    authDialogTips: function() {
        d.authDialogTips(this.data.authInfo, this.data.roleIndex);
    },
    createEnroll: function(t) {
        if (!this.data.buttonClicked) if (d.buttonClicked(this), console.log("this.data ==== :", this.data), 
        d.isTextEmpty(this.data.title)) d.showModelTips("请输入标题"); else if (this.data.limit <= 0 && !this.data.cid) d.showModelTips("请输入报名人数"); else if (this.data.limit > 800 && 2 != this.data.authInfo.auth_status) wx.showModal({
            title: "温馨提示",
            content: "仅认证过的发起者，报名人数才能设置超过800，如有需要，请先去认证。",
            confirmText: "立即认证",
            confirmColor: "#12b7f5",
            success: function(e) {
                e.confirm && wx.navigateTo({
                    url: "/subpackage/authentication/authentication"
                });
            }
        }); else {
            var a = d.hasSensitiveWords(this.data.title);
            if (a) return d.showModelTips("标题包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                title: d.replaceAll(this.data.title, a),
                titleDefault: d.replaceAll(this.data.title, a)
            });
            var i = d.hasSensitiveWords(this.data.rule);
            if (i) return d.showModelTips("详细信息包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                rule: d.replaceAll(this.data.rule, i),
                ruleDefault: d.replaceAll(this.data.rule, i)
            });
            if (new Date().getTime() >= 1e3 * (d.getUTCDateInSeconds(this.data.endDate) + d.getTimeInSeconds(this.data.endTime))) d.showModelTips("结束时间必须大于当前时间"); else {
                var s = this.data.feeVisible, n = this.data.fee, l = this.data.limit || 0;
                if (s) {
                    if (!n) return void d.showModelTips("请输入报名费用");
                    if (n < .5) return void d.showModelTips("付费报名，报名费用必须大于0.5元人民币");
                    if (n > 1e4) return void d.showModelTips("付费报名，报名费用必须小于10000元人民币");
                    if (0 == l) return void d.showModelTips("付费报名需要设置报名人数，且报名人数*报名费用≤500000人民币");
                    if (l > 0 && n * l > 5e5) return void d.showModelTips("暂时只支持总金额小于500000元的报名，即：报名人数 * 报名费用 <= 500000 元");
                }
                if (!this.data.cid && 0 == this.data.roleIndex) {
                    if ("" == this.data.phone) return void d.showModelTips("请补充发起人手机号信息");
                    // if ("" == this.data.verifyCode) return void d.showModelTips("请填写手机验证码");
                }
                var o = this.data.wxNo;
                if (d.isTextEmpty(o) || r.globalData.wxReg.test(o)) {
                    var f = d.hasSensitiveWords(this.data.signName);
                    if (f) return d.showModelTips("署名包含敏感词，已经自动处理为*，请重新提交"), void this.setData({
                        signName: d.replaceAll(this.data.signName, f)
                    });
                    var u = d.hasSensitiveWords(this.data.wxNo);
                    if (u) return d.showModelTips("微信号包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                        wxNo: d.replaceAll(this.data.wxNo, u),
                        defaultWxNo: d.replaceAll(this.data.wxNo, u)
                    });
                    wx.setStorageSync("create_enroll", 1), e(this);
                } else d.showModelTips("请填写正确的微信号");
            }
        }
    },
    toProtocol: function() {
        wx.navigateTo({
            url: "/pages/webview/webview?url=https://mp.weixin.qq.com/s/Mn_dZeERRo919Q8PG3d6lw"
        });
    }
});