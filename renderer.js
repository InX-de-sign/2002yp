console.log('Starting renderer.js');

try {
    const THREE = require('three');

    const GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader.js').GLTFLoader;
    const path = require('path');
    console.log('THREE.js and modules loaded successfully');

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    console.log('Renderer created and canvas appended');

    const light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshPhongMaterial({ 
    //     color: 0x00ff00,
    //     shininess: 60
    // });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    // console.log('Test cube added to scene');

    let model;
    let isPointerDown = false;
    let previousPointerPosition = { x: 0, y: 0 };
    let deltaMove = { x: 0, y: 0 };

    const modelPath = path.join(__dirname, 'models', 'sampleModel1.glb');
    console.log('Attempting to load model from:', modelPath);

    const loader = new GLTFLoader();
    loader.load(modelPath,
        (gltf) => {
            model = gltf.scene;

            // model.traverse((child) => {
            //     if (child.isMesh) {
            //         child.customDepthMaterial.side = THREE.DoubleSide;
            //     }
            // });

            camera.position.z = 10;
            model.scale.set(0.2, 0.2, 0.2);
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            model.position.y = 0;

            scene.add(model);
            console.log('Model loaded successfully');
        },
        (progress) => {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
            console.error('Error loading model:', error);
        }
    );

    window.addEventListener('pointerdown', (event) => {
        isPointerDown = true;
        previousPointerPosition = { x: event.clientX, y: event.clientY };
    });

    window.addEventListener('pointermove', (event) => {
        if (!isPointerDown || !model) return;

        const deltaMove = {
            x: event.clientX - previousPointerPosition.x,
            y: event.clientY - previousPointerPosition.y
        };

        // cube.rotation.y += deltaMove.x * 0.01;
        // cube.rotation.x += deltaMove.y * 0.01;
        model.rotation.y += deltaMove.x * 0.01;
        model.rotation.x += deltaMove.y * 0.01;

        previousPointerPosition = {
            x: event.clientX,
            y: event.clientY
        };
    });

    window.addEventListener('pointerup', () => {
        isPointerDown = false;
    });

    function animate() {
        requestAnimationFrame(animate);

        // if (!isPointerDown) {
        // cube.rotation.y += deltaMove.x * 0.01;
        // cube.rotation.x += deltaMove.y * 0.01;
        if (model) {
            model.rotation.y += deltaMove.x * 0.01;
            model.rotation.x += deltaMove.y * 0.01;
        }

        renderer.render(scene, camera);
    }
    animate();
    console.log('Animation loop started');

    window.addEventListener('resize', () => {
        try {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        } catch (error) {
            console.error('Error handling resize:', error);
        }
    });

} catch (error) {
    console.error('Error in renderer:', error);
} 