const THREE = require('three');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader');
const fs = require('fs');
const { error } = require('console');

const scene = new THREE.Scene();
scene.background = null; 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light=new THREE.AmbientLight(0xffffff, 1); 
light.position.set(1, 1, 1);
scene.add(light);

camera.position.z = 5;

// 加载3D模型（示例：立方体，可替换为GLTF）
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ 
//     color: 0x00ff00,
//     transparent: true,
//     opacity: 0.8 
// });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// camera.position.z = 5;

let model;
const loader = new GLTFLoader();
const modelPath = require('electron').remote.getGlobal('modelPath'); 

loader.load(modelPath, (gltf) => {
    model=gltf.scene;
    scene.add(model);
    console.log('Model loaded successfully with modelPath:', modelPath);
},
(progress)=>{
    console.log((progress.loaded / progress.total) * 100 + '% loaded');
},
(error)=>{
    console.error('Error loading model:', error);
});

// 触控笔交互逻辑
let isDrawing = false;
lastX = e.clientX;
lastY = e.clientY;

window.addEventListener('pointerdown', (e) => {
    if (!isDrawing) return;

    // if (e.pressure > 0.5) { // 压感笔触发
    //     isDrawing = true;
    //     modifyModel(e.clientX, e.clientY);
    // }
    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;
    
    if (model) {
        model.rotation.y += deltaX * 0.01;
        model.rotation.x += deltaY * 0.01;
    }
    
    lastX = e.clientX;
    lastY = e.clientY;
});

// window.addEventListener('pointermove', (e) => {
//     if (isDrawing && e.pressure > 0.5) {
//         modifyModel(e.clientX, e.clientY);
//     }
// });

window.addEventListener('pointerup', () => isDrawing = false);

// function modifyModel(x, y) {
//     // 将屏幕坐标转换为3D空间坐标（简化版）
//     if(!model) return;
//     model.rotation.x = (y / window.innerHeight) * Math.PI;
//     model.rotation.y = (x / window.innerWidth) * Math.PI;
//     saveModelState(); // 实时保存
// }

// 保存模型状态到本地文件
// function saveModelState() {
//     const data = {
//         rotation: cube.rotation.toArray(),
//         position: cube.position.toArray()
//     };
//     fs.writeFileSync('model-data.json', JSON.stringify(data));
// }

// 加载保存的模型状态
// function loadModelState() {
//     try {
//         const data = JSON.parse(fs.readFileSync('model-data.json'));
//         cube.rotation.fromArray(data.rotation);
//         cube.position.fromArray(data.position);
//     } catch (e) {
//         console.log("无保存数据，使用默认模型");
//     }
// }

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// // 初始化加载保存的数据
// loadModelState();