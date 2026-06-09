// TanStack Query generator for adding server-state architecture.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import {
  CLI_MESSAGES,
  CLI_OPTIONS,
  LANGUAGES,
  TANSTACK_QUERY_DIRECTORIES,
  TANSTACK_QUERY_NEXT_STEPS,
  TANSTACK_QUERY_OUTPUT_FILES,
  TANSTACK_QUERY_PACKAGES,
  TANSTACK_QUERY_TEMPLATE_DIRECTORIES,
  TANSTACK_QUERY_TEMPLATE_FILES
} from '../constants/index.js';
import { copyTemplate, ensureDir, pathExists } from '../utils/fileUtils.js';
import { installDeps, showInstallerSpinner } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

/**
 * Builds TanStack Query template mappings for the detected language.
 *
 * @param {'typescript'|'javascript'} language Detected project language.
 * @returns {object[]} Template mappings.
 */
function createTanStackQueryMappings(language) {
  const isTypeScript = language === LANGUAGES.TYPESCRIPT;

  return [
    {
      directory: TANSTACK_QUERY_DIRECTORIES.CONFIG,
      template: isTypeScript
        ? TANSTACK_QUERY_TEMPLATE_FILES.QUERY_CLIENT_TS
        : TANSTACK_QUERY_TEMPLATE_FILES.QUERY_CLIENT_JS,
      output: isTypeScript
        ? TANSTACK_QUERY_OUTPUT_FILES.QUERY_CLIENT_TS
        : TANSTACK_QUERY_OUTPUT_FILES.QUERY_CLIENT_JS
    },
    {
      directory: TANSTACK_QUERY_DIRECTORIES.PROVIDERS,
      template: isTypeScript
        ? TANSTACK_QUERY_TEMPLATE_FILES.QUERY_PROVIDER_TS
        : TANSTACK_QUERY_TEMPLATE_FILES.QUERY_PROVIDER_JS,
      output: isTypeScript
        ? TANSTACK_QUERY_OUTPUT_FILES.QUERY_PROVIDER_TS
        : TANSTACK_QUERY_OUTPUT_FILES.QUERY_PROVIDER_JS
    },
    {
      directory: TANSTACK_QUERY_DIRECTORIES.HOOKS,
      template: isTypeScript
        ? TANSTACK_QUERY_TEMPLATE_FILES.EXAMPLE_QUERY_TS
        : TANSTACK_QUERY_TEMPLATE_FILES.EXAMPLE_QUERY_JS,
      output: isTypeScript
        ? TANSTACK_QUERY_OUTPUT_FILES.EXAMPLE_QUERY_TS
        : TANSTACK_QUERY_OUTPUT_FILES.EXAMPLE_QUERY_JS
    }
  ];
}

/**
 * Generates TanStack Query architecture and installs @tanstack/react-query.
 *
 * @param {string} targetPath Target src directory path.
 * @param {'typescript'|'javascript'} language Detected project language.
 * @param {object} [options] Generator behavior options.
 * @returns {Promise<void>}
 */
export async function generateTanStackQuerySetup(targetPath, language = LANGUAGES.JAVASCRIPT, options = {}) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.SETTING_UP_TANSTACK_QUERY);

  try {
    const templatesRoot = path.join(currentDirectory, '..', 'templates', TANSTACK_QUERY_TEMPLATE_DIRECTORIES[language]);

    await installDeps(TANSTACK_QUERY_PACKAGES, false, options);
    spinner.start();

    for (const mapping of createTanStackQueryMappings(language)) {
      const destinationDirectory = path.join(targetPath, mapping.directory);
      const destinationPath = path.join(destinationDirectory, mapping.output);
      const sourcePath = path.join(templatesRoot, mapping.template);

      if (!options[CLI_OPTIONS.DRY_RUN]) {
        await ensureDir(destinationDirectory);
      }

      if (await pathExists(destinationPath)) {
        spinner.stop();
        logger.warn(`${CLI_MESSAGES.TANSTACK_QUERY_FILE_EXISTS} ${destinationPath}`);
        spinner.start();
        continue;
      }

      if (options[CLI_OPTIONS.DRY_RUN]) {
        spinner.stop();
        logger.info(`${CLI_MESSAGES.DRY_RUN_WOULD_COPY} ${sourcePath} -> ${destinationPath}`);
        spinner.start();
        continue;
      }

      await copyTemplate(sourcePath, destinationPath);
    }

    spinner.succeed(CLI_MESSAGES.TANSTACK_QUERY_SETUP_COMPLETE);
    logger.success(CLI_MESSAGES.TANSTACK_QUERY_SETUP_COMPLETE);
    console.log(chalk.cyan(TANSTACK_QUERY_NEXT_STEPS));
  } catch (error) {
    spinner.fail(CLI_MESSAGES.UNEXPECTED_ERROR);
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
    throw error;
  }
}
