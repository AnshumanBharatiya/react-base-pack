// Project detector for identifying supported React tooling in the current working directory.

import path from 'node:path';
import { LANGUAGES, PACKAGE_FIELDS, PACKAGE_MANIFEST, PROJECT_TYPES, TSCONFIG_FILE } from '../constants/index.js';
import { pathExists, readJSON } from './fileUtils.js';
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

/**
 * Detects whether the current working directory uses TypeScript or JavaScript.
 *
 * @param {string} [cwd=process.cwd()] Project root path.
 * @returns {Promise<'typescript'|'javascript'>} Detected project language.
 */
export async function detectLanguage(cwd = process.cwd()) {
  try {
    const manifestPath = path.join(cwd, PACKAGE_MANIFEST);
    const manifest = await readJSON(manifestPath);
    const dependencies = manifest[PACKAGE_FIELDS.DEPENDENCIES] || {};
    const devDependencies = manifest[PACKAGE_FIELDS.DEV_DEPENDENCIES] || {};
    const hasTsConfig = await pathExists(path.join(cwd, TSCONFIG_FILE));
    const hasTypeScriptDependency = Boolean(
      dependencies[PACKAGE_FIELDS.TYPESCRIPT] || devDependencies[PACKAGE_FIELDS.TYPESCRIPT]
    );

    if (hasTsConfig || hasTypeScriptDependency) {
      return LANGUAGES.TYPESCRIPT;
    }

    return LANGUAGES.JAVASCRIPT;
  } catch (error) {
    logger.error(error.message);
    return LANGUAGES.JAVASCRIPT;
  }
}
