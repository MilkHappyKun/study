# 01-初识vue与插值语法

## 1.1-hello案例

```vue
    <script src="./lib/vue.js"></script>

	<!-- 容器 -->
    <div id="root">
        <h1>hello,{{name}}</h1> 
        <h1>我的年龄是: {{age}}</h1>
    </div>

    // 创建Vue实例
    let vm = new Vue({
        el: '#root' ,// 指定当前Vue实例为那个容器服务，通常为css选择器字符串
        data : {     //暂时写成一个对象
            name : '132456',
            age : 18
        }
    })
```

**总结**

        1）vm叫Vue根实例   
        2）new Vue时，需要传递一个配置对象  el:与某个模板进行关联   data:给模板提供数据
        3）放在data中的数据是响应式数据，所谓的响应式指的是数据变了，模板重新渲染
        4）放在data中的数据，会挂载到vm实例上，通常vm就可以操作数据
        5）vue核心就是操作数据，数据也叫状态，操作状态
**注意**

- name不能是纯中文，不然打不开

![](https://i0.hdslb.com/bfs/new_dyn/3d5f74a870477992b502ce95b75b9fc6562431495.png@1554w.webp)

- 容器和vue之间时一对一的，一般都用id选择器来给vue选唯一的那个容器

- {{XXX}} 里面必须写表达式，表达式就是 值

## 1.2-插值语法

又称小胡子语法 {{XXX}} 

**注意点**

​        1）只能放在文本节点处，不能写属性节点处

​        2）插值语法，只能放在容器内部使用，不能放在容器外部使用

​        3）小胡子中，只能放表达式，值

## 1.3-$mount的使用

- $mount方法主要的作用是VM与容器进行关联【VM与容器关联第二种写法】, 传递的参数容器CSS选择器(字符串类型的)
- $mount【挂载】：它是Vue.prototype原型的一个方法，VM可以调用。Vue类的实例方法一般都是以$开头的

```vue
	<div id="app">
        <h1>{{name}}</h1>
    </div>

    <script>
        let vm = new Vue({
            // 除了el与模板进行关联之外，还可以使用$mount进行关联
            // el:".app",
            data() {
                return {
                    name: "码路教育123"
                }
            }
        });
        vm.$mount("#app");
    </script>
```

# 02-事件绑定

## 2.1-事件的绑定 v-on

- 通过v-on指令来绑定事件，可以简写成 @事件名字，一般用简写的方式，用@替换。
- 一个元素可以同时绑定多个事件，但是一般情况下只是绑定一个
- VM对象方法的this问题, 方法不能书写箭头函数（箭头函数没有任何意义, 因为获取不到VM，获取不到响应式数据，获取到的是windows）

```html
	<div class="box" @click="handle"></div>
	
	<script>
        let vm = new Vue({
            el:"#app",
            data(){
                return {
                    msg:"hello vue"
                }
            },
            methods:{
                handle:function(){
                    console.log(this);
                    this.msg = "hi vue"
                }
            }
        });

        // 在methos中的方法，也会挂载到vm实例上的
        vm.handle2()
    </script>
	
```

## 2.2-传参

$event 事件对象



```html
    <!-- 没有加() 在监听器中，默认第一个参数，就是事件对象 -->
    <button @click=" getMsg3 ">获取事件对象方式一</button>
    
    传递参数，此时还想获取事件对象需要手动的传递事件对象 $event
    <button @click=" getMsg2(123,'i love you',$event) ">传递多个个参数</button>
    
        getMsg2(a, b，c) {
        	console.log(a, b,c);
    	},
```

## 2.3-事件修饰符

- .stop - 调用 event.stopPropagation()。
- .prevent - 调用 event.preventDefault()。
- .capture - 添加事件侦听器时使用 capture 模式。
- .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- .{keyAlias} - 仅当事件是从特定键触发时才触发回调。
- .once - 只触发一次回调。
- .left - 只当点击鼠标左键时触发。
- .right - 只当点击鼠标右键时触发。
- .middle - 只当点击鼠标中键时触发。
- .passive - { passive: true } 模式添加侦听器

```html
	<button @click.prevent="showMsg">点我</button>
```

事件的修饰符可以链式来写，谁先谁后无所谓，了解：@click.stop.prevent.once

# 03-指令

Vue框架提供很多指令, Vue框架中的指令，实质就是给标签新增自定义属性，只不过指令都是 v-xx

**.1 v-bind指令**

{{}}只能写在文件节点处，不能写在属性节点处，v-bind

- v-bind作用是用于把数据绑定到属性节点处，可以简写成 :
- 动态地绑定一个或多个 属性，或一个组件 prop 到表达式。
- v-bind用于绑定一个或多个属性值，或者向另一个组件传递props值（这个学到组件时再介绍）
- {{}}给标签绑定动态文本，v-bind给标签绑定动态属性

```html
    <!-- 定义的容器 -->
    <div id="app">   
        <a :href="url">{{name}}</a>
    </div>
    
    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    url: "https:baidu.com",
                    name: "wangcai"
                }
            }
        });
    </script>
```

**.2 v-once指令（了解）**

- v-once用于指定元素或者组件只渲染一次
- 当数据发生变化时，元素或者组件以及其所有的子元素将视为静态内容并且跳过
- 该指令可以用于性能优化
- 如果是子节点，也是只会渲染一次

```html
    <!-- 定义的容器 -->
    <div id="app" v-once>
        <!-- v-once表示只会第一次渲染数据到模板中，后面数据变了，模板也不会刷新了 -->
        <!-- <h2 v-once>计数器：{{number}}</h2> -->
        <h2>计数器：{{number}}</h2>
        <button @click="increment">加1</button>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    number: 0
                }
            },
            methods: {
                increment() {
                    this.number++
                }
            }
        });
    </script>
```



**.3 v-text 指令(了解)**

- 用于更新元素的 textContent：

 {{}}是v-text的语法糖，说白了，就是简写形式

```html
<h2>{{msg}}</h2> 相当于 <h2 v-text="msg"></h2>
```

**.4 v-html指令**

- 默认情况下，如果我们展示的内容本身是 html 的，那么vue并不会对其进行特殊的解析
- 如果我们希望这个内容被Vue可以解析出来，那么可以使用 v-html 来展示；

```html
    <!-- 定义的容器 -->
    <div id="app">
        <div v-html="msg"></div>
    </div>
    
     <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    msg: "<p style='color:red;'>我是一个P标签</p>"
                }
            }
        });
    </script>
```

**.5 v-pre指令（了解）**

- v-pre用于跳过元素和它的子元素的编译过程，显示原始的标签
- 跳过不需要编译的节点，加快编译的速度；

```html
    <div id="app">
        <div v-pre>
            <h2>{{msg}}</h2>
            <p>{{count}}</p>
        </div>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    msg: "funk you",
                    count: 999
                }
            }
        });
    </script>
```



**.6 v-cloak指令（了解）**

- 这个指令保持在元素上直到关联组件实例结束编译
- 和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到组件实例准备完毕

三秒后出现hello vue

```html
// 
<style>
        [v-cloak]{
            display: none;
        }
    </style>
</head>

<body>
    <!-- 定义的容器 -->
    <div id="app">
        <!-- 需求：如果vm和模板没有关联好，不要去编译{{}} -->
        <h2 v-cloak>{{msg}}</h2>
    </div>

    <script>
        setTimeout(() => {
            let vm = new Vue({
                el: "#app",
                data() {
                    return {
                        msg: "hello vue"
                    }
                }
            });
        }, 3000);
    </script>
```

**.7 v-if 指令**

- 在某些情况下，我们需要根据当前的条件决定某些元素或组件是否渲染，这个时候我们就需要进行条件判断了
- Vue提供了下面的指令来进行条件判断：
  - v-if
  - v-else
  - v-else-if
  - v-show

**v-if、v-else、v-else-if用于根据条件来渲染某一块的内容**

- 这些内容只有在条件为true时，才会被渲染出来
- v-if是惰性的,如果判断值本身就是false，压根就不会创建
- 当条件为false时，其判断的内容完全不会被渲染或者会被销毁掉
- 当条件为true时，才会真正渲染条件块中的内容；
- v-if每一次展示都是创建一个新的DOM, 每一次隐藏都需要移出、干掉DOM进行隐藏。
- v-if|v-eles-if|v-else中间不要出现其它的标签，否则就会失效，报警告了

```html
	<div id="app">
        <div class="pink" v-if=" show==='pink' "></div>
        <div class="skyblue" v-else-if=" show=='skyblue' "></div>
        <div class="gold" v-else></div>
    </div>
    
    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    show: "gold"
                }
            }
        });  
    </script>
```

**template元素**

template 模板，也叫幽灵标签

- template元素可以当做不可见的包裹元素，并且在v-if上使用，但是最终template不会被渲染出来，有点类似于小程序中的block
- 因为v-if是一个指令，必须将其添加到一个元素上，如果我们不想要渲染 div 可以用 template

```html
	<div v-if="number==1">
            <div>haha</div>
            <div>haha</div>
            <div>haha</div>
    </div>
```

变成

```html
		<template v-if="number==1">
            <div>haha</div>
            <div>haha</div>
            <div>haha</div>
        </template>
```

**.8 v-show**

- v-show:  可以让元素进行显示与隐藏？【功能与v-if类似】
- v-show: 右侧属性一般需要的是布尔值 或 JS表达式
- v-show是通过样式display实现元素的显示（block）与隐藏（none）

```html
	<div id="app">
        <button @click="handle">通过v-show控制元素的显示与隐藏</button>
        <div class="box" v-show="show"></div>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    show: false
                }
            },
            methods: {
                handle() {
                    this.show = !this.show;
                }
            }
        });
    </script>
```

**v-show 和 v-if 的区别**

- v-show 不支持 template
- v-show元素无论是否需要显示到浏览器上，它的DOM实际都是有存在的，只是通过CSS的display属性来进行切换
- v-if当条件为false时，其对应的原生压根不会被渲染到DOM中
- v-if直接操作DOM创建与销毁，频繁的操作DOM，很耗性能的。
- 如果我们的原生需要在显示和隐藏之间频繁的切换，那么使用v-show
- 如果不会频繁的发生切换，那么使用v-if
- v-if与v-show在控制元素的显示与隐藏的时候，尽可能使用v-show

**为什么做元素的显示与隐藏的效果，使用v-show性能会优化一些那?**

- v-if：通过创建DOM、移出DOM完成元素的显示与隐藏，会导致浏览器重排。
- v-show: 通过样式display实现元素的显示与隐藏，会导致浏览器重绘。
- 虽然重绘、重排都消耗电脑的性能，但是重绘消耗的性能更少一些。
- v-show与v-if选择的时候，尽可能使用v-show

**.9 v-model**

**v-model的原理**

- v-model 本质上是语法糖 :value + @input

```html
<input type="text" :value="msg" @input="msg = $event.target.value">
```

相当于

```html
 <input type="text" v-model="msg">
```



**v-model收集表单中的数据**

- v-model指令可以在表单 input、textarea以及select元素上创建双向数据绑定
- 它会根据控件类型自动选取正确的方法来更新元素

```html
    <div id="app">
        <input type="text" v-model="msg">
.lopi=iP
        <label for="account">
            账号：<input type="text" id="account" v-model="account">
        </label>
        <label for="pwd">
            密码：<input type="password" id="pwd" v-model="pwd">
        </label>
        <button @click="loginClick">登录</button>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    msg: "i love vue",
                    account: "",
                    pwd: ""
                }
            },
            methods: {
                inputChange(e) {
                    this.msg = e.target.value
                },
                loginClick() {
                    console.log("用户名：", this.account);
                    console.log("密码：", this.pwd);
                }
            }
        });
    </script>
```

    **v-model 绑定 textarea**

```html
    <div id="app">
        <textarea cols="30" rows="10" v-model="content"></textarea>
        <p>输入的内容：{{content}}</p>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    content:""
                }
            }
        });
    </script>
```

**v-model 绑定 checkbox**

- v-model绑定checkbox：单个勾选框和多个勾选框
- 单个勾选框：v-model即为布尔值,此时input的value属性并不影响v-model的值
- 多个复选框：v-model收集的是value值，因为可以选中多个，所以对应的data中属性是一个数组
- 当选中某一个时，就会将input的value添加到数组中

```html
    <div id="app">
        <label for="agree">
            <input type="checkbox" id="agree" v-model="isAgree"> 同意xxx协议
        </label>
        <h2>单选框：{{isAgree}}</h2>
        <hr>
        
        <div class="hobbies">
            <h2>请选择你的爱好：</h2>
            <label for="sing">
                <input type="checkbox" id="sing" v-model="hobbies" value="sing"> 唱歌
            </label>
            <label for="coding">
                <input type="checkbox" id="coding" v-model="hobbies" value="coding"> 打代码
            </label>
            <label for="basketball">
                <input type="checkbox" id="basketball" v-model="hobbies" value="basketball"> 打篮球
            </label>
        </div>

        <h2>爱好：{{hobbies}}</h2>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    isAgree: false,
                    hobbies: []
                }
            }
        });
    </script>
```

**v-model绑定radio**

- v-model绑定radio，用于选择其中一项，model收集的是value值

```html
    <div id="app">
        <div class="gender">
            <label for="male">
                <input id="male" name="sex" type="radio" v-model="gender" value="male"> 男
            </label>
            <label for="female">
                <input id="female" name="sex" type="radio" v-model="gender" value="female"> 女
            </label>
            <h2>性别: {{gender}}</h2>
        </div>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    gender: "female"
                }
            }
        });
    </script>
```

**v-model绑定select**

- 单选：只能选中一个值，v-model绑定的是一个值
- 多选：可以选中多个值，v-model绑定的是一个数组

按住ctrl 鼠标可以进行多选

```html
<div id="app">
        <!-- select的单选 -->
        <!-- v-model需要写在select身上 -->
        <select v-model="fruit">
            <option value="apple">苹果</option>
            <option value="orange">橘子</option>
            <option value="banana">香蕉</option>
        </select>
        <h2>单选：{{fruit}}</h2>

        <hr>

        <!-- multiple 多选 -->
        <!-- size=3 表示可视区中显示几个选项 -->
        <!-- 收集多个，v-model绑定的就是一个数组 -->
        <select multiple size="3" v-model="fruit2">
            <option value="apple">苹果</option>
            <option value="orange">橘子</option>
            <option value="banana">香蕉</option>
        </select>
        <h2>多选：{{fruit2}}</h2>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    fruit: "banana",
                    fruit2: ["apple"]
                }
            }
        });
    </script>
```

**.10 v-model修饰符**

**lazy**

- 默认情况下，v-model在进行双向绑定时，绑定的是input事件，那么会在每次内容输入后就将最新的值和绑定的属性进行同步
- 如果我们在v-model后跟上lazy修饰符，那么会将绑定的事件切换为 change 事件，只有在提交时（比如回车）才会触发

**number**

- 将绑定的字符串类型，转换为数字类型

**trim**

- 自动过滤用户输入的首尾空白字符，可以给v-model添加 trim 修饰符

```html
<input type="text" v-model.lazy.number.trim="str">
```

.11 v-for

**在真实开发中，我们往往会从服务器拿到一组数据，并且需要对其进行渲染。可以使用v-for来完成**

- v-for的基本格式是 "item in 数组"
- 数组通常是来自data或者prop，也可以是其他方式
- 如果我们需要索引，可以使用格式： "(item, index) in 数组"
- v-for 也支持遍历对象 "(value, key, index) in object";
- v-for同时也支持数字的遍历，每一个item都是一个数字;
- v-for也可以遍历其他可迭代对象，比如字符串

```html
    <div id="app">
        <ul>
            <p>遍历数组</p>
            <li v-for="(item,index) in students">
                {{ item }} --- {{ index }}
            </li>
            <p>遍历对象</p>
            <li v-for="(value,key,index) in person">
                {{ value }} -- {{ key }} --{{ index}}
            </li>
            <p>遍历数字</p>
            <li v-for="(num,index) in 5">
                {{num}} -- {{index}}
            </li>
            <p>遍历字符串</p>
            <li v-for="(item,index) in str">
                {{item}} -- {{index}}
            </li>
        </ul>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    students: ["貂蝉", '妲己', '大桥'],
                    person: {
                        name: "小强",
                        age: 114,
                        height: "514cm"
                    },
                    str: "114514下北泽"
                }
            }
        });
    </script>
```

**vue获取dom 元素 ref**

- 在vue里获取dom元素通过ref,

```html
    <div id="app">
        <ul>
            <li v-for="(item,index) in arr" :ref="index" @click="handle(index)">
                {{item.title}} ---- {{index}}
            </li>
        </ul>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    arr: [
                        { id: 1, title: '军事' },
                        { id: 2, title: '游戏' },
                        { id: 3, title: '直播' }
                    ]
                }
            },
            methods:{
                handle(index){
                    console.log(this.$refs[index][0]);// 点击的标签
                    this.$refs[index][0].style.background = "gold";
                }
            }
        });
    </script>
```

# 04-计算属性和侦听器

## 复杂 data 的处理方式

1. {{}} 插值语法中运算
2. 把复杂运算放到方法 methods 中
3. 利用计算属性，放到computed中，计算属性不能写异步代码

```html
	<div id="app">
        请输入你的姓：<input type="text" v-model="firstName"> <br>
        请输入你的名：<input type="text" v-model="lastName"> <br>
        <p>全名：{{ firstName + lastName }}</p>
        <hr>
        <p>全名：{{ allName() }}</p>
        <hr>
        <p>全名：{{ allName2 }}</p>
    </div>
    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    firstName: "wang",
                    lastName: "Cai"
                }
            },
            methods: {
                allName() {
                    console.log("我是方法");
                    return this.firstName + this.lastName
                }
            },
            computed: {
                allName2() {
                    console.log("我是计算属性");
                    return this.firstName + this.lastName;
                }
            }
        });
    </script>
```

**计算属性 和 methods 的区别**

- methods它主要的作用是给VM实例添加方法----方法
- computed：它是利用已有的属性与属性值创建出一个新的属性与属性值----属性
- 区别1: methods方法在使用的时候一般需要加上小括号, 计算出来的属性, 在使用的时候是不需要加小括号的
- 区别2：计算属性算出来的数值有缓存机制, 计算出一个可以多次使用

## 侦听器

**什么是侦听器？**

开发中我们在data返回的对象中定义了数据，这个数据通过插值语法等方式绑定到template中, 当数据变化时，template会自动进行更新来显示最新的数据, 但是在某些情况下，我们希望在代码逻辑中监听某个数据的变化，这个时候就需要用侦听器watch来完成了

**监听VM响应式属性写法 ，不管是对象、函数写法都常用**

- 第一种函数写法
- 第二种对象写法

```html
    <div id="app">
        请输入搜索的关键字：<input type="text" placeholder="关键字" v-model="keyword">
    </div>
    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    keyword: "11"
                }
            },
            watch: {
                // 表示侦听keyword  如果keyword发生了变化  就可以被侦听到
                // 函数的写法
                // keyword(){
                //     console.log("我侦听到了keyword的变化");
                // }

                // 对象的写法
                keyword: {
                    // 对象的写法，需要在对象中写一个handler
                    // 当keyword发生了变化，会自动执行handler
                    // handler名字不能随便写
                    handler() {
                        console.log("我侦听到了keyword的变化");
                    }
                }
            }
        });
    </script>
```

**侦听器的配置选项**

- deep:true, 能够对于object内部属性的变化做出响应
- immediate:true，一开始就执行一次

```html
    <div id="app">
        <button @click="a.b.count++">+</button>
        <span>{{a.b.count}}</span>
        <button @click="a.b.count--">-</button>
        <h3>{{a.b.msg}}</h3>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    a: {
                        b: {
                            count: 1,
                            msg: '我爱你'
                        }
                    }
                }
            },
            watch: {
                // 侦听a这个响应式数据  函数的写法
                // a(){
                //    console.log(this.a.b.count);
                // }

                // 如果想侦听到对象中所有的属性，需要写成对象的形式
                a: {
                    deep: true, // 尝试侦听
                    immediate: true, // 一上来，先执行一次侦听器
                    handler() {
                        console.log(this.a.b.count);

                        // 在侦听器中可以写异步代码
                        setTimeout(() => {
                            this.a.b.msg = "lalala"
                        }, 3000)
                    }
                }
            }
        });
    </script>
```

# 05-动态类名与行内样式

## 绑定class

**1-动态类名支持单个状态写法**

```html
	<div id="app">
        <!-- 动态类名的写法  box2是一个状态 -->
        <!-- 在一个标签上，即可以写动态类型，也可以写非动态类型 -->
        <div :class="box2" class="box3">动态类名-单个状态的写法</div>
    </div>

    <script>
        let vm = new Vue({
            el:"#app",
            data(){
                return {
                    box2:"bad" // bad是一个class类名
                }
            }
        });
    </script>
```

**2-通过对象动态绑定class类名**

```html
    <div id="app">
        <!-- 动态类名 对象的定法
            :class后面跟一个对象  { K:V }
        -->
        <div :class="obj">
            千里之行，始于足下。——老子
        </div>
    </div>

    <script>
        let vm = new Vue({
            el:"#app",
            data(){
                return {
                    obj:{
                        // 键表示类名  值表示是否有这个类
                        one:true,
                        two:true,
                        three:false,// 无
                        four:0 // 无
                    }
                }
            }
        });
    </script>
```

**3-通过数组动态绑定class类名**

```
<div id="app">
        <div :class="['one','two','three']"> // 有这三个类
            精诚所至，金石为开。——蔡锷
        </div>
        <hr>
        <p :class="arr"> // arr 里有2个，有2个类
            成功的秘诀，在永不改变既定的目的
        </p>
    </div>

    <script>
        let vm = new Vue({
            el:"#app",
            data(){
                return {
                    arr:["one","two"]
                }
            }
        });
    </script> 
```

1）:class="box1"   就可以操作box1这个状态了
2）:class="obj"  obj:{ a:true,b:true,c:false }   有a和b类，没有c类  操作obj对象
3）:class="arr"   arr:[a,b,c]  操作数组

## 绑定style

**1-通过对象动态绑定style**

```
    <div id="app">

        <!-- :style后面有两种写法：对象的写法 -->
        <!-- 如果css属性中包含- 需要转成小驼峰的写法 -->
        <p :style="obj">
            任何人都应当有自尊心，自信心，独立性，不然就是奴才
        </p>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            data() {
                return {
                    // vm.obj.color = "red" 通过这种形式添加的数据并不是响应式数据，页面不会更新
                    
                    obj: {
                        width: "200px",
                        height: "200px",
                        // vm.obj.background = "gold"   修改响应式数据，模板会更新
                        background: "skyblue"
                    }

                    // 后期想给obj上添加响应式数据，如何添加？
                    // 答：$set
                    // 删除一个响应式数据，使用$delete
                }
            }
        });
        vm.$set(vm.obj, "color", "red")
    </script>
```

**2-通过数组动态绑定style (了解)**

```
 	<div> 
        <p :style="arr">
            任何人都应当有自尊心，自信心，独立性，不然就是奴才
        </p>
    </div>

    <script>
        let vm = new Vue({
            el:"#app",
            data(){
                return {
                    arr:[
                        {color:'red',background:'skyblue'},
                        {height:'300px'},
                    ]
                }
            }
        });
    </script>
```

# 06-数组更新检测与Vue生命周期

## 数组响应式注意事项

**数组更新检测**

- Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新
  - push()
  - pop()
  - shift()
  - unshift()
  - splice()
  - sort()
  - reverse()
- 上面的方法会直接修改原来的数组，会引起界面更新
- 某些方法不会替换原来的数组，而是会生成新的数组，比如 filter()、concat() 和 slice()，如果让新数组覆盖旧数组也会引起界面更新

- 如果数组中的元素是一个对象的话，通过索引去修改对象中的属性，也会引起界面的更新
- 如果数组中的数据是基本数据类型，通过索引去修改它，界面并不会更新

## Vue生命周期



# 07-非单文件组件VC

## 什么是组件化开发？

**Vue特点: 组件化、声明式编程、虚拟DO+DIFF**

- 组件:component

**组件化开发思想**

- 将一个页面中所有的处理逻辑全部放在一起，处理起来就会变得非常复杂，不利于后续的管理以及扩展；
- 但如果，我们将一个页面拆分成一个个小的功能块，每个功能块完成属于自己这部分独立的功能，那么之后整个页面的管理和维护就变得非常容易了
- 我们将一个个功能块拆分后，就可以像搭建积木一下来搭建我们的项目
- 现在整个的大前端开发都是组件化的天下
- 无论从三大框架（Vue、React、Angular），还是跨平台方案的Flutter，甚至是移动端都在转向组件化开发，包括小程序的开发也是采用组件化开发的思想
- 组件: 复用的【代码 + 资源(图片、样式、视频)】集合在一起即为组件

**以组件化的思想考虑整个项目**

- 将一个完整的页面分成很多个组件
- 每个组件都用于实现页面的一个功能块
- 而每一个组件又可以进行细分
- 而组件本身又可以在多个地方进行复用
- 组件化提供了一种抽象，让我们可以开发出一个个独立可复用的小组件来构造我们的应用
- 任何的应用都会被抽象成一颗组件树

## 组件的基本使用

**Vue框架中从书写角度出发：分为两大类组件**

- 单文件组件: 一个文件即为一个组件, 这个文件的尾缀务必是.vue
- 非单文件组件: 一个文件里面，可以定义多个组件，这个文件尾缀.html.

**非单文组件使用分为三步骤**

- 第一步: 定义
  - 定义一个组件:利用的是Vue.extend方法去定义组件
  - extend方法里面也需要传递配置对象,extend配置对象与Vue配置对象几乎一模一样！！！
- 第二步: 注册
  - 注册，某一个地方需要组件，进行注册。在components配置项进行注册
- 第三步: 使用
  - 使用，【是以自定义标签的形式使用，首字母一般大写】

**注意点**

- 不能书写el、组件的响应式数据务必比是函数写法

**下面是局部注册组件**

```html
    <div id="app">
        <Hello></Hello>
        <Hello></Hello>
        <Hello></Hello>
        <Hello></Hello>
        <Hello></Hello>
    </div>

    <script>
        // 在extend中传组件的配置项
        // 之前new Vue时，传递的配置项，在Vue.extend中基本上都可以配置
        let Hello = Vue.extend({
            // el 只有根组件中才可以配置el，在普通组件中不能配置el
            template: "<h2>我是Hello组件</h2>", // 配置当前组件对应的模板
        })
 
        let vm = new Vue({
            el: "#app",
            data() {
                return {

                }
            },
            components: {
                Hello
            }
        });
    </script>
```

```html
    <div id="app">
        <!-- 使用组件就相当于使用标签 -->
        <Count></Count> <br>
        <Count></Count> <br>
        <Count></Count> <br>
        <Count></Count> <br>
        <Count></Count> <br>
        <Box></Box> <br>
        <Box></Box> <br>
        <Box></Box> <br>
        <Box></Box> <br>
    </div>

    <script>
        let Hello = Vue.extend({
            template: "<h1>我是Hello组件</h1>"
        })

        let Count = Vue.extend({
            components:{
                Hello
            },
            data(){
                return{
                    count:0
                }
            },
            methods:{
                add(){ this.count++ },
                minus(){ this.count-- }
            },
            template: `
                <div class="box">
                    <Hello></Hello>
                    <button @click="minus">-</button>
                    <span>{{count}}</span>
                    <button @click="add">+</button>
                </div>
            `
        })

        let Box = Vue.extend({
            data(){
                return{
                    f:16
                }
            },
            template:`
                <div class="box1">
                    <p :style="{fontSize:f+'px'}" @click="f++">我是一个孤独的P标签</p>
                </div>
            `
        })

        let vm = new Vue({
            el: "#app",
            components:{
                Count,
                Box
            },
            data() {
                return {

                }
            }
        });
    </script>
```

**为什么组件的响应式必须要书写成函数？**

因为组件是复用的，防止多个组件公用同一个内存地址，数据污染，如果我们采用函数的形式，则不会出现这种情况，函数返回的对象地址内存并不相同

## 根组件的template模板

**对于根组件来说，可以在两个地方，指定模板**
1）el对应容器内部的html代码段
2）配置template,用来指定模板  如果指定了template，它的优先级更高

```html
    <div id="app">
        <div>我是一个DIV</div>
    </div>

    <script>
        let vm = new Vue({
            el: "#app",
            template: `
                <div>haha</div>
            `,
            data() {
                return {

                }
            }
        });
    </script>
```

## 全局注册组件

**定义为全局组件 : 定义一次, 可以在任意地方直接使用，不需要注册。**

- 第一个参数：全局组件的名字(字符串) 第二个参数: 组件(不能书写为字符串)
- 全局组件一般在这种情况下才会使用: 项目当中很多地方(组件)，大家频繁使用某一个功能
- 你就可以把这个功能封装为全局组件，定义一次，可以在任意地方【不需要引入、不需要注册】直接使用。

```html
    <div id="app1">
        <div>
            我是DIV1
            <hr>
            <Count></Count>
        </div>
    </div>

    <div id="app2">
        <div>
            我是DIV2
            <hr>
            <Count></Count>
        </div>
    </div>

    <script>
        // 定义Count组件
        const Count = Vue.extend({
            data() {
                return {
                    count: 1
                };
            },
            template: `
                <div>
                   <button @click="count++">加</button>
                   <span>{{count}}</span>
                   <button @click="count--">减</button>    
                </div>
             `
        });
        Vue.component("Count", Count)

        let vm1 = new Vue({
            el: "#app1",
            // components:{ // 这部分可以不写
            //     Count
            // },
            data() {
                return {

                }
            }
        });
        let vm2 = new Vue({
            el: "#app2",
            // components:{
            //     Count
            // },
            data() {
                return {

                }
            }
        });
    </script>
```

## 动态组件component

vue中内置了一个component组件，可以实现组件之间的切换，跟路由类似，通过is选项来确定到底显示哪个组件

app组件

```vue
<template>
  <div id="app">
    <h1>app组件</h1>
    <hr>
    <dynamic></dynamic>
  </div>
</template>

<script>
import Dynamic from './views/Dynamic.vue'

export default {
  name: 'App',
  components: {
    Dynamic
  }
}
</script>
```

views/Dynamic组件

```vue
<template>
  <div>
    <h1>动态组件</h1>
    <button @click="componentId = 'UserName' ">填写用户名和密码</button>
    <button @click="goUserInfo">填写个人信息</button>
    <component :is="componentId"></component>
  </div>
</template>

<script>
import UserInfo from '../components/UserInfo.vue'
import UserName from '../components/UserName.vue'

export default {
  name: 'Dynamic',
  props: [],
  data() {
    return {
      componentId: ""
    }
  },
  components: {
    UserInfo,
    UserName
  },
  methods: {
    goUserInfo() {
      this.componentId = "UserInfo";
    }
  }
}
</script>

<style scoped lang="less">
</style>
```

components/UserName组件

```vue
<template>
  <div>
    <h1>用户姓名组件</h1>
    <span>用户名</span>
    <input type="text">
    <span>用户密码</span>
    <input type="password">
  </div>
</template>

<script>
export default {
  name: 'UserName',
  props: [],
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
```

components/UserInfo组件

```vue
<template>
  <div>
    <h1>用户信息组件</h1>
    <span>填写用户信息</span>
    <input type="textarea">
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: [],
  data() {
    return {
    }
  },
  methods: { 
  }
}
</script>

<style scoped lang="less">
</style>
```

 

## vm与组件的关系

Vue vm VueCompoent vc 四者关系

![](https://i0.hdslb.com/bfs/new_dyn/f7104cc5f49d4a0bfb5ae3ae2da14339562431495.png@1554w.webp)

- Vue.extend返回一个构造函数VueComponent,是一个类，构造器，只不过这个对象Vue会帮我们去new 
- vc 就是Vue帮我们用返回的VueComponent new出来的一个对象
- Vue也叫类，也叫构造器
- new Vue得到一个vm实例

**Vue.extend创建组件简写方式**

```html
<div id="app">
        <!-- <Abc></Abc> -->
        <App></App>
    </div>

    <script>
    // 简写，单纯就是let APP = {...},简写前是Vue.extend({...})
        let App = {
            // 为了在调试工具中显示正确的组件名，通常会配置name选项
            name:"App",
            data(){
                return{
                    name:"wc"
                }
            },
            template:`
                <div>
                    <h1 @click="handler">{{name}}</h1>
                </div>
            `,
            methods:{
                handler(){
                    this.name = "xq";
                    console.log(this);
                }
            }
        }

        let vm = new Vue({
            el:"#app",
            components:{
                // Abc表示注册名  App表示组件名
                // "Abc":App
                App
            },
            data(){
                return {
                 
                }
            }
        });
    </script>
```

# 08-脚手架的使用

**Vue的脚手架就是Vue CLI**

- 全局安装: npm install @vue/cli -g
- 升级Vue CLI(如果是比较旧的版本，可以通过下面的命令来升级): npm update @vue/cli -g
- 通过Vue的命令来创建项目: Vue create 项目的名称
- 然后进行Vue create 项目的过程配置
- 配置完后会提示 cd 项目 => npm run serve 运行项目

项目开发完之后要打包，npm run build，打包好的资源在 dist 上

# 09-组件之间的通信

**父子组件之间通信**

- 父组件传递给子组件：通过props属性，
- 子组件传递给父组件：通过$emit触发事件

## 父传子

1. 在父组建 App 标签上，绑定自定义属性

```vue
<template>
  <div>
<!--     自定义属性名 绑定的数据-->
    <Child1 :money="money" :car="car"></Child1>
  </div>
</template

<script>
import Child1 from "./components/Child1.vue"
...
```

2. 在子组件中，通过props来接受数据

```vue
<template>
  <div>
    <p>收到父的money -- {{money}}</p>
    <p>收到父的car -- {{car}}</p>
  </div>
</template>

<script>
export default {
  name: 'Child1', //子组件名
  props: ["money","car"],// 接收到的数据
  data() {
    return {}
  },
  methods: {}
}
</script>
```

**子组件修改父组件传来的数据方法**

1. 直接在子组件的methods里定义方法通过this修改会发出警告，不建议这样做

虽然能够修改，也能让模板重新渲染

```
  methods: {
    updateMoney() {
      this.money = 200;// 控制台发出警告
    }
  }
```

但是在vue的调试工具里，父组件里面的money没有改变，这样改vue调试工具跟踪不到数据变化，

2. 把修改数据的方法定义在父组件里，子组件要修改，通过事件去调用父的方法

父组件中

```vue
<template>
  <div id="app">
    <Child1 :money="money" :car="car" :changeMoney="changeMoney"></Child1>
  </div>
</template>

<script>
import Child1 from "./components/Child1.vue"

export default {
  name: 'App',
  data() {
    return {
      money: 1000000,
      car:"兰博基尼"
    };
  },
  methods: {
    changeMoney() {
      this.money = 2000;
    }}
```

子组件中

```vue
<script>
export default {
  name: 'Child1',
  props: ["money", "car","changeMoney","changeCar"],
  data() {
    return {}
  },
  methods: {
    updateMoney() {
      this.changeMoney();
    }
  }
}
</script>
```

**props接收父组件数据的两种方式**

1. ```vue
   props: ["money", "car","changeMoney","changeCar"],
   ```

   

2. ```vue
       props: {
           msg: {
               // 可以对数据进行校验
               type: String,// 不符合条件会警告
               default: "我有1000个小目标" // 指定默认值
               // required:true,// 当你使用这个组件时，必须给他传递数据，不传就警告
           }
       }
   ```

## 自定义指令

**自定义指令分为两种**

- 自定义局部指令：组件中通过 directives 选项，这个指令只能在当前组件中使用

```vue
<template>
    <div>
        <h1>{{msg1}}</h1>
        <h1 v-bar="msg2"></h1>
    </div>
</template>

<script>
export default {
    name: 'MyOrder1',
    props: [],
    data() {
        return {
            msg1: "掉落了一把无影剑",
            msg2: "网络异常"
        }
    },
    methods: {},
    directives: {
        // 自定义指令，也是写成函数的形式，以v-开头
        bar(element, options) {
            // element是当前绑定指令的真实DOM节点
            // options表示一个对象对象，是当前指令一些配置项参数
            console.log(element);
            console.log(options);
            element.innerHTML =options.value;
        }
    }
}
</script>
```



- 自定义全局指令：app的 directive 方法，定义在main.js中，可以在任意组件中被使用

```js
// 自定义全局指令
// 第一个参数，自定义组件的名字，定义时不需要加v-
// 第二个参数 是一个回调函数

Vue.directive("global", (element, options) => {
  element.innerHTML = options.value + "，请重新连接";
})

// 配置钩函数  会在合适的时机，自动调用
// inserted 当被绑定的元素插入到 DOM 中时 触发
// v-focus 直接加上就行    <h1 v-focus>{{msg1}}</h1>
Vue.directive("focus", {
  inserted(element) {
    console.log(element);
    element.focus();// 自动获取焦点
  }
})
```

## 过滤器

**Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。**

- 过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示

过滤器用的地方： 

- 双花括号插值

-  v-bind 表达式 (从 2.1.0+ 开始支持)

**局部过滤器案例**

实现时间戳的格式化

moment 需要在控制台 npm i moment

```vue
<template>
  <div>
    <h1>{{time | timeFormat }}</h1>
  </div>
</template>

<script>
// 引入 moment,它是专门用来处理时间的 
import moment from "moment";
export default {
  name: 'MyOrder2',
  props: [],
  data() {
    return {
      time: Date.now()
    }
  },
  methods: {},
  // 在filter选项中，可以配置局部过滤器
  filters: {
    timeFormat(data) {
      console.log(data);
      let newData = moment(data).format("YYYY-MM-DD");
      console.log(newData);
      return newData;
    }
  }
}
</script>
```

**全局过滤器**

在main.js中

```js
import moment from "moment"

Vue.filter("timeFormat2", (val) => {
  return moment(val).format("YYYY-MM-DD")
})
```

app组件里用就行了

```
    <h1>{{time2 | timeFormat2}}</h1>
```

## 自定义插件

**插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：**

- 添加全局方法或者 属性。
- 添加全局资源：指令/过滤器/过渡等。如 vue-touch
- 添加全局组件
- 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
- 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

首先在项目下面新建一个plugins文件夹，创建一个myplugins.js

然后在里面写代码

```js
import moment from "moment"
// plugins对象，叫插件对象
let plugins = {
    // vue规定，一个插件对象身上，必须要有install方法
    // 当Vue.use时，内部会自动执行indtall方法
    install(Vue, options) {
        // 第一个参数是Vue构造函数  
        // 第二个参数是Vue.use时，传递的第二个参数
        // console.log(Vue);
        // console.log(options);

        // 把自定义指令封装到一个插件中
        Vue.directive("upper", (element, options) => {
            element.innerHTML = options.value.toUpperCase();
        })

        // 把过滤器封装到插件中
        Vue.filter("timeFormat", (val) => {
            return moment(val).format("MM-DD")
        })

        // 还可以在Vue的原型对象上，添加公共的方法
        Vue.prototype.$wc = function () {
            alert("这是一只小狗，叫wc")
        }

        // 注册全局组件
        Vue.component("Count", {
            data() {
                return {}
            },
            methods: {},
            // render函数后面说
            render: function (createElement) {
                return createElement(
                    'h1',
                    {},
                    "我是Count组件"
                )
            },
        })

        // 后面会讲两个非常重要的插件，vue-router   vuex
    }
}

// 对外暴露插件  为了让别的模块去使用插件
export default plugins;
```

然后去main.js里导入插件

```
// 导入插件
import myplugins from "../plugins/myplugins"
Vue.use(myplugins, { name: "upper" })
```

最后使用就是正常该怎么用怎么用

## 插槽



## 子传父

**子传父的步骤**

- 在子组件中定义好在某些情况下触发的事件名称

- 在父组件中以@的方式传入要监听的事件名称，并且绑定到对应的方法中

- 在子组件中发生某个事件的时候，根据事件名称触发对应的事件

子组件Son

```vue
<template>
    <div>
        <h1>子组件</h1>
        <button @click="handler">点我触发自定义事件</button>
    </div>
</template>

<script>
export default {
    name: '',
    props: [],
    data() {
        return {
            money: 10000,
            car:"宝宝巴士"
        }
    },
    methods: {
        handler() {
            this.$emit("wc", this.car);
            this.$emit("xq",this.money)
        }
    }
}
</script>

<style scoped lang="less">
</style>
```

app组件

```vue
<template>
  <div id="app">
    <h1>父组件</h1>
    <hr>
    <Son @wc="bar" @xq="bar"></Son>
  </div>
</template>

<script>
import Son from './components/Son.vue'

export default {
  name: 'App',
  components: {
    Son
  },
   methods: {
    bar(val) {
      console.log(this);
      console.log("val:",val);
    }
  }
}
</script>

<style lang="less">
</style>
```

在app组件的方法里，也能修改app的数据

还有一种方法app组件里， mounted(){  } 里 通过this.$refs.cur 得到VC实例

```vue
<template>
  <div id="app">
    <h1>父组件</h1>
    <hr>
    <Son ref="car"></Son>
  </div>
</template>

<script>
import Son from './components/Son.vue'

export default {
  name: 'App',
  data() {
    return {
      money: 0,
      car: ""
    }
  },
  components: {
    Son
  }, mounted() {
    // console.log(this.$refs.cur); // 得到VC实例
    // 可以通过$on绑定自定义事件
    // 当xq事件发生了，触发监听器
    this.$refs.car.$on("xq", (val) => {
      // 谁触发了xq事件，就可以传递数据
      console.log("val:", val);
      this.money = val;
    })
  }
}
</script>
```

## 事件总线

$bus  值是一个vm   $on订阅   $emit发布

**兄弟组件之间的通信**

XiaoQiang组件

```vue
<template>
  <div>
    <h1>丈夫小强</h1>
    <button @click="$bus.$emit('maotai','一车茅台')">给小丽一车茅台</button>
  </div>
</template>

<script>
export default {
  name: ''
}
</script>

<style scoped lang="less">
</style>
```

XIaoLi组件

```vue
<template>
  <div>
    <h1>妻子小丽</h1>
  </div>
</template>

<script>
export default {
  name: '',
  props: [],
  mounted() {
    this.$bus.$on("maotai", val => {
      console.log("val:", val);
    })
  }
}
</script>

<style scoped lang="less">
</style>
```

App.vue

```vue
<template>
  <div id="app">
    <XiaoQiang></XiaoQiang>
    <hr>
    <XIaoLi></XIaoLi>
  </div>
</template>

<script>
import XiaoQiang from './components/XiaoQiang.vue'
import XIaoLi from './components/XIaoLi.vue';

export default {
  name: 'App',
  components: {
    XiaoQiang,
    XIaoLi
  }
}
</script>

<style lang="less">

</style>
```

main.js

```js
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// let $bus = new Vue(); // $buts就相当于是vm实例  通过$bus可以得到$on  $emit
// Vue.prototype.$bus = new Vue(); 

new Vue({
  beforeCreate() {
    // this表示vm
    // 配置全局事件总线,说白了，就是在Vue原型对象上添加$bus属性，值是vm
    // this是vm，不是vc,在组件里可以用this.$bus来拿到vm
    // 在$bus身上有，$on和$emit  $on可以用来接收数据   $emit可以用来发送数据
    Vue.prototype.$bus = this;
  },
  render: h => h(App),
}).$mount('#app')
```

**爷孙组件之间的通信**

TuTu组件

```vue
<template>
    <div>
        <span>图图--{{xianKa}}</span>
        <br>
        <!-- <button @click="$bus.$emit('money', money)">点击给爷爷100万</button> -->
        <button @click="clickHandler">点击给爷爷100万</button>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            money: "100万",
            xianKa:"1660"
        };
    },
    mounted() {
        console.log(this.$bus);
        this.$bus.$on("xianKa", (val) => {
            console.log("图图接收显卡:", val);
            this.xianKa = val;
        })
    },
    methods: {
        clickHandler() {
            this.$bus.$emit("money", this.money)
        }
    }
};
</script>

<style lang="less" scoped>
</style>
```

XIaoLi组件

```vue
<template>
  <div>
    <h1>妻子小丽</h1>
    <hr>
    <TuTu></TuTu>
  </div>
</template>

<script>
import TuTu from "./TuTu.vue"
export default {
  name: '',
  mounted() {
    this.$bus.$on("maotai", val => {
      console.log("val:", val);
    })
  },
  components: {
    TuTu
  }
}
</script>

<style scoped lang="less">
</style>
```

App组件

```vue
<template>
  <div id="app">
    <h1>app组件--牛爷爷--{{money}}元--{{xianKa}}</h1>
    <button @click="bar">点我给图图送显卡</button>
    <hr>
    <XIaoLi></XIaoLi>
  </div>
</template>

<script>
import XIaoLi from './components/XIaoLi.vue';

export default {
  name: 'App',
  data() {
    return {
      money: 0,
      xianKa: "9090ti战术核显卡"
    }
  },
  methods: {
    bar() {
      this.$bus.$emit('xianKa', this.xianKa);
    }
  },
  mounted() {
    this.$bus.$on("money", (val) => {
      console.log("牛爷爷接收money:", val);
      this.money = val
    })
  },
  components: {
    XIaoLi
  }
}
</script>

<style lang="less">
</style>
```

main.js跟上面一样

# 10-vuex状态管理

**Vue应用程序的状态(state)管理器。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。**

- 这个“状态”其实是“数据”。
- 如果你的项目中，需要用到在各个子组件中共享数据，则你就需要用到vuex

**vuex示例**

1. 引入vue.js 和 vue.js

2. 实例化vuex中的store对象
3. 注入到Vue实例中
4. 定义两个组件并在App中使用它
5. 使用store中的数据

- 一旦你在vue的实例中注入了store，则在所有的子组件及 vue的实例中，你都可以通过：this.$store.state. 数据名 去获取数据

**你可以有两种方法去使用数据**

- 获取：this.$store.state. 数据名
- 修改：在组件内部通过this.$commit方法触发事件，执行mutations当中的对应的方法

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://unpkg.com/vuex@2.0.0"></script>
</head>

<body>
    <div class="app">
        <h1>App组件</h1>
        <p>在App组件中使用仓库中的状态：{{$store.state.counter}}</p>
        <hr>
        <add-counter></add-counter>
        <hr>
        <sub-counter></sub-counter>
    </div>

    <script>
        let store = new Vuex.Store({
            // 开启严格模式
            strict: true,
            state: {
                counter: 0
            },
            // 修改状态的唯一途径是mutation
            // 一个mutation是一个函数
            mutations: {
                // 每一个mutation的第1个参数都是state
                add(state, number) {
                    state.counter += number
                },
                sub(state) {
                    state.counter--
                }
            },
            // 放异步代码，如发ajax请求
            actions: {

            },
            // 类似于之前学习的计算属性
            // 根据上面state中的状态，计算出一个新的状态
            getters: {

            }
        })


        // 定义一个AddCounter组件
        let AddCounter = Vue.extend({
            template: `
                <div>
                    <p>我AddCounter组件</p>  
                    <p>使用仓库中的状态：{{$store.state.counter}}</p>
                    <button @click="add">加1</button>  
                </div>
            `,
            methods: {
                add() {
                    // 暴力修改仓库中的状态
                    // 极力不推荐，因为状态就不好追踪了
                    // this.$store.state.counter++

                    // 通过commit一个mutation去修改状态
                    // mutation是修改状态的唯一途径
                    this.$store.commit("add", 100)
                }
            }
        })

        // 定义一个SubCounter组件
        let SubCounter = Vue.extend({
            template: `
                <div>
                    <p>我SubCounter组件</p>  
                    <p>使用仓库中的状态：{{$store.state.counter}}</p>   
                    <button @click="sub">减1</button>  
                </div>
            `,
            methods: {
                sub() {
                    this.$store.commit("sub")
                }
            }
        })

        // vuex本质是一个插件，需要挂载到根组件上
        // 就意味着所有的子组件都可以使用仓库了
        let vm = new Vue({
            el: ".app",
            store,
            data() {
                return {
                    name: "码路教育"
                }
            },
            components: {
                AddCounter,
                SubCounter
            }
        });
    </script>
</body>
</html>
```

# 11-过渡动画



# 12-vue的生命周期

new一个Vue实例=》初始化数据=》编译模板=》挂在DOM=》渲染-更新-渲染=》销毁Vue实例

在vue的生命周期里，有八个生命周期函数，也叫钩子函数

beforeCreate // 此时data和methods里的数据还没有初始化,只会执行一次

created // data和methods里的数据初始化完毕,只会执行一次

beforeMount // 模板在内存中编译完毕，还未挂载,只会执行一次

mounted // 挂载完毕，可以获取DOM元素,只会执行一次

beforeUpdate // 每当响应式数据发生了变化，触发一次

updated // 每当更新界面会触发一次,不能再updated中更新数据，会导致死循环

 beforeDestroy // vm销毁之前

 destroyed // vm销毁完毕

**销毁后，并不是说界面看不见了，vm实例还可以访问，但是它不工作了！！！！**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vue的生命周期</title>
    <script src="../node_modules/vue/dist/vue.js"></script>
</head>

<body>
    <div id="app">
        <button @click="minus">减一</button>
        <span ref="cur">{{number}}</span>
        <button @click="add">加一</button>
        <br>
        <button @click="destroy">销毁vm</button>
    </div>
</body>
<script>
    let vm = new Vue({
        el: "#app",
        data() {
            return {
                number: 11
            }
        },
        methods: {
            add() {
                this.number++;
            },
            minus() {
                this.number--;
            },
            destroy() {
                this.$destroy();
            }
        },
        beforeCreate() {
            // 啥也干不了，项目中没什么用
            console.log("beforeCreate:", this.number);
        },
        created() {
            // 可以获取vm的属性和方法，
            // 在项目中发送ajax请求
            console.log("created:", this.number);
        },
        beforeMount() {
            // 获取不了真实DOM
            console.log("beforeMount:", this.$refs.cur);
        },
        mounted() {
            console.log("mounted:", this.$refs.cur);
        },
        beforeUpdate() {
            console.log("beforeUpdate:", this.$refs.cur.innerText, this.$refs.cur, this.number);
        },
        updated() {
            console.log("updated:", this.$refs.cur.innerText, this.$refs.cur, this.number);
        },
        beforeDestroy(){
            console.log("destroy:",this.number);
        },
        destroyed(){
            console.log("destroyed:",this.number, this.$refs.cur);
        }
    });
</script>
</html>
```



# 12-路由

## 原生JS路由简介

**前端路由的实现方案？**

- 前端路由的核心是：改变URL，但是页面不进行整体的刷新
- URL的hash 

```
http://127.0.0.1:5500/01-hash优势.html#/home
hash变了，切换组件
```

- HTML5的History

```
http://127.0.0.1:5500/01-hash优势.html/login
和后端的接口一样，访问不同的url实现组件切换，需要后端配置，不然得到404
```

**URL的hash**

- URL的hash也就是锚点(#), 本质上是改变window.location的href属性
- 我们可以通过直接赋值location.hash来改变href, 但是页面不发生刷新
- hash的优势就是兼容性更好，在老版IE中都可以运行，但是缺陷是有一个#，显得不像一个真实的路径

**用原生JS模拟路由**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <a href="#/home">home</a>
        <a href="#/about">about</a>
        <div class="router-view">路由出口</div>
    </div>
    <!-- 原生JS模拟vue中的hash路由 -->
    <script>
        // 1,获取router-view
        const routerViewEl = document.querySelector(".router-view");
        // 2, 监听hashchange，hash变化触发这个事件
        window.addEventListener("hashchange", () => {
            switch (location.hash) { // 设置或返回从井号 (#) 开始的 URL（锚）
                case "#/home":
                    routerViewEl.innerHTML = "home";
                    break;
                case "#/about":
                    routerViewEl.innerHTML = "about";
                    break;
                default:
                    routerViewEl.innerHTML = "404";
            }
        })
    </script>
</body>

</html>
```

**HTML5的History(history接口是HTML5新增的, 它有六种模式改变URL而不刷新页面)**

- replaceState：替换原来的路径
- pushState：使用新的路径
- popState：路径的回退
- go：向前或向后改变路径
- forward：向前改变路径
- back：向后改变路径

## vue-router简介

**目前前端流行的三大框架, 都有自己的路由实现**

- Angular的ngRouter
- React的ReactRouter
- Vue的vue-router

**Vue Router 是 Vue.js 的官方路由**

- 它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用（SPA）变得非常容易
- 路由用于设定访问路径, 将路径和组件映射起来
- 在vue-router的单页面应用中, 页面的路径的改变就是组件的切换
- 安装Vue Router：npm install vue-router@3.5.3

**路由的使用步骤**

- 第一步：创建路由需要映射的组件（打算显示的页面）
- 第二步：通过new VueRouter创建路由对象，并且传入routes和history模式
  - 安装插件 Vue.use(VueRouter);
  - 配置路由映射: 组件和路径映射关系的routes数组
  - 创建基于hash或者history的模式
- 第三步：通过 router 配置参数注入路由，从而让整个应用都有路由功能
- 第四步：路由使用: 通过router-link和router-view

正常情况下，组件切换后之前的组件就死了，把这个组件用keep-alive标签包住，可以让它切换组件后也

存活

```
<keep-alive>
	<router-link to="/home">Home</router-link>
</keep-alive>
```

    // 使用路由，需要知道4个知识点
    //     1）<router-view />  路由出口
    //     2）<router-link />  a标签   点击跳转
    //     3）$router  对象  有一堆的方法  挂载到当前组件实例上  this
    //     4）$route   对象  有一堆的属性  挂载到当前组件实例上  this
router/index.js

```js
//配置路由
//引入vue-router插件:经过打印查看,引入进来的VueRouter构造函数

import VueRouter from 'vue-router';
import Vue from 'vue';
//安装插件
Vue.use(VueRouter);
//引入路由组件
import Home from '../components/Home.vue';
import About from '../components/About.vue';

//配置项目的路由
//通过VueRouter【路由器】类,创建了一个VueRouter类的一个实例！！！
//对外暴露
export default new VueRouter({
    mode: 'history',
    routes: [{
        // path配置的是根路径: /
        path: "/",
        // redirect是重定向, 也就是我们将根路径重定向到/home的路径下, 这样就可以得到我们想要的结果了
        redirect: "/home"
    }, {
        //path设置路由的K,path有的属性值务必都是小写的
        path: "/home",
        //component设置路由的V,一个K对应一个V
        component: Home,
    }, {
        path: '/about',
        component: About
    },
    ]
});
```

main.js

```js
import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

```

About.vue

```vue
<template>
  <div>
    <h1>About组件</h1>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped lang="less">
</style>
```

Home.vue

```vue
<template>
  <div>
    <h1>Home组件</h1>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="less">
</style>
```

App.vue

```vue
<template>
  <div id="app">
    <!-- router-link 当成a标签 -->
    <router-link to="/home">Home</router-link>
    <br>
    <router-link to="/about" >About</router-link>
    <!-- 路由的出口 -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}

</script>
<style lang="less">

</style>
```

**router-link属性**

- to属性: 是一个字符串，或者是一个对象
- replace属性：设置 replace 属性的话，当点击时，会调用 router.replace()，而不是 router.push()；
- active-class属性：设置激活a元素后应用的class，默认是router-link-active
- exact属性：精确匹配模式

## 路由的懒加载

**当打包构建应用时，JavaScript 包会变得非常大，影响页面加载：**

- 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样会更加高效
- 可以提高首屏的渲染效率
- Vue Router默认支持动态来导入组件
- 因为component可以传入一个组件，也可以接收一个函数，该函数需要放回一个Promise，而import函数就是返回一个Promise
- 分包是没有一个很明确的名称的，webpack从3.x开始支持对分包进行命名（chunk name）

router/index.js 其余的正常写

```js
import VueRouter from 'vue-router';
import Vue from 'vue';
//安装插件
Vue.use(VueRouter);
//引入路由组件

// 懒加载：当路径匹配到了，再去加载组件
// 首页面是直接加载的
// 对于About组件来说，点击about连接，匹配对应的路径时，在进行加载About组件
// 通过import函数实现懒加载
import Home from '../components/Home.vue';

export default new VueRouter({
    mode: "history",
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: Home },
        { path: "/about", component: () => import("../components/About.vue") }
    ]
});
```



## 路由其他属性

- name属性：路由记录独一无二的名称；
- meta属性：自定义的数据

```
import VueRouter from 'vue-router';
import Vue from 'vue';
//安装插件
Vue.use(VueRouter);

