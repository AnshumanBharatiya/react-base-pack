// Redux Toolkit generator for injecting store, hooks, slices, and dependencies.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import {
  CLI_MESSAGES,
  LANGUAGES,
  REDUX_DIRECTORIES,
  REDUX_NEXT_STEPS,
  REDUX_OUTPUT_FILES,
  REDUX_PACKAGES,
  REDUX_TEMPLATE_DIRECTORIES,
  REDUX_TEMPLATE_FILES
} from '../constants/index.js';
import { copyTemplate, ensureDir, pathExists } from '../utils/fileUtils.js';
import { installDeps, showInstallerSpinner } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

/**
 * Builds Redux template metadata for the detected language.
 *
 * @param {'typescript'|'javascript'} language Detected project language.
 * @returns {object} Template and output file names.
 */
function getReduxTemplateConfig(language) {
  const isTypeScript = language === LANGUAGES.TYPESCRIPT;

  return {
    templatesRoot: path.join(currentDirectory, '..', 'templates', REDUX_TEMPLATE_DIRECTORIES[language]),
    storeTemplate: isTypeScript ? REDUX_TEMPLATE_FILES.STORE_TS : REDUX_TEMPLATE_FILES.STORE_JS,
    hooksTemplate: isTypeScript ? REDUX_TEMPLATE_FILES.HOOKS_TS : REDUX_TEMPLATE_FILES.HOOKS_JS,
    sliceTemplate: isTypeScript ? REDUX_TEMPLATE_FILES.SLICE_TS : REDUX_TEMPLATE_FILES.SLICE_JS,
    storeOutput: isTypeScript ? REDUX_OUTPUT_FILES.STORE_TS : REDUX_OUTPUT_FILES.STORE_JS,
    hooksOutput: isTypeScript ? REDUX_OUTPUT_FILES.HOOKS_TS : REDUX_OUTPUT_FILES.HOOKS_JS,
    sliceOutput: isTypeScript ? REDUX_OUTPUT_FILES.SLICE_TS : REDUX_OUTPUT_FILES.SLICE_JS
  };
}

/**
 * Generates Redux Toolkit store architecture and installs Redux dependencies.
 *
 * @param {string} targetPath Target src directory path.
 * @param {'typescript'|'javascript'} language Detected project language.
 * @returns {Promise<void>}
 */
export async function generateReduxSetup(targetPath, language = LANGUAGES.JAVASCRIPT) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.SETTING_UP_REDUX);

  try {
    const templateConfig = getReduxTemplateConfig(language);
    const storePath = path.join(targetPath, REDUX_DIRECTORIES.STORE);

    if (await pathExists(storePath)) {
      logger.warn(`${CLI_MESSAGES.STORE_ALREADY_EXISTS} ${storePath}`);
      return;
    }

    spinner.start();

    const hooksPath = path.join(storePath, REDUX_DIRECTORIES.HOOKS);
    const slicesPath = path.join(storePath, REDUX_DIRECTORIES.SLICES);

    await ensureDir(storePath);
    await ensureDir(hooksPath);
    await ensureDir(slicesPath);

    await copyTemplate(
      path.join(templateConfig.templatesRoot, REDUX_DIRECTORIES.STORE, templateConfig.storeTemplate),
      path.join(storePath, templateConfig.storeOutput)
    );
    await copyTemplate(
      path.join(templateConfig.templatesRoot, REDUX_DIRECTORIES.HOOKS, templateConfig.hooksTemplate),
      path.join(hooksPath, templateConfig.hooksOutput)
    );
    await copyTemplate(
      path.join(templateConfig.templatesRoot, REDUX_DIRECTORIES.SLICES, templateConfig.sliceTemplate),
      path.join(slicesPath, templateConfig.sliceOutput)
    );

    spinner.succeed(CLI_MESSAGES.REDUX_SETUP_COMPLETE);
    await installDeps(REDUX_PACKAGES);
    logger.success(CLI_MESSAGES.REDUX_SETUP_COMPLETE);
    console.log(chalk.cyan(REDUX_NEXT_STEPS));
  } catch (error) {
    spinner.fail(CLI_MESSAGES.UNEXPECTED_ERROR);
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
    throw error;
  }
}
