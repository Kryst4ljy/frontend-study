((w) => {
  const a = [3, 1, 4, 5, 2, 12, 4, 2, 3];

  // 冒泡排序
  // const bubbling = (arr) => {
  //   if (!Array.isArray(arr)) return arr;
  //   const res = [...arr];
  //   for (let j = 0; j < res.length - 1; j++) {
  //     for (let i = 0; i < res.length - 1; i++) {
  //       if (res[i] > res[i + 1]) {
  //         const data = res[i + 1];
  //         res[i + 1] = res[i];
  //         res[i] = data;
  //       }
  //     }
  //   }
  //   return res;
  // };
  // console.log(bubbling(a));

  // 选择排序
  // const choose = (arr) => {
  //   if (!Array.isArray(arr)) return arr;
  //   const res = [...arr];
  //   for (let i = 0; i < res.length - 1; i++) {
  //     let min = res[i];
  //     let minIndex = i;
  //     for (let j = i + 1; j < res.length; j++) {
  //       if (min > res[j]) {
  //         min = res[j];
  //         minIndex = j;
  //       }
  //     }
  //     res[minIndex] = res[i];
  //     res[i] = min;
  //   }
  //   return res;
  // };
  // console.log(choose(a));

  
})(window);
