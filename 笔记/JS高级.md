# 01-EC 与 ScopeChain

## 什么是预解析

**代码段是指一个script标签就是一个代码段。JS代码在执行时，是一个代码段一个代码段执行。**

```html
<!-- 代码段是彼此独立的，上面的代码段报错了，不会影响下面的代码段 -->
<!-- 1个script标签就是一个代码段 -->
<script>
    // 在一个代码段中就可以写JS代码
    var a = 110;

    // 上面代码段不能使用下面的代码段中定义的数据
    console.log(b); // ReferenceError: b is not defined
</script>
<!-- 一个网页中可以有多个代码段 -->
<script>
    var b = 220;
    // 可以在下面的代码段中使用上面的代码段中的数据
    console.log(a);
</script>
```

**JS代码的执行分两个阶段：一个叫预解析，一个叫执行，预解析结束后，才会进入到执行阶段。**

**什么是预解析?**

- 浏览器在执行JS代码的时候会分成两部分操作：预解析以及逐行执行代码
- 也就是说浏览器不会直接执行代码, 而是加工处理之后再执行,
- 这个加工处理的过程, 我们就称之为预解析

**预编译期间做了什么？**

- 把声明提升：加var的变量就是被提升，function声明的函数也会提升，提升到代码段的最前面。
- 函数内部的局部变量，提升到函数体的最前面。
- 注意：变量的提升仅仅是声明 函数的提升不只提升了声明，也提升函数体

但是

- 现在的浏览器，如谷歌，如果一个函数出现在if条件语句中，提升时，只会提升函数名，不会提升函数体，也就是说，仅仅是把fn函数名提升了，函数体没有提升，fn提升后，值是und

## 执行上下文和作用域链

**内存分区:**

- 我们只需要掌握两个区，一个是栈区，一个是堆区。
- 基本数据类型，是存储在栈区的，引用数据类型是存储在堆区，堆区的地址，还是保存在栈区

### 全局代码和函数代码中产生的EC

**JS代码分两类：**

- 全局代码：函数外面的代码都是全局代码
- 函数代码：一个函数就是一个局部代码

```html
<script>
    // 函数外面的就是全局代码
    var a = 1;
    var b = 2;
    function fn(){
        // 函数里面的是局部代码
        var c = 3;
        var d = 4;
    }
    fn()
    fn()
</script>
```

**分析如下:**

- 全局代码执行产生ECG（Execution Context Gloable），每当调用一个函数，就产生一个函数的EC。每产生一个EC，需要放到ECS（Execution Context Stack），当函数调用完毕，这个EC就是出栈，出栈后的EC，会被销毁，所谓的销毁指是它们分配的内存空间都要被释放掉。

**总结：**

- 当全局代码执行时，就会产生一个全局的执行上下文，EC(G);
- 当函数代码执行时，就会产生一个局部的执行上下文，EC(Fn)。只要调用一个函数，就会产生一个局部执行上下文。调用100个函数，就会产生100个执行上下文。

**执行上下文栈：**

- js引擎内部有一个执行上下文栈（Execution Context Stack，简称ECS），它是用于执行代码的调用栈。
- Execute Context Stack ===> ECS

**代码执行流程如下：**

- JS在执行代码时，肯定先执行全局代码，就会产生EC(G)，这个EC(G)就要入栈。当我们调用一个函数，就会产生一个局部的执行上下文，此时这个局部的执行上下文也要入栈。当函数调用完毕后，这个EC就要出栈，又进入EC(G)，当全局代码执行完后，EC(G)也要出栈。

**执行上下文的作用：**

- 提供数据，全局代码，肯定需要去全局的执行上下文中找数据。

### 全局代码和函数代码中产生的EC

**js引擎会在执行代码之前，会在堆内存中创建一个全局对象：Global Object（GO）**

- 该对象 所有的作用域（scope）都可以访问；
- 里面会包含Date、Array、String、Number、setTimeout、setInterval等等；
- 其中还有一个window属性指向自己；说白了，GO就是window
- 只要我们写的全局变量或在全局中写的函数，都会挂载到window上面

**代码如下：**

```html
<script>
    console.log(window); // GO

    var a = 110;
    var b = 666;
    var res = a+b;
    function fn(){
        console.log("fn...");
    }

    console.log(window.a);
    console.log(window.b);
    window.fn()

    // 代码开始执行之前，JS引擎会帮我们创建一个全局对象，叫GO
    // 换句话，说到window，指的就是GO
    // GO中还需要放我们创建出来的全局变量和全局函数
    var globalObject = {
        String:"类",
        Data:"类",
        setTimeout:"函数",
        alert:"函数",
        // ....
        window:globalObject, // GO中有一个特殊的属性，叫window  window还是指向GO
        a:und,
        b:und,
        res:und,
        fn:"函数"
    };
</script>
```

```html
<script>
    var n = 110;
    console.log(n);  // 110
    console.log(window.n)  // 110

    m = 220;
    console.log(m);  // 220
    console.log(window.m);  // 220 m可以放到GO中，因为是全局变量

    console.log(window.name);  // 人家给GO中放了一个name, 现在是空串
    console.log(window.x);  // 访问对象中不存在的属性，结果是Und
</script>
```

**ECG被放入到ECS中里面包含两部分内容：**

- 第一部分：在代码执行前，在parser转成AST的过程中，会将全局定义的变量、函数等加入到GlobalObject中，但是并不会赋值；这个过程也称之为变量的作用域提升（hoisting）
- 第二部分：在代码执行中，对变量赋值，或者执行其他的函数；

**遇到函数如何执行？**

- 在执行的过程中执行到一个函数时，就会根据函数体创建一个函数执行上下文（Functional Execution Context，简称FEC），并且压入到EC Stack中。

```html
<script>
    var a = 1;
    var b = 2;
    var res = a+b;
    console.log(res);

    function fn(){
        console.log("我是fn函数....");
    }
    // 当调用函数时，就会产生一个EC(fn)
    fn();
</script>
```

**ECF中包含三部分内容：**

- 第一部分：在解析函数成为AST树结构时，会创建一个Activation Object（AO）： AO中包含形参、arguments、函数定义和指向函数对象、定义的变量；
- 第二部分：作用域链：由VO（在函数中就是AO对象）和父级VO组成，查找时会一层层查找；
- 第三部分：this绑定的值：这个我们后续会详细解析；

# 02-深入变量与闭包

## let 关键字

- let声明的变量只在所处的块级有效

  { }只在大括号里有效

let 可以用来防止循环变量变成全局变量

- let 声明的变量没有变量提升
- let 声明的变量有暂时性死区的特性，

```
	//在块级作用于声明的变量会和块级作用域绑定
	var tmp = 123;
    if(true){
        // console.log(tmp);// 报错 
        let tmp = 20;
        console.log(tmp);// 20
    }
```

## const 关键字

作用：声明常量，常量就是值 (内存空间) 不能变化的量

- 具有块级作用域
- 声明常量必须赋初始值
- 常量赋值后，值不能被修改
- const声明的变量也不会提升

## 闭包

**什么是闭包：**

