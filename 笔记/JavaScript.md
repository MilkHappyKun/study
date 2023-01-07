# 01-初识JavaScript

简介

- 是一种运行在客户端的脚本语言，script是脚本的意思
- 脚本语言，不需要编译，运行过程中由js引擎逐行解释并执行
- 现在也可以基于Node.js技术进行服务端编程

JavaScript的作用

- 表单动态校验（例如密码强度检测）
- 网页特效
- 服务端开发 Node.js
- 桌面程序 Electron
- APP Cordova
- 控制硬件-物联网 Ruff

- 游戏开发 cocos2d-js

实现业务逻辑和页面控制，决定功能，相当于人的各种动作

JS的组成

- JavaScript语法 ECMAScript
- 页面文档对象模型 DOM
- 浏览器对象模型 BOM

## JS的三种书写位置

- 行内
- 内嵌页内

  - 在head里 有缺点拿不到未加载的元素 

  把代码放window.onload = function(){ } 里就行了

  - 在body最后 最好
  - 在body下面 

- 外联

## JS的两种注释方法

- 单行注释 ctrl /

// 代码

- 多行注释 修改后为 ctrl shift /

/* 

​	代码

*/

## JS的输出、输入



弹框

alert prompt confirm这三个优先级最高，会最先执行，阻塞代码运行

- alert(msg) 浏览器弹出警示框 
- confirm(msg) 一个判断的弹窗

- prompt(info) 浏览器弹出输入框，用户可以输入

控制台输出

- console.log(msg) 浏览器控制台打印普通输出信息
- console.warn(msg) 这是控制台的警告输出
-   console.error('这是控制台的报错输出')

页面输出

```
document.write('<h1>hello world</h1>')
```

输入

- prompt函数

```
    var age =  prompt('请输入你的年龄');
    console.log(age);
```

## JS代码段

```
// 一个script标签就是一个代码段
特点
// 一个代码段里面 错误会阻塞后面代码的运行
// 一个代码段的报错不影响另一个代码段的运行
```



## 变量

1. 声明变量
2. 赋值
3. 输出
4. 变量的初始化

```
	var age;// var声名variable 变量
	age = 10;
	console.log(age);// 输出结果
	var myname = '王小明';
	console.log(myname);
    // 一步定义多个变量 var a,b,c,d; 
	var a=1,b=1,c=1;
```

变量使用

```
var myname = prompt('请输入你的名字');
console.log(myname);
```

## 变量的语法扩展

- 只声名不赋值结果是 undefined 未定义的

- 不声明，不赋值，直接使用 报错
- 不声明 只赋值 age=10;console.log(age); 10 不提倡，会变成全局变量 在window上

## 变量命名规范

- 组成：字母 数字 下划线 美元符号
- 严格区分大小写
- 不能以 数字 开头
- 不能是关键字
- 命名有意义
- 驼峰命名 myFirstName

## 数据存储

 基本数据类型存储在栈区，引用数据类型存储在堆区，栈区也存了堆地址

## 数据类型

JS是一种动态语言，不用提前声明变量的类型，在程序运行过程中，类型会被自动确定

```
	var x=10;	
	x ='ganma';
```



- 简单数据类型 Number String Boolean Undefined Null
- 复杂数据类型 object 数组 函数

**简单数据类型**

- number 包括 整型 浮点型 默认0
- boolean 默认 false
- String 默认""
- Undefined 默认undefined
- Null 默认null

**number 数字型**

进制

八进制

- 数字前面加0o表示八进制

- var num1 = 0o12;

十六进制

- 数字前面加 0x 表示八进制
- var num2 = 0x2a;

二进制

- 0b开头

范围

- JavaScript中数值的最大和最小值

- alert(Number.MAX_VALUE); 

- alert(Number.MIN_VALUE); 

特殊值

- Infinity 无穷大，大于任何数值1/0
- -Infinity 无穷小
- NaN ,Not a number,代表一个非数值

可以在控制台看到

- alert(Number.MAX_VALUE * 2); 

- alert(-Number.MAX_VALUE * 2); 

- console.log('及你太美' - 100);

**isNaN()**

判断是否为数字，返回布朗值

console.log(isNaN(12));

**String**

字符串语法为 双引号 "" 和单引号 ''

因为HTML标签里的属性使用的是双引号，JS推荐使用单引号

var xiaoming = '我是一个"高富帅"程序员';

JS可以用单引号嵌套双引号，或者双引号嵌套单引号，(外双内单，外单内双)

不能单双号搭配

字符串常见转义字符

- \n 换行 （n 指newline）
- \\ \  斜杠\
-    \ ' 单引号'
-  \t tab缩进
- \b 空格

总之\加符号

**字符串的长度**

length

```
  var str = '我一个浪荡不羁的男人';
  // var number = str.length;
  // alert(number);
  alert(str.length);
```

**字符串的拼接**

字符串 + 任何类型 = 拼接之后的新字符串

+号：数值相加，字符相连

**布尔值**

true 参与加法为1，false 为0

**undefined类型**

定义了一个变量 但是没有给他赋值 那么他就是undefined

 除了定义不给值之外 还有可以直接赋值undefined

**object类型**

```
 	// 可以放多个数据
    // 除了定义多个变量之外 还可以定义一个容器
    var obj = {
        // 定义了一个 对象 
        // 对象是属性的无序集合
        name:'zhangsan',
        age:"18"
    }
    // 访问对象上属性的时候 需要打点访问
    console.log('对象的名字是'+obj.name);
	数组就是一个object类型
 null
 null就表示一种数据类型  对应的值就只有一个null 
```



## 获取变量数据类型typeof

 var str = '我一个浪荡不羁的男人'; 

