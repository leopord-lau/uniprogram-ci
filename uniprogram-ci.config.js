const path = require("path");
module.exports = {
  name: "uniprogram-ci pakcage",
  projectPath: process.cwd(),
  // appid: "wxdd3948dc1c7f95c2",
  privateKeyPath: process.cwd(),
  desc: "版本描述可选",
  version: "1.0.0",
  type: "miniprogram",
  ignores: ["node_modules/**/*", "README.md", "pnpm-lock.yaml", ".gitignore"],
  // 新增上传的自定义配置
  uploadOptions: {
    // 程序中默认读取项目路径下的 project.config.json setting 配置
    setting: {
      es6: true,
      es7: true,
      minify: true,
      ignoreUploadUnusedFiles: true,
    },
    robot: 1,
    threads: 2,
    // uniapp taro 等压缩后的小程序一般采用以下不压缩配置
    // setting: { es6: false, es7: false, minify: false, ignoreUploadUnusedFiles: false }
  },
  // 新增下载的自定义配置
  previewOptions: {
    // 程序中默认读取项目路径下的 project.config.json setting 配置
    setting: {
      es6: true,
      es7: true,
      minify: true,
      ignoreUploadUnusedFiles: true,
    },
    // pagePath 默认是pages/index/index
    // pagePath: ''
    // searchQuery: ''
    // scene: '',
    qrcodeFormat: "terminal",
    qrcodeOutputDest: path.join(__dirname, "qrcode.jpg"),
    // uniapp taro 等压缩后的小程序一般采用以下不压缩配置
    // setting: { es6: false, es7: false, minify: false, ignoreUploadUnusedFiles: false }
  },
  compilerOptions: {
    // 程序中默认读取项目路径下的 project.config.json setting 配置
    setting: {
      es6: true,
      es7: true,
      minify: true,
      ignoreUploadUnusedFiles: true,
    },
    // pagePath 默认是pages/index/index
    // pagePath: ''
    // searchQuery: ''
    // scene: '',
    qrcodeFormat: "terminal",
    qrcodeOutputDest: path.join(__dirname, "qrcode.jpg"),
    // uniapp taro 等压缩后的小程序一般采用以下不压缩配置
    // setting: { es6: false, es7: false, minify: false, ignoreUploadUnusedFiles: false }
    // TODO 需要判断后缀
    compilerPath: path.join(__dirname, "compiler.zip"),
  },
};
