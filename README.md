# Kilanka Applet Starter Template using React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

> **Package manager:** This project uses [pnpm](https://pnpm.io) exclusively. The version is pinned via the `packageManager` field (enable it through [Corepack](https://nodejs.org/api/corepack.html) with `corepack enable`). A `preinstall` guard blocks `npm`/`yarn`. Commands: `pnpm install`, `pnpm dev`, `pnpm build`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Environment / Secrets

The token and backend URL are **not** stored in the repo, but per applet outside the project:

```
~/.config/kilanka/<package.json-name>.env
```

For this project that is `~/.config/kilanka/applet-starter-template.env` (`chmod 600`). The expected variables are listed in [`.env.sample`](./.env.sample):

```
KILANKA_APPLET_TOKEN=
KILANKA_APPLET_URL=http://localhost:4000
```

You can override the path with `KILANKA_ENV_FILE=/path/to/file`; alternatively the values also work as plain shell environment variables.