console.log(typeof str);

在控制台里看到string

prompt 获取过来的数据默认是字符串类型的

NaN是Number类型

## 数据类型转换

**转为字符串类型**

- 变量.toString()  立即封装

- String(变量) 强制转换

- 加号拼接字符串 变量 + '' 最简单常用的 隐式转换

**转为数字型 重点**

- parseInt(string)函数  将string类型转换成整数数值

parseInt('78.89')，78取整

```
  console.log(parseInt('120px'));//120
  console.log(parseInt('rem120px'))//这个不行 NaN
```

- parseFloat(string)函数  

parseInt('78.11')

- Number() 强制转换函数 将string转换为数值型

Number('12')

- 算术运算

```
符号- * / 语法相同
  console.log(parseInt('120' - 0));
```

**转为布尔型**

Boolean()函数

```
  var flash = Boolean('1');
  console.log(flash);
```

- 代表空 否定的值会被转换为false 如 0 NaN null undefined ' '
- 其余值为true 

if([]) 相当于if(true)

## 标识(zhi)符 关键字 保留字

- 标识(zhi)符

开发人员为 变量 属性 函数 参数 取的名字

标识符不能是关键字或保留字

- 关键字

JS本身已经使用了的字，不能再用他们充当变量名、方法名

if esle case

- 保留字

预留关键字，未来可能成为关键字的词

boolean class package

# 02-运算符和流程控制

## 算术运算符

+ +
+ -
+ *
+ /
+ % 取余

任何数据和NaN运算后，结果都还是NaN



浮点数算数运算有精度问题，先转成整数在运算

== ，所以不能直接判断两个浮点数相等

++num --num

## 赋值运算符

- =
- +=  var age=10; age+=5;//15

- *= /= %=  

```
var age=2; age*=5;//10
```

右结合性，

## 前置自增和后置的区别

num++ ++num

1. 单独使用 效果一样

2. 进行赋值时

   - ++num 是先自加1， 后参与运算 

   - num++ 是先用原值参与运算， 后自加1 

## 关系运算符

\> < >= <=  == != 

全等 ===  要求值和数据类型都一致, 不全等!==

注意

-  对于非数值类型来说 会先转换成数值类型进行判
- 对于关系运算符来说 任何数据和NaN做对比得时候 返回得都是false
- 如果参与比较得是字符串类型 那么就不会换成数值了 而是直接作比较 比较得是对应得unicode编码

## 逻辑运算符 && || !

- && 与
- || 或
- ！ 非

短路运算

当有多个表达式时，左边的表达式值可以确定结果时，就不再继续运算右边的表达式

1.逻辑与短路运算 123 && 456 返回456

- 如果表达式1 结果为真，则返回表达式2
- 如果表达式1 结果为假，则返回表达式1

2.逻辑与短路运算 123 || 456 返回123

- 如果表达式1 结果为真，则返回表达式1，
- 如果表达式1 结果为假，则返回表达式2



## 运算符优先级

优先级

1. 小括号 ()
2. 一元运算符 ++ -- !
3. 算数运算符 先乘除后加减
4. 关系运算符 > >=
5. 相等运算符 ==  !=
6. 逻辑运算符 先&& 后||
7. 赋值运算符 =
8. 逗号运算符 ,

## 流程控制-

- 顺序执行
- 分支结构
- 循环控制

if

if(条件表达式){

}else



三元	表达式

条件表达式 ? 表达式1 : 表达式2

```
  var age=14;
  alert( age >= 18 ? '可以上网吧' : '未满18岁禁止入内')
```

switch

switch(表达式){

​	case value1；

​		执行语句1;

​		break;

​	case value2；

​		执行语句2;

​		break;

​	default:

​		执行最后的语句;

}	

```
var sex='女';
switch(sex){
  case '男':
    alert('你是一个男生');
    braak;
  case '女':
    alert('你是一个女生');
    braak;
   .default:
    alert('你不会是人妖吧');
}
```

注意

- 变量的值必须与case里面的值全等 
- 如果当前的case里没有break则不会退出switch 继续执行下一个case

for循环

for(初识化变量；条件表达式；操作表达式){

​		执行语句

}

```
for(var age = 0;age <= 18;age++){
    console.log('你已经'+age+'岁了');
    if(age == 18){
      console.log('你可以去网吧了');
    }
}
```

断点调试

浏览器里的检查，source 行数点击

注意：

- 循环两可以写到外面

- 循环变化可以写外面

```
  var sum=0;
  var i=0;
  for(;i<=100;){
  sum+=i;
  i++;
  }
```

for死循环

```
  for(;;){
  }
```

while循环

while(条件表达式){

​	执行代码

}

while(true){

​	死循环

}

do.. while

do{

​	执行语句

}while(条件语句)

先执行一次，再判断

```
do{
  console.log("how are you");
  if( i >= 5 ){
    console.log("fuck you!");
    break;
  }
  console.log("i am fine");
  i++;
}while( i < 6 )
```

## 关键字

continue 跳过本次，继续执行循环

break  跳出循环

# 03-数组

## 数组的创建

- var 数组名 = new Array(); 
- var 数组名 = [];
- var 数组名 = [12,'小黑',true];

var arr = new Array();// 创建了一个空的数组

var arr = new Array(2);// 2表示数组的长度为2

var arr = new Array(2,3);//等价于[2,3]

## 获取数组元素

数组名[索引号]

console.log(arr[0])；

没有要找的数组元素时，输出结果是 undefined

数组中的元素 并不一定非要是一个数据类型完全可以是多个数据类型

## 遍历数组

数组长度 length

```
    var student = ['小明','朱老板','小陆'];
    for( i = 0; i < student.length ; i++){
        console.log(student[i]);
    }
```

