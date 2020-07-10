(function (window){
  function isFunction(foo){
    return foo==undefined || typeof foo =='function';
  }
  const PENDING = 'pending' ,
        REJECTED = 'rejected',
        RESOLVED = 'resolved';
  
  function Promise(excutor){
    // if(!isFunction(excutor)){
    //   throw TypeError("excutor must be function");
    // }
    
    const that = this;
    that.status = PENDING;  //状态
    that.data = void 0;      //值
    that.callbacks = [];    //回调函数对象数组 {onResolved,onRejected}均为函数 因为一个promise可以有多个 then 可以有多个回调函数 所以用数组
    function resolve (data) {
      if(that.status!=PENDING) return;
      that.data = data;
      that.status = 'resolved';
      //将改变状态前放入的回调函数执行
      if(that.callbacks.length>0){
        that.callbacks.forEach(callbacksObj=>{
          callbacksObj.onResolved();
        })
      }
    }
    function reject (data){
      if(that.status!=PENDING) return;
      that.data = data;
      that.status = 'rejected';
      //将改变状态前放入的回调函数执行
      if(that.callbacks.length>0){
        that.callbacks.forEach(callbacksObj=>{
          callbacksObj.onRejected();
        })
      }
    }
    try{
      excutor(resolve,reject);
    }catch (err){
      reject(err);
    }
  
  }
  
  Promise.prototype.then = function (onResolved,onRejected) {
    // if(!isFunction(onResolved) || !isFunction(onRejected)){
    //   //报错 
    //   throw TypeError("onResolved and onRejected must be function")
    // }
    let that = this;
    return new Promise((resolve,reject)=>{
      //异步执行回调函数 并改变返回的promise的状态
      function handle(foo){
        setTimeout(()=>{
          try{
            //透传
            if(typeof foo != "function"){
              if(that.status==RESOLVED){
                resolve(that.data)
              }else{
                reject(that.data)
              }
              return
            }
            let res = foo(that.data);
            if(res instanceof Promise ){
              res.then(resolve,reject);
            }else{
              resolve(res);
            }
          }catch (err){
            reject(err);
          }
        })
      }
      //如果是pending状态 存回调函数，不立即执行
      if(that.status==PENDING){
        that.callbacks.push({
          onResolved:()=>{
            handle(onResolved);
          },
          onRejected:()=>{
            handle(onRejected);
          }
        });
      }else if(that.status==RESOLVED){
        //执行成功回调
        handle(onResolved)
      }else{
        //执行失败回调
        if(onRejected==undefined) onRejected = Promise.reject(that.data);
        handle(onRejected)
      }
    })
  }
  
  Promise.prototype.catch = function(onRejected) {
    return this.then(undefined,onRejected);
  }
  
  Promise.resolve = function (val) {
    return new Promise((resolve,reject)=>{
      if(val instanceof Promise){
        val.then(resolve,reject)
      }else{
        resolve(val);
      }
    })
  }
  Promise.reject = function(val) {
    return new Promise((resolve,reject)=>{
      reject(val);
    })
  }
  // 入参为promise数组
  // 返回一个新的promise
  // 如果数组都成功，则返回的promise为resolved 值为[p1,p2...]
  // 如果只要有一个失败，则返回的promise为失败，值为失败的promise的reason
  Promise.all = function(promiseArr){
    return new Promise((resolve,reject)=>{
      let res = new Array(promiseArr.length)
      let count = 0;
      promiseArr.forEach((p,index)=>{
        p.then(val=>{
          res[index]=val;
          count++;
          if(count==promiseArr.length){
            resolve(res);
          }
        },reason=>{
          reject(reason);
        })
      })
    })
  }
  //竞争
  Promise.race = function(promiseArr){
    return new Promise((resolve,reject)=>{
      promiseArr.forEach(p=>{
        p.then(val=>resolve(val),reason=>reject(reason));
      })
    })
  }

  window.Promise = Promise
})(window)