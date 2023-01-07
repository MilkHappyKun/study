# HTML

# 1-HTML骨架

```html
<!DOCTYPE html> <!-- 文档声明 向下兼容 -->
<html lang="en"> <!-- html根标签，语言为英文， -->
    <head>
        <meta charset="UTF-8" /> <!-- UTF-8字符编码格式 -->
        <title>网页标题</title> 
    </head>
    <body></body>
</html>
```

# 2-标签简介

## 标签分类

单标签

```html
 <meta charset="UTF-8" /> 
```

双标签

```html
<body>...内容</body>
```

## 标签关系

标签的相互关系就分为两种：

- **嵌套关系**

```html
<head>
    <title>...</title>
</head>
```

> 简而言之：父子关系。

- **并列关系**

```html
<head></head>

<body></body>
```

> 简而言之：兄弟关系。

## 标签属性

<标签名 属性1="属性值1" 属性2="属性值2" …> 内容 </标签名>

```html
<p class="box">这是p标签：box</p>
```

## 注释标签

快捷键 Ctrl + /

```html
<!-- 注释语句 -->
```

# 3-常用标签

## 标题标签

```html
    <h1>标题标签h1</h1>
    <h2>标题标签h2</h2>
    <h3>标题标签h3</h3>
    <h4>标题标签h4</h4>
    <h5>标题标签h5</h5>
    <h6>标题标签h6</h6>
```

特点：

- h1不能嵌套h1,其他的可以嵌套本身

- 加粗
- 从h1到h6重要性和大小依次递减

## 段落标签

```html
<p>文本内容</p>
```

特点：自动换行

## 水平线标签

```html
<hr>
```

作用：一行水平线，分割

​    color 可以更换颜色

​    width 可以设置宽度

​    align 可以设置位置

​    noshade 可以消除默认阴影

## 换行标签

```html
<br>
```

作用：强制换行

## div 标签

```html
<div>这是div标签</div>
```

特点：

- 没有语义，很"干净"
- 会自动换行

是网页布局常用标签，当作一个盒子

## span标签

特点：

- 没有语义，很"干净"
- 行内标签，不会换行

是网页布局常用标签

## 文本标签

### 文本格式化标签

加粗

<strong>strong</strong>

<b>b</b>

斜体

<em>em</em>

<i>i</i>

删除线和下划线

<del>del</del>

<ins>ins</ins>

上标下标

5<sup>2</sup>

H<sub>2</sub>O

### 转义字符

```html
不断行空格 &nbsp;	
<	小于	&lt;	
>	大于	&gt;	
©	版权	&copy;	
×	乘号	&times;	
÷	除号	&pide;	
```

注意：在html里直接用多个空格只会显示一个

## 列表标签

无序列表

```html
<ul>
        <li>榴莲</li>
        <li>苹果</li>
        <li>香蕉</li>
    </ul>
```

效果图

