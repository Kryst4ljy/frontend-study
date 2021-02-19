((w) => {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const data = {
    word: "",
  };

  class Dep {
    static target = null;
    subs = [];

    addSub(sub) {
      this.subs.push(sub);
    }

    removeSub(sub) {
      remove(this.subs, sub);
    }

    depend() {
      if (Dep.target) {
        // 这里的this指向的是一个data属性的dep订阅者
        Dep.target.addDep(this);
      }
    }

    notify() {
      const subs = this.subs.slice();
      console.log(subs);
      for (let i = 0, l = subs.length; i < l; i++) {
        subs[i].update();
      }
    }
  }

  const watcher = {
    addDep: function (dep) {
      // 这里的this指向的是Dep.target
      dep.addSub(this);
    },
    update: function () {
      output.innerHTML = data.word;
    },
  };

  setObject(data, "word", "");
  Dep.target = watcher;
  console.log(data.word);

  input.addEventListener(
    "input",
    (e) => {
      data.word = e.target.value;
    },
    false
  );

  function setObject(obj, key, val) {
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        dep.depend();
        return val;
      },
      set: function (newVal) {
        if (newVal === val) return;
        val = newVal;
        dep.notify();
      },
    });
  }
})(window);
