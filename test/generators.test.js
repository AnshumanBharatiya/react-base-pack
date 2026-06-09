// Tests generator safety behavior without installing dependencies.

import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { generateFolderStructure } from '../src/generators/folderGenerator.js';
import { runSetup } from '../src/commands/setup.js';
import {
  ANSWER_KEYS,
  CLI_OPTIONS,
  FEATURES,
  LANGUAGES,
  PROJECT_TYPES
} from '../src/constants/index.js';
import { pathExists } from '../src/utils/fileUtils.js';

async function withTempProject(callback) {
  const originalCwd = process.cwd();
  const projectPath = await mkdtemp(path.join(tmpdir(), 'react-base-pack-generator-'));

  try {
    await writeFile(
      path.join(projectPath, 'package.json'),
      JSON.stringify(
        {
          dependencies: { react: '^19.0.0' },
          devDependencies: { vite: '^8.0.0' }
        },
        null,
        2
      )
    );
    process.chdir(projectPath);
    await callback(projectPath);
  } finally {
    process.chdir(originalCwd);
    await rm(projectPath, { recursive: true, force: true });
  }
}

test('generateFolderStructure creates architecture folders and README files', async () => {
  await withTempProject(async (projectPath) => {
    const sourcePath = path.join(projectPath, 'src');

    await generateFolderStructure(sourcePath);

    assert.equal(await pathExists(path.join(sourcePath, 'components')), true);
    assert.equal(await pathExists(path.join(sourcePath, 'components', 'README.md')), true);
    assert.match(
      await readFile(path.join(sourcePath, 'components', 'README.md'), 'utf8'),
      /reusable UI components/
    );
  });
});

test('runSetup dry-run does not create files or install dependencies', async () => {
  await withTempProject(async (projectPath) => {
    await runSetup(
      {
        [ANSWER_KEYS.FEATURES]: [
          FEATURES.FOLDER_ARCHITECTURE,
          FEATURES.STATE_MANAGEMENT,
          FEATURES.ENV_CONFIG,
          FEATURES.TANSTACK_QUERY,
          FEATURES.AXIOS_SETUP,
          FEATURES.JWT_AUTH,
          FEATURES.REACT_ROUTER
        ],
        [ANSWER_KEYS.STATE_MANAGEMENT]: FEATURES.ZUSTAND
      },
      PROJECT_TYPES.VITE,
      LANGUAGES.JAVASCRIPT,
      {
        [CLI_OPTIONS.DRY_RUN]: true,
        [CLI_OPTIONS.YES]: true
      }
    );

    assert.equal(await pathExists(path.join(projectPath, 'src')), false);
    assert.equal(await pathExists(path.join(projectPath, 'node_modules')), false);
  });
});
