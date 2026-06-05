# react-base-pack

Inject scalable React architecture into an existing React project.

`react-base-pack` is not a framework and not a full app boilerplate. It is an npm CLI that adds production-friendly folders, state management setup, Axios setup, JWT auth structure, and React Router structure to apps you already created with Vite, CRA, or Next.js.

## Requirements

- Node.js 18 or newer
- An existing React project
- npm, yarn, or pnpm

## Usage

Run inside your React project:

```bash
npx react-base-pack init
```

For local development from this repo:

```bash
node ../react-base-pack/bin/index.js init
```

The CLI asks for your project name, JavaScript or TypeScript output, and which features to set up. The language prompt is preselected from your project; TypeScript is selected when `tsconfig.json` or a TypeScript dependency is detected.

When you select `State Management`, the CLI asks you to choose `Redux Toolkit` or `Zustand`.

## CLI Options

```bash
npx react-base-pack init --dry-run
```

Preview files and packages without creating or installing anything.

```bash
npx react-base-pack init --yes
```

Use recommended defaults, select all features, choose detected JS/TS output, and choose axios for JWT auth.

```bash
npx react-base-pack init --yes --dry-run
```

Preview the complete all-features setup.

## Features

- Folder Architecture
- State Management
  - Redux Toolkit
  - Zustand
- Axios Setup
- JWT Auth
- React Router
- JavaScript and TypeScript project detection
- Vite, CRA, and Next.js project detection

## Feature Installs

When selected, these dependencies are installed automatically:

- Redux Toolkit: `@reduxjs/toolkit` and `react-redux`
- Zustand: `zustand`
- Axios Setup: `axios`
- JWT Auth with axios: `axios`
- React Router: `react-router-dom@6`

`--dry-run` shows these installs without running them.

## Generated Structure

Folder Architecture adds:

```text
src/
|-- components/
|-- pages/
|-- hooks/
|-- context/
|-- services/
|-- utils/
|-- assets/
|-- layouts/
|-- config/
|-- constants/
```

Redux Toolkit adds:

```text
src/store/
|-- store.js
|-- hooks/reduxHooks.js
|-- slices/exampleSlice.js
```

TypeScript projects receive `.ts` files.

Zustand adds:

```text
src/store/
|-- useExampleStore.js
```

TypeScript projects receive `.ts` files.

JWT Auth adds:

```text
src/services/authService.js
src/hooks/useAuth.js
src/context/AuthContext.jsx
src/utils/tokenUtils.js
src/components/ProtectedRoute.jsx
src/config/authConfig.js
```

TypeScript projects receive `.ts` and `.tsx` files.

Axios Setup adds:

```text
src/config/axiosInstance.js
```

React Router adds:

```text
src/routes/AppRouter.jsx
src/routes/routes.js
src/pages/HomePage.jsx
src/pages/LoginPage.jsx
src/pages/NotFoundPage.jsx
```

## After Setup

Redux Toolkit:

```jsx
import { Provider } from 'react-redux';
import { store } from './store/store';

<Provider store={store}>
  <App />
</Provider>
```

Zustand:

```jsx
import { useExampleStore } from './store/useExampleStore';

const { data, loading, fetchExampleData } = useExampleStore();
```

JWT Auth:

```jsx
import { AuthProvider } from './context/AuthContext';

<AuthProvider>
  <App />
</AuthProvider>
```

React Router:

```jsx
import AppRouter from './routes/AppRouter';

export default function App() {
  return <AppRouter />;
}
```

Axios:

```js
import axiosInstance from './config/axiosInstance';
```

Set your API URL with one of these environment variables:

```env
VITE_API_URL=https://your-api.com/api
REACT_APP_API_URL=https://your-api.com/api
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

## Safety

Existing generated paths are skipped with warnings. The CLI does not overwrite existing files during setup.

Use `--dry-run` before running on an important project.

## Local Verification

```bash
npm run lint
npm test
npm run pack:dry-run
```

Then test in a fresh React app:

```bash
npm create vite@latest final-test-app -- --template react
cd final-test-app
npm install
node ../react-base-pack/bin/index.js init --yes
npm run build
```

## License

MIT
