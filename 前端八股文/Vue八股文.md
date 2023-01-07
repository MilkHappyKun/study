## Vue阶段八股文

## 2023/1/2背诵

### 1. 计算属性能不能绑定在v-model上？

​	因为计算属性有set get 方法，所以可以使用在v-model上面实现双向绑定。



### 2. 侦听器能监听哪些变量变化？

​	能够监听data中的数据、计算属性、vuex仓库数据、$route中的路由信息等等，凡是那些带有__ ob__的变量都能被监听到。



### 3. 说一下Vue的响应式原理？()

​	当vue组件被创建时，在生命周期的第一阶段，Vue使用Object.defineProperty()对data选项进行遍历劫持并添加get/set钩子；在生命周期第二阶段，指令第一次与声明式变量接触时，发生依赖收集，再调用当前组件的watcher第一次更新DOM，DOM视图就显示出来了。当声明式变量发生变化时，vue再次通知Watcher更新视图，这就是响应式原理

### 4.你是如何理解MVVM的

​		MVVM 是 Model，View，ViewModel 的缩写。MVVM 是一种设计模式。Model 是数据层，用于存储数据和对数据进行增删改查。 View 是视图层，也就是UI界面，用于将数据模型转化成UI展现出来，ViewModel 是一个同步 View 和 Model 的对象。

​		在MVVM架构下，View 和 Model没有直接的联系，而是通过 ViewModel 进行交互，Model 和 View 之间的交互是双向的，因此 View 的把变化会同步到 Model中，而Model 数据的变化也反应到 View 上。

​		ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

### 5. 说一下Vue的生命周期（展开说，不仅仅是那几个钩子）？

 **在创建/挂载/更新/销毁阶段，Vue在背后分别做了些什么事儿？**

Vue的生命周期一共分四个阶段，不同阶段有不同的钩子函数：

1. 创建阶段：beforeCreate、created

- 在beforeCreate之前会声明methods中的方法和声明生命周期钩子函数。

- 在created之前会注入一些数据，初始化响应式系统，我们通常在这个钩子函数中调接口，获取路由参数等。

2. 挂载阶段：beforeMount、mounted

- 在beforeMount之前会通过el $meount template找模板，会把模块变成render函数  调用render函数创建虚拟DOM，虚拟DOM转化成真实DOM，进行挂载。

- 在mounted时，表示真实DOM已挂载完毕，我们在这个钩子中通常调接口，开定时器，DOM操作，建立websocket连接  实例化echarts实例等。

3. 更新阶段：beforeUpdate、updated

- 当数据变化时，会触发beforeUpdate钩子。

- 在updated之前，要生成新的虚拟DOM，新的虚拟DOM和老的虚拟DOM进行对比，会执行patch运算，通过diff算法，找到两个虚拟DOM的最小差异，找到后，进行异步更新，我们不能在这个钩子中更新数据，会导致死循环。

4. 销毁阶段：beforeDestroy、destroyed

- 当我们手动调用$destory()或路由切换时，会调用beforeDestroy这个钩子函数，我们可在这个钩子函数中清空定时器，解除事件绑定，清除缓存。

- 当组件销毁时，就会移除当前组件的watcher，DOM就无法再更新，移除所有子组件，移除事件监听器，响应式系统失效，组件死亡。

* 与动态组件的两个钩子：activated(激活)、deactivated(休眠)
* 与组件异常捕获的一个钩子：errorCaptured

## 2023/1/3背诵

### 6. 虚拟DOM存在的价值点在哪里？

把DOM更新力度降到最低，规避人为DOM滥操作，提升性能，配合DIFF算法，可以让页面性能有质的提升。
diff算法：把树形结构按照层级分解，只比较同级元素，不同层级的节点只有创建和删除操作。

### 7. 谈一谈你对 Vue.nextTick() 的理解？有什么用？

- 理解：Vue.nextTick() 是等待下一次 DOM 更新刷新的工具方法。在更新队列中每一个更新任务都是一个更新单元，nextTick表示下一个更新单元。

- 作用：在修改数据更新DOM之后立即使用 nextTick() ，获取更新后的 DOM。



### 8. 简述Vuex的工作流程？

- 首先通过dispatch去提交一个action，
- 在action接收到这个事件后，在action种进行一些异步或同步操作，根据情况分发给不同的mutation，
- actions通过commit触发mutation，
- 然后mutation去更新state，在state更新后，就会通知vue进行渲染



