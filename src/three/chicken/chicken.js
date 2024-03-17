import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import chicken3DUrl from '../../assets/three/chicken/chicken.glb?url'

let camera, scene, renderer, model, controls
const chickenHtmlElement = document.getElementById('chicken_3d')

function initThreeJs() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  renderer = new THREE.WebGLRenderer()

  renderer.setSize(window.innerWidth, window.innerHeight)
  chickenHtmlElement.appendChild(renderer.domElement)

  scene.background = new THREE.Color(0xffffff)
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.screenSpacePanning = false
  controls.minDistance = 15
  controls.maxDistance = 20
  controls.update()

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3)
  hemiLight.position.set(0, 20, 0)
  scene.add(hemiLight)

  const loader = new GLTFLoader()
  loader.load(chicken3DUrl, function (geometry) {
    model = geometry.scene
    model.position.set(5, 0, 0)

    scene.add(model)

    model.traverse(function (object) {
      if (object.isMesh) object.castShadow = true
    })
  })

  camera.position.set(0, 0, 15)
  camera.lookAt(0, 0, 0)

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  function animate() {
    requestAnimationFrame(animate)

    if (model) {
      model.rotation.y += -0.01
    }

    controls.update()

    renderer.render(scene, camera)
  }

  window.addEventListener('resize', onWindowResize)

  animate()
}

initThreeJs()