- 函数执行后返回结果是一个内部函数，并被外部变量所引用，如果内部函数持有被执行函数作用域的变量，即形成了闭包。

**闭包是一片不会被销毁的EC。它对EC中的数据有保护和保存的作用：**

- 保护：防止像全局变量那样被污染，数据在函数内部，外界访问不了。
- 保存：可以像全局变量那样，延长变量的生命周期。
- 闭包使用不当可能会导致内存泄露

```
    // 闭包 有权访问另一个函数作用域中变量的函数
    // function fn(){
    //     var num = 10;
    //     function fun(){
    //         console.log(num);
    //     } 
    //     fun();
    // }
    // fn();

    // 通过闭包 fn 外面的作用域可以访问 fn 内部的局部变量
    function fn() {
            var num = 10;
            function fun() {
                console.log(num);
            }
            // return fun;
            return function(){
                console.log(num);
            }
        }
        var f = fn();
        f();
    // 类似于
    // var f = function fun(){
    //     console.log(num);
    // }
```



# 03-this

## this是什么

1. 函数在调用时，JavaScript会默认给this绑定一个值；
2. this的绑定和定义的位置（编写的位置）没有关系；
3. this的绑定和调用方式以及调用的位置有关系；
4. this是在运行时被绑定的；

## 修改this的方法

### call

调用这个函数，并且修改函数运行时的 this 指向

fun.call(thisArg, arg1, arg2, ...)

thisArg : 将当前调用函数的this 从 fun 变成 thisArg

arg1 ,arg2, 传递的其他参数

```
	// 传递其他参数
    function fn(x,y){
        console.log('我想躺两天');
        console.log(this);
        console.log(x + y);//15
    }
    var o = {
        name:'andy'
    };
    fn.call(o,12,3);
```

### apply

apply 和 call 作用一样，但是传参的方式不一样，需要把参数放到一个数组中

```
    function fn(num1,num2){
        console.log(this,num1+num2);
    }
    let obj = {
        name:'wc'
    };
    fn.apply(obj,[666,111])// {name: 'wc'} 777
```

### bind

bind的作用：

1）显示绑定this  

2）也可以传参   但是不会让函数执行，call和apply都会让函数执行 

3）bind返回绑定this之后的新函数

```
        function fn(num1, num2) {
            console.log(this, num1 + num2);
        }
        let obj = { name: "wc" }
        let newFn = fn.bind(obj, 666, 111);
        newFn();// {name: 'wc'} 777
```

## 如何判断this

### 默认绑定

```
fn();
```

独立函数调用，函数内部的this表示window

### 隐式绑定

```
 obj.fn();
```

通过打点调用，. 前面是什么，this就是谁

### 显示绑定

call这类修改this

```
	// 修改函数运行时的 this 指向
    function fn(){
        console.log('我想躺两天');
        console.log(this);// {name: 'andy'}
    }
    var o = {
        name:'andy'
    };
    fn.call(o); // this从 fn 变成了 对象o
```

### new绑定

- 创建一个新的对象
- 继承父类原型上的方法.
- 添加父类的属性到新的对象上并初始化. 保存方法的执行结果. 
- 这个新对象会绑定到函数调用的this上
- 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。

### 箭头函数的this

箭头函数并不绑定this对象，那么this引用就会从上层作用域中找到对应的this。

**箭头函数中的this，需要向上找一级。**

###  

# 04-面向对象（OOP）

## instanceof 

**instanceof 判断一个对象是否属于一个类**

```
    let obj = new Object();
    obj.name = "wc";

    // 判断obj是否是Object的对象
    console.log(obj instanceof Object); // true
    console.log(obj instanceof Number);  // false
```



## 对象中精准操作属性 .defineProperty()

<img src="https://i0.hdslb.com/bfs/new_dyn/3b5f94567845c346dc346706b50d57d1562431495.png@1554w.webp" style="zoom: 80%;" />

<img src="https://i0.hdslb.com/bfs/new_dyn/b821b2e11bc96b7a989afff80b017784562431495.png" style="zoom: 67%;" />

```
    var obj = {
        id: 1,
        name: '小米',
        price: 1999
    }
    // 新增num,修改原有元素同理
    Object.defineProperty(obj, 'num', {
        value: 1000
    })
   Object.defineProperty(obj, 'id', {
        writable : false // 不允许修改
    })
    console.log(obj); //{ id: 1, name: '小米', price: 1999, num: 1000 }
```

## 遍历对象方法

### for ... in

for...in 用于以任意顺序遍历对象**所有的可枚举属性**（包括对象自身的和继承的可枚举属性，不含 Symbol 属性）

```
    let obj = {
        name:'旺财',
        age:52
    }
    for(let key in obj){
        console.log(key);// name age
    }
```

### for ... of

```
var arr = [
    { name: 'nick', age: 18 },
    { name: 'freddy', age: 24 },
    { name: 'mike', age: 26 },
    { name: 'james', age: 34 }
];
for (var item of arr) {
	console.log(item.name, item.age);
}
```

## 创建对象方法

### 字面量创建对象

```
	let wc={
		name:'旺财',
		age:18
	}
```

**缺点：需要写大量的代码，并且多个代码都是重复的**

### new Object 等

```
	let obj = new Object();
	let num1 = new Number(110);
	let str = new String("hello");
	let b = new Boolean(true);
```

#### new的作用

- 创建一个新的对象
- 继承父类原型上的方法.
- 添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
- 这个新对象会绑定到函数调用的this上
- 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。

**缺点：可能会造成内存空间浪费**

### 工厂函数创建

```
    // 工厂函数  目的：产生对象
    function createPerson(name,age,height,address){
        let p = {};
        p.name = name;
        p.age = age;
        p.height = height;
        p.address = address;
        p.running = function(){ console.log(this.name + "在跑步~"); }
        return p;
    }

    let wc = createPerson("wangcai",13,160,"bj");  wc.running();

    console.log(wc instanceof Object);//
```

**缺点：获取不到对象最真实的类型，在打印出它的类型时，都是Object**

## 构造器创建对象

```
	function Coder(color) {
        this.color = color;
        this.start = function() {
            console.log("开始打代码~");
        }
    }
    let redCoder = new Coder("red");
    let blueCoder = new Coder("blue");
```

**不足：造成内存空间浪费**

### 构造器+原型创建对象

```
	function Coder(color) {
        this.color = color; // 每一个程序员的私有属性
    }
    Coder.prototype.start = function() {
        console.log("开始打代码~");
    }

    let redCoder = new Coder("red");
    let blueCoder = new Coder("blue");
```



# 05-原型与原型链

## 公有属性和私有属性

```
function Person(name){
    //私有属性，只能在对象构造函数内部使用
    var className = "用户对象";
 
    //公有属性,在对象实例化后调用
    this.name = name;
 
    //私有方法
    var privateFunction = function(){
        alert(this.name); //公有属性
        alert(className); //正确 直接通过变量名访问
        alert(this.className); //undefined 错误 不能这样访问
    }
 
    //公有方法
    this.publicFunction = function(){
        alert(this.name); //公有属性
        alert(className); //正确 直接通过变量名访问
        alert(this.className); //undefined 错误 不能这样访问
    }
```