### 9. Vue中逻辑复用技巧有哪些？

- 组件：复用UI+逻辑
- 混入
- 自定义指令
- 渲染函数和JSX
- 插件
- 过滤器
- V3中的hook



### 10. 你项目的鉴权怎么做的？你这个管理系统的权限怎么设计的？

- 我们之前的，做的项目大概有30个左右的模块，所以权限这一块是前端去处理的。

处理的流程是：

- 前端登录获取token，在导航守卫中，实现权限设计。
- 首先判断有没有token，没有token，直接跳到登录页面。
- 有token会进一步判断vuex中有没有用户信息。如果没有用户信息，拿着token，调用接口获取用户信息，
- 从用户信息中拿到角色，然后通过角色和路由元信息中的角色进行对比，生成当前用户可访问的动态路由规则，
- 有了动态访问的路由规则，再通过addRoutes方法，把得到的动态访问的路由规则添加到路由系统。



## 2023/1/4背诵

### 11. 谈一谈Vue中组件通信？

1)父子组件通信：

- 父传子：父组件可以在子组件身上使用v-bind（简写:）写自定义属性来传递值，在子组件内使用props接收数据。	
- 子传父：在子组件绑定事件和事件触发的函数，在函数中使用this.$emit()方法，参数1'要触发的函数名'，参数2 要传递的值；在父组件中绑定要触发的自定义事件和事件触发的函数，函数里的第一个参数就是子组件传递过来的值

2)provide/inject：这是在组件树中，自上而下的一种数据通信方案，只能父级组件中向后代组件传递。二者的绑定不是可响应的

3)通过ref获取子组件的data：在父组件给子组件写上ref,引用指向子组件实例，可以得到子组件的data数据

4)插槽通信：借助&lt;slot>组件实现从子组件向父组件传递数据，在自定义组件中使用this.$slots访问父组件给的插槽实例；在父组件插槽中使用#default='scoped'访问子组件&lt;slot>回传的数据。

5)$parent/$children：借助$parent/$children可以实现，在任一组件中访问组件树中的其它任意组件实例，可以做到在组件中随意穿梭。($parent表示的是当前组件的父组件实例，$children表示的是当前组件的子组件们。)

6)事件总线

7)Vuex通信

### 12.v-show 与 v-if 有什么区别？

⽤法上的区别：
1)v-show是不⽀持template；
2)v-show不可以和v-else⼀起使⽤；

本质的区别：
1)v-show元素⽆论是否需要显示到浏览器上，它的DOM实际都是有存在的，只是通过CSS的display属性来进⾏切换；
2)v-if当条件为false时，其对应的原⽣压根不会被渲染到DOM中；

开发中如何进⾏选择呢？
1)如果我们的原⽣需要在显示和隐藏之间频繁的切换，那么使⽤v-show；
2)如果不会频繁的发⽣切换，那么使⽤v-if；

### 13. 数组中的哪些⽅法会触发视图的更新？

Vue 将被侦听的数组的变更⽅法进⾏了包裹，所以数组变化也将会触发视图更新，这些被包裹过的⽅法包括：push()、pop()、shift()、unshift()、splice()、sort()、reverse() 反转

上⾯的⽅法会直接修改原来的数组，所以它们会触发视图更新。但是有些不会替换原来的数组，⽽是会⽣成新的数组方法⽐如 ﬁlter()、concat() 和 slice()，将不会触发视图更新。



### 14. Vue中v-for的key 有什么作⽤？

1)key属性主要⽤在Vue的虚拟DOM算法，key是VNode的唯⼀标记，通过这个key，diff 操作可以更准确、更快速的达到复用节点，更新视图。
2)使⽤key时，它会基于key的变化重新排列元素顺序，并且会移除/销毁key不存在的元素。
3)如果不使⽤key，Vue会使⽤⼀种最⼤限度减少动态元素并且尽可能尝试就地修改或复⽤相同类型元素的算法



### 15.computed和method有什么区别？

**计算属性和方法相同点**：
1)都可以通过this来访问
2)都可以对⼀些数据进⾏处理和计算

**computed和method的区别**
1)computed底层会缓存, 性能更⾼
2)计算属性会基于它们的依赖关系进⾏缓存;
3)在数据不发⽣变化时，计算属性是不需要重新计算的
4)但是如果依赖的数据发⽣变化，在使⽤时，计算属性依然会重新进⾏计算

