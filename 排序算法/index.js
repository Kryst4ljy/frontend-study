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

  // 快速排序
  const choose = (arr) => {
    return quickAsc(arr, 0, arr.length - 1);
  };
  const quickAsc = (arr, left, right) => {
    if (left >= right) return;
    let key = arr[left];
    let l = left;
    let r = right;
    while (l < r) {
      // 右边开始，当右边的小于key值时，右边结束循环，赋值到左边参数
      while (l < r && arr[r] >= key) {
        r--;
      }
      arr[l] = arr[r];
      // 左边开始，当左边的值大于key值时，左边循环结束，赋值到右边参数
      while (l < r && arr[l] <= key) {
        l++;
      }
      arr[r] = arr[l];
    }
    arr[l] = key;
    quickAsc(arr, left, l);
    quickAsc(arr, l + 1, right);
  };
  const arr = [3, 4, 1, 5, 3, 6, 13, 12, 4, 2];
  choose(arr);
  console.log(arr);
})(window);
