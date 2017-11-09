<template lang="pug">
  #ticTacToe(class="absolute abs-center bg-white")
    //- Game Board
    div(v-if="symbolSelected")
      table(class="center collapse")
          tr(class="h3-ns h2")
            td(colspan="3" class="f2-ns f3 white fw9" :class="boardMessageBg") {{currentPlayer}}
          tr(class="h4-ns h4 bb bw2 b--light-gray")
            td(:class="cells[1] === 'O' ? 'board__cells--green':'board__cells--red'" class="w3 br bw2  b--light-gray f-subheadline-ns f1" id="1" @click="insertSymbol(1)") {{cells[1]}}
            td(:class="cells[2] === 'O' ? 'board__cells--green':'board__cells--red'" class="w3 br bw2 b--light-gray f-subheadline-ns f1" id='2' @click="insertSymbol(2)") {{cells[2]}}
            td(:class="cells[3] === 'O' ? 'board__cells--green':'board__cells--red'" class="w3 f-subheadline-ns f1" id='3' @click="insertSymbol(3)") {{cells[3]}}
          tr(class="h4-ns h4 bb bw2 b--light-gray")
            td(:class="cells[4] === 'O' ? 'board__cells--green':'board__cells--red'" class="w3 br bw2 b--light-gray f-subheadline-ns f1" id='4' @click="insertSymbol(4)") {{cells[4]}}
            td(:class="cells[5] === 'O' ? 'board__cells--green':'board__cells--red'" class="w3 br bw2 b--light-gray f-subheadline-ns f1" id='5' @click="insertSymbol(5)") {{cells[5]}}
            td(:class="cells[6] === 'O' ? 'board__cells--green':'board__cells--red'" class="w3 f-subheadline-ns f1" id='6' @click="insertSymbol(6)") {{cells[6]}}
          tr(class="h4-ns h4")
            td(:class="cells[7] === 'O' ? 'board__cells--green':'board__cells--red'" class="w3 br bw2 b--light-gray f-subheadline-ns f1" id='7' @click="insertSymbol(7)") {{cells[7]}}
            td(:class="cells[8] === 'O' ? 'board__cells--green':'board__cells--red'" class="w3 br bw2 b--light-gray f-subheadline-ns f1" id='8' @click="insertSymbol(8)") {{cells[8]}}
            td(:class="cells[9] === 'O' ? 'board__cells--green':'board__cells--red'" class="w3 f-subheadline-ns f1" id='9' @click="insertSymbol(9)") {{cells[9]}}
          tr(class="h2-ns h2")
            td(colspan="3" class="reset-btn f4 fw1 bg-light-gray black-60 pointer" @click="restartGame") Restart
    //- Selection Modal
    div( v-if="gameOver && !symbolSelected" class="modal__content absolute abs-center bg-white")
      p(class="f2 black-40") Please select
      div(class="board__cells--green f-headline-ns f1 dib mr4 pointer symbol" @click="startGame('O')") O
      span(class="f3 black-40") OR
      div(class="board__cells--red f-headline-ns f1 dib ml4 pointer symbol" @click="startGame('X')") X
</template>

<script>
export default {
  name: 'ticTacToe',
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

table {
  width:320px;
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

.reset-btn:hover {
  background-color: #303030;
  color: white;
}

.symbol:hover {
  transform:scale(2);
  font-weight:900;
}

.modal__content {
  width: 300px;
  height: 250px;
}
</style>
