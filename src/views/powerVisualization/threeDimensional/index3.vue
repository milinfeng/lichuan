<template>
        <div class="container3d" style="width: 100vw;height:100vh;">
        </div>
</template>

<script>
    import * as THREE from 'three'
    import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
    
    var scene = '';
    export default {
        props: {},
        data() {
            return {
                // scene: '',
                light: '',
                camera: '',
                controls: '',
                renderer: ''
            }
        },
        methods: {
            // 初始化three.js相关内容
            init() {
               scene = new THREE.Scene()
               scene.add(new THREE.AmbientLight(0x999999)) // 环境光
                //scene.background
                this.light = new THREE.DirectionalLight(0xdfebff, 0.45) // 从正上方（不是位置）照射过来的平行光，0.45的强度
                this.light.position.set(100, 600, 400)
                this.light.position.multiplyScalar(0.3)
                this.light.shadow.camera.near = 20 // 产生阴影的最近距离
                this.light.shadow.camera.far = 20000 // 产生阴影的最远距离
                this.light.shadow.camera.left = -500 // 产生阴影距离位置的最左边位置
                this.light.shadow.camera.right = 500 // 最右边
                this.light.shadow.camera.top = 500 // 最上边
                this.light.shadow.camera.bottom = -500 // 最下面

                // 光源开启阴影
                this.light.castShadow = true
                this.light.shadow.mapSize = new THREE.Vector2(1024, 1024)
                var helper = new THREE.DirectionalLightHelper(this.light, 5)
               scene.add(helper)
               scene.add(this.light)

                // 初始化相机
                this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
                this.camera.position.set(100, 0, 100)
                this.renderer = new THREE.WebGLRenderer({
                    alpha: true
                })
                // this.renderer.setClearColor(0xff0000) // 设置背景颜色
                this.renderer.setPixelRatio(window.devicePixelRatio) // 为了兼容高清屏幕
                this.renderer.setSize(window.innerWidth, window.innerHeight) // 改成这样就可以居中
                this.renderer.shadowMap.enabled = true

                const container = document.querySelector('.container3d') // threeJS挂载位置
                container.appendChild(this.renderer.domElement)
                window.addEventListener('resize', this.onWindowResize, false) // 添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）

                // 初始化控制器
                this.controls = new OrbitControls(this.camera, this.renderer.domElement)
                this.controls.target.set(0, 0, 0) // ------------------
                this.controls.minDistance = 80
                this.controls.maxDistance = 500000
                this.controls.maxPolarAngle = Math.PI / 3
                this.controls.update()
            },
            // 窗口监听函数
            onWindowResize() {
                this.camera.aspect = window.innerWidth / window.innerHeight
                this.camera.updateProjectionMatrix()
                this.renderer.setSize(window.innerWidth, window.innerHeight)
            },
            render() {
                requestAnimationFrame(this.render)
                this.renderer.render(this.scene, this.camera)
            },
            // 外部模型加载函数
            loadGltf() {
                const that = this
                // 加载模型
                var loader = new GLTFLoader()
                loader.setPath('3d/')
                loader.load('D1-D6.glb', function (gltf) {
                    // 就是两个模型 这个是动态的,下面是静态的,这些从sketchfab上面下载即可
                    gltf.scene.traverse((object) => {
                        if (object.isMesh) {
                            // 修改模型的材质
                            console.log(object)
                            object.castShadow = true
                            object.receiveShadow = true
                        }
                    })
                    gltf.scene.receiveShadow = true
                    scene.add(gltf.scene)
                })
            },
            addGeometry() {
                const floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1)
                const floorMaterial = new THREE.MeshPhongMaterial({
                    color: 0x77f28f,
                    shininess: 0
                    // wireframe: true
                })
                const floor = new THREE.Mesh(floorGeometry, floorMaterial)
                floor.rotation.x = -0.5 * Math.PI
                floor.position.y = -2.1
                // 地板接受阴影开启
                floor.receiveShadow = true
               scene.add(floor)
            }
        },
        mounted() {
            this.init()
            this.loadGltf()
            this.render()
            this.addGeometry()
            window.that = this
        },
        components: {}
    };
</script>

<style scoped lang="less">

</style>
