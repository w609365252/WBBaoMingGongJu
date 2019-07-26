function a(t) {
    s.showLoading("正在获取图片");
    wx.request({
      url: n.globalData.host + "/SignUpForm/share",
        data: {
            eid: t.data.eid,
            type: 1,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(e) {
            if (s.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) if (e.data.data) {
                var o = e.data.data.url, n = t.data, i = n.downloadImg, d = n.enroll;
                i.push(o), i.push("https://cdn-xcxcustom.weiyoubot.cn/20190510/0f6ae81daa11cd8389a7d0e6075d66da.png"), 
                i.push("https://cdn-xcxcustom.weiyoubot.cn/20190510/ab4d0d70a94825cda587c783bb2d98fd.png"), 
                d.owner_pic.indexOf("wx.qlogo.cn") < 0 && i.push(d.owner_pic), t.setData({
                    qrcode: o,
                    downloadImg: i,
                    canvasShow: !0
                }), t.downloadImages(t.data.downloadImg, 0);
            } else s.showFailedToast("获取图片失败，请重试。", e.data.msg); else s.showFailedToast("获取图片失败，请重试。", e.data.msg); else s.login(function() {
                a(t);
            });
        },
        fail: function(a) {
            s.hideLoading(), s.showFailedToast("获取图片失败，请重试");
        }
    });
}

function t(a, t) {
    wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
        filePath: t,
        success: function(a) {
            s.hideLoading(), s.showModelTips("该图片已保存到您的手机相册，可以直接去分享啦~");
        },
        fail: function(o) {
            s.hideLoading(), o.errMsg.indexOf("cancel") > -1 || e(a, t);
        }
    }) : s.showModelTips("您的微信版本太低，建议点击图片，长按保存到本地。");
}

function e(a, e) {
    var o = wx.getSystemInfoSync().SDKVersion;
    s.compareVersion(o, "2.0.7") > -1 ? a.setData({
        openSettingDialog: !0
    }) : wx.openSetting ? wx.showModal({
        title: "提示",
        content: "请授权报名工具访问相册，该操作仅会方便您保存图片到相册，请放心授权。",
        cancelText: "不想授权",
        confirmText: "去授权",
        confirmColor: "#12b7f5",
        success: function(o) {
            o.confirm ? e && wx.openSetting({
                complete: function(o) {
                    t(a, e);
                }
            }) : o.cancel && s.showModelTips("如果您不愿授权，也可以截图保存到系统相册。");
        }
    }) : s.showModelTips("如果您不愿授权，也可以截图保存到系统相册。");
}

function o(a, t, e) {
    wx.uploadFile({
        url: n.globalData.host + "/file/v1/upload",
        filePath: t,
        name: "file",
        formData: {
            access_token: s.getStorage("accessToken"),
            type: ""
        },
        success: function(n) {
            var i = n.data, d = JSON.parse(i);
            if (-500 != d.sta) if (0 == d.sta) {
                a.data.avatar;
                var l = d.data.urls[0], r = a.data, c = r.downloadImg, h = r.enroll;
                wx.downloadFile({
                    url: l,
                    success: function(t) {
                        var o = t.tempFilePath;
                        "qr" == e ? c[2] = o : "banner" == e && (c[1] = o), h.banner = l, a.setData({
                            downloadImg: c,
                            enroll: h
                        });
                    }
                }), s.hideLoading();
            } else s.showFailedToast(d.msg); else s.login(function() {
                o(a, t, e);
            });
        },
        fail: function(a) {
            s.showFailedToast("上传图片失败，请重试，检查您的网络问题");
        }
    });
}

var s = require("../../utils/util.js"), n = getApp();