## 2023/1/5

### 16. 什么是双向绑定？v-model的本质是什么？

**双向绑定**:
1)即当数据发⽣变化的时候，视图也就发⽣变化，当视图发⽣变化的时候，数据也会跟着同步变化
2)v-model 是语法糖，它负责监听⽤户在表单元素中的输⼊事件来更新数据

**表单元素使⽤v-model的本质**：
1)v-bind绑定value属性的值
2)v-on绑定input事件监听到函数,函数会获取最新的值赋值到绑定的属性中
<input type="text" :value="message" @input="message = $event.target.value" />

**组件使⽤v-model的本质**：
1)将其 value 属性 绑定到⼀个名叫 modelValue 的 prop 上；
2)在其 input 事件被触发时，将新的值通过⾃定义的 update:modelValue 事件抛出；
<Counter v-model="appCounter"/>   <!-- 相当于-->
<Counter v-bind:modelValue="appCounter" @update:modelValue="appCounter=$event"/>

### 17.data选项为什么是⼀个函数而不是对象？

- JavaScript中的对象是引⽤类型的数据，当多个实例引⽤同⼀个对象时，只要⼀个实例对这个对象进⾏操作，其他实例中的数据也会发⽣变化。

- 而在Vue中，我们更多的是想要复⽤组件，那就需要每个组件都有⾃⼰的数据，这样组件之间才不会相互⼲扰。
- 所以组件的数据要写成函数的形式。数据以函数返回值的形式定义。

- 这样当我们每次复⽤组件的时候，就会返回⼀个新的data，每个组件都有⾃⼰的私有数据空间，它们各⾃维护⾃⼰的数据，不会⼲扰其他组件的正常运⾏。



### 18. Vue data 中某⼀个属性的值发⽣改变后，视图会⽴即同步执⾏、重新渲染吗？

- 不会⽴即同步执⾏重新渲染。

- Vue 实现响应式并不是数据发⽣变化之后 DOM ⽴即变化，⽽是按⼀定的策略进⾏ DOM 的更新。

- Vue 在更新 DOM 时是异步执⾏的。只要侦听到数据变化， Vue 将开启⼀个队列，并缓冲在同⼀事件循环中发⽣的所有数据变更。

- 如果同⼀个watcher被多次触发，只会被推⼊到队列中⼀次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是⾮常重要的。

- 然后，在下⼀个的事件循环”tick”中，Vue 刷新队列并执行实际已去重的⼯作。



### 19. 在 Vue. js开发环境下调⽤API接⼝，如何避免跨域

1. proxy中配置反向代理

   1)在vue.conﬁg.js中的devServer选项中的proxy中配置反向代理
   2)在vite.conﬁg.js中的server选项中的proxy中配置反向代理

2. 直接后端开发⼈员配置cors



### 20.v-if和v-for⼀起使⽤的弊端及解决办法

弊端

- vue2 中在⼀个元素上同时使⽤ v-if 和 v-for 时， v-for 会优先作⽤，导致每循环一次就会去v-if一次，
- 而v-if是通过创建和销毁dom元素来控制元素的显示与隐藏，
- 所以就会不停的去创建和销毁元素，造成页面卡顿，性能下降。
- vue3 中 v-if 总是优先于 v-for ⽣效，没有这个问题。

解决办法

- 在v-for的外层或内层包裹⼀个元素来使⽤v-if



## 



### 1. 你怎么理解指令？工作中你封装过自定义指令吗？举一些例子

​	在vue中以 v- 开头的行内属性，都是指令，指令本质上是对dom的操作，vue封装这些指令就是为了我们更为合理符合规范的操作dom，避免DOM滥操作，不同的指令可以实现不同的功能。
​	我们可以注册自定义指令，自定义指令也是对DOM操作的封装，

​	我封装过 长按复制粘贴指令，输入框防抖指令，页面水印指令

https://zhuanlan.zhihu.com/p/337659611 ：
https://juejin.cn/post/6906028995133833230：



### 5. 你工作中有没有封装比较好的组件？

