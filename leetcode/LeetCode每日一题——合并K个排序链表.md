[leetcode第23题](https://leetcode-cn.com/problems/merge-k-sorted-lists/submissions/)


#### 题目：

合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

###### 示例：
```
输入:
[
  1->4->5,
  1->3->4,
  2->6
]
输出: 1->1->2->3->4->4->5->6
```
#### 思路1：

拿到题的第一时间，联想到了之前做过的合并2个排序链表。那不难想到的解法，便是老老实实做2个链表的合并。

``` JavaScript
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    while(lists.length>1){
        lists.push(merge(lists.pop(),lists.pop()));
    }
    return lists.pop() || null;
};

//合并两个链表
function merge(l1,l2){
    if(l1==null) return l2;
    if(l2==null) return l1;
    let p = l1, q = l2;
    let res = new ListNode();
    let i = res;
    while(p!=null && q!==null){
        if(p.val<q.val){
            i.next = p;
            p = p.next;
        }else{
            i.next = q;
            q = q.next;
        }
        i = i.next;
    } 
    i.next = p==null?q:p;
    return res.next;
}
```

#### 思路2：

直接把链表转成数组，然后数组排序，然后再转回链表。

**不建议使用，这个方法不符合出题人思路，属于投机取巧型，不过作为思路拓展可以参考**

``` JavaScript
var mergeKLists = function(lists) {
    //先转换成数组
    let arr = [];
    for(let l of lists){
        while(l){
            arr.push(l.val);
            l=l.next;
        }
    }
    //数组排序
    arr.sort((a,b)=>a-b);
    //再转换成链表
    let res = new ListNode();
    let p = res;
    for(let i of arr){
        p.next = new ListNode(i);
        p=p.next;
    }
    return res.next
};
```

#### 思路3：

每次将2个链表拿出来合并，会有很多次重复的比较。所以想到了一个办法，把每一个链表中最小的值放进数组，进行排序。然后把当前数组中的最小值放在返回链表中，将当前最小值链表后移，继续按序插入到数组。

``` JavaScript
var mergeKLists = function(lists) {
    //将K个列表中每个最小的都插入到数组并且按值排序
    let arr = [],res=new ListNode(),p=res;
    for(let l of lists){
        orderInsert(arr,l);
    }
    //每次取出最小值 放到返回链表中，然后将取出的链表后移，放入数组
    while(arr.length>1){
        let [i,temp] = arr.pop();
        p.next = temp;
        temp = temp.next;
        p = p.next;
        orderInsert(arr,temp);
    }
    //将最后一组放在最后  判空
    p.next = arr[0]?arr[0][1]:null;
    return res.next;
};

//按顺序插入
function orderInsert(arr,l){
    if(l==null) return;
    let val = l.val,index = 0, temp = [val,l];
    for(let i=0;i<arr.length;i++){
        if(arr[i][0]<=val){
            arr.splice(i,0,temp)
            return;
        }
    }
    arr.push(temp);
}
```

### 总结：

这道题其实完全没有达到hard难度，但是我想到的解法的时间复杂度都不算低。也就是说能解答不难，但是要做到最优解还是需要费点脑子。