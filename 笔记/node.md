# 01-Node(工程化)

## Node的版本工具 nvm

nvm：Node Version Manager

- 通过 nvm install latest 安装最新的node版本
- 通过 nvm list 展示目前安装的所有版本
- 通过 nvm use 切换版本

## Node环境中运行JS代码

**两个环境，可以运行JS代码**

- 浏览器

浏览器环境就是正常写代码，用浏览器打开

- node环境

可以通过终端命令 node js文件名 的方式来载入和执行对应的js文件

或者安装vscode插件，code runner插件来，运行JS代码。

## Node传递参数

**执行node程序的过程中，可以给node传递一些参数**

- node index.js env=development wangcai
- 在程序中通过process内置对象可以获取到传递的参数
- 在process内置对象的argv属性中存储着我们写的参数

```js
	// 命令 node test.js  wangcai 18   

    console.log(process.argv);// 数组
    console.log(process.argv[1]);// 执行的文件路径 D:\Study\04-JS高阶\预习\test.js
    console.log(process.argv[2]);// wangcai
    console.log(process.argv[3]);// 18
```

## Node的全局对象

全局对象实际上是模块中的变量，只是每个模块都有，看来像是全局变量



- __dirname 获取当前文件所在的路径，不包括后面的文件名

```
console.log(__dirname);// D:\Study\04-JS高阶\预习
```

- __filename 获取当前文件所在的路径和文件名称，包括后面的文件名称

```
console.log(__filename);// D:\Study\04-JS高阶\预习\test.js
```

- process 提供了Node进程中相关的信息，如Node的运行环境、参数信息等

- console提供了简单的调试控制台

## global对象

**global是一个全局对象，事实上前面我们提到的process、console、setTimeout等都有被放到global中**

- globalThis 和 global 都是指向全局对象的
- 类似于浏览器中的window
- 在浏览器中，全局变量都是在window上的，比如有document、setInterval、setTimeout、alert、console
- 在Node中，我们也有一个global属性，并且它里面有很多其他对象
- 浏览器中var声明的全局变量，会挂载到window上，node中var声明的变量，不会挂载到global上

```
直接声明就有，用var let const 都不行
a = 123;
b = 456;
c = {name:'帝骑'}
console.log(globalThis.a);// 123
console.log(global.b);// 456
console.log(global.c);// {name:'帝骑'}
```

## 内置模块path

**Linux和window上的路径时不一样的**

- window上会使用 \ 或者 \ 来作为文件路径的分隔符，当然目前也支持 /
- Linux,Unix操作系统上使用 / 来作为文件路径的分隔符
- 如果我们在window上使用 \ 来作为分隔符开发了一个应用程序，要部署到Linux就可以出现问题
- 为了屏蔽他们之间的差异，在开发中对于路径的操作我们可以使用 path 模块

**path模块用于对路径和文件进行处理，提供了很多方法**

**常见API**

- dirname：获取文件的父文件夹
- basename：获取文件名
- extname：获取文件扩展名
- path.join：路径的拼接
- path.resolve：把一个路径或路径片段的序列解析为一个绝对路径

# 02-JS模块化开发

## 模块化开发的介绍

**模块化（组件化）指的就是将一个大的功能拆分为一个一个小的模块，通过不同的模块的组合来实现一个大功能。**

- 在node中一个 js 文件就是一个模块
- 模块内部代码对于外部来说都是不可见的，可以通过两种方式向外部暴露
- 优点：1.复用性 2.维护性

**在模块化开发中出现的问题**

- 必须记得每一个模块中返回对象的命名，才能在其他模块使用过程中正确的使用
- 代码写起来混乱不堪，每个文件中的代码都需要包裹在一个匿名函数中来编写；
- 在没有合适的规范情况下，每个人、每个公司都可能会任意命名、甚至出现模块名称相同的情况；

为了解决上面的问题，Node推出了**CommonJS**规范，es6推出了ES Module

##  CommonJS和Node

**CommonJS规范要求**

- 在Node中每一个js文件都是一个单独的模块
- 模块中包括CommonJS规范的核心变量：exports、module.exports、require，使用这些变量来方便的进行模块化开发
- exports和module.exports可以负责对模块中的内容进行导出
- require函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容

### CommonJS导出

**exports导出**

- exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出
- 另外一个文件中可以导入，require通过各种查找方式，最终找到了exports这个对象，将这个exports对象赋值给一个变量

**module.exports导出**

- 在Node中真正用于导出的其实根本不是exports，而是module.exports，module才是导出的真正实现者
- 之所以exports也可以导出，是因为module对象的exports属性是exports对象的一个引用
- 就是说 module.exports = exports 

```
let name = "wc";
// exports.name = name;
module.exports.name = name;

module.exports = {
    name
}
```

###  require导入

**require是一个函数，可以帮助我们导入一个文件（模块）中导出的对象**

- 模块在被第一次引入时，模块中的js代码会被运行一次
- 模块被多次引入时，会缓存，最终只加载（运行）一次
- 深度优先算法进行加载

### require查找规则

**一、导入Node核心模块 如path http url 时，直接返回核心模块，停止查找**

```
	let http = require("http")// require里直接写模块名
```

**二、以 ./  ../ 开头的 自定义模块**

- 第一步：将X当做一个文件在对应的目录下查找
  - 如果有后缀名，按照后缀名的格式查找对应的文件
  - 如果没有后缀名，会按照如下顺序
    - 1，直接查找文件X
    - 2，查找X.js文件
    - 3，查找X.json文件
    - 4，查找X.node文件
- 第二步：没有找到对应的文件，将X作为一个目录
  - 查找目录下面的index文件
    - 1，查找X/index.js文件
    - 2，查找X/index.json文件
    - 3，查找X/index.node文件
- 如果没有找到，那么报错：not found

```
	let xx = require("./utils/index.js")
```

### CommonJS规范缺点

**CommonJS加载模块是同步的**

- 同步的意味着只有等到对应的模块加载完毕，当前模块中的内容才能被运行
- 在服务器不会有什么问题，因为服务器加载的js文件都是本地文件，加载速度非常快
- 但是在浏览器里 同步的就意味着后续的js代码都无法正常运行，即使是一些简单的DOM操作
- 所以在浏览器中，我们通常不使用CommonJS规范
- 早期为了可以在浏览器中使用模块化，通常会采用AMD或CMD
- 但是目前一方面现代的浏览器已经支持ES Modules，AMD和CMD已经使用非常少了

## ESModule用法详解

采用ES Module将自动采用严格模式：use strict

ES6的模块化开发需要写在html文件里，而且script标签加上type="module"

```html
<script src="main.js" type="module"></script>
```

### ESModule导出 export

**导出去的并不是一个对象，导出去的是标识符**

- 方式一：在语句声明的前面直接加上export关键字

```js
export let uname = "wc";
```

- 方式二：将所有需要导出的标识符，放到export后面的 {}中

```js
let uname = "wc";
let uage = 18;
function sayHello() {
    console.log("sayHello...");
}

export {
    uname,
    uage,
    sayHello
}
```

