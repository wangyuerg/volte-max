<script>
    import { project, volte, video } from './assets/const'
    import resVolte from './mock/resVolte'

    var host,curWwwPath,pathName,pos,localhostPath,webHost;
    host = "http://10.154.4.3:8080";
    webHost = 'http://localhost:8080';
    //var host = "http://188.102.11.97:8080";
    //var host = "http://10.254.10.62:8880";
    //获取当前网址，如： http://localhost:8080/Tmall/index.html
    curWwwPath=window.document.location.href;
    //获取主机地址之后的目录如：/Tmall/login2.html
    pathName=window.document.location.pathname;
    pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8080
    localhostPath=curWwwPath.substring(0,pos);
    const currentProject = project.video; //设置视频还是语音项目
    let currentConst; // 项目变量,项目不同变量不同
    let currentMockRes; // 项目mock数据源，项目不同源不同

    if (currentProject === project.video) {
        currentConst = video
        currentMockRes = resVolte // 以后有视频了替换成视频
    } else {
        currentConst = volte
        currentMockRes = volte
    }
    console.log('dsadsad', process.env.NODE_ENV)
    if( process.env.NODE_ENV == 'production'){
        //正式环境
        host = localhostPath;
        webHost = localhostPath;
    }else{
        //开发环境
        webHost = 'http://localhost:8080';
        host = 'http://localhost:8080';
        console.info(webHost)
    }
    console.log('currentConst in config', currentConst)

    //host = localhostPath;
    //此组件用于保存常量信息
    module.exports ={
        host:host,
        webHost:webHost,//前端服务器ip port
        serviceUrl:host+"/voltemax-service/cxf/jaxrs",//后端服务接口地址
        resUrl:host+"/resource/",//前端资源文件路径
        projectType: currentProject,
        const: currentConst,
        mockRes: currentMockRes,
        saveCurrentUser:function(user){
            sessionStorage.setItem('user',JSON.stringify(user));
            sessionStorage.setItem('token',user.token);
        },
        getCurrentUser:function(){ // 获取当前用户
            var userstr = sessionStorage.getItem('user');
            if(userstr!= null && userstr!=''){
               return JSON.parse(userstr);
            }else{
                return null;
            }
        },
        clearCurrentUser:function(){
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
        },
        defaultHeader:function(){
            return{
                "x-token":sessionStorage.getItem('token'),
                'X-Requested-With':'XMLHttpRequest'
            }
        },
        scorllOption:function(){
            return{
                option1:{ styler:'fb',
                    cursorcolor:"#0c151f",
                    background: '#192a3e',
                    cursorwidth: '6',
                    cursorborder:"3px solid rgba(19,88,148,0)",
                    cursorborderradius: '12px',
                    cursoropacitymin :1,
                    spacebarenabled:false,
                    preservenativescrolling:true,
                    zindex: '9999999999999'},
                option2:{
                    styler:'fb',
                    cursorcolor:"#0c151f",
                    background: '#192a3e',
                    cursorwidth: '10',
                    cursorborder:"5px solid rgba(19,88,148,0)",
                    cursorborderradius: '12px',
                    cursoropacitymin :1,
                    spacebarenabled:false,
                    zindex: '9999999999999'
                }
            }

        }
    }
</script>

