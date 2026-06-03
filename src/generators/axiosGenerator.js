// Axios generator for injecting a configured axios instance with auth interceptors.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import {
  AXIOS_LATEST_PACKAGE,
  AXIOS_NEXT_STEPS,
  AXIOS_OUTPUT_FILES,
  AXIOS_TEMPLATE_DIRECTORIES,
  AXIOS_TEMPLATE_FILES,
  CLI_MESSAGES,
  JWT_DIRECTORIES,
  LANGUAGES,
  PACKAGE_FIELDS,
  PACKAGE_MANIFEST
} from '../constants/index.js';
import { copyTemplate, ensureDir, pathExists, readJSON } from '../utils/fileUtils.js';
import { installDeps, showInstallerSpinner } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

/**
 * Checks whether axios is declared in the user's project.
 *
 * @returns {Promise<boolean>} True when axios exists in dependencies or devDependencies.
 */
async function hasAxiosDependency() {
  try {
    const manifest = await readJSON(path.join(process.cwd(), PACKAGE_MANIFEST));
    const dependencies = manifest[PACKAGE_FIELDS.DEPENDENCIES] || {};
    const devDependencies = manifest[PACKAGE_FIELDS.DEV_DEPENDENCIES] || {};

    return Boolean(dependencies[PACKAGE_FIELDS.AXIOS] || devDependencies[PACKAGE_FIELDS.AXIOS]);
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    return false;
  }
}

/**
 * Generates an axios instance with request and response interceptors.
 *
 * @param {string} targetPath Target src directory path.
 * @param {string} projectType Detected project type.
 * @param {'typescript'|'javascript'} language Detected project language.
 * @returns {Promise<void>}
 */
export async function generateAxiosSetup(targetPath, projectType, language = LANGUAGES.JAVASCRIPT) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.SETTING_UP_AXIOS);

  try {
    const configPath = path.join(targetPath, JWT_DIRECTORIES.CONFIG);
    const outputFile = AXIOS_OUTPUT_FILES[language];
    const destinationPath = path.join(configPath, outputFile);

    if (await pathExists(destinationPath)) {
      logger.warn(`${CLI_MESSAGES.AXIOS_INSTANCE_EXISTS} ${destinationPath}`);
      return;
    }

    if (!(await hasAxiosDependency())) {
      await installDeps([AXIOS_LATEST_PACKAGE]);
    }

    spinner.start();
    await ensureDir(configPath);

    await copyTemplate(
      path.join(
        currentDirectory,
        '..',
        'templates',
        AXIOS_TEMPLATE_DIRECTORIES[language],
        AXIOS_TEMPLATE_FILES[language]
      ),
      destinationPath
    );

    spinner.succeed(`${CLI_MESSAGES.AXIOS_SETUP_COMPLETE} ${projectType}`);
    logger.success(CLI_MESSAGES.AXIOS_SETUP_COMPLETE);
    console.log(chalk.cyan(AXIOS_NEXT_STEPS));
  } catch (error) {
    spinner.fail(CLI_MESSAGES.UNEXPECTED_ERROR);
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
    throw error;
  }
}
