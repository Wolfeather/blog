

### 视频

`<video>`标签用于播放视频媒体，用于取代flash播放器。标签属性如下


| 属性     | 值       | 描述                        |
| -------- | -------- | --------------------------- |
| autoplay | autoplay | 自动播放                    |
| controls | controls | 向用户展示控件              |
| height   | px       | 播放器高度                  |
| width    | px       | 播放器宽度                  |
| loop     | loop     | 循环播放                    |
| preload  | preload  | 预加载视频 当autoplay时无效 |
| src      | url      | 视频的地址                  |

在DOM中也可以操作viedo元素

- 方法
  - play()，播放
  - pause()，暂停
  - load()，加载
  - canPlayType(type)，查看音频/视频类型是否能播放。入参文件后缀名(或者后缀名+‘；codecs=’+编解码器名)。返回"probably"（大概支持）、"maybe"（也许支持）、""（不支持）
- 属性
  - currentSrc，当前的视频的地址
  - currentTime，当前时间



### 音频

`<audio>` 和video类似，播放音频。属性除了width和height，其他跟video一样。

### Canvas画布



### 内联SVG



### 拖放

1. 被拖拽元素要支持拖拽`draggable="true"`
2. 被拖拽元素设置`ondragstart`

```js
function drag(ev) {
	ev.dataTransfer.setData("Text",ev.target.id);  // 存放拖拽元素的id
}
```

3. 接收容器设置`ondragover` `event.preventDefault()`
4. 接收容器设置`ondrop` 

```js
function drop(ev) {
	ev.preventDefault();	//阻止浏览器默认行为
	var data=ev.dataTransfer.getData("Text");	// 获取Text的id
	ev.target.appendChild(document.getElementById(data));  // 将拖拽元素加入到容器中
}
```





### 地理定位

`navigator.geolocation.getCurrentPosition(fn)`调用定位接口获取position，并作为参数传给回调函数fn





### 存储

localStorage和sessionStorage都是HTML5中新加入的。

### 应用程序缓存

通过创建cache manifest，创建本地离线版的web应用

优点：

- 离线浏览
- 速度
- 减少服务器负载

### web workers

在后台自己运行的js。不会影响页面性能。

注意：web workers不能访问document、window和parent

### 引用

> https://juejin.im/post/6844903680756416520
>
> https://www.w3school.com.cn/html5/html5_quiz.asp

