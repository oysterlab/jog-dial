
// using built-in shadow on ShaderMaterial 
// https://stackoverflow.com/questions/18965283/three-js-no-shadows-on-shadermaterial
// http://blog.edankwan.com/post/three-js-advanced-tips-shadow

import * as THREE from 'three'
const { TweenMax, Back } = require('gsap')
const OrbitControls = require('three-orbitcontrols')

class JogDial { 
  constructor(canvas, {tickCount, tickLengthRatio, radiusRatio}, initIdx) {
    this.canvas = canvas
    const WIDTH = canvas.width
    const HEIGHT = canvas.height

    const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
    const camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.001, 1000)
    camera.position.z = 100
    const scene = new THREE.Scene()
    const bufferScene = new THREE.Scene()
    const bufferTexture = new THREE.WebGLRenderTarget(WIDTH, HEIGHT)

    const radius = 120
    const center = {
      x: 0, y: -140
    }
    const tickWidth = 0.32
    const tickHeight = 6.6
    const degRange = Math.PI * 0.26

    // ------ tick shader (bufferTexture)-----
    const ticks = []
    const tickGroup = new THREE.Group()
    tickGroup.position.x = center.x
    tickGroup.position.y = center.y
    for(let i = 0; i < tickCount; i++) {
      const deg = i / tickCount * degRange + Math.PI * 0.5
      const x = -Math.cos(deg) * radius
      const y = Math.sin(deg) * radius

      const tickGeometry = new THREE.PlaneBufferGeometry(tickWidth, tickHeight)
      const tickMaterial = new THREE.ShaderMaterial({
        uniforms: {
          tickSize: {
            type: 'v2', value: new THREE.Vector2(tickWidth, tickHeight)
          }
        },
        vertexShader: `
          varying vec2 vUv;
          uniform vec2 tickSize;
          void main() {
            vUv = (position.xy + (tickSize * 0.5)) * 1. / tickSize;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            float d = 1. - distance(vUv, vec2(0.5));
            d = smoothstep(0.2, 0.8, d);
            vec4 color = vec4(d);
            gl_FragColor = color;
          }
        `
      })
      const tick = new THREE.Mesh(tickGeometry, tickMaterial)
      tick.rotation.z = Math.atan2(y , x) - Math.PI * 0.5
      tick.position.set(x, y, 0.1)
      ticks.push({
        idx: i,
        deg,
        init: {
          position:  {
            x: tick.position.x,
            y: tick.position.y,
            z: tick.position.z,                        
          },
          scale:  {
            x: tick.scale.x,
            y: tick.scale.y,
            z: tick.scale.z,                        
          }
        },
        curr: {
          position:  {
            x: tick.position.x,
            y: tick.position.y,
            z: tick.position.z,                        
          },
          scale:  {
            x: tick.scale.x,
            y: tick.scale.y,
            z: tick.scale.z,                        
          }
        },
        mesh: tick
      })

      tickGroup.add(tick)
    }
    bufferScene.add(tickGroup)

    // ------ main shader (bufferTexture)-----


    const planeGemetry = new THREE.PlaneBufferGeometry(2, 2)

    const planeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_resolution: {
          type: 'v2', value: new THREE.Vector2(WIDTH, HEIGHT)
        },
        u_shadowMask: {
          type: 't', value: new THREE.ImageUtils.loadTexture(require('../../assets/shadow_mask.jpg'))
        },
        u_colorMask: {
          type: 't', value: new THREE.ImageUtils.loadTexture(require('../../assets/color_mask.jpg'))
        },
        u_bufferTexture: {
          type: 't', value: bufferTexture
        }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = (position.xy + 1.0) * 0.5;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D u_shadowMask;
        uniform sampler2D u_colorMask;
        uniform sampler2D u_bufferTexture;

