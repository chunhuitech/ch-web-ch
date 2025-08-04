初始化
参考： https://github.com/PanJiaChen/vueAdmin-template.git


## Build Setup

``` bash

# Clone project
git clone https://github.com/chunhuitech/ch-web-ch.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report


## node.js版本升级到20后遇到的问题

你的错误是因为 node-sass 依赖 node-gyp 编译，但你的 Python 版本不兼容（node-gyp 需要 Python 2.x，而你安装的是 Python 3.x），并且 node-sass 3.x/4.x 不支持 Node.js 20。

通过conda安装Python2.7：
查看 conda 环境：conda info --envs 
创建python2环境：conda create -n py27_env python=2.7
创建python2环境：conda activate py27_env

切换nodjs版本：nvm use 10.24.1

你当前用的是 Node.js 16.14.2，理论上兼容 node-sass 4.x，但依然遇到 node-gyp 编译失败。常见原因和解决办法如下：

---

### 1. 确保 Python 2.7 安装并在 PATH 中

node-gyp 3.x 需要 Python 2.7。  
在命令行输入：

```bash
python --version
```

如果不是 2.7.x，建议安装 Python 2.7 并配置环境变量。

---

### 2. 安装 Windows 构建工具

在管理员命令行执行：

```bash
npm install --global windows-build-tools
```

或（新版 node-gyp 推荐）：

```bash
npm install --global --production windows-build-tools
npm install --global node-gyp
```

---

### 3. 清理缓存并重新安装依赖

```bash
npm cache clean --force
rimraf node_modules
rimraf package-lock.json
npm install
```

---

### 4. 如果还不行，尝试锁定 node-sass 版本

有时 node-sass 最新 4.x 也不稳定，可以指定 4.14.1：

```bash
npm install node-sass@4.14.1 --save-dev
```

---

### 5. 检查 Visual Studio 2017/2019 是否安装（带C++构建工具）

node-gyp 需要 MSVC 工具链。  
可通过“Visual Studio Installer”添加“使用C++的桌面开发”组件。

---

**总结推荐命令：**

```bash
nvm use 16
npm install --global windows-build-tools
npm install --global node-gyp
npm install node-sass@4.14.1 --save-dev
npm install
```

你当前用的是 Node.js 16.14.2，理论上兼容 node-sass 4.x，但依然遇到 node-gyp 编译失败。常见原因和解决办法如下：

---

### 1. 确保 Python 2.7 安装并在 PATH 中

node-gyp 3.x 需要 Python 2.7。  
在命令行输入：

```bash
python --version
```

如果不是 2.7.x，建议安装 Python 2.7 并配置环境变量。

---

### 2. 安装 Windows 构建工具

在管理员命令行执行：

```bash
npm install --global windows-build-tools
```

或（新版 node-gyp 推荐）：

```bash
npm install --global --production windows-build-tools
npm install --global node-gyp
```

---

### 3. 清理缓存并重新安装依赖

```bash
npm cache clean --force
rimraf node_modules
rimraf package-lock.json
npm install
```

---

### 4. 如果还不行，尝试锁定 node-sass 版本

有时 node-sass 最新 4.x 也不稳定，可以指定 4.14.1：

```bash
npm install node-sass@4.14.1 --save-dev
```

---

### 5. 检查 Visual Studio 2017/2019 是否安装（带C++构建工具）

node-gyp 需要 MSVC 工具链。  
可通过“Visual Studio Installer”添加“使用C++的桌面开发”组件。

---

**总结推荐命令：**

```bash
nvm use 16
npm install --global windows-build-tools
npm install --global node-gyp
npm install node-sass@4.14.1 --save-dev
npm install
```

清理并重新安装依赖：
npm cache clean --force
rimraf node_modules
rimraf package-lock.json
npm install


不折腾了，换个新版本