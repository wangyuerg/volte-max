<script>
    import base from 'config'

   module.exports = {
       getAccessMenu:function(){
           var user = base.getCurrentUser();
           if(user && user.roleId){ // 如果已经登陆过了
               var baseMenu = [{name:'login',path:'/login'}];
               var accessMenu = [];
               //注意，此处需将默认显示的页面，放置在accessMenu数组的首位
               switch (user.roleId){ // 根据role不同设置可访问的页面
                   case '1':
                       accessMenu = [
                           {name:'home.userreview',path:'/home/userreview'},
                           {name:'home.commanaly',path:'/home/commanaly'},
                           {name:'home.indexsearch',path:'/home/indexsearch'},
                           {name:'manage.users',path:'/manage/users'},
                           {name:'manage.approvers',path:'/manage/approvers'}
                       ];
                       break;
                   case '2':
                       accessMenu = [
                           {name:'home.userreview',path:'/home/userreview'},
                           {name:'home.commanaly',path:'/home/commanaly'},
                           {name:'home.indexsearch',path:'/home/indexsearch'}
                       ];
                       break;
                   case '3':
                       accessMenu = [
                           {name:'home.commanaly',path:'/home/commanaly'},
                           {name:'home.indexsearch',path:'/home/indexsearch'}
                       ];
                       break;
               }
               accessMenu.push.apply(accessMenu,baseMenu);
               return accessMenu;
           }else{
               return [];
           }

       }
   }
</script>