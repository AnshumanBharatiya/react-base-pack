// Folder architecture generator for injecting scalable React project directories.

import path from 'node:path';
import chalk from 'chalk';
import {
  CLI_MESSAGES,
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
 * @returns {Promise<void>}
 */
export async function generateFolderStructure(targetPath) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.CREATING_FOLDER_ARCHITECTURE);

  try {
    spinner.start();
    await ensureDir(targetPath);

    for (const folder of FOLDER_STRUCTURE) {
      const folderPath = path.join(targetPath, folder.name);
      const readmePath = path.join(folderPath, README_FILE);
      const gitkeepPath = path.join(folderPath, GITKEEP_FILE);
      const exists = await pathExists(folderPath);

      if (exists) {
        spinner.stop();
        logger.warn(`${CLI_MESSAGES.FOLDER_ALREADY_EXISTS} ${folder.name}`);
        spinner.start();
        continue;
      }

      await ensureDir(folderPath);
      await writeFile(readmePath, folder.readme);
      await writeFile(gitkeepPath, '');
    }

    spinner.succeed(CLI_MESSAGES.FOLDER_ARCHITECTURE_READY);
    logger.success(chalk.green(FOLDER_TREE));
  } catch (error) {
    spinner.fail(CLI_MESSAGES.UNEXPECTED_ERROR);
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
    throw error;
  }
}
