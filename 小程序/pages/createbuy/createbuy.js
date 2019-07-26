function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function e(t) {
    var a = r.resetTabs(t.data.tmpTabs, !1, !0);
    r.showLoading("正在创建报名表");
    var i = r.getUTCDateInSeconds(t.data.startDate), s = r.getTimeInSeconds(t.data.startTime), o = r.getUTCDateInSeconds(t.data.endDate), n = r.getTimeInSeconds(t.data.endTime), d = r.getUTCDateInSeconds(t.data.actStartDate), l = r.getTimeInSeconds(t.data.actStartTime), c = r.getUTCDateInSeconds(t.data.actEndDate), f = r.getTimeInSeconds(t.data.actEndTime), h = Number(t.data.verifyCode);
    1 == t.data.isDev && (h = 9999999);
    for (var m = t.data.goods, g = m.length, p = 0; p < g; p++) {
        var D = m[p];
        "" == D.fee ? D.fee = 0 : D.fee && (D.fee = Math.round(100 * Number(D.fee))), D.stock_limit = D.stock_limit ? parseInt(D.stock_limit) : 0;
    }
    var v = t.data.authInfo, y = v.name, T = t.data.tapIndex, w = t.data.phone, b = t.data.roleIndex, _ = t.data.wxNo;
    1 == b && (w = v.phone, h = 9999999, _ = v.wx_no), wx.request({
        url: u.globalData.host + "/enroll/v1/create",
        data: {
            title: t.data.title,
            content: t.data.rule,
            start_time: i + s,
            end_time: o + n,
            act_start: t.data.actVisible ? d + l : 0,
            act_end: t.data.actVisible ? c + f : 0,
            banner: t.data.banner ? t.data.banner : "",
            limit: 0,
            req_info: a,
            user_visible: parseInt(t.data.userVisibleIndex),
            visibility: t.data.userVisibleIndex ? parseInt(t.data.visibilityIndex) : 0,
            sign_name: y && T ? y : t.data.signName,
            wx_no: _,
            group_qr: t.data.qrcode || "",
            fee: 0,
            phone: w,
            code: h,
            pics: t.data.pics,
            on_behalf_limit: t.data.onBehalf ? t.data.behalfLimit[t.data.behalfIndex] : 0,
            temp: 5,
            version: u.globalData.version,
            verify: t.data.onVerify ? 1 : 0,
            can_quit: t.data.canQuit ? 1 : 0,
            items: m,
            is_public: t.data.isPublic ? 1 : 0,
            address: t.data.address,
            longitude: t.data.longitude,
            latitude: t.data.latitude,
            role: parseInt(t.data.roleIndex),
            item_limit: parseInt(t.data.itemLimitIndex),
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(i) {
            r.hideLoading(), -500 != i.data.sta ? 0 == i.data.sta ? i.data.data && wx.showToast({
                title: "创建成功",
                icon: "success",
                success: function() {
                    setTimeout(function() {
                        wx.navigateBackMiniProgram && t.data.cid ? wx.navigateBackMiniProgram({
                            extraData: {
                                eid: i.data.data.eid,
                                req_info: a
                            },
                            success: function(t) {}
                        }) : wx.redirectTo({
                            url: "../detail/detail?eid=" + i.data.data.eid
                        });
                    }, 1500);
                }
            }) : r.showFailedToast("创建报名表失败，请重试。", i.data.msg) : r.login(function() {
                e(t);
            });
        },
        fail: function(t) {
            r.showFailedToast("创建报名表失败，请重试");
        }
    });
}

function a(t) {
    r.showLoading("正在加载数据"), wx.request({
      url: u.globalData.host + "/SignUpForm/Detail",
        data: {
            eid: t.data.eid,
            access_token: r.getToken()
        },
        method: "GET",
        success: function(e) {
            if (r.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                var i = e.data.data, s = i.req_info, o = t.data.tabs;
                if (t.setData({
                    tmpTabs: s
                }), s[0] && s[0].field_key) for (y = 0; y < o.length; y++) for (n = 0; n < s.length; n++) o[y].field_key == s[n].field_key && (o[y] = s[n], 
                s.splice(n, 1)); else for (y = 0; y < o.length; y++) for (var n = 0; n < s.length; n++) o[y].field_name == s[n].field_name && (o[y] = s[n], 
                s.splice(n, 1));
                for (var d = o.concat(s), l = r.formatDate(new Date(1e3 * i.start_time), "yyyy-MM-dd"), c = r.formatDate(new Date(1e3 * i.start_time), "HH:mm"), f = r.formatDate(new Date(1e3 * i.end_time), "yyyy-MM-dd"), h = r.formatDate(new Date(1e3 * i.end_time), "HH:mm"), m = i.act_start ? r.formatDate(new Date(1e3 * i.act_start), "yyyy-MM-dd") : l, g = i.act_start ? r.formatDate(new Date(1e3 * i.act_start), "HH:mm") : c, p = i.act_start ? r.formatDate(new Date(1e3 * i.act_end), "yyyy-MM-dd") : f, D = i.act_start ? r.formatDate(new Date(1e3 * i.act_end), "HH:mm") : h, v = i.items, y = 0; y < v.length; y++) v[y].old = !0, 
                v[y].fee = v[y].fee / 100;
                var T = u.globalData.wxReg, w = i.wx_no;
                T.test(w) || (i.wx_no = ""), t.setData({
                    title: i ? i.title : "",
                    titleDefault: i ? i.title : "",
                    rule: i ? i.content : "",
                    ruleDefault: i ? i.content : "",
                    start_time: i.start_time,
                    startDate: l,
                    startTime: c,
                    endDate: f,
                    endTime: h,
                    actStartDate: m,
                    actStartTime: g,
                    actEndDate: p,
                    actEndTime: D,
                    banner: i.banner,
                    limit: i.limit,
                    count: i.count,
                    userVisibleIndex: i.user_visible,
                    visibilityIndex: i.visibility,
                    limitCustom: 0 != i.limit,
                    titleEmpty: !i && !i.title,
                    ruleEmpty: !i && !i.content,
                    wxNo: i.is_owner ? i.wx_no || "" : "",
                    defaultWxNo: i.is_owner ? i.wx_no || "" : "",
                    tabs: d,
                    pics: i.pics,
                    goods: v,
                    phone: i.is_owner ? i.phone || "" : "",
                    phoneDefault: i.is_owner ? i.phone || "" : "",
                    verifyCode: i.phone ? "9999999" : "",
                    onVerify: i.verify,
                    onBehalf: i.on_behalf_limit > 0,
                    canQuit: i.can_quit,
                    behalfIndex: r.getBeHalfIndex(i.on_behalf_limit),
                    itemLimitIndex: i.item_limit
                }), r.setTabsInfo(t, d);
            } else r.showFailedToast("报名表数据获取失败", e.data.msg); else r.login(function() {
                a(t);
            });
        },
        fail: function(t) {
            r.hideLoading(), r.showFailedToast("报名表数据获取失败");
        }
    });
}

function i(t) {
    r.showLoading("正在获取验证码..."), wx.request({
        url: u.globalData.host + "/enroll/v1/code",
        data: {
            cid: t.data.cid,
            phone: t.data.phone,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(e) {
            r.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta ? s(t) : r.showFailedToast("获取验证码失败，请重试。", e.data.msg) : r.login(function() {
                i(t);
            });
        },
        fail: function(t) {
            r.hideLoading(), r.showFailedToast("获取验证码失败，请重试");
        }
    });
}

function s(t) {
    var e = t.data.verifyCodeCountdownNum - 1;
    e > 0 ? (t.setData({
        verifyCodeCountdownNum: e,
        verifyCodeText: e + "后重新获取"
    }), setTimeout(function() {
        s(t);
    }, 1e3)) : t.setData({
        verifyCodeCountdownNum: 60,
        verifyCodeText: "获取验证码"
    });
}

function o(t, e, a, i) {
    var s = a[i];
    wx.uploadFile({
        url: u.globalData.host + "/file/v1/upload",
        filePath: s,
        name: "file",
        formData: {
            access_token: r.getStorage("accessToken"),
            type: e
        },
        success: function(s) {
            "pic" != e && r.hideLoading();
            var n = s.data, d = JSON.parse(n);
            if (0 == d.sta) {
                var l = d.data.urls[0];
                if ("banner" == e) t.setData({
                    banner: l
                }); else if ("qrcode" == e) t.setData({
                    qrcode: l
                }); else if ("pic" == e) {
                    var c = t.data.pics;
                    c.push(l), t.setData({
                        pics: c
                    }), a.length - 1 > i ? o(t, e, a, i + 1) : r.hideLoading();
                }
            } else r.showFailedToast(d.msg);
        },
        fail: function(t) {
            r.hideLoading(), r.showFailedToast("上传图片失败，请重试");
        }
    });
}

function n(t) {
    wx.chooseLocation({
        success: function(e) {
            t.setData({
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
                            n(t);
                        }
                    }) : e.cancel && r.showModelTips("由于您拒绝授权，因此无法选择地点");
                }
            }) : r.showModelTips("由于您拒绝授权，因此无法选择地点"));
        }
    });
}

