// script start - 1 - 9 - async start - script end - 微任务1 - 微任务2 - async end - 宏任务2 - 2 - 微任务2 - 宏任务1 - 3 - 微任务3
console.log("script start");

new Promise((res) => {
  console.log(1);
  res();
}).then(() => {
  console.log("微任务1");
});

const p = new Promise((res) => {
  console.log(9);
  res();
}).then(() => {
  console.log("微任务2");
});

async function foo() {
  console.log("async start");
  await p;
  console.log("async end");
}

foo();

setTimeout(() => {
  console.log("宏任务1");
  new Promise((res) => {
    console.log(3);
    res();
  }).then(() => {
    console.log("微任务3");
  });
}, 101);

setTimeout(() => {
  console.log("宏任务2");
  new Promise((res) => {
    console.log(2);
    res();
  }).then(() => {
    console.log("微任务4");
  });
}, 100);

console.log("script end");

// function bar() {
//   console.log("bar");
//   Promise.resolve().then((str) => console.log("micro-bar"));
//   setTimeout((str) => console.log("macro-bar"), 0);
// }
// function foo() {
//   console.log("foo");
//   Promise.resolve().then((str) => console.log("micro-foo"));
//   setTimeout((str) => console.log("macro-foo"), 0);
//   bar();
// }
// foo();
// console.log("global");
// Promise.resolve().then((str) => console.log("micro-global"));
// setTimeout((str) => console.log("macro-global"), 0);
