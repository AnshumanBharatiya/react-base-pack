// JWT Auth generator for injecting authentication services, context, hooks, and guards.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import inquirer from 'inquirer';
import {
  AXIOS_LATEST_PACKAGE,
  CLI_MESSAGES,
  JWT_AUTH_CLIENT_PROMPT,
  JWT_AUTH_CLIENTS,
  JWT_DIRECTORIES,
  JWT_NEXT_STEPS,
  JWT_OUTPUT_FILES,
  JWT_TEMPLATE_DIRECTORY,
  JWT_TEMPLATE_FILES,
  JWT_TEMPLATE_MAPPINGS,
  PACKAGE_FIELDS,
  PACKAGE_MANIFEST
} from '../constants/index.js';
import { copyTemplate, ensureDir, pathExists, readJSON } from '../utils/fileUtils.js';
import { installDeps, showInstallerSpinner } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const templatesRoot = path.join(currentDirectory, '..', 'templates', JWT_TEMPLATE_DIRECTORY);

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
 * Resolves which HTTP client the JWT auth service should use.
 *
 * @returns {Promise<'axios'|'fetch'>} Selected auth client.
 */
async function resolveAuthClient() {
  try {
    if (await hasAxiosDependency()) {
      logger.info(CLI_MESSAGES.AXIOS_FOUND);
      return JWT_AUTH_CLIENTS.AXIOS;
    }

    logger.warn(CLI_MESSAGES.AXIOS_NOT_FOUND);
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: JWT_AUTH_CLIENT_PROMPT.NAME,
        message: JWT_AUTH_CLIENT_PROMPT.MESSAGE,
        choices: JWT_AUTH_CLIENT_PROMPT.CHOICES,
        default: JWT_AUTH_CLIENTS.AXIOS
      }
    ]);

    if (answer[JWT_AUTH_CLIENT_PROMPT.NAME] === JWT_AUTH_CLIENTS.AXIOS) {
      logger.info(CLI_MESSAGES.AXIOS_INSTALL_SELECTED);
      await installDeps([AXIOS_LATEST_PACKAGE]);
      return JWT_AUTH_CLIENTS.AXIOS;
    }

    logger.info(CLI_MESSAGES.FETCH_AUTH_SELECTED);
    return JWT_AUTH_CLIENTS.FETCH;
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    throw error;
  }
}

/**
 * Creates the auth-service template mapping for the selected HTTP client.
 *
 * @param {'axios'|'fetch'} authClient Selected auth client.
 * @returns {object} Template mapping for authService.js.
 */
function createAuthServiceMapping(authClient) {
  return {
    directory: JWT_DIRECTORIES.SERVICES,
    template: authClient === JWT_AUTH_CLIENTS.AXIOS
      ? JWT_TEMPLATE_FILES.AUTH_SERVICE_AXIOS
      : JWT_TEMPLATE_FILES.AUTH_SERVICE_FETCH,
    output: JWT_OUTPUT_FILES.AUTH_SERVICE
  };
}

/**
 * Generates JWT authentication architecture files inside a target src directory.
 *
 * @param {string} targetPath Target src directory path.
 * @returns {Promise<void>}
 */
export async function generateJWTSetup(targetPath) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.SETTING_UP_JWT);

  try {
    const authClient = await resolveAuthClient();
    const templateMappings = [
      createAuthServiceMapping(authClient),
      ...JWT_TEMPLATE_MAPPINGS
    ];

    spinner.start();
    await ensureDir(targetPath);

    for (const mapping of templateMappings) {
      const destinationDirectory = path.join(targetPath, mapping.directory);
      const destinationPath = path.join(destinationDirectory, mapping.output);
      const templatePath = path.join(templatesRoot, mapping.directory, mapping.template);

      await ensureDir(destinationDirectory);

      if (await pathExists(destinationPath)) {
        spinner.stop();
        logger.warn(`${CLI_MESSAGES.JWT_FILE_EXISTS} ${destinationPath}`);
        spinner.start();
        continue;
      }

      await copyTemplate(templatePath, destinationPath);
    }

    spinner.succeed(CLI_MESSAGES.JWT_SETUP_COMPLETE);

    logger.success(CLI_MESSAGES.JWT_SETUP_COMPLETE);
    console.log(chalk.cyan(JWT_NEXT_STEPS));
  } catch (error) {
    spinner.fail(CLI_MESSAGES.UNEXPECTED_ERROR);
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
    throw error;
  }
}
