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
  INSTALLING_DEPENDENCIES: 'Installing dependencies...',
  NO_PACKAGES_PROVIDED: 'No packages provided for installation.',
  INSTALL_FAILED: 'Dependency installation failed.'
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

export const FEATURE_CHOICES = [
  'Folder Architecture',
  'Redux Toolkit',
  'JWT Auth',
  'Axios Setup',
  'React Router'
];

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
