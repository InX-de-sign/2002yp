const THREE = require('three');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader');
const fs = require('fs');
const path = require('path');

console.log('Renderer script started');

try {
    // 初始化场景
    const scene = new THREE.Scene();
    console.log('Scene created');
    
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    console.log('Camera created');
    
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        canvas: document.createElement('canvas')
    });
    console.log('Renderer created');
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    console.log('Canvas appended to body');

    // 添加环境光
    const light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    console.log('Light added');

    // 设置相机位置
    camera.position.z = 5;

    // 加载3D模型
    const modelPath = path.join(__dirname, 'models', 'sampleModel1.glb');
    console.log('Model path:', modelPath);
    
    // 先添加一个临时的立方体，确认渲染系统正常工作
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    console.log('Test cube added');

    const loader = new GLTFLoader();
    loader.load(
        modelPath,
        (gltf) => {
            console.log('Model loaded successfully');
            const model = gltf.scene;
            scene.add(model);
        },
        (progress) => {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
            console.error('Error loading model:', error);
        }
    );

    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        if (cube) {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
    }
    animate();
    console.log('Animation loop started');

} catch (error) {
    console.error('Error in renderer:', error);
}