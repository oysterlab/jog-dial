<template>
  <div>
    <canvas ref='canvas' v-bind:width='this.width' v-bind:height='this.height'/>
    <div class='channel'>{{currentChannel}}</div>
  </div>
</template>

<script>
import JogDial from './JogDial'

export default {
  name: 'jog-dial',
  data: function() {
    return {
      currentChannel: this.channel
    }
  },
  props: {
    tickCount: {
      type: Number,
      default: 60
    },
    tickLengthRatio: {
      type: Number,
      default: 0.07
    },
    radiusRatio: {
      type: Number,
      default: 1.4
    },
    width: {
      type: Number,
      default: window.innerWidth
    },
    height: {
      type: Number,
      default: window.innerHeight
    },
    channel: {
      type: Number,
      default: 1
    }
  },
  mounted: function() {

    const jogDial = new JogDial(this.$refs.canvas, {
      tickCount: this.tickCount,
      tickLengthRatio: this.tickLengthRatio,
      radiusRatio: this.radiusRatio
    }, this.channel)

    let isMousedown = false
    let prevDir = 0 
    const basePosition = {
      x: -1, y: -1
    }
    const currPosition = {
      x: -1, y: -1
    }

    const ACC = 0.05
    let vel = 0.0

    let TRACING_DELAY = 300
    let tracingStartTime = 0

    const moveTick = () => {
      if (!isMousedown) return

      const currentTime = (new Date()).getTime()
      let v = (1.0 - vel)
      if (v > 1.0) v = 1.0 - (v - 1.0)
      const tracingDelay = TRACING_DELAY * 0.2 + v * TRACING_DELAY * 0.8
      if ((currentTime - tracingStartTime) < tracingDelay) return
      tracingStartTime = (new Date()).getTime()

      const { x, y } = currPosition
      
      const dir = Math.sign(x - basePosition.x)
      vel += (dir * ACC)
      vel *= 0.95
      if (Math.abs(vel) > 1.0) vel = Math.sign(vel)

      const duration = 0.2 + 0.5 * tracingDelay / TRACING_DELAY
      jogDial.nextTick(dir, duration)
      this.currentChannel = jogDial.getCurrentTick() + 1
    }

    setInterval(() => {
      moveTick()
    }, 10)

    window.addEventListener('mousedown', (e) => {
      isMousedown = true
      basePosition.x = e.clientX
      basePosition.y = e.clientY

      tracingStartTime = (new Date()).getTime()
    })


    window.addEventListener('mousemove', (e) => {
      if (!isMousedown) return
      currPosition.x = e.clientX
      currPosition.y = e.clientY   
      
      const currDir = Math.sign(currPosition.x - basePosition.x)
      if (prevDir != currDir) vel = 0
      prevDir = currDir
    })

    window.addEventListener('mouseup', (e) => {
        isMousedown = false
        vel = 0
        // jogDial.nextTick(0, 0.2)
    })

  }
}
</script>

<style scoped>
  .channel {
    color: #fff;
    position: absolute;
    font-size: 50px;
    left: 50%;
    bottom: 8%;
    transform: translateX(-50%);
  }
</style>