## __ proto __ 指向的 隐式原型对象

**每一个对象都有一个__ proto __属性，它的值是一个对象，这个对象叫隐式原形对象**

```
    let obj = {
        name: "wc", // 私有属性
        age: 18 // 私有属性
    }
    console.dir(obj);
    
    console.log(obj.hasOwnProperty("name")); // hasOwnProperty 判断一个属性是否属于自己的私有属性
    console.log(obj.hasOwnProperty("hasOwnProperty"));
```



## prototype指向的 原型对象

- 一个函数（构造器）的prototype属性指向的对象 和 通过这个函数（构造器）创建出来的对象的__proto__所指向的是同一个对象，只不过，__proto__指向的一般叫隐式原型对象，prototype指向的，一般叫原型对象。

```
<script>
    let arr1 = new Array("wc", "xq")
    let arr2 = new Array("z3", "L4")
    console.dir(arr1)
    console.log(Array.prototype == arr1.__proto__); // true
    console.log(Array.prototype == arr2.__proto__); // true

    console.log(arr1.__proto__.__proto__ == Object.prototype); // true
    console.log(arr1.__proto__.__proto__.__proto__); // null
</script>
```



## constructor指向的 构造器

**每一个原型对象上都有一个叫constructor属性，指向它对应的构造器**

```
<script>
    let num = new Number(110)
    console.log(num.__proto__.constructor == Number);// true
</script>
```

## 构造函数和原型对象三角关系

<img src="https://i0.hdslb.com/bfs/new_dyn/2e94a2c58cd4d18b5bde51c143beae5b562431495.png@1554w.webp" style="zoom:50%;" />

## 原型链

