// React Router generator for injecting route config, router component, and starter pages.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import {
  CLI_MESSAGES,
  JWT_DIRECTORIES,
  JWT_OUTPUT_FILES,
  LANGUAGES,
  PACKAGE_FIELDS,
  PACKAGE_MANIFEST,
  REACT_ROUTER_LATEST_PACKAGE,
  ROUTER_DIRECTORIES,
  ROUTER_NEXT_STEPS,
  ROUTER_OUTPUT_FILES,
  ROUTER_TEMPLATE_DIRECTORIES,
  ROUTER_TEMPLATE_FILES
} from '../constants/index.js';
import { copyTemplate, ensureDir, pathExists, readJSON } from '../utils/fileUtils.js';
import { installDeps, showInstallerSpinner } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

/**
 * Checks whether react-router-dom is declared in the user's project.
 *
 * @returns {Promise<boolean>} True when react-router-dom exists in dependencies or devDependencies.
 */
async function hasRouterDependency() {
  try {
    const manifest = await readJSON(path.join(process.cwd(), PACKAGE_MANIFEST));
    const dependencies = manifest[PACKAGE_FIELDS.DEPENDENCIES] || {};
    const devDependencies = manifest[PACKAGE_FIELDS.DEV_DEPENDENCIES] || {};

    return Boolean(
      dependencies[PACKAGE_FIELDS.REACT_ROUTER_DOM] || devDependencies[PACKAGE_FIELDS.REACT_ROUTER_DOM]
    );
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    return false;
  }
}

/**
 * Checks whether JWT ProtectedRoute exists.
 *
 * @param {string} targetPath Target src directory path.
 * @param {'typescript'|'javascript'} language Detected project language.
 * @returns {Promise<boolean>} True when ProtectedRoute exists.
 */
async function hasProtectedRoute(targetPath, language) {
  const protectedRouteFile = language === LANGUAGES.TYPESCRIPT
    ? JWT_OUTPUT_FILES.PROTECTED_ROUTE_TS
    : JWT_OUTPUT_FILES.PROTECTED_ROUTE_JS;

  return pathExists(path.join(targetPath, JWT_DIRECTORIES.COMPONENTS, protectedRouteFile));
}

/**
 * Builds router template mappings for the detected language.
 *
 * @param {'typescript'|'javascript'} language Detected project language.
 * @returns {object[]} Router template mappings.
 */
function createRouterMappings(language, protectedRouteExists) {
  const isTypeScript = language === LANGUAGES.TYPESCRIPT;

  return [
    {
      directory: ROUTER_DIRECTORIES.ROUTES,
      template: isTypeScript
        ? (protectedRouteExists ? ROUTER_TEMPLATE_FILES.APP_ROUTER_PROTECTED_TS : ROUTER_TEMPLATE_FILES.APP_ROUTER_TS)
        : (protectedRouteExists ? ROUTER_TEMPLATE_FILES.APP_ROUTER_PROTECTED_JS : ROUTER_TEMPLATE_FILES.APP_ROUTER_JS),
      output: isTypeScript ? ROUTER_OUTPUT_FILES.APP_ROUTER_TS : ROUTER_OUTPUT_FILES.APP_ROUTER_JS
    },
    {
      directory: ROUTER_DIRECTORIES.ROUTES,
      template: isTypeScript ? ROUTER_TEMPLATE_FILES.ROUTES_TS : ROUTER_TEMPLATE_FILES.ROUTES_JS,
      output: isTypeScript ? ROUTER_OUTPUT_FILES.ROUTES_TS : ROUTER_OUTPUT_FILES.ROUTES_JS
    },
    {
      directory: ROUTER_DIRECTORIES.PAGES,
      template: isTypeScript ? ROUTER_TEMPLATE_FILES.HOME_PAGE_TS : ROUTER_TEMPLATE_FILES.HOME_PAGE_JS,
      output: isTypeScript ? ROUTER_OUTPUT_FILES.HOME_PAGE_TS : ROUTER_OUTPUT_FILES.HOME_PAGE_JS
    },
    {
      directory: ROUTER_DIRECTORIES.PAGES,
      template: isTypeScript ? ROUTER_TEMPLATE_FILES.LOGIN_PAGE_TS : ROUTER_TEMPLATE_FILES.LOGIN_PAGE_JS,
      output: isTypeScript ? ROUTER_OUTPUT_FILES.LOGIN_PAGE_TS : ROUTER_OUTPUT_FILES.LOGIN_PAGE_JS
    },
    {
      directory: ROUTER_DIRECTORIES.PAGES,
      template: isTypeScript ? ROUTER_TEMPLATE_FILES.NOT_FOUND_PAGE_TS : ROUTER_TEMPLATE_FILES.NOT_FOUND_PAGE_JS,
      output: isTypeScript ? ROUTER_OUTPUT_FILES.NOT_FOUND_PAGE_TS : ROUTER_OUTPUT_FILES.NOT_FOUND_PAGE_JS
    }
  ];
}

/**
 * Generates React Router v6 architecture.
 *
 * @param {string} targetPath Target src directory path.
 * @param {'typescript'|'javascript'} language Detected project language.
 * @returns {Promise<void>}
 */
export async function generateRouterSetup(targetPath, language = LANGUAGES.JAVASCRIPT) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.SETTING_UP_ROUTER);

  try {
    if (!(await hasRouterDependency())) {
      await installDeps([REACT_ROUTER_LATEST_PACKAGE]);
    }

    spinner.start();

    const templatesRoot = path.join(currentDirectory, '..', 'templates', ROUTER_TEMPLATE_DIRECTORIES[language]);
    const protectedRouteExists = await hasProtectedRoute(targetPath, language);

    for (const mapping of createRouterMappings(language, protectedRouteExists)) {
      const destinationDirectory = path.join(targetPath, mapping.directory);
      const destinationPath = path.join(destinationDirectory, mapping.output);

      await ensureDir(destinationDirectory);

      if (await pathExists(destinationPath)) {
        spinner.stop();
        logger.warn(`${CLI_MESSAGES.ROUTER_FILE_EXISTS} ${destinationPath}`);
        spinner.start();
        continue;
      }

      await copyTemplate(path.join(templatesRoot, mapping.directory, mapping.template), destinationPath);
    }

    spinner.succeed(`${CLI_MESSAGES.ROUTER_SETUP_COMPLETE} ProtectedRoute: ${protectedRouteExists}`);
    logger.success(CLI_MESSAGES.ROUTER_SETUP_COMPLETE);
    console.log(chalk.cyan(ROUTER_NEXT_STEPS));
  } catch (error) {
    spinner.fail(CLI_MESSAGES.UNEXPECTED_ERROR);
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
    throw error;
  }
}
