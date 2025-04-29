// console.log('Renderer script started');

// try {
//     // 初始化场景
//     const scene = new THREE.Scene();
//     console.log('Scene created');
    
//     scene.background = null;
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     console.log('Camera created');
    
//     const renderer = new THREE.WebGLRenderer({ 
//         antialias: true, 
//         alpha: true,
//         canvas: document.createElement('canvas')
//     });
//     console.log('Renderer created');
    
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);
//     console.log('Canvas appended to body');

//     // 添加环境光
//     const light = new THREE.AmbientLight(0xffffff, 1);
//     light.position.set(1, 1, 1);
//     scene.add(light);
//     console.log('Light added');

//     // 设置相机位置
//     camera.position.z = 5;

//     // 加载3D模型
//     const modelPath = path.join(__dirname, 'models', 'sampleModel1.glb');
//     console.log('Model path:', modelPath);
    
//     // 先添加一个临时的立方体，确认渲染系统正常工作
//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);
//     console.log('Test cube added');

//     const loader = new GLTFLoader();
//     loader.load(
//         modelPath,
//         (gltf) => {
//             console.log('Model loaded successfully');
//             const model = gltf.scene;
//             scene.add(model);
//         },
//         (progress) => {
//             console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
//         },
//         (error) => {
//             console.error('Error loading model:', error);
//         }
//     );

//     // 动画循环
//     function animate() {
//         requestAnimationFrame(animate);
//         if (cube) {
//             cube.rotation.x += 0.01;
//             cube.rotation.y += 0.01;
//         }
//         renderer.render(scene, camera);
//     }
//     animate();
//     console.log('Animation loop started');

// } catch (error) {
//     console.error('Error in renderer:', error);
// }

console.log('Starting renderer.js');

try {
    const THREE = require('three');
    // 修改 GLTFLoader 的导入方式
    const GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader.js').GLTFLoader;
    const path = require('path');
    console.log('THREE.js and modules loaded successfully');

    // 初始化场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080); // 灰色背景方便调试

    // 设置相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    console.log('Renderer created and canvas appended');

    // 添加环境光
    const light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    // 添加方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 添加测试用立方体
    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshPhongMaterial({ 
    //     color: 0x00ff00,
    //     shininess: 60
    // });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    // console.log('Test cube added to scene');

    // 尝试加载3D模型
    // try {
        let model;
        const modelPath = path.join(__dirname, 'models', 'sampleModel1.glb');
        console.log('Attempting to load model from:', modelPath);

        const loader = new GLTFLoader();
        loader.load(
            modelPath,
            (gltf) => {
                model = gltf.scene;
                scene.add(model);
                model.position.set(2, 0, 0); // 将模型放在立方体旁边
                console.log('Model loaded successfully');
            },
            (progress) => {
                console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.error('Error loading model:', error);
            }
        );
    // } catch (modelError) {
    //     console.error('Error in model loading setup:', modelError);
    //}

    // 触控交互逻辑
    let isPointerDown = false;
    let previousPointerPosition = {
        x: 0,
        y: 0
    };

    window.addEventListener('pointerdown', (event) => {
        isPointerDown = true;
        previousPointerPosition = {
            x: event.clientX,
            y: event.clientY
        };
    });

    window.addEventListener('pointermove', (event) => {
        if (!isPointerDown) return;

        const deltaMove = {
            x: event.clientX - previousPointerPosition.x,
            y: event.clientY - previousPointerPosition.y
        };

        // 旋转测试立方体
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

    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        
        // 给测试立方体一个持续的小动画
        if (!isPointerDown) {
            // cube.rotation.y += deltaMove.x * 0.01;
            // cube.rotation.x += deltaMove.y * 0.01;
            model.rotation.y += deltaMove.x * 0.01;
            model.rotation.x += deltaMove.y * 0.01;
        }
        
        renderer.render(scene, camera);
    }
    animate();
    console.log('Animation loop started');

    // 窗口大小调整处理
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