```txt
尝试封装过 

模态框组件，https://juejin.cn/post/7011702781987782670 窗口
表单组件，https://juejin.cn/post/7091653916948955173
表格组件，https://blog.csdn.net/qq_41883423/article/details/111564062
面试之前，需要找对应的代码看一看。

面试之前，需要封装几个组件，真实开发中，不会自己封装，都是用第三方封装好的，或公司自己的组件库。
```



### 9. 你有封装过Vue插件？怎么封装的？封装过什么？


插件：在Vue生态中，除了Vue本身，其它所有与Vue相关的第三方包，都是插件，都得以插件的方式进行集成。

插件作用：是一种更加高级的代码复用技术，可以以插件的方式为我们提供可复用的组件、混入、指令、过滤器、原型链API。

如何封装Vue插件？
	定义一个对象，里面有一个 install 方法，或者直接定义一个方法，这个方法第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象，然后在这个方法里 添加全局方法或 property、全局资源、注入组件选项和实例方法。



在项目中我之前二次封装axios，把它封装成一个插件，参考：
https://juejin.cn/post/6844903599764406280

封装右键菜单插件：
https://juejin.cn/post/6906788973981466637





### 15. 说说你对 SPA 单⻚⾯的理解，它的优缺点分别是什么？

**理解：**

​	SPA（ single page application ）仅在 Web ⻚⾯初始化时加载相应的 HTML、JavaScript 和 CSS。⼀旦⻚⾯加载完成，SPA 不会因为⽤户的操作⽽进⾏⻚⾯的重新加载或跳转；取⽽代之的是利⽤路由机制实现 HTML 内容的变换，UI 与⽤户的交互，避免⻚⾯的重新加载。

优点：
1)⽤户体验好、快，内容的改变不需要重新加载整个⻚⾯，避免了不必要的跳转和重复渲染；
2)基于上⾯⼀点，SPA 相对对服务器压⼒⼩；
3)前后端职责分离，架构清晰，前端进⾏交互逻辑，后端负责数据处理；

缺点：
1)初次加载耗时多：为实现单⻚ Web 应⽤功能及显示效果，需要在加载⻚⾯的时候将JavaScript、CSS 统⼀加载，部分⻚⾯按需加载；
2)前进后退路由管理：由于单⻚应⽤在⼀个⻚⾯中显示所有的内容，所以不能使⽤浏览器的前进后退功能，所有的⻚⾯切换需要⾃⼰建⽴堆栈管理；
3)SEO 难度较⼤：由于所有的内容都在⼀个⻚⾯中动态替换显示，所以在 SEO 上其有着天然的弱势。













### 25. 谈谈你对 keep-alive 的了解？

keep-alive 是 Vue 内置的⼀个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：
1)⼀般结合路由和动态组件⼀起使⽤，⽤于缓存组件。
2)提供 include 和 exclude 属性，两者都⽀持字符串或正则表达式。include 表示只有名称匹配的组件会被缓存。exclude 表示任何名称匹配的组件都不会被缓存。其中 exclude 的优先级⽐ include ⾼。
3)对应两个钩⼦函数 activated 和 deactivated 。当组件被激活时，触发钩⼦函数 activated。当组件被移除时，触发钩⼦函数 deactivated。



### 26. 什么是侦听器？有什么用？

定义：

- 侦听器 watch是 Vue 提供的一种用来观察和响应Vue实例上的数据变化的属性。当被侦听的数据发生变化时，会触发对应的侦听函数。

作用：侦听器watch用于监听一个变量的变化，在变量变化时执行一些“副作用”，去做另一件事儿。



### 27. 侦听器能不能监听数组/对象的变化？

- 可以，但默认为了性能考虑，不监听深层,如果需要深层侦听，需要配置deep:true



### 28. 如何监听一个对象中的某个属性变化？

- 需要配置deep:true



### 29. 侦听器为什么默认不支持深度监听？

- 为了性能优化，



### 30. 什么是组件化？你怎么理解组件化？

- 现在主流的开发框，都是基于组件化的，组件的作用就是为了实现UI和逻辑的复用，
- 在vue组件中，提供了很多的选项，如data,computed,watch,method,components,filter... 可以方便我们实现业务逻辑，
- 组件化的好处是可以复用UI和逻辑，在业务开发中，一般都会合理的划分组件，在vue中组件化的核心就是自定义属性，自定义事件，自定义插槽。



### 31.重复

### 32. 说说Vue插槽的作⽤和平时开发中的应⽤？

