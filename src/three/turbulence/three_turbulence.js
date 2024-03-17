import * as THREE from 'three'

const fragmentShader = `
#include <common>

uniform vec3 iResolution;
uniform float iTime;

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
	float mr = min(iResolution.x, iResolution.y);
	vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

	float d = -iTime * 0.5;
	float a = 0.0;
	for (float i = 0.0; i < 8.0; ++i) {
		a += cos(i - d - a * uv.x);
		d += sin(uv.y * i + a);
	}
	d += iTime * 0.5;
	vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
	col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
	fragColor = vec4(col,1.0);
}

void main() {
	mainImage(gl_FragColor, gl_FragCoord.xy);
}
`
const turbulenceHtmlElement = document.getElementById('turbulence_bg')
const renderer = new THREE.WebGLRenderer()
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const canvas = renderer.domElement
const scene = new THREE.Scene()
let camera = new THREE.OrthographicCamera()
camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)
const plane = new THREE.PlaneGeometry(2, 2)
let uniforms = {
  iTime: { value: 0 },
  iResolution: { value: new THREE.Vector2() },
}

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.autoClearColor = false

const material = new THREE.ShaderMaterial({
  fragmentShader,
  uniforms,
})

function animate(time) {
  requestAnimationFrame(animate)
  time *= 0.0001
  uniforms.iResolution.value.set(canvas.width, canvas.height)
  uniforms.iTime.value = time

  renderer.render(scene, camera)
}

turbulenceHtmlElement.appendChild(renderer.domElement)
scene.add(new THREE.Mesh(plane, material))

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

animate()