## 添加数组元素

- 可以通过修改length长度来实现数组扩容的目的

```
   var student = ['小明','朱老板','小陆'];
   student.length = 5;
```

- 可以通过修改数组索引新增数组元素

```
	var student = ['小明','朱老板','小陆'];
	student[3] = '波哥';
```

- push(新元素)

数组末尾添加元素

```
            var arr = [1, 2, 3];
            // arr.push(4);
            console.log(arr.push(4, '小明'));// 5
            console.log(arr);
```

特点：push完毕之后，返回的结果是新数组的长度

- unshift()

给数组前面追加新的元素

```
            arr.unshift('阿里巴巴');
            console.log(arr);//['阿里巴巴', 1, 2, 3, 4, '小明']
```

特点：unshift完毕之后，返回的结果是新数组的长度

## 删除数组元素pop shift splice

**pop()**

删除数组最后一个元素

```
 			arr.pop();
            console.log(arr);//['阿里巴巴', 1, 2, 3, 4]
```

注意 返回的是删除的元素

**shift()**

删除数组第一个元素

注意 返回的是删除的元素

**splice**

- 删除特定的元素splice
- splice 截取 有两个参数 第一个参数是开始截取的下标  第二个参数是要截取的长度
- 返回值是你截取的那一段数组

```
        var arr = [1, 2, 3];
        var newArr = arr.splice(1,2);
        console.log(newArr);//[2,3]
```

## 提取数组 slice

**slice()**

- slice 不会修改原数组

- slice(stard,end)

- 返回一个新的数组，包含从 start（包括该元素） 到 end （不包括该元素）的 array 中的元素。

```
        var arr = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
        var newArr = arr.slice(1, 3);
        console.log(newArr);["Orange", "Lemon"]
```

*

## 获取数组元素索引indexOf()

- indexOf() 数组中查找给定元素的第一个索引 存在返回索引值 不存在返回-1
- LastIndexOf() 给定元素在数组中的最后一个索引 存在返回索引值 不存在返回-1

```
    var str="Hello world, welcome to the universe.";
    var n=str.indexOf("e");// 1
```



## 冒泡排序

思想：每次从数组中找到最大值放在数组的后面去，假设这个数组的长度为n,要找（n-1）次最大值第i次找最大值需要比较（n-i）次 外层循环（n-1）次，内层循环（n-i）次

```
var a = [5, 2, 3, 1];
var b;
for (var i = 1; i < a.length ; i++)
    for (var j = 0; j <a.length-i  ; j++) {
        if (a[j] > a[j+1] ) {
            b = a[j];
            a[j] = a[j+1];
            a[j+1] = b; 
        }  
    }
// 输出结果
for (var i = 0; i < a.length; i++) {
    console.log(a[i]);
  }
```

## 数组转为字符串

1.toString();

```
var arr = [1,2,3];
console.log(arr.toString());
```

2.join(分隔符)

```
var arr = [1,2,3];
console.log(arr.join());
console.log(arr.join('-'));
```

## 分割字符串

.split(参数1，参数2)  用于把一个字符串分割成字符串数组。



.substr(参数1，参数2)  参数一分割起始位置，参数2分割长度，不写截取到最后

分割后还是字符串

# 04-JS函数

函数：封装一段可被重复调用执行的代码块，通过此代码块实现大量代码的重复使用



## 函数的声明和使用

1.声明函数

function 函数名(){

​	函数体

}

```
function fn(){
  console.log(arguments);
}
fn(1,2,3);
```

 2.var gn=function(){

  }

3.var kn = new Function('x','y','return x+y')

  // console.log(kn);

```
return 1.结束函数 2.把return 后面的值返回到 函数调用处
    // 如果没有返回值  返回值是undefined
    // 1.有参有返 2.有参无返 3.无参有返 4.无参无返
```

2.调用函数

fn(3)(4);如果fn(3) 返回一个函数地址，fn(3)(4)表示调用fn(3)这个返回函数，函数fn(3)的形参赋值是4

函数名();

```
//1到a的和
function sum(a){
  var s = 0 ;
  for (var i = 1; i <= a ; i++)
    {
      s=s+i;
    }  
    console.log(s);
}
sum(10);
```



2.函数表达式(匿名函数)

var 变量名 = function(){

}

```
 var fun = function(a){
  console.log('我是函数表达式');
  console.log(a);
 }
 fun('我是小明');
```

注意

- fun是变量名 不是函数名
- 函数表达式和声明变量差不多
- 函数表达式也可以传递参数

## 函数的参数

function 函数名(形参1，形参2....){

​	

}

函数名(实参1，实参2...)



形参是接受实参的，类似于变量，只是不用声明

<b>函数形参和实参个数不匹配问题</b>

```
    function getSum(sum1,sum2){
        console.log(sum1 + sum2)
      }
```



- 如果实参个数多于形参的个数 	会取到形参的个数

```
getSum(1,2,3);//结果是 3
```

- 如果实参的个数小于形参的个数  会返回NaN not a number

```
getSum(1);// 
形参可以看作不用声明的变量，sum2是一个变量但是没有接受值 undefined
值+undefined 结果就是 NaN
```

## 函数的返回值return

**return**

让函数将值返回给调用者	函数名()

```
function 函数名(){
	return 需要返回的结果;
}
函数名();
```

```
function sum(a){
  var s = 0 ;
  for (var i = 1; i <= a ; i++)
    {
      s=s+i;
    }  
    return s
}
console.log(sum(10));
```

**return终止函数**

- return后面的代码不会执行
- return只能返回一个值	如果用逗号隔开多个值，以最后一个为准

