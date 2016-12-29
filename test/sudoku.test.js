'use strict';

// modules

const { get, map } = require('lodash/fp');

const sudokuFactory = require('../lib/sudoku');

// tests

describe('sudoku', () => {

  const data = [
    [0, 0, 0, 2, 9, 0, 1, 0, 0],
    [6, 0, 0, 5, 0, 1, 0, 7, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 4],
    [0, 0, 0, 0, 0, 2, 9, 4, 0],
    [4, 5, 0, 3, 2, 0, 0, 6, 2], // inner middle 2 is invalid for row/column/grid
    [2, 0, 9, 0, 0, 4, 3, 1, 0],
    [0, 2, 0, 0, 0, 0, 4, 9, 0],
    [0, 0, 6, 0, 0, 8, 0, 0, 0],
    [0, 4, 3, 0, 2, 0, 0, 8, 7],
  ];

  const sudoku = sudokuFactory(data);

  const getValue = get('value');

  /* eslint-disable jasmine/valid-expect */

  const expectValue = (cell) => expect(getValue(cell));
  const expectValues = (group) => expect(map(getValue)(group));

  /* eslint-enable jasmine/valid-expect */

  it('should get cell', () => {
    expectValue(sudoku.getCell({ rowIndex: 1, columnIndex: 0 })).toBe(6);
    expectValue(sudoku.getCell({ rowIndex: 1, columnIndex: 1 })).toBe(0);
  });

  it('should get row', () => {
    expectValues(sudoku.getRow(0)).toEqual([0, 0, 0, 2, 9, 0, 1, 0, 0]);
    expectValues(sudoku.getRow(8)).toEqual([0, 4, 3, 0, 2, 0, 0, 8, 7]);
  });

  it('should get column', () => {
    expectValues(sudoku.getColumn(0)).toEqual([0, 6, 0, 0, 4, 2, 0, 0, 0]);
    expectValues(sudoku.getColumn(8)).toEqual([0, 0, 4, 0, 2, 0, 0, 0, 7]);
  });

  it('should get grid', () => {
    expectValues(sudoku.getGrid({ rowIndex: 2, columnIndex: 2 })).toEqual([0, 0, 0, 6, 0, 0, 0, 0, 0]);
    expectValues(sudoku.getGrid({ rowIndex: 3, columnIndex: 3 })).toEqual([0, 0, 2, 3, 2, 0, 0, 0, 4]);
    expectValues(sudoku.getGrid({ rowIndex: 5, columnIndex: 5 })).toEqual([0, 0, 2, 3, 2, 0, 0, 0, 4]);
    expectValues(sudoku.getGrid({ rowIndex: 6, columnIndex: 6 })).toEqual([4, 9, 0, 0, 0, 0, 0, 8, 7]);
  });

  it('should check valid row', () => {
    expect(sudoku.isValidRow(3)).toBe(true);
    expect(sudoku.isValidRow(4)).toBe(false);
    expect(sudoku.isValidRow(5)).toBe(true);
  });

  it('should check valid column', () => {
    expect(sudoku.isValidColumn(3)).toBe(true);
    expect(sudoku.isValidColumn(4)).toBe(false);
    expect(sudoku.isValidColumn(5)).toBe(true);
  });

  it('should check valid grid', () => {
    expect(sudoku.isValidGrid({ rowIndex: 1, columnIndex: 1 })).toBe(true);
    expect(sudoku.isValidGrid({ rowIndex: 4, columnIndex: 4 })).toBe(false);
    expect(sudoku.isValidGrid({ rowIndex: 7, columnIndex: 7 })).toBe(true);
  });

  it('should check valid cell', () => {
    // valid all
    expect(sudoku.isValidCell({ rowIndex: 8, columnIndex: 8 })).toBe(true);
    // invalid col
    expect(sudoku.isValidCell({ rowIndex: 1, columnIndex: 4 })).toBe(false);
    expect(sudoku.isValidCell({ rowIndex: 4, columnIndex: 4 })).toBe(false);
    expect(sudoku.isValidCell({ rowIndex: 7, columnIndex: 4 })).toBe(false);
    // invalid row
    expect(sudoku.isValidCell({ rowIndex: 4, columnIndex: 1 })).toBe(false);
    expect(sudoku.isValidCell({ rowIndex: 4, columnIndex: 4 })).toBe(false);
    expect(sudoku.isValidCell({ rowIndex: 4, columnIndex: 7 })).toBe(false);
    // invalid grid
    expect(sudoku.isValidCell({ rowIndex: 3, columnIndex: 3 })).toBe(false);
    expect(sudoku.isValidCell({ rowIndex: 4, columnIndex: 4 })).toBe(false);
    expect(sudoku.isValidCell({ rowIndex: 5, columnIndex: 5 })).toBe(false);
  });

  it('should return puzzle', () => {
    expect(sudoku.getData()).toEqual(data);
  });

});
