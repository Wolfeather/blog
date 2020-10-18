## CSS盒模型

分为标准盒模型和怪异盒模型

标准盒模型的长宽 代表内容的长宽

怪异盒模型的长宽 代表内容+padding+border的长宽

## BFC

> BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

> BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。

总结：BFC会产生一个独立的布局，不受外界干扰。

### BFC的产生方法

1. float的值不是none
2. position的值不是static/relative
3. display的值是inline-block、table-cell、flex、table-caption或inline-flex
4. overflow的值不是visible

### BFC的作用

1. **避免margin塌陷/重叠**：两个相邻元素处于同一个BFC时，margin会塌陷，只取最大值。
2. **避免float元素的重叠**：非float元素部分会被float元素遮挡重叠。
3. **清除浮动**：子元素都是float元素时，父元素高度会塌陷。

## 边距重叠问题

归纳到BFC中

## 清除浮动

### 1.clear

在浮动元素的左(右)相邻元素的样式中添加`clear:right(left)`

缺陷：只能单纯的清除浮动，浮动元素无法撑起父元素的高度

### 2.父元素末尾添加清除浮动元素

```html
<div class="father">
  <div class="other"></div>
  <div class="float"></div>
  <!-->....<!-->
  <!-->下方添加一个没有内容的块级元素<!-->
  <div class="clear-float"></div>
</div>

<style>
  .clear-float{
    clear:both;
  }
</style>
```

###  3.利用伪元素（clearfix）

首先给父元素添加clearfix样式

```html
<div class="father clearfix">
  <div class="other"></div>
  <div class="float"></div>
</div>
<style>
  .clearfix:after{
    content:'.';
    height:0;
    display:block;
    clear:both;
  }
</style>
```

### 4.通过产生BFC

产生BFC的方式见上面的BFC中



## 画一条0.5px的线

todo

## CSS权重优先级

!important>行内样式>ID>类、伪类、属性>标签名>继承>通配符

我们先自己模拟一个权重

| 选择器 | 权重 |
| ------ | ---- |
| 通配符 | 0    |
| 标签|1 |
|类/伪类/属性|10|
|ID|100|
|行内样式|1000|
|!important|Infinity|

然后举个🌰：

```html
<style type="text/css">
  #myid { /* id选择器权重为100 */
    background-color: blue;
  }
  #divid .myspan input { /* 权重为 100 + 10 + 1 = 111 */
    background-color: black;
  }
  input[type="button"] { /* 权重为 10 */
    color: white !important; /* 特例：!important权重为无穷大 */
    background-color: pink; 
  }
  input.myclass { /* 权重为 1 + 10 = 11 */
    color: black;
  }
</style>
<span class="myspan">
  <input type="button" id="myid" class="myclass" name="myname"
         value="点我" style=" color: green;">
  <!-- style样式的权重为1000 -->
</span>
```

所以权重计算后得到的样式为：

1. `background-color:black`(权重为111)
2. `color:white`(权重为Infinity)




## link标签和import标签的区别

```html
<!-- link引入 -->
<link rel="stylesheet" rev="stylesheet" href="CSS文件" type="text/css" media="all" />  
<!-- import引入 -->
<style type="text/css" media="screen">  
@import url("CSS文件");  
</style>
```

不难看出 两者是有区别的：

1. link属于HMTL标签，直接在HTML中使用；@import属于css功能，只能在css文件，或者HTML中的`<style>`标签内使用。
2. link标签除了加载CSS外，还可以加载其他事务，包括但不限于图片、媒体资源、RSS等；@import只能用作引入CSS。
3. link引入的CSS，在页面载入时同时加载(还可以使用link的preload等)；@import需要页面载入后才开始加载。
4. link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，对低版本浏览器不兼容。
5. link支持使用js控制DOM改变样式；而@import不支持(？)

另外，`@import`有多种写法：

```css
@import 'style.css'; //Windows IE4/ NS4, Mac OS X IE5, Macintosh IE4/IE5/NS4不识别
@import "style.css"; //Windows IE4/ NS4, Macintosh IE4/NS4不识别
@import url(style.css); //Windows NS4, Macintosh NS4不识别
@import url('style.css'); //Windows NS4, Mac OS X IE5, Macintosh IE4/IE5/NS4不识别
@import url("style.css"); //Windows NS4, Macintosh NS4不识别
```





> 参考文献：
>
> https://www.cnblogs.com/my--sunshine/p/6872224.html
>
> https://www.cnblogs.com/zbo/archive/2010/11/17/1879590.html

## transition和animation的区别