```
function sum(a,b){
    return a,b;
}
console.log(sum(1,0));// 输出0

// 数组会被看做一个值
function sum(a,b){
    return [a+b,a-b,a*b,a/b];
}
console.log(sum(10,2));//输出[12, 8, 20, 5]
```

注意：

- 有return 返回return后面的

- 如果函数没有return 返回undefined

- return 不仅可以退出循环，还能够返回return语句中的值，同时结束当前函数体的代码

## arguments使用

arguments对象中存储了传递过来的所有实参

arguments展示形式是一个伪数组，可以被遍历，伪数组特点

- 具有length属性
- 按索引方式存储数据
- 不具有数组的push pop等方法

```
function fn(){
  console.log(arguments);
}
fn(1,2,3);
```



## JS的两种作用域

作用域：变量的可用代码范围

es6之前

- 全局作用域

全局作用域下var声明的变量

特殊情况下，在函数内部使用var声明的变量也是全局变量（不建议）

作用域整个script标签，或者一个单独的js文件

- 局部作用域

在函数内部定义的变量，作用域就是这个函数

<b>全局变量和局部变量的区别</b>

- 全局变量   浏览器关闭的时候才会销毁，比较占内存资源
- 局部变量   程序执行完就会销毁



JS目前没有块级作用域

es6才有

块级作用域是{}

```
if(){
	int num = 10;
}
```

# 06-对象

## 立即封装

一个不是引用类型的数据被打点调用，会立即把它封装成一个对象

-----------------------------------------------------------------------------------------------------------------------------

JS对象：一组无序的相关属性和方法的集合

分为自定义对象 内置对象 浏览器对象

- 属性 事物的特征，名词
- 方法 事务的行为，动词

## 创建对象(object)

- 对象字面量创建对象

对象字面量：{}里面包含了表达这个具体对象的属性和方法

var obj = {};

```
var obj={
    name:'小明',
    age:22,
    sex:'男',
    say:function(){
        confirm('你好');
    }
}
console.log(obj.name);//方法1
console.log(obj['age']);//方法2
obj.say();
```



- new Object创建对象

var obj = new Object();

- 利用 等号 = 赋值的方法，添加对象的属性和方法

```
var obj = new Object();
obj.name = '小明';
obj.age = 22;
obj.sex = '男';
obj.say = function(){
    console.log('hi~');
}
```

- 构造函数创建对象

构造函数可以批量构造对象

function 构造函数名(){

  this.属性=值;

  this.方法 = function(){}

}

new 构造函数名();

```
function Star(name,age,sex){
    this.name=name;
    this.age=age;
    this.sex=sex;
    this.hobby = function(play){
    	console.log(play);
    }
}
var s = new Star('刘德华',18,'男');
s.hobby('打电动');
```

- 构造函数名字首字母大写
- 构造函数不要return就可以返回结果
- 调用构造函数必须使用new
- 属性和方法前面必须添加this



删除对象属性

```
 delete tea.project;

  console.log(tea);
```

new关键字执行过程

1. 在内存中创建一个新的空对象
2. 让this指向这个新的对象
3. 执行构造函数里面的代码，给这个新对象添加属性和方法
4. 返回这个新对象（所以构造函数不需要return）



## 遍历对象

for...in语句对于数组或对象的属性进行循环操作

for (变量 in 对象){

}

```
function Star(name,age,sex){
    this.name=name;
    this.age=age;
    this.sex=sex;
    this.hobby = function(play){
    	console.log(play);
    }
}
var s = new Star('刘德华',18,'男');
s.hobby('打电动');
for( var k in s){
    console.log(k);// 输出的属性名
    console.log(s[k]);//输出属性值
    //不遍历方法
}
```

console.dir是专门用于打印对象的属性和方法

console.dir(str)

# 07-内置对象

简介：内置对象就是JS语言自带的一些对象，提供的一些常用或最基本必要的功能

Math Date Array String等

## Math对象

数学对象Math,可以直接调用里面的属性和方法

```
console.log(Math.PI);//属性 圆周率
console.log(Math.max(11,99,66));
console.log(Math.max(11,99,'男'));//返回NaN
console.log(Math.max());// -Infinity
```

其他方法

- Math.floor() 向下取整
- Math.ceil()    向上取整
- Math.round() 四舍五入 就近取整 -3.5 结果是-3
- Math.abs() 绝对值

```
console.log(Math.abs('12'));//12
console.log(Math.abs('ads'));//NaN
```

### Math随机数方法random()

- random() 返回一个随机的小数 0 =< x < 1

- 方法里不用跟参

```
console.log(Math.random());
```

- 得到两个数之间的随机整数，且包含这两个整数

Math.floor(Math.random() * (max -min + 1)) + min;

## Date日期对象

Date() 日期对象是一个构造函数，必须使用new来创建我们的日期对象

- var date = new Date();

```
var date = new Date();
console.log(date);//返回系统的当前时间
```

- var date = new Date(2019,10,1);或者var date = new Date('2019-10-1');

  ```
  var date1 = new Date(2019,10,1);
  console.log(date1);//返回11月
  var date2 = new Date('2019-10-1 8:8:8');//正常时间
  console.log(date2);
  //Tue Oct 01 2019 08:08:08 GMT+0800 (中国标准时间)

  
  ```
  

### 日期格式化



