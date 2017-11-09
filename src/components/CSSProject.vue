<template lang="pug">
  #cssProject(class="mt6-ns mt5 w-80 center")
    hr(class="light-silver bt")
    div(class="top--2-ns top-c h-center f2-ns f3 bg-white relative ph5-ns ph4 dib") CSS

    div
      a(href="https://codepen.io/fanyeh/pen/QMqwwW" target="_blank")
        div(class="h-center mt5 mb4 dib relative mid-gray f4-ns f5") [ Bird Loader
          i(class="fa fa-codepen light-blue ml2" aria-hidden="true") 
          span(class="pl1 mid-gray f4-ns f5") ] 
    bird-loader
    
    div
      a(href="https://codepen.io/fanyeh/pen/wqjVmr" target="_blank")
        div(class="h-center mt6 mb4 dib relative mid-gray f4-ns f5") [ Double Helix Loader
          i(class="fa fa-codepen light-blue ml2" aria-hidden="true") 
          span(class="pl1 mid-gray f4-ns f5") ] 
    spiral-loader

    div
      a(href="https://codepen.io/fanyeh/pen/xLeaXv" target="_blank")
        div(class="h-center mt6 mb4 dib relative mid-gray f4-ns f5") [ Dash Loader
          i(class="fa fa-codepen light-blue ml2" aria-hidden="true") 
          span(class="pl1 mid-gray f4-ns f5") ] 
    dash-loader

</template>

<script>

import BirdLoader from 'css_project/BirdLoader'
import SpiralLoader from 'css_project/SpiralLoader'
import DashLoader from 'css_project/DashLoader'
export default {
  name: 'cssProject',
  components: {
    BirdLoader,
    SpiralLoader,
    DashLoader
  }
}
</script>
