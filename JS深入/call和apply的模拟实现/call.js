Function.prototype.callSelf = (context) => {
  // this指向被调用的函数
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }

  var result = eval("context.fn(" + args + ")");

  context.fn();
  delete context.fn;
  
  return result;
};

// 测试一下
var foo = {
  value: 1,
};

function bar() {
  console.log(this.value);
}

bar.callSelf(foo); // 1
