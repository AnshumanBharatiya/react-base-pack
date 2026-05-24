#!/usr/bin/env node
// CLI entry point for react-base-pack.

import { Command } from 'commander';
import { init } from '../src/commands/init.js';
import {
  CLI_MESSAGES,
  COMMAND_DESCRIPTIONS,
  COMMANDS,
  PACKAGE_NAME,
  TAGLINE,
  VERSION
} from '../src/constants/index.js';
import { logger } from '../src/utils/logger.js';

const program = new Command();

try {
  logger.banner();

  program
    .name(PACKAGE_NAME)
    .description(TAGLINE)
    .version(VERSION);

  program
    .command(COMMANDS.INIT)
    .description(COMMAND_DESCRIPTIONS.INIT)
    .action(async () => {
      await init();
    });

  program.on('command:*', () => {
    logger.error(CLI_MESSAGES.UNKNOWN_COMMAND);
    program.help({ error: true });
  });

  await program.parseAsync(process.argv);
} catch (error) {
  logger.error(error.message || CLI_MESSAGES.UNEXPECTED_ERROR);
  process.exitCode = 1;
}
