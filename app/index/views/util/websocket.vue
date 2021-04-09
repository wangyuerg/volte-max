<script>
    import base from 'config';

    export default{
        socket:null,
        connect(handle,msgPushflag){
            var vm = this;
            var url = base.host.replace('http://','ws://') +  "/voltemax-service/springmvc/websocket?token=" + sessionStorage.getItem('token');
            vm.socket = new WebSocket(url);
            console.log(url)

            vm.socket.onopen = function (evt) {
                vm.info("连接成功！");
                //doSend(textID.value);
            };
            vm.socket.onmessage = function (evt) {
                vm.info("接收到信息--> " + evt.data);
                handle(evt.data);
                //echo_websocket.close();
            };
            vm.socket.onerror = function (evt) {
                vm.info('出错了！');
                vm.socket.close();
            };
            vm.socket.onclose = function () {
                vm.info('连接关闭。');
            };
        },
        info(str){
            console.info('[websocket]:'+str);
        },
        destroy(){
            var vm = this;
            if(vm.socket){
                vm.socket.close();
            }
        }
    }
</script>