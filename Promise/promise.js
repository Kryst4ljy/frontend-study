class Promise_ {
  status = "pedding"; // 状态：pedding fulfilled rejected
  successDep = []; // 成功时的回调函数集合
  errorDep = []; // 失败时的回调函数集合
  catchDep = []; // callback内部错误回调函数集合
  successVal = undefined; // 成功时的值
  errorVal = undefined; // 失败时的值

  constructor(callback) {
    // 1.判断入参是否为函数
    if (!(callback instanceof Function)) {
      console.error(`Promise resolver ${callback} is not a function`);
      return;
    }
    try {
      callback(this.resolve, this.reject);
    } catch (error) {
      this.recatch(error);
    }
  }

  // notify 发布
  resolve = (value) => {
    // 赋值
    this.status = "fulfilled";
    this.successVal = value;
    // 发布订阅
    this.successDep.forEach((m) => {
      try {
        m(value);
      } catch (error) {
        this.recatch(error);
      }
    });
  };
  reject = (value) => {
    // 赋值
    this.status = "rejected";
    this.errorVal = value;
    // 发布订阅
    this.errorDep.forEach((m) => {
      m(value);
    });
  };
  recatch = (error) => {
    // 赋值
    this.status = "rejected";
    this.errorVal = error;
    // 发布订阅
    this.catchDep.forEach((m) => {
      m(error);
    });
  };

  // depend 订阅
  then = (success, error) => {
    // 判断入参是否都为函数
    success = success instanceof Function ? success : () => {};
    error = error instanceof Function ? error : () => {};

    // 判断状态
    if (this.status === "fulfilled") {
      success(this.successVal);
      return this;
    }
    if (this.status === "rejected") {
      error(this.errorVal);
      return this;
    }

    // 添加订阅者
    this.successDep.push(success);
    this.errorDep.push(error);
    // 链式调用
    return this;
  };
  catch = (error) => {
    // 判断入参是否都为函数
    error = error instanceof Function ? error : () => {};

    if (this.status === "rejected") {
      error(this.errorVal);
      return this;
    }

    // 添加订阅者
    this.catchDep.push(error);
    // 链式调用
    return this;
  };
  finally = (cb) => {
    return this.then(
      () => cb(),
      () => cb()
    );
  };
}

const p = new Promise_((res, rej) => {
  setTimeout(() => {
    rej(233);
  }, 300);
});

p.finally(() => {
  console.log("finally");
})
  .then(
    (val) => {
      throw new Error("test2");
    },
    (err) => {
      console.log(err);
    }
  )
  .then((val) => {
    console.log(val, "2");
  })
  .catch((err) => {
    console.log("catch: ", err);
  });
