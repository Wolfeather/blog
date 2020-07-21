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



## 实现js中所有对象的深度克隆（包装对象，Date对象，正则对象）



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