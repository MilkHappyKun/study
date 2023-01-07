### 00_TS简介

**TS是什么？**

- 一门以 JS 为基础构建的语言
- TS 可以再任何支持 JS 的平台中使用
- TS 不能 被 JS 解析器直接执行，需要把 TS 编译成 JS 才可以运行
- TS 是一个 JS 的超集，TS 扩展了 JS，并添加了类型

**TS增加了什么？**

- 类型
- 添加 ES 不具备的新特性
- 丰富的配置选项

### 01_TS开发环境搭建

1. 安装 Node.js
2. 使用 npm 全局安装 TS 
   - npm i -g typescript
3. 创建一个 .ts 文件
4. 使用 tsc 对 .ts 文件编译
   - 终端进入 .ts 文件的目录
   - 执行命令 tsc 文件名.ts

可以看到由 TS 文件编译出了一个 JS 文件

![](C:\Users\19774\Desktop\截图\QQ截图20230106011113.png)

这时候有个提示错误，代码本身没有问题，血压高就

解决办法

1. 打开设置关闭 TS 代码检查

![](C:\Users\19774\Desktop\截图\QQ截图20230106012726.png)

2. 只打开写代码的 TS 文件，编译出来的 JS 文件不要打开

### 02_TS的类型声明

**类型声明**

- 类型声明是 TS 非常重要的一个特点
- 通过类型声明可以指定 TS 中变量的类型，变量只能存储这种类型的值
- 指定类型后，当为变量赋值时，TS 编译器会自动检查值是否符合类型声明，
- 不符合会报错，这时你仍然可以把 TS 编译成 JS 运行，但学习 TS 就没意义了

**类型声明语法**

```tsx
let bb: number;

let hello: string = "hello TS";

function add(a: number, b: number): number {// 最后的 :number是声明返回值的
    return a + b;
}
```

**自动类型判断**

- TS 拥有自动的类型判断机制
- 当变量的声明和赋值是同时进行时，TS 编译器会自动判断变量的类型
- 所以当变量的声明和复制同时进行时，可以省略类型声明

```tsx
let time = "2023/1/6";
```



### 03_TS中的类型

|     类型      |         例子          |           描述           |
| :-----------: | :-------------------: | :----------------------: |
|    number     |          123          |         任意数字         |
|    string     |         '12'          |        任意字符串        |
|    boolean    |      true,false       |          布尔值          |
|    字面量     |        1，'hi'        |  一个固定的值，无法改变  |
|      any      |           *           |      任意类型，少用      |
|    unknown    |           *           |      类型安全的any       |
|     void      |    空值或undefined    |    没有值或undefined     |
|     never     |        没有值         |       不能是任何值       |
|     array     |        [1,2,3]        |       任意 JS 数组       |
|    object     |    {name:"王小明"}    |       任意 JS 对象       |
| tuple（元组） |      [1,"你好"]       | 已知元素数量和类型的数组 |
| enum（枚举）  | enum Color {R = 1, G} |           枚举           |

- | 可以迎来连接多个类型，表示或

```tsx
let a: string | number;
a = 1;
a = "和";
```

**字面量**

```jsx
let a: 8;
let b: 10 | "hello";

b = 10;
b = "hello";
```



**object**

- 定义object对象时，属性后面加？表示属性可选
- &表示与

```tsx
let user: { name: string, age?: number };
user = {name : '孙悟空'}

// propName可以是随便写的
let a: { name: string, [propName: string]: any };
a = { name: '小明', age: "18", height: "180" };

let user2: { name: string } & { age: number };
user2 = { name: '孙悟空', age: 22 };
```



**unkown**

把一个unknown类型的赋值给其他变量要加上判断，或者使用类型断言，否则会报错

```tsx
let e: unknown;
let k: number;

e = "123";
e = 99;

// 方法一：判断
if (typeof e === "number") {
    k = e;
}
// 方法二：类型断言
k = e as number;
```



**enum枚举**

声明一个枚举类

```
let user: { name: string, gender: Gender };

enum Gender{
    Man = 0,
    Woman = 1
}

user = {
    name: "孙悟空",
    gender: Gender.Man // 表示用户性别
}
```

**类型断言**

有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

1. ```tsx
   let e: unknown = 99;
   let k: number;
   
   k = e as number;
   ```

2. ```
   let e: unknown = 99;
   let k: number;
   
   k = <number>e;
   ```



