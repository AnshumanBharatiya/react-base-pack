// Zustand generator for injecting a lightweight state store and dependency.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import {
  CLI_MESSAGES,
  CLI_OPTIONS,
  LANGUAGES,
  REDUX_DIRECTORIES,
  ZUSTAND_NEXT_STEPS,
  ZUSTAND_OUTPUT_FILES,
  ZUSTAND_PACKAGES,
  ZUSTAND_TEMPLATE_DIRECTORIES,
  ZUSTAND_TEMPLATE_FILES
} from '../constants/index.js';
import { copyTemplate, ensureDir, pathExists } from '../utils/fileUtils.js';
import { installDeps, showInstallerSpinner } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

/**
 * Generates a Zustand store and installs Zustand.
 *
 * @param {string} targetPath Target src directory path.
 * @param {'typescript'|'javascript'} language Detected project language.
 * @param {object} [options] Generator behavior options.
 * @returns {Promise<void>}
 */
export async function generateZustandSetup(targetPath, language = LANGUAGES.JAVASCRIPT, options = {}) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.SETTING_UP_ZUSTAND);

  try {
    const storePath = path.join(targetPath, REDUX_DIRECTORIES.STORE);
    const outputFile = ZUSTAND_OUTPUT_FILES[language];
    const destinationPath = path.join(storePath, outputFile);

    if (await pathExists(destinationPath)) {
      logger.warn(`${CLI_MESSAGES.ZUSTAND_STORE_EXISTS} ${destinationPath}`);
      return;
    }

    if (options[CLI_OPTIONS.DRY_RUN]) {
      logger.info(`${CLI_MESSAGES.DRY_RUN_WOULD_CREATE} ${storePath}`);
      logger.info(`${CLI_MESSAGES.DRY_RUN_WOULD_COPY} ${destinationPath}`);
      await installDeps(ZUSTAND_PACKAGES, false, options);
      console.log(chalk.cyan(ZUSTAND_NEXT_STEPS));
      return;
    }

    spinner.start();
    await ensureDir(storePath);
    await copyTemplate(
      path.join(
        currentDirectory,
        '..',
        'templates',
        ZUSTAND_TEMPLATE_DIRECTORIES[language],
        ZUSTAND_TEMPLATE_FILES[language]
      ),
      destinationPath
    );

    spinner.succeed(CLI_MESSAGES.ZUSTAND_SETUP_COMPLETE);
    await installDeps(ZUSTAND_PACKAGES, false, options);
    logger.success(CLI_MESSAGES.ZUSTAND_SETUP_COMPLETE);
    console.log(chalk.cyan(ZUSTAND_NEXT_STEPS));
  } catch (error) {
    spinner.fail(CLI_MESSAGES.UNEXPECTED_ERROR);
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
    throw error;
  }
}