// 懒加载：当路径匹配到了，再去加载组件
// 首页面是直接加载的
// 对于About组件来说，点击about连接，匹配对应的路径时，在进行加载About组件
// 通过import函数实现懒加载
import Home from '../components/Home.vue';

export default new VueRouter({
    mode: "history",
    routes: [
        {
    path: "/",
    redirect: "/home"
}, {
    path: "/home",
 	component: Home,
    name:"home"
}, {
    path: '/about',
    component: () => import("../components/About.vue"),
    name:"about",
    meta:{
        name:"wc",
        age:18
    }
}
    ]
});

```

## 嵌套路由和404组件

- 我们匹配的Home、About等都属于第一级路由，我们在它们之间可以来回进行切换
- Home页面本身，也可能会在多个组件之间来回切换
  - 比如Home中包括Cart、Mine，它们可以在Home内部来回切换
  - 这个时候我们就需要使用嵌套路由，在Home中也使用 router-view 来占位之后需要渲染的组件

**404组件**

- 对于哪些没有匹配到的路由，我们通常会匹配到固定的某个页面
- 在路由规则最后面配置：{ path:"*", component:NotFount },

router/index.js

```
import VueRouter from 'vue-router';
import Vue from 'vue';
//安装插件
Vue.use(VueRouter);
//引入路由组件
import Home from '../components/Home.vue';
import Car from '../components/Car.vue';
import NotFound from '../components/NotFound.vue';

