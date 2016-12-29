#!/usr/bin/env node

/* eslint no-console:0 */

'use strict';

// modules

const chalk = require('chalk');
const { map, throttle } = require('lodash/fp');
const logUpdate = require('log-update');
const { getBorderCharacters, table } = require('table');
const argv = require('yargs').argv;

const solve = require('./lib');

// constants

const TABLE_CONFIG = {
  border: getBorderCharacters('norc'),
};

// private variables

const DEMO = [
  [0, 0, 0, 2, 9, 0, 1, 0, 0],
  [6, 0, 0, 5, 0, 1, 0, 7, 0],
  [0, 0, 0, 0, 0, 0, 0, 3, 4],
  [0, 0, 0, 0, 0, 0, 9, 4, 0],
  [4, 5, 0, 3, 0, 0, 0, 6, 2],
  [2, 0, 9, 0, 0, 4, 3, 1, 0],
  [0, 2, 0, 0, 0, 0, 4, 9, 0],
  [0, 0, 6, 0, 0, 8, 0, 0, 0],
  [0, 4, 3, 0, 2, 0, 0, 8, 7],
];

// private functions

const prettifyCell = (cell) => {
  if (cell.fixed) {
    return chalk.blue(cell.value);
  }
  if (cell.value === 0) {
    return chalk.gray(0);
  }
  return String(cell.value);
};

const prettifyPuzzleState = map(map(prettifyCell));

const logPuzzle = (puzzle) => {
  logUpdate(table(puzzle, TABLE_CONFIG));
};

// cli

const puzzle = argv._[0]
  ? JSON.parse(argv._[0])
  : DEMO
;

const options = {
  onError: logPuzzle,
  onProgress: argv.v || argv.visualize ? throttle(200, (state) => {
    logPuzzle(prettifyPuzzleState(state));
  }) : undefined,
};

const solution = solve(puzzle, options);

logPuzzle(solution);
