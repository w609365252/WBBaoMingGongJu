Page({
    data: {},
    onLoad: function(a) {
        var e = a.url;
        e = decodeURIComponent(e), this.setData({
            url: e
        });
    },
    onShareAppMessage: function() {}
});