let routes = [
    { path: "/", redirect: "/home" },
    {
        path: "/home",
        component: Home,
        children: [
            // { path: "/home", redirect: "/home/car" },
            { path: "car", component: Car },
            { path: "/home/mine", component: () => import("../components/Mine") },
        ]
    },
    { path: "/about", component: () => import("../components/About") },
    { path: "*", component: NotFound },
];

let router = new VueRouter({
    // hash路由有一个特点，就是#
    mode: "history", // hash路由
    routes
})
export default router;
```

Home组件

```
<template>
  <div>
    <h1>Home组件</h1>
    <!-- car组件和mine组件都是Home组件的子组件，要在这引入出口 -->
    <router-link to="/home/car">Car</router-link>&nbsp;&nbsp;
    <router-link to="/home/mine">我的</router-link>&nbsp;&nbsp;
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="less">

</style>

```

其余组件跟之前一样

## 动态路由基本匹配

**很多时候我们需要将给定匹配模式的路由映射到同一个组件**

- 例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但是用户的ID是不同的；
- 在Vue Router中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数；

**获取动态路由的值**

- 在template中，直接通过 $route.params获取值
- 在created中，通过 this.$route.params获取值

router/index.js

```js
import VueRouter from "vue-router";
import Vue from "vue";

import Home from "../components/Home"
import About from "../components/About"
import Mine from "../components/Mine"
import NotFount from "../components/NotFount"

