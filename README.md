# uniprogram-ci

通过集成`uniprogram-ci`实现的微信小程序上传、预览小工具。

目前已实现

- 上传
- 预览
- 下载打包文件

## 配置

在根目录添加一个`uniprogram-ci.config.js`配置文件。

```js
const path = require("path");
module.exports = {
  name: "uniprogram-ci pakcage",
  projectPath: process.cwd(),
  privateKeyPath: process.cwd(),
  desc: "版本描述可选",
  version: "1.0.0",
  type: "miniprogram",
  ignores: ["node_modules/**/*", "README.md", "pnpm-lock.yaml", ".gitignore"],
  uploadOptions: {
    setting: {
      es6: true,
      es7: true,
      minify: true,
      ignoreUploadUnusedFiles: true,
    },
    robot: 1,
    threads: 2,
  },
  previewOptions: {
    setting: {
      es6: true,
      es7: true,
      minify: true,
      ignoreUploadUnusedFiles: true,
    },
    qrcodeFormat: "terminal",
    qrcodeOutputDest: path.join(__dirname, "qrcode.jpg"),
  },
  compilerOptions: {
    setting: {
      es6: true,
      es7: true,
      minify: true,
      ignoreUploadUnusedFiles: true,
    },
    compilerPath: path.join(__dirname, "compiler.zip"),
  },
};
```

### 基本配置

- `name`: 项目名;
- `projectPath`: 当前微信小程序根目录;
- `privateKeyPath`: 在小程序中下载的`key`文件路径;
- `desc`: 当前版本描述;
- `version`: 当前项目版本号;
- `type`: 微信小程序类型，比如`miniprogram`;
- `ignores`: 微信小程序打包、上传、预览需要忽略的文件目录;

### 上传配置

- `uploadOptions`: 与`miniprogram-ci`的上传配置一样。

### 预览配置

- `previewOptions`: 与`miniprogram-ci`的预览配置一样。

### 下载打包文件配置

- `compilerOptions`: 与`miniprogram-ci`的下载打包配置一样。

## 使用

目前暂不支持命令行配置，需要在根目录写好配置文件后执行对应的命令。

### 上传

`uniprogram-ci upload`

### 预览

`uniprogram-ci preview`

### 下载打包文件

`uniprogram-ci getCompiledResult`
