// Dependency installation helpers for future setup phases.

import path from 'node:path';
import ora from 'ora';
import { execa } from 'execa';
import {
  CLI_MESSAGES,
  LOCK_FILES,
  PACKAGE_MANAGER_INSTALL_CONFIG,
  PACKAGE_MANAGERS,
  PLATFORM
} from '../constants/index.js';
import { pathExists } from './fileUtils.js';
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
 * Detects the package manager used by the current project.
 *
 * @param {string} [targetPath=process.cwd()] Project root path.
 * @returns {Promise<'npm'|'yarn'|'pnpm'>} Detected package manager.
 */
export async function detectPackageManager(targetPath = process.cwd()) {
  try {
    if (await pathExists(path.join(targetPath, LOCK_FILES[PACKAGE_MANAGERS.PNPM]))) {
      return PACKAGE_MANAGERS.PNPM;
    }

    if (await pathExists(path.join(targetPath, LOCK_FILES[PACKAGE_MANAGERS.YARN]))) {
      return PACKAGE_MANAGERS.YARN;
    }

    return PACKAGE_MANAGERS.NPM;
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    return PACKAGE_MANAGERS.NPM;
  }
}

/**
 * Installs dependencies in the current working directory.
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
    const packageManager = await detectPackageManager();
    const installConfig = PACKAGE_MANAGER_INSTALL_CONFIG[packageManager];
    const command = process.platform === PLATFORM.WINDOWS ? installConfig.windowsCommand : installConfig.command;
    const args = [...installConfig.installArgs, ...packages];

    if (isDev) {
      args.push(installConfig.devArg);
    }

    await execa(command, args, {
      cwd: process.cwd(),
      stdio: 'ignore'
    });

    spinner.succeed(CLI_MESSAGES.DEPENDENCIES_INSTALLED);
  } catch (error) {
    spinner.fail(CLI_MESSAGES.INSTALL_FAILED);
    logger.error(error.message || CLI_MESSAGES.INSTALL_FAILED);
    throw error;
  }
}