插槽的作⽤:
1）⽀持在⽗组件⾃定义⼦组件中的个内容
2）让⼦组件更具有通⽤性，不必限定死某个内容

插槽平时开发中的应⽤:
1）在封装组件时，如果组件中的某个内容是动态的或不确定的，就可以使⽤插槽来代替了。
2）在使⽤第三⽅库时，往往会通过使⽤插槽类⾃定义第三⽅组件中的某些内容。



### 33.⽗⼦组件的⽣命周期顺序

加载渲染过程： ⽗beforeCreate -> ⽗created -> ⽗beforeMount -> ⼦beforeCreate -> ⼦created -> ⼦beforeMount ->⼦mounted -> ⽗mounted

⼦组件更新过程：⽗beforeUpdate -> ⼦beforeUpdate -> ⼦updated -> ⽗updated

⽗组件更新过程：⽗beforeUpdate -> ⽗updated

销毁过程：⽗beforeDestroy -> ⼦beforeDestroy -> ⼦destroyed -> ⽗destroyed



### 34. 什么是Composition（组合式） API 和 Options（选项式） API？

Composition（组合式）API简介

- Composition（组合式） API 是vue3更新的⼀组 API，在 Vue 3 中，它主要与script setup语法⼀起使⽤，它允许我们使⽤导⼊的函数⽽不是声明选项来编写 Vue 组件。

好处

- 使⽤Composition（组合式） API编写组件时可以根据逻辑功能来组织代码。我们可以把⼀个功能所⽤到的API 放在⼀起，这样可以让代码⾼内聚和低耦合，进⽽提⾼了代码的逻辑的复⽤性。

Options （选项式）API简介

- Options（选项式） API是指在对应的属性中编写对应的功能模块, ⽐如data定义数据、methods中定义⽅法、computed中定义计算属性、watch中监听属性改变，也包括⽣命周期钩⼦

弊端: 

- 当我们实现某⼀个功能时，这个功能对应的代码逻辑会被拆分到各个属性中,当组件变得复杂，导致对应属性的列表也会增⻓，这可能会导致组件难以阅读和理解



### 35. Composition API和之Options API有什么区别?

1）在逻辑组织和逻辑复⽤⽅⾯，Composition（组合式） API是优于Options（选项式） API。
2）Composition （组合式）API⼏乎是函数，会有更好的类型推断，对于TS的⽀持更友好。
3）Composition （组合式）API对 tree-shaking 友好，代码也更容易压缩。
4）Composition （组合式）API中⻅不到this的使⽤，减少了this指向不明的情况。
5）Composition （组合式）API⽤起来稍微复杂⼀点，⽽Options API就⾮常简单、易于使⽤。



### 36. 说说Vue3中setup函数的作⽤？

- 在Vue3中， setup() 函数充当了组件编写Composition(组合式) API 的⼊⼝点。
- setup函数参数主要有两个参数：
  1）第⼀个参数：props , ⽗组件传递过来的属性会被放到props对象中
  2）第⼆个参数：context, 它⾥⾯包含三个属性：attrs：所有的⾮prop的属性；slot：⽗组件传递过来的插槽；emit：当我们组件内部需要发出事件时会⽤到emit

- 可以在setup中可以定义响应式数据、⽅法、计算属性、侦听器等等。
  可以通过setup的返回值来替代data选项，让数据可以直接在template中使⽤。



### 37.ref和reactive有什么区别？开发中如何选择？

区别1：

- ref和reactive都是响应式的API，都可以⽤来定义响应式的数据。
- ref可以包裹任意数据类型，reactive只能包裹复杂数据类型，⽐如对象、数组。

区别2：

- ref返回⼀个ref对象，在script中取值需要通过value属性，但在模板中使⽤会进⾏不需要调⽤value。
- reactive包裹的是复杂数据类型，直接取⾥⾯的属性即可。

区别3：

- ref⼏乎可以应⽤在任何场景，⽽且包含reactive适合的场景
- reactive的应⽤场景⽐较受限，第⼀：值⽐较固定，第⼆：值与值之间是有联系的。
- 我在开发中喜欢用ref



### 38. Composition API常⻅的⼏个函数与⽤法？

- ref：包裹任意类型的值，将包裹的值加⼊响应式

- reactive：包裹复杂类型的值，将包裹的值加⼊响应式

