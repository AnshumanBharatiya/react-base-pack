// Shared constants for the react-base-pack CLI foundation.

export const PACKAGE_NAME = 'react-base-pack';
export const VERSION = '1.0.0';
export const PROJECT_TYPES = {
  VITE: 'vite',
  CRA: 'cra',
  NEXT: 'next'
};
export const SUPPORTED_PROJECT_TYPES = [PROJECT_TYPES.VITE, PROJECT_TYPES.CRA, PROJECT_TYPES.NEXT];

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
  STORE_ALREADY_EXISTS: 'Redux store already exists, skipping Redux Toolkit setup:'
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
  JWT_AUTH: 'JWT Auth',
  AXIOS_SETUP: 'Axios Setup',
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
    name: FEATURES.JWT_AUTH,
    value: FEATURES.JWT_AUTH
  },
  {
    name: FEATURES.AXIOS_SETUP,
    value: FEATURES.AXIOS_SETUP
  },
  {
    name: FEATURES.REACT_ROUTER,
    value: FEATURES.REACT_ROUTER
  }
];

export const SETUP_FEATURES = [
  FEATURES.FOLDER_ARCHITECTURE,
  FEATURES.REDUX_TOOLKIT,
  FEATURES.JWT_AUTH,
  FEATURES.AXIOS_SETUP,
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
  NEXT: 'next'
};

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

export const REDUX_DIRECTORIES = {
  STORE: 'store',
  HOOKS: 'hooks',
  SLICES: 'slices'
};

export const REDUX_TEMPLATE_FILES = {
  STORE: 'store.js.template',
  HOOKS: 'reduxHooks.js.template',
  SLICE: 'exampleSlice.js.template'
};

export const REDUX_OUTPUT_FILES = {
  STORE: 'store.js',
  HOOKS: 'reduxHooks.js',
  SLICE: 'exampleSlice.js'
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