Vue.use(VueRouter);

let routes = [
    { path:"/", redirect:"/home" },
    { path:"/home", component:Home },
    { path:"/about", component:About },
    { path:"/mine/:name/:age/:address", component:Mine },
    { path:"*", component:NotFount },
];

let router = new VueRouter({
    // hash带#    
    // history不带#
    mode:"history",
    routes
})

export default router;
```

App.vue

```
<template>
  <div id="app">
    <router-link to="/mine/wc/18/bj">我的</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">

</style>
```

Mine.vue

```
// Mine.vue
<template>
    <div>
        <h2>Mine -- {{ name }}</h2>
        <h2>Mine -- {{ age }}</h2>
        <h2>Mine -- {{ address }}</h2>
    </div>
</template>

<script>
export default {
    // 需要获取动态路由参数

    data() {
        return {
            name: "",
            age: "",
            address: "",
        }
    },
    // 生命周期函数（钩子函数）
    created() {
        // 获取动态路由参数  
        console.log(this.$route);
        console.log(this.$route.params.name);

        this.name = this.$route.params.name
        this.age = this.$route.params.age
        this.address = this.$route.params.address
    }

}
</script>

<style>

</style>
```

## 代码的页面跳转

**有时候我们希望通过代码来完成页面的跳转，比如点击的是一个按钮**

前进进栈  回退出栈 

- 此时，我们可以使用编程式路由
- this.$router.push("/about")
- 当然，我们也可以传入一个对象，对象形式可以传参
  - this.$router.push({path:"/about"})
  - this.$router.push({name:"about"})

**query方式的参数**

- this.$router.push({path:"/about",query:{name:"wc",age:18}})
- 在界面中通过 $route.query 来获取参数

**params方式的参数**

- this.$router.push({path:"/about",params:{ address:"bj" }})
- 在界面中通过 $route.params 来获取参数

**页面的前进后退**

- router的go方法：
  - router.go(1) 向前移动一条记录，与router.forword()相同 前进
  - router.go(-1) 向后移动一条记录，与router.back()相同
  - router.go(3) 前进3条记录
  - router.go(100) 如果没有那么多记录，静默失败
  - router.go(-100) 如果没有那么多记录，静默失败
- 通过调用 history.back() 回溯历史。相当于 router.go(-1)
- 通过调用 history.forward() 在历史中前进。相当于 router.go(1)

router/index.js

```js
import VueRouter from "vue-router";
import Vue from "vue";

