<template lang="pug">
  div(class="mt6-ns mt5 w-80 center")
    hr(class="light-silver bt")
    div(class="top--2-ns top-c h-center f2-ns f3 bg-white relative ph5-ns ph4 dib") Vue.js

    div
      div(class="h-center mt5-ns dib relative black-80 f4-ns f5") [ Infinite Carousel ]
    carousel

    div
      div(class="h-center mt5-ns mb4 mt1 dib relative black-80 f4-ns f5") [ Datatable ]
    datatable

    div
      div(class="h-center mt6-ns mb3 mt5 dib relative black-80 f4-ns f5 tc") [ Pieces ]
        p(class="tc f5 mid-gray mb0") click image to see the effect
    pieces

  </div>
</template>

<script>
import Carousel from 'vue_project/Carousel/Carousel'
import Pieces from 'vue_project/Pieces/Pieces'
import Datatable from 'vue_project/Datatable/Datatable'
export default {
  name: 'vueItem',
  components: {
    Carousel,
    Pieces,
    Datatable
  }
}
</script>
