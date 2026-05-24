// Project detector for identifying supported React tooling in the current working directory.

import path from 'node:path';
import { PACKAGE_FIELDS, PACKAGE_MANIFEST, PROJECT_TYPES } from '../constants/index.js';
import { readJSON } from './fileUtils.js';
import { logger } from './logger.js';

/**
 * Detects whether the current working directory is a supported React project.
 *
 * @returns {Promise<'vite'|'cra'|'next'|null>} The detected project type, or null when unsupported.
 */
export async function detectProjectType() {
  try {
    const manifestPath = path.join(process.cwd(), PACKAGE_MANIFEST);
    const manifest = await readJSON(manifestPath);
    const dependencies = manifest[PACKAGE_FIELDS.DEPENDENCIES] || {};
    const devDependencies = manifest[PACKAGE_FIELDS.DEV_DEPENDENCIES] || {};

    if (devDependencies[PACKAGE_FIELDS.VITE]) {
      return PROJECT_TYPES.VITE;
    }

    if (dependencies[PACKAGE_FIELDS.REACT_SCRIPTS]) {
      return PROJECT_TYPES.CRA;
    }

    if (dependencies[PACKAGE_FIELDS.NEXT]) {
      return PROJECT_TYPES.NEXT;
    }

    return null;
  } catch (error) {
    logger.error(error.message);
    return null;
  }
}
