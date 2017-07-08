<template>
  <div class="game">
    <h1>GameOfLife</h1>
    <!-- Game board -->
    <table>
      <tr v-for="(cell, x) in cells">
        <td @click="becomeAlive(x,y,1)" class="game__cell" :class="cellColor(cell[y])" v-for="(col ,y) in cell"></td>
      </tr>
    </table>
    <div class="game__generation">
      <h5>Generations : {{generations}}</h5>
    </div>
    <!--Control buttons-->
    <div class="row">
      <div class="col-md-12">
        <button class="btn" @click="startGame">Start</button>
        <button class="btn" @click="stopGame">Stop</button>
        <button class="btn" @click="clearBoard">Clear</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      cells: [],
      columns: 50,
      rows: 30,
      updateCells: [],
      generations: 0,
      gameInterval: null
    }
  },
  methods: {
    checkNeighbours(posX, posY) {
      let topX = posX - 1
      let botX = posX + 1
      let leftY = posY - 1
      let rightY = posY + 1
      if (posX < 1) {
        topX = this.rows - 1
      } else if (posX === this.rows - 1) {
        botX = 0
      }
      if (posY < 1) {
        leftY = this.columns - 1
      } else if (posY === this.columns - 1) {
        rightY = 0
      }

      let neighbours = [
        [topX, leftY],
        [topX, posY],
        [topX, rightY],
        [posX, leftY],
        [posX, rightY],
        [botX, leftY],
        [botX, posY],
        [botX, rightY]
      ]
      let liveNeighbours = 0
      const self = this
      neighbours.forEach((neighbour) => {
        if (self.cells[neighbour[0]][neighbour[1]] > 0) {
          liveNeighbours += 1
        }
      })
      const currentCell = this.cells[posX][posY]
      if (currentCell === 0 && liveNeighbours === 3) {
        // Rule : Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        this.updateCells.push({ 'x': posX, 'y': posY, 'isAlive': 1 })
      } else if (currentCell > 0 && (liveNeighbours < 2 || liveNeighbours > 3)) {
        // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        this.updateCells.push({ 'x': posX, 'y': posY, 'isAlive': 0 })
      } else if (currentCell > 0) {
        this.updateCells.push({ 'x': posX, 'y': posY, 'isAlive': 2 })
      }
    },
    becomeAlive(x, y, alive) {
      const updatedCol = this.cells[x]
      updatedCol[y] = alive
      this.cells.splice(x, 1, updatedCol)
    },
    nextGeneration() {
      const self = this
      this.updateCells.forEach((cell) => {
        self.becomeAlive(cell.x, cell.y, cell.isAlive)
      })
      this.updateCells = []
    },
    startGame() {
      this.gameInterval = setInterval(() => {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            this.checkNeighbours(i, j)
          }
        }
        this.generations += 1
        this.nextGeneration()
      }, 200)
    },
    stopGame() {
      clearInterval(this.gameInterval)
    },
    clearBoard() {
      this.generations = 0
      for (let i = 0; i < this.rows; i++) {
        this.cells[i] = []
        for (let j = 0; j < this.columns; j++) {
          const rand = Math.floor(Math.random() * (5 - 1 + 1)) + 1
          this.becomeAlive(i, j, rand === 5 ? 2 : 0)
        }
      }
    },
    cellColor(state) {
      if (state === 1) {
        return 'game__cell--newborn'
      } else if (state === 2) {
        return 'game__cell--alive'
      }
    }
  },
  created() {
    if (window.innerWidth < 376) {
      this.columns = 20
      this.rows = 20
    } else if (window.innerWidth < 768) {
      this.columns = 30
    }
    for (let i = 0; i < this.rows; i++) {
      this.cells[i] = []
      for (let j = 0; j < this.columns; j++) {
        const rand = Math.floor(Math.random() * (5 - 1 + 1)) + 1
        this.cells[i][j] = rand === 5 ? 2 : 0
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.game {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

table {
  margin: 0 auto;
  border-spacing: 1px;
  border-collapse: separate;
}

.game__cell {
  width: 16px;
  height: 16px;
  background-color: #303030;
}

.game__cell--newborn {
  background-color: #9ae6c3;
}

.game__cell--alive {
  background-color: #42b883;
}

.game__generation {
  text-align: center;
  margin-top: 10px;
}

.btn {
  background-color: white;
  border: 2px solid;
}

.btn:hover {
  background-color: #303030;
  color: white;
}
</style>
