function fun3() {
  console.log("fun3");
}

function fun2() {
  fun3();
}

function fun1() {
  fun2();
}

fun1();

// 伪代码
// ECStack = [
//   globalContext
// ];

// fun1()
// ECStack.push(<fun1> functionContext);

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
// ECStack.push(<fun2> functionContext);

// 擦，fun2还调用了fun3！
// ECStack.push(<fun3> functionContext);

// fun3执行完毕
// ECStack.pop();

// fun2执行完毕
// ECStack.pop();

// fun1执行完毕
// ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
// 上下文执行栈先进后出，调用完最顶部的函数后弹出。