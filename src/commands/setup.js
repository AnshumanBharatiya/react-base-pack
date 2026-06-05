// Setup command orchestrator for running selected react-base-pack feature generators.

import path from 'node:path';
import chalk from 'chalk';
import {
  ANSWER_KEYS,
  CLI_MESSAGES,
  CLI_OPTIONS,
  FEATURES,
  LANGUAGES,
  SOURCE_DIRECTORY
} from '../constants/index.js';
import { generateAxiosSetup } from '../generators/axiosGenerator.js';
import { generateFolderStructure } from '../generators/folderGenerator.js';
import { generateJWTSetup } from '../generators/jwtGenerator.js';
import { generateReduxSetup } from '../generators/reduxGenerator.js';
import { generateRouterSetup } from '../generators/routerGenerator.js';
import { generateZustandSetup } from '../generators/zustandGenerator.js';
import { showInstallerSpinner } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

/**
 * Runs setup steps for the selected features.
 *
 * @param {object} answers Answers collected from the init command.
 * @param {string} projectType Detected project type.
 * @param {'typescript'|'javascript'} language Detected project language.
 * @param {object} [options] Setup behavior options.
 * @returns {Promise<void>}
 */
export async function runSetup(answers, projectType, language = LANGUAGES.JAVASCRIPT, options = {}) {
  try {
    const selectedFeatures = answers[ANSWER_KEYS.FEATURES] || [];
    const targetPath = path.join(process.cwd(), SOURCE_DIRECTORY);

    if (options[CLI_OPTIONS.DRY_RUN]) {
      logger.warn(CLI_MESSAGES.DRY_RUN_ACTIVE);
    }

    if (selectedFeatures.includes(FEATURES.FOLDER_ARCHITECTURE)) {
      await generateFolderStructure(targetPath, options);
    }

    if (selectedFeatures.includes(FEATURES.STATE_MANAGEMENT) || selectedFeatures.includes(FEATURES.REDUX_TOOLKIT)) {
      const stateManagement = answers[ANSWER_KEYS.STATE_MANAGEMENT] || FEATURES.REDUX_TOOLKIT;

      if (stateManagement === FEATURES.ZUSTAND) {
        await generateZustandSetup(targetPath, language, options);
      } else {
        await generateReduxSetup(targetPath, language, options);
      }
    }

    if (selectedFeatures.includes(FEATURES.AXIOS_SETUP)) {
      await generateAxiosSetup(targetPath, projectType, language, options);
    }

    if (selectedFeatures.includes(FEATURES.JWT_AUTH)) {
      await generateJWTSetup(targetPath, language, options);
    }

    if (selectedFeatures.includes(FEATURES.REACT_ROUTER)) {
      await generateRouterSetup(targetPath, language, options);
    }

    selectedFeatures
      .filter((feature) => ![
        FEATURES.FOLDER_ARCHITECTURE,
        FEATURES.STATE_MANAGEMENT,
        FEATURES.REDUX_TOOLKIT,
        FEATURES.ZUSTAND,
        FEATURES.AXIOS_SETUP,
        FEATURES.JWT_AUTH,
        FEATURES.REACT_ROUTER
      ].includes(feature))
      .forEach((feature) => {
        const spinner = showInstallerSpinner(`${CLI_MESSAGES.FEATURE_COMING_SOON} ${feature}`);

        spinner.start();
        spinner.succeed(`${CLI_MESSAGES.FEATURE_COMING_SOON} ${feature} for ${projectType}`);
      });

    logger.success(`${CLI_MESSAGES.SETUP_SUMMARY} ${selectedFeatures.join(', ')}`);
    console.log(chalk.cyan(`${projectType} / ${language}`));
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
  }
}
