# Micro Frontend Starter

[![Qiankun](https://img.shields.io/badge/Framework-qiankun-6451ab)](https://qiankun.umijs.org/)
[![Vite](https://img.shields.io/badge/Develop-Vite-747bff)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![Vue3](https://img.shields.io/badge/Vue3-42b883)](https://vuejs.org/)
[![React](https://img.shields.io/badge/React-61dafb)](https://reactjs.org/)
[![Svelte](https://img.shields.io/badge/Svelte-ff3e00)](https://svelte.dev/)
[![Build](https://github.com/yugasun/micro-frontend-starter/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/yugasun/micro-frontend-starter/actions/workflows/ci.yml)

## Feature

-   [x] Micro Framework using [qiankun](https://qiankun.umijs.org/) 🔥
-   [x] Monorepo using [pnpm](https://pnpm.io/) 🔥
-   [x] Develop & build using [vite](https://vitejs.dev/) 🔥
-   [x] Support [Vue.js](https://vuejs.org/), [React.js](https://reactjs.org/), [Svelte.js](https://svelte.dev/) frameworks
-   [x] Auto develop and build commands.
-   [x] Support docker deployment.

## Architecture

Application list:

-   **packages/plugin**: Plugin for vite to use qiankun
-   **packages/main**: The main application using Vue.js
-   **packages/subapp1**: The child application using Vue.js
-   **packages/subapp2**: The child application using React.js
-   **packages/subapp3**: The child application using Svelte.js

## Usage

1. Clone project:

```shell
git clone https://github.com/yugasun/micro-frontend-starter.git
```

2. Install dependencies:

```shell
pnpm i
```

3. Start develop:

```shell
pnpm run dev
```

Now you can access by `http://localhost:8000`.

Develop for single application:

```shell
pnppm run dev --app main
```

1. Build:

```shell
pnpm run build

# or build for single application
pnpm run build --app main
```

5. Start by docker:

```shell
# build image
pnpm run docker:build

# start
pnpm run docker:up
```

## License

MIT License

Copyright (c) 2022 Yuga Sun
