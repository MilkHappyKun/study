# 01-jQ入门

## JavaScript 库

![](https://i0.hdslb.com/bfs/new_dyn/b4eb67100c5f23a00f2d70418f64ecc0562431495.png@1554w.webp)



库都是对原生JS的封装， **内部都是用 JS 实现的**， 我们主要学 **jQuery**

## jQ 概述

一个API库

![](https://i0.hdslb.com/bfs/new_dyn/b2f5b923c41b44d5c5a5111fb9e8bf5b562431495.png@1554w.webp)

**jQ的优点**

<img src="https://i0.hdslb.com/bfs/new_dyn/fb6e416d583ba95f3a103bd7d4bfeade562431495.png@1554w.webp" style="zoom: 67%;" />

## jQ 的基本使用

**jQ的入口函数**

当script标签在head标签里时，此时我们不需要使用window.onload了，直接使用jq的入口函数

```
 	<script src="../jquery-3.6.0.js"></script>
 	<script>
        // 此时我们不需要使用window.onload了
        // 直接使用jq的入口函数 这个更好
        $(function(){
        	$('div').hide();//div被隐藏了
   		})
   		// 另一种写法 可以简写$().ready(function(){ })
        // $(document).ready(function(){
        //     	$('div').hide();
        // })
    </script>
    <style>
        div {
            width: 200px;
            height: 200px;
            background: red;
        }
    </style>
</head>
<body>
    <div></div>
</body>
```

**jQ的顶级对象$**

$ 是 jQuery 的别称，代码里的$可以换成 jQuery

$ 是 jQ 的顶级对象，相当于原生 JS 中的 window ,把元素利用 $ 包装成 jQ 对象，就可以调用 jQ 的方法

**DOM 对象和 jQ 对象的区别**

1. DOM 对象：用原生 JS 获取过来的对象就是 DOM 对象
2. jQuery 对象：用 jQuery 方式获取过来的对象是 jQuery 对象，本质是 jQ 把 DOM 元素进行了包装
3. jQuery 对象只能使用 jQuery 方法，DOM 对象则使用原生的 JS 属性和方法

**DOM 对象和 jQ 对象的转换**

因为原生 JS 比 JQ 更大，原生的一些属性和方法 JQ 没有给我们封装，想要使用这些属性和方法就需要进行转换

1.DOM 对象转换为 JQ 对象：**$(DOM对象)**

```
       	// 1.直接获取 div 这个JQ对象
       	$('div');
       	// 2.DOM 对象转换为 JQ 对象
        var myDiv = document.querySelector('div');
        $(myDiv);
```

2. JQ 对象转换为 DOM 对象

```
		// 1.$('div')[ 索引 ];
		$('div')[0];
		// 2. $('div').get[ 索引 ];
        $('div').get[0];
```

在事件里可以直接用 this 指代这个jQ 对象

```
    $('div').click(function(){
        $(this).css('width','400px');
    })
```



# 02-jQ常用API

## jQ选择器

**什么是选择器？**

​    是用来选中我们节点的工具

​    常见的有 id选择器 类选择器 通配符选择器等等

**基本选择器的使用**

<img src="https://i0.hdslb.com/bfs/new_dyn/bcb7b397f43de35c56b4f1c496bfd24b562431495.png@1554w.webp" style="zoom:80%;" />

  // :root选中根节点 也就是html标签

  console.log($('root'));

```
	// 在盒子中添加内容
	$('.box').html('这是类名为box的盒子')
	// 改变所有的li标签样式
	$('li').css('color','red')
```

**基本过滤选择器的使用**

```
    // :eq(索引)  表示选中索引的标签  索引从0开始
    $('li:eq(0)').css('color', 'red')
    
    // 获取第一个li 最后一个li
    $('li:first').css('color', 'red')
    $('li:last').css('color', 'red')
    
     // :even 选中索引为偶数

    // :odd 选中索引为奇数
 
    // :gt(索引) 表示选中大于索引的标签
    
    // :lt(索引) 表示选中小于索引的标签
    
    // :header 选中所有的h标签，只有h标签特殊其他的选中所有直接 $(':标签名') 就行了
```

**子元素过滤选择器的使用**

```
 	// :only-child 选中只有一个子元素的 
    
    // :nth-child(2n+1) 选中位置是奇数 这里的是从1开始
    
    // div:nth-of-type(2) 选中所有div中的第二个
    
    // div:last-of-type 选中最后一个div
    
    // div:nth-last-of-type(2) 选中倒数第二个div
```

**属性选择器**

```
    // 1.选中有title属性的
    $('h1[title]').css('color','red')
    
    // 2.h1[title!=hello] 选中title属性值不等于hello的
    
    // 3.h1[title^=h] 以h开头的title
    
    // 5.h1[title$=h] 以h结尾的title
    
    // 6.h1[title*=h] 包含h的title
```

**内容过滤器**

```
    // 1.表示内容包含text的
    $("li:contains(abc)").css('color','red')
    
    // 2.选中的是内容为空的
    $('li:empty').css('color','yellow')
    
    // 3.表示li中有选择器a的
    $('li:has(a)').css('border','1px solid red')
    
    // 4.选中内容不为空的
    $('li:parent').css('font-size','30px')
```



**可见性选择器**

```
    <form action="">
        <input type="text">
        <!-- 隐藏域  页面是看不到的  是为了传递数据 -->
        <input type="hidden" value="wangcai">
    </form>

    // :visible  选中可以看到见的元素
    // :hidden 表示选中看不见的元素

    $('ul li:visible').css('border','3px solid red')
```

**表单相关的选择器**

```
    :input  选中所有的表单元素
    :text  选择所有的文本框
    :password  选择所有的密码框
    :radio  选择所有的单选框
    :checkbox  选择所有的多选框
    :submit  选择提交按钮
    :image  选择图片按钮
    :reset  选择重置按钮
    :button  选择普通的button按钮
    :file  选中选择文件按钮
    
    $(':input')
```

## jQ的筛选方法

![](https://i0.hdslb.com/bfs/new_dyn/dbf6631efcca1b23b8933fb1e2dd54b6562431495.png@1554w.webp)

## jQ 样式操作

### 1.操作 css 方法

1. 参数只写属性名，则是返回属性值

```
	console.log($('div').css('width'));// 200px
```

2. 参数是 ''属性名' , '属性值' 修改样式

```
    $('div').css('width','300px')// 宽度改为300px
```

3. 参数是对象形式，方便设置多组样式 属性加不加冒号都行

```
    $('div').css({ height:'300px',backgroundColor:'pink'})
```

### 2.设置类样式方法

1. 添加类

```
    $('div').addClass('nav')   
```

2. 移除类

```
   $('div').removeClass('nav')
```

3. 切换类

```
   $(this).toggleClass('nav')
   
   // 在点击事件中，点击后加上了这个类，再点击移除这个类，一直点击重复这个操作
   $('div').click(function(){
        $(this).toggleClass('nav')
    })
```



## jQ 动画效果

**显示隐藏**

1. show( 参数一，参数二，参数三)

1.三个参数都可以省略，都省略就没有动画，直接显示

2.参数一：表示速度，可以用 slow、normal、fast、时间毫秒值

3.参数二：切换效果 默认swing 可用 linear，一般不用改

4.参数三：回调函数，在动画完成时执行的函数，每个元素执行一次

2. hide() ,跟 show  一样
3. toggle() 切换，跟 show 一样

```
    <script src="../jquery-3.6.0.js"></script>

        div {
            width: 200px;
            height: 200px;
            background: red;
        }

    <div></div>
    <button>显示</button>
    <button>隐藏</button>
    <button>切换</button>

<script>
    $('button').eq(0).click(function(){
        $('div').show('slow','linear',Num())
    })
    $('button').eq(1).click(function(){
        $('div').hide('slow','linear',Num())
    })
    $('button').eq(2).click(function(){
        $('div').toggle('slow','linear',Num())
    })
    
    num = 0;
    function Num(){
        num++;
        console.log(num);
    }
```

**滑动**

1.向下滑动

slideDowm() 同上 

2.向上滑动

slideUp()  同上

3.滑动切换

slideToggle() 同上

**事件切换**

1.hover( 函数一，函数二) 是鼠标经过和离开的符合写法

1. 函数一 鼠标移动到元素上触发 相当于 mouseenter 可以省略
2. 函数二 鼠标移出元素要触发的函数 相当于 mouseleave

```
	// 效果：鼠标放在盒子上盒子向上滑动 盒子刚离开

	$('div').eq(0).hover(function(){
            $('div').slideUp('slow','linear')
        },function(){

            $('div').slideDown('slow','linear')
        })
```

2.hover( 函数)  只写一个函数，那么鼠标经过和鼠标离开都会触发这个函数

```
    $('div').eq(0).hover(function(){
        $('div').slideToggle('slow','linear')
    })
```



**淡入淡出**

1.淡入 fadeIn() 同上

2.淡出 fadeOut() 同上

3.淡入淡出切换 fadeToggle() 同上

4.修改透明度 fadeTo(参数一，参数二，参数三，参数四)

- 参数一 速度 必写
- 参数二 透明度 0~1 必写
- 参数三 切换效果 默认swing 可用 linear 一般不用改
- 参数四 回调函数

```
    $('button').eq(3).click(function(){
        $('div').fadeTo('slow',.5);
    })
```

**自定义动画**

1.animate(参数一，参数二，参数三，参数四)

- 参数一 要改变的样式属性，以对象形式传递，属性名可以不带引号， 必写
- 参数二 速度 必写
- 参数三 切换效果 默认swing 可用 linear 一般不用改
- 参数四 回调函数

```
    $('button').eq(4).click(function(){
        $('div').animate({left: '200px'},1000);//让这个盒子向右移动
    })
```



### 动画队列

动画或效果一旦触发就会执行，如果多次触发就造成多个动画或者效果排队执行，

表现 当鼠标快速滑动，就会几乎同时触发很多动画

**停止排队方法**

- stop() 方法用于停止动画或效果

- 在动画或效果前面加上 .stop() 就是结束上一次动画

```
    $('div').eq(0).hover(function(){
        $('div').stop().slideToggle('slow','linear')
    })
```

## jQ属性操作

### 固有属性prop()

**获取元素固有属性**

.prop('属性名')

```
    // 获取a标签的href 
    console.log($('a').prop('href'));
    
    // 获取这个表单的状态 是否被选中
    $('input').change(function(){
        console.log($(this).prop('checked'));
    })
```

**设置元素固有属性**

​	.prop('属性名','属性值')

```
	$('a').prop('title','123456')
```

自定义属性 prop 得不到

### 自定义属性attr()

.attr('属性名') // 获取

.attr('属性名','属性值') // 设置

### 数据缓存data()

data() 方法可以在指定的元素上存取数据，并不会修改 DOM 元素结构，一旦页面刷新，之前存放的数据都将被移除

加的东西 页面和标签里看不到

```
    <span>123</span>
	
	//相当于把元素当作变量 把 123456 存到元素里面去	
    $('span').data('uname','123456');// 存数据
    console.log($('span').data('uname'));// 取数据
```

还可以获取 HTML5 自定义属性 data-index 得到的是数字型

```
    <div data-index="8">123</div>
	
    console.log($('div').data('index'));// 8 字符串也行
```



## jQ 文本属性值

主要针对**元素**的内容和**表单的值**操作

**1.普通元素内容 html() (相当于原生 innerHTML )**

html() // 获取元素内容

```
    <div data-index="8">123</div>

    console.log($('div').html());//123
```

html('内容') // 设置元素的内容

```
    <div data-index="8">123</div>

    $('div').html('456');// 页面的div内容变成了456
```

**2.普通元素文本内容 text() (相当于原生 innerTEXT)**

同上

**3.获取设置表单值 val() （相当于原生value）** 

同上

## jQ 元素操作

主要是 遍历、创建、添加、删除 元素操作

### 遍历元素 each

 **.each()**

$('div').each(function (索引 ,DOM 元素对象) { 具体代码 })

- .each()方法遍历匹配的每一个元素，主要用 DOM 处理
- 回调函数的2个参数分别是 每个元素的索引 每个 DOM 对象
- 要使用 jQ 方法，需要给这个 DOM 元素转换为 jQ 对象 $(domEle)

```
    <div>1111</div> 
    <div>2222</div>
    <div>3333</div>
	
	//给这三个div分别设置成蓝 绿 红 
    var arr = ['blue','green','red']
    $('div').each(function(index,domEle) {
        $(domEle).css('color',arr[index])
    })
```

**$.each()**

$.each(要遍历的对象，function (索引，DOM对象 ) { 具体代码 } )

- $.each()方法可以用于遍历任何对象，主要用于数据处理，比如数组、对象

```
    // //给这三个div分别设置成橘 蓝 红 
    var arr = ['orange','blue','red']
    $.each( $('div'),function(index, domEle){
        $(domEle).css('color',arr[index])
    })
```

```
		// 我们需要获取当前li的索引  使用jq的一个原生方法
        // index()
        var li_index = $(this).index();
        console.log(li_index);
```



### 创建、添加、删除、替换元素

**创建元素**

语法：$('<li></li>'); 动态创建一个li标签

```
	var newDiv = $('<div>444</div>');
```

**添加元素**

1.内部添加 

append() 内容添加，并且放到内容的**最后面**

```
	$('body').append(newDiv);
```

prepend() 内容添加，并且放到内容的**最前面**

```
	$('body').prepend(newDiv);
```

2.外部添加

.after()  把内容放到目标元素的后面

```
	$('div').eq(2).after(newDiv);
```

.before()  把内容放到目标元素的前面

```
    $('div').eq(2).before(newDiv);
```

**删除元素**

.remove() 删除元素本身

```
    $('div').eq(1).remove();// 删除了索引为1的div
```

.empty() 删除匹配的元素集合中的所有的子节点

```
  	$('div').empty(); 把div标签下的所有子节点删除 这个标签还有，有宽高和颜色也能看到
```

.html('') 清空匹配的元素内容 必须得有这个 '' 不然就是 返回值

```
   $('div').eq(1).html('');
```

## jQ 宽高、位置操作

### jQ 宽高方法

![](https://i0.hdslb.com/bfs/new_dyn/2e2e82bd60ea711f19074aa702c7cf0a562431495.png@1554w.webp)

**注意**

- 以上参数为空，是获取相应值，返回的是数字型
- 如果参数为数字，则是修改响应值
- 参数可以不写单位

```
    console.log($('div').width());//获取div的宽度为300px
     $('div').width(200);// 设置div的宽度为200px
     
     $(window).height() //页面一屏幕的高度
     窗口滚动的距离 $(window).scrollTop()
```

用法一样

### jQ 位置方法

**offset()设置或获取元素偏移**

- offset() 方法设置或返回被选中元素相对于 **文档** 的偏移坐标，跟父级没有关系 body

- 该方法有两个属性 offset().left  offset().top 
- 可以设置元素的偏移

```
    // 获取元素偏移量
    console.log($('.box').offset());//对象{top: 540, left: 108}
    console.log($('.box').offset().left); //108
    console.log($('.box').offset().top);//540
    
    //设置元素偏移量
    $('.box').offset({
        top: 200,
        left: 200
    })
```

**postion()**

- 返回被选元素相对于 **带有定位的父级** 偏移坐标，如果父级都没有定位，那么以文档为准 body
- 只能获取坐标，不能设置坐标

代码同上

**scrollTop() 被卷去的头部 /scrollLeft() 被卷曲的左侧**  类似一个握成卷的纸

```
   $(function() {
    	// 页面滚动事件
    	$(window).scroll(function(){
        	// 文档 body 卷曲的高度
        	console.log($(document).scrollTop());
    	})
   })
```

# 03-jQ 事件

## jQ 事件注册

**单个事件注册**

element.事件(function(){ })

```
$('div').click(function(){
    console.log('卡面来打 henXin');// 给所有的div 都添加上了这个点击事件
})
```

## jQ 事件处理

### on() 事件绑定

**1.on() 绑定多个事件**

element.on( events，[selector]，fn)

- events 一个或多个用空格分隔的事件类型
- selector 元素的子元素选择器
- fn 回调函数

```
   // 两个事件内容不同时 
   $('div').on({
        click:function(){
            $(this).css('background','skyblue');
        },
        mouseenter:function(){
            $(this).css('background','red');
        }
    })
    // 两个事件内容相同时
        $('div').on('click mouseleave', function() {
        alert('123');
    })
```

**2.on() 事件委托**

事件委托：把原来加给子元素身上的事件绑定到父元素上，把事件委派给父元素

```
        .green{
            color: rgb(236, 20, 20);
        }

       <ul>
        <li>123</li>
        <li>123</li>
        <li>123</li>
       </ul>
       
		// 点击哪个li 这个li的文字变成绿色，
		// 事件绑在 ul 上，触发对象是 li，事件冒泡冒到父亲 ul 身上 执行这个事件
        $('ul').on('click','li',function() {
            $(this).addClass('green');
        })
```

**3.on() 给未来动态创建的元素绑定事件**

```
       <ul>
            <li>123</li>
            <li>123</li>
            <li>123</li>
       </ul>
		
		// 后来创建的li点击它也会弹出123
        $('ul').on('click','li',function() {
            alert(123);
        })
        var li = $('<li>我是后来创建的</li>')
        $('ul').append(li);
```

### off() 解绑事件

通过移除 on() 方法添加的事件处理程序

- $('div').off(); 括号为空 解绑所有事件

- $('div').off('click'); 只解绑点击事件
- $('ul').off('click','li'); 解除事件委托

如果有的事件只想触发一次，可以使用one() 来绑定事件 用法和on() 差不多

### trigger() 自动触发事件

**1.element.事件() ** 

```
        .green{
            color: rgb(236, 20, 20);
        }

       <ul>
            <li>123</li>
            <li>123</li>
            <li>123</li>
       </ul>
		
		// 刷新页面 直接执行一次点击事件
        $('ul').on('click','li' ,function(){
            $(this).addClass('green');
            console.log(1);
        })
        $('li').eq(1).click();
```

**2.element.trigger('type')**

$('li').eq(1).trigger('click');  其余同上

**3.element.triggerHandler('type')**

$('li').eq(1).triggerHandler('click');  其余同上

**.triggerHandler() 与前面两个方法的不同**

- 不会触发元素的默认行为 比如 input 文本框点击时的光标闪烁

## jQ 事件对象

```
       div{
        width: 300px;
        height: 300px;
        background: pink;
       }

   		<div></div>

        $('div').on('click',function(e) {
            console.log(e);
        })
```

通过点击 div ，查看输出的事件对象，可以看出它和 DOM 事件差不多

**阻止默认行为**

e.preventDefault() 或者 return false；

**阻止冒泡**

e.stopPropagation()

# 04-jQ 其他方法

## jQ 拷贝对象

$.extend( [ deep ]，target,object1,[ objectN ])

- deep: 如果设为true 是深拷贝 默认是false 浅拷贝 可不写
- target 要拷贝到的目标对象 原来有内容的话会被覆盖
- object1 等待被拷贝的第一个对象
- objectN 等待被拷贝的第N个对象
- 浅拷贝 是把被拷贝的对象 **复杂数据类型中的地址** 拷贝给目标对象，修改目标对象 **会影响** 被拷贝对象 拷贝地址
- 深拷贝 十八里面的数据 **完全复制** 一份给到目标对象，如果里面有不冲突的属性会合并到一起



```
        var targetObj = {};
        var obj = {
            id : 1,
            name: '小明'
        }
        $.extend(targetObj,obj)
        console.log(targetObj);// {id: 1, name: '小明'}
```



## 多库共存

**问题概述**

 jQ 使用 $ 作为标识符，随着 jQ 的流行，其他的 JS 库也会使用 $ 作为标识符，这样一起使用会引起冲突

**客观需求**

需要一个解决方案，让 jQ 和其他的 JS 库不存在冲突，可以同时存在，这就叫做多库共存

**jQ 解决方案**

1.把里面的 $ 符号统一改成 jQuery 比如 就比如 jQuery('div')

2.jQ 变量规定新的名称：$.noConflict()

var xx = $.noConflict(); $ 符号变成了 新定义的 变量 

```
       // 点击 div 弹出123
       var suiBian = $.noConflict();
       suiBian('div').on('click',function(){
        alert(123)
       })
```



## jQ 插件

jQ 功能有限，想要完成复杂的特效效果，可以借助 jQ 插件完成

因为这些插件也是依赖于 jQ 来完成的，所以必须要先引入 jQ 文件，因此也成为 jQ 插件

jQ 插件常用网站

1. jQ 插件库 https://www.jq22.com/

2. jQ 之家  http://www.htmleaf.com/

瀑布流插件使用

p63

图片懒加载技术

全屏滚动插件使用

bootstrap 组件

bootstrapJS 插件

