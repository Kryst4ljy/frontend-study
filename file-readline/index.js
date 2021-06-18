const fs = require("fs");
const inquirer = require("inquirer");
const { exec } = require("child_process");
const readline = require("readline");

// 1.获取文本文档
async function readTXT() {
  const inquirers = inquirer.prompt([
    {
      type: "Input",
      name: "pageFile",
      message: "请导入源文件：",
    },
    {
      type: "Input",
      name: "visitFile",
      message: "请导入文件：",
    },
    {
      type: "Input",
      name: "unVisitFile",
      message: "请导入文件：",
    },
  ]);
  const answers = await inquirers;
  const fRead = fs.createReadStream(answers["pageFile"].trim());
  const vWrite = fs.createWriteStream(answers["visitFile"].trim());
  const unVWrite = fs.createWriteStream(answers["unVisitFile"].trim());
  // 2.读取文件
  const r1 = readline.createInterface({
    input: fRead,
  });
  r1.on("line", function (line) {
    const r = shell(`ping -n 1 -l 1 ${line.trim()}`);
    r.then(() => {
      console.log(`可访问：${line.trim()}`);
      vWrite.write(`${line.trim()}\n`);
    }).catch(() => {
      console.log(`不可访问：${line.trim()}`);
      unVWrite.write(`${line.trim()}\n`);
    });
  }).on("close", () => {
    console.log("读写完毕");
  });
}
readTXT();

const shell = (cmdStr) => {
  return new Promise((resolve, reject) => {
    exec(cmdStr, (err, stdout, stderr) => {
      if (err) {
        reject("get weather api error:" + stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};
