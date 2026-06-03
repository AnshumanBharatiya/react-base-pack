// Shared constants for the react-base-pack CLI foundation.

export const PACKAGE_NAME = 'react-base-pack';
export const VERSION = '1.0.0';
export const PROJECT_TYPES = {
  VITE: 'vite',
  CRA: 'cra',
  NEXT: 'next'
};
export const SUPPORTED_PROJECT_TYPES = [PROJECT_TYPES.VITE, PROJECT_TYPES.CRA, PROJECT_TYPES.NEXT];

export const LANGUAGES = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript'
};

export const LANGUAGE_LABELS = {
  [LANGUAGES.JAVASCRIPT]: 'JavaScript',
  [LANGUAGES.TYPESCRIPT]: 'TypeScript'
};

export const TAGLINE = 'Enterprise React architecture, injected into your existing app.';

export const BANNER_TEXT = `
+------------------------------------------------------------+
| react-base-pack v1.0.0                                     |
| Enterprise React architecture for existing React projects.  |
+------------------------------------------------------------+
`;

export const COMMANDS = {
  INIT: 'init'
};

export const COMMAND_DESCRIPTIONS = {
  INIT: 'Initialize the react-base-pack foundation in an existing React project.'
};

export const CLI_MESSAGES = {
  UNKNOWN_COMMAND: 'Unknown command. Run "react-base-pack --help" to see available commands.',
  UNEXPECTED_ERROR: 'An unexpected error occurred.',
  DETECTING_PROJECT: 'Detecting React project type...',
  PROJECT_NOT_FOUND: 'No supported React project detected. Run this inside a Vite, CRA, or Next.js project.',
  PROJECT_DETECTED: 'Detected React project type:',
  LANGUAGE_DETECTED: 'Detected project language:',
  FOUNDATION_READY: 'Foundation ready. Run phase setup next.',
  CREATING_FOLDER_ARCHITECTURE: 'Creating folder architecture...',
  FOLDER_ARCHITECTURE_READY: 'Folder architecture created successfully.',
  FEATURE_COMING_SOON: 'Coming soon:',
  FOLDER_ALREADY_EXISTS: 'Folder already exists, skipping:',
  SETUP_COMPLETE: 'Foundation ready.',
  FEATURE_SELECTION_REQUIRED: 'Select at least one feature. Use Space to select, then Enter to continue.',
  INSTALLING_DEPENDENCIES: 'Installing dependencies...',
  DEPENDENCIES_INSTALLED: 'Dependencies installed.',
  NO_PACKAGES_PROVIDED: 'No packages provided for installation.',
  INSTALL_FAILED: 'Dependency installation failed.',
  SETTING_UP_REDUX: 'Setting up Redux Toolkit...',
  REDUX_SETUP_COMPLETE: 'Redux Toolkit setup complete!',
  STORE_ALREADY_EXISTS: 'Redux store already exists, skipping Redux Toolkit setup:',
  SETTING_UP_JWT: 'Setting up JWT Auth architecture...',
  JWT_SETUP_COMPLETE: 'JWT Auth architecture setup complete!',
  JWT_FILE_EXISTS: 'Auth file already exists, skipping:',
  AXIOS_NOT_FOUND: 'Axios is not installed.',
  AXIOS_FOUND: 'Axios detected. Generating axios-based auth service.',
  AXIOS_INSTALL_SELECTED: 'Installing axios and generating axios-based auth service.',
  FETCH_AUTH_SELECTED: 'Generating fetch-based auth service without axios.',
  JWT_FILE_CREATED: 'Created auth file:',
  SETTING_UP_AXIOS: 'Setting up Axios...',
  AXIOS_SETUP_COMPLETE: 'Axios setup complete!',
  AXIOS_INSTANCE_EXISTS: 'Axios instance already exists, skipping:',
  SETTING_UP_ROUTER: 'Setting up React Router...',
  ROUTER_SETUP_COMPLETE: 'React Router setup complete!',
  ROUTER_FILE_EXISTS: 'Router file already exists, skipping:',
  SETUP_SUMMARY: 'Selected setup complete:'
};

