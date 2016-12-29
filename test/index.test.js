'use strict';

// modules

const solve = require('../lib');

// tests

it('should solve sudoku', () => {
  const solution = solve([
    [0, 0, 0, 2, 9, 0, 1, 0, 0],
    [6, 0, 0, 5, 0, 1, 0, 7, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 4],
    [0, 0, 0, 0, 0, 0, 9, 4, 0],
    [4, 5, 0, 3, 0, 0, 0, 6, 2],
    [2, 0, 9, 0, 0, 4, 3, 1, 0],
    [0, 2, 0, 0, 0, 0, 4, 9, 0],
    [0, 0, 6, 0, 0, 8, 0, 0, 0],
    [0, 4, 3, 0, 2, 0, 0, 8, 7],
  ]);
  expect(solution).toEqual([
    [7, 8, 4, 2, 9, 3, 1, 5, 6],
    [6, 3, 2, 5, 4, 1, 8, 7, 9],
    [5, 9, 1, 6, 8, 7, 2, 3, 4],
    [3, 1, 7, 8, 6, 2, 9, 4, 5],
    [4, 5, 8, 3, 1, 9, 7, 6, 2],
    [2, 6, 9, 7, 5, 4, 3, 1, 8],
    [8, 2, 5, 1, 7, 6, 4, 9, 3],
    [9, 7, 6, 4, 3, 8, 5, 2, 1],
    [1, 4, 3, 9, 2, 5, 6, 8, 7],
  ]);
});
