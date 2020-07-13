## 前言

webpack作为优秀的打包工具，在vue、react等开发工具的脚手架中已经配置好了。之前只是粗略查看过，近期通过视频和官方文档恶补了一下webpack。做一下学习总结📘，以便于以后的查漏补缺。
🙏🙏最后在此鸣谢尚硅谷提供的学习资料：https://www.bilibili.com/video/BV1e7411j7T5

## webpack简介 

> 本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

这是[webpack](https://www.webpackjs.com/)官方网站给出的概念。用简单的话概括一下就是：**将js应用程序按模块区分打包的工具**



## 提纲

先做一个提纲，如果看了总结还记不起来再去看细节。

- 基本使用
  - entry
  - output
  - module
  - plugin
  - mode
  - resolve
  - devServer
  - optimization
- 开发环境
  - 基本配置
    - 处理样式
    - 打包HTML资源
    - 打包图片资源
    - 打包其他资源
    - devServer调试
  - 性能优化
    - HMR
    - source-map
- 生产环境
  - 基本配置
    - 提取css文件
    - css兼容性处理
    - 压缩css
    - js语法检查
    - js兼容性处理
    - 压缩js
    - 压缩HTML
  - 性能优化
    - oneOf
    - 缓存
    - tree shaking
    - code split
    - 懒加载/预加载
    - PWA
    - 多进程打包
    - externals
    - DLL



## webpack基本使用

### 如何使用？

在项目目录下输入命令行：

```powershell
npm init
npm install webpack webpack-cli -g/-D
```

创建webpack配置文件 (如果配置文件名不为 webpack.config.js，则需要运行时要加上 `--config ${配置文件路径}` )

然后在命令行输入`webpack`就可以实现打包了。

### webpack有最基本的5大要素：

- **entry** ：指示webpack以哪个(哪些)文件作为入口开始打包，分析构建内部依赖图。
- **output**：指示webpack打包后的bundle输出到哪里，以及bundle的命名。
- **loader**：让webpack能处理非js文件。
- **plugins**：让webpack具有更多的功能。包括但不限于优化打包和压缩、定义环境变量。
- **mode**：webpack打包模式。只有'development'、'production'两种模式

### 公共方法

因为后续会经常用到nodejs中path包里自带的resolve方法，所以我在webpack.config.js中添加一个resolve方法便于后续使用。

```js
function resolve(dir) {
	return path.join(__dirname, dir)
	// 当config.js在子目录下时要加上'..'回退到顶级目录
	//改成： path.join(__dirname,'..',dir)
}
```

### entry

entry，入口文件。作为主导的js文件，entry的值可以有三种形式。

#### 1.String

单文件入口，参数值为js文件路径，例如

```js
entry:'./src/index.js'
```

这样打包后会形成一个chunk(name为main)，输出一个bundle。react、vue等SPA框架都这样用，也是最主流的用法。

#### 2.Array

多文件入口，参数值为js文件路径组成的数组，例：

```js
entry:['./src/index.js','./src/asset.js']
```

以数组方式会形成一个chunk，输出一个bundle 

#### 3.Object

可以单文件入口，也可以多文件入口 ，例：

```js
entry: {
	main:'./src/main.js',
	// 当entry为Object时，里面的属性也可以是Array，效果同2
	vendor:['vue','vuex','vue-router']
},
output: {
	filename: '[name].js',
	path: resolve('build')
}
```

以对象方式，有n个入口文件就会形成n个chunk，对应的输出n个bundle。所以在配置output时filename不能写死，要以变量的方式写[]。


### output

```js
output: {
	// (指定目录+名称)
	filename: 'js/[name].js',
	// 输出文件的目录(所有输出资源的公共前缀目录)
	path: resolve('build'),
	// 所有引入资源的公共路径前缀 eg: 'imgs/a.jpg'->'/imgs/a.jpg' 
	// 多用于生产环境 部署到服务器上 
	publicPath: '/',
	// 非入口chunk的名称 (指定目录+名称)
	// 非入口chunk由 js中import()引入 和 config.js中的optimization配置项 两种方法生成
	// 如果不用chunkFilename，命名将变为0,1,2...
	chunkFilename: '[name]_chunk.js',
	// 将bundle向外暴露 
	library: '[name]'
	// 设置暴露bundle的目标 默认值为'var'
	// this/window
	// window
	// global
	// commonjs
	libraryTarget: ''
}
```
想看libraryTarget更细节的地方请查阅官方文档：https://www.webpackjs.com/configuration/output/#output-librarytarget



### module

```js
module: {
	rules: [
		// 这里写匹配规则
		{
			test: /\.css/,
			// 多个loader用use：数组，数组内可以试loader名字(字符串)和loader详情(对象)
			use: ['style-loader','css-loader'],
			// 上面等价于下面  
			/* use: [
				{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader'
				}
			] */
		},
		{
			test: /\.js$/,
			// 排除掉的文件
			exclude: /node_modules/,
			// 只包括的文件
			include: resolve('src'),
			// 执行顺序 默认为普通loader
			// 'pre' 置前  'post' 置后
			enforce: 'pre',
			// 单个loader用loader
			loader: 'eslint-loader'
		},
		{
			//oneOf中的配置只会匹配成功一次
			oneOf: [
				//...
			]
		}
	]
}
```



### resolve
用于解析模块的规则

```js
resolve: {
	//别名/简写
	alias: {
		'@': resolve('src'),
		'$css': resolve('src/css')
	},
	//省略文件路径后缀名
	//❗注意：同路径下的同名文件不能都省略
	extensions: ['.js',',json'],
	// 设置模块目录  默认是当前目录的node_modules
	// 如果找不到 则往上层文件夹找node_modules
	modules: [resolve('{你的node_modules路径}')'node_modules']
}
```

### devServer

```js
devServer: {
	// 代码运行的目录
	contentBase: resolve('build'),
	// 监视contentBase目录下的文件，一旦变化就会reload
	watchContentBase: true,
	// 监视contentBase目录下的文件，一旦变化就会reload
	watchOptions: {
		// 监视忽略文件
		ignored: /node_modules/
	},
	// 启动gzip压缩
	compress: true,
	// 端口号
	port: 5000,
	// 域名
	host: 'localhost',
	// 启动时打开浏览器
	open: true,
	// 开启HMR
	hot: true,
	// 不显示启动服务器日志信息
	clientLogLevel: 'none',
	// 除了一些基本信息外，其他内容都不打印
	quiet: true,
	// 如果出错了，不要全屏提示
	overlay: false,
	// 服务器代理 用于解决本地开发跨域问题
	proxy: {
		// 前端项目的 以'/api'开头的请求，将转发到target地址 解决开发时的跨域问题
		'/api': {
			target: 'http://localhost:8090',
			// 发送请求时，请求路径重写 : 将 '/api/xxx' 改写为 '/xxx'
			pathRewrite: {
				'^/api': ''
			}
		}
	}
}
```



 ### optimization

optimization一般在生产环境配置

```js
optimization: {
	splitChunks: {
		chunks: 'all',
		minSize: 30 * 1024, // 分割的chunk最小为30kb
		maxSize: 0, // 没有最大限制
		minChunks: 1, // 要提取的chunk最少被引用1次
		maxAsyncRequests: 5, // 按需加载时，同时加载的文件最大数
		maxInitialRequests: 3, // 入口哦js文件最大并行请求数量
		automaticNameDelimiter: '~', // 名称连接符
		name: true, // 可以使用命名规则
		cacheGrouops: { // 分割chunk规则
			// 将test命中的文件(即node_modules文件)打包到vendors中。(必须要满足上述所有公共规则)
			// 命名规则： vendors~xxx.js (vendors+automaticNameDelimiter+filename) 
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				priority: -10
			},
			// 校验时，私有规则会覆盖公共规则
			default: {
				minChunks: 2,
				priority: -20,
				// 如果当前打包模块 和 之前已经被提取的模块是同一快，则复用，不重新打包
				reuseExistingChunk: true,
			}
		}
	},
	// 当前模块引用其他模块时的hash值单独存放到runtime文件
	// 引用更新时，就只用重新打包runtime即可
	runtimeChunk: {
		name: entry => `runtime-${entry.name}`    
	},
	minimizer: {
		// 配置js和css的压缩方案
		// 不写则为默认配置
		new TerserWebpackPlugin({
			// 开启缓存
			cache: true,
			// 开启多进程打包
			parallel: true,
			// 启动source-map
			sourceMap: true,
		})
	}
}
```





## webpack开发环境配置

### 处理样式

webpack只能处理js、json文件，所以需要loader来帮助我们处理css/less/sass样式文件。如果是css则只用`css-loader style-loader` 如果是less/sass则需要相关loader先把自己转成css。再用css/style-loader处理。

在js文件中引入css文件

```js
import 'style/index.css'
```

下载相关的loader依赖。

```powershell
npm i css-loader style-loader less-loader sass-loader-D
```

在config.js中配置

```js
module: {
	rules: [
		{
			// test正则表达式做匹配
			test: /\.css$/
			// 如果只有一个loader 可以直接写成
			// loader: xxx
			// 如果多个loader 要写
			// use: [aaa,bbb]
			use: [
				'style-loader',
				'css-loader'
			]
		},
		{
			test: /\.sass$/
			// ❗注意 loader是从后往前执行，所以最外层的sass-loader要写在最后。
			use: [
				'style-loader',
				'css-loader',
				'sass-loader'
			]
		}
    ]
}
```



### 打包HTML资源

首先下载plugin包

```powershell
npm i html-webpack-plugin -D
```

然后写配置文件

```js
plugins: [
	// 默认创建一个空的HTMLL，自动引入打包输出的bundle(js&css)
	// 需要一个HTML/ejs文件作为模板
	new HtmlWebpackPlugin({
		// 模板
		template: './src/index.html',
		// 输出文件名
		filename: 'index.html'
	})
]
```

### 打包图片资源

打包图片资源借助的是url-loader 但是url-loader依赖于file-loader，所以都要下载。注：如果html图片引用图片，要用html-loader处理。因为现在都用vue/react，就不做过多描述了。

```powershell
npm i url-loader file-loader -D
```

修改配置文件

```js
module: {
	rules: [
		// ...
		{
			test: /\.(jpg|gif|png)$/,
			loader: 'url-loader',
			options:{
				// 图片小于8kb，就会被base64处理到js文件中
				// 优点：减少请求数量（减轻服务器压力）
				// 缺点：图片体积会更大（文件请求速度更慢）
				limit: 8 * 1024,
				// 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
				// 解析时会被解析成[object Module]
				// 解决方法： 关闭url-loader的es6模块化
				esModule: false,
				// 图片重命名
				// 默认值： [hash].[ext]
				// [hash:10]取hash值前十位
				// [ext]取原文件的扩展名
				name: '[hash:10].[ext]'
			}
		}
	]
}
```



### 打包其他资源

用`file-loader`统一处理，之前处理图片时已经下载过，就不用重复下载了。

修改配置文件：

```js
module: {
	rules: [
		// ...
		{
			// 正则表达式选出要排除的资源  剩余资源都通过file-loader打包
			exclude: /\.(css|js|html)$/,
			loader: 'file-loader',
			options: {
				name: '[hash:10].[ext]'
			}
		}
	]
}
```

### devServer

在开发过程中，如果每次修改都要重新打包，那会耗费大量的时间在打包上，所以开发时我们需要用到devServer，它提供了一个简单的服务器来运行我们打包后的代码，并且可以做到热部署。

首先下载`webpack-dev-server`

```powershell
npm i webpack-dev-server -D
```

然后修改配置文件

```js
mode: 'development',
devServer: {
	// 项目构建后路径 要与output对应上
	contentBase: resolve('build'),
	// 是否启动gzip压缩
	compress: true,
	// 启动的端口号
	port: 8080,
	// 自动打开浏览器
	open: true
}
```

现在就可以通过`webpack-dev-server`启动服务器来体验热部署啦~

命令行中输出的代码看起来是不是很眼熟？没错，vue和react的脚手架就自带了webpack-dev-server，启动方式实质上就是它！

❗注意：通过该方式部署后不会将bundle输出，而是放在缓存中。

## 生产环境配置

将代码部署到生产环境时，会更注重性能优化与用户体验。

### 提取css文件

由于webpack只认识js文件和json文件，在开发环境配置中，我们通过`css-loader` 和`style-loader`将引入到js文件中的样式打包到了js文件中。

问题：1.这样做会导致js文件太大。2.这样做不能先加载css再加载js。

解决方法：用`mini-css-extract-plugin`将css从js文件中提取出来，搭配上`html-webpack-plugin`生成的HTML文件会自动引入提取出来的css文件。

先下载`mini-css-extract-plugin`插件

```powershell
npm i mini-css-extract-plugin -D
```

然后修改配置文件

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
rules: [
	{
		test: /\.css$/,
		use: [
			// 用插件的loader替换style-loader
			// 'style-loader',
			MiniCssExtractPlugin.loader,
			'css-loader',
		]
	},
	//...
],
plugins: [
	new MiniCssExtractPlugin({
		// 重命名输出的css文件
		filename: 'css/style.css'
	})
]
```



###  css兼容性处理

像`display:flex`等新属性，IE这种旧浏览器是不支持的，所以我们要做兼容性处理。

下载loader

```powershell
npm i postcss-loader postcss-preset-env -D
```

修改配置文件

```js
//nodejs环境变量默认为 production  与 config中的mode无关 所以需要手动设置
process.env.NODE_ENV = 'development'
module.exports = {
	// ...
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					//'style.css'
					MiniCssExtractPlugin.loader,
					'css-loader',
					//添加postcss
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								//postcss插件
								require('postcss-preset-env')()
							]
						}
					}
				]
			}
		]
	}
}
```
记得要在package.json文件添加配置：
```js
//...
"browsserslist": {
	"development": [
		// 写开发环境需要兼容的浏览器版本
		"last 1 chrome version",
		"last 1 firefox version",
		//...
	],
	"production": {
		// 写生产环境的兼容配置
		//
		">0.2%",
		"not dead",
		"not op_mini all"
	}
}
```

### 压缩css
首先下载插件

```powershell
npm i optimize-css-assets-webpack-plugin
```

然后修改配置文件

```js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
	//...
	plugins: [
		//...
		new OptimizeCssAssetsPlugin()
	]
}
```

这个虽然名字起得很长，但是用法很好记。



### js语法检查

下载依赖包

```powershell
npm i eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import -D
```

修改配置文件

```js
module: {
	rules: [
		//...
		{
			test: /\.js$/,
			//依赖包中的文件不需要再做eslint检查
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				//自动修复
				fix: true
			}
		}
	]
}
```

修改package.json

```json
//...
"eslintConfig": {
	"extends": "airbnb-base",
	"env": {
		//能够使用浏览器的全局变量
		"browser": true
	}
}
```



### js兼容性处理

** 📄todo:这块还没吃透，下来要温习。**

下载依赖包

```powershell
npm i babel-loader @babel/core @babel/preset-env @babel/polyfill core-js -D
```

js兼容性有3中方法解决：
- babel 能将简单的es6语法转换，缺点：不能转换promise等语法

- @babel/polyfill 能将所有es6语法转换，缺点：将所有兼容性依赖引入，浪费。

- corejs 按需加载

对比后我们选择用corejs

修改配置文件

```js
module: {
	rules: [
		//...
		{
			test: /\.js$/,
			// 依赖包中的文件不需要再做eslint检查
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				// 预设
				presets: [
					[
						'@babel/preset-env',
						{
							// 按需加载
							useBuiltIns: 'usage',
							// 制定corejs版本
							corejs: {
								version: 3
							},
							// 制定兼容性到哪个浏览器版本
							targets: {
								chrome: '60',
								firefox: '60',
								ie: '9',
								safari: '10',
								edge: '17'
							}
						}
					]
				]
			}
		}
	]
}
```



### 压缩js

将mode改为production即可

### 压缩HTML

html-webpack-plugin就能压缩

修改配置文件

```js
//...
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    // 压缩
    minify: {
      // 移除空格
      collapseWhitespace: true,
      // 移除注释
      removeComments: true
    }
  })
]
```





## webpack性能优化



### HMR 

热模块替换(hot module replacement) 实现代码更新时，只更新变更内容。详细可以参考官方文档：https://www.webpackjs.com/concepts/hot-module-replacement/

前置条件：已经用上了devServer

```js
devServer: {
  //...
  hot: true
}
```

entry文件中添加：

```js
if(module.hot) {
  module.hot.accept()
}
```



### source-map 

source-map是一个开发工具，还有提示源代码错误位置等功能。具体查看官方文档：https://webpack.docschina.org/configuration/devtool/

开发环境的需求是：构建速度快、调试友好。生产环境的需求是：体积小、稳定。

编辑配置文件：

```js
// 生产环境推荐使用 'source-map'
devtool: 'eval-cheap-module-source-map'
```



### oneOf 

当规则匹配时，值使用第一个匹配规则。

配置文件：

```js
rules: [
  //...
  {
    // test可以与oneOf并列 也可以在oneOf里面
    oneOf: [
      //文件如果匹配到css 则不会再去与下面的js做匹配
      {
        test: /\.css$/,
        use: [/*...*/],
      },
      {
        test: /\.js$/,
        use: [/*...*/],
      }
    ]
  }
]
```



### 缓存 

- hash：所有文件的hash值一样 
- chunkhash：同一个chunk的hash值一样
- contenthash：每个文件的hash值都不一样。且以文件内容是否作修改为判断标准。

我们不希望改一个文件而重新打包其他文件，所以选择用contenthash。但是如果a引用了b，b发生了更改，b的contenthash值变化、重新打包后，a依旧引用旧的b文件，这样是不合理的。所以我们用到了`runtime`来讲a(每个)文件引用的hash值提取到一个单独的文件中。这样每次修改文件后就只用更改目标文件和`runtime`文件啦。

### tree shaking 

摇树，顾名思义，将没有用到的叶子(代码)摇掉。从而达到减少。

摇树的前提：

1. 必须使用ES6模块化
2. mode: 'production'

在webpack4中的摇树还有一定的bug，例如
```js
//a.js