export const PROJECT_TYPE_LABELS = {
  [PROJECT_TYPES.VITE]: 'Vite',
  [PROJECT_TYPES.CRA]: 'CRA',
  [PROJECT_TYPES.NEXT]: 'Next.js'
};

export const ANSWER_KEYS = {
  PROJECT_NAME: 'projectName',
  FEATURES: 'features'
};

export const PROMPTS = {
  PROJECT_NAME: 'What is your project name?',
  FEATURES: 'Which features do you want to set up?'
};

export const FEATURES = {
  ALL: 'All Features',
  FOLDER_ARCHITECTURE: 'Folder Architecture',
  REDUX_TOOLKIT: 'Redux Toolkit',
  AXIOS_SETUP: 'Axios Setup',
  JWT_AUTH: 'JWT Auth',
  REACT_ROUTER: 'React Router'
};

export const FEATURE_CHOICES = Object.values(FEATURES);

export const FEATURE_PROMPT_CHOICES = [
  {
    name: FEATURES.ALL,
    value: FEATURES.ALL
  },
  {
    name: FEATURES.FOLDER_ARCHITECTURE,
    value: FEATURES.FOLDER_ARCHITECTURE,
    checked: true
  },
  {
    name: FEATURES.REDUX_TOOLKIT,
    value: FEATURES.REDUX_TOOLKIT
  },
  {
    name: FEATURES.AXIOS_SETUP,
    value: FEATURES.AXIOS_SETUP
  },
  {
    name: FEATURES.JWT_AUTH,
    value: FEATURES.JWT_AUTH
  },
  {
    name: FEATURES.REACT_ROUTER,
    value: FEATURES.REACT_ROUTER
  }
];

export const SETUP_FEATURES = [
  FEATURES.FOLDER_ARCHITECTURE,
  FEATURES.REDUX_TOOLKIT,
  FEATURES.AXIOS_SETUP,
  FEATURES.JWT_AUTH,
  FEATURES.REACT_ROUTER
];

export const SOURCE_DIRECTORY = 'src';

export const README_FILE = 'README.md';

export const GITKEEP_FILE = '.gitkeep';

export const TEMPLATE_EXTENSION = '.template';

export const FOLDER_STRUCTURE = [
  {
    name: 'components',
    description: 'reusable UI components',
    readme: '# components\nPlace all reusable UI components here.\nOrganize by feature: components/Button, components/Modal etc.\n'
  },
  {
    name: 'pages',
    description: 'route-level page components',
    readme: '# pages\nPlace route-level page components here.\nKeep each page focused on composing features and layouts.\n'
  },
  {
    name: 'hooks',
    description: 'custom React hooks',
    readme: '# hooks\nPlace custom React hooks here.\nUse this folder for reusable stateful logic shared across components.\n'
  },
  {
    name: 'context',
    description: 'React context providers',
    readme: '# context\nPlace React context providers here.\nKeep provider setup and context-specific hooks close together.\n'
  },
  {
    name: 'services',
    description: 'API calls and business logic',
    readme: '# services\nPlace API calls and business logic here.\nKeep external integrations and domain operations out of UI components.\n'
  },
  {
    name: 'utils',
    description: 'helper functions',
    readme: '# utils\nPlace helper functions here.\nKeep utilities small, focused, and independent of React rendering.\n'
  },
  {
    name: 'assets',
    description: 'images, fonts, icons',
    readme: '# assets\nPlace images, fonts, icons, and other static assets here.\nGroup assets by type or feature as the project grows.\n'
  },
  {
    name: 'layouts',
    description: 'layout wrappers',
    readme: '# layouts\nPlace layout wrappers here.\nUse this folder for shared shells such as Header, Sidebar, and page frames.\n'
  },
  {
    name: 'config',
    description: 'env config and app config',
    readme: '# config\nPlace env config and app config here.\nCentralize runtime settings and app-level configuration helpers.\n'
  },
  {
    name: 'constants',
    description: 'app-wide constants',
    readme: '# constants\nPlace app-wide constants here.\nKeep shared labels, route names, and fixed values easy to find.\n'
  }
];

