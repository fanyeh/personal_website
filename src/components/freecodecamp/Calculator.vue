<template>
  <div class="calculator">
    <table>
      <tr>
        <td class="calculator__equation" colspan="4">{{equationString}}</td>
      </tr>
      <tr>
        <td class="calculator__screen" colspan="4">{{screen}}</td>
      </tr>
      <tr>
        <td @click="calculate(1)">1</td>
        <td @click="calculate(2)">2</td>
        <td @click="calculate(3)">3</td>
        <td class="calculator__operator" @click="calculate('+')">+</td>
      </tr>
      <tr>
        <td @click="calculate(4)">4</td>
        <td @click="calculate(5)">5</td>
        <td @click="calculate(6)">6</td>
        <td class="calculator__operator" @click="calculate('-')">-</td>
      </tr>
      <tr>
        <td @click="calculate(7)">7</td>
        <td @click="calculate(8)">8</td>
        <td @click="calculate(9)">9</td>
        <td class="calculator__operator" @click="calculate('x')">x</td>
      </tr>
      <tr>
        <td class="calculator__clear" @click="calculate('C')">C</td>
        <td @click="calculate(0)">0</td>
        <td class="calculator__operator" @click="calculate('=')">=</td>
        <td class="calculator__operator" @click="calculate('÷')">÷</td>
      </tr>
    </table>
  
    <div class="calculator__footer">
      <a href="https://dribbble.com/shots/2311064-Calculator" target="_blank">Inspired by Oleg Frolov@dribbble</a>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'calculator',
  data() {
    return {
      input: 0,
      equation: [],
      screen: 0,
      equationString: ''
    }
  },
  methods: {
    calculate(action) {
      if (isNaN(action)) {
        this.equation.push(this.input)
        this.input = 0
        this.equationString += ` ${action} `
      } else {
        this.equationString += action
      }

      switch (action) {
        case '+':
          this.equation.push('+')
          break
        case '-':
          this.equation.push('-')
          break
        case 'x':
          this.equation.push('*')
          break
        case '÷':
          this.equation.push('/')
          break
        case '=':
          // eslint-disable-next-line
          let result = eval(this.equation.join(''))
          this.screen = parseInt(result) === result ? result : Number(result).toFixed(2)
          this.equation = []
          this.equationString = this.screen
          this.input = this.screen
          break
        case 'C':
          this.input = 0
          this.screen = this.input
          this.equation = []
          this.equationString = ''
          break
        default:
          this.input = (this.input * 10) + action * 1
          this.screen = this.input
          break
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped style="scss">
.calculator {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
}

table {
  margin: auto;
  clip-path: inset(5px round 10px);
  background-color: #374352;
  color: white;
  border: 1px solid #3d4856;
}

.calculator__screen {
  text-align: right;
  font-size: 70px;
  height: 105px;
  padding-right: 18px;
  font-weight: 100;
}

.calculator__equation {
  text-align: right;
  padding-right: 18px;
  color: #78838c;
  height: 40px;
}

.calculator__operator {
  color: #78838c;
}

.calculator__clear {
  color: #dc6053;
}

.calculator__footer {
  margin-top: 30px;
  text-align: center;
}

a {
  color: #374352;
}

table>tr>td:not(.calculator__screen):not(.calculator__equation) {
  width: 70px;
  height: 70px;
  font-size: 25px;
  font-weight: 100;
  text-align: center;
  border: 1px solid #3d4856;
}

table>tr>td:active:not(.calculator__screen):not(.calculator__equation) {
  background-color: white;
  color: #3d4856;
}
</style>
