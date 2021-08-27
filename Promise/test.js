/**
 * `Promise`的实现实际上是发布订阅模式的一种体现。在`then`、`catch`、`finally`等方法传入回调，这些回调函数都是`订阅者`，会被存在`Promise`内部的订阅者列表里。在`resolve`或者`reject`调用时，循环这些订阅者列表，发布订阅。
 */
class Promise_ {
  status = "pedding"; // 状态：pedding fulfilled rejected
  successDep = []; // 成功时的回调函数集合
  errorDep = []; // 失败时的回调函数集合
  resultVal = undefined; // 执行完毕的值

  constructor(callback) {
    // 1.判断入参是否为函数
    if (!(callback instanceof Function)) {
      console.error(`Promise resolver ${callback} is not a function`);
      return;
    }
    try {
      callback(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  // all方法
  static all = (arr) => {
    // 判断入参是否为一个数组
    if (!(arr instanceof Array)) {
      console.error(`Promise resolver ${arr} is not a Array`);
      return;
    }

    // 判断是否为空数组
    if (arr.length === 0) return new Promise_((res) => res([]));

    return new Promise_((res, rej) => {
      let resArr = [];
      let num = 0;
      for (let i = 0; i < arr.length; i++) {
        let p = null;
        // 检测数组成员是否为Promise_对象
        if (!(arr[i] instanceof Promise_)) {
          p = Promise_.resolve(arr[i]);
        } else {
          p = arr[i];
        }

        p.then((val) => {
          resArr[i] = val;
          if (++num === resArr.length) {
            res(resArr);
          }
        }).catch((err) => {
          rej([err]);
        });
      }
    });
  };
  // race方法
  static race = (arr) => {
    // 判断入参是否为一个数组
    if (!(arr instanceof Array)) {
      console.error(`Promise resolver ${arr} is not a Array`);
      return;
    }

    // 判断是否为空数组
    if (arr.length === 0) return new Promise_((res) => res([]));

    return new Promise_((res, rej) => {
      let f = false;
      for (let i = 0; i < arr.length; i++) {
        let p = null;
        // 检测数组成员是否为Promise_对象
        if (!(arr[i] instanceof Promise_)) {
          p = Promise_.resolve(arr[i]);
        } else {
          p = arr[i];
        }

        p.then((val) => {
          if (f) return;
          f = true;
          res(val);
        }).catch((err) => {
          if (f) return;
          f = true;
          rej(err);
        });
      }
    });
  };
  // 转换其他类型为Promise_类型
  static resolve = (val) => {
    return new Promise_((res, rej) => {
      res(val);
    });
  };

  // notify 发布
  resolve = (value) => {
    // 赋值
    this.status = "fulfilled";
    this.resultVal = value;
    // 发布订阅
    this.successDep.forEach((m) => {
      try {
        m(value);
      } catch (error) {
        this.reject(error);
      }
    });
  };
  reject = (value) => {
    // 赋值
    this.status = "rejected";
    this.resultVal = value;
    // 发布订阅
    this.errorDep.forEach((m) => {
      m(value);
    });
  };

  // depend 订阅
  then = (success, error) => {
    // 判断入参是否都为函数
    success = success instanceof Function ? success : () => {};
    error = error instanceof Function ? error : () => {};

    // 判断状态
    if (this.status === "fulfilled") {
      success(this.resultVal);
      return this;
    }
    if (this.status === "rejected") {
      error(this.resultVal);
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
      error(this.resultVal);
      return this;
    }

    // 添加订阅者
    this.errorDep.push(error);
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

const p1 = new Promise_((res, rej) => {
  setTimeout(() => {
    res(123);
  }, 300);
});
const p2 = new Promise_((res, rej) => {
  setTimeout(() => {
    rej(321);
  }, 5000);
});
const p = Promise_.all([p1, p2]);
console.log(p);
setTimeout(() => {
  console.log(p);
  // p.then((val) => console.log(val));
}, 5000);
