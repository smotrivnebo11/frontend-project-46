#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .version('1.0.0')
  .help('output usage information')

program.parse();
