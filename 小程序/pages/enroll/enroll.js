function e(e) {
  console.log(e);
  for (var t = 0; t < e.req_info.length; t++) {
    var a = e.req_info[t];
    if (3 == a.field_type) a.end_date = ""; else if (4 == a.field_type || 5 == a.field_type) {
        for (var i = a.options, o = [], n = 0; n < i.length; n++) o.push({
            name: i[n],
            checked: 0
        });
        a.options = o;
    }
    6 == a.field_type && (a.end_time = "");
  }
  return e;
}

function t(e) {
    u.showLoading("正在提交数据");
    for (var a = [], i = e.data.goods, o = 0; o < i.length; o++) {
        var n = i[o];
        n.consume && a.push({
            key: n.key,
            count: n.consume
        });
    }
  for (let i = 0; i < e.data.info.length; i++) {
    var item = e.data.info[i];
    if (typeof (item.field_value) != 'string') {
      let str = "";
      for (let j = 0; j < item.field_value.length; j++) {
        str += item.field_value[j] + ',';
      }
      item.field_value = str;
    }
  }


    wx.request({
      url: m.globalData.host + "/SignUpForm/BaoMing?access_token="+u.getToken(),
        method: "POST",
        data: {
            access_token: u.getToken(),
            eid: u.trim(e.data.eid),
            info: e.data.info,
            on_behalf: e.data.displacement ? 1 : 0,
            items: a,
            referer: m.globalData.referer
        },
        success: function(a) {
            if (-500 != a.data.sta) if (0 == a.data.sta) {
                var i = a.data.data;
                m.globalData.waitVerified = i.verified, i.info_id ? (u.hideLoading(), e.data.verify ? wx.redirectTo({
                    url: "/pages/enrollresult/enrollresult?info_id=" + i.info_id + "&eid=" + e.data.eid
                }) : wx.navigateBackMiniProgram && e.data.cid ? wx.showToast({
                    title: "报名成功",
                    icon: "success",
                    success: function() {
                        setTimeout(function() {
                            wx.navigateBackMiniProgram({
                                extraData: {
                                    eid: e.data.eid
                                },
                                success: function(e) {}
                            });
                        }, 1500);
                    }
                }) : wx.redirectTo({
                    url: "/pages/enrollsuccess/enrollsuccess?info_id=" + i.info_id + "&eid=" + e.data.eid
                })) : i.tmp_id && !i.package ? (e.setData({
                    tmp_id: i.tmp_id
                }), e.data.fee > e.data.singleAmount && setTimeout(function() {
                    u.hideLoading(), wx.redirectTo({
                        url: "/subpackage/enrollpay/enrollpay?eid=" + e.data.eid + "&fee=" + e.data.fee + "&tmp_id=" + i.tmp_id
                    });
                }, 2500)) : i.tmp_id && i.package && (u.hideLoading(), wx.requestPayment({
                    timeStamp: i.timeStamp + "",
                    nonceStr: i.nonceStr,
                    package: i.package,
                    signType: "MD5",
                    paySign: i.paySign,
                    success: function(t) {
                        console.log(t), "requestPayment:ok" == t.errMsg && (e.setData({
                            tmp_id: i.tmp_id
                        }), e.data.verify ? wx.redirectTo({
                            url: "/pages/enrollresult/enrollresult?tmp_id=" + e.data.tmp_id + "&eid=" + e.data.eid
                        }) : wx.redirectTo({
                            url: "/pages/enrollsuccess/enrollsuccess?tmp_id=" + e.data.tmp_id + "&eid=" + e.data.eid
                        }));
                    },
                    fail: function(e) {
                        console.log(e), wx.showToast({
                            title: "支付失败",
                            icon: "warn",
                            success: function() {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    }
                }));
            } else u.showFailedToast("报名失败", a.data.msg); else u.login(function() {
                t(e);
            });
        },
        fail: function(e) {
            u.hideLoading(), u.showFailedToast("报名失败，服务器请求超时");
        }
    });
}

function a(e) {
    u.showLoading("正在提交报名数据");
  for (let i = 0; i < e.data.info.length;i++){
    var item=e.data.info[i];
    if (typeof (item.field_value) !='string'){
      let str="";
      for (let j = 0; j < item.field_value.length;j++){
        str+=item.field_value[j]+',';
      }
      item.field_value=str;
    }
  }
     wx.request({
      url: m.globalData.host + "/SignUpForm/UpdateSignInForm?access_token="+u.getToken(),
        method: "POST",
        data: {
            access_token: u.getToken(),
            info_id: e.data.info_id,
            info: e.data.info
        },
        success: function(t) {
            u.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta ? wx.showToast({
                title: "保存成功",
                icon: "success",
                success: function() {
                    setTimeout(function() {
                        wx.navigateBackMiniProgram && e.data.cid ? wx.navigateBackMiniProgram({
                            extraData: {
                                eid: e.data.eid
                            },
                            success: function(e) {}
                        }) : wx.navigateBack({
                            delta: 1
                        });
                    }, 1500);
                }
            }) : u.showFailedToast("保存失败", t.data.msg) : u.login(function() {
                a(e);
            });
        },
        fail: function(e) {
            u.hideLoading(), u.showFailedToast("保存失败，服务器请求超时");
        }
    });
}

function i(e) {
    u.showLoading("正在提交报名数据"), wx.request({
        url: m.globalData.host + "/enroll/v1/update_tmp",
        method: "POST",
        data: {
            access_token: u.getToken(),
            tmp_id: e.data.tmp_id,
            info: e.data.info
        },
        success: function(t) {
            u.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta ? wx.redirectTo({
                url: "/subpackage/enrollpay/enrollpay?paid=1&eid=" + e.data.eid + "&fee=" + e.data.fee + "&tmp_id=" + e.data.tmp_id
            }) : u.showFailedToast("保存失败", t.data.msg) : u.login(function() {
                i(e);
            });
        },
        fail: function(e) {
            u.hideLoading(), u.showFailedToast("保存失败，服务器请求超时");
        }
    });
}

function o(e) {
    u.showLoading("正在加载数据"), wx.request({
      url: m.globalData.host + "/SignUpForm/user_detail",
        method: "GET",
        data: {
            access_token: u.getToken(),
            eid: e.data.eid,
            info_id: e.data.info_id
        },
        success: function(t) {
            if (u.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                var a = t.data.data, i = a.req_info, s = a.info, d = n(i, s);
                console.log("form items  ======"), console.log(d), e.setData({
                    formItems: d,
                    tmpItems: d,
                    info: s,
                    comment: a.comment||'',
                  verified: a.verified || '',
                    goods: a.items || [],
                  refunded: a.refunded || '',
                  charge: a.charge || ''
                });
            } else u.showFailedToast("获取数据失败", t.data.msg); else u.login(function() {
                o(e);
            });
        },
        fail: function(e) {
            u.hideLoading(), u.showFailedToast("获取数据失败，服务器请求超时");
        }
    });
}

function n(e, t) {
    for (var a = e.length, i = e, o = 0; o < a; o++) {
        if (e[o].field_key || (e[o].field_key = o + 1), 3 == (r = e[o]).field_type && (r.end_date = ""), 
        4 == r.field_type) {
            for (var n = r.options || [], s = [], d = 0; d < n.length; d++) s.push({
                name: n[d],
                checked: 0
            });
            r.options = s;
        }
        if (5 == r.field_type) {
            for (var n = r.options || [], s = [], d = 0; d < n.length; d++) s.push({
                name: n[d],
                checked: 0
            });
            r.options = s;
        }
        6 == r.field_type && (r.end_time = "");
    }
    for (o = 0; o < t.length; o++) t[o].field_key || (t[o].field_key = o + 1);
    for (o = 0; o < a; o++) for (var r = e[o], l = 0; l < t.length; l++) {
        var f, m = t[l].field_value, h = r.field_name;
        if (t[l].field_key && (f = t[l].field_key, h = r.field_key), h == f) {
            if (r.field_type <= 1 && ("object" == (void 0 === m ? "undefined" : c(m)) && (m = m.toString()), 
            m = u.trim(m)), 2 == r.field_type && "string" == typeof m && (m = []), 3 == r.field_type && (m = u.trim(m), 
            r.end_date = m), 4 == r.field_type) {
                for (var n = r.options || [], d = 0; d < n.length; d++) n[d].name == m && (n[d].checked = 1);
                m = u.trim(m);
            }
            if (5 == r.field_type) for (var n = r.options || [], d = 0; d < n.length; d++) if(m) for (var g = 0; g < m.length; g++) n[d].name == m[g] && (n[d].checked = 1);
            6 == r.field_type && (r.end_time = m), r.field_value = m;
        }
    }
    return i;
}

function s(e) {
    u.showLoading("正在取消报名");
    e.data.eid;
    wx.request({
      url: m.globalData.host + "/SignUpForm/exit",
        data: {
            access_token: wx.getStorageSync("accessToken"),
            info_id: e.data.info_id
        },
        method: "POST",
        success: function(t) {
            if (u.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                var a = e.data.can_quit;
                u.showToast(0 == a ? "申请已提交" : "取消成功"), wx.navigateBack({
                    delta: 1
                });
            } else {
                if (-1 == t.data.sta && 300 == t.data.errcode) return void u.showModelTips(t.data.msg);
                u.showFailedToast("取消失败", t.data.msg);
            } else u.login(function() {
                s(e);
            });
        },
        fail: function(e) {
            u.hideLoading(), u.showFailedToast("取消失败，服务器请求超时");
        }
    });
}

function d(t) {
    u.showLoading("正在加载数据"), wx.request({
      url: m.globalData.host + "/SignUpForm/Detail",
        data: {
            eid: t.data.eid,
            access_token: u.getStorage("accessToken")
        },
        method: "GET",
        success: function(a) {
            if (u.hideLoading(), -500 != a.data.sta) {
                if (0 == a.data.sta) {
                    var i = a.data.data;
                    console.log("enroll======: ", i), i = e(i), t.setData({
                        formItems: i.req_info,
                        tmpItems: i.req_info,
                        info_id: i.info_id,
                        cid: i.cid,
                        enroll: i
                    }), i.info_id && o(t);
                }
            } else u.login(function() {
                d(t), t.setData({
                    hasUserInfo: !0
                });
            }, function() {
                t.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(e) {
            u.hideLoading(), u.showFailedToast("获取数据失败");
        }
    });
}

function r(e, t) {
    wx.chooseLocation({
        success: function(a) {
            console.log(a);
            var i = e.data.formItems;
            i[t].field_value = a.name, e.setData({
                formItems: i
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
                            r(e);
                        }
                    }) : t.cancel && u.showModelTips("由于您拒绝授权，因此无法选择地点");
                }
            }) : u.showModelTips("由于您拒绝授权，因此无法选择地点"));
        }
    });
}

function l(e) {
    u.showLoading("正在加载数据"), wx.request({
        url: m.globalData.host + "/enroll/v1/info_tmp",
        method: "GET",
        data: {
            access_token: u.getToken(),
            eid: e.data.eid
        },
        success: function(t) {
            if (u.hideLoading(), -500 != t.data.sta) {
                if (0 == t.data.sta) {
                    var a = t.data.data, i = n(a.req_info, a.info);
                    e.setData(f({
                        formItems: i,
                        tmpItems: i,
                        info: a.info,
                        info_id: a.tmp_id,
                        tmp_id: a.tmp_id,
                        fee: parseInt(a.fee)
                    }, a.items ? {
                        goods: a.items
                    } : {}, {
                        payed_fee: parseInt(a.payed_fee)
                    }));
                }
            } else u.login(function() {
                l(e);
            });
        },
        fail: function(e) {
            u.hideLoading(), u.showFailedToast("数据加载失败，服务器请求超时");
        }
    });
}

var f = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, u = require("../../utils/util.js"), m = getApp(), h = require("../../tmp/tmp.js");

Page({
    data: {
        formItems: [],
        tmpItems: [],
        field: {},
        cid: "",
        displacement: !1,
        noEdit: !0,
        confirm: {
            title: "确定取消报名吗？",
            body: "如果取消报名，已付的报名费会自动原路退回：\n1. 如果用微信零钱支付的报名费用，系统会立即退还到你的微信钱包。\n2. 如果用银行卡支付的报名费用，系统24小时内会退还到你的银行卡。"
        },
        proName: m.globalData.proName,
        singleAmount: m.globalData.singleAmount
    },
    onLoad: function(t) {
        console.log("options ===== : ", t);
        var a = u.getStorage("enroll") || {
            req_info: []
        };
        console.log(t);
        t.cid && (a = {
            req_info: []
        }), a = e(a), this.setData({
            eid: t.eid,
          type: t&& t.type||0,
            info_id: t.info_id || "",
            pay_status: t.pay_status || 0,
            fee: t.fee,
            status:t&& t.status||0,
            selfInfoId: t.self_info_id || "",
            displacement: t.self_info_id ? 1 : 0,
            formItems: a.req_info,
            tmpItems: a.req_info,
            verify: a.verify || 0,
            verified: a.verified || 0,
            can_quit: void 0 == a.can_quit ? 1 : a.can_quit,
            cid: a.cid || "",
            itemLimit: a.item_limit || 0
        });
        var i = this;
        h.wxLogin(this, function() {
            i.init(t);
        }), u.checkSession(this, function() {
            i.init(t);
        });
        for (var o = u.getStorage("enroll_goods"), n = o.length, s = 0, d = 0; d < n; d++) s += o[d].fee;
        this.setData({
            goods: o,
            totalFee: s
        }), u.removeStorage("enroll_goods"), (this.data.fee > this.data.singleAmount || 5 == a.temp) && l(this);
    },
    init: function(e) {
        e.cid ? d(this) : e.info_id && o(this);
    },
    onShow: function() {
        var e = u.getStorage("enroll_kf");
        this.setData({
            kf: e || {}
        });
        var t = u.getStorage("drawing");
        if (t) {
            var a = u.getStorage("drawingIndex"), i = this.data.formItems;
            i[a].field_value = t, this.setData({
                formItems: i
            }), u.removeStorage("drawing");
        }
    },
    changeDisplacement: function() {
        this.setData({
            displacement: !this.data.displacement
        });
    },
    fieldInput: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.formItems;
        a[t].field_value = e.detail.value, this.setData({
            formItems: a
        });
    },
    radioChange: function(e) {
        var t = e.detail.value, a = e.currentTarget.dataset.index, i = this.data.formItems;
        i[a].field_value = t;
        for (var o = i[a].options, n = 0; n < o.length; n++) o[n].checked = 0, t == o[n].name && (o[n].checked = 1);
        this.setData({
            formItems: i
        });
    },
    checkboxChange: function(e) {
        var t = e.detail.value, a = e.currentTarget.dataset.index, i = this.data.formItems, o = i[a].options;
        i[a].field_value = [];
        for (var n = 0; n < o.length; n++) {
            o[n].checked = 0;
            for (var s = 0; s < t.length; s++) t[s] == o[n].name && (o[n].checked = 1, i[a].field_value.push(t[s]));
        }
        this.setData({
            formItems: i
        });
    },
    changeEndDate: function(e) {
        var t = e.detail.value, a = e.currentTarget.dataset.index, i = this.data.formItems;
        i[a].field_value = t, i[a].end_date = t, this.setData({
            formItems: i
        });
    },
    changeEndTime: function(e) {
        var t = e.detail.value, a = e.currentTarget.dataset.index, i = this.data.formItems;
        i[a].field_value = t, i[a].end_time = t, this.setData({
            formItems: i
        });
    },
    login1: function(e) {
        if (!(e.detail.errMsg.indexOf("fail") > 0)) {
            var t = this;
            u.showLoading("正在登录..."), u.buttonLogin(function() {
                u.hideLoading(), t.setData({
                    hasUserInfo: !0
                }), t.enrollData(e);
            }, function() {
                u.hideLoading();
            }, e.detail);
        }
    },
    postFormId: function(e) {
        u.postFormId(e.detail.formId);
    },
    getPhoneNumber: function(e) {
        var t = this, a = e.currentTarget.dataset.index, i = this.data.formItems, o = i[a], n = e.detail.iv, s = e.detail.encryptedData;
        e.detail.errMsg.indexOf("fail") > 0 ? t.setData({
            noAuthPhone: !0
        }) : (u.showLoading("正在获取手机号"), wx.request({
            url: m.globalData.host + "/common/decrypt",
            data: {
                encrypted_data: s,
                iv: n,
                access_token: wx.getStorageSync("accessToken")
            },
            method: "POST",
            success: function(a) {
                if (u.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                    var n = a.data.data.phoneNumber;
                    o.field_value = n, console.log("phone ==== : ", n), t.setData({
                        formItems: i,
                        tmpItems: i
                    }), console.log("formItems ==== :", i);
                } else t.setData({
                    noAuthPhone: !0
                }); else u.login(function() {
                    t.getPhoneNumber(e);
                });
            },
            fail: function(e) {
                u.hideLoading(), u.showFailedToast("获取验证码失败，请重试");
            }
        }));
    },
    enrollData: function(e) {
        if (!this.data.buttonClicked) {
            u.buttonClicked(this);
            for (var o = this.data.formItems, n = o.length, s = [], d = 0; d < n; d++) {
                var r = (h = o[d]).field_value || "";
                if (h.require && h.status) if (0 == h.field_type || 1 == h.field_type || 7 == h.field_type || 13 == h.field_type) {
                    var l = h.min_length || 1;
                    if (u.isTextEmpty(r)) return void u.showModelTips("请输入" + h.field_name);
                    if (r.length < l) return void u.showModelTips(h.field_name + "最少字符长度为" + l);
                } else {
                    if (2 == h.field_type && 0 == r.length || 14 == h.field_type && 0 == r.length) return void u.showModelTips("请选择" + h.field_name);
                    if (3 == h.field_type) {
                        if (0 == r.length) return void u.showModelTips("请选择" + h.field_name);
                        h.field_value = h.end_date, r = h.end_date;
                    } else {
                        if (4 == h.field_type && !r) return void u.showModelTips("请选择" + h.field_name);
                        if (5 == h.field_type && 0 == r.length) return void u.showModelTips("请选择" + h.field_name);
                        if (6 == h.field_type) {
                            if (0 == r.length) return void u.showModelTips("请选择" + h.field_name);
                            h.field_value = h.end_time, r = h.end_time;
                        } else {
                            if (8 == h.field_type && 0 == r.length) return void u.showModelTips("请选择" + h.field_name);
                            if (9 == h.field_type && 0 == r.length) return void u.showModelTips("请选择" + h.field_name);
                            if (10 == h.field_type && "请选择" == r) return void u.showModelTips("请选择" + h.field_name);
                            if (11 == h.field_type && "" == r) return void u.showModelTips("请选择" + h.field_name);
                            if (12 == h.field_type && (r.indexOf("请选择") > -1 || "省市区" == r.join(""))) return void u.showModelTips("请选择完整的" + h.field_name);
                        }
                    }
                } else if (0 == h.field_type) {
                    var f = h.min_length || 1;
                    if (r.length < f && !u.isTextEmpty(r)) return void u.showModelTips(h.field_name + "最少字符长度为" + f);
                }
                s.push({
                    field_name: h.field_name,
                    field_value: r,
                    field_key: h.field_key
                });
            }
            this.setData({
                info: s
            });
            for (var c = this.data.goods || [], n = c.length, m = 0, d = 0; d < n; d++) {
                var h = c[d];
                m += h.consume;
            }
            if (0 != m || 0 == n) {
                var g = e.currentTarget.dataset.type;
                if (console.log("type: " + g), 2 == g) i(this); else if (this.data.info_id) a(this); else {
                    var p = this.data, _ = p.can_quit, v = p.cid;
                    if (0 != _ || v) t(this); else {
                        var w = this;
                        wx.showModal({
                            title: "温馨提示",
                            content: "报名成功后不允许取消，如有特殊情况，请联系发起人。",
                            confirmColor: "#12b7f5",
                            success: function(e) {
                                e.confirm && t(w);
                            }
                        });
                    }
                }
            } else u.showModelTips("请至少选择一个报名项目");
        }
    },
    exitEnroll: function(e) {
        var t = this, a = this.data, i = a.can_quit, o = a.confirm;
        this.data.fee > 0 ? (0 == i && (o.body = "“取消报名”将会发送通知给发起者，发起者同意后，即可取消报名。如果是付费报名，费用会自动原路退回。"), 
        this.setData({
            confirmDialog: !0,
            confirm: o
        })) : 0 == i ? (o.body = "“取消报名”将会发送通知给发起者，发起者同意后，即可取消报名。如果是付费报名，费用会自动原路退回。", this.setData({
            confirmDialog: !0,
            confirm: o
        })) : wx.showModal({
            title: "取消确认",
            content: "确定要取消此报名吗？",
            confirmColor: "#12b7f5",
            success: function(e) {
                e.confirm && s(t);
            }
        });
    },
    showPic: function(e) {
        wx.previewImage({
            urls: [ e.currentTarget.dataset.src ]
        });
    },
    chooseImage: function(e) {
        var t = this, a = e.currentTarget.dataset.index, i = this.data.formItems, o = i[a], n = o.field_value || [];
        14 == o.field_type && n.length > 0 ? u.showModelTips(o.field_name + "只能上传一张图片") : 2 == o.field_type && n.length >= 9 ? u.showModelTips(o.field_name + "最多上传九张图片") : wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var a = e.tempFilePaths[0];
                u.showLoading("上传中..."), wx.uploadFile({
                    url: m.globalData.host + "/image/v2/upload",
                    filePath: a,
                    name: "file",
                    formData: {},
                    success: function(e) {
                        var a = e.data, s = JSON.parse(a).data.url;
                        n.push(s), o.field_value = n, t.setData({
                            formItems: i
                        });
                    },
                    fail: function(e) {
                        u.showFailedToast("上传图片失败，请重试");
                    },
                    complete: function() {
                        u.hideLoading();
                    }
                });
            }
        });
    },
    deleteOption: function(e) {
        var t = e.currentTarget.dataset.index, a = e.currentTarget.dataset.idx, i = this.data.formItems;
        i[t].field_value.splice(a, 1), this.setData({
            formItems: i
        });
    },
    deleteDraw: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.formItems;
        a[t].field_value = "", this.setData({
            formItems: a
        });
    },
    closeConfirmDialog: function() {
        this.setData({
            confirmDialog: !1
        });
    },
    confirmOk: function() {
        s(this);
    },
    toVoucherDetail: function(e) {
        u.buttonClicked(this), wx.navigateTo({
            url: "/subpackage/voucher/voucher?info_id=" + this.data.info_id
        }), this.closeSuccessDialog();
    },
    closeSuccessDialog: function() {
        this.setData({
            enrollSuccessDialog: !1
        });
    },
    chooseLocation: function(e) {
        r(this, e.currentTarget.dataset.index);
    },
    clearAddress: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.formItems;
        a[t].field_value = "", this.setData({
            formItems: a
        });
    },
    toDrawing: function(e) {
        var t = e.currentTarget.dataset.index;
        u.setStorage("drawingIndex", t), wx.navigateTo({
            url: "/subpackage/drawing/drawing"
        });
    },
    setCount: function(e) {
        var t = this.data.itemLimit, a = e.currentTarget.dataset.index, i = e.currentTarget.dataset.type, o = this.data.goods, n = o[a], s = this.getCheckedCount(a);
        if ("minus" == i) n.consume > 0 && (n.consume = parseInt(n.consume) - 1); else {
            if (t > 0 && s >= t) return void u.showModelTips("最多可购买" + t + "个项目");
            if (n.consume > n.stock_limit - 1 && n.stock_limit > 0) return void u.showModelTips("最多可购买" + n.stock_limit + "份");
            n.consume < n.remain ? n.consume = parseInt(n.consume) + 1 : n.consume = n.remain;
        }
        n.consume > 0 && (s += 1, m.globalData.checkedCount = s);
        for (var d = 0, r = 0; r < o.length; r++) {
            var l = o[r];
            d += l.consume * l.fee;
        }
        d = Math.round(d), console.log(o), this.setData({
            goods: o,
            fee: d
        });
    },
    getCheckedCount: function(e) {
        for (var t = this.data.goods, a = 0, i = 0; i < t.length; i++) t[i].consume > 0 && i != e && (a += 1);
        return a;
    },
    showGoodPic: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.goods[t].pics;
        0 != a.length && wx.previewImage({
            urls: a
        });
    },
    changeDropDown: function(e) {
        var t = parseInt(e.detail.value), a = e.currentTarget.dataset.index, i = this.data.formItems;
        i[a].index = t, i[a].field_value = i[a].options[t], this.setData({
            formItems: i
        });
    },
    changeTabs: function(e) {
        var t = e.currentTarget.dataset.index, a = e.currentTarget.dataset.idx, i = this.data.formItems, o = i[t].options[a];
        i[t].field_value != o ? i[t].field_value = o : i[t].field_value = "", this.setData({
            formItems: i
        });
    },
    backPage: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    bindRegionChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        var t = e.detail.value, a = e.currentTarget.dataset.index, i = this.data.formItems;
        i[a].field_value = t, console.log("formItems ===== :"), console.log(i), this.setData({
            formItems: i
        });
    }
});