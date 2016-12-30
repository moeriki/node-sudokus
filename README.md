<p align="center">
  <h3 align="center">Sudokus</h3>
  <p align="center">A JavaScript utility to solve sudokus.<p>
  <p align="center"><img align="center" src="https://raw.githubusercontent.com/Moeriki/node-sudokus/master/demo.gif" height="480x"></p>
</p>

## CLI

### Install

```
$ npm install -g node-sudokus
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
$ npm install --save node-sudokus
```

### Usage

```javascript
const sudokus = require('sudokus');
sudokus.solve([
    [0, 0, 0, 2, 9, 0, 1, 0, 0],
    [6, 0, 0, 5, 0, 1, 0, 7, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 4],
    [0, 0, 0, 0, 0, 0, 9, 4, 0],
    [4, 5, 0, 3, 0, 0, 0, 6, 2],
    [2, 0, 9, 0, 0, 4, 3, 1, 0],
    [0, 2, 0, 0, 0, 0, 4, 9, 0],
    [0, 0, 6, 0, 0, 8, 0, 0, 0],
    [0, 4, 3, 0, 2, 0, 0, 8, 7]
], {
  onProgress(state) {
    console.log(state);
  }
});
```
