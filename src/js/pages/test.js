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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(7, 19, 4);
    directionalLight.castShadow = true; // Enable shadows for the light
    directionalLight.shadow.mapSize.width = 5048; // Increase shadow map size
    directionalLight.shadow.mapSize.height = 5048; // Increase shadow map size
    directionalLight.shadow.camera.near = 0.5; // Adjust near plane
    directionalLight.shadow.camera.far = 500; // Adjust far plane
    directionalLight.shadow.camera.left = -600; // Adjust left plane
    directionalLight.shadow.camera.right = 100; // Adjust right plane
    directionalLight.shadow.camera.top = 100; // Adjust top plane
    directionalLight.shadow.camera.bottom = -100; // Adjust bottom plane
    directionalLight.shadow.bias = -0.0001; // Adjust bias to reduce artifacts
    scene.add(directionalLight);

    // Infinite plane shader material
    const planeGeometry = new THREE.PlaneGeometry(20000, 20000);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -42; // Adjust the plane position
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
        mesh.position.set(0, -10, -25); // Adjust these values to position the model
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

        camera.position.set(0, 0, cameraZ);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // GSAP intro animation
        gsap.from(mesh.position, { duration: 2, x: 100, z: -200, ease: 'power2.out' });
        gsap.from(mesh.rotation, { duration: 2, x: Math.PI * 1, ease: 'power2.out' });

        // GSAP spinning animation
        gsap.to(mesh.rotation, { duration: 20, z: Math.PI * 2, repeat: -1, ease: 'none' });

        // Hide loader and show viewer
        document.getElementById('loader').style.display = 'none';
        document.getElementById('viewer').style.display = 'block';
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