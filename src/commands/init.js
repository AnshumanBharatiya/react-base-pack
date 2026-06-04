// Init command handler for detecting React projects and collecting setup preferences.

import path from 'node:path';
import inquirer from 'inquirer';
import {
  ANSWER_KEYS,
  CLI_MESSAGES,
  CLI_OPTIONS,
  FEATURE_PROMPT_CHOICES,
  FEATURES,
  LANGUAGE_LABELS,
  PROJECT_TYPE_LABELS,
  PROMPTS,
  SETUP_FEATURES
} from '../constants/index.js';
import { runSetup } from './setup.js';
import { detectLanguage, detectProjectType } from '../utils/detector.js';
import { logger } from '../utils/logger.js';
import { showInstallerSpinner } from '../utils/installer.js';

/**
 * Runs the Phase 1 init command flow.
 *
 * @param {object} [options] CLI options from commander.
 * @returns {Promise<object|null>} Stored setup answers for later phases, or null when unsupported.
 */
export async function init(options = {}) {
  const spinner = showInstallerSpinner(CLI_MESSAGES.DETECTING_PROJECT);

  try {
    if (options[CLI_OPTIONS.DRY_RUN]) {
      logger.warn(CLI_MESSAGES.DRY_RUN_ACTIVE);
    }

    if (options[CLI_OPTIONS.YES]) {
      logger.info(CLI_MESSAGES.YES_MODE_ACTIVE);
    }

    spinner.start();
    const projectType = await detectProjectType();

    if (!projectType) {
      spinner.fail(CLI_MESSAGES.PROJECT_NOT_FOUND);
      logger.error(CLI_MESSAGES.PROJECT_NOT_FOUND);
      process.exitCode = 1;
      return null;
    }

    spinner.succeed(`${CLI_MESSAGES.PROJECT_DETECTED} ${PROJECT_TYPE_LABELS[projectType]}`);
    const language = await detectLanguage();
    logger.info(`${CLI_MESSAGES.LANGUAGE_DETECTED} ${LANGUAGE_LABELS[language]}`);

    const defaultProjectName = path.basename(process.cwd());
    const answers = options[CLI_OPTIONS.YES]
      ? {
        [ANSWER_KEYS.PROJECT_NAME]: defaultProjectName,
        [ANSWER_KEYS.FEATURES]: SETUP_FEATURES
      }
      : await inquirer.prompt([
        {
          type: 'input',
          name: ANSWER_KEYS.PROJECT_NAME,
          message: PROMPTS.PROJECT_NAME,
          default: defaultProjectName
        },
        {
          type: 'checkbox',
          name: ANSWER_KEYS.FEATURES,
          message: PROMPTS.FEATURES,
          choices: FEATURE_PROMPT_CHOICES,
          validate: (selectedFeatures) => {
            if (selectedFeatures.length > 0) {
              return true;
            }

            return CLI_MESSAGES.FEATURE_SELECTION_REQUIRED;
          },
          filter: (selectedFeatures) => {
            if (selectedFeatures.includes(FEATURES.ALL)) {
              return SETUP_FEATURES;
            }

            return selectedFeatures;
          }
        }
      ]);

    const phaseAnswers = {
      projectType,
      language,
      projectName: answers[ANSWER_KEYS.PROJECT_NAME],
      features: answers[ANSWER_KEYS.FEATURES]
    };

    await runSetup(phaseAnswers, projectType, language, options);
    logger.success(CLI_MESSAGES.SETUP_COMPLETE);
    return phaseAnswers;
  } catch (error) {
    spinner.fail(CLI_MESSAGES.UNEXPECTED_ERROR);
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
    return null;
  }
}
