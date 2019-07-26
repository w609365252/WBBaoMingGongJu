function t(a) {
    null == a.data.enroll && (e.showLoading("正在加载数据"), a.setData({
        showLoadError: 0
    })), wx.request({
      url: s.globalData.host + "/SignUpForm/CertDetail",
        data: {
            eid: a.data.eid,
            access_token: e.getToken(),
            info_id: a.data.info_id
        },
        method: "GET",
        dataType: "json",
        success: function(o) {
            if (console.log(o), e.hideLoading(), -500 != o.data.sta) if (0 == o.data.sta) {
                var s = o.data.data, d = e.formatDate(1e3 * s.start_time, "MM/dd HH:mm"), n = e.formatDate(1e3 * s.end_time, "MM/dd HH:mm"), i = e.formatDate(1e3 * s.act_start, "MM/dd HH:mm"), c = e.formatDate(1e3 * s.act_end, "MM/dd HH:mm"), r = e.formatDate(1e3 * s.enroll_time, "yyyy-MM-dd HH:mm");
                s.startTime = d, s.endTime = n, s.actStartTime = i, s.actEndTime = c, s.enrollTime = r;
                for (var l = s.items, m = l.length, h = 0; h < m; h++) l[h].name = e.getWords(l[h].name, 28, !0);
                var w = a.data.downloadImg;
                w.push(s.qrcode), w.push("https://cdn-xcxcustom.weiyoubot.cn/20190510/0f6ae81daa11cd8389a7d0e6075d66da.png"), 
                w.push("https://cdn-xcxcustom.weiyoubot.cn/20190510/ab4d0d70a94825cda587c783bb2d98fd.png"), 
                w.push("https://cdn-xcxcustom.weiyoubot.cn/20190514/3e2c35de99d5b1b21a11f194663e8b49.png"), 
                6 == s.temp && (w.push("https://cdn-xcxcustom.weiyoubot.cn/20190514/948b9f2df750da117ee4285647b67174.png"), 
                w.push("https://cdn-xcxcustom.weiyoubot.cn/20190514/94370861c2c897f8a37361262d408784.png")), 
                a.setData({
                    downloadImg: w,
                    enroll: s
                }), console.log("downloadImg: ", w), a.downloadImages(w, 0);
            } else e.showFailedToast("数据加载失败", o.data.msg); else e.login(function() {
                t(a);
            });
        },
        fail: function(t) {
            e.hideLoading(), null == a.data.enroll && a.setData({
                showLoadError: 1
            });
        }
    });
}

function a(t, a) {
    var o = wx.getSystemInfoSync().SDKVersion;
    e.compareVersion(o, "2.0.7") > -1 ? t.setData({
        openSettingDialog: !0
    }) : wx.openSetting ? wx.showModal({
        title: "提示",
        content: "请授权报名工具访问相册，该操作仅会方便您保存图片到相册，请放心授权。",
        cancelText: "不想授权",
        confirmText: "去授权",
        confirmColor: "#12b7f5",
        success: function(o) {
            o.confirm ? a && wx.openSetting({
                complete: function(e) {
                    saveImage(t, a);
                }
            }) : o.cancel && e.showModelTips("如果您不愿授权，也可以截图保存到系统相册。");
        }
    }) : e.showModelTips("如果您不愿授权，也可以截图保存到系统相册。");
}

var e = require("../../utils/util.js"), o = require("../../tmp/tmp.js"), s = getApp();