```
多层嵌套调用时，就不会进行摇树。webpack5会进一步优化摇树的算法并解决这个问题。

如果我们的所有代码都无副作用，可以简单将sideEffects标记为false
```json
// in package.json
{
	// ...
	"sideEffects" : false
}
```
但是往往这一点很难做到。例如polyfill等工具，它影响着全局，但是不提供输出。此时tree shaking就会误判。如果js中引入了css文件，同样存在这样的问题。
所以我们要将有副作用的代码排除在检测外。
```json
// in package.json
{
	// ...
	"sideEffects" : [
		"./src/xxx.js",
		"*.css"
	]
}
```

### code split 

将太大的js文件拆分，通过并行加载提高页面加载速度。



- 多入口拆分 (entry方式3)  人为拆分
- 通过opimizination拆分  
  - node_modules
  - 单入口打包
- import()导入的都可以进行按需加载分隔代码

#### 1.多入口拆分

这种方式是人为拆分，一般情况下当我们需要按功能拆分时才会这么做。

```js
// webpack.config.js
{
	entry: {
		a: 'src/js/a.js'
		b: 'src/js/b.js'
	},
	output: {
		filename: 'js/[name].[ext]',
	}
}

// a.js
import c from './c.js'


// b.js
import c from './c.js'
```
❗如果入口a.js、b.js都引入了c.js，那么在打包的时候，c.js会重复打包

#### optimization的splitChunks
这时候我们尝试使用 optimization的splitChunks
```js
optimization: {
	splitChunks: {
		// 1.将node_modules中的代码单独打包成一个
		// 2.自动分析多入口中的公共依赖，找到并单独打包
		chunks: 'all'
	}
}
```

#### import()
通过import()引入的文件，在打包时一定会被单独打包。
```js
//a.js
import(/* webpackChunkName: 'c' */ './c.js').then(
	result => {
		//...
	}).catch(()=>{
		//...
	})