- computed：把⼀些复杂逻辑⽤computed进⾏包裹，如同选项式 API中的计算属性⼀样，computed会⾃动收集相关依赖，当依赖发⽣变化时，会⾃动进⾏更新

- ⽣命周期钩子：Vue3中想要在beforeCreate和created中做的事，直接在setup中做即可，Vue3的其他的⽣命周期函数都要在前⾯加⼀个on，然后需要在vue中主动引⼊

- watch：
  1）watch可以监听单个数据源，也可以监听多个数据源
  2）watch是懒执⾏，第⼀次是不会执⾏的，除⾮你为其提供第三个参数中的immediate属性为true
  3）watch只有等到监听的数据源发⽣了变化后，才会执⾏回调函数
  4）watch可以获取监听数据源的前后变化的值
  5）侦听多个数据源的时候，第⼀个参数是数组类型

- watchEffect：
  1）watchEffect会⾃动收集依赖，收集的依赖是回调函数中有哪些数据是加⼊响应式的
  2）如果这个值加⼊了响应式就会被收集起来，当被收集的值发⽣了变化，就会重新执⾏这个回调函数
  3）watchEﬀect第⼀次执⾏是在DOM挂载前执⾏的，所以如果你想在第⼀次执⾏时拿到DOM元素，需要传⼊第⼆个参数，第⼆个参数是⼀个对象，让其ﬂush属性的值为post即可

- toRefs：
  1）对reactive进⾏解构后就失去了响应式的效果，因为reactive返回的是⼀个Proxy对象
  2）对Proxy对象进⾏解构，拿到的是纯净的值
  3）如果想要对reactive进⾏解构，需要对其包裹⼀个toRefs
  4）这么做相当于为reactive中的每⼀个值包裹了⼀个ref



### 39. Vue3中的watch和watchEﬀect有什么区别？

**watch：**
1）watch第⼀个参数是要侦听的数据源，当侦听多个数据源的时候，第一个参数是数组
2）watch是懒执⾏，第⼀次是不会执⾏的，除⾮你为其提供第三个参数中的immediate属性为true
3) watch只有等到监听的数据源发⽣了变化后，才会执⾏回调函数
4) watch可以获取监听数据源的前后变化的值

**watchEﬀect:**
1)watchEffect会⾃动收集依赖，收集的依赖是回调函数中有哪些数据是加⼊响应式的
2)当被收集的值发⽣了变化，就会重新执⾏这个回调函数
3)watchEffect在DOM挂载前会执⾏一次，



### 40. 说说Vue3中script setup语法糖常⻅⽤法？

《看不懂》

```txt
script setup 是在单⽂件组件中使⽤ Composition（组合式） API 的编译时语法糖，相⽐与之前的setup函数写法，它具有更多的优势：
1）更少的样板内容，更简洁的代码。
2）能够使⽤纯 TypeScript 声明 props 和抛出事件。
3）更好的运⾏时性能 (其模板会被编译成与其同⼀作⽤域的渲染函数，没有任何的中间代理)。
4）更好的 IDE 类型推断性能 (减少语⾔服务器从代码中抽离类型的⼯作)。

script setup：
1）当使⽤script setup的时候，任何在 script setup 声明的顶层绑定都能在模板中直接使⽤
2）声明的顶层绑定：包括变量，函数声明，以及 import 引⼊的内容
3）响应式数据需要通过ref、reactive来创建
4）在script setup中导⼊的组件可以直接使⽤

deﬁneProps：
1）在script setup语法糖中必须使⽤ deﬁneProps API来声明props，它具备完整的类型推断并且在<script setup> 中是直接可⽤的（不需要额外导⼊）。

deﬁneEmits：
1）在script setup语法糖中必须使⽤ deﬁneEmits API来声明 emits，它具备完整的类型推断并且在<script setup> 中是直接可⽤的（不需要额外导⼊）。

deﬁneExpose：
1）获取组件的实例可以通过ref来获取，接着组件挂载完成后可通过value拿到组件实例。
2）当拿到组件实例后，默认是不可以访问这个实例中的⽅法和属性，因为默认没暴露任何⽅法和属性。
3）因此在Vue3组件中可以⽤deﬁneExpose API来暴露⽅法和属性给外部访问。
4）deﬁneExpose 也是不需要导⼊，直接使⽤即可
```



### 41.vue-router路由的两种模式