![](https://i0.hdslb.com/bfs/new_dyn/434170a64fc9a41e7e54282ffe9eb0c4562431495.png@1554w.webp)

```
var date = new Date();
console.log(date.getFullYear());// 2022
console.log(date.getMonth());// 7 该是8
console.log(date.getDate());// 16
console.log(date.getDay());// 2
console.log(date.getHours());// 14
console.log(date.getMinutes());//15
console.log(date.getSeconds());//21
```

案例：要求封装一个函数返回当前的时分秒 格式 08：08：08

```
        function getTime(){
            var time = new Date();
            var h = time.getHours();
            h = h < 10 ? '0' + h : h;
            var m = time.getMinutes();
            m = m < 10 ? '0' + m : m;
            var s = time.getSeconds();
            s = s < 10 ? '0' +s : s;
            return h + ':' + m + ":" + s;
        }
        alert(getTime());
```

### Date时间戳

日期的总的毫秒形式

从1970年1月1日开始的时间总的毫秒值

```
        var date = new Date();
        console.log(date.valueOf());//1660658441930
        console.log(date.getTime());//1660658441930

        var date1 = +new Date();
        console.log(date1);

        console.log(Date.now());
```



## 数组对象

### 两种创建方式

1. 数组字面量

var arr = [1,2];

2. new Array();



### 检测是否为数组

instanceof

```
        // instanceof 运算符，可以用来检测是否为数组
        var arr1 = [];
        var arr2 = {};
        console.log(arr1 instanceof Array);//true
        console.log(arr2 instanceof Array);//false
```

Array.isArray(参数) H5新增 ie9以上支持

```
        // Array.isArray(参数)
        console.log(Array.isArray(arr1));
```



## 字符串对象

```
var str = 'andy';
console.log(str.length);//4
```



# 08-DOM

DOM是什么？ 是标准文档流模型 Document Object Model

- 文档对象模型
- 顶级对象document
- 学习操作页面元素
- W3C标准规范

节点 node

nodeType 表示的就是 节点的类型

```
 	// 元素 就是一个完整的标签
    // 节点 构成元素的某一部分 
    var oDiv = document.getElementById('box')
    console.dir(oDiv)
    console.log(oDiv.nodeName);//表示节点名  和你的标签名保持一致
    console.log(oDiv.nodeValue);//null
    console.log(oDiv.nodeType);//节点类型
        // 常见的节点类型 
        // 元素节点 返回值为1
        // 属性节点 返回值为2
        // 文本节点 返回值为3
        // 换行节点
        // 注释节点 返回值为8
```

```
    // document 实际上是一个 内置的对象 是原本我们window上就有的
    console.log(document);
    console.log(window.document);
    // 对象的打印
    console.dir(document)
    // head的打印
    console.log(document.head);
    console.dir(document.head);
    // title的打印
    console.log(document.title);
```



## 获取元素节点的操作

**var的标量不太好用，用let**

<b>通过ID</b>

```
    // 特点 id具有唯一性 只拿一个 拿到的就是DOM节点
    // 如果一个id的元素有多个 那我只拿第一个
    var box = document.getElementById('box');
    console.log(box);
```

<b>通过class名</b>

```
	// 通过class名获取 class就叫名字 可以重复
	// 特点 我们通过class拿到的是一个数组 如果只有一个元素的话  拿到的也是数组 只不过长度是1
    var box1 = document.getElementsByClassName('box')[0];
    console.log(box1);
```

<b>通过标签名</b>

```
    // 特点 标签名可以重复 所以这里拿到的也是一个数组
    var box2=document.getElementsByTagName('div')[0];
    console.log(box2);
```

<b>通过name</b>

```
    // 4.通过name去拿到我们的元素
    var box3=document.getElementsByName('box1');
    console.log(box3);
```

<b>querySelectorAll</b>

```
    // 拿到参数选择器能选中的所有的，也是数组
	var box4=document.querySelectorAll('[name="box1"]');
    var box5=document.querySelectorAll('.box');
    var box6=document.querySelectorAll('#box');
    var box7=document.querySelectorAll('div');
    console.log(box4);
```

<b>querySelector</b>

```
    // 拿到参数选择器选中的第一个 并且直接是一个dom节点
    var box8=document.querySelector('.box');
    console.log(box8);
```

<b>getAttribute 自定义</b>

```
	// getAttribute('自定义属性名')
    // 返回值是你要查找的属性的值
    console.log(div.getAttribute('abc'));
```

<b>获取body元素</b>

```
	var bodyEle = document.body;
    console.log(bodyEle);
```

<b>获取html元素</b>

```
	var htmlEle = document.documentElement;
	console.log(htmlEle);
```



## 设置元素节点

setAttribute('你要设置的属性名','属性值')

```
    <div id="box"  abc="123">我是一个div</div>

    // 1.获取元素节点
    var div = document.getElementById('box');
    // 2.setAttribute设置属性节点的操作
    // div.setAttribute('你要设置的属性名','属性值')
    div.setAttribute('abc',456)
    console.log(div);
```

setAttribute 转的东西会吧属性值转成字符串，如果取设置布尔值的话不能用这个，要么不生效（''），要么全是true

**classList**

classList 是一个数组  是这个元素上的类名

在其上面还有2个方法  一个是  移除类remove('类名') 添加类add('类名')

```
lis[j].classList.remove('on')
  this.classList.add('on')
```

**.style 行内样式操作** 

样式少的话

```
        div{
            width: 300px;
            height: 300px;
            background-color: pink;
        }

   		<div></div>
    
        // 1. 获取元素
        var div = document.querySelector('div');
        // 2. 注册事件 处理程序
        div.onclick = function(){
            this.style.backgroundColor = 'orange';
        }
```

注意：

- JS修改style样式操作产生的是行内样式，CSS权重比较高

**修改表单属性**

- value 修改表单里面的值
- disabled ：表示表单被禁用 disabled禁用button
- type 表单的类型也这样写

```
    <button>修改按钮</button>
    <input type="text" value="输入内容">

        // 1. 获取元素
        var input = document.querySelector('input')
        var btn = document.querySelector('button')
        // 2. 注册事件 处理程序
        btn.onclick = function(){
            input.value = '你被强化了快上'
            //表示表单被禁用 disabled禁用button，只能点击一次
            //btn.disabled = true; //和下面效果一致
            this.disabled = true;
            // this指向的是事件函数的调用者
        }
```

**修改元素内容**

- .innerText  不识别HTML标签 会把标签也带进去

```
    <button id="btn">我是按钮，点我div改变</button>
    <div>某个时间</div>

        var btn = document.getElementById('btn');
        var div = document.querySelector('div');
        btn.onclick = function(){
            div.innerText = '2020-8-20';
        }
     	//也可以直接修改
      	var div = document.querySelector('div');
        div.innerText = '2020-8-20';
```

- .innerHTML 识别HTML标签 用的多

```
    	<div></div>
        var div = document.querySelector('div');
       
        div.innerHTML = '<strong>我被加粗了</strong>';
```

这两个属性是可读的，可以获取元素里的内容

```
    	<div>我就是太阳</div>

        var div = document.querySelector('div')
        alert(div.innerHTML)//我就是太阳

```



## 节点之间的关系

<b>子元素拿到父元素</b>

```
	// parentElement父元素 parentNode父节点
    console.log(son.parentElement);
    console.log(son.parentNode);
```

<b>拿到子节点</b>

```
    // firstElementChild第一个元素子节点 firstChild 第一个节点
    console.log(father.firstElementChild);
    console.log(father.firstChild);
    
    // lastElementChild拿到最后一个元素子节点 lastChild 拿到最后一个节点
    console.log(father.lastChild); 
    console.log(father.lastElementChild); 
```

<b>拿到下一个节点</b>

```
    console.log(son.nextElementSibling);
    console.log(son.nextSibling);
```

<b>拿到上一个节点</b>

```
    console.log(son.previousElementSibling);
    console.log(son.previousSibling);
```

## 创建节点

```
    // 需求  当我点击按钮的时候 会出现一个新的节点 内容是当前的时间
    var btn = document.getElementById('btn');
    btn.onclick=function(){
        // 1.拿到了当前时间
        // 2.创建了一个节点 把时间写进去
        // 3.把这个节点挂在到body中
        var date = new Date();
        console.log(date);

        // 创建一个标签
        var div = document.createElement('div');
        // 把内容写到div里面
        div.innerHTML=date;
        console.log(div);
        // 把这个标签挂载到页面上
        document.body.appendChild(div) // prepend 则是加到内部第一个位置
    }
```

## 删除节点

.remove()

```
    <button id="btn">点我一下，我就消失</button>

    var btn = document.getElementById('btn');
    btn.onclick=function(){
        // 点击之后 要把按钮删掉
        this.remove()
    }
```

- 移除属性

  .removeAttribute('属性名')

```
        div{
            width: 300px;
            height: 300px;
            background: orange;
        }
        .div1{
            background-color: pink;
        }

    	<div class="div1" index="123"></div>

        // 1. 获取元素
        var div = document.querySelector('div')
        div.removeAttribute('class');//背景变色了
        alert(div.getAttribute('index'))//123
        div.removeAttribute('index');
        alert(div.getAttribute('index'))//null
```

# 09-事件高级

之前

事件源  事件被触发的对象，谁 按钮

var btn = document.getElementById('btn');

事件类型  如何触发 什么事件

btn.onclick

事件处理程序（监听器）  通过一个函数赋值的方式完成

function(){

}

## 注册事件（绑定事件）

1.传统方法

- 利用 on 开头的事件 onclick

- ```
   <button onclick="alert('hi~')">hi~</button>
  ```

- btn.onclick=fuction(){}
- 同一个元素的同一个事件只能设置一个处理函数，最后注册的处理函数将会覆盖前面注册的处理函数

2.方法监听注册

- w3c标准 推荐方式

- ```
  btn.addEventListener() 方法
  ```

- IE9之前不支持此方法，可以用attachEvent()替代
- 同一个元素的同一个事件可以注册多个监听器，监听器按注册顺序依次执行

.addEventListener( type, listener, 参数三)的使用

- type 事件类型字符串 如 click 不需要带on
- listener 事件处理函数
- 第三个是布尔值，默认false 

```
 btn.addEventListener('click',function(){})
 btn.addEventListener('click', fn )
 function fn(){}
```



## 删除事件（解绑事件）

1.针对传统注册方式

```
btn.onclick = null;
```

2.方法监听注册方式

```
 btn.addEventListener('click', fn )
 function fn(){}
// 删除事件
   btn.removeEventListener('click',fn);
```

## DOM事件流

事件传播的过程

![](https://i0.hdslb.com/bfs/new_dyn/3018761095bdcba200a14490935ecbf1562431495.png@1554w.webp)

## 事件对象

```
var div = document.getElementsByTagName('div');
div.onclick = function(e){}
//1.e就是一个事件对象， 当形参来看
//2.事件对象只有有了事件才存在，它是系统自动创建给我们的，不需要我们传递参数
//3.事件对象是事件的一系列相关数据的集合 比如鼠标坐标 键盘事件的信等等
```

<b>e.target 和 this的区别</b>

e.target 返回 触发 事件的对象

this 返回的是绑定事件的对象

```
    <ul>
        <li>abc</li>
        <li>abc</li>
    </ul>

    var ul = document.getElementsByTagName('ul')[0];
    ul.addEventListener('click', function(e){
       console.log(this);//ul
       console.log(e.target);//li
    })
```

<b>e.preventDefault()  阻止默认行为</b>

或者 return false；

```
    <a href="">跳转</a>
    
    var a = document.getElementsByTagName('a')[0];
    a.addEventListener('click', function(e){
        e.preventDefault();//这个a标签不会跳转了
    })
```

## 阻止事件冒泡

<b> e.stopPropagation(); 阻止事件冒泡</b>

去掉事件冒泡带来的坏处

执行完这个事件，就不再往上冒泡

```
    <div class="box">
        <a href="">跳转</a>
    </div>

    var box = document.getElementsByClassName('box')[0];
    box.addEventListener('click', function(e){
        console.log(123);
    })
    var a = document.getElementsByTagName('a')[0];
    a.addEventListener('click', function(e){
        e.preventDefault();//阻止a标签的默认跳转
        console.log(456);
        e.stopPropagation();//阻止a标签结束后向上冒泡
    })
// 最后控制台只输出456    
```

## 事件委托

事件冒泡带来的好处

<b>事件委托的原理</b>

不是给每个子节点单独设置事件监听器，而是事件监听器设置在父节点上，利用冒泡原理影响设置每一个子节点

<b>事件委托的作用</b>

只操作了一次DOM，提高了程序的性能

**具体方法**

给 ul 注册点击事件，然后利用事件对象的target找到当前点击的 li ,因为点击 li ,事件会冒泡到ul 上，ul 上有注册事件，就会触发事件监听器

```
    <ul>
        <li>abc</li>
        <li>efg</li>
    </ul>
    // 点击哪一个li,就把这一行的背景颜色变成pink
    var ul = document.getElementsByTagName('ul')[0];
    var li = document.getElementsByTagName('li');
    ul.addEventListener('click', function(e){
        e.target.style.backgroundColor='pink';
    })
```



## 常用鼠标事件

<img src="https://i0.hdslb.com/bfs/new_dyn/da17da45230572540aa177812a6586d2562431495.png@1554w.webp" style="zoom: 67%;" />

**mouseenter 和 mouseover 鼠标事件的区别**

- mouseenter只会自身自身触发 mouseenter不会冒泡

- mouseover 鼠标经过自身盒子和子盒子都会触发

- 跟 mouseenter 搭配鼠标离开事件 mouseleave 也不会冒泡

**禁止右键菜单** 

contextmenu 主要控制应该何时显示上下文菜单

```
document.addEventListener('contextmenu', function(e){
	e.preventDefault();
})
```

**禁止选中文字**

selectstart 开始选中

```
document.addEventListener('selectstart', function(e){
	e.preventDefault();
})
```

**获得鼠标在页面中的坐标**

![](https://i0.hdslb.com/bfs/new_dyn/d82d1c41ed71d6d438624809feab941a562431495.png@1554w.webp)

鼠标事件坐标

```
    document.addEventListener('click', function(e){
        // 可视区
        console.log(e.clientX);
        console.log(e.clientY);
   })
```

**e.pageX相对于文档页面，是相对整个body的内容的坐标**

**跟随鼠标案例**

```
        img{
            position: absolute;
        }

    <img src="./images/favicon.ico" alt="">
    
    var pic = document.getElementsByTagName('img')[0];
    document.addEventListener('mousemove', function(e){
       var x = e.pageX;
       var y = e.pageY;
        pic.style.left = x + 'px';
        pic.style.top = y + 'px';
   })
```



## 常用键盘事件

![](https://i0.hdslb.com/bfs/new_dyn/c40cc8c167b7dcf24f5c4072fceaf080562431495.png@1554w.webp)

**keyCode判断用户按下哪个键**

键盘事件对象中的keyCode属性可以得到相应键的ASCII值

1.keyup 和 keydown 事件不区分字母大小写

2.keypress 区分大小写



# 10-BOM

## BOM概述

- 浏览器对象模型
- 顶级对象是 window，比DOM更大一些
- 学习浏览器窗口交互的一些对象
- BOM是浏览器厂商在各自浏览器上定义的，兼容性较差

window 是 js 访问浏览器窗口的一个接口

window 是一个全局对象，定义在全局作用域中的变量、函数都会变成window对象的属性和方法

## window对象的常见事件

**窗口加载事件**

window.onload = function(){}

- 有了它，JS代码可以放在任何地方, onload 是等页面全部加载完毕，再去处理函数

- window.onload  传统注册方式只能写一次，有多个会以最后一个为准
- 使用addEventListener 则没有限制

```
  <script>
        window.onload = function(){
            // JS代码
       }
    </script>
```

document.addEventListener('DOMContentLoaded',function(){})

这个DOM加载完就可以了，不包括样式表 图片 flash，用于加载东西多的网站，

**调整窗口大小事件**

window.onresize = function(){}

-  只要窗口大小发生变化就会触发这个事件
- 可以利用这个完成响应式布局，window.innerWith 当前屏幕的宽度

```
        div{
            background: pink;
            width: 100px;
            height: 100px;
        }

    	<div></div>

        var d = document.querySelector('div');
        window.onresize = function(){
            if(window.innerWidth < 800){
                d.style.display = 'none';
            }else{
                d.style.display = 'block';
            }
        }
```



## 定时器

**setTimeout()一次性定时器**

window.setTimeout(调用函数, 延迟的毫秒数) window可以省略

时间一到，执行函数，只执行一次

clearTimeout(定时器名字) 只清除最后一次的setTimeout

```
    var timer;
    var btn = document.getElementsByTagName('button');
    btn[0].onclick = function () {
    	// 多次点击的话取消之前的定时器,不然速度会越来越快
    	clearInterval(timer);
        timer = setTimeout(function () {
            console.log(123);
        }, 5000)
    }
    btn[1].onclick=function(){
        clearTimeout(timer)
    }
    // 虽然说我们一次性定时器他只执行一次 但是我们最好还是用完之后给他清空一下
```

**setInterval()**

setInterval(回调函数, 延迟的毫秒数)

每隔一段时间 调用一次

clearInterval(定时器名字) 关闭定时器

## this指向问题

一般情况下this的最终指向的是那个调用它的对象

1.全局作用域或者普通函数中this指向全局对象window，定时器就是window

2.方法中谁调用谁调用this指向谁

3.构造函数中this指向构造函数的

## JS同步和异步

js是单线程语言，一个事件只能做一件事，容易造成运行阻塞

为了解决这个问题，利用多核cpu的计算能力，HTML5允许JS脚本创建多个线程，出现了同步和异步

- 同步：前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的
- 异步：再多一件耗时间的事情时，还可以同时做其他事情



- 同步任务都在主线程上执行，形成一个执行栈
- JS的异步任务是通过回调函数实现的

**异步任务的类型**

1. 普通事件，如click 
2. 资源加载 load error
3. 定时器 setInterval 和 setTimeout

异步任务放到任务队列里

## JS执行机制

1. 先执行同步任务
2. 异步任务放入任务对列 先不执行
3. 一旦执行栈中的所有同步任务执行完毕，系统按次序读取 任务队列 ，异步任务结束等待状态，进入执行栈，开始执行

**事件循环**

主线程不断重复的获得任务、执行任务、再获取任务、再执行的这种机制被称为 事件循环

## location对象

window对象提供一个 location属性 用于获取或设置窗体的URL，也能解析URL，因为这个属性返回的是一个对象，所以这个属性也称为location对象

**URL**

统一资源定位符，是互联网上标准资源的地址，唯一，指出文件的位置以及浏览器怎么处理它

语法格式

![](https://i0.hdslb.com/bfs/new_dyn/182fe5ac6af0c35cc6733ae448da0fee562431495.png@1554w.webp)

**location对象的属性**

![](https://i0.hdslb.com/bfs/new_dyn/6ac2180fef2e503e0cd0de97b4dab9c6562431495.png@1554w.webp) href 和 search

**location对象的方法**

![](https://i0.hdslb.com/bfs/new_dyn/acd726b807cb0ffcaddc54befb9b9e05562431495.png@1554w.webp)

## navigator对象

![](https://i0.hdslb.com/bfs/new_dyn/ed71bc372fabe71347e656203b2b53ac562431495.png@1554w.webp)

## history对象

![](https://i0.hdslb.com/bfs/new_dyn/3884bf5364277f44943caa9fc2dca7ad562431495.png@1554w.webp)



# 11-PC端网页特效

## 元素偏移量offset

**offset概述**

可以 动态 获得该元素的位置偏移 、大小等

- 获得元素距离带有定位父元素的位置
- 获得元素自身1的宽高
- 返回的值都不带单位

![](https://i0.hdslb.com/bfs/new_dyn/c65799f8d9c345311689bc597dc0943d562431495.png@1554w.webp)



```
    var box =  document.getElementsByClassName('box')[0];

    // offsetWidth 占地宽
    console.log(box.offsetWidth);
    // offsetHeight 占地高
    console.log(box.offsetHeight);
    // offsetParent 默认定位的坐标系(和之前定位position找坐标系一样) 默认就是body
    console.log(box.offsetParent);
    // offsetTop 相对于offsetParent 或者说 相对于整个页面
    console.log(box.offsetTop);
    // offsetLeft 相对于页面左侧
    console.log(box.offsetLeft);
```



**offset 和 style 区别**

offset

- 获得的数值是没有单位的
- offsetWidth包含padding+border+width

style

- 只能得到行内样式表中的样式值
- style.width获得的是带有单位的字符串
- style.width不包含padding和border的值

## 元素可视区 client

client 就是客户端

![](https://i0.hdslb.com/bfs/new_dyn/245432806cbfec7c99f103ed278f165c562431495.png@1554w.webp)

```
    var box =  document.getElementsByClassName('box')[0];
    console.dir(box)
    // client系列 只有四个属性
    // clientWidth 内部的宽
    console.log(box.clientWidth);//600
    // clientHeight 内部的高
    console.log(box.clientHeight);//600
    // clientLeft 左边边框的粗细
    console.log(box.clientLeft);
    // clientTop 上面边框的粗细
    console.log(box.clientTop);
```

**屏幕高度**

```
 var ch = document.documentElement.clientHeight;
```



## 元素滚动 scroll

获得该元素的大小、滚动距离

类似一个握成卷的纸

![](https://i0.hdslb.com/bfs/new_dyn/67af339ed1c30c0878186777a7604a4b562431495.png@1554w.webp)

scrollHeight 包含文字的超出部分高度

```
// 如何拿到整个页面？ document.body
    var bodys = document.body;
    console.log(bodys.clientHeight);
    
    var box=document.getElementById('box')
    // scroll系列
    // scrollHeight 包含文字的超出部分高度
    console.log(bodys.scrollHeight);
    // srcollTop 卷上去的高度
    console.log(bodys.scrollTop);
    box.onscroll=function(){
        console.log(box.scrollTop);
    }

    // 如何求屏幕滚动的高度？
    bodys.onscroll=function(){
        console.log(document.documentElement.scrollTop);
    }
```

**屏幕滚动事件**

```
		// 屏幕滚动事件 要写在window.onscroll 事件里面才能一直拿到
        var st=document.documentElement.scrollTop;
```



## 动画函数封装

**核心原理**：通过定时器setInterval() 不断移动盒子位置

实现步骤： 

- 获得盒子的当前位置
- 让盒子在当前位置上加上一个移动距离
- 利用定时器不断重复这个操作
- 加一个结束定时器的条件
- 注意此元素需要添加定位，才能使用element.style.left





















































































































































































