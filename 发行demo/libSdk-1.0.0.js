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

JSLIB.prototype.bindIdCard = function(o) {
    var e = typeof o;
    if (! ("function" == e || "object" == e)) {
        console.log("error:callback must be a function");
        return
    }
    this.bindIdCardCallback = o;
    var n = {
        callback: "bindIdCardCallback"
    };
    
    this.sendToSdk("bindIdCard", n)
};

JSLIB.prototype.antiIndulged = function (o) {
    this.sendToSdk("antiIndulged", o);
};

JSLIB.prototype.setUser = function (o) {
    // console.log("setUser")
    this.sendToSdk("setUser", o);
};
JSLIB.prototype.logout = function(o) {
    // console.log("logout")
    this.sendToSdk("logout", o)
};
JSLIB.prototype.showOrder = function(o) {
    // console.log("showOrder")
    this.sendToSdk("showOrder", o)
};
JSLIB.prototype.EnterServer = function(o) {
    // console.log("EnterServer")
    this.sendToSdk("EnterServer", o)
};
JSLIB.prototype.CreateRole = function(o) {
    // console.log("CreateRole")
    this.sendToSdk("CreateRole", o)
};
JSLIB.prototype.RoleUpgrade = function(o) {
    // console.log("RoleUpgrade")
    this.sendToSdk("RoleUpgrade", o)
};
JSLIB.prototype.SetStorage = function(o) {
    this.sendToSdk("SetStorage", o)
};
JSLIB.prototype.GetStorage = function(o) {
  var e = typeof o.callback;
  if (! ("function" == e || "object" == e)) {
      console.log("error:callback must be a function");
      return
  }
  this.getStorageCallback = o.callback;
  var n = {
      key: o.key,
      callback: "getStorageCallback"
  };
  
  this.sendToSdk("GetStorage", n)
};
JSLIB.prototype.checkLoginCallback = function(o) {
    console.log("checkLoginCallback");
    return o
};
JSLIB.prototype.getUserCallback = function(o) {
    console.log("getUserCallback");
    console.log(o);
};
JSLIB.prototype.bindIdCardCallBack = function(o) {
    console.log("bindIdCardCallBack");
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
JSLIB.prototype.getStorageCallback = function(o) {
    console.log("getUserCallback");
    console.log(o);
};