vue-router中默认使⽤的是hash模式：
1）hash模式，路径带#。改变hash，浏览器本身不会有任何请求服务器动作。
2）history模式，路径没有#。基于HTML5的pushState、replaceState实现。

**hash:**
1)有 # 号
2)能够兼容到IE8
3)实际的url之前使⽤哈希字符，这部分url不会发送到服务器，不需要在服务器层⾯上进⾏任何处理
4)刷新不会存在 404 问题
5)不需要服务器任何配置

**history:**
1)没有 # 号
2)只能兼容到IE10
3)每访问⼀个⻚⾯都需要服务器进⾏路由匹配⽣成html ⽂件再发送响应给浏览器，消耗服务器⼤量资源
4)浏览器直接访问嵌套路由时，会报 404 问题。
5)需要在服务器配置⼀个回调路由



### 42.重复





### 43. 响应式原理，发生在Vue哪些生命周期阶段？

在created之前会注入一些数据，初始化响应式系统



### 44. 虚拟DOM，在哪些阶段生成的？

- 在beforeMount之前会把模块变成render函数，调用render函数创建虚拟DOM

- 在updated之前，要生成新的虚拟DOM



### 45. 哪些生命周期钩子可以执行多次？哪些执行一次？

可以执行多次的有

- 更新阶段：beforeUpdate、updated 
- 与动态组件有关的两个特殊的钩：activated(激活)、deactivated(休眠)

### 46. 什么是虚拟DOM？

虚拟DOM的是一层对真实DOM的抽象，是一个用来描述真实dom结构的js对象，

虚拟DOM是为了更好将虚拟的节点渲染到页面视图中，所以虚拟DOM对象的节点与真实DOM的属性一一照应

### 47. 谈一谈你对 MVVM、MVC、MVP的理解？

```txt
* MVVM流程 : M数据层 -> VM虚拟DOM层 -> V视图层
* 网页本质 = M数据层 + V视图结构
* M+V是怎么组装的？（ MVC  MVP  MVVM）
* M+V在哪儿组装？（前后端分离、前后端不分离、SSR服务端渲染）
* 进一步理解（阮一峰博客）：https://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html
```



### 48.mounted和activated有什么区别？deactivated和beforeDestroy有什么区别？（执行次数、使用场景）

- 在执行次数上activated和deactivated可以执行多次，而mounted和beforeDestroy只能执行一次
- 在使用场景上activated和deactivated 在动态组件里配合keep-alive一起使用，而mounted和beforeDestroy是普通组件的挂载与销毁的钩子函数：



### 49. 重复

### 8. Vue有哪些内置组件？Vue中实现条件渲染渲染有哪些办法？

五个内置组件

- slot,插槽    
- transition,为组件的载入和切换提供动画效果，
- transition-group，作为多个元素/组件的过渡效果    
- component,按照'is'属性的值来渲染一个动态组件
- keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们

条件渲染方法有: v-if v-show 动态组件component is

### 50. 哪些场景下你会用到动态组件？

动态组件也是为了实现条件渲染，在需要使用条件渲染地方，根据不同的组件，渲染不到组件，都可以使用动态组件。



### 52. 路由跳转时如何传递数据？

```txt
动态路由：
1）path: /user/:id
2）获取动态路由的值的⽅式如下：
3）在template中，直接通过 $route.params获取值
4）在created中，通过 this.$route.params获取值
5）在setup中，使⽤ vue-router库提供的⼀个hook useRoute（该Hook会返回⼀个Route对象，对象中保存着当前路由相关的值）

query参数:
1）通过query的⽅式来传递参数
2）在界⾯中通过 $route.query 来获取参数
3）在created中，通过 this.$route.query获取值
4）在setup，使⽤ vue-router库提供的⼀个hook useRoute 来获取
```



### 53. 计算属性有什么作用？（两大作用）

- 当指令的表达式比较复杂时，我们可以使用计算属性来优化，提升视图模板中代码的可阅读性、可维护性。
- 用于缓存一个复杂的运算，避免组件更新时产生没有必要的性能损耗。计算属性本质上是一个函数，Vue会分析函数体中使用到了哪些声明式变量，有且仅有这些声明式变量发生变化时，计算属性才会重新执行。



### 54. 什么是路由守卫？路由守卫有哪些？路由守卫有什么作⽤？

**什么是路由守卫？**

