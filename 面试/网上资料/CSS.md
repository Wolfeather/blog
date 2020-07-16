## 如何画一个三角形



## CSS盒模型



## BFC



## 画一条0.5px的线



## link标签和import标签的区别



## transition和animation的区别



## flex布局



## 垂直居中的方法



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