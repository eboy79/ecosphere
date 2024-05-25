import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);
import './page-load-info.js';
// other imports and code
import { TextScramble, initTickerRows, applyTextRevealAnimation, applyTextHideAnimation, initWordStack } from './animations';


gsap.defaults({ ease: "none", duration: 1 });
//initTickerRows(["ERIC", "CLAY", "MINE", "RRRR"]);

// Initialize Scramble Text
const el = document.querySelector('.scramble');
const scrambler = new TextScramble(el);

const phrases = ["Hello, World!", "Welcome to the Site", "Enjoy Your Visit", "Thank You!"];
let counter = 0;

const nextPhrase = () => {
    scrambler.setText(phrases[counter]).then(() => {
        setTimeout(nextPhrase, 800);
    });
    counter = (counter + 1) % phrases.length;
};

// Initialize Splitting.js (example)
Splitting();

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
  
  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)

requestAnimationFrame(raf);

document.addEventListener('DOMContentLoaded', () => {
    const bodyClass = document.body.className;

    if (bodyClass.includes('home')) {
        if (typeof wordStackData !== 'undefined') {
            console.log('wordStackData:', wordStackData);
            const words = wordStackData.words;
            console.log('Initializing word stack with:', words);
            initWordStack(words);
            initTickerRows([
                ["THIS", true],
                ["SHIT", true],
                ["RIGHT", true],
                ["HERE", true]
            ]);
        }
    } else if (bodyClass.includes('page-template-template-stl-viewer')) {

        

    } else if (bodyClass.includes('services-page')) {
        console.log("Services page detected");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menuContainer = document.getElementById('menu-container');
    const menuItems = menuContainer.querySelectorAll('li');

    let menuOpen = false;

    menuToggle.addEventListener('click', () => {
        if (!menuOpen) {
            gsap.to(menuContainer, { duration: 0.5, display: 'block', width: '250px' });
            gsap.to(menuItems, { duration: 0.5, opacity: 1, x: 0, stagger: 0.1 });
            menuOpen = true;
        } else {
            gsap.to(menuItems, { duration: 0.5, opacity: 0, x: -20, stagger: 0.1 });
            gsap.to(menuContainer, { duration: 0.5, width: '0', display: 'none', delay: 0.5 });
            menuOpen = false;
        }
    });

    document.addEventListener('click', (e) => {
        if (menuOpen && !menuContainer.contains(e.target) && e.target !== menuToggle) {
            gsap.to(menuItems, { duration: 0.5, opacity: 0, x: -20, stagger: 0.1 });
            gsap.to(menuContainer, { duration: 0.5, width: '0', display: 'none', delay: 0.5 });
            menuOpen = false;
        }
    });
});
const bodyClass = document.body.className;
if (bodyClass.includes('page-template-test-page')) {
    console.log("Sample Page detected");

const section_1 = document.getElementById("vertical");
const col_left = document.querySelector(".col_left");
const timeln = gsap.timeline({ paused: true });

timeln.fromTo(col_left, {y: 0}, {y: '170vh', duration: 1, ease: 'none'}, 0);

const scroll_1 = ScrollTrigger.create({
    animation: timeln,
    trigger: section_1,
    start: 'top top',
    end: 'bottom center',
    scrub: true
});

const section_2 = document.getElementById("horizontal");
let box_items = gsap.utils.toArray(".horizontal__item");

gsap.to(box_items, {
  xPercent: -100 * (box_items.length - 1),
  ease: "sine.out",
  scrollTrigger: {
    trigger: section_2,
    pin: true,
    scrub: 3,
    snap: 1 / (box_items.length - 1),
    end: "+=" + section_2.offsetWidth
  }
});
}




// Check if the current page is '3dprinting'
if (typeof pageData !== 'undefined' && pageData.page_slug === '3d') {
    // Your code specific to the '3dprinting' page
    console.log('This is the 3dprinting page.');

    document.addEventListener('DOMContentLoaded', function () {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.6, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true; // Enable shadow map
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use softer shadows
        document.getElementById('viewer').appendChild(renderer.domElement);
    
        const backgroundColor = 0xbd1b1b;
        renderer.setClearColor(backgroundColor, 1);
        renderer.setClearColor(0xffffff, 0);
    
        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
        scene.add(ambientLight);
    
        const directionalLight = new THREE.DirectionalLight(0xa736e8, 1); // Stronger light for pronounced shadows
        directionalLight.castShadow = true; // Enable shadows for the light
        directionalLight.shadow.mapSize.width = 4096; // Increase shadow map size for better quality
        directionalLight.shadow.mapSize.height = 4096;
        directionalLight.shadow.camera.near = 0.5; // Adjust near plane
        directionalLight.shadow.camera.far = 1000; // Adjust far plane
        directionalLight.shadow.camera.left = -500; // Adjust left plane
        directionalLight.shadow.camera.right = 500; // Adjust right plane
        directionalLight.shadow.camera.top = 500; // Adjust top plane
        directionalLight.shadow.camera.bottom = -500; // Adjust bottom plane
        directionalLight.shadow.bias = -0.0001; // Adjust bias to reduce artifacts
        scene.add(directionalLight);
    
        // Add a second light source with 50% intensity
        const secondaryLight = new THREE.DirectionalLight(0xf1ff09, 1); // Second light with half intensity
        secondaryLight.castShadow = true; // Enable shadows for the light
        secondaryLight.shadow.mapSize.width = 4096; // Increase shadow map size for better quality
        secondaryLight.shadow.mapSize.height = 4096;
        secondaryLight.shadow.camera.near = 0.5; // Adjust near plane
        secondaryLight.shadow.camera.far = 1000; // Adjust far plane
        secondaryLight.shadow.camera.left = -500; // Adjust left plane
        secondaryLight.shadow.camera.right = 500; // Adjust right plane
        secondaryLight.shadow.camera.top = 500; // Adjust top plane
        secondaryLight.shadow.camera.bottom = -500; // Adjust bottom plane
        secondaryLight.shadow.bias = -0.0001; // Adjust bias to reduce artifacts
        scene.add(secondaryLight);
    
        // Infinite plane shader material
        const planeGeometry = new THREE.PlaneGeometry(20000, 20000);
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.4 }); // Set the shadow opacity to a lower value
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -30; // Adjust the plane position to avoid flickering
        plane.receiveShadow = true; // Plane receives shadows
        scene.add(plane);
        const stageCenter = new THREE.Vector3(0, 0, 0);
    
        // Load the texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(pageData.template_directory_uri + '/19.jpg', function (texture) {
            // Load STL file
            const loader = new THREE.STLLoader();
            const stlFileUrl = pageData.template_directory_uri + '/mom.stl';
            loader.load(stlFileUrl, function (geometry) {
                geometry.computeVertexNormals(); // Compute normals for smooth shading
    
                const material = new THREE.MeshPhongMaterial({ map: texture, transparent: true, opacity:1 }); // Set the shadow opacity to a lower value
                const mesh = new THREE.Mesh(geometry, material);
    
                // Position and rotate the mesh
                mesh.position.set(1000, 0, 0); // Center the model
                mesh.rotation.set(-Math.PI / 2, 0, 0); // Adjust these values to rotate the model
    
                mesh.castShadow = true; // Mesh casts shadows
                mesh.receiveShadow = true; // Mesh receives shadows
    
                scene.add(mesh);
    
                // Center the geometry
                geometry.center();
    
                // Compute bounding box
                const bbox = new THREE.Box3().setFromObject(mesh);
                const size = bbox.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    
                // Start the camera close to the ground, out of view
                camera.position.set(0, 0, cameraZ); // Start close and low out of view
                camera.lookAt(new THREE.Vector3(0, 0, 0));
    
                animateCamera();
    
                // Animate the scale of the STL model
                gsap.fromTo(mesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 2.5, ease: 'power3.in' });
                gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: .7, ease: 'elastic.out(1, 0.45)', delay: 2 });
                gsap.fromTo(mesh.position, { y: -25 }, { y: 0, duration: 2.5, ease: 'power3.in' });
                gsap.to(mesh.position, { x: 0, y: 0, z: 0, duration: .7, ease: 'elastic.out(1, 0.45)', delay: 2 });
                gsap.to(mesh.position, { x: 0, duration: 2, ease: 'power3.inOut', delay: 0 });
    
                // Camera orbit animation
                const cameraOrbitRadius = cameraZ * 2; // Adjust the radius of the camera's orbit
                const oscillationAmplitude = 100; // Increase the amplitude of the oscillation
                const oscillationSpeed = 0.5; // Adjust the speed of the oscillation
                const lightOffsetY = 150; // Adjust the light height offset
                const tiltSpeed = 0.2; // Speed for the tilting motion
    
                function updateCameraPosition() {
                    const time = Date.now() * 0.0005;
                    const tiltTime = Date.now() * 0.0001;
                    const randomTwist = Math.sin(time * 0.1) * Math.PI / 4; // Random twist and turns
                    const angleVariation = Math.sin(time * 0.05) * Math.PI / 6; // Varying tilt angle
    
                    camera.position.x = cameraOrbitRadius * Math.cos(time + randomTwist);
                    camera.position.z = cameraOrbitRadius * Math.sin(time + randomTwist);
                    camera.position.y = Math.max(oscillationAmplitude * Math.sin(time * oscillationSpeed) + (oscillationAmplitude / 2) * Math.sin(tiltTime * tiltSpeed), 10); // Oscillating up and down with tilt, keeping above the floor
                    camera.rotation.x = Math.PI / 2 - angleVariation; // Adjust tilt angle
    
                    camera.lookAt(stageCenter);
    
                    // Update light position to follow camera's view with offset ahead of the camera
                    const lightTime = time + Math.PI / 2; // Light is ahead of the camera by 45 degrees
                    directionalLight.position.x = camera.position.x + 10 * Math.cos(lightTime); // Move farther away
                    directionalLight.position.z = camera.position.z + 10 * Math.sin(lightTime); // Move farther away
                    directionalLight.position.y = camera.position.y + 100; // Move light higher at a 45 degree angle
                    directionalLight.lookAt(mesh.position);
                }
    
                function animateCamera() {
                    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
                    // Regular orbit
                    timeline.to(camera.position, {
                        duration: 15,
                        x: () => cameraOrbitRadius * Math.cos(Date.now() * 0.0005),
                        z: () => cameraOrbitRadius * Math.sin(Date.now() * 0.0005),
                        y: () => Math.max(oscillationAmplitude * Math.sin(Date.now() * 0.0005 * oscillationSpeed) + (oscillationAmplitude / 2) * Math.sin(Date.now() * 0.0001 * tiltSpeed), 10),
                        ease: 'power1.inOut',
                        onUpdate: updateCameraPosition
                    });
    
                    // Fast orbit with rise
                    timeline.to(camera.position, {
                        duration: 10,
                        x: () => cameraOrbitRadius * Math.cos(Date.now() * 0.0005) * 0.5,
                        z: () => cameraOrbitRadius * Math.sin(Date.now() * 0.0005) * 0.5,
                        y: () => Math.max(oscillationAmplitude * Math.sin(Date.now() * 0.0005 * oscillationSpeed) * 2 + 100, 10),
                        ease: 'power2.inOut',
                        onUpdate: updateCameraPosition
                    });
    
                    // Slow orbit with descend
                    timeline.to(camera.position, {
                        duration: 20,
                        x: () => cameraOrbitRadius * Math.cos(Date.now() * 0.0005),
                        z: () => cameraOrbitRadius * Math.sin(Date.now() * 0.0005),
                        y: () => Math.max(oscillationAmplitude * Math.sin(Date.now() * 0.0005 * oscillationSpeed) + (oscillationAmplitude / 2) * Math.sin(Date.now() * 0.0001 * tiltSpeed) - 50, 10),
                        ease: 'power1.inOut',
                        onUpdate: updateCameraPosition
                    });
    
                    // Hyper jump
                    timeline.to(camera.position, {
                        duration: 2,
                        x: () => cameraOrbitRadius * Math.cos(Date.now() * 0.0005) * 2,
                        z: () => cameraOrbitRadius * Math.sin(Date.now() * 0.0005) * 2,
                        y: () => Math.max(oscillationAmplitude * Math.sin(Date.now() * 0.0005 * oscillationSpeed) * 2, 10),
                        ease: 'power4.inOut',
                        onUpdate: updateCameraPosition
                    });
    
                    // Fast orbit with rise
                    timeline.to(camera.position, {
                        duration: 10,
                        x: () => cameraOrbitRadius * Math.cos(Date.now() * 0.0005) * 0.5,
                        z: () => cameraOrbitRadius * Math.sin(Date.now() * 0.0005) * 0.5,
                        y: () => Math.max(oscillationAmplitude * Math.sin(Date.now() * 0.0005 * oscillationSpeed) * 2 + 100, 10),
                        ease: 'power2.inOut',
                        onUpdate: updateCameraPosition
                    });
    
                    // Slow orbit with descend
                    timeline.to(camera.position, {
                        duration: 20,
                        x: () => cameraOrbitRadius * Math.cos(Date.now() * 0.0005),
                        z: () => cameraOrbitRadius * Math.sin(Date.now() * 0.0005),
                        y: () => Math.max(oscillationAmplitude * Math.sin(Date.now() * 0.0005 * oscillationSpeed) + (oscillationAmplitude / 2) * Math.sin(Date.now() * 0.0001 * tiltSpeed) - 50, 10),
                        ease: 'power1.inOut',
                        onUpdate: updateCameraPosition
                    });
                }
    
                function animateSecondaryLight() {
                    const lightOrbitRadius = cameraOrbitRadius * .5;
                    const updateLightPosition = () => {
                        const time = Date.now() * 0.0001;
                        secondaryLight.position.x = lightOrbitRadius * Math.cos(time) - 20;
                        secondaryLight.position.y = lightOffsetY * Math.sin(time); // Oscillate light up and down
                        secondaryLight.lookAt(mesh.position);
                    };
                    gsap.ticker.add(updateLightPosition);
                }
                animateSecondaryLight();
    
                // Shader material for animated line
                const lineShaderMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uTime: { value: 0 },
                        uLength: { value: 0.0 }, // Start with zero length
                        uOpacity: { value: 0.0 }, // Start with zero opacity
                        uColor: { value: new THREE.Color(0x0000ff) }
                    },
                    vertexShader: `
                        uniform float uTime;
                        uniform float uLength;
                        attribute float lineProgress;
                        varying float vLineProgress;
                        void main() {
                            vLineProgress = lineProgress;
                            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                            gl_Position = projectionMatrix * mvPosition;
                        }
                    `,
                    fragmentShader: `
                        uniform float uTime;
                        uniform float uLength;
                        uniform float uOpacity;
                        uniform vec3 uColor;
                        varying float vLineProgress;
                        void main() {
                            float progress = mod(vLineProgress + uTime, 1.0);
                            if (progress < uLength) {
                                gl_FragColor = vec4(uColor, uOpacity);
                            } else {
                                discard;
                            }
                        }
                    `,
                    transparent: true
                });
    
                // Shader material for the second path
                const mirroredLineShaderMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uTime: { value: 0 },
                        uLength: { value: 0.0 }, // Start with zero length
                        uOpacity: { value: 0.0 }, // Start with zero opacity
                        uColor: { value: new THREE.Color(0xff00ff) }
                    },
                    vertexShader: `
                        uniform float uTime;
                        uniform float uLength;
                        attribute float lineProgress;
                        varying float vLineProgress;
                        void main() {
                            vLineProgress = lineProgress;
                            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                            gl_Position = projectionMatrix * mvPosition;
                        }
                    `,
                    fragmentShader: `
                        uniform float uTime;
                        uniform float uLength;
                        uniform float uOpacity;
                        uniform vec3 uColor;
                        varying float vLineProgress;
                        void main() {
                            float progress = mod(vLineProgress + uTime, 1.0);
                            if (progress < uLength) {
                                gl_FragColor = vec4(uColor, uOpacity);
                            } else {
                                discard;
                            }
                        }
                    `,
                    transparent: true
                });
    
                // Create figure-8 path points
                const radius = size.x / 3;
                const numPoints = 100;
                const points = [];
                for (let i = 0; i < numPoints; i++) {
                    const angle = (i / numPoints) * Math.PI * 2;
                    const x = radius * Math.sin(angle) * Math.cos(angle);
                    const y = radius * Math.sin(angle);
                    const z = radius * Math.cos(angle);
                    points.push(new THREE.Vector3(x, y, z));
                }
    
                // Rotate points to align the figure-8 parallel to the floor
                const rotatedPoints = points.map(point => {
                    const rotatedPoint = new THREE.Vector3();
                    rotatedPoint.x = point.x;
                    rotatedPoint.y = point.z;
                    rotatedPoint.z = -point.y;
                    return rotatedPoint;
                });
    
                const curve = new THREE.CatmullRomCurve3(rotatedPoints, true);
    
                // Path geometry with progress attribute
                const pathGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(200));
                const lineProgress = new Float32Array(pathGeometry.attributes.position.count);
                for (let i = 0; i < lineProgress.length; i++) {
                    lineProgress[i] = i / lineProgress.length;
                }
                pathGeometry.setAttribute('lineProgress', new THREE.BufferAttribute(lineProgress, 1));
    
                const pathLine = new THREE.Line(pathGeometry, lineShaderMaterial);
                scene.add(pathLine);
    
                // Animate the line drawing
                gsap.timeline()
                    .to(lineShaderMaterial.uniforms.uLength, {
                        value: 0.25,
                        duration: 5,
                        ease: 'power3.inOut',
                        onUpdate: function () {
                            lineShaderMaterial.uniforms.uOpacity.value = this.progress();
                        }
                    })
                    .to(lineShaderMaterial.uniforms.uTime, {
                        value: 1,
                        duration: 10,
                        ease: 'none',
                        repeat: -1,
                        onUpdate: function () {
                            lineShaderMaterial.uniforms.uTime.value = gsap.utils.wrap(0, 1, lineShaderMaterial.uniforms.uTime.value);
                        }
                    });
    
                // Create the second figure-8 path, mirrored
                const mirroredPoints = points.map(point => {
                    return new THREE.Vector3(-point.x, point.y, point.z);
                });
    
                // Rotate points to align the second figure-8 parallel to the floor
                const rotatedMirroredPoints = mirroredPoints.map(point => {
                    const rotatedPoint = new THREE.Vector3();
                    rotatedPoint.x = point.x;
                    rotatedPoint.y = point.z;
                    rotatedPoint.z = -point.y;
                    return rotatedPoint;
                });
    
                const mirroredCurve = new THREE.CatmullRomCurve3(rotatedMirroredPoints, true);
    
                // Path geometry for the mirrored path with progress attribute
                const mirroredPathGeometry = new THREE.BufferGeometry().setFromPoints(mirroredCurve.getPoints(200));
                const mirroredLineProgress = new Float32Array(mirroredPathGeometry.attributes.position.count);
                for (let i = 0; i < mirroredLineProgress.length; i++) {
                    mirroredLineProgress[i] = i / mirroredLineProgress.length;
                }
                mirroredPathGeometry.setAttribute('lineProgress', new THREE.BufferAttribute(mirroredLineProgress, 1));
    
                const mirroredPathLine = new THREE.Line(mirroredPathGeometry, mirroredLineShaderMaterial);
                scene.add(mirroredPathLine);
    
                // Animate the mirrored line drawing with an offset
                gsap.timeline({ delay: 2.5 }) // Start after 50% of the first path's duration
                    .to(mirroredLineShaderMaterial.uniforms.uLength, {
                        value: 0.25,
                        duration: 5,
                        ease: 'power3.inOut',
                        onUpdate: function () {
                            mirroredLineShaderMaterial.uniforms.uOpacity.value = this.progress();
                        }
                    })
                    .to(mirroredLineShaderMaterial.uniforms.uTime, {
                        value: 1,
                        duration: 10,
                        ease: 'none',
                        repeat: -1,
                        onUpdate: function () {
                            mirroredLineShaderMaterial.uniforms.uTime.value = gsap.utils.wrap(0, 1, mirroredLineShaderMaterial.uniforms.uTime.value);
                        }
                    });
    
                // Create shapes to move along the path
                const shapes = [];
                const shapeMaterial = new THREE.MeshPhongMaterial({ color: 0xf7eded });
    
                const geometries = [
                    new THREE.CylinderGeometry(3, 3, 10, 6), // Hexagonal cylinder
                    new THREE.SphereGeometry(3, 32, 32), // Sphere shape
                    new THREE.TetrahedronGeometry(3), // Triangular shape
                    new THREE.DodecahedronGeometry(3), // Hexagonal low poly shape
                    new THREE.OctahedronGeometry(3), // Octahedron shape
                    new THREE.BoxGeometry(3, 3, 3), // Cube shape
                    new THREE.TorusGeometry(3, 1, 16, 100) // Torus shape
                ];
    
                for (let i = 0; i < 7; i++) {
                    const shape = new THREE.Mesh(geometries[i % geometries.length], shapeMaterial);
                    shape.scale.setScalar(Math.random() * 0.5 + 0.5); // Random size
                    shape.castShadow = true; // Shape casts shadows
                    shape.receiveShadow = true; // Shape receives shadows
                    shapes.push(shape);
                    scene.add(shape);
                }
    
                // Animate the shapes along the path
                shapes.forEach((shape, index) => {
                    const delay = index * 0.5 + 2; // Delay before each shape animation starts
                    gsap.fromTo(shape.scale, { x: 0, y: 0, z: 0 }, {
                        x: Math.random() * 0.5 + 0.5,
                        y: Math.random() * 0.5 + 0.5,
                        z: Math.random() * 0.5 + 0.5,
                        duration: 2,
                        ease: 'power3.inOut',
                        delay: delay,
                        repeat: -1,
                        yoyo: true
                    });
    
                    const shapePathAnimation = { value: index / shapes.length }; // Spread out the shapes
                    gsap.to(shapePathAnimation, {
                        value: 1 + index / shapes.length, // Ensure smooth looping
                        duration: 30 + Math.random() * 10, // Vary duration for different speeds
                        repeat: -1,
                        ease: 'none',
                        onUpdate: function () {
                            const point = curve.getPointAt(shapePathAnimation.value % 1);
                            shape.position.copy(point);
    
                            // Random rotation
                            shape.rotation.x += 0.01 * Math.random();
                            shape.rotation.y += 0.01 * Math.random();
                            shape.rotation.z += 0.01 * Math.random();
                        }
                    });
                });
    
                // Create shapes to move along the mirrored path
                const mirroredShapes = [];
                for (let i = 0; i < 7; i++) {
                    const mirroredShape = new THREE.Mesh(geometries[i % geometries.length], shapeMaterial);
                    mirroredShape.scale.setScalar(Math.random() * 0.5 + 0.5); // Random size
                    mirroredShape.castShadow = true; // Shape casts shadows
                    mirroredShape.receiveShadow = true; // Shape receives shadows
                    mirroredShapes.push(mirroredShape);
                    scene.add(mirroredShape);
                }
    
                // Animate the shapes along the mirrored path
                mirroredShapes.forEach((shape, index) => {
                    const delay = index * 0.5 + 3; // Delay before each shape animation starts
                    gsap.fromTo(shape.scale, { x: 0, y: 0, z: 0 }, {
                        x: Math.random() * 0.5 + 0.5,
                        y: Math.random() * 0.5 + 0.5,
                        z: Math.random() * 0.5 + 0.5,
                        duration: 2,
                        ease: 'power3.inOut',
                        delay: delay,
                        repeat: -1,
                        yoyo: true
                    });
    
                    const shapePathAnimation = { value: index / mirroredShapes.length }; // Spread out the shapes
                    gsap.to(shapePathAnimation, {
                        value: 1 + index / mirroredShapes.length, // Ensure smooth looping
                        duration: 30 + Math.random() * 10, // Vary duration for different speeds
                        repeat: -1,
                        ease: 'none',
                        onUpdate: function () {
                            const point = mirroredCurve.getPointAt(shapePathAnimation.value % 1);
                            shape.position.copy(point);
    
                            // Random rotation
                            shape.rotation.x += 0.01 * Math.random();
                            shape.rotation.y += 0.01 * Math.random();
                            shape.rotation.z += 0.01 * Math.random();
                        }
                    });
                });
            });
        });
    
        // Resize event
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    });
    
    

} else {
    console.log('This is not the 3dprinting page.');
}