- 方式三：导出时给标识符起一个别名，通过as关键字起别名,别的文件导入时只能用起的别名

```
let uname = "wc";

export {
    uname as name,
}

```

### ESModule导入 import

- 方式一：import {标识符列表} from '模块'，{}里面只是存放导入的标识符列表

```
import { uname, uage, sayHello } from "./a.js"
```

- 方式二：导入时给标识符起别名，通过as关键字起别名

```
import { uage as age } from "./b.js"
```

- 方式三：通过 * 将模块功能放到一个模块功能对象（a module object）上

```
import * as obj from "./a.js"

console.log(obj.name);
console.log(obj.age);
obj.say();
```

**export和import结合使用**

- 在开发和封装一个功能库时，通常我们希望将暴露的所有接口放到一个文件中，这样方便指定统一的接口规范，也方便阅读

### default默认导入和导出

-  默认导出export default {}，{}里只有一个内容时可以不写{}

```
let obj = 110;

export default obj
```

- 在导入时不需要使用 {}，并且可以自己来指定名字

```
import xxx from "./a.js"
```

- 在一个模块中，只能有一个默认导出（default export）

# 03-包管理工具

## npm包管理工具

- Node Package Manager，是Node包管理器
- npm属于node的一个管理工具，安装Node时，已帮我们安装好了
- 通过 NPM 可以对 Node 的工具包进行搜索、下载、安装、删除、上传。借助别人写好的包，可以让我们的开发更加方便

## package配置文件

**一个项目，有非常多的包，我们需要通过一个配置文件（package.json）来管理这些包**

- 每一个项目都会有一个对应的配置文件，无论是前端项目（Vue、React）还是后端项目（Node）
- 配置文件会记录着你项目的名称、版本号、项目描述，项目所依赖的其他库的信息和依赖库的版本号

## 常用npm命令

- npm init –y **生成配置文件 package.json**
- npm s jquery **搜索包**
- npm i webpack -g **全局安装**

- npm i webpack **局部安装**
- npm i **安装package.json中的依赖包**
- **查看npm镜像** npm config get registry
- **设置npm镜像** npm config set registry https://registry.npm.taobao.org
- 更多命令 https://docs.npmjs.com/cli-documentation/cli

## 发布自己的开发包

**流程**

