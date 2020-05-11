[LeetCode 第430题 扁平化多级双向链表](https://leetcode-cn.com/problems/flatten-a-multilevel-doubly-linked-list/)

#### 题目：

给你一个**山脉数组**`mountainArr`，请你返回能够使得`mountainArr.get(index)`等于`target`最小的下标`index`值。

如果不存在这样的下标 index，就请返回`-1`。

何为山脉数组？如果数组`A` 是一个山脉数组的话，那它满足如下条件：

首先，A.length >= 3

其次，在`0 < i< A.length - 1`条件下，存在 i 使得：

* `A[0] < A[1] < ... A[i-1] < A[i]`

* `A[i] > A[i+1] > ... > A[A.length - 1]`

你将**不能直接访问**该山脉数组，必须通过`MountainArray`接口来获取数据：

`MountainArray.get(k)`- 会返回数组中索引为`k`的元素（下标从 0 开始）
`MountainArray.length()`- 会返回该数组的长度

注意：

对`MountainArray.get`发起超过 100 次调用的提交将被视为错误答案。此外，任何试图规避判题系统的解决方案都将会导致比赛资格被取消。

###### 示例：
```
输入：array = [1,2,3,4,5,3,1], target = 3
输出：2
解释：3 在数组中出现了两次，下标分别为 2 和 5，我们返回最小的下标 2。
```

#### 思路1：
显然这道题考察的是二分法的运用。步骤如下：
- 先找到山脉数组的峰值，将山脉数组升序数组和降序数组。
- 优先在升序数组查找目标值，找到就返回。
- 如果没找到，再在降序数组查找目标值，找到就返回。
- 如果没找到就返回-1。
``` javascript
var findInMountainArray = function(target, mountainArr) {
    let left = 0 ,right = mountainArr.length();
    let mid;
    //二分法寻找峰值位置
    while(left<=right){
        mid = ~~ (left + (right-left)/2);
        let l=mountainArr.get(mid-1),m=mountainArr.get(mid),r=mountainArr.get(mid+1);
        //如果左边大，说明峰值在右边，
        //如果右边大，说明峰值在左边。
        if(l>m){
            right = mid;
        }else if(m<r){
            left = mid;
        }else{
            break;
        }
    }
    let peak = mid;
    //左边优先级更高
    //先从左侧寻找 左侧是升序
    left=0,right=peak;
    while(left<right){
        let mid = ~~ (left + (right-left)/2);
        let v=mountainArr.get(mid);
        if(target<v){
            right=mid;
        }else if(v<target){
            left=mid+1;
        }else{
            return mid;
        }
    }
    if(mountainArr.get(left)==target) return left;
    left = peak, right=mountainArr.length()-1;
    while(left<right){
        let mid = ~~ (left + (right-left)/2);
        let v=mountainArr.get(mid);
        if(target>v){
            right=mid;
        }else if(v>target){
            left=mid+1;
        }else{
            return mid;
        }
    }
    if(mountainArr.get(left)==target) return left;
    return -1
};
```