import Home from "../components/Home"
import About from "../components/About"
import Mine from "../components/Mine"
import NotFount from "../components/NotFount"

Vue.use(VueRouter);

let routes = [
    { path: "/", redirect: "/home" },
    { path: "/home", name: "home", component: Home },
    { path: "/about", name: "about", component: About },
    { path: "/mine", name: "mine", component: Mine },
    { path: "*", component: NotFount },
];

let router = new VueRouter({
    // hash带#    
    // history不带#
    mode: "history",
    routes
})

export default router;
```

Home组件

```vue
<template>
  <div>
    <h2>Home</h2>
    <button @click="toAbout">去about</button>
    <button @click="forward">forward</button>
  </div>
</template>

<script>
export default {
  methods: {
    toAbout() {
      // 实现跳转到about
      // this上有route  还有router
      // route上有一堆的属性
      // router上有一堆方法
      // 跳转方式一：
      // this.$router.push("/about")

      // 跳转方式二：
      // this.$router.push({ path:"/about" })

      // 跳转方式三：
      // this.$router.push({ name:"about" })

      // 跳转传参方式一：
      // this.$router.push({ name:"about", params:{ address:"bj" } })
	  
      // path传参需要动态跳转配合 this.$router.push({ path:"/about/bj"})
      // router/index.js组件中 { path: "/about/:address", name: "about", component: About },
        
      // 跳转传参方式二：
      this.$router.push({ name: "about", query: { score: "100分" } })		
      // 这里pathquery传参跟name一样，只用换成 path: "/about"
        
      // replace
      // this.$router.replace({ name:"about", query:{ score:"100分" } })
    },

    forward() {
      this.$router.forward()
      // this.$router.go(1)  // go(1) 等价于 forward
    }
  },
};
</script>

