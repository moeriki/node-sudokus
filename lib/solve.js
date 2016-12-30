'use strict';

// modules

const { noop } = require('lodash/fp');

const sudokuFactory = require('./sudoku');

// exports

function solve(data, { onProgress = noop } = {}) {

  // variables

  const SIDE = data.length;
  const sudoku = sudokuFactory(data);

  let rowIndex = 0;
  let columnIndex = 0;
  const getCell = () => sudoku.getCell({ rowIndex, columnIndex });

  do {
    onProgress(sudoku.state);

    const cell = getCell();
    let triedAllNumbers;

    do {
      cell.value++;
      triedAllNumbers = cell.value > SIDE;
    } while (!triedAllNumbers && !sudoku.isValidCell({ rowIndex, columnIndex }));

    if (triedAllNumbers) {
      cell.value = 0;
      do {
        rowIndex--;
        if (rowIndex === -1) {
          rowIndex = SIDE - 1;
          columnIndex--;
          if (columnIndex === -1) {
            throw new Error('Sudoku is not solveable.');
          }
        }
      } while (getCell().fixed);
    } else {
      do {
        rowIndex++;
        if (rowIndex === SIDE) {
          rowIndex = 0;
          columnIndex++;
        }
      } while (columnIndex < SIDE && getCell().fixed);
    }
  } while (columnIndex < SIDE);

  return sudoku.getData();
}

module.exports = solve;
