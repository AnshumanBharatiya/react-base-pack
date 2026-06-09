// Environment config generator for adding centralized runtime settings.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import {
  CLI_MESSAGES,
  CLI_OPTIONS,
  ENV_EXAMPLE_FILE,
  ENV_NEXT_STEPS,
  ENV_OUTPUT_FILES,
  ENV_TEMPLATE_DIRECTORIES,
  ENV_TEMPLATE_FILES,
  JWT_DIRECTORIES,
  LANGUAGES
} from '../constants/index.js';
import { copyTemplate, ensureDir, pathExists } from '../utils/fileUtils.js';
import { showInstallerSpinner } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

/**
 * Generates environment config helpers and a .env.example file.
 *
 * @param {string} targetPath Target src directory path.
 * @param {'typescript'|'javascript'} language Detected project language.
 * @param {object} [options] Generator behavior options.
 * @returns {Promise<void>}
 */
export async function generateEnvSetup(targetPath, language = LANGUAGES.JAVASCRIPT, options = {}) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.SETTING_UP_ENV_CONFIG);

  try {
    const templatesRoot = path.join(currentDirectory, '..', 'templates', ENV_TEMPLATE_DIRECTORIES[language]);
    const configPath = path.join(targetPath, JWT_DIRECTORIES.CONFIG);
    const envConfigPath = path.join(configPath, ENV_OUTPUT_FILES[language]);
    const envExamplePath = path.join(process.cwd(), ENV_EXAMPLE_FILE);
    const mappings = [
      {
        source: path.join(templatesRoot, ENV_TEMPLATE_FILES.EXAMPLE),
        destination: envExamplePath
      },
      {
        source: path.join(templatesRoot, ENV_TEMPLATE_FILES[language]),
        destination: envConfigPath
      }
    ];

    spinner.start();

    if (!options[CLI_OPTIONS.DRY_RUN]) {
      await ensureDir(configPath);
    }

    for (const mapping of mappings) {
      if (await pathExists(mapping.destination)) {
        spinner.stop();
        logger.warn(`${CLI_MESSAGES.ENV_CONFIG_FILE_EXISTS} ${mapping.destination}`);
        spinner.start();
        continue;
      }

      if (options[CLI_OPTIONS.DRY_RUN]) {
        spinner.stop();
        logger.info(`${CLI_MESSAGES.DRY_RUN_WOULD_COPY} ${mapping.source} -> ${mapping.destination}`);
        spinner.start();
        continue;
      }

      await copyTemplate(mapping.source, mapping.destination);
    }

    spinner.succeed(CLI_MESSAGES.ENV_CONFIG_SETUP_COMPLETE);
    logger.success(CLI_MESSAGES.ENV_CONFIG_SETUP_COMPLETE);
    console.log(chalk.cyan(ENV_NEXT_STEPS));
  } catch (error) {
    spinner.fail(CLI_MESSAGES.UNEXPECTED_ERROR);
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
    throw error;
  }
}
