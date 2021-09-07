<template>
    <div>
        <div id="loadingText" style="position: absolute;width: 80vw;height: 80vh;color: white;">加载中...</div>
    <div class="container-3d">
        <div id="container-3d" style="width: 100%;height:100%;">
        </div>
    </div>
    <div id="name-box"></div>

    <div style="position: absolute;right:50px;bottom:50px;">
        <button id="button1">PD_ROOM01</button>
        <button id="button2">JF-NO2-pdroom</button>
        <button id="button3">center_pdroom</button>
    </div>
    </div>
</template>

<script>
    import * as THREE from "three";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
    import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
    // outline postprocessing
    import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer.js";
    import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass.js";
    import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass.js";
    import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass.js";
    import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
    import {FXAAShader} from "three/examples/jsm/shaders/FXAAShader.js";


    var scene;
    var lightList = []; //灯对象
    var itemList = [];//灯对象

    // var finalPass;
    // var renderPass;
    var outlinePass;
    // var effectFXAA;
    // var bloomPass;
    var bloomComposer;
    var finalComposer;

    var bloomLayer;
    var darkMaterial;
    // var materials = null;

    var renderer;

    var controls;

    var camera;
    var nameBox;
    var containerElement;

    var raycaster;
    var mouse;
    var color;
    var mousePosition = {
        x: 0,
        y: 0
    };

    var clientWidth;
    var clientHeight;
    var offsetLeft;
    var offsetTop;

    var LOAD_PARAMS = null;
    var paramsThree = {
        modelName: 'PD_ROOM01', // .glb模型的文件名字
        name: 'devGlb', // 模型加入场景的名字，此处统一是devGlb
        offsetY: 0 // 模型加入场景的y轴偏移量
    };

    var ENTIRE_SCENE = 0;
    var BLOOM_SCENE = 1;

    var params = {
        exposure: 1,
        bloomStrength: 2,
        bloomThreshold: 0,
        bloomRadius: 1,
        scene: "Scene with Glow"
    };

    export default {
        name: 'model3D',
        data() {
            return {
                // mousePosition: {
                //     x: 0,
                //     y: 0
                // },
                // containerElement: '',
                // nameBox: '',
                // clientWidth: '',
                // clientHeight: '',
                // offsetLeft: '',
                // offsetTop: '',
                // stats: '',
                // LOAD_PARAMS: null,
                // paramsThree: {
                //     modelName: 'PD_ROOM01', // .glb模型的文件名字
                //     name: 'devGlb', // 模型加入场景的名字，此处统一是devGlb
                //     offsetY: 0 // 模型加入场景的y轴偏移量
                // },
                // scene: '',
                // camera: '',
                // controls: '',
                // renderer: '',
                // ENTIRE_SCENE: 0,
                // BLOOM_SCENE: 1,
                // bloomLayer: '',
                // params: {
                //     exposure: 1,
                //     bloomStrength: 2,
                //     bloomThreshold: 0,
                //     bloomRadius: 1,
                //     scene: "Scene with Glow"
                // },
                // color: '',
                // darkMaterial: '',
                materials: {},
                // renderScene: {},
                // outlinePass: {},
                // effectFXAA: {},
                // bloomPass: {},
                // // finalPass: {},
                // bloomComposer: {},
                // finalComposer: {},

                // raycaster: {},
                // mouse: {},
            }
        },
        mounted() {
            this.initSence();
            // this.initLight();
            // this.updateContainerElement();
            // window.addEventListener("resize", this.resize());
            // window.addEventListener('click', this.onDocumentMouseClick, false);
            // window.addEventListener("mousemove", this.onMouseMove, false);
            // let btn1 = document.getElementById("button1");
            // let btn2 = document.getElementById("button2");
            // let btn3 = document.getElementById("button3");
            //
            // btn1.onclick = function () {
            //     this.clearModel();
            //     paramsThree.modelName = `PD_ROOM01`;
            //     this.initModel(paramsThree);
            // };
            // btn2.onclick = function () {
            //     this.clearModel();
            //     paramsThree.modelName = `JF-NO2-pdroom`;
            //     this.initModel(paramsThree);
            // };
            // btn3.onclick = function () {
            //     this.clearModel();
            //     paramsThree.modelName = `center_pdroom`;
            //     this.initModel(paramsThree);
            // }
        },
        methods: {
            initSence() {
                containerElement = document.getElementById("container-3d");
                nameBox = document.getElementById("name-box");

                this.updateContainerElement();


                color = new THREE.Color();
                color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05);
                darkMaterial = new THREE.MeshBasicMaterial({color: "black"});
                renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.setSize(clientWidth, clientHeight);
                renderer.toneMapping = THREE.ReinhardToneMapping;
                containerElement.appendChild(renderer.domElement);
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(40, clientWidth / clientHeight, 0.1, 1000);
                camera.position.set(-4, 4, 7);

                controls = new OrbitControls(camera, renderer.domElement);
                controls.maxPolarAngle = Math.PI * 0.5;
                controls.minDistance = 0.1;
                controls.maxDistance = 100;
                controls.addEventListener('change', this.render);

                // scene.add(new THREE.AmbientLight(0x404040));
                //
                // {
                //     //添加平行光
                //     let color = 0xFFFFFF;
                //     let intensity = 10;
                //     let light = new THREE.DirectionalLight(color, intensity);
                //     light.position.set(-10, 20, 0);
                //     scene.add(light);
                // }
                //
                // {
                //     //通过SpotLight创建一个光源
                //     let spotLight = new THREE.SpotLight(0xffffff);
                //     //从-40,60,-10这个三维坐标处照射我们的场景
                //     spotLight.position.set(-40, 60, -10);
                //     //添加光源到场景
                //     scene.add(spotLight);
                // }

                // renderPass = this.createRenderScene();
                // outlinePass = this.createOutlinePass();
                // effectFXAA = this.createFxaaPass();
                // bloomPass = this.createBloomPass();
                // bloomComposer = this.createBloomComposer();
                //
                // finalPass = this.createFinalPass();
                // finalComposer = this.createFinalComposer();


                let renderPass = new RenderPass(scene, camera);

                //添加outline
                outlinePass = new OutlinePass(new THREE.Vector2(clientWidth, clientHeight), scene, camera);
                outlinePass.edgeStrength = 5;
                outlinePass.edgeGlow = 1;
                outlinePass.pulsePeriod = 2;
                outlinePass.visibleEdgeColor.set("#ffffff");
                outlinePass.hiddenEdgeColor.set("#190a05");

                //添加抗锯齿
                let FxaaPass = new ShaderPass(FXAAShader);
                let pixelRatio = renderer.getPixelRatio();
                FxaaPass.material.uniforms["resolution"].value.x =
                    1 / (clientWidth * pixelRatio);
                FxaaPass.material.uniforms["resolution"].value.y =
                    1 / (clientHeight * pixelRatio);
                FxaaPass.renderToScreen = true;

                //添加辉光
                let bloomPass = new UnrealBloomPass(new THREE.Vector2(clientWidth, clientHeight), 1.5, 0.4, 0.85);
                bloomPass.threshold = params.bloomThreshold;
                bloomPass.strength = params.bloomStrength;
                bloomPass.radius = params.bloomRadius;

                //添加bloomComposer
                bloomComposer = new EffectComposer(renderer);
                bloomComposer.addPass(renderPass);
                bloomComposer.addPass(bloomPass);
                bloomComposer.addPass(outlinePass);
                bloomComposer.renderToScreen = false;

                //添加finalPass
                // 着色器通道容器--放进容器里
                let finalPass = new ShaderPass(
                    new THREE.ShaderMaterial({
                        uniforms: {
                            baseTexture: {value: null},
                            bloomTexture: {value: bloomComposer.renderTarget2.texture}
                        },
                        // vertexShader: `varying vec2 vUv;
                        //   void main() {
                        //     vUv = uv;
                        //     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                        //   }`,
                        vertexShader: "varying vec2 vUv;\n" +
                            "void main() {\n" +
                            "vUv = uv;\n" +
                            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n" +
                            "}",
                        // fragmentShader: `uniform sampler2D baseTexture;
                        //   uniform sampler2D bloomTexture;
                        //   varying vec2 vUv;
                        //   void main() {
                        //       gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
                        //   }`,
                        fragmentShader: "uniform sampler2D baseTexture;\n" +
                            "uniform sampler2D bloomTexture;\n" +
                            "varying vec2 vUv;\n" +
                            "void main() {\n" +
                            "gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );\n" +
                            "}",
                        defines: {}
                    }), "baseTexture"
                );
                finalPass.needsSwap = true;

                finalComposer = new EffectComposer(renderer);
                finalComposer.addPass(renderPass);
                finalComposer.addPass(FxaaPass);
                finalComposer.addPass(finalPass);




                raycaster = new THREE.Raycaster();
                mouse = new THREE.Vector2();

                bloomLayer = new THREE.Layers();
                bloomLayer.set(BLOOM_SCENE);


                this.initModel(paramsThree);
                this.animate();

                window.addEventListener("resize", this.resize());
                window.addEventListener('click', this.onDocumentMouseClick, false);
                window.addEventListener("mousemove", this.onMouseMove, false);

            },
            initLight() {
                scene.add(new THREE.AmbientLight(0x404040));

                //添加平行光
                let color = 0xFFFFFF;
                let intensity = 10;
                let light = new THREE.DirectionalLight(color, intensity);
                light.position.set(-10, 20, 0);
                scene.add(light);

                //通过SpotLight创建一个光源
                let spotLight = new THREE.SpotLight(0xffffff);
                //从-40,60,-10这个三维坐标处照射我们的场景
                spotLight.position.set(-40, 60, -10);
                //添加光源到场景
                scene.add(spotLight);
            },

            createRenderScene() {
                return new RenderPass(scene, camera);
            },
            createOutlinePass() {
                //添加outline
                let outlinePass = new OutlinePass(new THREE.Vector2(clientWidth, clientHeight), scene, camera);
                outlinePass.edgeStrength = 5;
                outlinePass.edgeGlow = 1;
                outlinePass.pulsePeriod = 2;
                outlinePass.visibleEdgeColor.set("#ffffff");
                outlinePass.hiddenEdgeColor.set("#190a05");
                return outlinePass;
            },
            createFxaaPass() {
                //添加抗锯齿
                let FxaaPass = new ShaderPass(FXAAShader);
                let pixelRatio = renderer.getPixelRatio();
                FxaaPass.material.uniforms["resolution"].value.x =
                    1 / (clientWidth * pixelRatio);
                FxaaPass.material.uniforms["resolution"].value.y =
                    1 / (clientHeight * pixelRatio);
                FxaaPass.renderToScreen = true;
                return FxaaPass;
            },
            createBloomPass() {
                //添加辉光
                let bloomPass = new UnrealBloomPass(new THREE.Vector2(clientWidth, clientHeight), 1.5, 0.4, 0.85);
                bloomPass.threshold = params.bloomThreshold;
                bloomPass.strength = params.bloomStrength;
                bloomPass.radius = params.bloomRadius;
                return bloomPass;
            },
            createBloomComposer() {
                let bloomComposer = new EffectComposer(renderer);
                bloomComposer.renderToScreen = false;
                bloomComposer.addPass(renderPass);
                bloomComposer.addPass(bloomPass);
                bloomComposer.addPass(outlinePass);
                return bloomComposer;
            },

            createFinalPass() {
                let finalPass = new ShaderPass(
                    new THREE.ShaderMaterial({
                        uniforms: {
                            baseTexture: {value: null},
                            bloomTexture: {value: bloomComposer.renderTarget2.texture}
                        },
                        // vertexShader: document.getElementById( 'vertexshader' ).textContent,
                        vertexShader: `varying vec2 vUv;
                          void main() {
                            vUv = uv;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                          }`,
                        fragmentShader: `uniform sampler2D baseTexture;
                          uniform sampler2D bloomTexture;
                          varying vec2 vUv;
                          void main() {
                              gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
                          }`,
                        defines: {}
                    }), "baseTexture"
                );
                finalPass.needsSwap = true;
                return finalPass;
            },
            createFinalComposer() {
                let finalComposer = new EffectComposer(renderer);
                finalComposer.addPass(renderScene);
                finalComposer.addPass(effectFXAA);
                finalComposer.addPass(finalPass);
                return finalComposer;
            },

            updateContainerElement() {
                // 计算 容器元素 高宽，左偏移值，顶偏移值
                clientWidth = containerElement.clientWidth;
                clientHeight = containerElement.clientHeight;
                const rect = containerElement.getBoundingClientRect();
                offsetLeft = rect.left;
                offsetTop = rect.top;
            },
            //模型加载
            initModel(paramsThree) {
                LOAD_PARAMS = paramsThree;
                let glbname = paramsThree.modelName;
                // 实例化加载器
                let loader = new GLTFLoader();
                loader.load('/3d/' + glbname + '.glb', function (obj) {
                    document.getElementById("loadingText").style.display = "none";
                    obj.scene.position.y = LOAD_PARAMS.offsetY;
                    obj.scene.name = LOAD_PARAMS.name;
                    if (scene !== null && glbname === LOAD_PARAMS.modelName) { // 当前对应的模型和加载完成的模型一致时才放到场景中
                        obj.scene.traverse(function (child) {
                            if (child.isMesh) {
                                child.material.emissive = child.material.color;
                                child.material.emissiveMap = child.material.map;
                            }
                        });
                        scene.add(obj.scene);
                        console.log("scene", scene, obj);
                        // window.scene = scene;

                        //遍历调用者和调用者的所有后代
                        itemList = [];
                        lightList = [];
                        scene.traverse(item => {
                            if (item.name.includes("floor")) {
                                //地板设置为网状
                                console.log("floor", item);
                                item.material.wireframe = true;
                                item.material.color.set(0x00ffff);
                            } else {
                                itemList.push(item);
                            }
                            if (item.material && item.material.name.includes("light")) {
                                //获取灯的列表
                                lightList.push(item);
                                //设置灯的层级
                                item.layers.enable(BLOOM_SCENE);
                            }
                        });

                        console.log("light", lightList);
                        // window.lightList = lightList;
                        console.log("itemList", itemList);

                    }
                }, function (progressEvent) {
                    // console.log("handleProgress", progressEvent.loaded, progressEvent.total);
                    document.getElementById("loadingText").innerText = `加载模型中:${(progressEvent.loaded / progressEvent.total * 100).toFixed(0)}%`;
                    // console.log((progressEvent.loaded / progressEvent.total * 100) + '% loaded')
                }, function (error) {
                    // console.error('load error!')
                })
            },
            clearModel() {
                let that = this;
                if (scene) {
                    let objM = scene.getObjectByName(LOAD_PARAMS.name);
                    if (objM) scene.remove(objM)
                }
            },
            animate() {
                // window.camera = camera;
                //添加outline
                raycaster.setFromCamera(mouse, camera);
                const intersection = raycaster.intersectObjects(itemList);
                if (intersection.length > 0) {
                    // console.log("intersection",intersection);
                    // console.log("intersection",intersection.map(i=>i.object.name));

                    const p = this.getGuizi(intersection[0].object);
                    if (p != null) {
                        outlinePass.selectedObjects = [p];

                        // console.log("mousePosition", mousePosition);

                        // 名称提示
                        nameBox.innerHTML = p.name;
                        nameBox.style.display = "block";
                        nameBox.style.top = mousePosition.y + "px"; // 跟随鼠标的位置
                        nameBox.style.left = mousePosition.x + 30 + "px";
                    } else {
                        outlinePass.selectedObjects = [];
                        nameBox.style.display = "none";
                    }
                } else {
                    outlinePass.selectedObjects = [];
                    nameBox.style.display = "none";
                }

                this.render();
                // this.stats.update();

                requestAnimationFrame(this.animate);
            },
            render() {
                // stats.update();
                switch (params.scene) {
                    case 'Scene only':
                        renderer.render(scene, camera);
                        break;
                    case 'Glow only':
                        this.renderBloom(false);
                        // finalComposer.render();
                        break;
                    case 'Scene with Glow':
                    default:
                        // render scene with bloom
                        this.renderBloom(true);
                        // render the entire scene, then render bloom scene on top
                        finalComposer.render();
                        break;
                }
            },
            renderBloom(mask) {
                if (mask === true) {
                    scene.traverse(this.darkenNonBloomed);
                    bloomComposer.render();
                    scene.traverse(this.restoreMaterial);
                } else {
                    camera.layers.set(BLOOM_SCENE);
                    bloomComposer.render();
                    camera.layers.set(ENTIRE_SCENE);
                }
            },
            darkenNonBloomed(obj) {
                if (obj.isMesh && bloomLayer.test(obj.layers) === false) { //不属于bloomLayer这一层的网格，
                    this.materials[obj.uuid] = obj.material;
                    obj.material = darkMaterial;
                }
            },
            restoreMaterial(obj) {
                if (this.materials[obj.uuid]) {
                    obj.material = this.materials[obj.uuid];
                    delete this.materials[obj.uuid];
                }
            },
            resize() {
                this.updateContainerElement();
                //解决拉伸的问题。将相机的宽高比设置为canvas的宽高比
                camera.aspect = clientWidth / clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(clientWidth, clientHeight);
                bloomComposer.setSize(clientWidth, clientHeight);
                finalComposer.setSize(clientWidth, clientHeight);
            },
            onMouseMove(event) {
                event.preventDefault();
                mousePosition.x = event.clientX;
                mousePosition.y = event.clientY;

                mouse.x = ((event.clientX-offsetLeft) / clientWidth) * 2 - 1;
                mouse.y = -((event.clientY-offsetTop) / clientHeight) * 2 + 1;
                // //render();
                // animate();
            },
            getGuizi(object3d) {
                let p = object3d;
                while (p && (!p.name.includes("guiti") && !p.name.includes("柜") && !p.name.includes("器") && !p.name.includes("AH") && !p.name.includes("屏"))) {
                    p = p.parent;
                }
                // console.log("object3d",p);
                return p;
            },
            onDocumentMouseClick(event) {
                event.preventDefault();
                mouse.x = (event.clientX-offsetLeft / clientWidth) * 2 - 1;
                mouse.y = -(event.clientY-offsetTop / clientHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                // var intersects = raycaster.intersectObjects( scene.children );
                let intersects = raycaster.intersectObjects(lightList);
                if (intersects.length > 0) {
                    console.log("intersects", intersects[0].object);
                } else {
                    console.log("intersects", intersects);
                }

                if (intersects && intersects.length > 0) {
                    var object = intersects[0].object;
                    object.layers.toggle(BLOOM_SCENE);
                    // //render();
                }
            }
        }
    }
</script>


<style lang="less" scoped>

    body {
        margin: 0;
    }

    .container-3d {
        width: 82vw;
        height: 84vh;
        /*margin: 10px;*/
    }

    #name-box {
        position: absolute;
        color: white;
        font-size: 16px;
        font-weight: 600;
        padding: 15px;
        background-color: rgba(15, 15, 200, 0.774);
        pointer-events: none;
        border-radius: 10px;
    }
</style>