```
a中引入了c，但是c会被单独打包出来。
❗如果不写`/* webpackChunkName: 'c' */`输出的bundle将会以0,1,2...命名

### 懒加载/预加载 
现在文件如下
```js
// b.js
console.log('b被加载了')
function b(){
	console.log('bbbbb');
}
export {b};

// a.js
console.log('a被加载了')
import {b} from './b.js'
setTimeout(() => {
	b()
}, 1000)
```
a为入口文件，引入了b。打开打包后的HTML文件，控制台console
```
a被加载了
b被加载了
//1s later
bbbbb
```
❗这样就会有一个问题，b是1s后才用到的，但是提前加载了。这样会影响效率。
所以通过import()的方式启用懒加载
```js
// b.js不变
// a.js
console.log('a被加载了')
import {b} from './b.js'
setTimeout(() => {
	import('./b.js').then(
		({b}) => {
			b()
		}
	)
}, 1000)
```
重新打包后打开页面查看打印台
```
a被加载了
//1s later
b被加载了
bbbbb
```
如此一来就实现了对b.js的懒加载/预加载。

### PWA 

PWA(Progressive Web App)，渐进式网页应用，让网页像app一样离线了也能访问。

下载插件

```powershell
npm i workbox-webpack-plugin -D
```

编辑配置文件

```js
// webpack.config.js
plugins: [
	new WorkboxWebpackPlugin.GenerateSW({
		/*
			1. 帮助sw快速启动
			2. 删除旧的sw

			生成一个sw配置文件
		*/
		clientClaim: true,
		skipWaiting: true
	})
]

// entry.js
// 注册sw 处理兼容性问题
if('serviceworker' in navigator){
	window.addEventListener('load', () => {
		navigator.serviceworker
			.register('/service-worker.js')
			.then(() => {
				console.log('sw注册成功')
			})
			.catch(() => {
				console.log('sw注册失败')
			})
	})
}	
```
❗ 如果用了eslint和sw，一定要将eslint中的package.json中的配置加上，否则检查时会报错。


### 多进程打包 

顾名思义，启动多进程进行打包。

但是启动进程有消耗(约600ms)，并且进程之间通信也有消耗，所以如果使用不当反而会增加开销。

```powershell
npm i thread-loader -D
```



### externals 

让一些文件不打包，以外联的方式引入

配置文件

```js
externals: {
  jquery: 'jQuery'
}
```



### DLL 

让一些文件单独打包引入。

