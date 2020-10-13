## 闭包

能够读取其他函数内部变量的函数。

子函数在外部被调用，子函数所在的函数作用域不会被释放。

## 类的创建和继承

> 见《原型与原型链》篇

## 如何解决异步回调地狱

- promise
- generator
- async/ await

## 前端的事件流

HTML与js通过事件驱动来交互。事件流：从页面中接收事件的顺序。如下：

1. 事件捕获阶段 (从父到子，深入)
2. 处于目标阶段
3. 事件冒泡阶段 (从子到父，冒出)

通过`addEventListener(event,function,useCapture) `方法添加事件监听。其中，event为监听的事件名(不加on)，例：`'click'、'mousemove'`；function为触发事件后的回调函数；useCapture(默认false)：true=捕获阶段，false=冒泡阶段。

## 如何让事件先冒泡后捕获

标准的事件模型是先捕获再冒泡。要先冒泡再捕获的话，捕获事件后，暂缓执行，等冒泡事件执行结束后再执行捕获事件。（个人感觉可以用promise来实现）

## 事件委托

事件委托就是指不在事件发生处(dom元素)，而在他的父级元素上设置监听，来处理事件，这样只用设置一个事件就能处理所有子级元素的事件了。通过`event.target`拿到精确的子元素。

🌰：ul设置代理后，ul下的所有li都能触发事件

优点：避免多次操作DOM，减少消耗；能适应动态添加元素的绑定，父元素下新添加的子元素，也能触发事件委托

## 图片的懒加载、预加载

### 懒加载

按需加载图片，当用户要查看时，才请求数据。

- 原理：先用占位符表示图片，src中不放图片地址(放`javascript:;`)，先放到其他属性(例如`data-original`)中。监听窗口滚动，当图片出现在窗口中，再把真实地址放入src中。
- 注意：做好节流和防抖处理
- 实现方式：
  - setTimeout/setInterval(假的懒加载)
  - 条件加载：当用户执行某个操作时再加载(也是假的)
  - 可视区加载(真正意义上的懒加载)
    - 计算每个图片的位置与滚动的位置
    - 通过新API **IntersectionObserver**(观察元素是否可见)

### 预加载

提前加载图片，当用户需要查看时，直接从本地缓存渲染。

- 原理：本地缓存提前加载图片，当用户查看时，直接从本地缓存中渲染即可。
- 实现方式：
  - CSS：先把图片加载到非可视区{backgound:url() no-repeat -9999px -9999px;} 
  - JS：把图片下载到本地，让浏览器缓存起来。设置src实现加载，再用onload方法回调加载完成事件。



### 为什么需要懒加载/预加载

因为页面中加载速度影响最大的就是图片，当图片多时，极其影响用户体验。

### 对比

预加载是提前加载；懒加载是延迟加载。一个是增加服务器压力来换取最好的用户体验，一个是减少了服务器压力换取较好的用户体验。

## mouseover和mouseenter

- mouseover：当鼠标移入元素或其子元素都会触发，会冒泡和捕获。对应的事件是mouseout。
- mouseenter：当鼠标移入元素本身会触发，不会冒泡和捕获。对应的时间是mouseleave。

## js的new做了那些事情

新建一个空对象，`__proto__`指向构造函数的prototype，执行构造函数后返回给这个对象。

## bind，apply，call的区别

|       | 入参                            | 是否立即执行 |      |
| ----- | ------------------------------- | ------------ | ---- |
| apply | 内部this指向,其他入参(array)    | 是           |      |
| bind  | 内部this指向,其他入参(逗号分隔) | 否           |      |
| call  | 内部this指向,其他入参(逗号分隔) | 是           |      |

如何记忆： apply与array都是a开头，所以参数接数组。bind意为绑定，不调用，call是调用。

## js的各种位置的区别？

- clientHeight：表示的是可视区域的高度，不包含border和滚动条
- offsetHeight：表示可视区域的高度，包含了border和滚动条
- scrollHeight：表示了所有区域的高度，包含了因为滚动被隐藏的部分。
- clientTop：表示边框border的厚度，在未指定的情况下一般为0
- scrollTop：滚动后被隐藏的高度，获取对象相对于由offsetParent属性指定的父坐标(css定位的元素或body元素)距离顶端的高度。

## js拖拽功能的实现

### 方法一

利用到三个时间 mousedown，mousemove，mouseup。且元素是绝对定位。

mousedown时：确定拖拽元素和元素原始坐标，确定鼠标原始坐标，标识flag置为true，

