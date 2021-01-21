const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://juejin.cn/";

axios.get(url).then((res) => {
  const $ = cheerio.load(res.data);
  const arr = [];
  $("a").each((index, element) => {
    arr.push($(element).text());
  });
  console.log(arr);
});
