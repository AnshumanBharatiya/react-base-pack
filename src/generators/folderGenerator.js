// Folder architecture generator for injecting scalable React project directories.

import path from 'node:path';
import chalk from 'chalk';
import {
  CLI_MESSAGES,
  CLI_OPTIONS,
  FOLDER_STRUCTURE,
  FOLDER_TREE,
  GITKEEP_FILE,
  README_FILE
} from '../constants/index.js';
import { ensureDir, pathExists, writeFile } from '../utils/fileUtils.js';
import { showInstallerSpinner } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

/**
 * Generates the enterprise folder architecture inside a target src directory.
 *
 * @param {string} targetPath Target src directory path.
 * @param {object} [options] Generator behavior options.
 * @returns {Promise<void>}
 */
export async function generateFolderStructure(targetPath, options = {}) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.CREATING_FOLDER_ARCHITECTURE);

  try {
    const skippedPaths = [];

    spinner.start();

    if (!options[CLI_OPTIONS.DRY_RUN]) {
      await ensureDir(targetPath);
    }

    for (const folder of FOLDER_STRUCTURE) {
      const folderPath = path.join(targetPath, folder.name);
      const readmePath = path.join(folderPath, README_FILE);
      const gitkeepPath = path.join(folderPath, GITKEEP_FILE);
      const exists = await pathExists(folderPath);

      if (exists) {
        spinner.stop();
        logger.warn(`${CLI_MESSAGES.FOLDER_ALREADY_EXISTS} ${folder.name}`);
        skippedPaths.push(folderPath);
        spinner.start();
        continue;
      }

      if (options[CLI_OPTIONS.DRY_RUN]) {
        spinner.stop();
        logger.info(`${CLI_MESSAGES.DRY_RUN_WOULD_CREATE} ${folderPath}`);
        logger.info(`${CLI_MESSAGES.DRY_RUN_WOULD_CREATE} ${readmePath}`);
        logger.info(`${CLI_MESSAGES.DRY_RUN_WOULD_CREATE} ${gitkeepPath}`);
        spinner.start();
        continue;
      }

      await ensureDir(folderPath);
      await writeFile(readmePath, folder.readme);
      await writeFile(gitkeepPath, '');
    }

    spinner.succeed(CLI_MESSAGES.FOLDER_ARCHITECTURE_READY);
    if (skippedPaths.length > 0) {
      logger.warn(`${CLI_MESSAGES.CONFLICT_SUMMARY} ${skippedPaths.join(', ')}`);
    }

    logger.success(chalk.green(FOLDER_TREE));
  } catch (error) {
    spinner.fail(CLI_MESSAGES.UNEXPECTED_ERROR);
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
    throw error;
  }
}