transition和animation的属性值都相同

|            | 名称     | 条件                 | 立即执行                       | 循环播放           |
| ---------- | -------- | -------------------- | ------------------------------ | ------------------ |
| transition | 过渡动画 | 需要触发条件         | 不能立即执行，需要等待触发条件 | 只能触发时播放一次 |
| animation  | 动画     | 需要搭配`@keyframes` | 可以立即执行                   | 可以循环播放       |



## flex布局

[查看详情](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

### flex的使用条件

父元素样式：

```css
.father {
	display: flex;
	display: -webkit-flex; // 兼容webkit浏览器
	// display: inline-flex; // 行内元素使用flex布局
}
```

### 父元素属性

- flex-direction（排序）： row（默认，按行排列）| row-reverse（倒序行排列）| column（按列排列）| columen-reverse（倒序列排列） 
- flex-wrap（是否换行）：nowrap（默认，不换行）| wrap（换行）| wrap-reverse（换行，且倒序行）
- flex-flow（上面两个属性的合并）： {flex-direction} {flex-wrap} 
- justify-content（横向对齐方式）： flex-start（默认，左对齐）| flex-end（右对齐）| center（居中）| space-between（两端对齐，等间距）| space-around（每个子元素间隔相等且不塌陷/左右两端间隔n，元素间间隔2n）
- align-items（纵向对齐方式）：stretch（默认，自动延伸高度）| flex-start（上对齐）| flex-end（下对齐）| center（居中）| baseline（以第一行文字为基准线）
- align-content（多轴线对齐方式，只有一行则不生效）：stretch（默认，自动延伸高度）| flex-start（上对齐）| flex-end（下对齐）| center（居中）| space-between（轴线对齐两端，等间距）| space-around（轴线间隔相等且不塌陷）

## 垂直居中的方法

### 方法一：table-cell
设置给父元素，然后子元素实现了垂直居中
```css
.content{
	display: table-cell;
	vertical-align: middle;	/* 垂直居中 */
	text-align: center;	/* 水平居中 */
}
```
### 方法二：flex布局
这个也是设置到父元素，然后子元素实现垂直居中
```css
.content{
	display: flex;
	justify-content: center;	/* 水平居中 */
	item-aligns: center;	/* 垂直居中 */
}
```
### 方法三：position + 负边距 (已知宽高)
absolute绝对定位后，用left,top对元素定位，定位点是元素的左上角。所以此时左上角处于正中心，所以需要向左向上移动半个宽高。已知宽高的情况用margin就能实现。
```css
.content{
	position: absolute;
	left: 50%;
	top: 50%;
	height:200px;
	width:200px;
	margin-top:-100px;
	margin-left:-100px;
}
```
### 方法四：position + transform
同上理，未知宽高时也能做到，不过要用到transform，移动-50%的距离来实现。
```css
.content {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%)
}
```

## js动画和css3动画的差异性

|      | 优点 | 缺点 |
| ---- | -------- | ------ |
| CSS3动画 | 1.性能好，浏览器会对CSS动画做一些优化；2.代码相对简单    | 1.控制不够灵活；2兼容性不好；3.滚动等效果无法实现   |
| JS动画 | 1.控制灵活，可以单帧操作；2.基本无兼容问题 | 1.干扰主线程导致阻塞、会导致丢帧情况；2.代码复杂度高|




> 参考文献：https://blog.csdn.net/linayangoo/article/details/86647506

## 块级元素和行元素

### 块级元素(block elment)

默认占一行高度（float除外）；块级元素一般可以嵌套块级元素/行内元素；块级元素一般作为容器出现。

| 区别 | 块级元素                                           | 行内元素                                                     |
| ---- | -------------------------------------------------- | ------------------------------------------------------------ |
|      | 独占一行，默认情况下宽度填满父元素宽度(width:100%) | 不独占一行，与相邻的行内元素排在同一行。宽度根据内容变化。   |
|      | 可以设置宽度`width`属性                            | 不能设置`width`属性                                          |
|      | 可以设置`margin`、`padding`                        | 水平方向的margin、padding(-left、-right)会生效，垂直方向(-top、-bottom)的不会生效 |
|      | `display:block`                                    | `display:inline`                                             |



## 多行元素的文本省略号

### 单行的文本省略：

```css
.xxx{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### 多行的文本省略：

#### 方法1：css

```css
.xxx{
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

PS：这种方式 只对webkit内核的浏览器有效

#### 方法2：利用插件

1.利用[Clamp.js](https://github.com/josephschmitt/Clamp.js)

```js
var xxx = document.getElementById("xxx");
$clamp(xxx, {clamp: 3});
```

2.利用JQuery插件-[jQuery.dotdotdot](https://github.com/BeSite/jQuery.dotdotdot)

```js
document.addEventListener( "DOMContentLoaded", () => {
   let wrapper = document.querySelector( "#element-to-truncate" );
   let options = {
      // Options go here
   };
   new Dotdotdot( wrapper, options );
});
```

>参考文献：https://www.html.cn/archives/5206

## 怎么让一个元素消失？

visibility=hidden，opacity=0，display: none

| 隐藏元素          | 布局         | 绑定事件 |
| :---------------- | ------------ | -------- |
| visibility=hidden | 不会改变布局 | 事件失效 |
| opacity=0         | 不会改变布局 | 事件有效 |
| display:none      | 会改变布局   | 事件失效 |





## position属性比较

1. static：默认值，静态定位。浏览器会按照码源的顺序，决定每个元素的位置
2. relative：相对定位，是相对于static的位置。即相对于默认位置进行偏移
3. absolute：绝对定位，是相对于上一级的元素（一般是父元素）进行偏移
4. fixed：固定定位，相对于浏览器窗口进行偏移，即定点基点为浏览器窗口，这样设置会导致元素不会随着页面的滑动而移动

> 参考文献：https://www.nowcoder.com/questionTerminal/fbef600be0f94192b87f42dc344485f7



## 三栏布局的实现方式

1. float+margin
2. float+overflow
3. position
4. table
5. flex
6. grid



## calc 属性

动态计算属性 用于值为长度值的CSS属性， 运算符前后都要留空格



## display:table 与table的区别



## line-height & height



## 设置元素背景色，会填充哪些区域

content padding border

## 选择器和伪类选择器的优先级？



## inline-block、inline、block的区别



## 用css实现一个硬币旋转的效果



## CSS画图

### 三角形

```css
.triangle-demo {
  height: 50px;
  width: 50px;
  border-left: 50px solid blue;
  border-right: 50px solid green;
  border-top: 50px solid yellow;
  border-bottom: 50px solid red;
}
```

[border1.png]

经过观察，四个border在边界时，以斜线划分，构成梯形。所以当内部高宽为0时，就变成了三角形。

所以我们需要的条件：

1. 宽高为0
2. 所需border的宽
3. 所需border的相邻border 且颜色为透明（transparent）

```css
.triangle-up{
  height: 0;
  width: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid red;
}
```

### 圆形

关键在于`border-radius`：定义4个角的圆角属性 顺序为 左上、右上、右下、左下

```css
.circle1 {
  margin-top: 50px;
  background-color: red;
  width: 100px;
  height: 50px;
  border-radius: 50px 50px 0 0;
}
```



## box-sizing



## 两个嵌套的div，position都是absolute，子div设置top属性，那么这个top是相对于父元素的哪个位置定位的。

父div的border内侧



## 重回和重排/回流



## CSS布局

六种布局：圣杯布局、双飞翼布局、flex布局、绝对定位布局、表格布局、网格布局

圣杯布局是指布局从上到下分为header、container、footer，然后container部分定为三栏布局。这种布局方式同样分为header、container、footer。圣杯布局的缺陷在于 center 是在 container 的padding中的，因此宽度小的时候会出现混乱。

双飞翼布局给center 部分包裹了一个 main 通过设置margin主动地把页面撑开。

Flex布局是由CSS3提供的一种方便的布局方式。

绝对定位布局是给container 设置position: relative和overflow: hidden，因为绝对定位的元素的参照物为第一个postion不为static的祖先元素。 left 向左浮动，right 向右浮动。center 使用绝对定位，通过设置left和right并把两边撑开。 center 设置top: 0和bottom: 0使其高度撑开。

表格布局的好处是能使三栏的高度统一。

网格布局可能是最强大的布局方式了，使用起来极其方便，但目前而言，兼容性并不好。网格布局，可以将页面分割成多个区域，或者用来定义内部元素的大小，位置，图层关系。

## CSS定位

fixed、relative、absolute、sticky、static、inherit



## CSS预处理器

### less

### sass



### 实现边框重叠

```css
table{
  border-collapse:collapse; /* 为表格设置合并边框模型 */
  text-align:center; /* 设置文字居中 */
 } 
 table tr{
  border:none;
 } 
 table.tab td{
  width:50px;
  height:50px;
  border:5px inset blue;
 } 
 table.tab td:hover{
  border:5px solid red;
  cursor: pointer;
 }
```