var d, l = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, r = require("../../utils/util.js"), c = require("../../tmp/tmp.js"), u = getApp();

Page((d = {
    data: {
        title: "",
        rule: "",
        titleEmpty: !0,
        ruleEmpty: !0,
        autoFocus: !0,
        startDate: "",
        endDate: "",
        startTime: "00:00",
        endTime: "23:59",
        actStartTime: "00:00",
        actEndTime: "23:59",
        limitCustom: !0,
        limit: 10,
        limitEmpty: !0,
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
            field_name: "手机号",
            status: 0,
            require: 1,
            field_len: 50,
            field_type: 13
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
        visibility: [ "管理员可见（保护隐私）", "任何人可见（谨慎选择）", "报名参与人可见" ],
        visibilityIndex: 0,
        signName: r.getStorage("userInfo").nickName,
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
        feeVisible: !0,
        huomaDialog: !1,
        huoma: u.globalData.huoma,
        pics: [],
        onBehalf: !1,
        onVerify: !1,
        itemLimit: [ "无限制", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40 ],
        itemLimitIndex: 0,
        behalfLimit: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 500 ],
        behalfIndex: 0,
        isDev: r.getStorage("isDev"),
        canQuit: !0,
        address: "",
        longitude: 0,
        latitude: 0,
        goods: [ {
            name: "",
            desc: "",
            fee: 1,
            count: "",
            pics: []
        } ],
        fieldType: u.fieldType,
        role: [ "个人信息", "已认证信息" ],
        roleIndex: 0
    },
    onLoad: function(t) {
        r.userInfo(this);
        var e = new Date();
        if (e.setYear(e.getFullYear() + 5), t.eid) {
            var i = this.data.tabs;
            i[0].status = 0, this.setData({
                eid: t.eid,
                maxDate: r.formatDate(e, "yyyy-MM-dd"),
                tabs: i
            }), a(this);
        } else {
            var s = new Date(), o = r.getDaysLater(5), n = r.formatDate(s, "yyyy-MM-dd"), d = r.formatDate(o, "yyyy-MM-dd");
            this.setData({
                startDate: n,
                actStartDate: n,
                endDate: d,
                actEndDate: d,
                minDate: r.formatDate(s, "yyyy-MM-dd"),
                maxDate: r.formatDate(e, "yyyy-MM-dd"),
                phone: r.getStorage("phone") || "",
                phoneDefault: r.getStorage("phone") || "",
                verifyCode: r.getStorage("phone") ? "9999999" : ""
            });
            var l = r.getStorage("enroll_data4");
            l && this.setData({
                title: l.title,
                titleDefault: l.title,
                rule: l.rule,
                ruleDefault: l.rule,
                titleEmpty: l.titleEmpty,
                ruleEmpty: l.ruleEmpty,
                startDate: l.startDate < n ? n : l.startDate,
                endDate: l.endDate < n ? d : l.endDate,
                startTime: l.startTime,
                endTime: l.endTime,
                limitCustom: l.limitCustom,
                limit: l.limit,
                limitEmpty: l.limitEmpty,
                banner: l.banner,
                selectTabs: l.selectTabs,
                tabs: l.tabs,
                tmpTabs: l.tmpTabs,
                wxNo: l.wx_no || "",
                defaultWxNo: l.wx_no || "",
                qrcode: l.qrcode || "",
                phone: r.getStorage("phone") || "",
                phoneDefault: r.getStorage("phone") || "",
                verifyCode: r.getStorage("phone") ? "9999999" : "",
                goods: l.goods
            });
        }
        t.title && (this.setData({
            cid: "my cid",
            title: "[小小签到]" + t.title,
            titleDefault: "[小小签到]" + t.title,
            startDate: r.formatDate(new Date().getTime(), "yyyy-MM-dd"),
            endDate: t.end,
            autoFocus: !1,
            checkinHide: !0
        }), console.log(this.data)), r.setSignName(this), c.huoma(this), c.fieldType(this);
    },
    onUnload: function() {
        1 == wx.getStorageSync("create_enroll") ? (wx.removeStorageSync("create_enroll"), 
        wx.removeStorageSync("enroll_data4"), wx.removeStorageSync("vid")) : wx.setStorageSync("enroll_data4", this.data);
    },
    onShow: function() {
        r.checkSession(this);
        var t = r.getStorage("fieldCustom");
        if (t) if (console.log("自定义标签"), console.log(t), r.removeStorage("fieldCustom"), 
        this.data.tabsEdit) {
            var e = this.data.tabs, a = this.data.tmpTabs;
            console.log(e), console.log(a);
            for (s = 0; s < e.length; s++) if (1 == e[s].edit) {
                e[s] = t;
                for (var i = 0; i < a.length; i++) a[i].field_key == e[s].field_key && (a[i] = t);
            }
            this.setData({
                tabs: e,
                tmpTabs: a,
                tabsEdit: !1
            }), r.setTabsInfo(this, e);
        } else {
            e = this.data.tabs, r.getMax(e);
            t.field_key = r.uuid(), this.setData({
                tabs: this.data.tabs.concat(t)
            });
        } else {
            for (var s = 0, o = (e = this.data.tabs).length; s < o; s++) e[s].edit = !1;
            this.setData({
                tabs: e
            });
        }
        var n = r.getStorage("good_index");
        if (void 0 != n) {
            var d = this.data.goods, l = r.getStorage("good_pics") || [];
            d && d[n] && (d[n].pics = l, this.setData({
                goods: d
            }));
        }
    },
    chooseLocation: function() {
        n(this);
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
    inputPhone: function(t) {
        var e = t.detail.value, a = r.getStorage("phone");
        this.setData({
            phone: e,
            noAuthPhone: e != a,
            showVerifyCode: e.length > 0 && e != this.data.originPhone
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
    changeStartDate: function(t) {
        this.setData({
            startDate: t.detail.value
        });
    },
    changeEndDate: function(t) {
        this.setData({
            endDate: t.detail.value
        });
    },
    changeStartTime: function(t) {
        this.setData({
            startTime: t.detail.value
        });
    },
    changeEndTime: function(t) {
        this.setData({
            endTime: t.detail.value
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
            visibilityIndex: t.detail.value
        });
    },
    changeUserVisible: function(t) {
        var e = t.detail.value;
        this.setData(l({
            userVisibleIndex: e
        }, 0 == e || 3 == e ? {
            visibilityIndex: 0
        } : {}));
    },
    changeFeeVisible: function(t) {
        this.setData({
            feeVisible: t.detail.value,
            fee: 1,
            feeDefault: 1
        });
    },
    changePublic: function() {
        this.data.isPublic ? this.setData({
            isPublic: !1
        }) : 2 == this.data.authInfo.auth_status ? (r.showModelTips("设为公开活动后，该活动会出现在你的个人主页。"), 
        this.setData({
            isPublic: !0
        })) : (wx.showModal({
            title: "温馨提示",
            content: "你还未认证，仅认证过的用户才可以使用该功能，请知晓。",
            confirmText: "立即认证",
            confirmColor: "#12b7f5",
            success: function(t) {
                t.confirm && r.toPersonal();
            }
        }), this.setData({
            isPublic: !1
        }));
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
    showMore: function() {
        var t = this.data.showMore;
        this.setData({
            showMore: !t
        });
    },
    chooseImage: function(t) {
        r.buttonClicked(this);
        var e = this, a = t.currentTarget.dataset.url, i = t.currentTarget.dataset.type, s = this.data.pics;
        if (a) wx.previewImage({
            urls: "pic" == i ? s : [ a ],
            current: a
        }); else {
            if ("pic" == i && s.length > 8) return void r.showModelTips("图片最多只能上传9张");
            var n = 1;
            "pic" == i && (n = 9 - s.length), wx.chooseImage({
                count: n,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(t) {
                    var a = t.tempFilePaths;
                    e.setData({
                        tempPaths: a,
                        tempIndex: 0
                    }), r.showLoading("上传中..."), o(e, i, a, 0);
                },
                fail: function() {
                    r.hideLoading();
                }
            });
        }
    },
    getPhoneNumber: function(t) {
        var e = t.detail.iv, a = t.detail.encryptedData, i = this;
        t.detail.errMsg.indexOf("fail") > 0 ? (console.log("fail   "), i.setData({
            noAuthPhone: !0
        })) : (r.showLoading("正在获取手机号"), wx.request({
            url: u.globalData.host + "/common/decrypt",
            data: {
                encrypted_data: a,
                iv: e,
                access_token: wx.getStorageSync("accessToken")
            },
            method: "POST",
            success: function(e) {
                if (console.log("======== 解密手机号： "), console.log(e), r.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                    var a = e.data.data.phoneNumber;
                    i.setData({
                        phone: a,
                        phoneDefault: a,
                        verifyCode: "9999999"
                    }), r.setStorage("phone", a);
                } else i.setData({
                    noAuthPhone: !0
                }); else r.login(function() {
                    i.getPhoneNumber(t);
                });
            },
            fail: function(t) {
                r.hideLoading(), r.showFailedToast("获取验证码失败，请重试");
            }
        }));
    },
    getVerifyCode: function(t) {
        var e = this.data.phone;
        r.isTextEmpty(e) ? r.showModelTips("请补充发起人手机号信息") : (this.setData({
            phone: e
        }), i(this));
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
    toEditTab: function(t, e) {
        var a = this.data.tabs;
        a[t].edit = !0, this.setData({
            tabsEdit: !0,
            tabs: a
        }), r.setStorage("tabCurrent", a[t]), wx.navigateTo({
            url: "/pages/customfield/customfield?edit=true"
        });
    },
    changeTabs: function(t) {
        var e = this, a = t.currentTarget.dataset.index;
        if (e.data.cid && 0 == a) r.showModelTips("姓名为必填，且不可编辑"); else {
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
                            }), r.setTabsInfo(e, i);
                        } else {
                            i[a].require = t.tapIndex ? 0 : 1, i[a].status = !i[a].status;
                            for (var o = 0; o < s.length; o++) s[o].field_key ? i[a].field_key == s[o].field_key && s.splice(o, 1) : i[a].field_name == s[o].field_name && s.splice(o, 1);
                            e.setData({
                                tmpTabs: s
                            }), r.setTabsInfo(e, i, a);
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
                    }), r.setTabsInfo(e, i, a));
                },
                fail: function(t) {}
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
    changeItemLimit: function() {
        this.setData({
            itemLimit: !this.data.itemLimit
        });
    },
    changeBehalfLimit: function(t) {
        console.log(t.detail), this.setData({
            behalfIndex: parseInt(t.detail.value)
        });
    },
    changeVerify: function() {
        this.setData({
            onVerify: !this.data.onVerify
        });
    },
    login: function(t) {
        if (!(t.detail.errMsg.indexOf("fail") > 0)) {
            var e = this;
            r.showLoading("正在登录..."), r.buttonLogin(function() {
                r.hideLoading(), e.setData({
                    hasUserInfo: !0
                }), e.createEnroll(t);
            }, function() {
                r.hideLoading();
            }, t.detail);
        }
    },
    changeCanQuit: function(t) {
        this.setData({
            canQuit: !this.data.canQuit
        });
    }
}, t(d, "changeItemLimit", function(t) {
    this.setData({
        itemLimitIndex: t.detail.value
    });
}), t(d, "changeRole", function(t) {
    var e = t.detail.value;
    if (1 == e && 2 != this.data.authInfo.auth_status) return wx.showModal({
        title: "温馨提示",
        content: "你还未认证，仅认证过的用户才可以使用该功能，请知晓。",
        confirmText: "立即认证",
        confirmColor: "#12b7f5",
        success: function(t) {
            t.confirm && r.toPersonal();
        }
    }), void this.setData({
        roleIndex: 0
    });
    this.setData({
        roleIndex: e
    });
}), t(d, "addGood", function() {
    var t = this.data.goods || [];
    t.length > 39 ? r.showModelTips("项目总数不能超过40个") : (t.push({
        name: "",
        desc: "",
        fee: 1,
        count: "",
        pics: []
    }), this.setData({
        goods: t
    }));
}), t(d, "deleteGood", function(t) {
    var e = t.currentTarget.dataset.index, a = this.data.goods;
    if (1 != a.length) {
        var i = this;
        wx.showModal({
            title: "删除确认",
            content: "确认要删除此项目吗？",
            showCancel: !0,
            success: function(t) {
                t.confirm && (a.splice(e, 1), i.setData({
                    goods: a
                }));
            }
        });
    } else r.showModelTips("最少需要有一个项目");
}), t(d, "toUploadPics", function(t) {
    r.buttonClicked(this);
    var e = t.currentTarget.dataset.index, a = this.data.goods || [], i = a[e] ? a[e].pics : [];
    r.setStorage("good_index", e), r.setStorage("good_pics", i), wx.navigateTo({
        url: "/subpackage/uploadimages/uploadimages"
    });
}), t(d, "inputGood", function(t) {
    var e = t.currentTarget.dataset, a = e.index, i = e.name, s = this.data.goods, o = t.detail.value;
    if ("count" != i && "stock_limit" != i || (o = parseInt(o)), "fee" == i) {
        o = Number(o);
        o = isNaN(o) ? 1 : o.toFixed(2);
    }
    s[a][i] = o, this.setData({
        goods: s
    });
}), t(d, "clearGood", function(t) {
    var e = t.currentTarget.dataset, a = e.index, i = e.name, s = this.data.goods;
    s[a][i] = "", this.setData({
        goods: s
    });
}), t(d, "authDialogTips", function() {
    r.authDialogTips(this.data.authInfo, this.data.roleIndex);
}), t(d, "createEnroll", function(t) {
    if (r.postFormId(t.detail.formId), !this.data.buttonClicked) if (r.buttonClicked(this), 
    r.isTextEmpty(this.data.title)) r.showModelTips("请输入标题"); else if (isNaN(this.data.limit)) r.showModelTips("请输入报名人数"); else if (this.data.limit > 800 && 2 != this.data.authInfo.auth_status) wx.showModal({
        title: "温馨提示",
        content: "仅认证过的发起者，报名人数才能设置超过800，如有需要，请先去认证。",
        confirmText: "立即认证",
        confirmColor: "#12b7f5",
        success: function(t) {
            t.confirm && wx.navigateTo({
                url: "/subpackage/authentication/authentication"
            });
        }
    }); else {
        var a = r.hasSensitiveWords(this.data.title);
        if (a) return r.showModelTips("标题包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
            title: r.replaceAll(this.data.title, a),
            titleDefault: r.replaceAll(this.data.title, a)
        });
        var i = r.hasSensitiveWords(this.data.rule);
        if (i) return r.showModelTips("详细信息包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
            rule: r.replaceAll(this.data.rule, i),
            ruleDefault: r.replaceAll(this.data.rule, i)
        });
        if (new Date().getTime() >= 1e3 * (r.getUTCDateInSeconds(this.data.endDate) + r.getTimeInSeconds(this.data.endTime))) r.showModelTips("结束时间必须大于当前时间"); else {
            for (var s = this.data.goods, o = s.length, n = 0, d = !1, l = !1, c = 0, f = 0; f < o; f++) {
                var h = s[f];
                "" == h.name && (l = !0), "" == h.desc && (l = !0), "" != h.count && 0 != h.count || (l = !0), 
                h.fee > 0 && h.fee < .5 && (c = h.fee), n += h.count * h.fee, h.stock_limit > h.count && (d = !0);
            }
            if (l) r.showModelTips("请把报名项目名称、描述、总数据填写完整，项目图片为必填项"); else if (d) r.showModelTips("每人限报数量必须小于项目总数量"); else if (c) r.showModelTips("报名项目价格必须大于0.5元"); else if (o < this.data.itemLimitIndex) r.showModelTips("参与者可报名项目数超过了创建的总报名项目数，请减少参与者可报名项目数"); else if (n > 5e5) r.showModelTips("暂时只支持总金额小于500000元的报名，即：所有项目金额总和 <= 500000 元"); else {
                if (0 == this.data.roleIndex) {
                    if ("" == this.data.phone) return void r.showModelTips("请填写手机号");
                    if ("" == this.data.verifyCode) return void r.showModelTips("请填写手机验证码");
                }
                var m = this.data.wxNo;
                if (r.isTextEmpty(m) || u.globalData.wxReg.test(m)) {
                    var g = r.hasSensitiveWords(this.data.signName);
                    if (g) return r.showModelTips("署名包含敏感词，已经自动处理为*，请重新提交"), void this.setData({
                        signName: r.replaceAll(this.data.signName, g)
                    });
                    var p = r.hasSensitiveWords(this.data.wxNo);
                    if (p) return r.showModelTips("微信号包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                        wxNo: r.replaceAll(this.data.wxNo, p),
                        defaultWxNo: r.replaceAll(this.data.wxNo, p)
                    });
                    r.setStorage("create_enroll", 1), r.removeStorage("good_pics"), r.removeStorage("good_index"), 
                    e(this);
                } else r.showModelTips("请填写正确的微信号");
            }
        }
    }
}), t(d, "toProtocol", function() {
    wx.navigateTo({
        url: "/pages/webview/webview?url=https://mp.weixin.qq.com/s/Mn_dZeERRo919Q8PG3d6lw"
    });
}), d));