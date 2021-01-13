var _this = this;
$('#games').attr('src',_this.info.game_src)
var objs = new JSLIB(); //初始化平台sdk

function doLogout(o) { //注销
    objs.logout(o.action, o.params)
}

function sendToGame(o) { //载入后游戏发送平台getuser消息
    objs.getUser(o.params)
}

function doSetUser(o) { //游戏二次校验完成返回给平台
    var uid = o.params.uid;
    localStorage.setItem('user_id', uid);
    uid = JSON.stringify(uid);
    if (uid.search("_") != -1) {
        o.params.uid = uid.match(/_(\S*)/)[1];
        o.params.uid = parseInt(o.params.uid)
    }
    objs.setUser(o.params)
}

function doShowOrderView(o) { //游戏返回支付信息返回给平台
    var notify = JSON.parse(o.params);
    $.ajax({
        type: "POST",
        url: "https://h5.54.com/pay/pay",
        data: {
            user_id: localStorage.getItem('user_id'),
            channel_id: _this.info.channel,
            xx_game_id: _this.info.xx_game_id,
            notify_url: notify.notifyUrl,
            product_id: notify.productId,
            total_fee: notify.zfAmount,
            app_role_id: notify.roleId,
            app_order_id: notify.orderId,
            server_id: notify.serverId,
            app_role_name: notify.roleName,
            device_id: "",
            tp:notify.tp
        },
        dataType: "json",
        success: function (data) { //请求成功处理 
            notify.notifyUrl = data.content.notify_url;
            objs.showOrder(JSON.stringify(notify))
        },
        error: function (err) { //请求失败处理  
            console.log(err)
        }
    })
}

function EnterServer(o) { //玩家进入服务器时调用返回平台
    objs.YWPlayerStatusEnterServer(o.params)
}

function CreateRole(o) { //玩家创建角色时调用返回平台
    $.ajax({
        type: "POST",
        url: "https://h5.54.com/user/roleCreate",
        data: {
            xx_game_id: _this.info.xx_game_id,
            user_id: localStorage.getItem('user_id'),
            channel_id: _this.info.channel,
            role_id: o.params.roleId,
            role_name: o.params.roleName,
            server_id: o.params.serverId,
            server_name: o.params.serverName,
            level: o.params.roleLevel,
            guild: o.params.partyName,
            money: o.params.balance
        },
        dataType: "json",
        success: function (data) { //请求成功处理 
            console.log(data)//
        },
        error: function (err) { //请求失败处理  
            console.log(err)
        }
    })
    objs.YWPlayerStatusCreate(o.params)
}

function RoleUpgrade(o) { // 玩家升级时调用返回平台
    objs.YWPlayerStatusLevelUp(o.params)
}

function shutDown(o) { //关闭窗口返回平台
    objs.shutDown("shutDown")
}

function SetStorage(o) {
  console.log('yw storage set', o.params.key, o.params.value);
  localStorage.setItem(o.params.key, o.params.value);
}

function GetStorage(o) {
  console.log('yw storage get', o.params.key, localStorage.getItem(o.params.key));
  var o = {
    action: 'getStorageCallback',
    params: localStorage.getItem(o.params.key)
  }
  window.frames["games"].contentWindow.postMessage(o, "*");
}

//接收到平台数据发送给cp
function zgetusercall(e) { //用户信息发送给cp进行二次验证
    var o = {
        action:e.action,
        params:{
            authorize_code: e.params.session_id,
            device_id:"",
            ext_info:_this.info.ext_info,
            channel:_this.info.channel,
            xx_game_id:_this.info.xx_game_id,
            is_bind_ID_card: e.params.is_bind_ID_card,
            is_adult: e.params.is_adult
        }
    }
    
    window.frames["games"].contentWindow.postMessage(o, "*");
}

// 接受研发实名制回调
function doBindIdCard(o) {
    objs.YWDoBindIdCard(o.params)
}

// 未实名认证退出
function doAntiIndulged(o) {
    // 这里调用平台退出方法
    objs.YWAntiIndulgedLimit(o.params)
}

function notifyCpBindIdCard(e) {
  window.frames["games"].contentWindow.postMessage(e, "*");
}