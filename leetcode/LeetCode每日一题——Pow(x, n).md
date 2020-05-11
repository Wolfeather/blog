[LeetCode 第50题 Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)

### 题目：

实现 pow(x, n) ，即计算 x 的 n 次幂函数。

#### 示例1：
```
输入: 2.00000, 10
输出: 1024.00000
```
#### 示例2：
```
输入: 2.10000, 3
输出: 9.26100
```
#### 示例3：
```
输入: 2.00000, -2
输出: 0.25000
解释: 2-2 = 1/22 = 1/4 = 0.25
```


### 思路：
最开始的思路就是莽，一个一个乘。后来被`0.00001,2147483647`这个用例打回来了。。。
Allright，改思路呗，换用二分法。

$$   x^{n} =(x^2)^{\frac{n}{2}}(n为偶数)         $$
$$   x^{n} =x*x^{n-1} = x*  (x^2)^{\frac{n-1}{2}} (n为奇数)         $$

递归就完事了嗷。

``` javascript
var myPow = function(x, n) {
    if(n==0) return 1;
    if(n==1) return x;
    if(n<0){
        x=1/x;
        n=-n;
    }
    if(n%2!=0){
        return x*myPow(x*x,(n-1)/2);
    }else{
        return myPow(x*x,n/2);
    }
};
```

