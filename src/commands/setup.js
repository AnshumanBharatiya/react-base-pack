// Setup command orchestrator for running selected react-base-pack feature generators.

import path from 'node:path';
import { ANSWER_KEYS, CLI_MESSAGES, FEATURES, SOURCE_DIRECTORY } from '../constants/index.js';
import { generateFolderStructure } from '../generators/folderGenerator.js';
import { generateReduxSetup } from '../generators/reduxGenerator.js';
import { showInstallerSpinner } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

/**
 * Runs setup steps for the selected features.
 *
 * @param {object} answers Answers collected from the init command.
 * @param {string} projectType Detected project type.
 * @returns {Promise<void>}
 */
export async function runSetup(answers, projectType) {
  try {
    const selectedFeatures = answers[ANSWER_KEYS.FEATURES] || [];

    if (selectedFeatures.includes(FEATURES.FOLDER_ARCHITECTURE)) {
      const targetPath = path.join(process.cwd(), SOURCE_DIRECTORY);
      await generateFolderStructure(targetPath);
    }

    if (selectedFeatures.includes(FEATURES.REDUX_TOOLKIT)) {
      const targetPath = path.join(process.cwd(), SOURCE_DIRECTORY);
      await generateReduxSetup(targetPath);
    }

    selectedFeatures
      .filter((feature) => ![FEATURES.FOLDER_ARCHITECTURE, FEATURES.REDUX_TOOLKIT].includes(feature))
      .forEach((feature) => {
        const spinner = showInstallerSpinner(`${CLI_MESSAGES.FEATURE_COMING_SOON} ${feature}`);

        spinner.start();
        spinner.succeed(`${CLI_MESSAGES.FEATURE_COMING_SOON} ${feature} for ${projectType}`);
      });
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
  }
}
