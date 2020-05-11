[LeetCode 面试题 03.04. 化栈为队](https://leetcode-cn.com/problems/implement-queue-using-stacks-lcci/)

#### 题目：

实现一个MyQueue类，该类用两个栈来实现一个队列。

###### 示例：
```
MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false
```
#### 思路：
其实很容易想到解法，用第一个栈存，取的时候把第一个栈(A栈)的数据挨个放到第二个栈(B栈)，得到逆序的栈。B栈的先进后出，就等于原数据的先进先出了。但是如果执行 push push pop push 操作。 在pop的时候，数据会从A栈移动到B栈。所以在第三次push的时候，先将B栈的数据又导回了A栈。
``` java
class MyQueue {
    private Stack<Integer> stack1;
    private Stack<Integer> stack2;
    /** Initialize your data structure here. */
    public MyQueue() {
        stack1 = new Stack<Integer>();
        stack2 = new Stack<Integer>();
    }
    
    /** Push element x to the back of queue. */
    public void push(int x) {
        while(stack2.size()>0){
            stack1.push(stack2.pop());
        }
        stack1.push(x);
    }
    
    /** Removes the element from in front of queue and returns that element. */
    public int pop() {
        while(stack1.size()>0){
            stack2.push(stack1.pop());
        }
        return stack2.pop();
    }
    
    /** Get the front element. */
    public int peek() {
        while(stack1.size()>0){
            stack2.push(stack1.pop());
        }
        return stack2.peek();
    }
    
    /** Returns whether the queue is empty. */
    public boolean empty() {
        return stack1.size()==0 && stack2.size()==0;
    }
}
```

#### 优化：
提交代码后，只有50%多的rank，我有点不太满意。但是始终没有想到优化点。无奈之下去看了看前辈的代码。一个字，~~喵！~~ 妙！
``` java
 class MyQueue {

    Stack<Integer> stack1;
    Stack<Integer> stack2;
    
    /** Initialize your data structure here. */
    public MyQueue() {
        this.stack1 = new Stack<>();
        this.stack2 = new Stack<>();
    }

    /** Push element x to the back of queue. */
    public void push(int x) {
        stack1.push( x );
    }
    
    /** Removes the element from in front of queue and returns that element. */
    public int pop() {
        peek();
        return stack2.pop();
    }

    /** Get the front element. */
    public int peek() {
        if (!stack2.isEmpty()) return stack2.peek();
        else {
            while(!stack1.isEmpty()){
                stack2.push( stack1.pop() );
            }
            return stack2.peek();
        }
    }

    /** Returns whether the queue is empty. */
    public boolean empty() {
        return stack1.isEmpty() && stack2.isEmpty();
    }
}
```

我想出来的方法有一个弊端，数据会来回的倒腾。但这明显是不必要的操作。这段代码就避免了这个问题。

push的时候直接放入A栈。pop的时候，如果B栈没数据，则从A栈导入数据，形成逆序栈，然后pop出第一个元素，如果B栈有数据，直接pop第一个元素。