![](https://i0.hdslb.com/bfs/new_dyn/0ceae9d6e34c562d6cfe6088732c86d9562431495.png@1554w.webp)

list-style:none;去除列表自带的小点

有序列表

```html
<ol>
        <li>华丽转身：100分</li>
        <li>胯下运球：99分</li>
        <li>平地起飞：88分</li>
        <li>老肩巨猾：100分</li>
    </ol>
```

效果图

![](https://i0.hdslb.com/bfs/new_dyn/34d46af29a9fc1ecdb71caa0c466771d562431495.png@1554w.webp)

自定义列表

```html
<dl>
    <dt>蔡徐坤饭店帮助中心</dt>
    <dd>菜品展示</dd>
    <dd>开始点餐</dd>
    <dd>联系店铺</dd>
    <dd>用餐评价</dd>
</dl>
```

效果图

![](https://i0.hdslb.com/bfs/new_dyn/802334002109b74109579ade6d211d1d562431495.png@1554w.webp)

## 表格标签

```html
    <!-- 表格整体 -->
    <table border="2" width="500" height="15" >
        <!-- 表格标题 -->
        <caption>cxk唱跳打分</caption>
        <!-- 表头 -->
        <thead>
            <!-- 行标签，一行 -->
            <tr>
                <!-- th,td表格的一列 -->
                <!-- th默认加粗 -->
                <th>动作名称</th>
                <th>成绩</th>
                <th>评语</th>
            </tr>
        </thead>
        <!-- 表格内容 -->
        <tbody>
            <tr>
                <td>胯下运球</td>
                <td>100分</td>
                <td>非常潇洒</td>
            </tr>
            <tr>
                <td>双手比心</td>
                <td>90分</td>
                <td>有点油腻</td>
            </tr>
        </tbody>
        <!-- 表格脚注 -->
        <tfoot>
            <tr>
                <td>总结</td>
                <td>鸡你太美</td>
                <td>你饭发了知道吗？</td>
            </tr>
        </tfoot>
    </table>
```

效果图

![](https://i0.hdslb.com/bfs/new_dyn/a31231dce09d93f370dac0a1a9d43012562431495.png)

 th和thead有什么区别？

​      th作为表头的时候 不打印的情况下 和thead没什么区别

​      但是当你打印 并且表格超过1张的时候

​      用th写的表格  第二张顶部不会表头

​      用thead写的表格  每一张表格都会有一个表头



## form 标签

定义表单，表单要包含在 form 标签中，点击提交后，表单标签上的数据将被提交到服务器。

```html
<form action＝"url" method="GET|POST" name="myform" >
	<!-- 表单控件input -->
</form>
```

- action：提交到的地址
- name：表单提交时的名称
- method：提交方式，默认为get,会显示数据，不安全，post不会显示数据，相对安全。

## 表单控件input

单行文本输入框

```html
<input type="text" placeholder="请输入昵称">
```

密码输入框

```html
<input type="password" placeholder="请输入密码">
```

单选按钮

```html
 	<!-- checked表示默认选项 -->
 性别:<input type="radio" name="sex" checked>男
	 <input type="radio" name="sex">女
```

name是给后端看的。

多选框

```html
爱好:<input type="checkbox" checked>敲代码
	<input type="checkbox">熬夜
	<input type="checkbox">掉头发  
```

文件上传

```html
<input type="file">
```

下拉框

```html
所在城市：
<select>
	<option value="1">上海</option>
	<option value="2">北京</option>
	<option value="3" selected>深圳</option>
</select>
```

- selected 默认选中

多行文本输入框

```html
<textarea name="" id="" cols="30" rows="10"></textarea>
```

- rows:文字区块的宽度
- cols:文字区块的高

提交按钮

```html
<input type="submit" value="免费注册">
```

重置按钮

```html
<input type="reset" value="重置">
```

普通按钮

```html
<input type="button" value="普通按钮">
```

- value:指定按钮上显示的文字

label标签

label是input的描述，它本身不会有特殊效果，但它和input标签配合使用可以提升用户的使用体验，让用户点击`label`标签时，就像点击了这个输入框。

表单案例

```html
    <form>
        昵称：
        <input type="text" placeholder="请输入昵称">
        <br>
        性别：
        <label><input type="radio" name="sex" checked>男</label>
        <label><input type="radio" name="sex">女</label>
        <br>
        所在城市：
        <select>
            <option>北京</option>
            <option selected>上海</option>
            <option>广州</option>
        </select>
        <br>
        婚姻情况：
        <label><input type="radio" name="hunyin">未婚</label>
        <label><input type="radio" name="hunyin">已婚</label>
        <label><input type="radio" name="hunyin">保密</label>
        <br>
        喜欢的类型：
        <label><input type="checkbox">坤坤动图</label>
        <label><input type="checkbox">坤坤鬼畜</label>
        <label><input type="checkbox">坤坤影视</label>
        <label><input type="checkbox">坤坤混剪</label>
        <br>
        个人介绍：
        <textarea cols="30" rows="10"></textarea>
        <br>
        <strong>我承诺</strong>
        <ul>
            &nbsp;<li>不为坤坤招黑</li>
            &nbsp;<li>抵制纯路人</li>
            &nbsp;<li>礼貌安利坤坤</li>
        </ul>
        <label><input type="checkbox">我同意所有条款</label>
        <br>
        <input type="submit" value="免费注册">
        <input type="reset">
        <input type="button" value="普通标签">
    </form>
```

效果图

![](https://i0.hdslb.com/bfs/new_dyn/b8a737f974810140fa8abd49a0128185562431495.png@1554w.webp)

## 路径

分为相对路径和绝对路径

绝对路径（几乎不用）

- 文件的盘符路径：D:\图片\次元行者王小明.jpg

- 网络路径，网址：https://www.baidu.com/

相对路径

相对当前文件的路径

- 同一级目录下，输入图像文件的名称即可 。
- 图像文件位于当前文件的下一级目录：输入文件夹名和文件名，之间用`/`隔开。

- 图像文件位于当前文件的上一级目录：在文件名之前加`../` 如果是上两级，则需要使用 `../ ../`以此类推

## 图片标签

```html
<img src="./images/index.png" alt="">
```

```html
<img src="https://i0.hdslb.com/bfs/new_dyn/a31231dce09d93f370dac0a1a9d43012562431495.png@1554w.webp" alt="">
```

- src后接图片路径，图片网址,会直接显示图片
- alt后写图片无法显示时给出的提示

## 音频标签audio

```html
    <!-- 
        audio 音频标签
        autoplay 自动播放
        controls 展示控件
        loop 循环
        muted 静音
        proload 在页面加载的时候预备播放 和autoplay 冲突
     -->
	<audio src="./双倍cxk.mp4" controls title="好笑吗？"></audio>
```

特点：

- controls 不加就没有播放器
- title 当鼠标放在播放器上会自动显示title 后的内容
- loop 循环播放
- autoplay 自动播放（部分浏览器不支持）

效果图

<img src="https://i0.hdslb.com/bfs/new_dyn/488109ad0d2a80e8ce71f19d2ddf5226562431495.png@1554w.webp" style="zoom: 67%;" />

## 视频标签video

```html
	<!-- 
        src 地址
        controls 控制面板
        autoplay 自动播放
        loop 循环
        poster 首次进入当前视频的封面图
     -->
	<video src="./双倍cxk.mp4" controls title="给你双倍的快乐！"></video>
	<!-- video并不是所有的浏览器都支持 -->
     	<!-- 为了兼容浏览器 -->
	<video controls>
        <source src="./mp3/mp4.mp4">
        <source src="./mp3/flv.flv">
	</video>
```

同音频标签

## 链接标签a

```html
<a href="https://www.baidu.com/">点击此处进入百度搜索</a>
<a href="https://www.baidu.com/" target="_blank">点击此处进入百度搜索</a>
<!-- target属性值选择_blank,会前往新的网页打开百度，不写默认在原页面跳转百度 -->
```

- href后接要跳转的网页地址

特点：

- 自带下划线
- 字体颜色变成蓝色
- 移动到字体上鼠标指针变成小手

***



# CSS

# 01-CSS基础

## CSS的引入方式

内联方式

实现方式

```html
<head>
    <title>css基础</title>
    <!-- 样式要写在style里面，style要写在head标签里 -->
    <style>
        p {
            width: 500px;
            height: 400px;
            background-color: orange;
        }
    </style>
</head>
<body>
    <!-- 使用频率仅次外联 -->
    <p>ppp</p>
</body>
```

优点：

- 不用来回跳文件写代码

缺点：

- 不能复用，一些重复的代码还得再写一遍
- 写大型网站代码多修改很麻烦，css代码比html结构代码还多。

使用场景：

- 网页比较小

外联方式

实现方式

1. 创建一个单独的.css文件，在该文件中添加css代码
2. 在html文件的head标签中，添加link标签，引入关联外部的css样式文件。

Mycss.css

```css
p {
    width: 400px;
    height: 400px;
    background-color: pink;
}
```

```html
<head>
    <title>css外联</title>
    <!-- 使用频率最高 -->
    <link rel="stylesheet" href="./02-Mycss.css">
</head>
```

优点:

- 实现html结构和css样式的分离
- 方便复用

缺点:

- 需要跳转文件去查看html结构和css样式，但是可以通过编辑器分屏解决

使用场景:

- 中大型网页



行间引入

实现方式

- 在标签中添加style属性，属性值直接给上css属性。

```html
<!-- 开发中基本不用 -->
<div style="background-color: pink;">css行间引入</div>
```

 4.导入式 import

总之：

近水楼台先得月，谁后加载谁优先级别大



## CSS选择器

选择器的作用：

精确的选择要进行css样式设置的标签元素

### 通配符选择器*

格式:	* {CSS样式设置}

```html
<style>
        * {
            background-color: pink;
        }
</style>
```

特点

- *通配符选择器,会选择文档中所有的标签.包含html,body在内.

用途

- 一般用于给网页设置初始化操作.

### id选择器

格式：	#id属性值 {css样式}

实现方式：

1. 先在style标签里定义id选择器

   ```html
   <style>
       #color {
       	color: pink;
       }
   </style>
   ```

2. 然后给标签添加id属性，给上对应的属性值

   ```html
   <div id="color">我的颜色</div>
   ```

注意：

- 标签里只能写一个id，多个id只有第一个生效
- id属性里的属性值只能写一个，写多个都不生效
- 定义的id属性值不能重复
- 一个标签对应一个id属性值，在css学习阶段多个标签用一个id属性值可以表现出来，但以后到js时会出错

用途

- 单独针对某一个标签进行样式设置。

### class选择器

格式：	.class属性值{css样式}

实现方式：

1. 先在style标签里定义class选择器

   ```html
   <style>
       .lei {
       	background-color: green;
       }
   </style>
   ```

2. 然后给标签添加class属性，给上对应的属性值

   ```html
   <div class="lei">我的颜色</div>
   ```

注意：

- 标签里只能写一个class，多个class只有第一个生效

- class属性值不能重复

- 一个class的属性值可以有多个，之间用空格隔开

  ```html
  <div class="lei a"> class选择器</div>
  ```

用途

- 对多个元素进行统一样式调整

### 标签(元素)选择器

格式：	标签名 {css样式}

实现方式：

1. 先在style标签里定义标签选择器

   ```html
   <style>
   	p {
   		background-color: orange;
   	}
   </style>
   ```

2. 直接使用对应的标签就能生效

   ```html
   <p>元素选择器</p>
   ```

   

用途：

- 可以对同一种元素做同一种样式设置。

### 后代选择器

格式：	选择器1 选择器2 {css样式}

实现方式：

1. 先在style标签里定义后代选择器

   ```html
   <style>
   	div p {
   		background-color: pink;
   	}
   	#box a {
   		text-decoration: none;
   	}
   </style>
   ```

2. 再写符合对应的关系的标签

   ```html
   <div>
   	我是一个div
   	<p>我是div的儿子p标签</p>
   </div>
   <div id="box">
   	<a href="">不写会刷新</a>
   	<br>
   	<a href="#">不会刷新，回到最上</a>
   	<br>
   	<a href="##">不会刷新，也不会回到最上</a>
   	<br>
   </div>
   ```
   
   

### 子代选择器

格式：	选择器1>选择器2 {css样式}

实现方式：

```html
    <style>
        #box>p {
            color: green;
        }
    </style>
```

```html
    <div id="box">
    	<!-- 这个生效 -->
        <p>鸡你太美
			<div>
        		<!-- 这个不生效 -->
        		<p>ppppp</p>
        	</div>
        </p>
    </div>
```



### 并集选择器

格式：	选择器1, 选择器2, 选择器3{css样式}

实现方式：

1. 在style标签里定义群组选择器

```
        #d3,.c,span,a {
            color: aqua;
        }
```

都生效

### 交集选择器

li.one 选择li标签中类名为one的

### 排除选择器

li:not(.other) 排除类名为other的

### 兄弟选择器

格式：	选择器1+选择器2 {css样式}

特点：

- 选择器1和选择器2是相邻的兄弟标签, 最终生效的是选择器2所在的标签

- 同时满足位置和元素两个要求

格式2：选择器1~选择器2

特点：选择器1之后所有的选择器2所在的标签都生效，同级，中间隔了别的标签也生效





### 伪类选择器

格式：	选择器:hover {css样式} 鼠标放在上面的时候发生的变化

实现方式：

```html
<style>
       p:hover {
        color: red
       }
       p {
        color: pink;
       }
</style>
```

```
<p>ppp</p>
```

特点：

- 鼠标放在选择器所查找的标签上，此选择器才会被触发。



2.   a:link 表示没有被访问过的a标签

```
a:link{
	color:pink;
}
```

3. a:visited 表示已经被访问过的a标签

```
a:visited{
        color: gold;
}
```

4. a:active 表示 当鼠标按下去后的样式

```
a:active{
		color:aqua;
}
```





## 选择器的优先级

### !important关键字

作用：

- 单独给某一个属性设置，并把它的优先级提到最高

实现方法：

```html
    <style>
        #clolor1 {
            color: green;
        }
        .color2 {
            color: pink !important;
        }
    </style>
```

```html
    <!-- 本来id选择器的优先级高于类选择器的 -->
    <p id="clolor1">猜猜我</p>
    <p id="clolor1" class="color2">猜猜我是什么颜色？</p>
```

效果图：

<img src="https://i0.hdslb.com/bfs/new_dyn/8fb454e519757f1294d710bf024a8780562431495.png@1554w.webp" style="zoom: 67%;" />

### 优先级的划分

- !important优先级最高。

- 行间样式优先级仅次于!important，为1000。

- id选择器优先级为100。
- 类选择器优先级为10。
- 标签名选择器优先级为1。
- 通配符选择器*优先级为0
- 继承没有优先级
- 后代选择器优先级等于所写选择器优先级的和。
- 群组选择器因为表示的是并列，因此优先级就是原本的权重大小。

注意：

- 选择器的优先级一样，则使用靠后的样式。

## CSS常用样式

### 文本相关样式1

- 文字大小.  font-size: 30px; 单位：px，像素
- 文字颜色.  color: red；
- 文字字体.  font-family:楷体;
- 文字粗细.  font-weight:900;  选值范围：100~900

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>字体设置</title>
		<style>
			div {
				width: 400px;
				height: 200px;
				background-color: pink;
				/* 1.字号 默认16px */
				font-size: 20px;
				/* 2.字体风格  */
				font-family:KaiTi;
                /* 3. 加粗*/
                /* font-weight: bold; */
                font-weight: 700;
				/*综合写法必须按照：加粗 字号 字体顺序!!*/
			    /* font:bold  40px "微软雅黑" ; */
			}
		</style>
	</head>
	<body>
		<div>
			蒹葭苍苍,白露为霜. <br />
			所谓伊人,再水一方.
		</div>
	</body>
</html>
```

效果图

![](https://i0.hdslb.com/bfs/new_dyn/9a0be30ade01d291ff17655a706ec58c562431495.png@1554w.webp)

### 文本相关样式2

- 文字水平对齐方式. text-align:center;  可选left，right，center
- 文字行高.  line-height：100px; 可选数字+px或者倍数 
- 文本装饰器. text-decoration: none; 用的最多，用来去除a标签的下划线
- 文本首行缩进 text-indent: 2em;   首行缩进2个字符    

- 单词间距 word-spacing: 20px;  默认值normal 相当于0px ，可以设置负值。
- 字母间距  letter-spacing:2px;   默认是normal相当于0px ，可以设置负值。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <style>
        div {
            width: 400px;
            height: 300px;
            color: green;
            background-color: pink;
            font-size: 30px;
            /* 1.标签内容水平居中 */
            text-align: center;
            /* 2.设置行高 */
            /* 取消上下间距 */
            line-height: 30px;
            /* 3.首行缩进2字符 */
            text-indent: 2em;
        }
        a {
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div>
        王珊珊这次下了狠心，没有任何的犹豫，她拿着人皮纸直接就往鬼童的嘴巴里塞：“吃了它。”鬼童几乎没有任何的犹豫，十分配合王珊珊一口就将人皮纸给吞了。是的。没有错，在这种特殊的情况之下，王珊珊真的把人皮纸喂给了鬼童。
    </div>
    <a href="#">我是一个标签，去除了自带的下划线</a>
</body>
</html>
```

效果图：

<img src="https://i0.hdslb.com/bfs/new_dyn/daa205e259c27207a1e9aaece692997e562431495.png@1554w.webp" style="zoom: 67%;" />

### 文本相关样式3

- 文本不换行： white-space: nowrap;默认换行，不用设置
- 文本溢出的处理方式： text-overflow:ellipsis ;可选值clip 裁剪掉   ellipsis 省略号代替。

- overflow: hidden;   将超出标签范围的内容进行隐藏。

单行省略效果案例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <style>
        div {
            width: 400px;
            height: 300px;
            color: green;
            background-color: pink;
            /* 1.控制文本不换行 */
            white-space: nowrap;
            /* 2.文本溢出省略号代替 */
            text-overflow: ellipsis;
            /* 3.超出文本的范围进行隐藏 */
            overflow: hidden;
        }     
    </style>
</head>
<body>
    <div>
        杨间带着张羡光行走在梦境的世界里，不缓不慢的朝着远处一座老旧的欧式城堡靠近。在他的身边，恶犬紧紧跟随，随时提防着旁边已经恢复行动了的张羡光。哪怕是在梦境的世界里，杨间依旧对他很警惕，不会给他任何一个靠近自己的机会，他可不想张羡光手中拎着的那把刀突然对着自己身上砍过来。而张羡光
    </div>
</body>
</html>
```

效果图：

![](https://i0.hdslb.com/bfs/new_dyn/e324da537d672ac5609e66a17cf28656562431495.png@1554w.webp)

### 行块元素水平居中的问题 

- 行元素居中:给其所在父标签设置text-align: center;
- 块元素位置居中:给块元素设置margin: 0 auto; 

## 常用命名方法

```
 ```起名 代码的大小写  名字的大小写 
    在起名字的时候 如果你不知道单词怎么写 那么你就去翻译
    我们起名字 遵循三种规则
    1.小驼峰式命名法
    className
    2.大驼峰式命名法
    ClassName
    3.下划线式命名法
    class_name
```

## 常用命名名称

<b>CSS文件命名</b>

```
   主要的 ma<ster.css
   模块 module.css
   基本共用 base.css
   布局，版面 layout.css
   主题 themes.css
   专栏 columns.css
   文字 font.css
   表单 forms.css
   补丁 mend.css
   打印 print.css
```

<b>页面结构</b>

```
 容器: container
   页头：header
   内容：content/container
   页面主体：main
   页尾：footer
   导航：nav
   侧栏：sidebar
   栏目：column
   页面外围控制整体布局宽度：wrapper
   左右中：left right center
```

<b>导航</b>

```
   导航：nav
   主导航：mainbav
   子导航：subnav
   顶导航：topnav
   边导航：sidebar
   左导航：leftsidebar
   右导航：rightsidebar
   菜单：menu
   子菜单：submenu
   标题: title
   摘要: summary
```

<b>功能</b>

```
   标志：logo
   广告：banner
   登陆：login
   登录条：loginbar
   注册：regsiter
   搜索：search
   功能区：shop
   标题：title
   加入：joinus
   状态：status
   按钮：btn
   滚动：scroll
   标签页：tab
   文章列表：list
   提示信息：msg
   当前的: current
   小技巧：tips
   图标: icon
   注释：note
   指南：guild
   服务：service
   热点：hot
   新闻：news
   下载：download
   投票：vote
   合作伙伴：partner
   友情链接：link
   版权：copyright
```

<b>颜色</b>

```
   .red { color: red; }
   .f60 { color: #f60; }
   .ff8600 { color: #ff8600; }
```

<b>字体大小</b>

直接使用”font+字体大小”作为名称

```
   .font12px { font-size: 12px; }
   .font9pt {font-size: 9pt; }
```

<b>对齐样式<b>

```
   .left { float:left; }
   .bottom { float:bottom; }
```

<b>标题栏样式</b>

使用”类别+功能”的方式命名

```
   .barnews { }
   .barproduct { }
```

<b>注意事项</b>

```
   1.一律小写;
   2.尽量用英文;
   3.两个单词构成时,用-连接,比如 nav-item;
   4.尽量不缩写，除非一看就明白的单词.
```

```
   
```



# 02-盒子模型

## 盒子模型简介

<b>概念</b>：

盒子模型结构像盒子一样，包含多个组成部分，用来页面的精细化布局。所有HTML元素可以看作盒子。

<b>盒子模型的组成</b>：

- 内容区域：content，展示内容，大小由宽高决定
- 边框：border，相当于盒子的壳子
- 内边距：padding，内容和边框的距离
- 外边距：margin，相邻盒子之间的距离

<b>盒子模型图</b>

<img src="https://i0.hdslb.com/bfs/new_dyn/41279abb74ce5df191808b8bb5471b58562431495.png@1554w.webp" style="zoom:67%;" />

<b>标准盒模型</b>

- box-sizing,默认值：content-box,叫做标准盒模型
- 标准盒模型的宽度=width+padding左右内边距+border左右边框+margin左右外边距
- 高度同上

<b>注意</b>：这个模型的宽高会被撑大，想要保证盒子宽高不变得设置box-sizing:border-box；

<b>怪异盒模型</b>

- box-sizing:border-box； 叫做怪异盒模型。

- 怪异盒模型的宽度=width+margin左右外间距，padding和border会占用已设定的宽度值,不会撑大盒子。

- 高度同上

## padding内边距

写法：

```
/*padding*/
/*写法1   上下左右  */
padding: 20px;
/*写法2 上下  左右*/
padding: 20px 30px;
/*写法3  上  左右  下*/
padding: 20px 30px 0;
/*写法4  上 右  下 左*/
padding: 10px 20px 0 30px;
/*写法5 按照方向  left top right bottom*/
padding-bottom: 50px;
padding-left: 50px;
/* 代码从上自下执行 最后设置的属性值会覆盖之前的属性值 */
```

## border边框

主要属性

- border-width:宽度;  边框宽度  必写。
- border-style:实线; 边框风格    必写。
- border-color:颜色; 边框颜色  ，为黑色。

写法：

```
/*border边框*/
/*边框颜色 默认黑色*/
border-color: red;
/*边框宽度 默认为0*/
border-width: 5px;
/*边框风格 
solid 实线
dotted 圆形虚线
dashed 方形虚线*/
border-style: solid;
/*推荐 综合写法  三个值可以任意调换位置 */
border: 10px solid seagreen;
/*按照方位来写  left top right bottom*/
border-bottom: 5px dotted dodgerblue;
border-left: 6px solid salmon;
```

## magin外边距

写法：

```
/*margin 外间距  写法同padding*/
/*写法1   上下左右  */
margin: 20px;
/*写法2 上下  左右*/
margin: 20px 30px;
/*写法3  上  左右  下*/
margin: 20px 30px 0;
/*写法4  上 右  下 左*/
margin: 10px 20px 0 30px;
/*写法5 按照方向  left top right bottom*/
margin-bottom: 50px;
margin-left: 50px;
```

<b>块元素相对父标签居中</b>

- 父标签设置：margin:0 auto;

<b>margin值在使用时的问题</b>

- 上下布局时, 如果同时设置了上、下面标签的margin,那么两个标签的上下间隔取其中的最大值. 不会累加
- 两个元素在左右布局的时候,如果同时设置了左、右边标签的margin,那么两个标签的水平间隔是左边标签+右边标签
- 在父子关系中, 第一个子标签的margin-top值会传递给父标签; 

案例如下：

<b>目的</b>

使红色区域距离金色上边框20px



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>margin存在的问题</title>
    <style>
        * {
            margin: 0;
        }
        .pink {
            width: 400px;
            height:30px;
            background:  pink;
        }
        .gold {
            width: 700px;
            height: 700px;
            background: gold;
        }
        .red {
            width: 50px;
            height: 50px;
            background:  red;
            margin-top: 20px;
        }
        .green {
            width: 100px;
            height: 100px;
            background: green;
        }
        .blue {
            width: 200px;
            height: 200px;
            background-color: blue;
        }
    </style>
</head>
<body>
    <div class="pink">
        这是用来测试的标签
    </div>
    <div class="gold">
        <div class="red">1</div>
        <div class="green">2</div>
        <div class="blue">3</div>
    </div>
</body>
</html>
```

效果图

<img src="https://i0.hdslb.com/bfs/new_dyn/64344238bdd0f16a33794d261bb315c8562431495.png@1554w.webp" style="zoom:67%;" />

<b>解决办法</b>

```
.gold {
            width: 700px;
            height: 700px;
            background: gold;
            /* 1.给父标签设置边框，并把边框线设为父级的颜色gold */
            /*  border-top: 1px solid gold; */
            /* 2.给父标签设置overflow: hidden;溢出隐藏 */
            /* overflow: hidden; */
            /* 父标签设置 padding内边距 */
            padding-top: 1px;
            /* 本质都是拿个东西阻断传递 */
        }
```

效果图

![](https://i0.hdslb.com/bfs/new_dyn/82866ea5664d8cf3ae86b9921465bba7562431495.png@1554w.webp)

### 网页设置初始化

```
* {
	margin：0;
	padding:0;
}
```



## 标签的表现形式

### 标签的显隐性

- display:none; 隐藏   display:block;显示    不保留标签位置。
- opacity: 0; 隐藏      opacity:1;  通过透明度控制显示和隐藏,  保留标签位置。

- visibility: hidden;隐藏       visibility: visible;显示      保留标签位置。

### 块标签

例如：div p h1 form table hr br

<b>特点</b>

- 设置宽高有效
- 独占一行，换行展示。
- 不写宽度时。宽度是父元素（剩余）宽度的100%。



### 行标签

例如：a span strong

<b>特点</b>

- 设置宽高无效。
- 同行展示。
- 不写宽度时。宽度由内容撑开。
- 上下外边距和上下内边距无效



### 行内标签

例如：input select img button

<b>特点</b>

- 设置宽高有效。
- 同行展示。
- 不写宽度时。宽度由内容撑开。input除外

### display标签性质转换

- display:block;设置元素为块元素
- display:inline;设置元素为行内元素
- display:inline-block;设置元素为行内块元素

<b>display转换的必要性</b>

比如可以把`a`标签转换为块状元素，设置宽高，使用户可点击的区域增大，进而实现一个按钮的样式。

## CSS的继承性

- 就像父亲的财产会遗传给儿子一样，在`CSS`中祖先元素的样式同样也会被子元素继承。
- 比如为父元素设置了字体颜色，子元素也会应用上相同的颜色。
- 并不是所有的样式都会被继承
- [css 中可以和不可以继承的属性总结](https://www.cnblogs.com/thislbq/p/5882105.html)



# 03-CSS浮动

## 背景属性

- background-image：url(./ );	背景图片
- background-repeat：no-repeat; 平铺方式：不平铺，还有repeat-x 等等
- background-position：left;t 图片位置
- 简写（顺序不能错）：background: green url(1.jpg) no-repeat left bottom;

<b>background-size背景尺寸</b>

- cover 自动调整图片大小,保证图片始终填充满背景区域,如有溢出部分则会被隐藏

- `contain` 自动调整图片大小,保证图片始终完整显示在背景区域,可能会填不满盒子

```
/* 一个值: 宽度 高度为auto */
background-size: 50%
background-size: 12px
background-size: auto

/* 两个值 */
/* 第一个值 宽度，第二个值高度 */
background-size: 50% auto
```

## 背景裁剪

- background-clip:padding-box;   背景被裁剪到内边距框

在写移动端页面时，经常会用padding撑开一个内容，如果有圆角的话，里面的背景将超出圆角，看不出圆角效果，这时需要添加这个属性。

background-clip: content-box: 背景被裁剪到内容框的位置

background-clip: border-box: 背景被裁剪到边距框的位置

## 溢出的处理overflow

`overflow` 指定标签里面的内容超出了样式的宽度和高度时如何处理。

- scroll：添加滚动条，强制的，内容不溢出也会有
- auto：根据是否溢出来添加滚动条
- hidden：隐藏超出盒子的内容

## 文档流

- 将文档自上而下分成一行又一行，在每一行里边进行元素排列。
- 每行中按从左至右的顺序排放元素。文档流中元素默认会紧贴到上一个元素的右边，如果右边不足以放下元素，元素则会另起一行，在新的一行中继续从左至右摆放。
- 自上而下，自左向右的元素默认排列方式

## 浮动float

<b>浮动的作用</b>

- 解决块元素同行排列的问题，本来是进行文字环绕的

<b>实现方式</b>

- 给元素添加float属性即可， left和right两个值。 

<b>浮动的原理</b>

- 元素浮动之后，会脱离文档流,造成页面内容塌陷.覆盖下面没有浮动的标签.

- 元素浮动后,可以和其他浮动元素放置在同一行，并且浮动的元素在同一层级

## 浮动产生的问题和解决办法

1. 影响兄弟元素布局。

解决方案: 给需要清除浮动影响的兄弟标签 设置  clear:both;

或者设一个选择器

```
.clear{
	
}
```



2. 父元素高度塌陷

原因：当元素中的子元素浮动之后，父元素没有高度了

解决方案：

1. 父元素设置verflow:hidden;只要是overflow就行
2. 父标签::after{
       content: "";
       display: block;
       clear: both;
   }
3. 直接给父元素设置高度，但是有的需求不能设置高度



# 04-定位

<b>定位</b>：确定的某个位置

```
div{
	postion:fixed;
	right:0;
	bottom:0;
	/* 定位中 三种定位的区别  在于坐标系的不同
        相对定位 绝对定位 固定定位
        搭配top left bottom right这四个值来确定其位置 
        给了坐标值就完全的脱离标准文档流了
        */
}
```

## 相对定位

```
div{
        margin: 100px auto;
        position: relative;
        width: 100px;
        height: 100px;
        border: 1px solid red;
        left: 100px;
        /* 
        定位的属性名是 position
        属性值：relative 相对定位
        */
	}
```

对于相对定位来说，它的坐标系是本身原来的位置

## 绝对定位

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        html{
            height: 200%;
        }
        .father{
            width: 200px;
            height: 200px;
            border: 2px solid red;
            margin: 100px auto;
            position: relative;
        }
        .son{
            width: 100px;
            height: 100px;
            border: 1px solid blue;
            /* margin: 50px auto; */
            position: absolute;
            right: 0;
            bottom: 0;
        }
        .grandson{
            width: 30px;
            height: 30px;
            border: 2px solid yellow;
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <div class="father">
        <div class="son">
            <div class="grandson"></div>
        </div>
    </div>
</body>
</html>
```

绝对定位
        position:absolute
        绝对定位的坐标系是其已经被定位的父级及以上级别的元素 如果一直没有  最终就是body

特点：

​	1.如果单纯的写了 并没有给left、top值也是没有脱离的，需要给值，完全脱离标准文档流

​	2.坐标系是父级及其以上已经被定位的元素

​	3.一般情况下和相对定位一起使用

## 固定定位

```
		固定定位
        position:fixed
        固定定位的坐标系 是视口
```

特点：

​	 1.完全脱离标准文档流

​	 2.坐标系是视口

​	 3.一般情况下用作导航栏

## 父相子绝

```
	为什么大家经常用的是父相子绝
    如果父级写上position:relative 他不动 这个时候我们只需要考虑子级的位置
    如果你写position:absolute 你还需要给父级找其对应的位置 如果没找好 页面就乱了
	position:relative 没有脱离标准文档流 还占据标准文档流中的位置
	其余的 absolte fixed 都是完全脱离标准文档流
```



## 定位设置下拉框

```
<style>

    /* input和下拉框的大盒子 */
    .box{
        position: absolute;
        right: 0;
        top: 0;
    }
    /* input框 */
    .box input{
        height: 60px;
        border: 1px solid #ccc;
        padding-left: 15px;
    }
    /* ul框 */
     .box ul{
        position: absolute;
        top: 50px;
        left: 0;
        width: 201px;
        border: 1px solid orange;
        display: none;
    }
    /* li的高 */
     .box ul li{
        height: 30px;
        line-height: 30px;
    }
    /* 点击input框后出现下拉框 */
    .box .search:focus~ul{
        display:block;
    }
    /* 背景颜色的改变 */
    .box ul li:hover {
        background: #ccc;
    }
</style>

    <div class="box">
        <input type="text" placeholder="电视" class="search">
        <ul>
            <li><a href="#">小米10S</a></li>
            <li><a href="#">小米6</a></li>
            <li><a href="#">小米6</a></li>
            <li><a href="#">小米6</a></li>
            <li><a href="#">小米6</a></li>
            <li><a href="#">小米6</a></li>
            <li><a href="#">小米6</a></li>
        </ul>
    </div>
```

## z-index

z-index属性就是表示在z轴的优先级 默认是0，值越大，越靠上，显示优先级越高

## link标签

1. 引入css样式文件，写在head里面

```
<link rel="stylesheet" href="./CSS/index.css">
```

2. 修改网页标题的logo，写在head里面

```
<link rel="short icon" href="./images/logo.png">
```



## 透明度的表示方式

1. opacity: 0.5;

   0~1，百分比

2. background:rgba(0,0,0,0.5);

 rgba和opacity的区别

- rgba的透明度  不会继承

- opacity的透明度  会继承

3. background: transparent; 全透明



## 光标类型cursor

- 默认箭头
- pointer 小手效果，提示用户可以点击
- text，工字型，提示用户可以选择文字
- move,十字光标，提示用户可以移动

## 圆角边框border-radius

常见取值：数字+px，百分比

数字越大边角越园

## 显示隐藏

display:none;

## 精灵图

简介：将项目中的多张小图片，合成一张大图片

一般是竖着很长

使用步骤

- 创建一个盒子，设置盒子的尺寸和小图片尺寸相同
- 将精灵图设置为盒子的背景图片 background-image:url(./);
- 修改背景图的位置

通过PxCook测量小图片左上角坐标，分别取负值给盒子的background-postion:x y



# 05-H5新增标签和新增选择器

h5相较于 html 都多了什么？

​	1.多了很多语义化标签 也是相对于css2.0的拓展

​    2.html5相较于html来说 多了一些手机上用的东西

​    3.html5对js也做了一些拓展

## 新增位置伪类选择器

```
        div:nth-of-type(1) 表示和div同级的第一个div
        div:nth-of-type(2) 表示和div同级的第二个div
        div:nth-of-type(odd) 表示和div同级的奇数个div
        div:nth-of-type(even) 表示和div同级的偶数个div
        8.input伪类选择器
        input:focus 表示选中你输入框获取焦点后的状态
        input:disabled 表示禁用后的状态
        input:enabled 表示启用后的状态
        9.伪元素选择器 不存在于element里面的元素
        .test::first-letter{}选中第一个字
        .test::first-line{}选中第一行
        .test::selection{}选中文本部分
        .test::after{}表示后面的部分
        10.联合选择器的优先级别 采用权重法计算
        id 100 类 10  标签 1
        .father .son a
        #father .son #box
```



## 新增属性选择器attr



```
[id]{} 表示有id的都会被选中
        [id][class]{} 表示id和class都有的 会被选中
        [id],[class]{} 表示id或者class有一个 会被选中
        [id='abc']选中id是abc的
        [id='abc'][class='abc']选中id是abc并且class也是abc
        [id^='abc']选中id是以abc开头的
        [id$='d']选中id是以d结尾的
        [id*='b']选中id中含有b的元素
        5.链接伪类选择器
        :link 表示常态下 没有点击的a标签
        :visited 表示点击后的a标签
        :active 表示点击时的
        :hover 表示鼠标悬停的
        :target 表示跳转到锚点后  锚点的样式

```



## 新增布局标签

```
    <!-- 在之前 我们都是通过类名来判定这个盒子的作用是什么？ -->
    <div class="header"></div>

    <!-- 在h5中 我们通过语义化标签来包裹 -->
    <!-- 相对于都是div的页面来说 使用语义化标签的页面 加载的性能更好 -->
    <!-- 语义化标签多属于块级元素  所以还是需要我们之前的布局 -->

    <!-- 一般用作头部 -->
    <header></header>
    <!-- 导航部分 -->
    <nav></nav>
    <!-- 文章部分 -->
    <article></article>
    <!-- 主体部分 -->
    <main></main>
    <!-- 底部 -->
    <footer></footer>
    <!-- 侧边 -->
    <aside></aside>
    <!-- 和div意思相同的 -->
    <section></section>
```

## 新增布局属性

```
			vw视口宽度  10vw 视口的10%
            vh视口高度  10vh 视口高度的10%
 
            em 根据当前字体大小  当前字体默认是16px 那么1em就是16px
            rem root根  rem指的是根基 html默认字体大小 
```

## 新增表单元素

```
	<!-- 1.email -->
    email :<input type="email">
    <hr>
    <!-- 2.tel -->
    tel <input type="tel" name="" id="" value="">
    <hr>
    <!-- 3.url -->
    url <input type="url">
    <hr>
    <!-- 4.number -->
    num <input type="number">
    <hr>
    <!-- 5.color -->
    color: <input type="color">
    <hr>
    <!-- 6. time-->
    time <input type="time">
    <hr>
    <!-- 7.date -->
    date <input type="date">
    <hr>
    <!-- 8.datetime -->
    datetime <input type="datetime-local">
```

## 标签datalist

```
	<select name="" id="">
        <option value="">郑州</option>
        <option value="">洛阳</option>
        <option value="">开封</option>
    </select>

    <input type="text" list="address" name="" id="">
    <datalist id="address">
        <option value="郑州" label="方特">郑州</option>
        <option value="洛阳" label="龙门石窟">洛阳</option>
        <option value="开封" label="清明上河园">开封</option>
    </datalist>
```

## meter进度条标签

```
 	<progress max="100" value="30"></progress>
    <!-- 
        progress 进度条标签
        max 最大值
        value 当前值
     -->
     <meter max="100" min="0" high="80" low="40" value="0" id="pag"></meter>
     <!-- 
        meter 度量器标准
        high 表示规定当前较高的值
        low 规定当前较低的值
        max 最大值
        min 最小值
        value 当前值
      -->
</body>
<script>
    var pag = document.getElementById('pag')
    setInterval(function(){
        pag.value+=0.1
    },10)
</script>
```

## 单词内换行wbr

```
<style>
    p{
    width:200px;
    background: orange;
}
</style>
<p>http:<wbr>//www<wbr>.ujiuye<wbr>.com<wbr>/zt<wbr>/webqzgcs<wbr>/ujiuye<wbr>.com<wbr>/zt<wbr>/webqzgcs<wbr>/ujiuye<wbr>.com<wbr>/zt<wbr>/webqzgcs/</p>
```



![](https://pic3.zhimg.com/80/v2-8148738a4895ca9ab085b1395e83d00a_1440w.png)

## 拼音标注ruby

```
<ruby>
  汉 <rp>(</rp><rt>Han</rt><rp>)</rp>
  字 <rp>(</rp><rt>zi</rt><rp>)</rp>
</ruby>
```

![](https://i0.hdslb.com/bfs/new_dyn/b348dbff79ab880e1d4492bd1397efae562431495.png@1554w.webp)

## 字体图标

介绍

- 展示的是图标，本质是字体
- 处理简单的、颜色单一的图片

使用方式

1. 把字体包添加到我的项目
2. 下载至本地
3. 解压缩包，把文件包改名，整个放到vscode里，
4. 引入iconfont.css  

```
<link rel="stylesheet" href="./iconfont/iconfont.css">
```

5. 使用

```
<div class="iconfont">&#xe66f;</div>

<div class="iconfont icon-bottom"></div>

<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-huiyuan"></use>
</svg>
```





# 06-CSS动画

## 处理兼容性

```
1.css3并不是支持所有的浏览器 对于一些较低等级的浏览器 IE678并不兼容
了解决此类问题 我们通常写代码的时候会把内核加上
			-webkit-border-radius:10px;
            /* 浏览器的内核  webkit谷歌浏览器 */
            -ms-border-radius:10px;
            /* ms是ie浏览器 */
            -moz-border-radius:10px ;
            /* moz是火狐浏览器 */
            -o-border-radius: 10px;
            /* o 是欧鹏浏览器 */
```

```
2.根据我们写的顺序的不同 分为优雅降级和渐进增级两种情况
    优雅降级
    所谓的优雅降级，就是向下兼容。指的是最开始的时候 针对一个高版本的浏览器构建页面等功能都完善了 然后针对各个不同的浏览器做测试 进行修复  保证低级版本的浏览器
    也可以实现页面的所有基础功能 低级的浏览器 被称为 简陋却无妨
    
    渐进增级
    向上兼容 我们可以理解为项目最开始的时候 就是针对低版本的浏览器 满足最基本的功能然后再针对高级的浏览器进行效果 交互 追加各种功能达到用户更好的体验
    此时我们最低要求就是实现基本功能为基础 

    优雅降级的特点：体验较好
    渐进增级的优点：维护成本小 良好的平台稳定性 降低了成本
```

```
        div{
            width: 200px;
            height: 200px;
            /* 监禁增级 先针对低级的浏览器  再去写统一的高端 */
            -webkit-border-radius:10px;
            /* 浏览器的内核  webkit谷歌浏览器 */
            -ms-border-radius:10px;
            /* ms是ie浏览器 */
            -moz-border-radius:10px ;
            /* moz是火狐浏览器 */
            -o-border-radius: 10px;
            /* o 是欧鹏浏览器 */
            border-radius: 10px;

            /* 优雅降级 */
            border-radius: 10px;
            -webkit-border-radius:10px;
            /* 浏览器的内核  webkit谷歌浏览器 */
            -ms-border-radius:10px;
            /* ms是ie浏览器 */
            -moz-border-radius:10px ;
            /* moz是火狐浏览器 */
            -o-border-radius: 10px;
        }
```

软件开发步骤

```
	    1.讨论产品 确定需求(需求分析文档)
        2.设计(数据库的设计  页面的设计  表的设计  )
        3.选择模型(瀑布模型，螺旋模型，迭代模型，快速原型模型)
        4.选择技术栈
        5.开发
        6.测试
        7.上线
```

## 渐变背景

```
    <style>
        .box{
            width: 100px;
            height: 100px;
            margin-right: 50px;
            float: left;
        }
        .box:nth-child(1){
            background: linear-gradient(0deg,red,white,green);
        }
        .box:nth-child(2){
            background: linear-gradient(90deg,red,white,green);
        }
        .box:nth-child(3){
            background: linear-gradient(red,white,green);
        }
        .box:nth-child(4){
            background: linear-gradient(45deg,red,white,green);
        }
        .box:nth-child(5){
            background: linear-gradient(225deg,red,white,green);
        }
    </style>
</head>
<body>
    <div class="box">从下往上</div>
    <div class="box">从左往右</div>
    <div class="box">从上往下</div>
    <div class="box">从左下往右上</div>
    <div class="box">从右上往左下</div>
</body>
```

![](https://i0.hdslb.com/bfs/new_dyn/26e14aaa0a3113d1b91f76b880153fd5562431495.png@1554w.webp)

径向渐变

从图片中间向外渐变

```
.box{
	width: 400px;
	height: 400px;	
	border: 1px solid black;
	background: radial-gradient(200px 200px,pink,green,orangered);
        }

<body>
    <div class="box">q</div>
</body>
            /* 第一个参数中的第一值 表示的是X轴渐变的范围 */
            /* 第一个参数中的第二值 表示的是Y轴渐变的范围 */
        }
```

<img src="https://i0.hdslb.com/bfs/new_dyn/dea213af0f2b2a66df2534a8a1514113562431495.png@1554w.webp" style="zoom: 33%;" />

## 多个图片背景

```
  div{
  width: 800px;
  height: 800px;
  background: url(./images/女仆.png) content-box no-repeat center,url(./images/海琴烟48.png) padding-box;
            /* background: url(./images/海琴烟48.png) content-box center no-repeat,pink; */

```

<img src="https://i0.hdslb.com/bfs/new_dyn/84eccb26e8c6c9861256bd4fc941c092562431495.png@1554w.webp" style="zoom: 25%;" />

<img src="https://i0.hdslb.com/bfs/new_dyn/555761e19e1abadf675bcee6d16360a6562431495.png@1554w.webp" style="zoom:25%;" />

## 图片之间间隙的解决办法

原因：font-size不为0的时候 换行节点 也会有距离

解决办法

```
        /* 第一种解决方式 两个图片代码写一行 */
        /* 第二种解决方式 */
        /* img{
            display: block;
        } */
        /* 第三种方式 */
        div {
            font-size: 0;
        }
```



## 文字阴影text-shadow

```
    <style>
        .box{
            width: 900px;
            height: 400px;
            font-size: 70px;
            background: green;
            color: green;
            text-shadow: 1px 1px 0 black,-1px -1px 0 white;
            /* text-shadow: 10px 10px 10px white; */
        }
    </style>
    <div class="box">这是一段有阴影的文字</div>

/* 突起效果 */
color: orange;
/* text-shadow: -1px -1px 0 white,1px 1px 0 black; */
/* 凹陷效果 */
text-shadow: -1px -1px 0 black,1px 1px 0 white;
```

![](https://i0.hdslb.com/bfs/new_dyn/eb006e012ee08c359fd0f01e7f7ed7a7562431495.png@1554w.webp)

## 盒子阴影box-shadow

box-shadow: 0px 0px 0px     black;

​						x轴 y轴 z轴 阴影颜色

​			正值	右    下  向外

可选属性（绝对顺序）：

- 必须 水平偏移量，允许负值  px
- 必须 垂直偏移量，允许负值  px
- blur 可选，模糊度 px
- spread 可选 阴影扩大 px
- color 阴影颜色 
- inset 可选，将阴影改为内部阴影 

```
 内部阴影 
 box-shadow:  0 0 20px black inset;
 多重阴影
 box-shadow:  10px 10px 20px black,-10px -10px 20px yellow;
```

案例

```
    <style>
        .box{
            width: 100px;
            height: 100px;
            background: pink;
            margin-right: 50px;
            display: inline-block;
        }
        .box:nth-child(1){
            box-shadow: 20px 0 0 green;
        }
        .box:nth-child(2){
            box-shadow: 0px 20px 0 green;
        }
        .box:nth-child(3){
            box-shadow: 20px 20px 0 green;
        }
        .box:nth-child(4){
            box-shadow: -20px -20px 0 green;
        }
        .box:nth-child(5){
            box-shadow: 0px 0px 20px green;
        }
        .box:nth-child(6){
            box-shadow: 0px 0px 20px green inset;
        }
        .box:nth-child(7){
            box-shadow: 20px 20px 20px green , -20px -20px 20px orangered;
        }
    </style>
</head>
<body>
    <div class="box">水平向右的阴影</div>
    <div class="box">垂直向下的阴影</div>
    <div class="box">右下的阴影</div>
    <div class="box">左上的阴影</div>
    <div class="box">阴影四周扩散</div>
    <div class="box">内部发光</div>
    <div class="box">多重阴影</div>
</body>
```

![](https://i0.hdslb.com/bfs/new_dyn/3b8d2ebd240facf425ebf333504186e3562431495.png@1554w.webp)

## 过渡transition

transition: all 3s ease 0s;

作用：让元素的样式慢慢的变化，配合hover使用，增强网页交互体验

```
 			/* transition: 3s; */
            /* transition 给这个元素添加一个动画过渡*/
            /* transition:参数1 参数2 参数3 参数4 */
            /* 
                参数1:要发生变化的属性 如果全部  那就是all
                参数2:变化的时间
                参数3:缓冲曲线 
                参数4:等待时间
            */
```

注意：

- 默认设置的话，鼠标移入移出都有过渡效果
- 给hover状态设置，鼠标移入有过渡效果，移出没有过渡效果
- 时间必须给时间单位，不然不生效

使用方法

```
    <style>
        .box{
            width: 200px;
            height: 200px;
            background: pink;
            transition: all 1s;
         /* 属性名，只有该属性有过渡，只能写一个 */   
        }
        .box:hover{
            height: 600px;
        }
    </style>
</head>
<body>
    <div class="box"></div>
```

### 缓冲曲线

```
        	 transition: all 6s ease-in; 
            /* ease-in 先慢后快 */
 
            transition: all 6s ease-out;
            /* ease-out 先快后慢 */
			
			ease也是慢快慢
            transition: all 6s ease-in-out;
            /* ease-in-out 慢快慢 */

            transition: all 6s linear;
            /* ease-out  匀速*/
            
            /* 
            先慢后快 cubic-bezier(0.25,0.1,0.25,0.1)
            先快后慢 cubic-bezier(0,0,0.58,1)
            */
```

## 变形transform

属性值

- rotate 旋转 transform: rotate(90deg); 顺时针90°
- skew 斜切  transform: skew(30deg,30deg); x轴 y轴

- scale 缩放 transform: scale(.5);宽高变成原来2分之一

- translate 位移 transform: translate(50px , 50px);

## 旋转中心

```
  /* transform-origin */
  /* 第一个参数代表x轴的位置  第二个参数代表y轴位置 */
  /* 常规情况下 x轴是水平向右  y轴是垂直向下 */
  transform-origin: 200px 200px;
```

## 开启3D

```
transform-style: preserve-3d;
/* 设置了这个三D动画才能展现，不然会叠在一起 */
```



## 3D视距

```
 /* 视距perspective */
 perspective: 1000px;
 /* 设置元素被查看位置的视图，设置了这个能更好地展现3d效果 */
```

## 3D位置移动

```
 transform: translate3d(50px,0,0);
            /* 三个值分别代表 x y z */
            /* 三个参数 都需要写 如果不想写那么多 */
            /* 那么就用translateX  translateY translateZ*/
```

## 背面不可见

```
 backface-visibility: hidden;配合hover使用
```

背面不可见案例

```
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        div{
            width: 300px;
            height: 400px;
            perspective: 1000px;
            position: relative;
        }
        div img{
            position: absolute;
            top: 0;
            left: 0;
            transition: all 2s ease;
        }
        /* 先处理背面的图片 */
        div img:nth-child(1){
            transform: rotateY(180deg);
        }
        /* 处理正面的图片 */
        div img:nth-child(2){
            backface-visibility: hidden;
        }
        div:hover img:nth-child(1){
            transform: rotateY(360deg);
        }
        div:hover img:nth-child(2){
            transform: rotateY(180deg);
        }
    </style>

    <div>
        <img src="../images/42/backface.jpg" alt="">
        <!-- 背面 -->
        <img src="../images/42/foreface.jpg" alt="">
        <!-- 正面 -->
    </div>
```

3D效果案例 鼠标放在盒子上飞来一张图片，离开飞走

```
        *{
            margin: 0;
            padding: 0;
        }
        div{
            width: 300px;
            height: 300px;
            border: 1px solid red;
            margin: 100px auto;
            perspective: 500px;
        }
        div img{
            transition: all 2s ease;
            transform: rotateX(30deg) rotateY(40deg) translateZ(500px);
        }
        div:hover img{
            transform: rotateX(0) rotateY(0) translateZ(0);
        }

    <div>
        <img src="../images/45.jpg" alt="">
    </div>
```

立方体旋转案例

```
        *{
            margin: 0;
            padding: 0;
        }
        div{
            width: 400px;
            height: 400px;
            margin: 100px auto;
            perspective: 1000px;
        }
        div ul{
            width: 400px;
            height: 400px;
            list-style: none;
            position: relative;
            /* 让我们的东西呈现3D效果 */
            transform-style: preserve-3d;
            transition: all 10s ease;
        }
        div ul li{
            width: 400px;
            height: 400px;
            position: absolute;
            top: 0;
            left: 0;
        }
        div ul li:nth-child(1){
            background: url(../images/46/1.jpg);
            transform: translateZ(200px);
            /* 正面 */
        }
        div ul li:nth-child(2){
            background: url(../images/46/2.jpg);
            transform: rotateY(180deg) translateZ(200px);
            /* 背面 */
        }
        div ul li:nth-child(3){
            background: url(../images/46/3.jpg);
            transform: rotateY(-90deg) translateZ(200px);
            /* 左面 */
        }
        div ul li:nth-child(4){
            background: url(../images/46/4.jpg);
            transform: rotateY(90deg) translateZ(200px);
            /* 右面 */
        }
        div ul li:nth-child(5){
            background: url(../images/46/5.jpg);
            transform: rotateX(90deg) translateZ(200px);
            /* 上面 */
        }
        div ul li:nth-child(6){
            background: url(../images/46/6.jpg);
            transform: rotateX(-90deg) translateZ(200px);
            /* 下面 */
        }
        div:hover ul{
            transform: rotateX(360deg) rotateY(360deg);
        }

    <div>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
```



## animation自定义动画

使用步骤

1 定义动画

```
@keyframes 动画名称 {
	from {}
	to {}
}
@keyframes 动画名称 {
	0% {}
	10% {}
	15% {}
	100% {}
}
```

2 使用动画

animation：动画名称 动画时长 速度曲线  重复次数 动画方向 执行完毕时的状态 延迟时间

速度曲线

- 分布动画 steps(次数)

- linear这类

重复次数

- 可以直接写次数数字

- 无限循环 infinite

动画方向

- alternate 反向

执行完毕状态

   需要把重复次数infinite和动画方向alternate去掉

- 默认 backwards是动画结束停留在最初的状态
- forwards 动画停留在结束的状态

注意

- 动画名称和动画时长必须赋予
- 取值不分先后顺序
- 如果有2个时间值，第一个时间表示动画时长，第二个时间表示延迟时间

使用案例

```
        div{
            width: 200px;
            height: 200px;
            background: pink;
            /* 使用动画 */
            animation: change 3s;
        }
        @keyframes change{
            from {
                width: 200px;
            }
            to {
                width: 300px;
            }
        }

    <div></div>
```

```
        .box{
            width: 50px;
            height: 50px;
            background: pink;
            animation: change2 1s;
        }
        @keyframes change2{
            0% {
                width: 50px;
                
            }
            30% {
                width: 250px;
                height: 250px;
            }
            50% {
                width: 350px;
               
            }
            100% {
                width: 650px;
              
            }

        }

 <div class="box"></div>
```

动画属性

```
animation-name	 			动画名称
animation-duration			动画时长
animation-delay				延迟时间
animation-fill-mode			动画执行完毕状态 forwards最后一帧
animation-timing-function	速度曲线	step（数字）：逐帧动画
animation-iteration-count 	重复次数 	infinite无限循环
animation-direction			动画执行方向	alternate为反向
animation-play-state		暂停动画	paused 暂停，通常配合：hover使用

```

# 07-flex布局

简介

之前的流式布局（从左往右从上往下）、浮动布局（浮动布局带来的影响）、层布局（定位）的缺点在移动端会表示的更加明显，    

1.移动端得手机宽度 很多都不一样 
        所以 我们移动端 很少去用浮动布局和层布局 因为他会受手机大小不用影响较大
2.PC端常用这些方案布局 

有一种方案 弹性布局  适用于移动端和pc端

## flex基础

display: flex;

弹性布局 需要把你的display:flex写到你要被定义成容器的盒子上

## flex-direction

主轴的方向

属性值有

- row横轴  默认
- row-reverse 横向反转
- column 纵向
- column-reverse 纵向反向

```
 flex的特性
        当父盒子的高度小于所有盒子加起来和的高度的时候 子盒子就会按照比例进行缩放
        当父盒子的高度大于所有盒子加起来的和的高度的时候 子盒子就正常显示
        宽同上
```

## flex-wrap

换行

- nowrap 不换行 默认
- wrap 换行
- warp-reverse 换行反转

## flex-flow

flex-flow是flex-direction和flex-warp的结合体

flex-flow: column wrap;

## justify-content

处理主轴上的富余空间

属性值

- flex-start 内容在主轴的前面 富余空间在尾部
- flex-end 内容在主轴的后面 富余空间在主轴的前面
- center 内容在主轴的中间  富余空间在两边
- space-around 富余空间环绕
- space-between 富余空间在中间

## align-items

处理交叉轴的富余空间，如果当前主轴是横向  交叉轴就是纵向

属性值

- flex-start 在交叉轴的开始 我们内容的位置
- flex-end  在交叉轴的结束
- center  在交叉轴中间

## align-content

处理交叉轴内容

属性值

- flex-start 内容在交叉轴的前面 富余空间在尾部
- flex-end 内容在交叉轴的后面 富余空间在交叉轴的前面
- center 内容在交叉轴的中间  富余空间在两边
- space-around 富余空间环绕
- space-between 富余空间在中间

## order

排序

```
        order是加在子元素上面的,属性值：数字
        order默认是0
        order越小越靠前
```

## flex-grow

```
		用来设置当父元素大于所有的子元素的和的情况
        就是有富余空间的情况 子如何去分配富余控件
        flex-gorw默认值为0 就是不分配富余空间
        如果值大于0 表示索取 值越大 索取的就越多
```

## flex-shrink

```
		用来设置父元素宽度所有子元素宽度和的情况
        当所有的子元素宽度和大于父元素的时候 如何缩小自己
        默认值是1 如果写0 就表示不缩小
```

## flex-basis

```
		用于设置元素的宽度
        如果元素上同时设置了width 和 flex-basis width将会被覆盖掉
        只有在flex布局中 flex-basis的优先级别比width高
```

 ## flex属性

```
flex是 flex-grow(成长) flex-shrink(缩小) flex-basis(宽度)
一般情况下 flex:1 = flex-grow:1
其他两个单独再设
```



## align-self

```
允许单个容器中的单个元素在交叉轴上和其他有不同的对齐方式
给需要设置的子元素设置
```

- flex-start
- flex-end
- center
- baseline 元素位于容器的基线上