JSLIB = function() {
    this.regListener()
};
JSLIB.prototype.sendToSdk = function(o, e) {
    var n = {
        action: o,
        params: e
    };
    window.parent.postMessage(n, "*")
};
JSLIB.prototype.handle = function(o, e) {
    if ("function" != typeof this[o]) {
        console.log("no such event:" + o);
        return
    }
    this[o](e)
};
JSLIB.prototype.regListener = function() {
    var o = this;
    window.addEventListener("message",
        function(e) {
            var n = e.data;
            if (e.source != window.parent || "object" !== typeof n || "string" !== typeof n.action || "undefined" == typeof n.params) {
                console.log("params error");
                return
            }
            // console.log(n.action);
            o.handle(n.action, n.params)
        })
};
JSLIB.prototype.getUser = function(o) {
    var e = typeof o;
    if (! ("function" == e || "object" == e)) {
        console.log("error:callback must be a function");
        return
    }
    this.getUserCallback = o;
    var n = {
        callback: "getUserCallback"
    };
    this.sendToSdk("getUser", n)
};

JSLIB.prototype.setUser = function (o) {
    this.sendToSdk("setUser", o);
};
JSLIB.prototype.logout = function(o) {
    this.sendToSdk("logout", o)
};
JSLIB.prototype.showOrder = function(o) {
    this.sendToSdk("showOrder", o)
};
// 2019.12.16 防沉迷回调事件注册
JSLIB.prototype.YWDoBindIdCard = function(o) {
    var e = typeof o;
    if (! ("function" == e || "object" == e)) {
        console.log("error:callback must be a function");
        return
    }
    this.bindIdCardCallback = o;
    var n = {
        callback: "bindIdCardCallback"
    };
    this.sendToSdk("YWBindIdCard", n)
};
// 20200529 版署包沙盒支付下发通知
JSLIB.prototype.YWDoSandBoxPay = function(o) {
    var e = typeof o;
    if (! ("function" == e || "object" == e)) {
        console.log("error:callback must be a function");
        return
    }
    this.sandBoxPayCallback = o;
    var n = {
        callback: "sandBoxPayCallback"
    };
    this.sendToSdk("YWSandBoxPay", n)
};
// 2019.12.16 cp通知平台到达防沉迷时间限制
JSLIB.prototype.YWAntiIndulgedLimit = function(o) {
    this.sendToSdk("YWAntiIndulgedLimit", o)
};

JSLIB.prototype.YWPlayerStatusEnterServer = function(o) {
    this.sendToSdk("YWPlayerStatusEnterServer", o)
};
JSLIB.prototype.YWPlayerStatusCreate = function(o) {
    this.sendToSdk("YWPlayerStatusCreate", o)
};
// 2019.8.9新增 进入创角界面调用
JSLIB.prototype.YWPlayerStatusStartCreate = function(o) {
    this.sendToSdk("YWPlayerStatusStartCreate", o)
};
JSLIB.prototype.YWPlayerStatusLevelUp = function(o) {
    this.sendToSdk("YWPlayerStatusLevelUp", o)
};
JSLIB.prototype.shutDown = function(o) {
    this.sendToSdk("shutDown", o)
};
JSLIB.prototype.checkLoginCallback = function(o) {
    console.log("checkLoginCallback");
    return o
};
JSLIB.prototype.getUserCallback = function(o) {
    console.log("getUserCallback");
    console.log(o);
};
JSLIB.prototype.bindIdCardCallback = function(o) {
    console.log("bindIdCardCallback");
    console.log(o);
};
JSLIB.prototype.sandBoxPayCallback = function(o) {
    console.log("sandBoxPayCallback");
    console.log(o);
};
JSLIB.prototype.onOrderOkCallback = function(o) {
    console.log("onOrderOkCallback");
    console.log(o)
};
JSLIB.prototype.onOrderCancelCallback = function(o) {
    console.log("onOrderCancelCallback");
    console.log(o)
};
