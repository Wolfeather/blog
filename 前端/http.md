## 前言

HTTP是每个前端都必须掌握的知识，也是面试常问的一个点。



## 简介

HTTP(Hypertext Transfer Protocol，超文本传输协议)是一个简单的请求-响应协议，它通常运行在**TCP/IP**协议之上；位于**应用层**，是应用层协议。

## 支持的方法

GET POST HEAD OPTIONS PUT DELETE TRACE CONNECT

## HTTP请求的结构

请求头、请求体、响应头、响应体



常见的HTTP头部

## HTTP1.0

HTTP1.0是一个“无状态协议”，每次请求都会发送新的连接，每次请求完毕后就将连接断开。

HTTP1.0的会话流程：

1. 建立TCP连接（三次握手）
2. 发出HTTP请求信息
3. 会送HTTP响应信息
4. 关闭TCP连接（四次挥手）

缺陷：

随着时代进步，前端发展，前端页面越来越多样化，请求也越来越复杂，一些缺陷也就暴露出来了。

1. 每个HTTP请求都要建立TCP连接，消耗很大。
2. 

## HTTP1.1

### 长连接

PS：HTTP1.0中也可以使用长连接，但是需要每次请求都写上`Connection:Keep-Alive`，而HTTP1.1中每个HTTP请求都默认开启了长连接。

服务端设置Keep-Alive来延长TCP连接的寿命，通过让多个HTTP请求使用同一个TCP连接，减少TCP连接次数，来达到优化的目的。

缺陷：

1. 浏览器自身Max-Connection最大连接数限制（比如，同一域名下，Chrome最多6个连接）。

### 管道化 pipelining

基于**长连接**的情况下。允许客户端不用等待上一次请求结果返回，就可以发出下一次请求，但服务器端必须按照接收到客户端请求的先后顺序依次回送响应结果，以保证客户端能够区分出每次请求的响应内容。以解决请求延迟的问题。

普通连接-长连接-管道化：

> 普通连接：
> TCP连接 -> 请求1 -> 响应1 -> TCP断开 -> TCP连接 -> 请求2 -> 响应2 -> TCP断开 
> 长连接：
> TCP连接 -> 请求1 -> 响应1 -> 请求2 -> 响应2 -> 请求3 -> 响应3 -> TCP断开 
> 管道化：
> TCP连接 -> 请求1 -> 请求2 -> 请求3 -> 响应1 -> 响应2 ->  响应3 ->TCP断开 

缺陷：

1. pipelining方案需要前后端同时支持，但是绝大多数HTTP代理器对pipelining不友好。
2. 只支持GET/HEAD方式请求
3. 用了管道化依旧是线头阻塞的。同时请求了a、b、c、d，如果a没有返回，bcd也不会返回

### 缓存处理

除开HTTP1.0中的`If-Modified-Since`,`Expires`，添加了`Entity tag `, `If-Unmodified-Since` , `If-Match` , `If-None-Match`等更多缓存策略

### 错误状态码

新增了24个错误的状态码，例如409（Conflict）：表示请求的资源与资源的当前状态发生冲突；410（Gone）：表示服务器上的某个资源被永久性的删除；

### host字段

添加了host字段，

### 带宽优化及网络连接的使用

HTTP1.0中有带宽浪费的现象，例如客户端只需要请求中的某个对象的一部分，而服务器却将这个对象回传。

HTTP1.1中，添加了新的请求头`range`，他允许只请求资源的某个部分，返回码为`206(Partial Content)`，以便于开发者自由选择，且充分利用带宽。

## HTTP2.0

### 前身-SPDY

SPDY是2012年Google推出的，基于SSL/TLS的传输协议。并且也具有降低延迟，多路复用，头部压缩，服务端推送等特点，成为了后续HTTP2.0的建立的基石。换句话说HTTP2.0是SPDY的优化版本。

#### 区别

1. HTTP2.0头部压缩采用了HPACK，而SPDY采用了DELEFT。
2. HTTP2.0理论上支持明文HTTP传输，而SPDY要求必须使用HTTPS

### 二进制传输

为了考虑传输文本的健壮性，HTTP2.0采用了二进制传输，这依赖于应用层（HTTP）与传输层（TCP）之间增加了一个二进制分帧层。通过二进制分帧层后，信息被转化成更小的消息和帧（frame），并采用二进制格式编码，头部信息被封装到Headers帧，Request Body被分装到Data帧。

### 多路复用

除了二进制传输用到的**帧（frame）**的概念，HTTP2.0还提出了**流（stream）**的概念。

多路复用的提出解决了HTTP1.x的**线头阻塞**的问题

### 头部压缩

HTTP1.x中，我们使用文本形式传输header，如果携带了cookie，每次都需要重复传cookie，是一笔不小的开销。

HTTP2.0中，使用了HPACK(HTTP2.0的头部压缩算法)压缩格式对header进行编码。并且在两端维护了索引表，用于记录出现的header，

### 服务器推送(Server Push)

服务器在收到客户端的请求后，主动推送其他资源。有点类似于买A送B，“捆绑销售”

### 请求优先级

每个流都有自己的优先级，客户端可以指定优先级。因为HTTP2.0允许了请求并发，但是实际使用的时候，我们需要考虑到文件的权重优先级，以及文件间的依赖关系。所以这也是不可或缺的一部分。

## HTTPS

HTTP：http+tcp

HTTPS：http+ssl+tcp

ssl：(Secure Sockets Layer)安全套接字协议

### 区别

- HTTPS需要到CA申请整数，免费的证书很少，且安全性低。所以会有一个的开销。
- HTTP基于TCP，传输内容皆为明文，HTTPS在HTTP到TCP之间加上了SSL/TLS层，为传输内容加密。
- HTTP和HTTPS的连接方式不通，端口也不同(80与443)
- HTTPS可以有效防止运营商劫持。

### 工作原理



### 优缺点





>参考文献： 
>
>https://www.jianshu.com/p/d0746308fdc4
>https://segmentfault.com/a/1190000016656529?utm_source=tag-newest
>https://www.jianshu.com/p/1ad439279974
>https://www.zhihu.com/question/34074946