<style>

</style>
```

About组件

```vue
<template>
  <div>
      <h2>About</h2>
      <!-- <p>{{ $route.params.address }}</p> -->
      <p>{{ $route.query.score }}</p>
      <button @click="back">back</button>
  </div>
</template>

<script>
export default {
  // 4个东西：两个组件   两个对象route  rotuer
  created(){
    console.log(this.$route);
    // console.log(this.$route.params.address);

    console.log(this.$route.query.score);
  },
  methods:{
    back(){
      // this.$router.back();
      this.$router.go(-1); // go(-1) 等价于 back
    }
  }
}
</script>
<style>
</style>
```

其余组件跟之前一样

## 路由导航守卫

**vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航**

**全局的前置守卫beforeEach是在导航触发时会被回调的：**

- to：即将进入的路由Route对象
- from：即将离开的路由Route对象
- next: 在Vue2中我们是通过next函数来决定如何进行跳转的，是在Vue3中我们是通过返回值来控制的，不再推荐使用next函数，这是因为开发中很容易调用多次next；

只有 next() 是放行，其他的诸如：next('/logon') 、 next(to) 或者 next({ ...to, replace: true }) 都不是放行，而是：中断当前导航，执行新的导航，执行括号里的导航

VUE中的中断就是此时不会执行此次操作

router/index.js

```js
import VueRouter from "vue-router";
import Vue from "vue";

