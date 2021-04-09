<template>
  <div class="slider-item" v-nicescroll="niceScrollOption">
    <slot></slot>
  </div>
</template>

<script>
  import niceScroll from '../../NiceScroll.js'
  export default {
    mounted () {
      const sliderContent = this.$parent

      sliderContent.$parent.newItem(this.$el)
    },
    directives:{
      "nicescroll":niceScroll
    },
    data () {
     return{
       niceScrollOption:{
         delaybind:500,
         styler:'fb',
         cursorcolor:"#0c151f",
         background: '#192a3e',
         cursorwidth: '6',
         cursorborder:"3px solid rgba(19,88,148,0)",
         cursorborderradius: '12px',
         cursoropacitymin :1,
         spacebarenabled:false,
         zindex: '9999999999999'
       }
     }
    }
  }
</script>

<style scoped>
  .slider-item {
    float: left;

    width: 100%;
    height: 100%;
  }
</style>