- 路由守卫就是路由跳转的一些验证，比如登录鉴权，vue-router 提供的路由守卫主要⽤来通过跳转或取消的⽅式守卫导航。

**路由守卫有哪些？**

全局守卫：
1）beforeEach
2）afterEach

组件内部守卫:
1）beforeRouteEnter
2）beforeRouteUpdate 
3）beforeRouteLeave 

单个路由守卫:
1)beforeEnter: 

**路由守卫有什么作⽤：**
1)可以在进⼊路由之前进⾏某些判断，⽐如，检查token是否存在来判断⽤户是否已经登录。
2)可以在路由守卫中进⾏⻚⾯的权限判断，⽐如，判断某个⽤户是否拥有该⻚⾯的权限。
3)也可以⽤来记录⻚⾯的某些信息，⽐如，记录⻚⾯的滚动信息等等。



### 55.route和router的区别

route是路由信息对象，在Vue3中通过 useRoute 来获取。
route包括了path，params，hash，query，name等路由信息参数。

router是路由实例对象，在Vue3中通过 useRouter 来获取。
router包括了路由跳转⽅法、钩⼦函数等，⽐如：push、go、back、addRouter、beforeEnter等。

### 56.vue 中怎么阻止冒泡？怎么阻止默认事件？怎么监听键盘enter键？

- 原生JS ，在事件方法里 e.stopPropagation() e.preventDefault() keyup事件 判断 e.keyCode == 13
- 事件事件修饰符 @click.stop @click.prevent @keyup.enter



### 57. 什么是状态管理？在vue开发中是如何管理应用程序的状态？什么是单项数据流？

**在vue开发中是如何管理应⽤程序的状态？**
1）在Vue开发中，我们使⽤组件化的开发⽅式。⽽在组件中我们定义的data或在setup中返回的数据，这些数据我们称之为状态State。
2）在模块template中我们可以使⽤这些数据，模块最终会被渲染成DOM，我们称之为View。
3）在模块中我们会产⽣⼀些⾏为事件，处理这些⾏为事件时，有可能会修改State，这些⾏为事件我们称之为Actions。

**什么是状态管理？**

在开发中，应⽤程序是需要处理各种各样的数据，这些数据需要保存在应⽤程序中的某⼀个位置，对于这些数据的管理就称之为状态管理。

**什么是单项数据流？**

Vue组件内部的数据是以单向数据流的形式来管理数据的。组件的数据定义在State中，接着在View层使⽤State中的数据，然后View层会产⽣⼀些事件Actions，⽽这些Actions可能会修改State的数据，这就是⼀个单项数据流的概念。

​	



### 58. 什么是Vuex？你使⽤过 Vuex 吗？

```txt
vuex 是⼀个专为 Vue.js 应⽤程序开发的状态管理模式。每⼀个 Vuex 应⽤的核⼼就是 store仓库。“store” 基本上就是⼀个容器，它包含着应⽤中⼤部分的状态 state。
1）Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发⽣变化，那么相应的组件也会相应地得到⾼效更新。
2)改变 store 中的状态的唯⼀途径就是显式地提交 (commit) mutation。这样使得我们可以⽅便地跟踪每⼀个状态的变化。

Vuex包括⼀下⼏个核⼼模块：
1)State：定义了应⽤状态的数据结构，可以在这⾥设置默认的初始状态。
2)Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到计算属性。
3)Mutation：是唯⼀更改 store 中状态的⽅法，且必须是同步函数。
4)Action：⽤于提交 mutation，⽽不是直接变更状态，可以包含任意异步操作。
5)Module：允许将单⼀的 Store 拆分为多个 store 且同时保存在单⼀的状态树中。
```



### 59.v-model 有哪些修饰符？

- trim 修饰符去掉input输入框里字符串首尾的空格
- lazy 在input输入框输入数据后，数据失去焦点或点击回车时，才会进行数据的更新
- number 在input中输入数字时，使用number修饰符来将输入的数字转为number类型。



### 60. Vue中怎么做动画？

内置组件transition，使用那6个类名编写自定义动画、使用animate.css第三方动画库

```txt
.v-enter 动画的起点
.v-enter-active 动画进入的过程中
.v-enter-to 动画起始后的终点
.v-leave 动画离开是的起点
.v-leave-active 动画离开的过程中
.v-leave-to 动画离开的终点
```