<template>
  <div id="app">
    <JogDial class='volume' :channel='0' />
  </div>
</template>

<script>
import JogDial from './components/JogDial'

export default {
  name: 'app',
  components: {
    JogDial
  }
}
</script>

<style>

body {
  background: #000
}

.volume {
    position: absolute;
    left: 0px;
    top: 0px;    
    width: 100%;
    height: 100%;
}
</style>
