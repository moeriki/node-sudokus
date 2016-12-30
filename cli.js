#!/usr/bin/env node

/* eslint no-console:0 */

'use strict';

// modules

const chalk = require('chalk');
const {
  chunk,
  flow,
  getOr,
  map,
  noop,
  parseInt,
  split,
  throttle,
  trim,
} = require('lodash/fp');
const logUpdate = require('log-update');
const { getBorderCharacters, table } = require('table');

const sudokus = require('./lib');

// constants

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

const TABLE_CONFIG = {
  border: getBorderCharacters('norc'),
};

// private functions

const createPuzzleTable = (puzzle) => table(puzzle, TABLE_CONFIG);

const updatePuzzle = (puzzle) => {
  logUpdate(createPuzzleTable(puzzle));
};

const parseSudoku = flow([
  split(','),
  map(flow([
    trim,
    getOr('0', '0'),
    parseInt(10),
  ])),
  chunk(9),
]);

const prettifyCell = (cell) => {
  if (cell.fixed) {
    return chalk.blue(cell.value);
  }
  if (cell.value === 0) {
    return chalk.gray('-');
  }
  return String(cell.value);
};

const prettifyState = map(map(prettifyCell));

// commands

function solveCommand(argv) {
  const onProgress = argv.animate
    ? throttle(200, (state) => {
      updatePuzzle(prettifyState(state));
    })
    : noop
  ;

  const puzzle = argv.demo ? DEMO : argv.puzzle;
  const solution = sudokus.solve(puzzle, { onProgress });

  if (argv.animate) {
    onProgress.cancel();
    logUpdate.clear();
  }

  process.stdout.write(
    argv.json
      ? JSON.stringify(solution)
        .replace('[[', '[\n  [')
        .replace(/,([0-9])/g, ', $1')
        .replace(/,\[/g, ',\n  [')
        .replace(']]', ']\n]')
      : createPuzzleTable(solution)
    ,
    { encoding: 'utf8' }
  );
}

// cli

require('yargs') // eslint-disable-line no-unused-expressions
  .usage('$0 <cmd> [options] [args]')
  .command(
    'solve [puzzle]',
    'solve your sudoku puzzle',
    (yargs) => yargs
      .example('solve -ad')
      .usage('$0 [options] [puzzle]')
      .options({
        animate: {
          alias: 'a',
          describe: 'animate the solving progress',
          type: 'boolean',
        },
        demo: {
          alias: 'd',
          describe: 'solve demo puzzle',
          type: 'boolean',
        },
        json: {
          alias: 'j',
          describe: 'output solution as json',
          type: 'boolean',
        },
      })
      .coerce({
        puzzle(puzzle) {
          return puzzle[0] === '['
            ? JSON.parse(puzzle)
            : parseSudoku(puzzle)
          ;
        },
      })
    ,
    solveCommand
  )
  .help()
  .argv
;
