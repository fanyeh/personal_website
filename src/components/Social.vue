<template lang="pug">
  div(class="mt6 mt4 w-80 relative h-center")
    hr(class="light-silver bt")
    div(class="mv5 tc")
      div(class="br-circle dib relative social bg-mid-gray")
        a(href="https://www.linkedin.com/in/jack-yeh-50b66033/" target="_blank")
          i(class="fa fa-linkedin f3 white absolute abs-center" aria-hidden="true")
      div(class="br-circle dib relative social bg-mid-gray mh6")
        a(href="https://github.com/fanyeh/" target="_blank")
          i(class="fa fa-github f3 white absolute abs-center" aria-hidden="true")
      div(class="br-circle dib relative social bg-mid-gray")
        a(href="mailto:jack.ffy@gmail.com" target="_blank")
          i(class="fa fa-envelope f3 white absolute abs-center" aria-hidden="true")
</template>

<style scoped lang="scss">
.social {
  width:48px;
  height:48px;
  transform-origin: center center;
  &:hover {
    background-color:#111;
    animation:rotate .4s linear;
  }
}

@keyframes rotate {
  0% ,50% ,100% {
    transform:rotate(0deg) scale(1);
  }
  25% {
    transform:rotate(30deg) scale(1.15);
  }
  75%{
    transform:rotate(-30deg) scale(1.15);
  }
}

</style>
