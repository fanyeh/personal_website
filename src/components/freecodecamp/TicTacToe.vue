<template>
  <div id="tic-tac-toe">
    <div class="board" v-if="symbolSelected">
      <p class="board-message" :class="boardMessageBg">{{currentPlayer}}</p>
      <div class="board-row">
        <div :class="cells[1] === 'O' ? 'board-cells-green':'board-cells-red'" class="board-cells" id="1" @click="insertSymbol(1)">
          {{cells[1]}}
        </div>
        <div :class="cells[2] === 'O' ? 'board-cells-green':'board-cells-red'" class="board-cells" id='2' @click="insertSymbol(2)">{{cells[2]}}</div>
        <div :class="cells[3] === 'O' ? 'board-cells-green':'board-cells-red'" class="board-cells" id='3' @click="insertSymbol(3)">{{cells[3]}}</div>
      </div>
      <div class="board-row">
        <div :class="cells[4] === 'O' ? 'board-cells-green':'board-cells-red'" class="board-cells" id='4' @click="insertSymbol(4)">{{cells[4]}}</div>
        <div :class="cells[5] === 'O' ? 'board-cells-green':'board-cells-red'" class="board-cells" id='5' @click="insertSymbol(5)">{{cells[5]}}</div>
        <div :class="cells[6] === 'O' ? 'board-cells-green':'board-cells-red'" class="board-cells" id='6' @click="insertSymbol(6)">{{cells[6]}}</div>
      </div>
      <div class="board-row">
        <div :class="cells[7] === 'O' ? 'board-cells-green':'board-cells-red'" class="board-cells" id='7' @click="insertSymbol(7)">{{cells[7]}}</div>
        <div :class="cells[8] === 'O' ? 'board-cells-green':'board-cells-red'" class="board-cells" id='8' @click="insertSymbol(8)">{{cells[8]}}</div>
        <div :class="cells[9] === 'O' ? 'board-cells-green':'board-cells-red'" class="board-cells" id='9' @click="insertSymbol(9)">{{cells[9]}}</div>
      </div>
    </div>
    <div v-if="symbolSelected" class="board-reset">
      <div class="board-reset-button " @click="restartGame">Reset</div>
    </div>
    <div v-if="!symbolSelected" class="symbol-selection">
      <div class="symbol board-cells-green" @click="startGame('O')">O</div>
      <div class="symbol board-cells-red" @click="startGame('X')">X</div>
      <p class="symbol-selection-message">Please select 'O' or 'X'</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'board',
  data() {
    return {
      cells: {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: ''
      },
      winCondition: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7']
      ],
      symbol: '',
      gameOver: true,
      symbolSelected: false,
      boardMessageBg: '',
      symbolForPlayers: {
        O: '',
        X: ''
      },
      currentPlayer: '',
      computerSymbol: '',
      playerSymbol: '',
      winner: ''
    }
  },
  methods: {
    startGame(sym) {
      this.gameOver = false
      this.symbolSelected = true
      this.symbol = sym
      this.playerSymbol = sym
      this.computerSymbol = this.swapSymbol(sym)
      this.symbolForPlayers[this.playerSymbol] = 'player'
      this.symbolForPlayers[this.computerSymbol] = 'computer'
      this.showCurrentPlayer('O')
      if (sym !== 'O') {
        // run computer step first
        this.symbol = this.swapSymbol(sym)
        const randomStep = Math.floor(Math.random() * 9) + 1
        this.insertSymbol(randomStep)
      }
    },
    restartGame() {
      for (var prop in this.cells) {
        if (this.cells.hasOwnProperty(prop)) {
          this.cells[prop] = ''
        }
      }
      this.gameOver = true
      this.symbolSelected = false
    },
    insertSymbol(id) {
      if (this.cells[id] === '' && !this.gameOver) {
        this.cells[id] = this.symbol
        this.symbol = this.swapSymbol(this.symbol)
        this.showCurrentPlayer(this.symbol)
        if (this.checkWinner(this.cells) || this.emptySteps(this.cells).length === 0) {
          this.gameOver = true
        }
        if (this.symbol === this.computerSymbol && !this.gameOver) {
          let move = this.minmax(this.cells, this.computerSymbol)
          this.insertSymbol(move.move)
        }
      }
    },
    swapSymbol(sym) {
      return sym === 'O' ? 'X' : 'O'
    },
    checkWinner(cells) {
      let foundWinner = ''
      this.winCondition.forEach((e) => {
        if (cells[e[0]] === cells[e[1]] && cells[e[1]] === cells[e[2]] && cells[e[0]] !== '') {
          foundWinner = cells[e[0]]
        }
      })
      return foundWinner
    },
    showCurrentPlayer(sym) {
      this.currentPlayer = this.symbolForPlayers[sym]
      this.boardMessageBg = sym === 'O' ? 'board-message-green' : 'board-message-red'
    },
    emptySteps(cells) {
      return Object.keys(cells).filter((step) => {
        return cells[step] === ''
      })
    },
    minmax(currentCells, turn) {
      let availableMoves = this.emptySteps(currentCells)
      let scores = []
      let moves = {}

      for (let i = 0; i < availableMoves.length; i++) {
        let move = availableMoves[i]
        let newCell = JSON.parse(JSON.stringify(currentCells))
        newCell[move] = turn

        let score = this.checkSocre(newCell)
        if (this.emptySteps(newCell).length > 0 && score === 0) {
          let changeTurn = turn === this.playerSymbol ? this.computerSymbol : this.playerSymbol
          score = this.minmax(newCell, changeTurn).score
        }
        scores.push(score)
        moves[score] = move
      }
      if (turn === this.playerSymbol) {
        // Return max score move
        let max = Math.max(...scores)
        let move = moves[max]
        return {
          move: move,
          score: max
        }
      } else {
        // Return min score move
        let min = Math.min(...scores)
        let move = moves[min]
        return {
          move: move,
          score: min
        }
      }
    },
    checkSocre(cells) {
      if (this.checkWinner(cells) === this.playerSymbol) {
        return 10
      } else if (this.checkWinner(cells) === this.computerSymbol) {
        return -10
      } else {
        return 0
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$vue-color: #42b883;
$airbnb-color: #fd5c63;
$border-color:#8f8f8f;
@mixin font-setting($size, $weight) {
  font-size: $size;
  font-weight: $weight;
}

#tic-tac-toe {
  margin: 0 auto;
}

div {
  display: table;
  text-align: center;
}

.container,
.board-message,
.board-reset,
.symbol-selection {
  margin: auto;
}

.symbol-selection,
.board-reset,
.board-reset-button {
  width: 100%;
}

.board {
  position: relative;
}

.board-message {
  @include font-setting(15px, 500); // color: white;
  border-radius: 5px 5px 0 0;
  width: 80px;
}

.board-message-green {
  background-color: $vue-color;
}

.board-message-red {
  background-color: $airbnb-color;
}

.board-row {
  border: 1px solid $border-color;
}

.board-cells {
  @include font-setting(50px, 900);
  display: table-cell;
  width: 80px;
  height: 80px;
  vertical-align: middle;
  border: 1px solid $border-color;
  border-bottom: none;
  border-top: none;
}

.board-cells-green {
  color: $vue-color;
}

.board-cells-red {
  color: $airbnb-color;
}

.symbol-selection-message {
  @include font-setting(20px, 500);
  text-align: center;
}

.symbol {
  @include font-setting(50px, 900);
  display: inline-block;
  width: 50%;
  padding: 30px 0 30px 0;
}

.symbol:hover {
  text-decoration: underline;
}

.board-reset-button {
  @include font-setting(18px, 500);
  border: 1.5px solid $border-color;
  border-radius: 0 0 10px 10px;
}

.board-reset-button:hover {
  background-color: #303030;
  color: white;
}
</style>
