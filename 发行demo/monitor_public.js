window.onload=function(){
    var _this = this;
    new_element=document.createElement("script");
    new_element.setAttribute("type","text/javascript");
    new_element.setAttribute("src",info.init_src);// 在这里引入了a.js
    document.body.appendChild(new_element);


    window.addEventListener('message', function (e) {
        var obj = e.data;
        if (!obj || !obj.action || !obj.params) {
            console.log("params error");
            return;
        }
        switch (obj.action) {
            case 'logout'://退出账号
                doLogout(obj);
                break;
            case 'getUser'://调起登录   
                sendToGame(obj);
                break;
            case 'setUser'://校验完成
                doSetUser(obj);
                break;
            case 'showOrder'://调起支付
                var notify = JSON.parse(obj.params);
                if (notify.serverName) {
                    notify.serverName = decodeURIComponent(notify.serverName)
                    obj.params = JSON.stringify(notify) 
                }
                doShowOrderView(obj);
                break;
            case 'EnterServer'://玩家进入服务器时调用
                if (obj.params.serverName) {
                    obj.params.serverName = decodeURIComponent(obj.params.serverName)
                }
                EnterServer(obj)
                break;
            case 'CreateRole'://玩家创建角色时调用
                if (obj.params.serverName) {
                    obj.params.serverName = decodeURIComponent(obj.params.serverName)
                }
                CreateRole(obj)
                break;
            case 'RoleUpgrade'://玩家升级时调用
                if (obj.params.serverName) {
                    obj.params.serverName = decodeURIComponent(obj.params.serverName)
                }
                RoleUpgrade(obj)
                break;
            case 'shutDown'://玩家升级时调用
                shutDown(obj)
                break;
            case 'getUserCallback'://接收平台sdk回调
                zgetusercall(obj)
                break;
            case 'bindIdCardCallback'://接收平台sdk回调
                notifyCpBindIdCard(obj)
                break;
            case 'SetStorage':
                SetStorage(obj)
                break;
            case 'GetStorage':
                GetStorage(obj)
                break;
            case 'bindIdCard':
                doBindIdCard(obj)
                break;
            case 'antiIndulged':
                doAntiIndulged(obj)
                break;
            default:
                console.log("error action:");
        }
    });
    //返回给父级
    
    
}