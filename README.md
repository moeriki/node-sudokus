<p align="center">
  <h3 align="center">Sudokus</h3>
  <p align="center">A JavaScript utility to solve sudokus.<p>
  <p align="center"><img align="center" src="https://raw.githubusercontent.com/Moeriki/node-sudokus/master/demo.gif" height="480x"></p>
</p>

## CLI

### Install

```
$ npm install -g sudokus
```

### Usage

```shell
$ sudokus solve --help

$ sudokus solve ",,,2,9,,1,,,6,,,5,,1,,7,,,,,,,,,3,4,,,,,,,9,4,,4,5,,3,,,,6,2,2,,9,,,4,3,1,,,2,,,,,4,9,,,,6,,,8,,,,,4,3,,2,,,8,7"

$ sudokus solve "[[0,0,0,2,9,0,1,0,0],[6,0,0,5,0,1,0,7,0],[0,0,0,0,0,0,0,3,4],[0,0,0,0,0,0,9,4,0],[4,5,0,3,0,0,0,6,2],[2,0,9,0,0,4,3,1,0],[0,2,0,0,0,0,4,9,0],[0,0,6,0,0,8,0,0,0],[0,4,3,0,2,0,0,8,7]]"
```

## API

### Install

```
$ npm install --save sudokus
```

### Usage

```javascript
const sudokus = require('sudokus');

const solution = sudokus.solve([
    [0, 0, 0, 2, 9, 0, 1, 0, 0],
    [6, 0, 0, 5, 0, 1, 0, 7, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 4],
    [0, 0, 0, 0, 0, 0, 9, 4, 0],
    [4, 5, 0, 3, 0, 0, 0, 6, 2],
    [2, 0, 9, 0, 0, 4, 3, 1, 0],
    [0, 2, 0, 0, 0, 0, 4, 9, 0],
    [0, 0, 6, 0, 0, 8, 0, 0, 0],
    [0, 4, 3, 0, 2, 0, 0, 8, 7]
]);

// solution = [
//   [ 7, 8, 4, 2, 9, 3, 1, 5, 6 ],
//   [ 6, 3, 2, 5, 4, 1, 8, 7, 9 ],
//   [ 5, 9, 1, 6, 8, 7, 2, 3, 4 ],
//   [ 3, 1, 7, 8, 6, 2, 9, 4, 5 ],
//   [ 4, 5, 8, 3, 1, 9, 7, 6, 2 ],
//   [ 2, 6, 9, 7, 5, 4, 3, 1, 8 ],
//   [ 8, 2, 5, 1, 7, 6, 4, 9, 3 ],
//   [ 9, 7, 6, 4, 3, 8, 5, 2, 1 ],
//   [ 1, 4, 3, 9, 2, 5, 6, 8, 7 ]
// ]
```