export const FOLDER_TREE = `src/
|-- components/
|   |-- README.md
|-- pages/
|   |-- README.md
|-- hooks/
|   |-- README.md
|-- context/
|   |-- README.md
|-- services/
|   |-- README.md
|-- utils/
|   |-- README.md
|-- assets/
|   |-- README.md
|-- layouts/
|   |-- README.md
|-- config/
|   |-- README.md
|-- constants/
|   |-- README.md`;

export const PACKAGE_MANIFEST = 'package.json';

export const PACKAGE_FIELDS = {
  DEPENDENCIES: 'dependencies',
  DEV_DEPENDENCIES: 'devDependencies',
  VITE: 'vite',
  REACT_SCRIPTS: 'react-scripts',
  NEXT: 'next',
  AXIOS: 'axios',
  REACT_ROUTER_DOM: 'react-router-dom',
  TYPESCRIPT: 'typescript'
};

export const TSCONFIG_FILE = 'tsconfig.json';

export const NPM_COMMANDS = {
  INSTALL: 'install',
  SAVE_DEV: '--save-dev'
};

export const PLATFORM = {
  WINDOWS: 'win32'
};

export const PACKAGE_MANAGERS = {
  NPM: 'npm',
  YARN: 'yarn',
  PNPM: 'pnpm'
};

export const LOCK_FILES = {
  [PACKAGE_MANAGERS.PNPM]: 'pnpm-lock.yaml',
  [PACKAGE_MANAGERS.YARN]: 'yarn.lock',
  [PACKAGE_MANAGERS.NPM]: 'package-lock.json'
};

export const PACKAGE_MANAGER_INSTALL_CONFIG = {
  [PACKAGE_MANAGERS.NPM]: {
    command: 'npm',
    windowsCommand: 'npm.cmd',
    installArgs: ['install'],
    devArg: '--save-dev'
  },
  [PACKAGE_MANAGERS.YARN]: {
    command: 'yarn',
    windowsCommand: 'yarn.cmd',
    installArgs: ['add'],
    devArg: '-D'
  },
  [PACKAGE_MANAGERS.PNPM]: {
    command: 'pnpm',
    windowsCommand: 'pnpm.cmd',
    installArgs: ['add'],
    devArg: '-D'
  }
};

export const REDUX_PACKAGES = ['@reduxjs/toolkit@latest', 'react-redux@latest'];

export const REDUX_TEMPLATE_DIRECTORY = 'redux';

export const REDUX_TEMPLATE_DIRECTORIES = {
  [LANGUAGES.JAVASCRIPT]: 'redux',
  [LANGUAGES.TYPESCRIPT]: 'redux-ts'
};

export const REDUX_DIRECTORIES = {
  STORE: 'store',
  HOOKS: 'hooks',
  SLICES: 'slices'
};

export const REDUX_TEMPLATE_FILES = {
  STORE_JS: 'store.js.template',
  STORE_TS: 'store.ts.template',
  HOOKS_JS: 'reduxHooks.js.template',
  HOOKS_TS: 'reduxHooks.ts.template',
  SLICE_JS: 'exampleSlice.js.template',
  SLICE_TS: 'exampleSlice.ts.template'
};

export const REDUX_OUTPUT_FILES = {
  STORE_JS: 'store.js',
  STORE_TS: 'store.ts',
  HOOKS_JS: 'reduxHooks.js',
  HOOKS_TS: 'reduxHooks.ts',
  SLICE_JS: 'exampleSlice.js',
  SLICE_TS: 'exampleSlice.ts'
};

export const REDUX_NEXT_STEPS = `Redux Toolkit setup complete!

Next steps:
1. Wrap your app in main.jsx:
   import { Provider } from 'react-redux';
   import { store } from './store/store';

   <Provider store={store}>
     <App />
   </Provider>

2. Import hooks:
   import { useAppDispatch, useAppSelector } from './store/hooks/reduxHooks';

3. Use the example slice or create your own in src/store/slices/.`;

export const JWT_TEMPLATE_DIRECTORY = 'jwt';

export const JWT_TEMPLATE_DIRECTORIES = {
  [LANGUAGES.JAVASCRIPT]: 'jwt',
  [LANGUAGES.TYPESCRIPT]: 'jwt-ts'
};

