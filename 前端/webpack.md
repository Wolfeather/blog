

## webpack

### 前言

webpack作为优秀的打包工具，在vue、react等开发工具的脚手架中已经配置好了。之前只是粗略查看过，近期通过视频系统学习了一下webpack。做一下学习总结📘，以便于以后的查漏补缺。
🙏🙏最后在此鸣谢尚硅谷提供的学习资料：https://www.bilibili.com/video/BV1e7411j7T5

### webpack简介 

​	[webpack](https://www.webpackjs.com/)


### webpack基本使用



因为后续会经常用到nodejs中path包里自带的resolve方法 建议在webpack.config.js中添加一个resolve方法便于后续使用

```js
function resolve(dir) {
  return path.join(__dirname, dir)
  // 当config.js在子目录下时 要改成： path.join(__dirname,'..',dir)
}
```



### webpack性能优化

​	先做一个提纲，如果看了总结还记不起来再去看细节。

#### 提纲

* 开发环境
  * 优化打包构建速度
    * HMR
  * 优化代码调试速度
    * source-map
* 生产环境
  * 优化打包构建速度
    * oneOf
    * babel缓存
    * 多进程打包
  * 优化代码运行性能
    * 缓存(hash-chunkhask-contenthash)
    * tree shaking
    * code split
    * 懒加载/预加载
    * PWA
    * externals
    * DLL

#### HMR 



#### source-map 



#### oneOf 



#### 缓存 



#### tree shaking 



#### code split 



#### 懒加载/预加载 



#### PWA 



#### 多进程打包 



#### externals 



#### DLL 

####  

### webpack详细配置

#### entry

​	entry，入口文件。作为主导的js文件，entry的值可以有三种形式

##### 1.String

单文件入口，参数值为js文件路径，例如
```js
entry:'./src/index.js'
```
react、vue等SPA框架都这样用，也是最主流的用法。

##### 2.Array

多文件入口，参数值为js文件路径组成的数组，例：
```js
entry:['./src/index.js','./src/asset.js']
```

##### 3.Object

可以单文件入口，也可以多文件入口 ，例：

```js
entry:{
	main:'./src/main.js',
	vendor:['vue','vuex','vue-router']
}
```

#### output

#### resolve-解析模块的规则
```js
resolve:{
    //别名/简写
    alias:{
        '@': resolve('src'),
        '$css': resolve('src/css')
    },
    //省略文件路径后缀名
    //注意：同路径下的同名文件不能都省略
    extensions: ['.js',',json'],
    //模块目录  默认是当前目录的node_modules
    // 如果找不到 则往上层文件夹找node_modules
    modules: [resolve('{你的node_modules路径}')'node_modules']
}
```

#### devServer

```js
devServer:{
    //代码运行的目录
}
```



 