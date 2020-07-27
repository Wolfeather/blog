## CSS盒模型

分为标准盒模型和怪异盒模型

标准盒模型的长宽 代表内容的长宽

怪异盒模型的长宽 代表内容+padding+border的长宽

## BFC



## 画一条0.5px的线



## link标签和import标签的区别



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



## 块级元素和行元素



## 多行元素的文本省略号



## 怎么让一个元素消失？

visibility=hidden，opacity=0，display: none

| 隐藏元素          | 布局         | 绑定事件 |
| :---------------- | ------------ | -------- |
| visibility=hidden | 不会改变布局 | 事件失效 |
| opacity=0         | 不会改变布局 | 事件有效 |
| display:none      | 会改变布局   | 事件失效 |



## 边距重叠问题

归纳到BFC中



## position属性比较



## 清除浮动



## CSS选择器有哪些？优先级？



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



### 正方形



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