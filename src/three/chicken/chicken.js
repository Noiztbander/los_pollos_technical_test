import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
let model

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
const chickenHtmlElement = document.getElementById('chicken_3d')
chickenHtmlElement.appendChild(renderer.domElement)

scene.background = new THREE.Color(0xffffff)
const controls = new OrbitControls(camera, renderer.domElement)
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
loader.load('src/assets/three/chicken/chicken.glb', function (gltf) {
  model = gltf.scene
  model.position.set(5, 0, 0)

  scene.add(model)

  model.traverse(function (object) {
    if (object.isMesh) object.castShadow = true
  })
})

camera.position.set(0, 0, 15)
camera.lookAt(0, 0, 0)

function animate() {
  requestAnimationFrame(animate)

  model.rotation.y += -0.01
  controls.update()

  renderer.render(scene, camera)
}

animate()