Page({
    data: {
        enroll: {},
        downloadImg: [],
        canvasShow: !0
    },
    onLoad: function(t) {
        var e = wx.getSystemInfoSync(), o = s.getStorage("userInfo"), n = s.getStorage("enroll_share"), i = s.formatDate(1e3 * n.start_time, "MM/dd HH:mm"), d = s.formatDate(1e3 * n.end_time, "MM/dd HH:mm"), l = s.formatDate(1e3 * n.act_start, "MM/dd HH:mm"), r = s.formatDate(1e3 * n.act_end, "MM/dd HH:mm");
        n.startTime = i, n.endTime = d, n.actStartTime = l, n.actEndTime = r, n.banner = n.banner ? n.banner : "https://cdn-xcxcustom.weiyoubot.cn/20190513/41dfafbde418cfc2641bd1be842653c1.jpeg";
        var c = this.data.downloadImg;
        c.push(n.is_owner ? n.owner_pic : o.avatarUrl), c.push(n.banner), console.log("screen width : === ", e.screenWidth), 
        console.log(c), this.setData({
            userInfo: o,
            enroll: n,
            eid: n.eid,
            scale: e.screenWidth / 375,
            downloadImg: c
        }), this.getBoxInfo(), a(this);
    },
    onShow: function() {},
    closeOpenSetting: function() {
        this.setData({
            openSettingDialog: !1
        });
    },
    getBoxInfo: function() {
        var a = this;
        wx.createSelectorQuery().select("#wrapper").boundingClientRect(function(t) {
            console.log("wrapper info ==== :", t), a.setData({
                w_height: t.height,
                w_width: t.width
            });
        }).exec();
    },
    imageLoad: function(a) {
        this.setData({
            b_width: a.detail.width,
            b_height: a.detail.height
        });
    },
    downloadImages: function(a, t) {
        s.showLoading("正在生成图片");
        var e = a.length, o = this;
        wx.downloadFile({
            url: a[t],
            success: function(s) {
                a[t] = s.tempFilePath, t == e - 1 ? (o.setData({
                    downloadImg: a
                }), o.makeShare()) : o.downloadImages(a, t + 1);
            }
        });
    },
    saveQrcode: function() {
        s.showLoading("正在生成图片"), this.setData({
            canvasShow: !0
        });
        var a = this;
        setTimeout(function() {
            a.makeShare("true");
        }, 180);
    },
    makeShare: function(a) {
        var t = this.data, e = t.enroll, o = t.userInfo;
        n.globalData.scale = this.data.scale;
        var i = wx.createCanvasContext("share"), d = 680, l = this.data, r = l.w_height, c = l.w_width;
        this.data.w_height && (d = 345 * (r / c) + s.getRefillHeight(c)), this.setData({
            canvas_h: d
        }), s.drawRect(i, {
            x: 0,
            y: 0,
            w: 345,
            h: d,
            bg: "#fff"
        });
        var h = this.data, g = h.b_height, w = h.b_width, f = 178;
        this.data.b_height && (f = 315 / w * g);
        var u = 76 - (f - 178) / 2;
        f < 178 && (u = (178 - f) / 2 + 76), s.drawImage(i, {
            x: 15,
            y: u,
            w: 315,
            h: f,
            src: this.data.downloadImg[1]
        }), s.drawRect(i, {
            x: 0,
            y: 0,
            w: 345,
            h: 80,
            bg: "#fff"
        }), s.drawRect(i, {
            x: 12,
            y: 258,
            w: 325,
            h: 200,
            bg: "#fff"
        }), s.drawImage(i, {
            x: 15,
            y: 21,
            w: 42,
            h: 42,
            src: this.data.downloadImg[0]
        }), s.drawArc(i, {
            lineWidth: 13,
            strokeStyle: "#ffffff",
            lineCap: "round",
            x: 36,
            y: 42,
            r: 28,
            sAngle: 0,
            eAngle: 2 * Math.PI,
            wise: !0
        }), s.drawArc(i, {
            lineWidth: 1,
            strokeStyle: "#ddd",
            lineCap: "round",
            x: 36,
            y: 42,
            r: 21,
            sAngle: 0,
            eAngle: 2 * Math.PI,
            wise: !0
        }), s.drawText(i, {
            x: 67,
            y: 35,
            text: e.is_owner && e.auth > 1 ? e.sign_name : o.nickName,
            fs: 15,
            color: "#00a8f3",
            bold: !0
        }), s.drawText(i, {
            x: 67,
            y: 58,
            text: "邀请你一起参加活动，快来报名吧~",
            fs: 14,
            color: "#333"
        });
        var m = e.title, x = m.length, p = 290, v = s.getWords(m, 38);
        if (x > v.length ? (s.drawText(i, {
            x: 15,
            y: p,
            text: v,
            fs: 17,
            color: "#333",
            bold: !0
        }), s.drawText(i, {
            x: 15,
            y: p + 25,
            text: s.getWords(m.slice(v.length), 36, !0),
            fs: 17,
            color: "#333",
            bold: !0
        }), p += 25) : s.drawText(i, {
            x: 15,
            y: p,
            text: m,
            fs: 17,
            color: "#333",
            bold: !0
        }), s.drawImage(i, {
            x: 15,
            y: p + 18,
            w: 15,
            h: 15,
            src: this.data.downloadImg[4]
        }), s.drawText(i, {
            x: 36,
            y: p + 30,
            text: "报名时间：" + e.startTime + " - " + e.endTime,
            fs: 14,
            color: "#333"
        }), p += 25, e.act_start && (s.drawImage(i, {
            x: 15,
            y: p + 20,
            w: 15,
            h: 15,
            src: this.data.downloadImg[4]
        }), s.drawText(i, {
            x: 36,
            y: p + 33,
            text: "活动时间：" + e.actStartTime + " - " + e.actEndTime,
            fs: 14,
            color: "#333"
        }), p += 30), e.address) {
            var T = s.getWords(e.address, 35, !0);
            s.drawImage(i, {
                x: 15,
                y: p + 18,
                w: 15,
                h: 15,
                src: this.data.downloadImg[3]
            }), s.drawText(i, {
                x: 36,
                y: p + 31,
                text: "活动地址：" + T,
                fs: 14,
                color: "#333"
            }), p += 30;
        }
        if (s.drawImage(i, {
            x: 113,
            y: p + 32,
            w: 120,
            h: 120,
            src: this.data.downloadImg[2]
        }), e.auth > 0 && this.data.downloadImg.length > 5 && (s.drawImage(i, {
            x: 154,
            y: p + 73,
            w: 38,
            h: 38,
            src: this.data.downloadImg[5]
        }), s.drawArc(i, {
            lineWidth: 9,
            strokeStyle: "#fff",
            lineCap: "round",
            x: 173,
            y: p + 92,
            r: 23,
            sAngle: 0,
            eAngle: 2 * Math.PI,
            wise: !0
        })), s.drawText(i, {
            x: 101,
            y: p + 175,
            text: "长按识别图中二维码查看",
            fs: 13,
            color: "#666"
        }), this.setData({
            canvas_h: (p + 195) * this.data.scale
        }), i.draw(), s.hideLoading(), a) {
            var I = this;
            setTimeout(function() {
                I.saveImg();
            }, 100);
        }
    },
    saveImg: function() {
        var a = this.data.scale, t = this, o = this.data.canvas_h;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 690 * a,
            height: a * o * 2,
            canvasId: "share",
            success: function(a) {
                var o = a.tempFilePath;
                wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
                    filePath: o,
                    success: function(a) {
                        s.hideLoading(), s.showModelTips("已保存到您的相册，可以去看看");
                    },
                    fail: function(a) {
                        s.hideLoading(), a.errMsg.indexOf("cancel") > -1 || e(t, o);
                    }
                }) : s.showModelTips("您的微信版本太低，建议点击图片，长按保存到本地。");
            }
        });
    },
    editContent: function() {
        this.setData({
            canvasShow: !this.data.canvasShow
        });
        var a = this;
        setTimeout(function() {
            a.makeShare();
        }, 100);
    },
    prevCanvas: function() {
        var a = this.data.scale, t = this.data.canvas_h;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 690 * a,
            height: a * t * 2,
            canvasId: "share",
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
    uploadImage: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = t.tempFilePaths;
                s.showLoading("上传中..."), o(a, e[0], "banner");
            },
            fail: function(a) {
                a.errMsg.indexOf("permission") > 0 ? s.showFailedToast("请在设置-应用-微信-权限中开启相机权限") : -1 == a.errMsg.indexOf("fail") && -1 == a.errMsg.indexOf("cancel") && s.showFailedToast(a.errMsg);
            }
        });
    },
    openEditText: function() {
        this.setData({
            editTextDialog: !0
        });
    },
    closeCodeDialog: function() {
        this.setData({
            editTextDialog: !1
        });
    },
    inputText: function(a) {
        var t = this.data.enroll;
        t.title = a.detail.value, this.setData({
            enroll: t
        });
    },
    editText: function() {
        var a = this.data.enroll, t = a.title, e = s.hasSensitiveWords(t);
        if (e) return s.showModelTips("报名标题包含敏感词，已经自动处理为*，请重新编辑"), a.title = s.replaceAll(t, e), 
        void this.setData({
            enroll: a
        });
        this.setData({
            editTextDialog: !1
        }), this.getBoxInfo();
    }
});