export const JWT_DIRECTORIES = {
  SERVICES: 'services',
  HOOKS: 'hooks',
  CONTEXT: 'context',
  UTILS: 'utils',
  COMPONENTS: 'components',
  CONFIG: 'config'
};

export const JWT_TEMPLATE_FILES = {
  AUTH_SERVICE_AXIOS: 'authService.axios.js.template',
  AUTH_SERVICE_FETCH: 'authService.fetch.js.template',
  AUTH_SERVICE_AXIOS_TS: 'authService.axios.ts.template',
  AUTH_SERVICE_FETCH_TS: 'authService.fetch.ts.template',
  USE_AUTH: 'useAuth.js.template',
  USE_AUTH_TS: 'useAuth.ts.template',
  AUTH_CONTEXT: 'AuthContext.jsx.template',
  AUTH_CONTEXT_TS: 'AuthContext.tsx.template',
  TOKEN_UTILS: 'tokenUtils.js.template',
  TOKEN_UTILS_TS: 'tokenUtils.ts.template',
  PROTECTED_ROUTE: 'ProtectedRoute.jsx.template',
  PROTECTED_ROUTE_TS: 'ProtectedRoute.tsx.template',
  AUTH_CONFIG: 'authConfig.js.template',
  AUTH_CONFIG_TS: 'authConfig.ts.template'
};

export const JWT_OUTPUT_FILES = {
  AUTH_SERVICE_JS: 'authService.js',
  AUTH_SERVICE_TS: 'authService.ts',
  USE_AUTH_JS: 'useAuth.js',
  USE_AUTH_TS: 'useAuth.ts',
  AUTH_CONTEXT_JS: 'AuthContext.jsx',
  AUTH_CONTEXT_TS: 'AuthContext.tsx',
  TOKEN_UTILS_JS: 'tokenUtils.js',
  TOKEN_UTILS_TS: 'tokenUtils.ts',
  PROTECTED_ROUTE_JS: 'ProtectedRoute.jsx',
  PROTECTED_ROUTE_TS: 'ProtectedRoute.tsx',
  AUTH_CONFIG_JS: 'authConfig.js',
  AUTH_CONFIG_TS: 'authConfig.ts'
};

export const JWT_TEMPLATE_MAPPINGS = [
  {
    directory: JWT_DIRECTORIES.HOOKS,
    template: JWT_TEMPLATE_FILES.USE_AUTH,
    output: JWT_OUTPUT_FILES.USE_AUTH_JS
  },
  {
    directory: JWT_DIRECTORIES.CONTEXT,
    template: JWT_TEMPLATE_FILES.AUTH_CONTEXT,
    output: JWT_OUTPUT_FILES.AUTH_CONTEXT_JS
  },
  {
    directory: JWT_DIRECTORIES.UTILS,
    template: JWT_TEMPLATE_FILES.TOKEN_UTILS,
    output: JWT_OUTPUT_FILES.TOKEN_UTILS_JS
  },
  {
    directory: JWT_DIRECTORIES.COMPONENTS,
    template: JWT_TEMPLATE_FILES.PROTECTED_ROUTE,
    output: JWT_OUTPUT_FILES.PROTECTED_ROUTE_JS
  },
  {
    directory: JWT_DIRECTORIES.CONFIG,
    template: JWT_TEMPLATE_FILES.AUTH_CONFIG,
    output: JWT_OUTPUT_FILES.AUTH_CONFIG_JS
  }
];

export const AXIOS_PACKAGE = 'axios';

export const AXIOS_LATEST_PACKAGE = 'axios@latest';

export const REACT_ROUTER_PACKAGE = 'react-router-dom';

export const REACT_ROUTER_LATEST_PACKAGE = 'react-router-dom@6';

export const JWT_AUTH_CLIENTS = {
  AXIOS: 'axios',
  FETCH: 'fetch'
};

export const JWT_AUTH_CLIENT_PROMPT = {
  NAME: 'authClient',
  MESSAGE: 'Axios is not installed. How should JWT Auth be generated?',
  CHOICES: [
    {
      name: 'Install axios and generate axios-based auth service (Recommended)',
      value: JWT_AUTH_CLIENTS.AXIOS
    },
    {
      name: 'Generate fetch-based auth service without axios',
      value: JWT_AUTH_CLIENTS.FETCH
    }
  ]
};

