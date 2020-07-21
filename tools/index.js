/*
 * @Descripttion: 
 * @version: 
 * @Author: wolfeather
 * @Date: 2020-07-20 17:36:20
 * @LastEditors: wolfeather
 * @LastEditTime: 2020-07-21 09:29:53
 */ 
(function(window){
  // 防抖
  var debounce = function (fn,wait,immediate){
    let timeout
    return function(){
      // 立即执行版本
      if(immediate){
        let callNow = !timeout
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          timeout=null
        }, wait);
        if(callNow) fn.apply(this,arguments)
        return
      }
      // 延迟执行版本
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        timeout = null
        fn.apply(this,arguments)
      }, wait);
    }
  }
  // 节流
  var throttle = function (fn,wait,type){
    let timeout
    let pre = 0
    return function(){
      //计时器版
      if(type){
        if(!timeout){
          timeout = setTimeout(() => {
            timeout=null
            fn.apply(this,arguments)
          }, wait);
        }
        return
      }
      //时间戳版
      let now = Date.now()
      if(now - pre > wait){
        fn.apply(this,arguments)
        pre = now
      }
    }
  }
  window.debounce = debounce;
  window.throttle = throttle;
  window.log = console.log;
})(window)