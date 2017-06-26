<template>
  <div id="calcualtor">
    <p>I am a Calculator!</p>
    <div id="screen">{{screen}}</div>
    <table>
      <tr>
        <td>
          <CalculatorButton calcId="1" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="2" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="3" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="+" @calcAction="calculate"></CalculatorButton>
        </td>
      </tr>
      <tr>
        <td>
          <CalculatorButton calcId="4" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="5" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="6" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="-" @calcAction="calculate"></CalculatorButton>
        </td>
      </tr>
      <tr>
        <td>
          <CalculatorButton calcId="7" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="8" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="9" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="x" @calcAction="calculate"></CalculatorButton>
        </td>
      </tr>
      <tr>
        <td>
          <CalculatorButton calcId="C" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="0" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="=" @calcAction="calculate"></CalculatorButton>
        </td>
        <td>
          <CalculatorButton calcId="÷" @calcAction="calculate"></CalculatorButton>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */
import CalculatorButton from './CalculatorButton'

export default {
  name: 'calculator',
  components: {
    CalculatorButton
  },
  data() {
    return {
      input: 0,
      equation: [],
      screen: 0
    }
  },
  methods: {
    calculate(action) {
      if (isNaN(action)) {
        this.equation.push(this.input)
        this.input = 0
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
          this.screen = eval(this.equation.join(''))
          this.equation = []
          break
        case 'C':
          this.input = 0
          this.screen = this.input
          this.equation = []
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
div {
  text-align: center;
}

table {
  margin: auto;
}

td {
  width: 50px;
}

#screen {
  border: solid 2px #42b883;
  width: 295px;
  height: 30px;
  margin: auto;
  text-align: right;
  padding-right: 8px;
  border-radius: 10px;
  font-size: 20px;
}

p {
  color: #42b883;
  font-size: 25px;
  margin-bottom: 20px;
}

#calcualtor {
  transform: translateY(-25%);
}
</style>
