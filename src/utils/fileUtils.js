// File-system helper utilities backed by fs-extra.

import fs from 'fs-extra';
import { CLI_MESSAGES } from '../constants/index.js';
import { logger } from './logger.js';

/**
 * Ensures that a directory exists.
 *
 * @param {string} targetPath Directory path to create when missing.
 * @returns {Promise<void>}
 */
export async function ensureDir(targetPath) {
  try {
    await fs.ensureDir(targetPath);
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    throw error;
  }
}

/**
 * Writes content to a file.
 *
 * @param {string} targetPath File path to write.
 * @param {string|Buffer} content File content.
 * @returns {Promise<void>}
 */
export async function writeFile(targetPath, content) {
  try {
    await fs.outputFile(targetPath, content);
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    throw error;
  }
}

/**
 * Copies a template file or directory to a destination.
 *
 * @param {string} sourcePath Template source path.
 * @param {string} destinationPath Destination path.
 * @returns {Promise<void>}
 */
export async function copyTemplate(sourcePath, destinationPath) {
  try {
    await fs.copy(sourcePath, destinationPath);
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    throw error;
  }
}

/**
 * Checks whether a path exists.
 *
 * @param {string} targetPath Path to check.
 * @returns {Promise<boolean>} True when the path exists.
 */
export async function pathExists(targetPath) {
  try {
    return await fs.pathExists(targetPath);
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    throw error;
  }
}

/**
 * Reads and parses a JSON file.
 *
 * @param {string} targetPath JSON file path.
 * @returns {Promise<object>} Parsed JSON content.
 */
export async function readJSON(targetPath) {
  try {
    return await fs.readJson(targetPath);
  } catch (error) {
    logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
    throw error;
  }
}
