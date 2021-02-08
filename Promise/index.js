class PromiseAll {
  constructor(callback) {
    // 检测输入
    if (!(callback instanceof Function)) {
      console.log("输入必须是函数");
      return;
    }

    // 实例属性&方法
    this.callback = callback;
    this.status = "pending";
    this.value = ""; // success回调传回的数据
    this.reason = ""; // error回调传回的原因
    this.successCall = []; // success后的回调函数
    this.errorCall = []; // error后的回调函数

    // 调用callback
    callback(this.resolve, this.reject);
  }
  // 原型属性&方法
  resolve = (value) => {
    if (!this.status === "pending") {
      return;
    }
    this.value = value;
    this.status = "success";
    this.successCall.map((item) => item(this.value));
  };
  reject = (value) => {
    if (!this.status === "pending") {
      return;
    }
    this.reason = value;
    this.status = "error";
    this.errorCall.map((item) => item(this.reason));
  };
  then = (success, error) => {
    success = success instanceof Function ? success : (data) => data;
    error = error instanceof Function ? error : (error) => error;
    if (this.status === "success") {
      success(this.value);
      return;
    } else if (this.status === "error") {
      error(this.reason);
      return;
    }
    this.successCall.push(success);
    this.errorCall.push(error);
  };
}

const a = new PromiseAll((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
  }, 0);
});

a.then(
  (data) => {
    console.log(data);
  },
  () => {}
);
