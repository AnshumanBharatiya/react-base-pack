// Init command handler for detecting React projects and collecting setup preferences.

import path from 'node:path';
import inquirer from 'inquirer';
import {
  ANSWER_KEYS,
  CLI_MESSAGES,
  FEATURE_CHOICES,
  PROJECT_TYPE_LABELS,
  PROMPTS
} from '../constants/index.js';
import { detectProjectType } from '../utils/detector.js';
import { logger } from '../utils/logger.js';
import { showInstallerSpinner } from '../utils/installer.js';

/**
 * Runs the Phase 1 init command flow.
 *
 * @returns {Promise<object|null>} Stored setup answers for later phases, or null when unsupported.
 */
export async function init() {
  const spinner = showInstallerSpinner(CLI_MESSAGES.DETECTING_PROJECT);

  try {
    spinner.start();
    const projectType = await detectProjectType();

    if (!projectType) {
      spinner.fail(CLI_MESSAGES.PROJECT_NOT_FOUND);
      logger.error(CLI_MESSAGES.PROJECT_NOT_FOUND);
      process.exitCode = 1;
      return null;
    }

    spinner.succeed(`${CLI_MESSAGES.PROJECT_DETECTED} ${PROJECT_TYPE_LABELS[projectType]}`);

    const defaultProjectName = path.basename(process.cwd());
    const answers = await inquirer.prompt([
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
        choices: FEATURE_CHOICES
      }
    ]);

    const phaseAnswers = {
      projectType,
      projectName: answers[ANSWER_KEYS.PROJECT_NAME],
      features: answers[ANSWER_KEYS.FEATURES]
    };

    logger.success(CLI_MESSAGES.FOUNDATION_READY);
    return phaseAnswers;
  } catch (error) {
    spinner.fail(CLI_MESSAGES.UNEXPECTED_ERROR);
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    process.exitCode = 1;
    return null;
  }
}
