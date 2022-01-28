import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'dat.gui'
import { DoubleSide, PointLightHelper } from 'three'
import gsap from 'gsap/all';
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import girlImage from '../static/assets/images/bluegirl.jpg';
import fabricWaves from '../static/assets/images/fabricwaves.jpg';
import bluemilk from '../static/assets/images/milk.jpg';
import placeHolder1 from "../static/assets/images/shaderPlaceholder1.jpg";
import placeHolder2 from "../static/assets/images/shaderPlaceholder2.png";

gsap.registerPlugin(ScrollTrigger)

const loadingImages = (targetElementClass, imageSrc) => {
    const targetElement = document.querySelector(targetElementClass)
    targetElement.src = imageSrc
    targetElement.loading = "lazy"
}

loadingImages(".blue--girl", girlImage)
loadingImages(".experience__container--canvas", placeHolder1)
loadingImages(".blue--fabric", fabricWaves)
loadingImages(".observe__container--canvas", placeHolder2)
loadingImages(".blue--milk", bluemilk)

/**
 * Mouse cursor
 */
const cursor = document.querySelector(".cursor")

let mouseXY = {}

const mousemoveHandler = (e) => {
    mouseXY.x = e.clientX,
        mouseXY.y = e.clientY

    gsap.to(cursor, 0.2, {
        opacity: 1,
        ease: "power2.out",
        css: {
            left: mouseXY.x,
            y: mouseXY.y
        }
    })
}

const mouseleaveHandler = (e) => {
    gsap.to(cursor, {
        opacity: 0,
    })
}

window.addEventListener("mousemove", mousemoveHandler)
window.addEventListener("mouseleave", mouseleaveHandler)

const cursorExp = [...document.querySelectorAll(".cursor--exp")]

const cursorExpand = (e) => {
    gsap.to(cursor, {
        scale: 0.5,
        backgroundColor: "white",
        x: -25,
    })
}

const cursorDespand = (e) => {
    gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        x: 0,
    })
}

cursorExp.forEach((el) => {
    el.addEventListener("mousemove", cursorExpand)
    el.addEventListener("mouseout", cursorDespand)
})


gsap.registerPlugin(ScrollTrigger)

/**
 * GSAP Animations
 */
// Section Header Animations
const sectionHeaders = [...document.querySelectorAll(".section--header")]
sectionHeaders.forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        },
        y: -50
    })
})

// Section Link Animations
const sectionLinks = [...document.querySelectorAll(".section--link")]
sectionLinks.forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "-=300 bottom",
            end: "bottom top",
            scrub: 1,
        },
        y: 100
    })
})

// Nav Animations
gsap.from(".navigation", {
    duration: 2,
    delay: 1,
    opacity: 0
})

// Banner Animations
gsap.from(".banner__textContainer--topText, .banner__textContainer--bottomText", {
    duration: 2,
    delay: 2,
    opacity: 0,
    stagger: 0.5
})

gsap.to(".banner__canvasContainer", {
    duration: 6,
    // delay: 2,
    opacity: 1,
    top: "0%",
    ease: "power2.out"
})

let bannerTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".banner",
        start: "top top",
        end: "bottom 80%",
        scrub: 1,
    }
})

bannerTl.to(".banner__textContainer--topText", {
    y: -10,
}).to(".banner__textContainer--bottomText", {
    y: 10,
}, "<").to(".banner__canvasContainer", {
    scale: 1.2
}, "<<")

// Sculpt Animations
const scultOutlines = [...document.querySelectorAll(".sculpt--outline")]
scultOutlines.forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        stagger: 100,
        x: 75

    })
})

gsap.to(".blue--girl", {
    scrollTrigger: {
        trigger: ".blue--girl",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
    },
    y: 50
})


// Experience and Observe Animations
const expAndObsBorders = [...document.querySelectorAll(".container--border")]
expAndObsBorders.forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        },
        scale: 0.7
    })
})

const expAndObsCanvas = [...document.querySelectorAll(".container--canvas")]
expAndObsCanvas.forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        },
        scale: 1.25
    })
})

const expAndObsText = [...document.querySelectorAll(".canvas--text")]
expAndObsText.forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        },
        scale: 0.7
    })
})

// Earn Animations
// Anim for bg on small-med screens
window.addEventListener("resize", (e) => {
    if (window.innerWidth < 1050) {
        gsap.to(".earn__bg", {
            scrollTrigger: {
                trigger: ".earn__bg",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
            x: 50
        })
    } else {
        gsap.to(".earn__bg", {
            scrollTrigger: {
                trigger: ".earn__bg",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
            y: 50
        })
    }
})


// desktop anim here

gsap.to(".earn__image", {
    scrollTrigger: {
        trigger: ".earn__image",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
    },
    y: 50
})


// Social Animations 
const socialTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".social__container",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
    }
})

socialTl.fromTo(".social__bgTop", {
    opacity: 0,
    x: -100,
}, {
    opacity: 1,
    x: 100,
}).fromTo(".blue--milk", {
    opacity: 0,
}, {
    opacity: 1,
    y: 50
}, "<").to(".social__bgBot", {
    x: -100
}, "<<")

// Footer Animations
const footerTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
    },
})

footerTl.fromTo(".footer__text", {
    opacity: 0,
    y: 100
}, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"

}).fromTo(".footer__inputLinks", {
    opacity: 0
}, {
    opacity: 1,
    duration: 1
})


/**
 * Base
 */
// Canvas
const canvasEl = document.querySelector('.banner__canvasContainer--canvas')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0B0C10)

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

/**
 * Torus
 */
const torusGeo = new THREE.TorusKnotBufferGeometry(5, 1, 4096, 6)


const getMaterial = () => {
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x3f07c5,
        metalness: 1

    })

    material.onBeforeCompile = function (shader) {
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

            vec3 a = vec3(0.5, 0.5, 5.5);
              vec3 b = vec3(0.5, 1.0, 5.5);
              vec3 c = vec3(1.0, 1.0, 1.0);
              vec3 d = vec3(0.0, 0.0, 0.0);
           
           vec3 cc =  a + b / cos(2.*3.141592*(c*diff+d + uTime/20.0));
           
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
    canvas: canvasEl,
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

const updateLight = () => {
    PointLightHelper.update()
}

/**
 * Mouse Interactions
 */



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

    if (material.userData.shader) {
        material.userData.shader.uniforms.uTime.value = elapsedTime
        // material.userData.shader.uniforms.uMouse.value = mouseKnotXY
    }


    torusOne.rotation.y = elapsedTime / 3
    torusOne.rotation.z = elapsedTime / 10

    torusOne.rotation.y = -mouseXY.x / 2000
    torusOne.rotation.z = mouseXY.y / 2000

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
console.log(torusOne)

tick()
