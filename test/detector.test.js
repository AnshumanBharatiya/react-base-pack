// Tests project and language detection against temporary package manifests.

import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { LANGUAGES, PROJECT_TYPES } from '../src/constants/index.js';
import { detectLanguage, detectProjectType } from '../src/utils/detector.js';

async function withTempProject(manifest, callback) {
  const originalCwd = process.cwd();
  const projectPath = await mkdtemp(path.join(tmpdir(), 'react-base-pack-detector-'));

  try {
    await writeFile(path.join(projectPath, 'package.json'), JSON.stringify(manifest, null, 2));
    process.chdir(projectPath);
    await callback(projectPath);
  } finally {
    process.chdir(originalCwd);
    await rm(projectPath, { recursive: true, force: true });
  }
}

test('detectProjectType detects Vite projects', async () => {
  await withTempProject(
    {
      dependencies: { react: '^19.0.0' },
      devDependencies: { vite: '^8.0.0' }
    },
    async () => {
      assert.equal(await detectProjectType(), PROJECT_TYPES.VITE);
    }
  );
});

test('detectProjectType returns null for unsupported projects', async () => {
  await withTempProject(
    {
      dependencies: {},
      devDependencies: {}
    },
    async () => {
      assert.equal(await detectProjectType(), null);
    }
  );
});

test('detectLanguage detects TypeScript by tsconfig', async () => {
  await withTempProject(
    {
      dependencies: {},
      devDependencies: {}
    },
    async (projectPath) => {
      await writeFile(path.join(projectPath, 'tsconfig.json'), '{}');
      assert.equal(await detectLanguage(projectPath), LANGUAGES.TYPESCRIPT);
    }
  );
});
