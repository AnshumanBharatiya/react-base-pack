// Redux Toolkit generator for injecting store, hooks, slices, and dependencies.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import {
  CLI_MESSAGES,
  REDUX_DIRECTORIES,
  REDUX_NEXT_STEPS,
  REDUX_OUTPUT_FILES,
  REDUX_PACKAGES,
  REDUX_TEMPLATE_DIRECTORY,
  REDUX_TEMPLATE_FILES
} from '../constants/index.js';
import { copyTemplate, ensureDir, pathExists } from '../utils/fileUtils.js';
import { installDeps, showInstallerSpinner } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const templatesRoot = path.join(currentDirectory, '..', 'templates', REDUX_TEMPLATE_DIRECTORY);

/**
 * Generates Redux Toolkit store architecture and installs Redux dependencies.
 *
 * @param {string} targetPath Target src directory path.
 * @returns {Promise<void>}
 */
export async function generateReduxSetup(targetPath) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.SETTING_UP_REDUX);

  try {
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
      path.join(templatesRoot, REDUX_DIRECTORIES.STORE, REDUX_TEMPLATE_FILES.STORE),
      path.join(storePath, REDUX_OUTPUT_FILES.STORE)
    );
    await copyTemplate(
      path.join(templatesRoot, REDUX_DIRECTORIES.HOOKS, REDUX_TEMPLATE_FILES.HOOKS),
      path.join(hooksPath, REDUX_OUTPUT_FILES.HOOKS)
    );
    await copyTemplate(
      path.join(templatesRoot, REDUX_DIRECTORIES.SLICES, REDUX_TEMPLATE_FILES.SLICE),
      path.join(slicesPath, REDUX_OUTPUT_FILES.SLICE)
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
