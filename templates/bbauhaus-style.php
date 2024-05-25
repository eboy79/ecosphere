<?php
/*
Template Name: STL Viewer
*/
get_header();
?>

<style>
    body {
        margin: 0;
        overflow: hidden;
        background-color: #ab1414;
        height: 100vh;
    }
    #viewer {
        width: 100vw;
        height: 100vh;
    }
</style>

<div id="viewer"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/STLLoader.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Enable shadow map
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
    document.getElementById('viewer').appendChild(renderer.domElement);

    renderer.setClearColor(0xab1414, 1);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Stronger light for pronounced shadows
    directionalLight.castShadow = true; // Enable shadows for the light
    directionalLight.shadow.mapSize.width = 1024; // Adjust shadow map size
    directionalLight.shadow.mapSize.height = 1024; // Adjust shadow map size
    directionalLight.shadow.camera.near = 0.5; // Adjust near plane
    directionalLight.shadow.camera.far = 500; // Adjust far plane
    directionalLight.shadow.camera.left = -100; // Adjust left plane
    directionalLight.shadow.camera.right = 100; // Adjust right plane
    directionalLight.shadow.camera.top = 100; // Adjust top plane
    directionalLight.shadow.camera.bottom = -100; // Adjust bottom plane
    directionalLight.shadow.bias = -0.0001; // Adjust bias to reduce artifacts
    scene.add(directionalLight);

    // Infinite plane shader material
    const planeGeometry = new THREE.PlaneGeometry(20000, 20000);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xab1414, depthWrite: false });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -28; // Adjust the plane position
    plane.receiveShadow = true; // Plane receives shadows
    scene.add(plane);

    // Load the texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('<?php echo get_template_directory_uri(); ?>/19.jpg'); // Replace with the path to your texture image

    // Load STL file
    const loader = new THREE.STLLoader();
    loader.load('<?php echo get_template_directory_uri(); ?>/mom.stl', function (geometry) {
        geometry.computeVertexNormals(); // Compute normals for smooth shading

        const material = new THREE.MeshPhongMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        
        // Position and rotate the mesh
        mesh.position.set(10, 0, -35); // Adjust these values to position the model
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

        // Start the camera high up and looking down
        camera.position.set(0, 1000, cameraZ);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // GSAP intro animation to swoop the camera down
        gsap.to(camera.position, { duration: 2, y: 50, ease: 'power2.out', onUpdate: () => camera.lookAt(mesh.position) });

        // GSAP spinning animation
        gsap.to(mesh.rotation, { duration: 30, z: Math.PI * 2, repeat: -1, ease: 'none' });

        // Orbiting camera animation
        const cameraOrbitRadius = cameraZ * 1.5; // Adjust the radius of the camera's orbit
        const oscillationAmplitude = 30; // Increase the amplitude of the oscillation
        const oscillationSpeed = 0.5; // Adjust the speed of the oscillation
        const lightOffsetY = 12.5; // Adjust the light height offset (1/4 of previous value)
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

            camera.lookAt(mesh.position);

            // Update light position to follow camera's view with offset ahead of the camera
            const lightTime = time + Math.PI / 4; // Light is ahead of the camera by 45 degrees
            directionalLight.position.x = camera.position.x + 100 * Math.cos(lightTime); // Move farther away
            directionalLight.position.z = camera.position.z + 100 * Math.sin(lightTime); // Move farther away
            directionalLight.position.y = camera.position.y + 50; // Move light higher at a 45 degree angle
            directionalLight.lookAt(mesh.position);
        }

        gsap.to({}, {
            duration: 100, // Duration for a full rotation
            repeat: -1,
            ease: 'power1.inOut', // Vary the speed gradually
            onUpdate: updateCameraPosition
        });

        // Create a figure 8 path that goes through the center hole of the model
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, -30),
            new THREE.Vector3(20, 10, 0),
            new THREE.Vector3(40, 0, 30),
            new THREE.Vector3(20, -10, 0),
            new THREE.Vector3(0, 0, -30),
            new THREE.Vector3(-20, -10, 0),
            new THREE.Vector3(-40, 0, 30),
            new THREE.Vector3(-20, 10, 0),
            new THREE.Vector3(0, 0, -30)
        ], true); // Closed loop

        // Path geometry and material
        const pathGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100));
        const pathMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const pathLine = new THREE.Line(pathGeometry, pathMaterial);
        scene.add(pathLine);

        // Create the flying sphere
        const sphereGeometry = new THREE.SphereGeometry(153, 132, 132); // Increased size for visibility
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);

        // Animate the sphere along the path
        gsap.from({}, {
            duration: 10, // Duration for a full loop
            repeat: -1,
            ease: 'power1.inOut',
            onUpdate: function() {
                const time = gsap.timeline().progress() * curve.getLength();
                const point = curve.getPointAt((time / curve.getLength()) % 1);
                sphere.position.copy(point);
            }
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
</script>

<?php
get_footer();
?>