export const JWT_NEXT_STEPS = `JWT Auth architecture setup complete!

Next steps:
1. Wrap your app with AuthProvider:
   import { AuthProvider } from './context/AuthContext';

   <AuthProvider>
     <App />
   </AuthProvider>

2. Protect private UI:
   import ProtectedRoute from './components/ProtectedRoute';

   <ProtectedRoute>
     <Dashboard />
   </ProtectedRoute>

3. Set your API URL:
   VITE_API_URL=https://your-api.com/api
   or
   REACT_APP_API_URL=https://your-api.com/api
   or
   NEXT_PUBLIC_API_URL=https://your-api.com/api

4. Review src/config/authConfig.js and src/services/authService.js for your backend routes.`;

export const AXIOS_TEMPLATE_DIRECTORIES = {
  [LANGUAGES.JAVASCRIPT]: 'axios',
  [LANGUAGES.TYPESCRIPT]: 'axios-ts'
};

export const AXIOS_TEMPLATE_FILES = {
  [LANGUAGES.JAVASCRIPT]: 'axiosInstance.js.template',
  [LANGUAGES.TYPESCRIPT]: 'axiosInstance.ts.template'
};

export const AXIOS_OUTPUT_FILES = {
  [LANGUAGES.JAVASCRIPT]: 'axiosInstance.js',
  [LANGUAGES.TYPESCRIPT]: 'axiosInstance.ts'
};

export const AXIOS_NEXT_STEPS = `Axios setup complete!

Next steps:
1. Import axiosInstance instead of axios directly:
   import axiosInstance from './config/axiosInstance';

2. Set your API URL:
   VITE_API_URL=https://your-api.com/api
   or
   REACT_APP_API_URL=https://your-api.com/api
   or
   NEXT_PUBLIC_API_URL=https://your-api.com/api`;

export const ROUTER_TEMPLATE_DIRECTORIES = {
  [LANGUAGES.JAVASCRIPT]: 'router',
  [LANGUAGES.TYPESCRIPT]: 'router-ts'
};

export const ROUTER_DIRECTORIES = {
  ROUTES: 'routes',
  PAGES: 'pages'
};

export const ROUTER_TEMPLATE_FILES = {
  APP_ROUTER_JS: 'AppRouter.jsx.template',
  APP_ROUTER_PROTECTED_JS: 'AppRouter.protected.jsx.template',
  APP_ROUTER_TS: 'AppRouter.tsx.template',
  APP_ROUTER_PROTECTED_TS: 'AppRouter.protected.tsx.template',
  ROUTES_JS: 'routes.js.template',
  ROUTES_TS: 'routes.ts.template',
  HOME_PAGE_JS: 'HomePage.jsx.template',
  HOME_PAGE_TS: 'HomePage.tsx.template',
  LOGIN_PAGE_JS: 'LoginPage.jsx.template',
  LOGIN_PAGE_TS: 'LoginPage.tsx.template',
  NOT_FOUND_PAGE_JS: 'NotFoundPage.jsx.template',
  NOT_FOUND_PAGE_TS: 'NotFoundPage.tsx.template'
};

export const ROUTER_OUTPUT_FILES = {
  APP_ROUTER_JS: 'AppRouter.jsx',
  APP_ROUTER_TS: 'AppRouter.tsx',
  ROUTES_JS: 'routes.js',
  ROUTES_TS: 'routes.ts',
  HOME_PAGE_JS: 'HomePage.jsx',
  HOME_PAGE_TS: 'HomePage.tsx',
  LOGIN_PAGE_JS: 'LoginPage.jsx',
  LOGIN_PAGE_TS: 'LoginPage.tsx',
  NOT_FOUND_PAGE_JS: 'NotFoundPage.jsx',
  NOT_FOUND_PAGE_TS: 'NotFoundPage.tsx'
};

export const ROUTER_NEXT_STEPS = `React Router setup complete!

Next steps:
1. Replace App.jsx/App.tsx content with:
   import AppRouter from './routes/AppRouter';

   export default function App() {
     return <AppRouter />;
   }

2. Edit src/routes/routes.js or src/routes/routes.ts to add real routes.`;
