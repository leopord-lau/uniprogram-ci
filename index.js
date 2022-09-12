const program = require("commander");
const pkg = require("./package.json");
const ci = require("miniprogram-ci");
program.version(pkg.version).usage("command");
const path = require("path");
const cwdPath = process.cwd() + "/";
let project;

const parseUniprogramConfig = async (cwd) => {
  try {
    const result = await require(path.join(cwd, "uniprogram-ci.config.js"));
    return result;
  } catch (err) {
    throw new Error(
      "配置文件解析失败，请确保项目根目录存在uniprogram-ci.config.js文件"
    );
  }
};

function initCi(options) {
  project = new ci.Project({
    appid: options.appid,
    type: options.type,
    projectPath: options.projectPath,
    privateKeyPath: options.privateKeyPath,
    ignores: options.ignores,
  });

  return project;
}

// 需要确认upload的参数是否是配置文件uploadOptions
async function upload(options) {
  initCi(options);
  return await ci.upload({
    project,
    version: options.version,
    desc: options.desc,
    setting: options.uploadOptions.setting,
    robot: options.uploadOptions.robot,
    threads: options.uploadOptions.threads,
  });
}

async function preview(options) {
  initCi(options);
  return await ci.preview({
    project,
    desc: options.desc,
    qrcodeFormat: options.previewOptions.qrcodeFormat,
    qrcodeOutputDest: options.previewOptions.qrcodeOutputDest,
    setting: options.previewOptions.setting,
  });
}

async function getCompiledResult(options) {
  initCi(options);
  return await ci.getCompiledResult(
    {
      project,
      desc: options.desc,
      version: options.version,
      setting: options.compilerOptions.setting,
    },
    options.compilerOptions.compilerPath || ""
  );
}

const formatConfig = (options) => {
  let {
    name,
    appid,
    privateKeyPath,
    projectPath,
    configPath,
    packageJsonPath,
    desc,
    version,
    projectOptions,
    uploadOptions,
    previewOptions,
    compilerOptions,
  } = options;
  if (!appid) {
    throw new Error("请配置项目appid");
  }
  if (!privateKeyPath) {
    throw new Error("请配置微信小程序privateKeyPath");
  }

  if (!projectPath) {
    throw new Error("请配置微信小程序根目录");
  }
  version = version || "1.0.0";
  desc = desc || "";
  privateKeyPath = path.resolve(cwdPath, privateKeyPath || "");
  projectPath = path.resolve(cwdPath, projectPath || "");
  configPath = path.resolve(cwdPath, configPath || "");
  packageJsonPath = path.resolve(cwdPath, packageJsonPath || "");

  return {
    name,
    appid,
    privateKeyPath,
    projectPath,
    configPath,
    packageJsonPath,
    desc,
    version,
    projectOptions,
    uploadOptions,
    previewOptions,
    compilerOptions,
  };
};

const parseEnv = async () => {
  let parsed = await parseUniprogramConfig(cwdPath);
  let {
    name,
    appid,
    privateKeyPath,
    projectPath,
    configPath,
    packageJsonPath,
    desc,
    version,
    uploadOptions,
    previewOptions,
    compilerOptions,
  } = formatConfig(parsed);

  return {
    name,
    appid,
    privateKeyPath,
    projectPath,
    configPath,
    packageJsonPath,
    desc,
    version,
    uploadOptions,
    previewOptions,
    compilerOptions,
  };
};

program
  .command("upload [workspace]")
  .description("上传微信小程序代码")
  .action(async function () {
    try {
      const fileConfig = await parseEnv();
      await upload(fileConfig);
    } catch (e) {
      throw new Error(e);
    }
  });
program
  .command("preview [workspace]")
  .description("预览微信小程序代码")
  .action(async function () {
    try {
      const fileConfig = await parseEnv();
      await preview(fileConfig);
    } catch (e) {
      throw new Error(e);
    }
  });

program
  .command("getCompiledResult [workspace]")
  .description("下载压缩包")
  .action(async function () {
    try {
      const fileConfig = await parseEnv();
      await getCompiledResult(fileConfig);
    } catch (e) {
      throw new Error(e);
    }
  });

program.parse(process.argv);
