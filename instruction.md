# VitePress + GitHub Pages 从零搭建步骤清单
全程按照「环境准备 → 本地初始化 → 配置调试 → 部署上线 → 日常更新」的流程操作，新手无额外门槛，全程免费。

## 一、前置环境准备（必做）
### 1. 安装 Node.js
- 要求：**Node.js 18.0 及以上 LTS 版本**
- 下载地址：[Node.js 官网](https://nodejs.org/)，选择 LTS 版本一键安装
- 验证：打开终端/命令行，输入以下命令，输出版本号即成功
  ```bash
  node -v
  npm -v
  ```

### 2. 安装 Git 工具
- 下载地址：[Git 官网](https://git-scm.com/)，默认安装即可
- 验证：终端输入 `git --version`，输出版本号即成功
- 配置 Git 身份（首次使用必须执行）：
  ```bash
  git config --global user.name "你的GitHub用户名"
  git config --global user.email "你的GitHub绑定邮箱"
  ```

### 3. 注册 GitHub 账号
前往 [GitHub 官网](https://github.com/) 注册账号，用户名会直接影响你的博客域名。

## 二、本地初始化 VitePress 项目
### 1. 创建项目文件夹
在电脑本地新建一个空文件夹（例如命名为 `my-blog`），在文件夹内右键打开终端/命令行。

### 2. 执行初始化向导
直接运行官方一键初始化命令，跟着提示选择即可：
```bash
npx vitepress init
```

向导选项推荐选择：
1. 配置文件存放目录：输入 `./docs`（回车默认即可）
2. 站点标题：输入你的博客名称（如 `CloudingYu的博客`）
3. 站点描述：输入一句话介绍（如 `个人技术笔记与分享`）
4. 主题选择：选 `Default Theme`（默认主题，功能最完整）
5. 是否用 TypeScript：选 `No`（新手选 JS 更简单）
6. 是否添加 npm 脚本：选 `Yes`
7. 脚本前缀：默认 `docs` 即可

### 3. 生成的项目结构
初始化完成后，你会得到如下目录：
```
my-blog/
├── docs/                    # 博客文章都放在这里
│   ├── .vitepress/         # VitePress 配置目录
│   │   └── config.mjs      # 核心配置文件（导航、侧边栏、主题等）
│   ├── index.md            # 博客首页
│   └── markdown-examples.md # 示例文章
└── package.json            # 项目依赖与脚本
```

## 三、本地预览与基础配置
### 1. 启动本地开发服务器
在终端执行：
```bash
npm run docs:dev
```
运行成功后，终端会输出本地地址（默认 `http://localhost:5173`），在浏览器打开即可实时预览效果，修改文件会自动刷新。

### 2. 核心配置：设置 base 路径（部署关键）
打开 `docs/.vitepress/config.mjs`，根据你的 GitHub 仓库类型，添加 `base` 配置，**这一步错了会导致部署后样式丢失**。

#### 情况 A：用户主页仓库（推荐）
仓库命名为 `你的用户名.github.io`（例如 `cloudingyu.github.io`），最终域名为 `https://用户名.github.io`，配置为：
```js
export default defineConfig({
  base: '/',  // 根路径
  title: '你的博客标题',
  description: '你的博客描述',
  // 其他配置...
})
```

#### 情况 B：普通项目仓库
仓库名为任意名称（例如 `my-note`），最终域名为 `https://用户名.github.io/仓库名/`，配置为：
```js
export default defineConfig({
  base: '/my-note/',  // 必须和仓库名完全一致，前后带斜杠
  title: '你的博客标题',
  description: '你的博客描述',
  // 其他配置...
})
```

### 3. 写第一篇文章
在 `docs` 文件夹下新建 `.md` 后缀的 Markdown 文件（例如 `first-article.md`），用 Markdown 语法写内容即可，访问路径为 `域名/first-article.html`。

## 四、创建 GitHub 仓库并推送代码
### 1. 新建 GitHub 仓库
1. 登录 GitHub，点击右上角 `+` → `New repository`
2. 仓库名称：
   - 主页型：填 `你的用户名.github.io`（必须完全匹配）
   - 项目型：填任意名称（如 `my-blog`）
3. 选择 `Public`，**不要勾选**初始化 README、LICENSE 等文件
4. 点击 `Create repository`

### 2. 本地提交并推送代码
回到项目文件夹的终端，依次执行以下命令：

1. 初始化本地 Git 仓库
   ```bash
   git init
   ```

2. 创建 `.gitignore` 文件，忽略无用文件
   在项目根目录新建 `.gitignore` 文件，写入：
   ```
   node_modules
   .vitepress/cache
   .vitepress/dist
   .DS_Store
   ```

3. 提交所有文件
   ```bash
   git add .
   git commit -m "初始化VitePress博客"
   ```

4. 关联远程仓库并推送
   把下面命令里的地址替换成你自己仓库的地址（GitHub 新建仓库页面会显示）：
   ```bash
   git remote add origin https://github.com/你的用户名/仓库名.git
   git branch -M main
   git push -u origin main
   ```

## 五、配置 GitHub Actions 自动部署
这是官方推荐的方式：每次推送代码，GitHub 会自动构建并部署博客，无需手动操作。

### 1. 创建工作流文件
在项目根目录依次新建文件夹：`.github/workflows/`，在里面新建文件 `deploy.yml`，完整内容如下（来自官方文档）：

```yaml
name: Deploy VitePress site to Pages

on:
  # 推送到 main 分支时自动触发
  push:
    branches: [main]
  # 支持手动触发工作流
  workflow_dispatch:

# 设置权限，允许部署 Pages
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建阶段
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署阶段
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 2. 提交并推送工作流文件
```bash
git add .
git commit -m "添加自动部署工作流"
git push
```

## 六、启用 GitHub Pages 并验证
1. 打开你的 GitHub 仓库页面，点击顶部 `Settings`
2. 左侧菜单找到 `Pages`
3. 在 **Build and deployment** → **Source** 处，选择 `GitHub Actions`
4. 等待 1-2 分钟，GitHub 会自动运行工作流
   - 可在仓库顶部 `Actions` 标签页查看部署进度
   - 绿色对勾代表部署成功
5. 部署成功后，Pages 页面会显示你的博客访问地址，打开即可看到站点

## 七、日常更新博客的标准流程
以后写新文章只需要 3 步：
1. 在 `docs` 目录下新建/修改 Markdown 文章
2. 本地执行 `npm run docs:dev` 预览效果
3. 确认无误后，终端执行提交推送：
   ```bash
   git add .
   git commit -m "新增XX文章"
   git push
   ```
GitHub 会自动构建部署，1 分钟左右线上就会更新。

## 八、常见问题排查
1. **部署后页面样式全乱/空白**：99% 是 `base` 路径配置错误，检查仓库名和 base 是否完全匹配。
2. **Actions 运行失败**：检查 `deploy.yml` 里的构建路径 `docs/.vitepress/dist` 是否和你的项目结构一致。
3. **访问 404**：确认 Pages 源选择了 GitHub Actions，且工作流已成功运行完成。
4. **图片不显示**：建议把图片放在 `docs/public` 目录下，Markdown 里用 `/图片名.png` 的路径引用。