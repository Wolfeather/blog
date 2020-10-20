## 导航守卫

> 正如其名，`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。

导航守卫分为三类：全局守卫、路由独享守卫、组件级守卫。

## 全局守卫

### 全局前置守卫

很好理解，全局的，前置的。所有路由都会经过这个守卫，并且优先级最高。

全局守卫位位于与VueRouter对象同样文件(大概率为router.js)写法为

```js
const router = new VueRouter({/*...*/})

router.beforeEach((to, from, next) => {
  /*...*/
})
```

回调函数中的三个参数：

- `to:Route`：目标路由。

- `from:Route`：当前路由。

- `next:Fun`：进行或中断路由改变的函数。

  - `next()`：路由改变继续进行
  - `next(false)`：中断路由的改变
  - `next('/')`or`next({path: '/'})`：自定义`path`转跳路由
  - next(error)：(2.4.0+)入参是`Error`实例。中断路由并处罚`router.onError()`回调函数。

  确保回调函数中`next`被调用了，否则守卫不会继续进行。

### 全局解析守卫(2.5.0+)

`router.beforeResolve`。它与`router.beforeEach`类似，区别是在导航被确认前，同时在所有组件内守卫和异步路由组件被解析后，才被调用。

### 全局后置钩子

后置钩子与守卫不同，不会影响路由的改变，也没有`next`参数

```js
router.afterEach((to, from) => {/*...*/})
```

## 路由独享守卫

独享路由直接定义在VueRouter的路由对象中

```js
const router = new VueRouter({
  routes: [
    {
      path: '/xxx',
      component: xxx,
      beforeEnter: (to, from, next) =>{
        // ...
      }
    }
  ]
})
```

回调函数用法是一致的，不再赘述。

## 组件内的守卫

最后，也可以在组件内直接定义导航守卫。

- beforeRouteEnter
- beforeRouteUpdate(2.2+)
- beforeRouteLeave

```js
// xxx.vue
export default {
  data:{/*...*/},
  beforeRouteEnter(to, from, next){
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // 但是可以变向访问 :
    next(vm=> {
      // 此时vm就是this
    })
  },
  beforeRouteUpdate(to, from, next){
    // 当前路由改变，但是该组件仍被复用时调用
    // 路由从/xxx/id => /xxx/detail 时 /xxx的路由组件被复用
    // 就会调用xxx组件的该函数。
    // 可以访问'this'
  },
  beforeRouteLeave(to, from, next){
    // 导航离开前调用
    // 可以访问'this'
    // 可用于提示用户离开
    const res = window.confirm('Are you sure you want to leave?')
    res?next():next(false);
  }
}
```

## 完整的导航解析流程

1. 导航被触发
2. 在失活的组件里调用`beforeRouteLeave`
3. 调用全局`beforeEach`
4. 在重用组件调用`beforeRouteUpdate`(2.2+)
5. 在路由配置中调用独享守卫`beforeEnter`
6. 解析异步路由组件
7. 在被激活的组件中调用`beforeRouteEnter`
8. 调用全局组件`beforeResolve`(2.5+)
9. 导航被确认
10. 调用全局的`afterEach`
11. 触发DOM更新
12. 用新实力调用组件中`beforeRouteEnter`中传给next的回调函数



> https://router.vuejs.org/zh/guide/advanced/navigation-guards.html

