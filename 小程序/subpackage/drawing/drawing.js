function t(t, s) {
    wx.uploadFile({
        url: a.globalData.host + "/file/v1/upload",
        filePath: s,
        name: "file",
        formData: {
            access_token: e.getStorage("accessToken")
        },
        success: function(t) {
            e.hideLoading();
            var a = t.data, s = JSON.parse(a);
            if (0 == s.sta) {
                var i = s.data.urls[0];
                e.setStorage("drawing", i), wx.navigateBack({
                    delta: 1
                });
            } else e.showFailedToast(s.msg);
        },
        fail: function(t) {
            e.hideLoading(), e.showFailedToast("上传图片失败，请重试");
        }
    });
}

var e = require("../../utils/util.js"), a = getApp();

Page({
    data: {
        pen: {
            lineWidth: 4,
            color: "#00a8f3",
            bgColor: "#ffffff",
            clearWidth: 20
        }
    },
    onLoad: function(t) {
        this.clearCanvas();
    },
    onShow: function() {},
    touchStart: function(t) {
        this.startX = t.changedTouches[0].x, this.startY = t.changedTouches[0].y, this.context = wx.createContext(), 
        this.data.isClear ? (this.context.setStrokeStyle(this.data.pen.bgColor), this.context.setLineCap("round"), 
        this.context.setLineJoin("round"), this.context.setLineWidth(this.data.pen.clearWidth), 
        this.context.save(), this.context.beginPath(), this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, !0), 
        this.context.fill(), this.context.restore()) : (this.context.setStrokeStyle(this.data.pen.color), 
        this.context.setLineWidth(this.data.pen.lineWidth), this.context.setLineCap("round"), 
        this.context.beginPath());
    },
    touchMove: function(t) {
        var e = t.changedTouches[0].x, a = t.changedTouches[0].y;
        this.data.isClear ? (this.context.save(), this.context.moveTo(this.startX, this.startY), 
        this.context.lineTo(e, a), this.context.stroke(), this.context.restore(), this.startX = e, 
        this.startY = a) : (this.context.moveTo(this.startX, this.startY), this.context.lineTo(e, a), 
        this.context.stroke(), this.startX = e, this.startY = a), wx.drawCanvas({
            canvasId: "drawing",
            reserve: !0,
            actions: this.context.getActions()
        });
    },
    setColor: function(t) {
        var e = t.currentTarget.dataset.type, a = !1, s = "#009688";
        "eraser" == e ? a = !0 : "black" == e && (s = "#000000");
        var i = this.data.pen;
        i.color = s, this.setData({
            isClear: a,
            pen: i
        });
    },
    clearCanvas: function() {
        var t = this.data.pen.bgColor, e = wx.createCanvasContext("drawing");
        e.setFillStyle(t), e.fillRect(0, 0, 99999, 99999), e.draw();
    },
    saveCanvas: function(a) {
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 750,
            height: 1080,
            destWidth: 750,
            destHeight: 1080,
            canvasId: "drawing",
            success: function(a) {
                e.showLoading("正在上传图片"), t(0, a.tempFilePath);
            }
        });
    }
});