1. 修改为官方的地址 ( npm config set registry https://registry.npmjs.org/ )
2. 创建文件夹，并创建文件 index.js， 在文件中声明函数，使用 module.exports 暴露
3. npm 初始化工具包，package.json 填写包的信息 （越复杂越容易提上去）
4. 账号npm注册（激活账号）,==完成邮箱验证==
5. 命令行下 『npm login』 填写相关用户信息 (一定要在包的文件夹下运行)
6. 命令行下『 npm publish』 提交包 👌
7. npm 有垃圾检测机制，如果名字简单或做测试提交，很可能会被拒绝提交，可以尝试改一下包的名称来解决这个问题

# 04-网络理论

## URL格式

- URI Uniform Resource Identifier 统一资源标识符，用来唯一标识一个资源

- URL Uniform Resource Locator 统一资源定位符，用来唯一标识一个资源而且它还可以指明如何定位资源
- URN Uniform Resource Name 统一资源命名 通过名字表示资源

**URL格式**

- 协议名称 + 主机名称 + 端口号 + 路径 + 文件 + 查询字符串 + HASH值

**浏览器的地址栏输入一个网址，发生了什么？**

- DNS解析 拿到IP地址
- 6通过IP地址找到服务器
- 通过端口找到对应的网页服务
- 进行TCP连接

## BS架构和CS架构

**BS架构**

- Browser/Server(浏览器/服务器), 利用浏览器去呈现界面，浏览器提供浏览器所需要的数据
- 优点：无需安装客户端软件，只需要有浏览器，无需升级客户端。
- 缺点：浏览器的兼容性可能有问题，功能性相对弱一点，安全性弱，交互性弱。

**CS架构**

- Client/Server 将应用程序放到一个软件中，可以是Android也可以是iOS，服务器给客户端软件提供它需要的数据。
- 优点：界面丰富，交互性强，响应速度快，安全性强。
- 缺点：开发成本高，需要下载安装，维护成本高，升级麻烦。

## 关于云服务器和域名

**服务器**

- 实体服务器：自己购买服务器。
- 云服务器：阿里云，华为云，JD云....

**域名级别**

- 顶级域名（一级域名） baiu.com 一般我们买的是一级域名，在一级域名下可以配 置N个二级域名
- 二级域名 zhidao.baidu.com image.baidu.com wenku.baidu.com tieba.baidu.com
- 三级域名 sport.news.baidu.com

## DNS解析

**DNS**：Domain Name Server(域名服务器)

- 作用：域名与对应的IP转化的服务器
- DNS中保存了一张域名与对应的IP地址的表，一个域名对应一个IP地址，一个IP地址可以对应多个域名
- 根据域名，通过DNS解析就可以得到一个IP 地址。就可以找到对应的服务器

## IP地址和端口号

**IP**：Internet Protocol Address 互联网协议地址 IP地址

- 作用：分配给用户上网使用的互联网协议
- 分类：IPv4 IPv6

- 端口号范围：0~65535 0~1024是系统使用的 1025~65535之间

##  TCP连接

**TCP**：transmission Control Protocol 传输控制协议

- 特点：在收发数据之前，必须建立可靠的连接。TCP就是可靠连接。UDP不可靠连接。
- 建立连接基础：三次握手
- 应用场景：HTTP请求(HTTP请求就是基于TCP的)，FTP文件传输，邮件发送
- 优点：速度慢，稳定，重传机制
- 缺点：效率低，占用资源，容易被攻击

## TCP三次握手 建立连接

**TCP三次握手介绍**

- TCP是一个端到端的 可靠 面相连接的协议
- HTTP基于传输层TCP协议不用担心数据传输的各种问题（当发生错误时，可以重传）
- 根据IP，找到对应的服务器，发起TCP的三次握手

![](http://tubie.gitee.io/malulesson/assets/img/03.d2afa625.png)

## 四次挥手的理解 关闭TCP连接

- 不能直接一次性断开连接(双方知晓), 万一还有什么数据没有传完, 造成数据的丢失!

![](http://tubie.gitee.io/malulesson/assets/img/04.32d51533.png)

## 三次握手和四次挥手的总结

**严肃版**

```
建立连接 => 三次握手 (双方确认)
	(1) 浏览器向服务器发送连接请求
    (2) 服务器准备连接，回应浏览器，等待浏览器再次确认
    (3) 浏览器确认进行连接
    
断开连接 => 四次挥手 (客气挽留)   
	(1) 浏览器发起断开连接请求
    (2) 服务器确认收到断开的需求, 确认数据是否传输完毕
    (3) 服务器 确认数据传输完毕，允许浏览器断开连接
    (4) 浏览器收到消息 断开连接
```



```
建立连接 => 三次握手 (双方确认)
    (1) 服务器啊, 我是浏览器, 我要和你建立连接
    (2) 服务器看到了, 好的, 那么建立连接吧, 我准备好了, 你确定吗?
    (3) 浏览器: 是的, 我确定!
    连接就建立成功，三次握手 = 连接的发起 + 双方的确认

断开连接 => 四次挥手 (客气挽留)
    (1) 一方A发起断开连接的消息
    (2) 另一方B会确认收到断开的需求, 但是会要求等一等, 确认是否数据传输完毕
    (3) B当确认完之后, 确实数据都传完了, 告知A, 连接可以断开了
    (4) A确认收到消息, 告知B, 我要走了
```

##  HTTP的概念（掌握）

**HTTP：HyperText Transfer Protocol 超文本传输协议**：

- 客户端和与服务器之间传递数据的规范
- HTTP请求：按照HTTP协议（规则），由客户端（浏览器）向服务器发出请求
- HTTP响应：按照HTTP协议（规则），由服务器给出响应

**HTTPS:** HyperText Transfer Protocol Secure 超文本传输安全协议。

- HTTP的安全版本（安全的基础是SSL/TLS）
- SSL: Secure Sockets Layer 安全套接层
- TLS：transport Layer Security 传输层安全
- 说白了，就是为了网络通信提供的一种安全协议，对网络连接进行加密

**HTTP和HTTPS的区别**

- HTTP是不安全 HTTPS可以防止攻击
- HTTP协议传输的内容是明文，直接在TCP连接上传递，客户端和服务器都无法验证对方的身份
- HTTPS协议的传输内容都是被SSL/TLS加密，且运行在SSL/TLS，SSL/TLS运行在TCP连接上，所以传递的数据是安全

## HTTP报文

HTTP是基于TCP通信协议来传递数据。通过一个可靠的连接来交换信息。在交换信息之前，客户端和服务器之间需要有规则。

**HTTP通信包含两部分**

- HTTP请求 Request
- HTTP响应 Response

![img](http://tubie.gitee.io/malulesson/assets/img/05.57e447e5.png)

**在HTTP请求和HTTP响应中，都包含了HTTP报文，报文也是一块数据，在客户端与服务器之间发送的数据块。这些报文也是在客户端与服务器之间流行。所以HTTP报文也叫报文流。**

**HTTP请求报文组成部分**

- 对报文进行描述的起始行
- HTTP各种头（header），也叫http报文头，不同的头含义是不一样的
- 请求体（请求正文）（可选的），就是客户端给服务器的数据

![img](http://tubie.gitee.io/malulesson/assets/img/07.be25a339.png) ![img](http://tubie.gitee.io/malulesson/assets/img/06.e28438ac.png)

**HTTP响应报文组成部分**

- 响应行（起始行） HTTP/1.0 200表示状态码 OK叫状态描述符
- 响应头 header
- 响应体 服务器给客户端响应的数据

![img](http://tubie.gitee.io/malulesson/assets/img/08.c0c29410.png) ![img](http://tubie.gitee.io/malulesson/assets/img/09.9bc4667a.png)

## HTTP 请求

**GET**：GET 方法请求一个指定资源的表示形式，使用 GET 的请求应该只被用于获取数据。
**HEAD**：HEAD 方法请求一个与 GET 请求的响应相同的响应，但没有响应体。比如在准备下载一个文件前，先获取文件的大小，再决定是否进行下载；
**POST**：POST 方法用于将实体提交到指定的资源。
**PUT**：PUT 方法用请求有效载荷（payload）替换目标资源的所有当前表示；
**DELETE**：DELETE 方法删除指定的资源；
**PATCH**：PATCH 方法用于对资源应部分修改；
**CONNECT**：CONNECT 方法建立一个到目标资源标识的服务器的隧道，通常用在代理服务器，网页开发很少用到。
**TRACE**：TRACE 方法沿着到目标资源的路径执行一个消息环回测试。



**GET和POST**

- GET主要是用来获取数据
- GET也可以传递数据给服务器，通过查询字符串，就是在URL中把数据扔给服务器
- POST可以对数据进行添加，删除，修改，数据是放在FormData

**GET过程**

1. 第三次握手，浏览器确认并发送请求头和数据
2. 服务器返回200 OK响应

**POST过程**

1. 第三次握手，浏览器确认并发送post请求头
2. 服务器返回状态码100后，continue响应
3. 浏览器开始扔数据到服务器
4. 服务器返回200 OK响应

## Response响应状态码

- Http状态码（Http Status Code）是用来表示Http响应状态的数字代码
- Http状态码非常多，可以根据不同的情况，给客户端返回不同的状态码
- MDN响应码解析地址：https://developer.mozilla.org/zh-CN/docs/web/http/status

![img](http://tubie.gitee.io/malulesson/assets/img/12.b0fb31f3.png)



## 同源策略（掌握）

**同源策略：Same Origin Policy SOP 是浏览器的策略**

- 同源策略(Same-Origin Policy)最早由 Netscape 公司提出，是浏览器的一种安全策略
- 规定：只允许两个页面有相同的源时，一个页面才可以去访问另一个页面中的数据。
- 源：说白了，就是指域名 相同的源指的是有相同的域名
- 换句话说，jd.com不能去获取taobao.com下面的数据


有一个这样的域名：http://www.wangcai.com
\* http://zhidao.wangcai.com    不同源
\* http://www.wangcai.com:8080    不同源
\* https://www.wangcai.com    不同源
\* http://www.wangcai.com/phone/index.html    同源
\* http://www.wangcai.com/phone/huawei/index.html    同源

**总结**

- 源：协议 + 域名 + 端口
- 同源：相同的协议 && 相同域名 && 相同的端口 **完全一样**
- 不同源：不同的协议 || 不同的域名 || 不同的端口

**不受同源策略的限制**

- 资源的引入 如：img标签的src link标签的href script标签的src
- 页面中的超连接 a标签中的href
- 表单的提交
- 重定向页面

# 05-KOA框架

## KOA简介与入门

- 通过利⽤ async 函数，Koa 帮你丢弃回调函数，并有⼒地增强错误处理。

- Koa提供了⼀套优雅的⽅法，帮助您快速⽽愉快地编写服务端应⽤程序。

**步骤**

- 创建文件夹 codekao
- 进入文件夹，生成项目配置文件 npm init -y
- 安装koa: npm i koa@2.13.4 -S
- 在codekao文件夹下，创建 01-搭建koa服务器.js

```js
const Koa = require('koa');
const app = new Koa();
// app 就是服务器

// 中间件
app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3000);
```

运行代码：node 01-搭建koa服务器.js

通过浏览器或postman访问

## 中间件机制

![](http://tubie.gitee.io/malulesson/assets/img/06.c25ac5cb.png)

![](http://tubie.gitee.io/malulesson/assets/img/07.98a4fd19.png)

```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(5);
});

app.use(async (ctx, next) => {
    console.log(2);
    await next();
    console.log(4);
});

app.use(async ctx => {
    console.log(3);
    ctx.status = 200; //设置响应状态码
    ctx.type = 'html';
    ctx.body = 'Hello World'; //设置响应体
});

app.listen(3000);
//输出 1 2 3 4 5
```

当⼀个中间件调⽤next() 则该函数暂停执⾏并将控制权传递给定义的下个中间件. 当在response 中间件执⾏后, 下游没有更多的中间件. 这个时候每个中间件恢复其上游⾏为

入栈出栈 先入后出

## 错误监听

**常⻅抛出异常和错误类型**

- 代码语法不规范造成的JS报错异常
- 程序运⾏中发⽣的⼀些未知异常
- HTTP错误
- ⾃定义的业务逻辑错误

**添加error全局事件侦听器**

```js
const Koa = require('koa');
const app = new Koa();

// 触发错误 koa帮我们做了处理
app.use(async (ctx, next) => {
    throw new Error('未知错误xx');
})

//全局错误处理 后台打印
app.on('error', err => {
    console.log('全局错误处理', err.message)
})
app.listen(3000);
//全局错误处理 未知错误xx
```

## 错误处理中间件

每次修改了服务器代码，都需要重新启动服务器，为了方便，可以全局安装nodemon。

- 全局安装：npm i nodemon -g

```
const koa = require('koa');
const app = new koa();

app.use(async (ctx,next)=>{
    try{
        await next();
    }catch (e){
        // 给用于显示状态码
        ctx.status = e.statusCode || e.status || 500;
        // 如果是ajax请求，返回的是json错误数据
        ctx.type = 'json';
        // 用户提示
        ctx.body = {
            ok: 0,
            message:e.message
        };
        // 系统日志
        ctx.app.emit('error',e,ctx)
    }
})

app.use(async (ctx,next)=>{
    throw new Error('未知错误')
})

app.on('error', e=>{
    console.log('全局错误处理',e.message)
});
app.listen(3000);
```



## koa-logger控制台细节显示

**安装：** npm i koa-logger@3.2.1

- 在控制台可以更加细致看到错误信息

```
const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
app.use(logger());

// 在控制台可以更加细致看到错误信息
app.use(async (ctx,next)=>{
    throw new Error('未知错误');
})

// 全局的事件监听器
app.on('err', (err) =>{
    console.log(err.message,err.status,err.data)
})

app.listen(3000,()=>{
    console.log(3000+'端口被监听了')
})
// 太多了
```



## koa-erros处理错误

**安装：** npm i koa-onerror@4.2.0

- 在控制台可以更加细致看到错误信息

```
const Koa = require('koa')
const onerror = require('koa-onerror')
const app = new Koa()
const logger = require('koa-logger')
app.use(logger())

onerror(app)

// koa的中间件
app.use(async (ctx, next) => {
    // ctx.throw()相当于是一个中间件
    ctx.throw(401, '未授权', {
        data: '你瞅瞅'
    })
})

app.use(async (ctx) => {
    ctx.body = '错误处理中间件'
})

// 全局的事件监听器
app.on('error', (err) => {
    console.log('全局错误处理:', err.message, err.status, err.data)
})

app.listen(3000, () => {
    console.log('3000端口被监听了~~')
})
```



## koa-log4本地存储日志

 koa-log4 在 log4js-node 的基础上做了⼀次包装，是 koa 的⼀个处理⽇志的中间件，此模块可以帮助你按照你配置的规则分叉⽇志消息。

**操作步骤：**

- 在根⽬录下新建 logger/ ⽬录
- 在 logger/ ⽬录下新建 logs/ ⽬录，⽤来存放⽇志⽂件
- 在 logger/ ⽬录下新建 index.js ⽂件

**安装：** npm i koa-log4@2.3.2

logger目录下的index.js代码(直接copy)如下：

```
const path = require('path')
const log4js = require('koa-log4')

log4js.configure({
    appenders: {
        //   访问级别
        access: {
            type: 'dateFile',
            // 生成文件的规则
            pattern: '-yyyy-MM-dd.log',
            // 文件名始终以日期区分
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            // 生成文件路径和文件名
            filename: path.join(__dirname, 'logs', 'access')
        },
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            filename: path.join(__dirname, 'logs', 'application')
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'info'
        },
        access: {
            appenders: ['access'],
            level: 'info'
        },
        application: {
            appenders: ['application'],
            level: 'WARN'
        }
    }
})

// // 记录所有访问级别的日志
// exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access'))
// // 记录所有应用级别的日志
// exports.logger = log4js.getLogger('application')

module.exports = {
    // 记录所有访问级别的日志
    accessLogger: () => log4js.koaLogger(log4js.getLogger('access')),
    // 记录所有应用级别的日志
    logger: log4js.getLogger('application')
}
```

- 访问级别的，记录⽤户的所有请求，作为koa的中间件，直接使⽤便可。
- 应⽤级别的⽇志，可记录全局状态下的 error ，修改 app.js 全局捕捉异常

修改对应的代码如下：

```
const Koa = require('koa')
const onerror = require('koa-onerror')
const {
    accessLogger,
    logger
} = require('./logger')
const app = new Koa()

onerror(app)
app.use(accessLogger())

// koa的中间件
app.use(async (ctx, next) => {
    // ctx.throw()相当于是一个中间件
    ctx.throw(401, '未授权', {
        data: '你瞅瞅'
    })
})

app.use(async ctx => {
    ctx.body = 'Hello World';
});

// 全局的事件监听器
app.on('error', (err) => {
    logger.error(err)
})

app.listen(3000, () => {
    console.log('3000端口被监听了~~')
})
```



## koa-router路由中间件

**安装：** npm i @koa/router@10.1.1 

路由 一个URL对应一个资源

**使⽤**： 根目录下新建router，router下建index.js和users.js

router/index.js中代码如下：

```
const Router = require('@koa/router');
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = '⾸⻚';
})

module.exports = router;
```

router/user.js中代码如下：

```
const Router = require('@koa/router');
const router = new Router();
router.prefix('/user') //前缀

router.get('/', (ctx, next) => {
    ctx.body = '⽤户界⾯';
})

module.exports = router;
```

服务器（入口文件）代码

```
const Koa = require('koa')
const index = require('./router/index')
const users = require('./router/user')

const app = new Koa()

// 注册路由
app.use(index.routes())
index.allowedMethods()
app.use(users.routes())
users.allowedMethods()

app.listen(3000, () => {
    console.log('3000端口被监听了~~')
})
```

## get请求

服务器代码

```
const Koa = require('koa');
const user2 = require('./router/user2.js');

const app = new Koa();

// 注册路由
app.use(user2.routes())
user2.allowedMethods()

app.listen(3000,()=>{
        console.log('3000端口被调用了')
    }
)
```

资源代码

```
const Router = require('@koa/router');
const router = new Router();
router.prefix('/user2')

// get传参 参数放在URL
// query 传参 ?name=wc&age=18
router.get('/add', (ctx, next) => {
    console.log(ctx.query)
    ctx.body = '⽤户界⾯1';
})

// params 传参
router.get('/:id', (ctx, next) => {
    console.log(ctx.params.id);
    ctx.body = '⽤户界⾯2';
})

module.exports = router;
```



## post请求

- post解析请求的参数需要下载 koa-bodyParser
- 安装：npm i koa-bodyparser@4.3.0

服务器（入口文件代码）

```
const Koa = require('koa');
const user3 = require('./router/user3.js');

// 引入koa-bodyparser
const bodyParser = require('koa-bodyparser')

const app = new Koa();

app.use(bodyParser()); // 开启正文解析器

app.use(user3.routes())
user3.allowedMethods()


app.listen(3000,()=>{
        console.log('3000端口被调用了')
    }
)
```

资源代码

```
const Router = require('@koa/router');
const router = new Router();
router.prefix('/user3')

router.post('/add', (ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = '⽤户界⾯';
})

module.exports = router;
```

 **post传参 需要在postman软件里传**

1. 设置传参方式 POST
2. 写上正确的URL
3. 选择 Body
4. 选择 x-www-form-urlencoded
5. 分别在 key 和 value 里写上数据
6. send发送

## 重定向

服务器(入口文件)

```
const Koa = require('koa');
const user4 = require('./router/user4.js');
const app = new Koa();

app.use(user4.routes())
user4.allowedMethods()

app.listen(3000,()=>{
        console.log('3000端口被调用了')
    }
)
```

资源文件

```
const Router = require('@koa/router');
const router = new Router();
router.prefix('/user4')

router.get('/', (ctx, next) => {
    ctx.redirect('/user4/list'); //之前加的前缀在这不生效
    ctx.body = '⽤户首页';
})
router.get('/list', (ctx, next) => {
    ctx.body = '⽤户list界面';
})

module.exports = router;
```



## 静态资源托管

- 安装：npm i koa-static@5.0.0
- 静态资源都放在根目录的public目录下面

```
const Koa = require('koa');
const koaStatic = require('koa-static');
const app = new Koa();

app.use(koaStatic(__dirname + '/public'))

app.listen(3000,()=>{
        console.log('3000端口被调用了')
    }
)
```

index.html

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        h1{
            color: pink;
            font-size: 20px;
        }
    </style>
</head>
<body>
    <h1>我是一个静态页面，我不想动，只想睡觉</h1>
</body>
</html>
```

# 06-鉴权

掌握三种常⻅鉴权⽅式：Session/Cookie、Token+jwt、OAuth

## Cookie 和 Session

- Http协议是⼀个⽆状态的协议，服务器不会知道到底是哪⼀台浏览器访问了它，因此需要⼀个标识⽤来让服务器区分不同的浏览器。

- cookie就是这个管理服务器与客户端之间状态的标识。

- 浏览器第⼀次向服务器发送请求时，服务器在response头部设置Set-Cookie字段，浏览器收到响应会设置cookie并存储，在下⼀次该浏览器向服务器发送请求时，就会在request头部⾃动带上Cookie字段，服务器端收到该cookie⽤以区分不同的浏览器。

**cookie的基本使用**

```
const Koa = require('koa');
const app = new Koa();

app.use(async ctx=>{

    // 默认情况下，会话结束，cookie就死了
    ctx.cookies.set('username','wc')

    // 设置cookie的生存时间 为7天
    ctx.cookies.set('username','wc',{
        maxAge: 60000 * 60 * 24 * 7
    });

    // 获取浏览器的cookie
    console.log(ctx.cookies.get('username'));

    ctx.body = 'hello cookie'
})

app.listen(3000)
// 第一次输出 undefined 第二次访问 wc
```

**这个cookie是存在浏览器上的**

**session**

session是会话的意思，浏览器第⼀次访问服务端，服务端就会创建⼀次会话，在会话中保存标识该浏览器的信息。它与cookie的区别就是session是缓存在服务端的，cookie 则是缓存在客户端，他们都由服务端⽣成，为了弥补Http协议⽆状态的缺陷。

## 基于session-cookie的身份认证

**原理**

1. 服务器在接受客户端⾸次访问时在服务器端创建seesion，然后保存seesion(我们可以将seesion保存在内存中，也可以保存在redis中，推荐使⽤后者)，然后给这个session⽣成⼀个唯⼀的标识字符串,然后在响应头中种下这个唯⼀标识字符串。
2. 签名。这⼀步通过秘钥对sid进⾏签名处理，避免客户端修改sid。(⾮必需步骤)
3. 浏览器中收到请求响应的时候会解析响应头，然后将sid保存在本地cookie中，浏览器在下次http请求的 请求头中会带上该域名下的cookie信息。
4. 服务器在接受客户端请求时会去解析请求头cookie中的sid，然后根据这个sid去找服务器端保存的该客户端的session，然后判断该请求是否合法

![](http://tubie.gitee.io/malulesson/assets/img/12.c0ebd838.png)

## 基于session实现网站访问次数统计

- 安装：npm i koa-session@6.2.0
- 快速搭建app应⽤

```
const Koa = require('koa');
const session = require('koa-session');
const app = new Koa();

// keys作用 用来对cookie进行签名
app.keys = ['session secret','anthor secret']

const SESSON_CONFIG = {
    key:'wc:xq',// 设置cookie中key的名字
    maxAge:86400000, //有效期，默认是一天
    httpOnly: true, //仅服务端修改
    signed: true, //签名cookie
}

app.use(session(SESSON_CONFIG,app))

app.use(async ctx=>{
    // 去掉favicon.ico请求
    if (ctx.path === '/favicon.ico') return;
    let n = ctx.session.count || 0;
    ctx.session.count = ++n;
    ctx.body = '这是你第'+n+'次访问';
})

app.listen(3000)
```

## 基于session实现⽤户鉴权

 资源文件 router/user5.js

```
const Router = require('@koa/router');
const router = new Router();
router.prefix('/user5')

// 登录接口
router.post('/login', async (ctx, next) => {
    const {body} = ctx.request;
    console.log('body', body);
    ctx.session.userinfo = body.user;
    ctx.body = {
        ok: 1,
        message: '登录成功'
    }
})

// 退出登录接口
router.post('/logout', async (ctx, next) => {
    console.log(ctx.session.userinfo);
    if (ctx.session.userinfo) {
        delete ctx.session.userinfo;
    }
    ctx.body = {
        ok: 1,
        message: '退出系统'
    }
})

// 获取用户信息接口
router.get('/getUser', async (ctx, next) => {
    // console.log(ctx.session.userinfo);
    ctx.body = {
        ok: 1,
        message: '获取数据成功',
        a: 666,
        userinfo: ctx.session.userinfo
    }
})

module.exports = router;
```

**服务器**

```
const Koa = require('koa')
const user5 = require('./router/user5')
const session = require("koa-session");
const bodyParser = require('koa-bodyparser')
const app = new Koa()
app.use(bodyParser());
// keys作用：用来对cookie进行签名
app.keys = ['session secret', 'anthor secret']

const SESSON_CONFIG = {
    key: 'wc', //设置cookie的key名字
    maxAge: 86400000, //有效期，默认是一天
    httpOnly: true, //仅服务端修改
    signed: true, //签名cookie
}

app.use(session(SESSON_CONFIG, app));

// 注册路由
app.use(user5.routes())
user5.allowedMethods()

app.listen(3000)

```

当访问/getUser路由的时候需要守卫中间件 在项目根目录下，创建middleware/auth.js，代码如下：

```js
module.exports = async (ctx, next) => {
    if (ctx.session.userinfo) {
        await next()
    } else {
        ctx.body = {
            code: 401,
            message: '未授权',
        }
    }
}
```



获取用户信息时，添加守卫，如下：

```js
// 获取用户信息接口
router.get('/getUser', require('../middleware/auth'), async (ctx, next) => {
    // console.log(ctx.session.userinfo);
    ctx.body = {
        ok: 1,
        message: '获取数据成功',
        a: 666,
        userinfo: ctx.session.userinfo
    }
})
```

### 什么是session鉴权？

![](https://i0.hdslb.com/bfs/new_dyn/7099dbee5edf4c3d585b9b971cd57fe6562431495.png@1554w.webp)

1. 浏览器向服务器发送第一次post请求，传递用户信息
2. 服务器得到用户信息，session会生成一个sid，存储在服务器上
3. 服务器响应浏览器，将sid以cookie的形式种植到客户端
4. 浏览器向服务器发起请求获取用户信息时，cookie会自动携带上sid,
5. 服务器会将的到的sid与自身存储的sid比较，看一下是否合法
6. 如果sid合法，服务器就会响应用户信息，如果sid有问题或没有发送sid，就未授权

## Token+JWT认证

- npm i koa-jwt@4.0.3 说明：jwt中间件
- npm i jsonwebtoken@8.5.1 说明：⽤于⽣成token下发给浏览器, 在koa2以后的版本不再提供jsonwebtoken的⽅法, 所以需要另外安装

**资源文件 router/user.js配置**

```
const Router = require('@koa/router');
const router = new Router();
const KoaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
router.prefix('/user6')

const secret = 'Cross Fire';// 密钥 随便写

// 登录接口
router.post('/login-token', async (ctx, next) => {
    const {body} = ctx.request;
    const userinfo = body.user;// 传入的key和这个body.user对应
    ctx.body = {
        ok: 1,
        message: '登录成功',
        user:userinfo,
        // 使用jwt模块签名一个令牌，生成一个 token 返回给客户端
        token: jwt.sign({
            data:userinfo,// 签名不是加密，令牌不要放私密信息
            exp:Math.floor(Date.now() / 1000) + 60 * 60 // token过期时间一小时
        },secret)
    }
})

// 获取用户信息接口
router.get('/getUser-token',KoaJwt({ //对传入令牌进行校验
    secret
}), async (ctx, next) => {
    ctx.body = {
        message: '获取数据成功',
        userinfo: ctx.state.user.data
    }
})

module.exports = router;
```

**服务器 入口文件**

```
const Koa = require('koa')
const user6 = require('./router/user6')
const bodyParser = require('koa-bodyparser') // 开启正文解析器
const app = new Koa()

app.use(bodyParser());

// 注册路由
app.use(user6.routes())
user6.allowedMethods()

app.listen(3000)

```



### 什么是token和JWT鉴权

![](https://i0.hdslb.com/bfs/new_dyn/97038e8a7de2d5272994272a7b7c2207562431495.png@1554w.webp)

1. 浏览器发起登录请求 post username and password 
2. 服务器根据用户的信息生成一个token令牌，响应给浏览器
3. 之后的请求，浏览器将令牌放在请求头中 
4. 服务器检测令牌是否合法 是否有效 是否被篡改，如果token合法响应对应的数据

# 07-KOA其他内容和RestfulApi

## koa其他

### 解决跨域

**什么是跨域**

a页面想获取b页面资源，如果a、b页面的协议、域名、端口、子域名不同，所进行的访问行动都是跨域的，而浏览器为了安全问题一般不允许跨域请求资源

**安装：** npm i koa2-cors

- 浏览器只对 ajax 有限制，讲完ajax再来

**服务器入口文件**

```
const koa = require('koa');
const cors = require('koa2-cors');
const app = new koa();
app.use(cors());
```

### 文件上传

**安装：** npm i koa-multer@1.0.2

上传资源文件 router/upload.js

```
const Router = require("@koa/router");
const Multer = require("koa-multer")
const router = new Router();

// 配置
let storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/image") // 文件保存路径
    },
    // 文件名设置
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
let upload = Multer({ storage: storage })

router.post("/upload", upload.single("touxiang"), (ctx, next) => {
    ctx.body = {
        ok: 1,
        message: "上传成功"
    }
})

module.exports = router;
```

**服务端 入口文件**

```
const Koa = require("koa");
const upload = require("./router/upload.js")
const app = new Koa();

// 注册上传模块路由
app.use(upload.routes())
upload.allowedMethods();

app.listen(3000, () => {
    console.log("server is running on 3000");
})
```

post请求，=> Body =>form-data =>key 每行右边选择 file

### 表单验证

**安装：** npm i koa-bouncer@6.0.0

**资源文件**code/router/user.js

```
const Router = require('@koa/router');
const bouncer = require('koa-bouncer')
const router = new Router();

router.prefix('/user')

// 表单验证
router.post('/', async (ctx, next) => {
    console.log(ctx.request.body)
    // ctx.request.body  {uname,pwd1,pwd2}

    // 后端对数据进行判断
    try {
        ctx
            .validateBody('uname')
            .required('用户名是必须的')
            .trim()
            .isLength(4, 8, '用户名必须是4~8位')
        ctx
            .validateBody('email')
            .optional()
            .trim()
            .isEmail('非法的邮箱格式')
        ctx
            .validateBody('pwd1')
            .required('密码是必填项')
            .trim()
            .isLength(6, 16, '密码必须是6~16位')
        ctx
            .validateBody('pwd2')
            .required('密码是必填项')
            .trim()
            .eq(ctx.vals.pwd1, '两次密码不一致')

        console.log(ctx.vals)
        ctx.body = {
            code: 1,
        }
    } catch (error) {
        // 校验异常
        if (error instanceof bouncer.ValidationError) {
            console.log(error)
            ctx.status = 400
            ctx.body = {
                code: 400,
                message: '校验失败:' + error.message,
            }
            return
        }
        throw error
    }
})

module.exports = router;
```

**服务器入口文件**

```
const Koa = require("koa");
const user = require("./router/user.js")
const bouncer = require("koa-bouncer")
const bodyParser = require('koa-bodyparser')

const app = new Koa();

app.use(bodyParser());
app.use(bouncer.middleware());

app.use(user.routes())
user.allowedMethods();

app.listen(3000, () => {
    console.log("server is running on 3000");
})
```

### 图形验证码

**安装：** npm i trek-captcha@0.4.0

**资源文件** router/index.js 

```
const Router = require('@koa/router');
const captcha = require('trek-captcha')
const router = new Router();

// 图形验证码
router.get('/captcha', async (ctx, next) => {
    const {
        token,
        buffer
    } = await captcha({
        size: 4
    });
    // ctx.state.bufferToken = token
    //token的作用 前端输入完验证码与此时的token做对比
    ctx.body = buffer;
})

module.exports = router;
```

**服务器 入口文件**

```
const Koa = require('koa')
const index = require('./router/index.js')
const koaStatic = require('koa-static');
const app = new Koa()

app.use(koaStatic(__dirname + '/public'))// 托管的静态页面 index.html 
										//<img src="http://localhost:3000/captcha" alt="">

// 注册路由
app.use(index.routes())
index.allowedMethods()

app.listen(3000, () => {
    console.log('3000端口被监听了~~')
})
```

## RestfulAPI

一中互联网软件的架构原则，是目前最流行的API规范，适用于Web接口规范的设计。让接口易读，且含义清晰

### URL 设计

**动词＋宾语**

客户端发出的数据操作指令都是「动词＋宾语」的结构，

比如GET /articles这个命令，GET是动词，/articles是宾语。

**五种HTTP方法**，对应我们业务接口的增删改查操作

- GET: 读取资源
- POST: 新建资源
- PUT: 更新资源
- PATCH: 资源部分数据更新
- DELETE: 删除资源

**正确的例子**

- GET /zoos: 列出所有动物园
- POST /zoos: 新建一个动物园
- GET /zoos/id: 获取某个指定动物园的信息
- PUT /zoos/id: 更新某个指定动物园的信息（提供该动物园的全部信息)
- PATCH /zoos/id: 更新某个指定动物园的信息(提供该动物园的部分信息)
- DELETE/zoos/id: 删除某个动物园
- GET /zoos/id/animals: 列出某个指定动物园的所有动物
- DELETE/zoos/id/animals/id: 删除某个指定动物园的指定动物

其余的去看码路官网，不怎么重要

# 08-MongoDB

MongoDB安装、可视化工具安装、可视化工具进行简单的增删改查 看码路官网

## 连接数据库（插入一条数据）

准备 创建school数据库，创建集合grade1

```
const MongoClient = require('mongodb').MongoClient;
(async function () {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    // 链接服务端
    await client.connect()
    console.log('链接成功')

    // 获取数据库 
    const db = client.db('school')
    console.log("db:", db);
    // 获取集合
    const grade1 = db.collection('grade1')

    await grade1.insertOne({
        name: "张三3",
        age: 20,
        hobby: ['吃饭', '睡觉', '打豆豆'],
        score: 90
    })

    // 关闭客户端的链接
    client.close()
})()
```



## 插入多条数据

```
const MongoClient = require('mongodb').MongoClient;
(async function () {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    // 链接服务端
    await client.connect()
    console.log('链接成功')

    // 获取数据库 
    const db = client.db('school')
    // 获取集合
    const grade1 = db.collection('grade1')

    let r = await grade1.insertMany([{
        name: '张三',
        age: 20,
        hobby: ['吃饭', '睡觉', '打豆豆'],
        score: 90
    },
    {
        name: '李四',
        age: 40,
        hobby: ['妹子', '篮球'],
        score: 93
    },
    {
        name: '王五',
        age: 20,
        hobby: ['妹子', '睡觉'],
        score: 70
    },
    {
        name: '赵六',
        age: 16,
        hobby: ['妹子'],
        score: 50
    },
    {
        name: '张丽',
        age: 38,
        hobby: ['妹子'],
        score: 56
    },
    {
        name: '小红',
        age: 40,
        hobby: ['妹子'],
        score: 87
    },
    {
        name: '小马',
        age: 20,
        hobby: ['妹子'],
        score: 79
    },
    {
        name: '小王',
        age: 59,
        hobby: ['妹子'],
        score: 102
    },
    {
        name: '小黑',
        age: 16,
        hobby: ['妹子'],
        score: 60
    },
    {
        name: '小哥',
        age: 18,
        hobby: ['篮球'],
        score: 49
    },
    ])

    // 关闭客户端的链接
    client.close()
})()
```



## 查找某一条数据

```
const MongoClient = require('mongodb').MongoClient;
(async function () {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    // 链接服务端
    await client.connect()
    console.log('链接成功')

    // 获取数据库 
    const db = client.db('school')
    // 获取集合
    const grade1 = db.collection('grade1')

    // 查找条件 
    r = await grade1.findOne({
        name: '张三'
    })
    console.log("r:", r);

    // 关闭客户端的链接
    client.close()
})()
```



## 查找多条数据

```
const MongoClient = require('mongodb').MongoClient;
(async function() {
const client = new MongoClient('mongodb://127.0.0.1:27017')
// 链接服务端
await client.connect()
console.log('链接成功')

// 获取数据库
const db = client.db('school')
// 获取集合
const grade1 = db.collection('grade1')

//查找所有的数据
r = await grade1.find().toArray()
console.log("r:", r);
// 找name是张三的
r = await grade1.find({
name: '张三'
}).toArray()
console.log("r:", r);

// 关闭客户端的链接
client.close()
})()
```



## 比较运算符使用

**gt大于 lt小于  gte 大于等于  lte小于等于**

求age大于等于20的学生

```js
const MongoClient = require('mongodb').MongoClient;
(async function () {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    // 链接服务端
    await client.connect()
    console.log('链接成功')

    // 获取数据库 
    const db = client.db('school')
    // 获取集合
    const grade1 = db.collection('grade1')

    // 比较运算符
    r = await grade1.find({
        age: {
            // gt大于 lt小于  gte 大于等于  lte小于等于
            $gte: 20,
        },
    }).toArray()
    console.log("r:", r);

    // 关闭客户端的链接
    client.close()
})()
```



## 逻辑运算符使用

$and 并且

$or 或者 

$nor 排除符合条件的

```js
const MongoClient = require('mongodb').MongoClient;
(async function () {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    // 链接服务端
    await client.connect()
    console.log('链接成功')

    // 获取数据库 
    const db = client.db('school')
    // 获取集合
    const grade1 = db.collection('grade1')

    // 逻辑运算符
    // $and 找爱好为妹子 and 年龄大于30的人
    // r = await grade1.find({
    //     $and: [
    //         {
    //             hobby:'妹子'
    //         }, {
    //             age:{
    //                 $gt: 20
    //             }
    //         }
    //     ]
    // }).toArray()

    // $or 查找 age 为16 或者 爱好是篮球的人
    // r = await grade1.find({
    //     $or: [{
    //         age:16
    //     }, {
    //         hobby:'篮球'
    //     }]
    // }).toArray();

    // $nor 查找年两在30 到 40 之间的人
    r = await grade1.find({
        $nor: [{
            age: {
                $gt: 40
            }
        }, {
            age: {
                $lt: 30
            }
        }]
    }).toArray();
    
    console.log("r:", r);

    // 关闭客户端的链接
    client.close()
})()
```



## 指定正则

```js
const MongoClient = require('mongodb').MongoClient;
(async function () {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    // 链接服务端
    await client.connect()
    console.log('链接成功')

    // 获取数据库 
    const db = client.db('school')
    // 获取集合
    const grade1 = db.collection('grade1')

    // 正则表达式 
    // 姓是张的人
    r = await grade1.find({
        name: {
            $regex: /^张/,
        },
    }).toArray()

    console.log("r:", r);

    // 关闭客户端的链接
    client.close()
})()
```



## $all $in $size

```js
const MongoClient = require('mongodb').MongoClient;
(async function () {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    // 链接服务端
    await client.connect()
    console.log('链接成功')

    // 获取数据库 
    const db = client.db('school')
    // 获取集合
    const grade1 = db.collection('grade1')

    // $all $in $size

    // 查找爱好中含有 妹子 的人
    // r = await grade1.find({
    //     hobby: {
    //         $all: ['妹子'],
    //     },
    // }).toArray()
    // console.log("r:", r);

    // ----------------------------------

    // 查找 爱好中 含有 妹子 或 睡觉 的人
//     r = await grade1.find({
//         hobby: {
//             $in: ['妹子', '睡觉'],
//         },
//     }).toArray()
// 
//     console.log("r:", r);

    // ----------------------------------

    // 查找爱好为 3 个的人
    r = await grade1.find({
        hobby: {
            $size: 3,
        },
    }).toArray()
    console.log("r:", r);

    // 关闭客户端的链接
    client.close()
})()
```



## 分页思想

```js
const MongoClient = require('mongodb').MongoClient;
(async function () {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    // 链接服务端
    await client.connect()
    console.log('链接成功')

    // 获取数据库 
    const db = client.db('school')
    // 获取集合
    const grade1 = db.collection('grade1')

    // 分页查询  limit()
    // 查询前两条数据
    // r = await grade1.find().limit(2).toArray()
    // console.log("r:", r);

    // --------------------------------

    // 跳过前2条数据,获取后4条数据
    // r = await grade1.find().skip(2).limit(4).toArray()
    // console.log("r:", r);

    // --------------------------------

    // 根据age字段进行排序 1表示正序  -1 表示倒序
    // r = await grade1.find().sort({
    //     age: -1,
    // }).toArray()
    // console.log("r:", r);

    // --------------------------------


    // 分页
    const pageIndex = 1 //当前的索引
    const pageSize = 3 //当前一页显示的数据
    r = await grade1
        .find()
        .skip((pageIndex - 1) * pageSize)
        .limit(pageSize)
        .toArray()
    console.log("r:", r);

    // 关闭客户端的链接
    client.close()
})()
```



## 更新文档

```js
const MongoClient = require('mongodb').MongoClient;
(async function () {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    // 链接服务端
    await client.connect()
    console.log('链接成功')

    // 获取数据库 
    const db = client.db('school')
    // 获取集合
    const grade1 = db.collection('grade1')

    r = await grade1.updateOne({
        name: "张三",
    }, {
        $set: {
            name: "小张三"
        }
    })
    console.log('更新成功', r)

    // 关闭客户端的链接
    client.close()
})()
```



## 删除文档

```js
const MongoClient = require('mongodb').MongoClient;
(async function () {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    // 链接服务端
    await client.connect()
    console.log('链接成功')

    // 获取数据库 
    const db = client.db('school')
    // 获取集合
    const grade1 = db.collection('grade1')

    // 当你做删除的时候 一定要问一下自己 是否要删除
    r = await grade1.deleteOne({
        name: '小张三'
    })
    console.log(r.result);

    // 关闭客户端的链接
    client.close()
})()
```

## Mongoose

写项目会直接用Mongoose，之前学的原生node操作mongodb数据库都不咋用

**什么是Mongoose?**

- 像操作JS对象一个，去操作集合
- 参考文档：http://www.mongoosejs.net/
- 参考文档：https://mongoosejs.com/

**Mongoose和MongoDB映射关系**

- 在Mongoose中JS中的一个模型就对应数据库中的一个集合
- 在Mongoose中JS中的一个对象就对应集合中的一个文档
- 在Mongoose中JS中的一个对象的属性就对应文档的一个字段

### Mongoose得基本使用

```js
// 1.导入mongoose
const mongoose = require('mongoose');

/*
mongodb://MongoDB服务器IP地址:MongoDB服务器端口号/需要打开的数据库名称
* */
// 2.利用mongoose链接MongoDB服务器
mongoose.connect('mongodb://127.0.0.1:27017/demo');

// 3.监听链接成功还是失败
let db = mongoose.connection;
db.on('error', (err) => {
    console.log(err, '连接失败');
});
db.once('open', function() {
    console.log('连接成功');
});
db.once('close', function() {
    console.log('断开连接');
});

// 1.定义集合中存储数据规则
let userSchema = new mongoose.Schema({
    name: String,
    age: Number
});
// 2.利用规则创建集合
// 注意点: 只要创建好了模型, 那么以后就可以使用模型来操作这个集合
// 注意点: mongoose会自动将我们指定的集合名称变成复数
let User = mongoose.model('User', userSchema);

// 3.利用集合创建文档
// 注意点: 只要创建好了对象, 那么以后就可以使用对象来操作文档
let u = new User({
    name: 'zs',
    age: 18
});

// 4.操作文档
u.save((err, product) => {
    if (!err) {
        console.log('文档保存成功');
        console.log(product);
    }
});
```

### Mongoose实现增删改查

```js
// 1.1导入mongoose
const mongoose = require('mongoose');

// 1.2mongoose连接MongoDB服务器 
// demo 是要连接得数据库名，不存在会自动创建
mongoose.connect('mongodb://127.0.0.1:27017/demo')

// 1.3监听连接成功还是失败
let db = mongoose.connection;
db.on('error', (err) => {
    console.log(err, '连接失败');
});
db.once('open', function () {
    console.log('连接成功');
});
db.once('close', function () {
    console.log('断开连接');
});

// 2.1定义集合存储规则
let userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// 2.2创建集合
let User = mongoose.model('User', userSchema);

// 3.1插入数据
// (async function () {
//     let result = await User.create([
//         { name: '光头强', age: 30 },
//         { name: '熊大', age: 22 },
//         { name: '熊二', age: 21 },
//         { name: '蔡徐坤', age: 26 },
//     ]);
//     console.log(result);
// })();

// 3.2查询数据
//     查询条件   隐藏_id __v       跳过2条  显示3条
// User.find({}, { _id: 0, __v: 0 }, {skip:2,limit:3},(err, res) => {
//     if (!err) {
//         console.log(res);
//     }
// });

// 3.3更新数据
//          条件               将年龄修改为999   修改所有符合条件得，不写只修改查到的第一条
// User.update({name:'光头强'}, { $set:{age:999} }, { multi:true }, (err, res) => {
//     if (!err) {
//         console.log(res);
//     }
// });

// (async () => {
//     let result = await User.update({ name: '光头强' }, { $set: { age: 123 } }, { multi:true });
//     console.log(result);
// })();

// 3.4删除数据
(async () => {
    let result = await User.deleteOne({ name: '光头强' });
    console.log(result);
})();
```