![](https://i0.hdslb.com/bfs/new_dyn/ad58f82dc60940e8a22bfb8009a0a675562431495.png@1554w.webp)

## 对象属性或方法查找规则

<img src="https://i0.hdslb.com/bfs/new_dyn/702f9935d215401e1bc907f3310002d2562431495.png@1554w.webp" style="zoom:80%;" />

## 利用原型对象扩展内置对象方法

 // 注意：数组和字符串内置对象不能给原型对象覆盖操作

Array.prototype = {} 只能是

 Array.prototype.sum = function(){}

```
     Array.prototype.sum = function(){
         var sum = 0;
         for(var i = 0; i < this.length; i++){
         	sum += this[i];
         }
         return sum;
     }
    var arr = [1,2,3];
    var arr1 = new Array(11,22,33);
    console.log(arr1.sum());// 66
    console.log(arr.sum());// 6
```

# 

# 06-继承

## 原型继承

原型继承: 利用原型链, 继承于父级构造函数, 继承原型上的方法

```
   function Father(name,age){
        this.name = name;
        this.age = age;
    }
    Father.prototype.money = function(){
        console.log(this.name+1000000+'RMB');
    }
    // 2.子构造函数
    function Son(name,age,score){
        this.name = name;
        this.age = age;
        this.score = score;
    }
    Son.prototype = Father.prototype;
    
    var ldh = new Son('刘德华',12,100);
    ldh.money();// 刘德华1000000RMB
```

**原型继承的优点**

- 父类后续新增的属性或方法，子类中都可以访问。
- 操作子类即可修改原型中的属性。

**原型继承的缺点**

- 如果父中的数据类型是引用数据类型，子对象修改了，另一个子对象也会受影响
- 创建子类实例时，无法向父类构造函数传参
- 无法多继承

## 组合继承 

### 原型和call1

```
/ 核心原理 通过call() 把父类的this 指向子类型的this，这样就可以实现子类继承父类型的属性
    // 1.父构造函数
    function Father(name,age){
        this.name = name;
        this.age = age;
    }
    Father.prototype.money = function(){
        console.log(this.name+1000000+'RMB');
    }
    // 2.子构造函数
    function Son(name,age,score){
        Father.call(this,name,age);
        this.score = score;
    }
    Son.prototype = new Father();
    var ldh = new Son('刘德华',12,100);
    console.log(ldh); // {name: '刘德华', age: 12, score: 100} 
```

### 原型和call2 和  Object.create()

```
    // 1.父构造函数
    function Father(name,age){
        this.name = name;
        this.age = age;
    }
    Father.prototype.money = function(){
        console.log(this.name+1000000+'RMB');
    }
    // 2.子构造函数
    function Son(name,age,score){
        Father.call(this,name,age);
        this.score = score;
    }
    // // 构造函数没有必要执行, 我们只需要的是原型链
    Son.prototype = Object.create(Father.prototype);
    var ldh = new Son('刘德华',12,100);
    console.log(ldh); // {name: '刘德华', age: 12, score: 100} 
```

## ES6 extends 继承

现在都用这个extends

```
    class Person {
        constructor (name, age) {
            this.name = name
            this.age = age
        }
        // 添加到 Person.prototype 上
        sayHi () {
            console.log('你好哇')
        }
    }
    
    class Teacher extends Person {
        // 如果没有提供构造函数, 在继承时, 会默认自动借调父构造函数
        constructor (name, age, lesson) {
            super(name, age) // 触发调用父构造函数, 进行实例的属性初始化
            this.lesson = lesson
        }
        teach () {
            console.log('会教书')
        }
    }
    const teacher = new Teacher('zs', 18, '教体育')
    console.log(teacher)
```



# 07-with eval 严格模式

## with

**作用域链：** 一种数据的查找机制。

with语句，作用：扩展一个语句的作用域链

```
    let address = "bj";
    let obj = {
        uname: "wc",
        uage: 18
    }
    with(obj) {
        // 找uname    之前：去ECG中找uname  没有
        // 打uage     之前：去ECG中找uage  没有
        // with 扩展了作用域链   现在：找数据，去obj中找
        // 现在：如果obj中没有，还会去ECG中找
        console.log(uname);
        console.log(uage);
        console.log(address);
    }
```

**在开发中，不要使用with**，

- with语句破坏了作用域链，可能会出现一些错误，也有兼容性问题。

## eval

eval是一个特殊的函数，作用：可以把一片字符串，当成JS代码运行。

```
<script>
    let age = 110;
    var jsStr = " var msg = 'haha'; console.log(msg); console.log(age); ";

    // 可以把上面的字符串当成JS代码运行
    // eval执行代码，并不是沙箱环境，受外界的环境影响
    // 在node中，一个运行JS代码的沙箱环境
    eval(jsStr);
    console.log(msg);
</script>
```

**在开发中，不要使用eval：**

1. 可读性非常差
2. 本质是字符串，在执行过程中，可能会被恶意篡改，有被攻击的风险
3. eval执行的代码并不会被JS引擎优化

## 严格模式

JS刚设计出来时，非常灵活，有非常多的不足，在ES5中，提出了严格模式，默认情况下，代码执行时，并不是严格模式，要使用严格模式，需要开启严格模式。

**在哪开启：**

1. 在一个JS文件中开启 “use strict” 这个文件中写的代码都受严格模式的约束
2. 在一个函数中开启格式模式 function fn(){ “use strict” xxx } 其它代码不受约束

**严格模式特点**

- 不能使用没有加var的全局变量
- 形参不能重名
- 不能使用老的8进制数据的写法 0o 开头
- 不能使用with语句
- 不能eval
- 在非严格模式下，this是window  在严格模式下，不会默认绑定，this是und

# 08-函数式编程

**函数式编程：**

- 让函数职责更加单一，在函数式编程中，我们希望，一个函数处理问题尽可能单一，而不是将一大堆的处理过程交给一个函数来处理，所以，我们给函数传入的参数，应该非常灵活，可以先传入一部分参数，处理完后，再传其它参数。

## 柯里化

**只传递给函数一部分参数来调用它，让它返回一个函数去处理剩余的参数，这个过程，就是柯里化。**

```js
<script>
    // 未柯里化的函数
    function add(x,y,z){
        return x+y+z;
    }
    console.log(add(20,10,30));
    
    // 柯里化处理的函数
    function add2(x){
        return function(y){
            return function(z){
                return x+y+z;
            }
        }
    }
    console.log(add2(10)(20)(30));
```

- 经过柯里化处理的函数，可以简写：

```js
    let add2 = x=>y=>z=>x+y+z;
    console.log(add2(10)(20)(30));
```

## 组合函数

我们要完成一个功能，需要调用两个函数才能实现，之前，就是依次调用这两个函数。那么我们每一次要用这个功能，就需要调用两次函数，操作上有点重复，我们想一行代码完成

可以对两个多个函数进行组合，组合后的函数，我们叫组合函数。

```js
   function double(num){
        return num*2;
    }
    function square(num){
        return num ** 2;
    }
    // console.log(double(10));
    // console.log(square(10));

    // 需求：给一个数字，先乘以2，再平方
    let count = 12;
    let res = square(double(count))
    console.log(res);
```



# 09-JSON 数据存储 异常

**JSON: JavaScript Object Notation JS对象描述符**

## JSON认识

1.  JSON是客户端与服务器之间通信的一种数据格式。是目前最最常用的数据格式。
2. JSON并不是JS对象

## JSON格式

- 格式一：

```json
"hello json"
```

- 格式二：

```json
{
    "name": "wc",
    "age:": 19,
    "friend": {
        "name": "xq"
    },
    "hobbies":["zq","lq"]
}
```

- 格式三：

```json
[
    "abc",123,{"name:":"wc"}  
]
```

## JSON语法要求

- 支持的数据类型：数字，字符串，布尔值，null值，不能写函数

- 对象的key必须使用双引号包起来

- JSON中没有注释



## JSON的序列化和反序列化

**js对象存储到硬盘**

```
    let obj = {name:'帝骑哥'};
    window.localStorage.setItem('obj',obj);
    // f12->Application->storage
    // 以键值对形式存储 obj [object Object]
```

**序列化**

把obj对象转成JSON串之后，再存储，这个过程，叫序列化

```
    let obj = {name:'帝骑哥'};
    let objStr = JSON.stringify(obj);
    window.localStorage.setItem('objStr',objStr);
    // objstr {name:"帝骑哥"}
```

**反序列化**

把JSON串还原成JS对象

```
	let str = window.localStorage.getItem('objStr');
    let obj = JSON.parse(str);
    console.log(obj)
```

**利用JSON可以实现对象深copy**

```
    let obj = {name:'wc'};
    let objCopy = JSON.stringify(obj);
    console.log(objCopy)// {name:'wc'}
    console.log(objCopy === obj) // false
```



## 数据存储 LocalStorage和SessionStorage

**LocalStorage**

LocalStorage是永久化数据存储方案，数据存储完毕，关闭浏览器，注释代码，再打开浏览器，数据还是存在的。

LocalStorage的一些API

- length 返回数据的数量
- setItem(key,value) 存储数据的 如果key一样，数据会发生覆盖
- getItem(key) 获取数据
- removeItem(key) 删除数据
- Clear() 清除local storage中的所有的数据

```
<script>
    // 存储数据
    // window.localStorage.setItem("name","wc")
    // window.localStorage.setItem("age",18)

	// 返回数据的数量
	console.log(localStorage.length) // 2
	
    // 获取数据
    // console.log(localStorage.getItem("name"));

    // 删除数据
    // localStorage.removeItem("age")

    // 清除数据
    localStorage.clear();
</script>
```

**SessionStorage**

- Setssion Storage中也可以存储数据，它的数据的有效性是在一次会话，当会话结束，数据会自动被销毁，或你跳到一个新的网页，sessionStorage中的数据也会被销毁。
- 对应的API，和localStorage中的API是一样的。

## 自己抛出错误和捕获错误

由于JS是弱类型语言，我们可以给函数传递各种各样的数据，如果内部没有进行校验，会给项目带来很多隐藏bug，所以需要我们自己抛出错误和捕获错误

### throw抛出错误

```
    function sum(num1,num2){
    	if(typeof num1 !== "number" || typeof num2 !== "number"){
    		throw "你的参数不合适，请传入数字"
    }
    	return num1+num2;
    }
    console.log(sum(10,null));
    // Uncaught 你的参数不合适，请传入数字
```

### new Error 类 抛出错误

在JS中，错误也有一个类，叫Error，也应对了很多了类，如RangeError，SyntaxError，TypeError..... 我们就可以new 一个错误对象抛出去，如下

```
function sum(num1,num2){
        if(typeof num1 !== "number" || typeof num2 !== "number"){
            throw new Error("你的参数不合适，请传入数字") // 红字
            // return new Error("你的参数不合适，请传入数字") //黑字
        }
        return num1+num2;
    }

    console.log(sum(10,null));
```

### try catch 捕获错误

如果代码出错了，下面的代码就不会执行了，让错误下面的代码还要执行，需要要去try catch这个错误

```
    function sum(num1,num2){
        if(typeof num1 !== "number" || typeof num2 !== "number"){
            throw new Error("你的参数不合适，请传入数字")
        }
        return num1+num2;
    }
    try{
        // try中放可能出错的代码
        sum(10,null)
    }catch(err){
        // catch中就可以捕获，程序员或JS引擎抛出的错误
        console.log(err);
    }
    console.log("我是后面的代码");
```



# 10-ES6+

**let const 见 02 深入变量**

### 立即调用函数

Immediately Invoked Function Expression（立即调用函数表达式），立即调用函数就算有名字，外面也拿不到，给函数名赋值会失败，this是 window

```
	正确IIFE写法：
    //   写法1：;(function fn(){})()
    //   写法2：;(function fn(){}())
    //   写法3：+function fn(){}()
    //   写法4：-function fn(){}()
    //   写法5：!function fn(){}()
```

## 箭头函数

```html
<script>
    // var fn = function(num1,num2){
    //     return num1 + num2;
    // }

    // 像上面的函数可以简写
    var fn = (num1, num2) => {
        return num1 + num2;
    }
    console.log(fn(1, 2));
</script>
```

```html
<script>
    // 如果形参只有一个，()可以不写
    var fn = num => {
        return num * 10;
    }
    console.log(fn(10));
</script>
```

```html
<script>
    // 如果函数体中只有一行语句，{}可以不写
    var fn = num => console.log(num + 100);
    fn(100)
</script>
```

```html
<script>
    // 如果函数体中只有一行代码，并且这行代码是return语句
    // {}可以不写  return也可以不写
    var fn = num => num * 10;
    console.log(fn(10));
</script>
```

```html
<script>
    // 如果函数体中只有一行代码，并且是return语句
    // return了一个对象
    // var fn = function(){
    //     return { name:"wc" }
    // }

    // 把上面的代码转成箭头函数
    // 此时它会把对象的{} 当成函数的{}
    // 需要使用()把对象包起来
    var fn = () => ({
        name: "wc"
    })
    console.log(fn());
</script>
```

## 解构赋值

### 数组的解构赋值

```javascript
    let arr = [0,22,33];
    let [num1, num2, num3] = arr;
    console.log(num1);// 0
    console.log(num2);// 22
    console.log(num3);// 33
```

### 对象的解构赋值

- **基本使用**

```javascript
    let {
        userName,
        userAge
    } = {
        userName: 'ls',
        userAge: 20
    };
    console.log(userName, userAge);// 1s 20
```

- **起别名**

```javascript
    let {
        userName:name,
        userAge:age
    } = {
        userName: 'ls',
        userAge: 20
    };
    console.log(name, age);// 1s 20
```

- **默认解构**

```
        let {
            userName= 'dacede',
            userAge= 18,
            userScore = 99
        } = {
            userName: 'ls',
            userAge: 20,
            // userScore:100
        };
        console.log(userName, userAge, userScore);// 1s 20 99
```

- **嵌套结构对象的解构**

```
    let obj = {
        arr: [
            "Hello", {
                msg: 'World'
            }
        ]
    }
    let {
        arr: [str, {
            msg
        }]
    } = obj;
    console.log(str, msg);
```

**注意：arr只是一种标志或者是一种模式，不是变量，因此不会被赋值。**

### 函数参数的解构

```
    function test({
        x = 0,
        y = 0
    } = {}) {
        return x+y;

    }
    console.log(test({
        x: 3,
        y: 6
    }));
    // 9
```



### 解构赋值的注意事项

- 如果解析不成功，对应的值会为undefined

```javascript
let [num1,num2] = [1];
console.log(num2);// undefined
```

- 不完全解构的情况

```js
let [,,num3] = [1,9,2];
console.log(num3);// 2
```

### 解构赋值的好处

1. **交换变量更方便**

```
    let num1 = 3;
    let num2 = 6;
    [num1, num2] = [num2, num1];
    console.log(num1, num2);
```

2. **函数可以返回多个值**

```
    function test() {
        return [1, 2, 3];
    }
    let [a, b, c] = test();
    console.log(a, b, c);// 1 2 3
```

当然在实际的开发过程中，可以根据自己的实际情况确定返回的数据的个数。

3. **可以把函数返回的多个值封装到一个对象中**

```js
    function test() {
        return {
            num1: 3,
            num2: 6
        }
    }
    let {
        num1,
        num2
    } = test();
    console.log(num1, num2);
```



## 扩展运算符...

1. **扩展运算符...可以把数组展开**

```
    let arr = [1,2,3,55];
    console.log(...arr);// 1 2 3 55
```

2. **数组合并**

es5传统方法

```
    let arr1 = [1, 2, 3];
    let arr2 = [4, 5, 6];
    let arr3 = [].concat(arr1, arr2);
    console.log(arr3);// [1, 2, 3, 4, 5, 6]
```

扩展运算符写法

```
    let arr1 = [1, 2, 3];
    let arr2 = [4, 5, 6];
    let arr3 = [...arr1,...arr2];
    console.log(arr3);// [1, 2, 3, 4, 5, 6]
```

**求数组中的最大值**

es5写法

```
	console.log(Math.max(1, 5, 12, 67));
	
	let arr = [12, 23, 11, 56];
	console.log(Math.max.apply(null, arr));
```

扩展运算符写法

```
    let arr = [12, 23, 11, 56];
    console.log(Math.max(...arr));
```



## rest运算符...

### rest基本使用

可以看出  values 是个数组

```js
    function add(...values) {
    console.log(values);
    }
    add(2, 3);
    // [2,3]
```

rest在解构赋值中的使用

```js
    let arr = [1, 2, 3, 4, 5, 6];
    let [arr1, ...arr2] = arr; //进行解构处理
    console.log(arr1); // 1
    console.log(arr2); // [2,3,4,5,6]
```

### rest参数的好处

rest values 参数本身就是数组，可以直接使用数组的方法，而arguments是一个伪数组，要先转成数组

**对数据排序案例**

arguments

```js
function sortFunc() {
    return Array.prototype.slice.call(arguments).sort()
}
console.log(sortFunc(23, 12, 67));
```

rest

```js
function sortFunc(...values) {
    return values.sort()
}
console.log(sortFunc(23, 12, 67));
```

### rest参数注意事项

- rest参数只能是最后一个参数，否则会报错

```js
function test(a, b, ...c) {
    console.log(a);
    console.log(b);
    console.log(c);
}
test(1, 23, 2, 5);
//1 23 [2,5]
```

### 区分扩展运算符和rest运算符的

- 第一：当...出现在函数的形参上或者出现在赋值号的左侧，则表示的就是 `rest` 运算符

- 第二：当...出现在函数的实参上或者出现在赋值号的右侧，则表示它为扩展运算符。

## 对象的扩展

### 属性和方法的简介表示方式

以前创建对象的方式

```js
    let name = '旺财';
    let age = 19;
    let person = {
        name:name,
        age:age
    }
```

es6简化

```js
    let name = '旺财';
    let age = 19;
    let person = {
        name,
        age,
        say(){
            console.log('欢迎来到德莱联盟');
        }
    }
```

### Object.assign()方法

Object.assign(target, ...sources)

- target	目标对象，接收源对象属性的对象，也是修改后的返回值。

- sources	源对象，包含将被合并的属性。

作用：将所有可枚举的私有属性从一个或多个源对象复制到目标对象，返回修改后的对象。

```js
    let target = {
        a: 1,
        b: 2
    };
    let source = {
        c: 3,
        d: 4
    };
    Object.assign(target, source);
    console.log(target);
    // {a: 1, b: 2, c: 3, d: 4}
```

### Object.assign()注意事项

- 通过 Object.assign( ) 方法，实现的拷贝只拷贝了属性的值，属于浅拷贝。

- 如果目标对象与源对象有同名属性，那么后面的属性会覆盖前面的属性。
- 不可枚举的属性不会被复制。

## Symbol

Symbol类型的值是通过Symbol函数生成的，它的值是独一无二的，能够从根本上防止属性名称的冲突问题

### Symbol的基本使用

```js
    let s = Symbol();
    let s1 = Symbol();
    console.log(s);// Symbol()
    console.log(s1);// Symbol()
    console.log(s == s1);// false
```

为了区分控制台的输出结果Symbol()，Symbol( )函数可以接受一个字符串作为参数，这个参数表示对Symbol的描述

```js
    let s = Symbol('s');
    let s1 = Symbol('s1');
    console.log(s);// Symbol('s')
    console.log(s1);// Symbol('s1')
```

### Symbol的应用场景

**保证对象中不会出现同名属性**

1. 

```js
    let mySymbol = Symbol();
    let obj = {}
    obj[mySymbol] = 'hello';
    console.log(obj[mySymbol]);
    console.log(obj);
    // hello {Symbol(): 'hello'}
```

2. 

```js
    let mySymbol = Symbol();
    let obj = {
        [mySymbol]: 'world' // 注意mySymbol必须加上方括号，否则为字符串而不是Symbol类型。
    }
    console.log(obj[mySymbol]);
```

3. 

```js
    let mySymbol = Symbol();
    let obj = {};
    Object.defineProperty(obj, mySymbol, {
        value: '你好'
    })
    console.log(obj[mySymbol]);
```

## Proxy类监听对象中属性的操作

es6之前的方法

```
<script>
    let obj = {
        name: "wc",
        age: 18,
        adress: "bj",
    }
    Object.keys(obj).forEach(key => {
        let value = obj[key];
        Object.defineProperty(obj, key, {
            get: function() {
                console.log(`监听到了obj对象的${key}属性被访问了`);
                return value;
            },
            set: function() {
                console.log(`监听到了obj对象的${key}属性被设置了`);
            }
        })
    })
    console.log(obj.name);
    obj.name = "wc666";
    console.log(obj.adress);
</script>
```

缺点：

- Object.defineProperty刚开始设计初衷，并不是用来监听对象中的属性
- 如果对象非常复杂，需要递归去监听，一旦递归，性能非常差
- 有些操作监听不了，如添加属性，删除属性....

**Proxy的方法**

```
<script>
    let obj = {
        name: "wc",
        age: 18
    }
    let objProxy = new Proxy(obj, {
        // key 表示你访问的属性名
        // target 表示原始对象
        get: function(target, key) {
            console.log(`监听到了obj对象的${key}属性被访问了`, target);
            // .....
            return target[key]
        },
        set: function(target, key, newValue) {
            console.log(`监听到了obj对象的${key}属性被设置了`, target);
            target[key] = newValue;
        }
    })
    console.log(objProxy.name);
    objProxy.name = "wc666"
    console.log(objProxy.name);
</script>
```

当new Proxy时，第1个参数是原始对象，第2个参数是处理对象，处理对象中放捕获器，上面的的get和set其实就是捕获器，proxy中有13的捕获器

**注意：要使Proxy起作用，必须针对Proxy对象进行操作，不是针对目标对象进行操作(上面的是student对象)。**

## Set和Map结构

### set常用操作方法

- add(value): 添加某个值，返回Set结构本身。
- delete(value) : 删除某个值，返回一个布尔值，表示删除是否成功
- has(value) : 返回一个布尔值，表示参数是否为Set的成员.
- clear() : 清除所有成员，没有返回值
- 遍历 : 另外Set是支持for of的遍历的

```
    let s = new Set();
    s.add(1);
    s.add(3);
    s.add(4);
    
    console.log(s);// {1, 3, 4}
    console.log(s.size); // 3
    console.log(s.has(4));// true
    
    s.delete(1);
    console.log(s);// {3, 4}
    
    s.clear();
    console.log(s); // { size: 0 }
```

### set结构转化成数组

```
    let s = new Set();
   
    s.add(1);
    s.add(3);
    s.add(4);
    
    let arr = Array.from(s);
    console.log(arr);// [1, 3, 4]
```

### set清除数组中的重复元素

```
let array = [1, 2, 3, 3, 5, 6];
let s = new Set(array);
console.log(Array.from(s));
```

### WeakSet常见方法

- add(value)：添加某个对象，返回WeakSet对象本身
- delete(value)：从WeakSet中删除和这个值相等的元素，返回boolean类型
- has(value)：判断WeakSet中是否存在某个元素，返回boolean类型

### WeakSet和Set的区别

- WeakSet中只能存放对象类型，不能存放基本数据类型；
- WeakSet对元素的引用是弱引用，如果没有其他引用对某个对象进行引用，那么GC可以对该对象进行回收；
- WeakSet不能遍历，因为WeakSet只是对对象的弱引用，如果我们遍历获取到其中的元素，那么有可能造成对象不能正常的销毁，所以存储到WeakSet中的对象是没办法获取的；

### Map简介

Map用来存储映射关系，之前可以用对象存储映射关系，它们的区别是什么？

- 对象存储映射关系只能用字符串（es6新增了Symbol）作为属性名
- Map可以用其他类型作为属性名，比如对象

### Map的常用属性和方法

- size：返回Map中元素的个数；
- set(key, value)：在Map中添加key、value，并且返回整个Map对象
- get(key)：根据key获取Map中的value；
- has(key)：判断是否包括某一个key，返回Boolean类型；
- delete(key)：根据key删除一个键值对，返回Boolean类型
- clear()：清空所有的元素；
- forEach(callback, [, thisArg])：通过forEach遍历Map；
- Map也可以通过for of进行遍历。

```
 const info = {
     name: "wc"
 }
 const info2 = {
     age: 18
 }

 // 1.对象类型的局限性: 不可以使用复杂类型作为key
 // const obj = {
 //   address: "bj",
 //   [info]: "haha",
 //   [info2]: "hehe"
 // }
 // console.log(obj)

 // 2.Map映射类型
 const map = new Map()
 map.set(info, "wc")
 map.set(info2, "xq")
 console.log(map)

 // 3.Map的常见属性和方法
 // console.log(map.size)
 // 3.1. set方法, 设置内容
 map.set(info, "z3")
 console.log(map)
 // 3.2. get方法, 获取内容
 // console.log(map.get(info))
 // 3.3. delete方法, 删除内容
 // map.delete(info)
 // console.log(map)
 // 3.4. has方法, 判断内容
 // console.log(map.has(info2))
 // 3.5. clear方法, 清空内容
 // map.clear()
 // console.log(map)
 // 3.6. forEach方法
 // map.forEach(item => console.log(item))

 // 4.for...of遍历
 for (const item of map) {
     const [key, value] = item
     console.log(key, value)
 }
```

### WeakMap常见的方法

- set(key, value)：在Map中添加key、value，并且返回整个Map对象；
- get(key)：根据key获取Map中的value；
- has(key)：判断是否包括某一个key，返回Boolean类型；
- delete(key)：根据key删除一个键值对，返回Boolean类型；

### WeakMap和Map的区别

- WeakMap的key只能使用对象，不接受其他的类型作为key；
- WeakMap的key对对象想的引用是弱引用，如果没有其他引用引用这个对象，那么GC可以回收该对象
- WeakMap不能遍历

## Array Includes 判断数组中是否包含某个元素

- 判断数组中是否包含某个元素，通过 indexOf 获取结果，判断是否为 -1。
- 在ES7中，我们可以通过includes来判断数组中是否包含一个指定的元素，如果包含则返回 true，否则返回false。

```
    let names = ["wc", "xq", "z3"];
    console.log(names.indexOf(1)); // -1 
    console.log(names.includes('wc')); // true
```



## 指数运算符 **

在es7之前，计算数字的乘方需要通过 Math.pow()

```
    let res = Math.pow(2,4);
    let res2 = 2 ** 4;
    console.log(res,res2);// 16 16
```



## Object.keys、Object.values 和 Object.entries

- Object.keys 获取一个对象所有的key，返回一个数组
-  Object.values 来获取所有的value值,返回一个数组
- Object.entries 获取对象所有的属性及属性值，数组或字符串的键从0开始，值是每一个元素，返回一个二维数组

```
    const obj = {
        name: "wc",
        age: 18,
        height: 1.88,
        address: "bj"
    }

    const keys = Object.keys(obj)
    console.log(keys)

    const values = Object.values(obj)
    console.log(values)

    const entries = Object.entries(obj)
    console.log(entries)
    
    for (const entry of entries) {
        const [key, value] = entry
        console.log(key, value)
    }

    // 3.2. 对数组/字符串操作
    console.log(Object.entries(["wc", "xq"]))
    console.log(Object.entries("Hello"))
```



## padStart 和 padEnd 操纵字符串

**padStart(targetLength, padString)**

- targetLength 要填充的目标长度  如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- padString 要填充字符串

```
    // 1.应用场景一: 对时间进行格式化
    const minute = "15".padStart(2, "0")
    const second = "6".padStart(2, "0")
    console.log(`${minute}:${second}`)

    // 2.应用场景二: 对一些敏感数据格式化
    let cardNumber = "410883199898764665"
    const sliceNumber = cardNumber.slice(-4)
    console.log(sliceNumber);// 4665
    cardNumber = sliceNumber.padStart(cardNumber.length, "*")
    console.log(cardNumber)// **************4665
```

## hasOwnProperty in

用来判断某个对象是否含有指定的属性。

```
    let arr = {
        name:'旺财',
        age:123
    }
    console.log(arr.hasOwnProperty('name'));// true
    console.log(arr.hasOwnProperty('xxx'));// false

    // in是一个运算符  判断一个属性是否是某个对象的属性
    // 这个属性不管是私有的还公有的
    console.log("name" in arr);//true
```





## hasOwn(obj, propKey)

Object中新增了一个静态方法（类方法），Object.hasOwn() 判断一个对象中是否有某个自己的属性

```
    let arr = {
        name:'旺财',
        age:123
    }
    console.log(Object.hasOwn(arr,'name'));// true
    console.log(Object.hasOwn(arr, 'XXX'));// false
```

**Object.hasOwn和Object.prototype.hasOwnProperty的区别**

- 区别一：防止对象内部有重写hasOwnProperty
- 区别二：对于隐式原型指向null的对象， hasOwnProperty无法进行判断

```
    const obj = {
        name: "wc",
        age: 18,
        // 防止对象中也有一个自己的hasOwnProperty方法
        hasOwnProperty: function () {
            return "ok"
        },
        __proto__: {
            address: "bj"
        }
    }

    console.log(obj.hasOwnProperty("name"))// ok
    console.log(obj.hasOwnProperty("address"))// ok

    console.log(Object.hasOwn(obj, "name"))// true
    console.log(Object.hasOwn(obj, "address"))// false

    // 和hasOwnProperty的区别二:
    const info = Object.create(null)
    info.name = "wc"
    // console.log(info.hasOwnProperty("name"))// 报错
    console.log(Object.hasOwn(info, "name"))// true
```



# 11-Promise 与 异步方案

## 最早解决异步方法：回调函数

2s后输出1到n的和

```js
	function fn(counter, successCallback, failureCallback){
        setTimeout(()=>{
            if(counter > 0){
                let total = 0;
                for(let i = 1; i <= counter; i++){
                    total += i;
                }
                successCallback(total);
            }else{
                failureCallback('输入错误:' + counter);
            }
        },2000)
    }

    fn(-100,(value)=>{
        console.log('执行成功，结果是：' + value);
    },(err)=>{
        console.log(err);
    })
```

## Promise 简介

**Promise是ES6中的一个类，翻译是承诺，许诺的意思。**

- new Promise就可以得到一个对象，new Promise时，需要传入一个回调函数，这个回调函数是立即执行，叫执行器，这个执行器中有两个参数，分别是resolve和reject，在执行器，可以写代码代码

```js
    let p = new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve('成功状态');
            // reject('失败状态');
        },2000)
    })
```

**Promise有三种状态:**

- 等待状态：pending 默认你创建出来的promise是处于等待状态
- 成功状态：fulfulled 当调用resolve时，就可以把promise从等待变成成功
- 失败状态：rejected 当调用reject时，就可以把promise从等待变成失败

## Promise中resolve的实参问题

**1.当resolve参数是普通的数据时，结果是成功状态**

```js
    let p = new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve(['a','b','c']);
            // reject('失败状态');
        },2000)
    })
    // console.log(p);
    p.then(res => {
        console.log(res);
    },err => {
        console.log(err);
    })
    // ['a','b','c']
```

**2.当resolve参数是一个 promise 对象，最终结果由这个对象决定**

```js
    const p2 = new Promise((resolve,reject) => {
        setTimeout(() => {
            // resolve(['a', 'b', 'c']);
            reject('失败状态');
        }, 2000)
    })
    let p = new Promise((resolve,reject) => {
        resolve(p2);
    })
    p.then(res => {
        console.log(res);
    },err => {
        console.log(err);
    })
    // 失败状态
```

**3.当resolve参数是thenable(就是一个对象中有一个then函数)，最终结果由这个thenable决定**

```js
	let p = new Promise((resolve,reject) => {
        resolve({
            then:function(resolve,reject){
                // resolve('成功');
                reject('失败')
            }
        });
    })
    p.then(res => {
        console.log(res);
    },err => {
        console.log(err);
    })
    // 失败
```



## Promise的then函数

**then函数基本使用**

```js
    let p = new Promise((resolve,reject) => {
        setTimeout(()=>{
            // resolve('成功状态');
            reject('失败状态');
        },2000)
    })
    
    p.then(res => {
        console.log(res);
    },err => {
        console.log(err);
    })
```

## then函数的返回值

- then方法是有返回值的，它返回一个新的promise，只要then，就返回一个新的promise。

- 新的promise是成功的还是失败的，取决于上一个then函数的返回值

**上一个then函数的返回值决定新promise状态的四种情况**

1. 上一个then返回一个普通的值 和 und，新的promise状态是 成功

```js
    let p = new Promise((resolve,reject) => {
        resolve('成功');
    })
    p.then(res => {
        return 123;
    },err => {
        console.log(err);
    }).then(res2 => {
        console.log('res2',res2);
    },err2 => {
        console.log('err2',err2);
    })
    // res2 123
```

2. 上一个then返回一个promise时，新promise的状态取决于返回的promise的状态

```js
    let p2 = new Promise((resolve,reject)=>{
        resolve('成功p2');
        // reject('失败p2');
    })
    let p = new Promise((resolve,reject) => {
        resolve('成功');
    })
    p.then(res => {
        return p2;
    },err => {
        console.log(err);
    }).then(res2 => {
        console.log('res2',res2);
    },err2 => {
        console.log('err2',err2);
    })
    // res2 成功p2
```

3. 上一个then返回一个thenable值，新的promise取决于thenable的状态

```js
    let p = new Promise((resolve,reject) => {
        resolve('成功');
    })
    p.then(res => {
        return {
            then : function(resolve,reject){
                reject('thenable失败')
            }
        };
    },err => {
        console.log(err);
    }).then(res2 => {
        console.log('res2',res2);
    },err2 => {
        console.log('err2',err2);
    })
    // err2 thenable失败
```

4. 上一个then抛出一个错误，新的promise是 失败状态

```js
    let p = new Promise((resolve,reject) => {
        resolve('成功');
    })
    p.then(res => {
        throw new Error('未知错误');
    },err => {
        console.log(err);
    }).then(res2 => {
        console.log('res2',res2);
    },err2 => {
        console.log('err2',err2);
    })
    // err2 Error: 未知错误
```

## then函数的顺延

**不管是成功，还是失败，上一个then没有处理，就会顺延到下一个then中**

```js
    let promise = new Promise((resolve, reject) => {
        resolve("成功")
    })
    promise.then(null, err => {
        console.log("err2:", err);
    }).then(res3 => {
        console.log("res3:", res3);
    })
    // res3: 成功
```

**then的顺延  catch**

- catch就是失败状态执行的函数

```js
    let promise = new Promise((resolve, reject) => {
        reject("失败")
    })
    promise.then(res3 => {
            console.log("res3:", res3);
        }).catch(err => {
        console.log("err2:", err);
    })
    // err2: 失败
```

## Promise中的finally()

**在ES9中，新增了finally方法，无论promise是成功的，还是失败的，最终都会执行finally**

```js
    const promise = new Promise((resolve, reject) => {
            reject("失败")
        });

        promise.then(res => {
            console.log("res:", res);
        }).catch(err => {
            console.log("err:", err);
        }).finally(() => {
            console.log('没想到吧，我又回来啦！');
        })
        // finally() 里面的函数执行了
```

## Promise类的类方法（静态方法）

### all

**all的作用**：

- 所有promise都成功后，得到所有成功后的promise结果


- 如果有一个先失败了，直接得到最先失败promise的结果

```js
    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve("p1 resolve")
            reject("p1 reject ")
        }, 3000)
    })

    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve("p2 resolve")
            reject("p2 reject ")
        }, 2000)
    })

    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("p3 resolve")
        }, 5000)
    })

    Promise.all([p1, p2, p3]).then(res => {
        console.log(res);
        // p1 p2 失败状态 输出 p2 reject
        // 全部成功 输出 ['p1 resolve', 'p2 resolve', 'p3 resolve']
    }).catch(err => {
        console.log(err);
    })
```



### allSettled

**allSettled  获取所有的promise的结果，带有一个对象数组，每个对象表示对应的 promise 结果**

```js
    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("p1 resolve")
            // reject("p1 reject ")
        }, 3000)
    })

    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("p2 resolve")
            // reject("p2 reject ")
        }, 2000)
    })

    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("p3 resolve")
        }, 5000)
    })

    Promise.allSettled([p1, p2, p3]).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
//     { status: 'fulfilled', value: 'p1 resolve' }
//     { status: 'fulfilled', value: 'p2 resolve' }
//     { status: 'fulfilled', value: 'p3 resolve'}
```



### any

**any作用**：

- 返回第1个成功的  或者  返回AggregateError: All promises were rejected

```js
    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve("p1 resolve")
            reject("p1 reject ")
        }, 3000)
    })

    const p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve("p2 resolve")
            reject("p2 reject ")
        }, 2000)
    })

    const p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve("p3 resolve");
            reject('p3 reject')
        }, 5000)
    })

    Promise.any([p1, p2, p3]).then(res => {
        // p2 resolve
        // AggregateError: All promises were rejected
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
```

## 认识async函数

- async是一个关键字，用于声明一个异步函数，async是asynchronous简写，是异步

```js
    async function foo() {
    }
    console.log(foo()); // Promise {<fulfilled>: undefined}
```

## async函数的返回值

**异步函数的结果永远都是promise**

**异步函数和普通函数的区别：**

- 异步函数可以有返回值，返回值都会包裹在Pormise.resolve中
- 如果异步函数自己返回了promise，得到的Promies状态由返回的promise决定
- 如果我们异步函数返回值是一个对象并且实现thenable，得到的Promies状态由then方法中做了什么才能决定
- 如果在async函数中抛出一个错误，得到的promise是一个失败的promsie

```
<script>
    async function foo() {
        console.log("foo function1")
        console.log("foo function2")
        console.log("foo function3")
        // 1)返回普通值，promis是成功的promsie
        // return 123;

        // 2)返回promise   res这个promise是成功还是失败，取决于你返回的promise是成功还是失败
        // return new Promise((resolve, reject)=>{
        //     setTimeout(()=>{
        //         resolve("hello")
        //     },2000)
        // })

        // 3)返回thenable  res这个promise是成功还是失败，取决于你返回的thenable是成功还是失败
        return {
            then: function(resolve, reject) {
                reject("没钱~")
            }
        }
    }

    let res = foo();
    res.then(res => {
        console.log("res:", res);
    }).catch(err => {
        console.log("err:", err);
    })
</script>
```

## await关键字

**在异步函数内部可以使用await关键字，在普通函数中不能使用await**

**await关键字的作用：**

- await后面跟一个表达式，这个表达式是一个promise
- 这个await可以等待它后面的promise成功后，拿到成功的结果，拿到之后，才会执行后面的代码。
- 异步函数await下面的代码相当于一个.then  

**await后面跟不同的数据：**

- 如果await后面跟一个普通值，那么会直接返回这个值。
- 如果await后面跟一个thenable对象，那么要看你这个thenable中的then做了什么。
- 如果await后面的promise是失败的，需要通过try catch来获取失败的结果。

```
    async function gn() {
        let rs = await 123
        console.log("rs:", rs); // 123
        // 返回一个und 
    }
    gn().then(res => {
        console.log("res:", res);// res: undefined
    })
```

## 浏览器事件环

在`javascript `中，有定时器`setTimeout`、服务请求`ajax`、ui渲染、还有些`Promise`等，浏览器在解析这些代码时，不是同步进行的。比如`setTimeout`要等到时间到时才会执行，`ajax`要等到服务端响应后才会拿到返回数据。 那么浏览器如何知道什么时候该去处理`setTimeout`或者`ajax`，方法就是，一轮一轮循环，这就形成了浏览器事件环。

**异步代码分两类：**

- 宏任务：ajax，setTimeout，setInterval，DOM事件监听，UI渲染....
- 微任务：promies中的then回调 Mutaion Observer ...

### JS代码的执行顺序：

1. 从代码段开始执行
2. 如果遇到一个宏任务，会把这个任务放到一个宏任务队列，如果遇到一个微任务，就把这个微任务放到微任务任务中。
3. 当同步代码执行完毕后，先去清空微任务队列。
4. 当微任务队列清空完毕后，从宏任务队列中取出一个宏任务，去执行，在执行过程中，你的宏任务中可能还有同步代码或宏任务或微任务，重复上面的步骤，执行完一个宏任务，肯定要清空微任务队列。