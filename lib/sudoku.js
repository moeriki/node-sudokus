'use strict';

// modules

const {
  flatten,
  flow,
  get,
  map,
  memoize,
  slice,
  uniq,
  without,
} = require('lodash/fp');

// private functions

const mapAll = (func) => map(map(func));

const getValue = get('value');

const parseAll = mapAll((value) => ({ value, fixed: value !== 0 }));

const hasNoDoubles = (group) => {
  const numbers = flow([map(getValue), without([0])])(group);
  return numbers.length === uniq(numbers).length;
};

// exports

function sudokuFactory(data) {

  // variables

  const CELL_SIDE = Math.sqrt(data.length);

  const puzzle = parseAll(data);

  // functions

  const getRow = memoize(
    (rowIndex) => puzzle[rowIndex]
  );

  const getColumn = memoize(
    (columnIndex) => flatten(
      map(get(columnIndex), puzzle)
    )
  );

  const getGrid = memoize(
    ({ rowIndex, columnIndex }) => {
      const startRow = Math.floor(rowIndex / CELL_SIDE) * CELL_SIDE;
      const startColumn = Math.floor(columnIndex / CELL_SIDE) * CELL_SIDE;
      return flow([
        slice(startRow, startRow + CELL_SIDE),
        map(slice(startColumn, startColumn + CELL_SIDE)),
        flatten,
      ])(puzzle);
    }
  );

  const getCell = memoize(
    ({ rowIndex, columnIndex }) => puzzle[rowIndex][columnIndex]
  );

  const isValidRow = flow([getRow, hasNoDoubles]);

  const isValidColumn = flow([getColumn, hasNoDoubles]);

  const isValidGrid = flow([getGrid, hasNoDoubles]);

  const isValidCell = ({ rowIndex, columnIndex }) =>
    isValidRow(rowIndex)
    && isValidColumn(columnIndex)
    && isValidGrid({ rowIndex, columnIndex })
  ;

  return {
    getData: () => mapAll(getValue)(puzzle),
    state: puzzle,

    getRow,
    getColumn,
    getGrid,
    getCell,

    isValidRow,
    isValidColumn,
    isValidGrid,
    isValidCell,
  };
}

module.exports = sudokuFactory;
