Date.prototype.format = function(mask) {

    var d = this;

    var zeroize = function (value, length) {

        if (!length) length = 2;

        value = String(value);

        for (var i = 0, zeros = ''; i < (length - value.length); i++) {

            zeros += '0';

        }

        return zeros + value;

    };

    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function($0){

        switch($0) {

            case 'd':   return d.getDate();

            case 'dd':  return zeroize(d.getDate());

            case 'ddd': return ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'][d.getDay()];

            case 'dddd':    return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];

            case 'M':   return d.getMonth() + 1;

            case 'MM':  return zeroize(d.getMonth() + 1);

            case 'MMM': return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];

            case 'MMMM':    return ['January','February','March','April','May','June','July','August','September','October','November','December'][d.getMonth()];

            case 'yy':  return String(d.getFullYear()).substr(2);

            case 'yyyy':    return d.getFullYear();

            case 'h':   return d.getHours() % 12 || 12;

            case 'hh':  return zeroize(d.getHours() % 12 || 12);

            case 'H':   return d.getHours();

            case 'HH':  return zeroize(d.getHours());

            case 'm':   return d.getMinutes();

            case 'mm':  return zeroize(d.getMinutes());

            case 's':   return d.getSeconds();

            case 'ss':  return zeroize(d.getSeconds());

            case 'l':   return zeroize(d.getMilliseconds(), 3);

            case 'L':   var m = d.getMilliseconds();

                if (m > 99) m = Math.round(m / 10);

                return zeroize(m);

            case 'tt':  return d.getHours() < 12 ? 'am' : 'pm';

            case 'TT':  return d.getHours() < 12 ? 'AM' : 'PM';

            case 'Z':   return d.toUTCString().match(/[A-Z]+$/);

            // Return quoted strings with the surrounding quotes removed

            default:    return $0.substr(1, $0.length - 2);

        }

    });

};


var DateFormatter = {
    Patterns:{
        YEAR      : /y/g,
        MONTH     : /M/g,
        DAY       : /d/g,
        HOUR      : /H/g,
        MINUTE    : /m/g,
        SECOND    : /s/g,
        MILSECOND : /f/g
    },
    FormatPatterns:function(format){
        return eval("/"+
            format
                .replace(this.Patterns.YEAR,'[0-9]')
                .replace(this.Patterns.MONTH,'[0-9]')
                .replace(this.Patterns.DAY,'[0-9]')
                .replace(this.Patterns.HOUR,'[0-9]')
                .replace(this.Patterns.MINUTE,'[0-9]')
                .replace(this.Patterns.SECOND,'[0-9]')
                .replace(this.Patterns.MILSECOND,'[0-9]')+
            "/g");
    },
    DateISO:function(value,format){
        var formatReg = "";
        if(value == "" || format=="")
            return false;
        formatReg = this.FormatPatterns(format);
        return formatReg.test(value);
    }
}

String.prototype.checkTime = function(format){
   return DateFormatter.DateISO(this,format);
}

String.prototype.getDate = function() {
    var yyyy = this.substring(0,4)||null;
    var mth = this.substring(5,7)||null;
    var dd = this.substring(8,10)||null;
    var hh = this.substring(11,13)||null;
    var mm = this.substring(14,16)||null;
    var ss = this.substring(17)||null;
    return new Date(yyyy,mth,dd,hh,mm,ss);
}

window.Messenger = (function(){

    // 消息前缀, 建议使用自己的项目名, 避免多项目之间的冲突
    // !注意 消息前缀应使用字符串类型
    var prefix = "[PROJECT_NAME]",
        supportPostMessage = 'postMessage' in window;

    // Target 类, 消息对象
    function Target(target, name, prefix){
        var errMsg = '';
        if(arguments.length < 2){
            errMsg = 'target error - target and name are both required';
        } else if (typeof target != 'object'){
            errMsg = 'target error - target itself must be window object';
        } else if (typeof name != 'string'){
            errMsg = 'target error - target name must be string type';
        }
        if(errMsg){
            throw new Error(errMsg);
        }
        this.target = target;
        this.name = name;
        this.prefix = prefix;
    }

    // 往 target 发送消息, 出于安全考虑, 发送消息会带上前缀
    if ( supportPostMessage ){
        // IE8+ 以及现代浏览器支持
        Target.prototype.send = function(msg){
            this.target.postMessage(this.prefix + '|' + this.name + '__Messenger__' + msg, '*');
        };
    } else {
        // 兼容IE 6/7
        Target.prototype.send = function(msg){
            var targetFunc = window.navigator[this.prefix + this.name];
            if ( typeof targetFunc == 'function' ) {
                targetFunc(this.prefix + msg, window);
            } else {
                throw new Error("target callback function is not defined");
            }
        };
    }

    // 信使类
    // 创建Messenger实例时指定, 必须指定Messenger的名字, (可选)指定项目名, 以避免Mashup类应用中的冲突
    // !注意: 父子页面中projectName必须保持一致, 否则无法匹配
    function Messenger(messengerName, projectName){
        this.targets = {};
        this.name = messengerName;
        this.listenFunc = [];
        this.prefix = projectName || prefix;
        this.initListen();
    }

    // 添加一个消息对象
    Messenger.prototype.addTarget = function(target, name){
        var targetObj = new Target(target, name,  this.prefix);
        this.targets[name] = targetObj;
    };

    // 初始化消息监听
    Messenger.prototype.initListen = function(){
        var self = this;
        var generalCallback = function(msg){
            if(typeof msg == 'object' && msg.data){
                msg = msg.data;
            }

            var msgPairs = msg.split('__Messenger__');
            var msg = msgPairs[1];
            var pairs = msgPairs[0].split('|');
            var prefix = pairs[0];
            var name = pairs[1];

            for(var i = 0; i < self.listenFunc.length; i++){
                if (prefix + name === self.prefix + self.name) {
                    self.listenFunc[i](msg);
                }
            }
        };

        if ( supportPostMessage ){
            if ( 'addEventListener' in document ) {
                window.addEventListener('message', generalCallback, false);
            } else if ( 'attachEvent' in document ) {
                window.attachEvent('onmessage', generalCallback);
            }
        } else {
            // 兼容IE 6/7
            window.navigator[this.prefix + this.name] = generalCallback;
        }
    };

    // 监听消息
    Messenger.prototype.listen = function(callback){
        var i = 0;
        var len = this.listenFunc.length;
        var cbIsExist = false;
        for (; i < len; i++) {
            if (this.listenFunc[i] == callback) {
                cbIsExist = true;
                break;
            }
        }
        if (!cbIsExist) {
            this.listenFunc.push(callback);
        }
    };
    // 注销监听
    Messenger.prototype.clear = function(){
        this.listenFunc = [];
    };
    // 广播消息
    Messenger.prototype.send = function(msg){
        var targets = this.targets,
            target;
        for(target in targets){
            if(targets.hasOwnProperty(target)){
                targets[target].send(msg);
            }
        }
    };
    Messenger.prototype.exec = function(){
        this.send(JSON.stringify(arguments));
    };
    Messenger.prototype.parseMethod = function(msg){
        return JSON.parse(msg);
    };
    return Messenger;
})();


