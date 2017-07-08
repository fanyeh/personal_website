<template>
  <div id="app" class="jumbotron receipe">
    <div v-for="(receipe ,index) in receipeBook" :key="index">
      <h1 class="receipe__title" @click="showIngredients(index)">{{receipe.title}}</h1>
      <div v-if="receipe.showIngredients">
        <h4>Ingredients</h4>
        <ul class="list-group">
          <li class="list-group-item" v-for="(ingredient,idx) in receipe.ingredients" :key="idx">{{ingredient}}</li>
        </ul>
        <br>
        <button class="btn btn-danger" @click="deleteReceipe(index)">Delete</button>
        <button class="btn btn-info" @click="showEdit(index)">Edit</button>
      </div>
    </div>
    <br>
    <button class="btn btn-primary" @click="addReceipe">Add new receipe</button>
    <div class="_modal" v-if="add">
      <div class="receipe--new jumbotron">
        <div class="form-group">
          <label>Receipe</label>
          <input type="text" class="form-control" v-model="newReceipe"></input>
        </div>
        <div class="form-group">
          <label>Ingredients</label>
          <input type="text" class="form-control" v-model="newIngredients"></input>
        </div>
        <button class="btn btn-primary" @click="setReceipe">Add Receipe</button>
        <button class="btn btn-default" @click="closeAdd">Close</button>
      </div>
    </div>
    <div class="_modal" v-if="edit">
      <div class="receipe--edit jumbotron">
        <div class="form-group">
          <label>Receipe</label>
          <input type="text" class="form-control" v-model="receipe.title"></input>
        </div>
        <div class="form-group">
          <label>Ingredients</label>
          <input type="text" class="form-control" v-model="editIngredients"></input>
        </div>
        <button class="btn btn-success" @click="updateReceipe">Update</button>
        <button class="btn btn-default" @click="closeReceipe">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      receipeBook: [],
      receipe: {},
      newReceipe: '',
      newIngredients: [],
      editIngredients: '',
      edit: false,
      editIndex: '',
      preOpenReceipeIndex: [],
      add: false
    }
  },
  methods: {
    setReceipe() {
      this.receipeBook.push({ 'title': this.newReceipe, 'ingredients': this.newIngredients, 'showIngredients': false })
      localStorage.setItem('receipeBook', JSON.stringify(this.receipeBook))
    },
    showIngredients(index) {
      // Close previous receipe
      if (this.preOpenReceipeIndex.length === 0) {
        this.preOpenReceipeIndex.push(index)
        this.toggleReceipe(index)
      } else {
        let preIndex = this.preOpenReceipeIndex.shift()
        this.toggleReceipe(preIndex)
        if (preIndex !== index) {
          this.preOpenReceipeIndex.push(index)
          this.toggleReceipe(index)
        }
      }
    },
    toggleReceipe(index) {
      let receipe = this.receipeBook[index]
      receipe.showIngredients = !receipe.showIngredients
      this.$set(this.receipeBook, index, receipe)
    },
    updateReceipe() {
      this.receipe.ingredients = this.editIngredients.split(',')
      this.receipeBook[this.editIndex] = this.receipe
      localStorage.setItem('receipeBook', JSON.stringify(this.receipeBook))
    },
    closeReceipe() {
      this.edit = false
    },
    addReceipe() {
      this.add = true
    },
    closeAdd() {
      this.add = false
    },
    showEdit(index) {
      this.edit = true
      this.receipe = this.receipeBook[index]
      this.editIngredients = this.receipe.ingredients.join(',')
      this.editIndex = index
    },
    deleteReceipe(index) {
      this.receipeBook.splice(index, 1)
      localStorage.setItem('receipeBook', JSON.stringify(this.receipeBook))
    }
  },
  mounted() {
    // localStorage.clear()
    if (!localStorage.getItem('receipeBook')) {
      localStorage.setItem('receipeBook', JSON.stringify([
        { title: 'Pumpkin Pie', ingredients: ['Pumpkin Puree', 'Sweetened Condensed Milk', 'Eggs', 'Pumpkin Pie Spice', 'Pie Crust'] },
        { title: 'Spaghetti', ingredients: ['Noodles', 'Tomato Sauce', '(Optional) Meatballs'] },
        { title: 'Onion Pie', ingredients: ['Onion', 'Pie Crust', 'Sounds Yummy right?'] }
      ]))
    }
    this.receipeBook = JSON.parse(localStorage.getItem('receipeBook'))
  }
}

</script>

<style scoped lang="scss">
.receipe {
  text-align: left;
}

.receipe__title:hover {
  text-decoration: underline;
}

.receipe--edit,
.receipe--new {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  transform: translate(-50%, -50%);
}

._modal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
}

@media (max-width:576px) {
  .receipe {
    transform: scale(0.95);
  }
}
</style>
