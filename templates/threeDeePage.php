<?php
/**
 * Template Name: 3D Extrusion
 *
 * Template for displaying a page without sidebar even if a sidebar widget is published.
 *
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

?>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Latest compiled JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- Include Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<!-- Include SVGLoader -->
<script src="https://cdn.jsdelivr.net/npm/three@0.128/examples/js/loaders/SVGLoader.js"></script>
<!-- Include GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/gsap.min.js"></script>
<style>
    #svg-container {
        display: flex;
        justify-content: flex-start; /* Align items to the start */
        overflow: hidden; /* Hide the overflow */
        height: 200px; /* Explicitly set the height */
        position: relative; /* To position the wide container */
        width: 100%; /* Ensure it has a defined width */
    }

    .wide-container {
        display: flex;
        flex-direction: row; /* Align items in a row */
        width: 200%; /* Twice the width of the parent container */
        position: absolute; /* Position the container absolutely */
        top: 0; /* Align to the top */
        left: 0; /* Align to the left */
        overflow: hidden; /* Hide overflow to act as a mask */
        height: 100%;
    }

    .word-svg {
        height: 100%; /* Adjust height as needed */
        transform-origin: top left; /* Set transform origin to top left */
        opacity: 1; /* Keep opacity as 1 */
    }

    .word-svg g path {
        fill: #3498db; /* Example color: blue */
    }

    #three-container {
        width: 100%;
        height: 500px;
        background-color: #000;
    }
</style>
<div class="container-fluid px-0" style="height:70vh"></div>
<div class="container-fluid px-0">
    <div id="svg-container">
        <div class="wide-container" id="wide-container"></div>
    </div>
</div>
<div id="three-container"></div>
<script>
    // SVG data for letters and blank space
    const svgData = {
        W: { viewBox: "0 0 1024 1024", path: "M100 100L300 900L500 100L700 900L900 100" },
        O: { viewBox: "35 0 773 735", path: "M423 -15C666 -15 808 139 808 359C808 573 661 735 421 735C181 735 35 573 35 359C35 139 179 -15 423 -15ZM421 181C328 181 262 243 262 359C262 480 330 538 421 538C513 538 580 480 581 359C581 243 517 181 421 181Z"},
        W2: { viewBox: "0 0 1024 1024", path: "M100 100L300 900L500 100L700 900L900 100" }
    };

    function initThreeJS() {
        const threeContainer = document.getElementById('three-container');

        // Set up scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, threeContainer.clientWidth / threeContainer.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
        threeContainer.appendChild(renderer.domElement);

        // Create light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5).normalize();
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(ambientLight);

        // Load and parse SVG
        const loader = new THREE.SVGLoader();
        const svgString = `<svg viewBox="0 0 1024 1024"><path d="${svgData.W.path}"/><path d="${svgData.O.path}"/><path d="${svgData.W2.path}"/></svg>`;
        const svgDataParsed = loader.parse(svgString);

        const paths = svgDataParsed.paths;
        const material = new THREE.MeshPhongMaterial({ color: 0x3498db });

        paths.forEach((path) => {
            const shapes = path.toShapes(true);

            shapes.forEach((shape) => {
                const geometry = new THREE.ExtrudeGeometry(shape, { depth: 10, bevelEnabled: true, bevelThickness: 2, bevelSize: 1, bevelSegments: 1 });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.scale.set(0.1, 0.1, 0.1);
                mesh.position.set(-300, 0, 0);
                scene.add(mesh);
            });
        });

        camera.position.z = 200;

        // Animation loop
        const animate = function () {
            requestAnimationFrame(animate);
            scene.rotation.y += 0.01; // Rotate scene for better visualization
            renderer.render(scene, camera);
        };

        animate();
    }

    // Initialize Three.js rendering
    initThreeJS();
</script>
<?php
get_footer();
?>
