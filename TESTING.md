# react-base-pack Local Testing Notes

Run these from PowerShell.

## Package Checks

```powershell
cd D:\Anshuman\react-base-pack\react-base-pack
npm run lint
npm test
npm run pack:dry-run
```

## Create A Fresh JavaScript App

```powershell
cd D:\Anshuman\react-base-pack
npm create vite@latest test-js-app -- --template react
cd test-js-app
npm install
```

Run the CLI:

```powershell
node ..\react-base-pack\bin\index.js init
```

## Create A Fresh TypeScript App

```powershell
cd D:\Anshuman\react-base-pack
npm create vite@latest test-ts-app -- --template react-ts
cd test-ts-app
npm install
```

Run the CLI:

```powershell
node ..\react-base-pack\bin\index.js init
```

## Dry Run Test

```powershell
node ..\react-base-pack\bin\index.js init --yes --dry-run
```

Expected:

- No files created
- No packages installed
- Output shows `would create`, `would copy`, and `would install`

## Folder Architecture Test

Select:

```text
Folder Architecture
```

Expected:

```text
src/components
src/pages
src/hooks
src/context
src/services
src/utils
src/assets
src/layouts
src/config
src/constants
```

## Redux Toolkit Test

Select:

```text
State Management
Redux Toolkit
```

Check:

```powershell
npm list @reduxjs/toolkit react-redux
npm run build
```

Expected:

```text
src/store/store.js
src/store/hooks/reduxHooks.js
src/store/slices/exampleSlice.js
```

TypeScript apps should generate `.ts` files.

## Zustand Test

Use a fresh app.

Select:

```text
State Management
Zustand
```

Check:

```powershell
npm list zustand
npm run build
```

Expected:

```text
src/store/useExampleStore.js
```

TypeScript apps should generate `src/store/useExampleStore.ts`.

## Environment Config Test

Select:

```text
Environment Config
```

Expected:

```text
.env.example
src/config/env.js
```

TypeScript apps should generate `src/config/env.ts`.

Then run:

```powershell
npm run build
```

## TanStack Query Test

Select:

```text
TanStack Query
```

Check:

```powershell
npm list @tanstack/react-query
npm run build
```

Expected:

```text
src/config/queryClient.js
src/providers/QueryProvider.jsx
src/hooks/useExampleQuery.js
```

TypeScript apps should generate `.ts` and `.tsx` files.

## Axios Test

Select:

```text
Axios Setup
```

Check:

```powershell
npm list axios
npm run build
```

Expected:

```text
src/config/axiosInstance.js
```

## JWT Auth Test

Select:

```text
JWT Auth
```

If axios is missing, choose axios when prompted.

Check:

```powershell
npm list axios
npm run build
```

Expected:

```text
src/services/authService.js
src/hooks/useAuth.js
src/context/AuthContext.jsx
src/utils/tokenUtils.js
src/components/ProtectedRoute.jsx
src/config/authConfig.js
```

## React Router Test

Select:

```text
React Router
```

Check:

```powershell
npm list react-router-dom
npm run build
```

Expected:

```text
src/routes/AppRouter.jsx
src/routes/routes.js
src/pages/HomePage.jsx
src/pages/LoginPage.jsx
src/pages/NotFoundPage.jsx
```

## All Features Test

Use a fresh app.

```powershell
node ..\react-base-pack\bin\index.js init
```

Select:

```text
All Features
```

Choose JavaScript or TypeScript, then choose Redux Toolkit or Zustand.

Check:

```powershell
npm list axios react-router-dom @tanstack/react-query
npm list @reduxjs/toolkit react-redux
npm list zustand
npm run build
```

Only Redux packages or Zustand should exist depending on what you selected.

## Yes Mode Test

```powershell
node ..\react-base-pack\bin\index.js init --yes
```

Expected:

- Uses detected JavaScript or TypeScript
- Selects all features
- Uses Redux Toolkit as default state management
- Uses axios for JWT Auth
