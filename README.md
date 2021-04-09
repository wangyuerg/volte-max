# 目录结构说明
-app 开发目录
 -index 存放主要开发文件的目录
  -api 存放Api接口
  -directives js插件（如：一些jquery插件）
  -images 图片资源
  -views 业务视图
  -vuex vuex是Vue提供的store插件
-build nodejs 服务，webpack配置打包文件目录
-node_modules 模块 由nodejs控制
-output 文件输出目录
[package.json]:node工程配置文件，由nodejs管理

# 开发工具
ide:webstorm
svn:sliksvn
   • 使用npm导入包的时候，webstrom会跑索引，虽然索引是个好东西，但是包多了就会卡，包特别多，电脑还不行的，就会卡死
     解决方法：右击node_modules文件夹=>Mark directory as(标记目录为)=>Excluded(排除)，这样webstorm就不会对该文件夹建索引了

#编译环境
nodejs

#开发使用框架与技术
• webpack:Webpack 是前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。
        还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，
        比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。
• Vue: MVVM框架;类似的框架还有angular，但是比angular更轻量，易上手;倾向于SPA应用开发
• Jquery,bootstrap等：使用vue集成这些框架/插件使得开发更加灵活
• ES6/babel: 由于浏览器支持，现大部分前端开发者依然使用ES5开发；
             ES6新特性：箭头操作符，类的支持，增强的对象字面量，字符串模板，
             解构，参数默认值，不定参数，拓展参数，let与const 关键字，for of 值遍历，iterator, generator，模块，Map，Set 和 WeakMap，
             WeakSet，Proxies，Symbols，Math，Number，String，Object 的新API，Promises。
       babel:ES6 转化 ES5;
             项目中，已经引入Bable，所以我们可以欢快的使用/混用ES6了!(支持ES5，ES6)

# 兼容性
兼容IE9+ 以及其他主流浏览器

# 开发启动服务
node build/dev-server.js
# 打包指令
npm run build









