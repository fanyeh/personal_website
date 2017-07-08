<template>
  <div class="tic-tac-toe">
    <div class="board" v-if="symbolSelected">
  
      <table>
        <tbody>
          <tr>
            <td colspan="3">
              <p class="board__message" :class="boardMessageBg">{{currentPlayer}}</p>
            </td>
          </tr>
          <tr>
            <td :class="cells[1] === 'O' ? 'board__cells--green':'board__cells--red'" class="board__cells" id="1" @click="insertSymbol(1)">{{cells[1]}}</td>
            <td :class="cells[2] === 'O' ? 'board__cells--green':'board__cells--red'" class="board__cells" id='2' @click="insertSymbol(2)">{{cells[2]}}</td>
            <td :class="cells[3] === 'O' ? 'board__cells--green':'board__cells--red'" class="board__cells" id='3' @click="insertSymbol(3)">{{cells[3]}}</td>
          </tr>
  
          <tr>
            <td :class="cells[4] === 'O' ? 'board__cells--green':'board__cells--red'" class="board__cells" id='4' @click="insertSymbol(4)">{{cells[4]}}</td>
            <td :class="cells[5] === 'O' ? 'board__cells--green':'board__cells--red'" class="board__cells" id='5' @click="insertSymbol(5)">{{cells[5]}}</td>
            <td :class="cells[6] === 'O' ? 'board__cells--green':'board__cells--red'" class="board__cells" id='6' @click="insertSymbol(6)">{{cells[6]}}</td>
          </tr>
  
          <tr>
            <td :class="cells[7] === 'O' ? 'board__cells--green':'board__cells--red'" class="board__cells" id='7' @click="insertSymbol(7)">{{cells[7]}}</td>
            <td :class="cells[8] === 'O' ? 'board__cells--green':'board__cells--red'" class="board__cells" id='8' @click="insertSymbol(8)">{{cells[8]}}</td>
            <td :class="cells[9] === 'O' ? 'board__cells--green':'board__cells--red'" class="board__cells" id='9' @click="insertSymbol(9)">{{cells[9]}}</td>
          </tr>
  
          <tr>
            <td colspan="3" class="board__reset-btn" @click="restartGame">Restart</td>
          </tr>
        </tbody>
      </table>
  
    </div>
  
    <div v-if="!symbolSelected" class="board__symbol-sel">
      <div class="_modal" v-if="gameOver">
        <div class="jumbotron _modal__content">
          <div class="row">
            <div class="board__symbol board__symbol--circle board__cells--green" @click="startGame('O')">O</div>
            <div class="board__symbol board__symbol--cross board__cells--red" @click="startGame('X')">X</div>
          </div>
          <p class="board__symbol-message">Please select '
            <span class="board__cells--green">O</span>' or '
            <span class="board__cells--red">X</span>'</p>
        </div>
      </div>
  
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
      gameResult: '',
      userInteractive: true
    }
  },
  methods: {
    startGame(sym) {
      this.gameOver = false
      this.symbolSelected = true
      this.symbol = sym
      this.playerSymbol = sym
      this.computerSymbol = this.swapSymbol(sym)
      this.symbolForPlayers[this.playerSymbol] = 'Your turn'
      this.symbolForPlayers[this.computerSymbol] = 'Computer\'s turn'
      this.showCurrentPlayer('O')
      if (sym !== 'O') {
        // run computer step first
        this.symbol = this.swapSymbol(sym)
        const randomStep = Math.floor(Math.random() * 9) + 1
        this.userInteractive = false
        setTimeout(() => {
          this.userInteractive = true
          this.insertSymbol(randomStep)
        }, 1000)
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
      this.gameResult = ''
    },
    insertSymbol(id) {
      if (this.userInteractive) {
        if (this.cells[id] === '' && !this.gameOver) {
          this.cells[id] = this.symbol
          this.symbol = this.swapSymbol(this.symbol)
          this.showCurrentPlayer(this.symbol)
          if (this.checkWinner(this.cells) || this.emptySteps(this.cells).length === 0) {
            this.gameOver = true
            if (this.emptySteps(this.cells).length === 0) {
              this.currentPlayer = 'Draw!'
            } else {
              this.currentPlayer = this.playerSymbol === this.checkWinner(this.cells) ? 'You Win !' : 'You Loose ~'
            }
          }
          if (this.symbol === this.computerSymbol && !this.gameOver) {
            let move = this.minmax(this.cells, this.computerSymbol)
            this.userInteractive = false
            setTimeout(() => {
              this.userInteractive = true
              this.insertSymbol(move.move)
            }, 1000)
          }
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
      this.boardMessageBg = sym === 'O' ? 'board__message--green' : 'board__message--red'
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
$border-color:#303030;
@mixin font-setting($size, $weight) {
  font-size: $size;
  font-weight: $weight;
}

.tic-tac-toe {
  margin: 0 auto;
  display: table;
  text-align: center;
}

table>tbody>tr {
  border: 1px solid;
}

.board {
  position: absolute;
  top: 50%;
  left: 50;
  transform: translate(-50%, -50%);
  display: table;
}

.board__message {
  @include font-setting(15px, 500);
}

.board__message,
.board-reset,
.board__symbol {
  margin: auto;
}

.board__symbol-sel,
.board__reset-btn {
  width: 100%;
}

.board__cells--green {
  color: $vue-color;
}

.board__cells--red {
  color: $airbnb-color;
}

.board__message--green {
  background-color: $vue-color;
}

.board__message--red {
  background-color: $airbnb-color;
}

.board__cells {
  @include font-setting(45px, 900);
  display: table-cell;
  width: 80px;
  height: 80px;
  vertical-align: middle;
  border: 1px solid $border-color;
  border-bottom: none;
  border-top: none;
}

// Restart
.board__reset-btn {
  @include font-setting(16px, 500);
  border: 1.5px solid $border-color;
}

.board__reset-btn:hover {
  background-color: #303030;
  color: white;
}

// Symbol selection
.board__symbol-message {
  @include font-setting(16px, 500);
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.board__symbol {
  @include font-setting(50px, 900);
  padding: 0 15px;
  position: absolute;
}

.board__symbol:hover {
  border: 2px solid;
}

.board__symbol--circle {
  left: 60px;
}

.board__symbol--cross {
  right: 60px;
}

// Selection modal
._modal {
  width: 100%;
  height: 100%;
  background: white;
}

._modal__content {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 250px;
  transform: translate(-50%, -50%);
}
</style>