import Home from "../components/Home"
import About from "../components/About"
import Mine from "../components/Mine"
import Login from "../components/Login"
import NotFount from "../components/NotFount"

Vue.use(VueRouter);

let routes = [
    { path: "/", redirect: "/home" },
    { path: "/home", name: "home", component: Home },
    { path: "/about", name: "about", component: About },
    { path: "/mine", name: "mine", component: Mine },
    { path: "/login", name: "login", component: Login },
    { path: "*", component: NotFount },
];

let router = new VueRouter({
    // hash带#    
    // history不带#
    mode: "history",
    routes
})

// 配置全局路由守卫
// to表示去哪
// from表示从哪里来
// next表示是否放行  放行到哪里
router.beforeEach((to, from, next) => {
    console.log("from:",from);
    console.log("to:", to);
    console.log(next);
    if (to.path !== "/login") {
        // 去的地方不是/login
        // 只有登录了，才能去/home /about /mine
        if (window.isLogin) {
            // 表示已登录
            next();
        } else {
            return next("/login");
        }
    }
    next();
});

export default router;
```

Home About Mine NotFount组件都一样

```vue
// Mine.vue
<template>
    <div>
        <h2>Mine</h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
}
</script>

<style>
</style>
```

Login.vue

```vue
<template>
  <div>
      <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
    methods:{
        login(){
            // 给GO上放一个isLogin是true
            window.isLogin = true;
        }
    }
}
</script>

