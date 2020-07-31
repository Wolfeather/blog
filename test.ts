/*
 * @Descripttion: 
 * @version: 
 * @Author: wolfeather
 * @Date: 2020-07-29 09:50:10
 * @LastEditors: wolfeather
 * @LastEditTime: 2020-07-29 09:52:49
 */ 
const log = console.log

interface People{
  name:string
  age?:number
}

let tom: People = {
  name: 'tom',
  age: 18
}

log(tom);