        void main() {
          vec2 uv = vUv;

          vec4 s = texture2D(u_shadowMask, uv);
          vec4 c = texture2D(u_colorMask, uv);
          vec4 b = texture2D(u_bufferTexture, uv);

          vec4 color = s * c * b;
          gl_FragColor = color;
        }
      `
    })    
    const plane = new THREE.Mesh(planeGemetry, planeMaterial)
    scene.add(plane)

    this.renderer = renderer
    this.camera = camera
    this.bufferScene = bufferScene
    this.bufferTexture = bufferTexture
    this.scene = scene
    this.ticks = ticks
    this.tickGroup = tickGroup
    this.degRange = degRange
    this.currTickIdx = initIdx
    this.currDeg = 0
    this.center = center
    this.plane = plane

    // for debug
    // new OrbitControls(camera, renderer.domElement)

    this.tickCount = tickCount
    this.tickLengthRatio = tickLengthRatio
    this.radius = canvas.width * 0.5 * radiusRatio
    
    this.draw()
    this.nextTick(0, 0.0, true)
  }

  getCurrentTick() {
    return this.currTickIdx
  }

  draw() {
    const { renderer, camera, scene, bufferScene, bufferTexture, plane } = this

    renderer.setRenderTarget(bufferTexture)
    renderer.render(bufferScene, camera)
    
    plane.material.uniforms.u_bufferTexture.value = bufferTexture
    
    renderer.setRenderTarget(null)
    renderer.render(scene, camera)
    requestAnimationFrame(() => this.draw())
  }

  nextTick(dir, duration, isForce) {
    const { ticks, tickGroup, degRange } = this
    const prevTick = ticks[this.currTickIdx]
    this.currTickIdx += dir
    if (this.currTickIdx < 0) this.currTickIdx = 0
    if (this.currTickIdx >= ticks.length) this.currTickIdx = ticks.length - 1
    const currTick = ticks[this.currTickIdx]
    if (!isForce && (prevTick == currTick)) return

    const startDeg = tickGroup.rotation.z
    const endDeg = this.currTickIdx / ticks.length * degRange
    const diffDeg = endDeg - startDeg

    const anim = {progress: 0}
    
    if (this.tickAnim) {
      const pt = {progress: 0.0}
      const it = JSON.parse(JSON.stringify(prevTick.init))
      const ct = JSON.parse(JSON.stringify(prevTick.curr))
      TweenMax.to(pt, 0.8, {
        progress: 1.,  
        ease: Back.easeOut.config(1.1),
        onUpdate: function() {
          const nextPosition = {
            x: ct.position.x + (it.position.x - ct.position.x) * pt.progress,
            y: ct.position.y + (it.position.y - ct.position.y) * pt.progress,
            z: ct.position.z + (it.position.z - ct.position.z) * pt.progress,                        
          }
          const nextScale = {
            x: ct.scale.x + (it.scale.x - ct.scale.x) * pt.progress,
            y: ct.scale.y + (it.scale.y - ct.scale.y) * pt.progress,
            z: ct.scale.z + (it.scale.z - ct.scale.z) * pt.progress,                        
          }

          prevTick.mesh.position.x = prevTick.curr.position.x = nextPosition.x
          prevTick.mesh.position.y = prevTick.curr.position.y = nextPosition.y
          prevTick.mesh.position.z = prevTick.curr.position.z = nextPosition.z

          prevTick.mesh.scale.x = prevTick.curr.scale.x = nextScale.x
          prevTick.mesh.scale.y = prevTick.curr.scale.y = nextScale.y
          prevTick.mesh.scale.z = prevTick.curr.scale.z = nextScale.z        
        }
      })
      this.tickAnim.kill()
    }

    this.tickAnim = TweenMax.to(anim, duration, {
      progress: 1.,
      ease: Back.easeOut.config(1.1),
      onUpdate: function() {
        const nextDeg = startDeg + diffDeg * anim.progress
        tickGroup.rotation.z = nextDeg

        const posZ = currTick.init.position.z - 24 * anim.progress

        const scaleX = currTick.init.scale.x + 1.2 * anim.progress
        const scaleY = currTick.init.scale.y + 1.2 * anim.progress

        currTick.mesh.position.z = posZ
        currTick.mesh.scale.x = scaleX
        currTick.mesh.scale.y = scaleY

        currTick.curr.position.z = posZ
        currTick.curr.scale.x = scaleX
        currTick.curr.scale.y = scaleY
      }
    })
  }
}

export default JogDial