<style>

</style>
```

App.vue 跟之前一样

```vue
<template>
  <div id="app">
    <router-link to="/home" active-class="active">home</router-link> &nbsp;
    <router-link to="/about" active-class="active">about</router-link> &nbsp;
    <router-link to="/mine" active-class="active">mine</router-link> &nbsp;
    <hr>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
.active{
  color: red;
}
</style>
```

# 13-插槽slot

插槽就是子组件中的提供给父组件使用的一个占位符，用<slot></slot> 表示，父组件可以在这个占位符中填充任何模板代码，如 HTML、组件等，填充的内容会替换子组件的<slot></slot>标签。

**插槽的作用**

让我们的组件更加灵活更加强大

## 匿名插槽

slot没有起名字就是匿名插槽

app组件

```vue
<template>
  <div id="app">
    <h1>APP组件</h1>
    <UserSlot></UserSlot>
  </div>
</template>

<script>
import UserSlot from './views/UserSlot.vue'

export default {
  name: 'App',
  components: {
    UserSlot
  }
}
</script>

<style lang="less">

</style>
```

views/UserSlot

```vue
<template>
    <div>
        <h1>UserSlot组件</h1>
        <-- panel里的内容 会替换掉slot里的内容 插入到插槽slot里 -->
        <panel>OK</panel>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue'

export default {
  components: { Panel },
    name: 'UserSlot',
    props: [],
    data() {
        return {}
    }
}
</script>

<style scoped lang="less">
</style>
```

components/Panel

```vue
<template>
    <div>
        <h1>Panel插槽组件</h1>
        <!-- 按钮 -->
        <span @click="isShow = !isShow"> {{
        isShow? "收起" : "展开"
        }}</span>
        <!-- 展示内容 slot没有起名字就是匿名插槽,插槽可以有多个 -->
        <div v-show="isShow" >
            <slot>展开后的内容</slot>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: [],
    data() {
        return {
            isShow: false
        }
    }
}
</script>

<style scoped lang="less">
</style>
```

## 具名插槽

1. 在使用slot时，通过name给它起个名字

2. 在使用组件，像插槽中插入内容时，就需要指定名字

3. 需要v-show配合template标签

```
        <panel>
            <template v-slot:header>
                <p>德玛西亚</p>
            </template>

		// v-slot:可以同#代替
            <template #footer>
            	<p>蓝色妖姬</p>
            </template>
        </panel>
```

components/Panel

```vue
<template>
    <div>
        <h1>Panel插槽组件</h1>
        <!-- 按钮 -->
        <span @click="isShow = !isShow"> {{isShow? "收起" : "展开"}}</span>
        <!-- 展示内容 -->
        <div v-show="isShow">
            <slot name="header"></slot>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: [],
    data() {
        return {
            isShow: false
        }
    }
}
</script>

<style scoped lang="less">
</style>
```



## 作用域插槽

使用插槽时，使用组件内定义的数据

使用步骤

1. slot标签上，自定义属性和组件内数据进行关联

2. 使用组件，template标签上使用 v-slot="自定义属性名"

app组件

```vue
<template>
  <div id="app">
    <h1>APP组件</h1>
    <UserSlot></UserSlot>
  </div>
</template>

<script>
import UserSlot from './views/UserSlot.vue'

export default {
  name: 'App',
  components: {
    UserSlot
  }
}
</script>

<style lang="less">
</style>
```

views/UserSlot

```vue
<template>
    <div>
        <h1>UserSlot组件</h1>
        <hr>
        <panel>
            <template v-slot="b">
                <p>{{b.a.name1}}</p>
                <p>{{b.a.name2}}</p>
            </template>
        </panel>
    </div>
</template>

<script>
import Panel from '../components/Panel.vue'

export default {
    components: { Panel },
    name: 'UserSlot',
    props: [],
    data() {
        return {
        }
    }
}
</script>

<style scoped lang="less">
</style>
```

components/Panel

```
<template>
    <div>
        <h1>Panel插槽组件</h1>
        <!-- 按钮 -->
        <span @click="isShow = !isShow"> {{isShow? "收起" : "展开"}}</span>
        <!-- 展示内容 -->
        <div v-show="isShow">
            <slot :a="obj">默认显示内容</slot>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: [],
    data() {
        return {
            isShow: false,
            obj: {
                name1: "吊毛",
                name2: "靓仔"
            }
        }
    }
}
</script>

<style scoped lang="less">
</style>
```

作用域插槽

# 14-vant组件库