# 地藏王菩萨祈福网站 (Ksitigarbha Prayer Website)

## 项目简介
这是一个基于 React + Vite + Tailwind CSS 构建的静态网站，包含在线祈福、经文阅读（支持多语言）等功能。

## 部署到 GitHub Pages

本项目已配置 GitHub Actions 自动部署工作流。

### 部署步骤：

1. **创建仓库**：在 GitHub 上创建一个新的空仓库（例如 `dizang-prayer`）。
2. **推送代码**：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```
3. **开启 Pages**：
   - 进入 GitHub 仓库页面。
   - 点击 **Settings** (设置) -> **Pages** (页面)。
   - 在 **Build and deployment** (构建与部署) 下：
     - Source 选择 **GitHub Actions**。
   - 配置完成后，GitHub Actions 会自动开始构建并部署。
   - 稍等片刻，你就可以在 `https://你的用户名.github.io/你的仓库名/` 访问网站了。

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build
```

## 技术栈
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui
- i18next (多语言支持)
- wouter (Hash 路由，完美兼容 GitHub Pages)
