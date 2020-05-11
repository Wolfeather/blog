[LeetCode 第104题 二叉树的最大深度](https://leetcode-cn.com/problems/implement-queue-using-stacks-lcci/)

#### 题目：

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明**: 叶子节点是指没有子节点的节点。

###### 示例：
给定二叉树 [3,9,20,null,null,15,7]，
```
    3
   / \
  9  20
    /  \
   15   7
```
返回它的最大深度 3 。
#### 思路1：
递归就完事了。
``` javascript
var maxDepth = function(root) {
    if(root==null) return 0;
    return 1+Math.max(maxDepth(root.left),maxDepth(root.right));
};
```
#### 思路2：
众所周知，能递归就能迭代...
``` javascript
var maxDepth = function(root) {
    //这里用一个数组当做栈用来做迭代
    let stack = [];
    stack.push([root,0]);
    let rootDepth = 0;
    while(stack.length>0){
        let [node,depth] = stack.pop();
        if(!node) {
            rootDepth = Math.max(rootDepth,depth);
            continue;
        }
        let {left,right} = node;
        stack.push([left,depth+1]);
        stack.push([right,depth+1]);
    }
    return rootDepth;
};
```
比较简单 没啥好讲的。