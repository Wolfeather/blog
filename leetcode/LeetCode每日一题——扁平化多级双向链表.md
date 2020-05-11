[LeetCode 第430题 扁平化多级双向链表](https://leetcode-cn.com/problems/flatten-a-multilevel-doubly-linked-list/)

#### 题目：

多级双向链表中，除了指向下一个节点和前一个节点指针之外，它还有一个子链表指针，可能指向单独的双向链表。这些子列表也可能会有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例所示。


###### 示例：
```
输入：head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
输出：[1,2,3,7,8,11,12,9,10,4,5,6]
```
解释：

输入链表：
![](https://user-gold-cdn.xitu.io/2020/5/2/171d36330569d268?w=1341&h=761&f=png&s=49630)
输出链表：

![](https://user-gold-cdn.xitu.io/2020/5/2/171d363cc3794a02?w=2781&h=201&f=png&s=33509)

#### 思路1：
这道题用递归的思路做最简单。把每个有child的节点的子链表拼接到父节点的后面，父节点原本的下一个节点顺延到子链表后面。
这里的拼接子链表因为情况不同我写了两次，虽然可以合并，但我觉得这样代码的可读性会高一点(试着合并过，合并出来的代码太丑了。。。应该是我的方法有问题)
``` javascript
var flatten = function(head) {
    return flatten2(head)[0];
    //自建方法，返回数组[头节点，尾节点]
    //减少连接时寻找尾节点的耗时
    function flatten2(head){
        if(head==null) return [null,null];
        let p = head,h,t;
        while(p.next){
            //拿到当前节点的下一个节点
            let n = p.next;
            if(p.child){
                [h,t] = flatten2(p.child);
                //当前节点child置空
                p.child = null;
                //当前节点与子链表的头节点连接
                p.next = h;
                h.prev = p;
                //下一节点与子链表的尾结点连接
                t.next = n;
                n.prev = t;
            }
            //指针移到下一节点
            p=n;
        }
        if(p.child){
            [h,t] = flatten2(p.child);
            p.child = null;
            p.next = h;
            h.prev = p;
            p=t;
        }
        return [head,p];
    }
};
```

#### 思路2：
能递归自然就能迭代。遍历链表，如果有child就把本身压入栈，取出child，继续遍历child链表。
 - 遍历当前链表
 - 如果节点p有child，把p压入栈。然后p指向child链表
 - 当前链表遍历完，如果栈还有值，压出栈里的节点继续遍历

想了一个大致的思路，因为懒具体实现代码就没写了...
