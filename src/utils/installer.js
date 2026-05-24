// Dependency installation helpers for future setup phases.

import ora from 'ora';
import { execa } from 'execa';
import { CLI_MESSAGES, NPM_COMMANDS } from '../constants/index.js';
import { logger } from './logger.js';

/**
 * Creates an ora spinner with a consistent label.
 *
 * @param {string} label Spinner label.
 * @returns {import('ora').Ora} Ora spinner instance.
 */
export function showInstallerSpinner(label) {
  try {
    return ora(label);
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    throw error;
  }
}

/**
 * Installs npm dependencies in the current working directory.
 *
 * @param {string[]} packages Package names to install.
 * @param {boolean} [isDev=false] Whether packages should be installed as dev dependencies.
 * @returns {Promise<void>}
 */
export async function installDeps(packages, isDev = false) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.INSTALLING_DEPENDENCIES);

  try {
    if (!Array.isArray(packages) || packages.length === 0) {
      logger.warn(CLI_MESSAGES.NO_PACKAGES_PROVIDED);
      return;
    }

    spinner.start();
    const args = [NPM_COMMANDS.INSTALL, ...packages];

    if (isDev) {
      args.push(NPM_COMMANDS.SAVE_DEV);
    }

    await execa('npm', args, {
      cwd: process.cwd(),
      stdio: 'ignore'
    });

    spinner.succeed(CLI_MESSAGES.INSTALLING_DEPENDENCIES);
  } catch (error) {
    spinner.fail(CLI_MESSAGES.INSTALL_FAILED);
    logger.error(error.message || CLI_MESSAGES.INSTALL_FAILED);
    throw error;
  }
}