Page({
    data: {
        eid: "",
        downloadImg: [],
        canvas_h: 680,
        adId: "dc6e006d91a79a5161cd3782725667bc"
    },
    onLoad: function(a) {
        var s = a.info_id || "";
        a.scene && (s = decodeURIComponent(a.scene));
        var d = wx.getSystemInfoSync();
        this.setData({
            eid: a.eid || "",
            info_id: s,
            scale: d.screenWidth / 375
        });
        var n = this;
        o.wxLogin(this, function() {
            t(n), o.ads(n, n.data.adId, "voucher");
        }), e.checkSession(this, function() {
            t(n), o.ads(n, n.data.adId, "voucher");
        });
    },
    postFormId: function(t) {
        e.postFormId(t.detail.formId);
    },
    downloadImages: function(t, a) {
        e.showLoading("正在生成图片");
        var o = t&&t.length||0, s = this;
        wx.downloadFile({
            url: t[a],
            success: function(e) {
                t[a] = e.tempFilePath, a == o - 1 ? (s.setData({
                    downloadImg: t
                }), s.makeShare()) : s.downloadImages(t, a + 1);
            }
        });
    },
    saveQrcode: function() {
        e.showLoading("正在生成图片"), this.setData({
            canvasShow: !0
        });
        var t = this;
        setTimeout(function() {
            t.makeShare("true");
        }, 180);
    },
    makeShare: function(t) {
        var a = this.data.enroll;
        s.globalData.scale = this.data.scale;
        var o = wx.createCanvasContext("share"), d = 680, n = this.data, i = n.w_height, c = n.w_width;
        this.data.w_height && (d = 345 * (i / c) + e.getRefillHeight(c)), this.setData({
            canvas_h: d
        }), e.drawRect(o, {
            x: 0,
            y: 0,
            w: 345,
            h: d,
            bg: "#fff"
        });
        var r = a.title, l = r.length, m = 30, h = e.getWords(r, 38);
        l > h.length ? (e.drawText(o, {
            x: 15,
            y: m,
            text: h,
            fs: 17,
            color: "#333",
            bold: !0
        }), e.drawText(o, {
            x: 15,
            y: m + 25,
            text: e.getWords(r.slice(h.length), 36, !0),
            fs: 17,
            color: "#333",
            bold: !0
        }), m += 25) : e.drawText(o, {
            x: 15,
            y: m,
            text: r,
            fs: 17,
            color: "#333",
            bold: !0
        });
        var w = "报名时间：";
        if (6 == a.temp && (w = "活动时间："), e.drawImage(o, {
            x: 15,
            y: m + 18,
            w: 15,
            h: 15,
            src: this.data.downloadImg[2]
        }), e.drawText(o, {
            x: 36,
            y: m + 30,
            text: w + a.startTime + " - " + a.endTime,
            fs: 14,
            color: "#333"
        }), m += 25, a.act_start && (e.drawImage(o, {
            x: 15,
            y: m + 20,
            w: 15,
            h: 15,
            src: this.data.downloadImg[2]
        }), e.drawText(o, {
            x: 36,
            y: m + 33,
            text: "活动时间：" + a.actStartTime + " - " + a.actEndTime,
            fs: 14,
            color: "#333"
        }), m += 25), a.address) {
            var x = e.getWords(a.address, 35, !0);
            e.drawImage(o, {
                x: 15,
                y: m + 20,
                w: 15,
                h: 15,
                src: this.data.downloadImg[1]
            }), e.drawText(o, {
                x: 36,
                y: m + 33,
                text: "活动地址：" + x,
                fs: 14,
                color: "#333"
            }), m += 25;
        }
        6 == a.temp && (e.drawImage(o, {
            x: 15,
            y: m + 20,
            w: 15,
            h: 15,
            src: this.data.downloadImg[5]
        }), e.drawText(o, {
            x: 36,
            y: m + 33,
            text: "拼团价格：" + a.items[0].team_fee / 100 + "元",
            fs: 14,
            color: "#333"
        }), m += 25, e.drawImage(o, {
            x: 15,
            y: m + 20,
            w: 15,
            h: 15,
            src: this.data.downloadImg[5]
        }), e.drawText(o, {
            x: 36,
            y: m + 33,
            text: "单购价格：" + a.items[0].fee / 100 + "元",
            fs: 14,
            color: "#333"
        }), m += 25, e.drawImage(o, {
            x: 15,
            y: m + 20,
            w: 15,
            h: 15,
            src: this.data.downloadImg[4]
        }), e.drawText(o, {
            x: 36,
            y: m + 33,
            text: "拼团人数：" + a.items[0].team_num + "人成团",
            fs: 14,
            color: "#333"
        }), m += 25), e.drawText(o, {
            x: 15,
            y: m + 48,
            text: "报名凭证",
            fs: 15,
            color: "#333"
        }), e.drawImage(o, {
            x: 98,
            y: m + 75,
            w: 150,
            h: 150,
            src: this.data.downloadImg[0]
        }), e.drawImage(o, {
            x: 0,
            y: m + 240,
            w: 345,
            h: 13,
            src: this.data.downloadImg[3]
        });
        var f = "报名时间：";
        6 == a.temp && (f = "购买时间："), e.drawText(o, {
            x: 15,
            y: m + 275,
            text: "参与者：   " + e.getWords(a.name, 24),
            fs: 14,
            color: "#333"
        }), e.drawText(o, {
            x: 15,
            y: m + 300,
            text: f + a.enrollTime,
            fs: 14,
            color: "#333"
        }), m += 300;
        var g = 1;
        if (6 == a.temp) {
            m += 25, e.drawText(o, {
                x: 15,
                y: m,
                text: "购买数量：" + a.items[0].count,
                fs: 14,
                color: "#333"
            }), m += 25;
            var u = a.items[0].team_fee / 100;
            1 == a.single && (u = a.items[0].fee / 100), e.drawText(o, {
                x: 15,
                y: m,
                text: "购买费用：" + u + "元",
                fs: 14,
                color: "#333"
            });
        } else if (a.fee && (m += 25, e.drawText(o, {
            x: 15,
            y: m,
            text: "报名费用：" + a.fee / 100 + "元",
            fs: 14,
            color: "#333"
        })), m += 25, g = a.items.length) {
            e.drawText(o, {
                x: 15,
                y: m,
                text: "报名项目：",
                fs: 14,
                color: "#333"
            });
            for (var v = 0; v < g; v++) {
                var p = a.items[v];
                e.drawText(o, {
                    x: 85,
                    y: m + 25 * v,
                    text: p.name + " x " + p.count,
                    fs: 14,
                    color: "#333"
                });
            }
        }
        if (this.setData({
            canvas_h: (m + 25 * g - 10) * this.data.scale
        }), o.draw(), e.hideLoading(), t) {
            var T = this;
            setTimeout(function() {
                T.saveImg();
            }, 100);
        }
    },
    saveImg: function() {
        var t = this.data.scale, o = this, s = this.data.canvas_h;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 690 * t,
            height: t * s * 2,
            canvasId: "share",
            success: function(t) {
                var s = t.tempFilePath;
                wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
                    filePath: s,
                    success: function(t) {
                        e.hideLoading(), e.showModelTips("已保存到您的相册，可以去看看");
                    },
                    fail: function(t) {
                        e.hideLoading(), t.errMsg.indexOf("cancel") > -1 || a(o, s);
                    }
                }) : e.showModelTips("您的微信版本太低，建议点击图片，长按保存到本地。");
            }
        });
    },
    prevCanvas: function() {
        var t = this.data.scale, a = this.data.canvas_h;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 690 * t,
            height: t * a * 2,
            canvasId: "share",
            success: function(t) {
                wx.previewImage({
                    urls: [ t.tempFilePath ]
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    }
});