mousemove时：如果flag为true：移动距离=鼠标移动后的坐标-原始坐标；拖拽元素的位置：元素原始坐标+移动距离。

mouseup时：标识falg置为false

### 方法二

使用HTML5原生的Drag&Drop。[详情查看文章](https://juejin.im/post/5a169d08518825592c07c666)

#### 选中

1. 文本、图片、链接默认可以拖放。其他元素需要设置draggable为true。
2. 文本的拖放需要先选中。如果想直接拖放，需要设置draggable。
3. draggable：true(可以拖拽) false(禁止拖拽) auto(跟随浏览器默认定义)

#### 拖拽

拖拽进行时，可以监听拖拽元素，也可以监听目的地元素。

| 针对对象   | 事件名称  | 说明                               |
| ---------- | --------- | ---------------------------------- |
| 拖拽元素   | dragstart | 拖拽开始时触发                     |
|            | drag      | 拖拽时反复触发(建议节流)           |
|            | dragend   | 拖拽完成时触发                     |
| 目的地元素 | dragenter | 拖拽元素进入目的元素空间时触发     |
|            | dragover  | 拖拽元素在目的元素内时触发         |
|            | dragleave | 拖拽元素没发下，离开目的元素时触发 |

`dragenter & dragover`默认拒绝任何拖拽元素。因此使用时需要加上`e.preventDefault()`。

#### 释放

到达目的地后，释放元素事件

| 针对对象   | 事件名称 | 说明                                                         |
| ---------- | -------- | ------------------------------------------------------------ |
| 目的地元素 | drop     | 当拖拽元素在目的地元素放下后触发，建议加上`e.preventDefault()` |

## 异步加载js

defer和async，[查看详情](https://github.com/xiaoyu2er/blog/issues/8)

- 普通script
  - 停止解析document
  - 下载js
  - 执行js
  - 继续解析document
- defer：
  - 不阻止document解析，并行下载js
  - 下载完成后继续解析document
  - 在document解析完成、同步脚本执行完成后，`DOMContentLoaded`事件前，按顺序执行defer脚本
- async
  - 不阻止document解析，并行下载js
  - 下载完成后立即执行(可能打断document解析)
  - 执行顺序与文档中排列无关，先下载完成先执行。在`DOMContentLoaded`前后均有可能

## ajax解决浏览器缓存问题

请求前 ajaxObj.setRequestHeader("If-Modified-Since","0")/("Cache-Control","no-cache")

GET请求：在最后加上时间戳参数

jQuery： $.ajaxSetup({cache:false})

## 防抖和节流

## js垃圾回收机制(GC)

当内存的生命周期结束时，就该回收了。[查看详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)

GC主要依赖于引用。

### 引用计数垃圾回收

没有引用指向的对象将被GC回收。

```js
// 新建对象 被o引用
let o = {
  a:2
}
// 该对象被o1引用
let o1 = o
// o不再引用该对象
o = null
// o1不再引用该对象
o1 = null
// 该对象被释放
```

缺陷：**循环引用**

```js
function f(){
	let o1= {}, o2= {}
	o1.a = o2
	o2.a = o1
}
f()
```

当函数`f`执行完后，`o1 o2`都没有被释放。因为他们相互引用了对方。

### 标记-清除算法

把“对象是否不再需要”简化定义为“对象是否可以获得”。

设定一个**根对象**(js中为全局对象)。GC定期从根递归遍历所有的引用，并标记他们。然后清除掉所有没有标记的对象。

## eval函数

将eval()括号中的字符串解析成js语句并执行。eval是个危险的函数，不建议使用。

## 实现一个once函数，传入函数参数只执行一次

```js
function once(fn){
	let flag = true
	return function(){
		if(!flag) return
		flag = false
		fn.apply(null,arguments)
	}
}
function f(a,b){
	console.log(a+'+'+b)
}
let ff = once(f)
ff(1,2) //  1+2
ff() // 无打印
```

## 手写promise

todo

## js监听对象属性

### ES5中，用Object.defineProperty实现 (Vue2)

```js
Object.defineProperty(user,'name',{
	set: function(key,value){
		// ...
	}
})
```
缺点：每个属性都需要写=> 需要遍历对象属性

### ES6中，用Proxy实现 (Vue3)
```js
let user = new Proxy({},{
	set: function(target,key,value,receiver){
		// ...
	}
})
```
即使是新增属性，也可以监听
## 如何实现一个私有变量

[查看详情](https://segmentfault.com/a/1190000017081250)

- 闭包
- Symbol
- WeakMap
- 属性前缀加`#`

## == 和 ===、以及Object.is的区别



## setTimeout、setInterval和requestAnimationFrame之间的区别



## 实现一个两列等高布局



## 自己实现一个bind函数



## 用setTimeout来实现setInterval



##  js怎么控制一次加载一张图片，加载完后再加载下一张



## 代码的执行顺序

EventLoop ：微队列宏队列

## 如何实现sleep的效果（es5或者es6）





## 简单实现Node的Events模块

todo  nodejs

## 数组去重



## 性能优化

- 减少HTTP请求
- 使用内容发布发布网络CDN
- 添加本地缓存
- 压缩资源文件
- 将CSS放顶部，js放底部 (异步加载js)
- 减少DNS查询
- 使用外部js、css
- 避免重定向
- 图片懒加载

## js语言特性

- 运行在客户端浏览器上
- 不用预编译，直接解析执行代码
- 弱类型语言，较为灵活
- 与操作系统无关，跨平台。
- 脚本语言，解释性语言

## 判断是否是数组

```js
let arr = [1,2,3]
arr instanceof Array	// true
arr.constructor === Array	// true
Array.isArray(arr)	// true
Object.prototype.toString.call(arr)	// "[object Array]"
```



### instanceof

a instanceof B 是看B的原型是否a的原型链上。也就是：看a.proto是否等于B.prototype，如果不等，再看a.proto.proto...直到原型链尽头。

缺陷：如果页面中有多个iframe，就存在多个全局环境，那就回存在不同的Array构造函数。iframe2中的数组在iframe1中，用instanceof判断就会有问题。

### constructor

constructor：查看构造函数。

缺陷：

1. constructor属性也在proto上，所以instanceof有的问题constructor也有。 
2. 可以给对象赋予自身的constructor属性

```js
let obj = {}
obj.constructor = Array
obj.constructor === Array	// true
```

### isArray()

简单明了：判断是否是数组

缺陷： 可能有些浏览器未实现该功能

### Object.prototype.toString

需要将返回的字符串结果进行处理一下。

## js数据类型

基本类型： String、Number、Boolean、Null、Undefined、Symbol(ES6)

引用数据类型：Object、Array、Function

## 数组去重

### indexOf遍历去重
```js
function fn1(arr){
	let res = []
	for(let i=0;i<arr.length;i++){
		if(arr.indexOf(arr[i])==i) res.push(arr[i])
	}
	return res
}
```
### Object键值对去重
```js
function fn2(arr){
	let res = [] , obj = {}
	for(let n of arr){
		// 如果是'1'和1都存在  就会有问题 改为
		// obj[typeof n + n]
		if(!obj[typeof n + n]){
			obj[typeof n + n]=true
			res.push(n)
		}
	}
	return res
}
```
### 利用Set去重
```js
function fn3(arr){
	// return Array.from(new Set(arr))
	return [...new Set(arr)]
}
```

## 编程题 
### 1 编写函数 满足以下条件
```js
Hero("37er")
// Hi! This is 37er
Hero("37er").kill(1).recover(30)
// Hi! This is 37er 
// Kill 1 bug
// Recover 30 bloods
Hero("37er").sleep(10).kill(2)
// Hi! This is 37er
// 10s后
// Kill 2 bugs
```
思路：
1. 函数Hero执行完后还能继续点函数，说明返回了一个对象，对象中有函数`kill、sleep、recover`。
2. 函数能链式调用，说明每次执行了内部函数后都要返回对象
```js
function Hero(str) {
	let o = {
		name: `Hi! This is ${str}`,
		wait: 0
	}
	console.log(o.name);
	o.kill = function (bugs) {
		setTimeout(() => {
			console.log(`Kill ${bugs} bug${bugs>1?'s':''}`)
		}, o.wait * 1000);
		return o
	}
	o.recover = function (bloods) {
		setTimeout(() => {
			console.log(`Recover ${bloods} bloods`)
		}, o.wait * 1000);
		return o
	}
	o.sleep = function (seconds) {
		o.wait = seconds
		return o
	}
	return o
}
```

## vue生命周期

- beforeCreate：`data、$el`都没有初始化。可以加loading事件。
- created：data初始化完成，但是`$el`没有初始化。调用异步请求、函数自执行。
- beforeMount：`data、$el`初始化完成，但是dom未加载完成。
- mounted：dom挂载已完成。
- beforeUpdate：当触发了重新渲染VDOM到DOM前调用。
- updated：当渲染结束后调用。不要在此修改data，否则会死循环。
- beforeDestroy：实例销毁前的调用。可做删除/退出提示
- destroyed：实例销毁后的调用。
- *activated：`keep-alive`独有。切换组件为激活状态时调用。
- *deactivated：`keep-alive`独有。切换组件为非激活状态时调用。

当有子组件时：

```
parent:beforeCreate
parent:created
parent:beforeMount
t1:beforeCreate
t1:created
t1:beforeMount
t2:beforeCreate
t2:created
t2:beforeMount
t1:mounted
t2:mounted
parent:mounted
```

父组件执行到`beforeMount`，然后子组件开始执行，子组件执行到`beforeMount`，执行子组件的兄弟组件。当子组件们都执行完，在按顺序执行`mounted`，最后执行父组件的`mounted`。

## Symbol

Symbol是唯一的标识。每个Symbol都是唯一的，值只是描述，为了方便区分。

当Symbol作为对象的属性时，只有`Object.getOwnPropertySymbols()`和`Reflect.ownKeys()`能访问到symbol属性

## 用闭包写一个单例模式

```js
function single(){
	var obj
	function Singleton(name){
		if(obj){
			return obj
		}
		this.name = name
		return obj = this
	}
	Singleton.prototype.getName = function () {
		return this.name
	}
	return Singleton
}
let Singleton = single()
let a = new Singleton('a')
let b = new Singleton('b')
console.log(a.name)	// 'a'
console.log(b.name)	// 'a'
console.log(a===b)	// true
```

## 异步调用

### Promise

解决回调地狱

```js
let p = new Promise((resolve,reject)=>{
	// 同步执行
})
p.then(res=>{
	// resolve后异步执行
},reason=>{
	// reject后异步执行
}).then(res=>{
	// 可链式调用
}).catch(reason=>{
	// 异常透传 可以最后在捕获
})
```
### generator
generator作用：
1. 可以分段执行，可以暂停
2. 可以控制阶段和每个阶段的返回值
3. 可以知道是否执行到结婚
4. generator函数执行后 可以被迭代器迭代`for(let s of g()){}`
5. yield后跟generator函数的话要加*

### async await
> async函数是generator函数的语法糖 

async修饰函数
await修饰函数内的异步操作(往往是promise对象)，等待操作结束后再继续执行

## 驼峰和下划线转换
```js
function toTop(name){
	return name.replace(/\_(\w)/g,function(all,letter){
		return letter.toUpperCase()
	})
}
function toLine(name){
	return name.replace(/([A-Z])/g,"_$1").toLowerCase()
}
```

## string的startsWith和indexOf的区别

```js
let str1 = "wolfeather" , str2 = "feather"
// str1中str2首次出现的位置(没有就返回-1)
let position = str1.indexOf(str2)	// 3
// str1的第postition位，是否是以str2开头  返回Boolean
str1.startsWith(str2,position)	//true
```

## js字符串转数字

```js
let str = '123.456'
Number(str)	// 123.456
// Number最慢 不建议使用
parseFloat(str) // 123.456
parseFloat("0xFF") // 0
// parseFloat在不转换16进制的情况下 推荐使用
parseInt(str,10) // 123  进制不传默认为10
// parseInt 仅适用于整数
~~str	// 123  
// 按位非 仅适用于整数
str*1	// 123.456
str/1	// 123.456
str-0 // 123.456
+str // 123.456
// 运算符 推荐使用
```

## setTimeout和Promise执行顺序

先执行同步代码，再执行微队列，再执行宏队列(每执行完一个宏任务，都要重新检查微队列)

## 手写一个bind

```js
Function.prototype.bind2 = function(newThis){
	if (typeof this !== 'function') return 
	let that = this
	// 此时arguments是绑定时的参数
	let args = Array.prototype.slice.call(arguments,1)
	return  function(){
		// 此时arguments是调用时的参数
		return that.apply(newThis,args.concat(Array.prototype.slice.call(arguments)))
	}
}
```
这个写法有点问题，就是new的时候。所以要判断new的时候this的指向
```js
Function.prototype.bind3 = function(newThis){
	if (typeof this !== 'function') return 
	let that = this
	// 此时arguments是绑定时的参数
	let args = Array.prototype.slice.call(arguments,1)
	let bindFn = function(){
		// 如果是new this指向自己，此时原函数在原型链上， 此时就用本身的this
		// 如果不是new 才用bind的this
		let _this = this instanceof that?this:newThis
		// 此时arguments是调用时的参数
		return that.apply(_this,args.concat(Array.prototype.slice.call(arguments)))
	}
	if(that.prototype){
		// 如果是构造函数 则添加原函数到原型链
		bindFn.prototype = new that()
	}
	return bindFn
}
```

### 