import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect.js';
import { GUI } from 'dat.gui'
import { DoubleSide, PointLightHelper } from 'three'



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x131313)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 20
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Torus
 */
const torusGeo = new THREE.TorusKnotBufferGeometry(5, 1, 4096, 6)
// const torusGeo = new THREE.SphereGeometry(5, 64)


const getMaterial = () => {
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x3f07c5,
        metalness: 1
        
    })

    material.onBeforeCompile = function(shader) {
        shader.uniforms.uTime = { value: 0.0 }

        shader.vertexShader = `uniform float uTime;\n` + shader.vertexShader

        shader.vertexShader = shader.vertexShader.replace(
            "#include <logdepthbuf_vertex>",
            `

            vec3 vPos = position;
            
            // position.z += sin(position.x + uTime);

            vPos.x += sin(position.z + uTime)*0.5;
            vPos.z += sin(position.y + uTime)*(-2.5*smoothstep(0.0, 0.5, sin(0.3)));
            vPos.y += sin(position.x + uTime);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1.0);
            ` + `#include <logdepthbuf_vertex>`
        )
        shader.fragmentShader = `uniform float uTime;\n` + shader.fragmentShader

        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <logdepthbuf_fragment>",
            `
           float diff = dot(vec3(1),vNormal);

           vec3 a = vec3(.2, 0.2, 1.0);
           vec3 b = vec3(0.5, .5, 0.5);
    	   vec3 c = vec3(0.12, 1.0, 10.0);
           vec3 d = vec3(0.30, 2.20, 0.20);
           
           vec3 cc =  a + b / cos(2.*3.141592*(c*diff+d + uTime/3.0));
           
           diffuseColor.rgb = vec3(diff, 0.0, 0.0);
           diffuseColor.rgb = cc;
            ` + `#include <logdepthbuf_fragment>`
        )
        material.userData.shader = shader
    }

    return material
}

const material = getMaterial()

const torusOne = new THREE.Mesh(torusGeo, material)
// torusOne.rotation.y = Math.PI / 2
scene.add(torusOne)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.localClippingEnabled = true


/**
 * Lighting
 */
//Point Light
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(0, 5, 10)
scene.add(pointLight)
// const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

//Ambient Light
// const ambLight = new THREE.AmbientLightProbe(0xffffff, 1)
// scene.add(ambLight)

const updateLight = () => {
    PointLightHelper.update()
}

/**
 * GUI
 */
// Color gui
class ColorGUIHelper {
    constructor(object, prop){
        this.object = object
        this.prop = prop
        console.log(this.object)
    }   
    get value() {
        return `#${this.object[this.prop].getHexString()}`
    }
    set value(hexString) {
        this.object[this.prop].set(hexString)
    }
}

// const gui = new GUI()
// gui.addColor(new ColorGUIHelper(pointLight, "color"), "value").name("PointLight Color")
// gui.add(pointLight, "intensity", 0, 2, 0.01)
// gui.add(pointLight, "distance", 0, 100).onChange(updateLight)


const makeXYZGUI = (gui, vec3, name, onChangeFn = undefined) => {
    const folder = gui.addFolder(name)
    folder.add(vec3, "x", -10, 10).onChange(onChangeFn)
    folder.add(vec3, "y", -10, 10).onChange(onChangeFn)
    folder.add(vec3, "z", -10, 10).onChange(onChangeFn)
    folder.open()
}

// makeXYZGUI(gui, pointLight.position, "position", updateLight)


/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

let t

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime
    
    if(material.userData.shader) {
        material.userData.shader.uniforms.uTime.value = elapsedTime
    }
    
    torusOne.rotation.z += deltaTime/2
    torusOne.rotation.y += deltaTime/4
    // pointLight.position.x += Math.sin(elapsedTime)/10
    // pointLight.intensity += Math.sin(elapsedTime)/100
    
    // pointLight.position.x = THREE.MathUtils.lerp(-5, 5, Math.abs(Math.sin(elapsedTime)))

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
