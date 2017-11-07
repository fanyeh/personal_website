<template lang="pug">
  div(class="mt6-ns mt5 w-80 center")
    hr
    div(class="top--2-ns top-c h-center f2-ns f3 bg-white relative ph5-ns ph4 dib") CSS

    div
      div(class="h-center mt5 mb4 dib relative black-80 f4-ns f5") [ Bird Loader ]
    bird-loader
    
    div
      div(class="h-center mt6 mb4 dib relative black-80 f4-ns f5 ") [ Double Helix Loader ]
    spiral-loader

    div
      div(class="h-center mt6 mb4 dib relative black-80 f4-ns f5 ") [ Dash Loader ]
    dash-loader

</template>

<script>

import BirdLoader from 'pureCSS/BirdLoader'
import SpiralLoader from 'pureCSS/SpiralLoader'
import DashLoader from 'pureCSS/DashLoader'
export default {
  name: 'cssItem',
  components: {
    BirdLoader,
    SpiralLoader,
    DashLoader
  }
}
</script>
