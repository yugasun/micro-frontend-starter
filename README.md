# Micro Frontend Starter

<a href="https://github.com/yugasun/micro-frontend-starter/actions/workflows/ci.yml"><img src="https://github.com/yugasun/micro-frontend-starter/actions/workflows/ci.yml/badge.svg?branch=main" alt="build status"></a>
<br/>

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
