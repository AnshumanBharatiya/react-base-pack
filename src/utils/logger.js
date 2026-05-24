// Chalk-based logger utility for consistent CLI output.

import chalk from 'chalk';
import { BANNER_TEXT } from '../constants/index.js';

/**
 * Writes a blue informational message.
 *
 * @param {string} msg Message to display.
 * @returns {void}
 */
function info(msg) {
  try {
    console.log(chalk.blue(msg));
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Writes a green success message.
 *
 * @param {string} msg Message to display.
 * @returns {void}
 */
function success(msg) {
  try {
    console.log(chalk.green(msg));
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Writes a yellow warning message.
 *
 * @param {string} msg Message to display.
 * @returns {void}
 */
function warn(msg) {
  try {
    console.warn(chalk.yellow(msg));
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Writes a red error message.
 *
 * @param {string} msg Message to display.
 * @returns {void}
 */
function error(msg) {
  try {
    console.error(chalk.red(msg));
  } catch (caughtError) {
    console.error(caughtError.message);
  }
}

/**
 * Writes the styled CLI banner.
 *
 * @returns {void}
 */
function banner() {
  try {
    console.log(chalk.cyan.bold(BANNER_TEXT));
  } catch (caughtError) {
    console.error(caughtError.message);
  }
}

export const logger = {
  info,
  success,
  warn,
  error,
  banner
};