### 04_TS编译选项

官方地址 [tsconfig.json · TypeScript中文网 · TypeScript——JavaScript的超集 (tslang.cn)](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

**自动编译文件**

- 编译文件时，使用 -w 命令后，TS编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译

- 示例

  ```
  tsc demo.ts -w
  ```

**自动编译整个文件**

- 在项目根目录下创建 tsconfig.json，可以直接使用 tsc 命令自动将当前项目下的所有 ts 文件编译成 js 文件 
- tsconfig.json 是一个 JSON 文件，里面可以写 TS 的编译选项，可以写注释

- 编译选项

  - include （包含）

    - 定义 希望被自动编译的文件目录

    - 默认值：

      - ```
        ["**/*"] 表示任意目录下的任意文件
        ```

        

    - 示例

      - ```
        {
            "include": ["./src/**/*","test/**/*"]
        }
        ```

  - exclude （排除）一般不需要配置

    - 定义 不需要被编译的文件目录
    - 默认值 ["node_modules","bower_components","jspm_packages"]

  - extends（继承）

    - 定义被继承的配置文件
    - 当前配置文件中会自动包含 extends 里 .json 文件的所有配置信息

  - files 

    - 指定需要编译的文件列表，只有需要编译的文件少时才有用

  - compilerOptions（编译器选项）

    - target 编译后的 js 版本，给一个错误可以知道可选值范围
    - module 指定要使用的模块化的规范，给一个错误可以知道可选值范围
    - lib 指定要用到的库，浏览器端不用设置
    - outDir 指定编译后文件所在的目录，一般写 "./dist"
    - outFile 编译后的文件代码合并到一个文件里，结合 webpack 使用
    - allowJs 是否对 js 文件编译，默认 false
    - checkJs 是否检查 js 语法是否符合规范
    - removeComments 是否移除注释
    - noEmit 为 true 时，不生成编译后的文件
    - noEmitOnError 为 true 时，如果代码有错误，不生成编译后的文件
    - alwaysStrict 为 true 时，编译后的 js 代码使用严格模式 ，有模块时默认为严格模式
    - noImplicitAny 为 true 时，不允许隐式 any 类型
    - noImplicitThis 为 true 时，不允许不明类型的 this 
    - strictNullChecks 为 true 时，严格检查所有的空值
      - 解决办法 1 加 if 判断 2 ?. 
    - strict 所有严格检查的总开关，为 true 时，都开开严格检查，需要关闭的手动设置

一般情况下如下即可

```
{   
    "include": ["**/*"],
    // 编译器选项
    "compilerOptions": {
        "target": "ES6",
        "module": "ES6",
        "outDir": "./dist",
        // "strict": false,
        "noEmitOnError": true,
        "alwaysStrict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
    }
}
```



### 05_webpack打包ts代码

**webpack最基本的使用**

- 首先要生成 package.json

  ```
  npm init -y
  ```

  注意，根目录名字不能有中文

- 然后，安装 webpack

  ```
  npm i -D webpack webpack-cli  typescript ts-loader
                   webpack命令行 ts核心包	 webpack加载器	
  ```

- 第三，创建 webpack.config.js 文件，如下

  ```js
  // 引入path,拼接路径
  const path = require("path");
  
  // webpack的所有配置信息都应该写在module.exports中
  module.exports = {
  
      // 指定入口文件
      entry: "./src/index.ts",
  
      // 指定打包文件目录
      output: {
          // 指定打包文件目录
          path: path.resolve(__dirname, 'dist'),
          // 指定打包后的文件名
          filename: "bundle.js", 
      },
  
      // 指定webpack打包时要使用的模块
      module: {
          // 指定要加载的规则
          rules: [
              {
                  // 指定规则生效的文件
                  test: /\.ts$/, // 以ts结尾的文件
                  // 要使用的loader
                  use: 'ts-loader',
                  // 要排除的文件
                  exclude: './node_modules',
              }
          ]
      }
  };
  ```

- 第四步，生成 tsconfig.json

  ```json
  {   
      "compilerOptions": {
          "target": "ES6",
          "module": "ES6",
          "strict": true,
      }
  }
  ```

- 最后，在 package.json 中添加 "build": "webpack"

  ```
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack"
    },
  ```

**类，构造函数，this，继承关系，super关键字在 js 中有讲，一模一样就不赘述了**

### 06_抽象类

- 以abstract开头的类是抽象类

- 抽象类和其他类区别不大，只是不能用来创建对象
- 抽象类就是专门用来被继承的，给别人当父类
- 抽象类可以添加抽象方法,同时也能定义普通方法
  1. 抽象方法使用 abstract 开头，没有方法体
  2. 抽象方法只能定义在抽象类里，子类必须对抽象方法重写

示例

```tsx
// 动物这个抽象类
abstract class Animal{
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract sayHello(): void;
    
    sayName(): void {
        console.log(this.name);
    }
}
// Dog子类
class Dog extends Animal{
    sayHello(): void {
        console.log("wang---------");
        
    }
}

const dog = new Dog("旺财");
dog.sayHello();
dog.sayName();
```



### 07_接口

- 接口用来定义一个类的结构，描述这个类中应该包含哪些属性和方法
- 同时接口也可以当成类型声明去使用
- 接口中的所有属性都不能有实际的值，所有的方法都是抽象方法
- 定义类时可以使类去实现一个接口, implements ,
- 接口就是一个的规范，是对类的限制

示例

```tsx

interface Person{
    name: string,
    age:number
}

interface Person {
    sex: string,
    say():void
}

const one: Person = {
    name: "小明",
    age: 22,
    sex: "男",
    say() {
        console.log("hello ");
    },
};

one.say();

class Man implements Person{
    name: string;
    age: number;
    sex = "男";

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    say() {
        console.log("我是"+this.name,this.sex,this.age);
    }
}

const A = new Man("小明", 18)
A.say();
```



### 08_属性的封装

- 属性在对象中设置，属性可以被任意的修改，会有安全隐患，例如：-100￥
- 在属性前加上不同修饰符 public protected private 可以解决上面的问题
  - public 修饰的属性可以在任意位置访问和修改，默认值
  - protected 修饰的属性只能在自己和子类访问和修改，外部不能
  - private 私有属性，只能在类内部进行访问和修改

示例

```tsx
class Person{
    private _name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.age = age;
        this._name = name;
    }

    setAge(age: number): void {
        if (age > 0 && age < 140) {
            this.age = age;
        }
    }

    getAge(): number{
        return this.age
    }

    setName(name: string): void {
        this._name = name;
    }

    // getName(): string {
    //     return this.name
    // }
    get name(): string {
        return this._name
    }

}

const sun = new Person("孙悟空", 50);
console.log(sun.name,sun.getAge());
```

**注意**

- 把属性名设置为 _name ，getter 写成

  - ```
    get name(): string {
            return this._name
    }
    ```

  - 此时调用 sun.name 并不是直接获取的属性，是走了 getter 方法

- 此时会有一个报错

![](C:\Users\19774\Desktop\截图\QQ截图20230107041453.png)

**解决办法**

在命令行指定编译的版本到 ES5 或之上，tsconfig.json上写了没有用

```
tsc demo.ts -t es2022
```



### 09_泛型

- 泛型是一个不确定的类型
- 在定义函数或是类时，如果遇到类型不明确就可以使用泛型

基础使用

```tsx
function fn<K>(a: K): K {
    // K可以为任意一个大写字母
    return a;
}

let result1 = fn(10);// TS自动类型推断，但复杂时可能推断不出来
let result2 = fn<string>("hello");// 指定泛型,建议手动指定泛型
```

进阶 同时指定多个泛型

```tsx
function fn<K,T>(a: K,b:T): K {
    // K T可以为任意一个大写字母
    console.log(b);
    return a;
}

let result1 = fn(10,"123"); // TS自动类型推断，但复杂时可能推断不出来
let result2 = fn<string,number>("hello", 1); // 指定泛型,建议手动指定泛型
```

 泛型实现接口

```tsx
interface In{
    length : number
}

// T使用一个泛型，并且要实现In这个接口,要求a 至少有length这个属性,
// In不一定非得是接口，也可以是抽象类，普通的类
function fn2<T extends In>(a:T):number{
    return a.length;
}

fn2("123");
```

泛型在类中的使用

```tsx
class Person<T,K> {
    name: T;
    age: K;

    constructor(name: T, age: K) {
        this.age = age;
        this.name = name;
    }
}

const sun = new Person<string,number>("孙悟空", 50);
console.log(sun.name, sun.age);
```



### 10_练手TS贪吃蛇