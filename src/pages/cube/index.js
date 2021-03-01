import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

let scaleHeadOffsetData = 0;

function CubePage() {

  const [cube, setCube] = useState(null);

  const [scaleHeadOffset, setScaleHeadOffset] = useState(0);

  const cubContainer = useRef();

  useEffect(() => {
    main();
  }, []);

  const main = () => {
    let scene, renderer, camera, wall;
    let sphereLightMesh, pointLight
    let rotateAngle = 0
    let cameraControl

    const init = () => {
      scene = new THREE.Scene();
      // 渲染器設定
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x1a1a1a, 1.0); // 預設背景顏色
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = 2; // THREE.PCFSoftShadowMap

      cubContainer.current.appendChild(renderer.domElement);
      // 相機設定
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(20, 20, 40);
      camera.lookAt(scene.position);

      let axes = new THREE.AxesHelper(20);
      scene.add(axes);

      cameraControl = new OrbitControls(camera, renderer.domElement);

      cameraControl.enableDamping = true;
      cameraControl.dampingFactor = 0.25;
      cameraControl.enableZoom = true;

      const headMap = new THREE.TextureLoader()
        .load('/wall.jpg');
      const skinMap = new THREE.TextureLoader()
        .load('/wall-3.jpg');
      const roadMap = new THREE.TextureLoader()
        .load('/road.jpg');
      const grassMap = new THREE.TextureLoader()
        .load('/grass.jpg');

      // 準備頭部與臉的材質
      const headMaterials = []
      for (let i = 0; i < 6; i++) {
        let map
        if (i === 4) {
          map = skinMap
        } else {
          map = headMap
        }

        headMaterials.push(new THREE.MeshLambertMaterial({ map: map }))
      }

      // 建立物體
      // 牆
      const geometry = new THREE.BoxGeometry(1, 2, 5); // 幾何體
      const material = new THREE.MeshStandardMaterial({
        transparent: false,
        metalness: 0.1,
        opacity: 1,
        wireframe: false,
        map: headMap
      }); // 材質

      // 地板
      const planeGeometry = new THREE.PlaneGeometry(30, 30, 32, 32); // 幾何體
      const planeMaterial = new THREE.MeshStandardMaterial({
        transparent: false,
        metalness: 0.8,
        opacity: 1,
        wireframe: false,
        map: grassMap
      }); // 材質

      const planeMaterial2 = new THREE.MeshLambertMaterial({ color: 0x333333 })

      wall = new THREE.Mesh(geometry, headMaterials); // 建立網格物件
      let plane = new THREE.Mesh(planeGeometry, planeMaterial2);
      wall.position.set(0, 0, 0);
      wall.castShadow = true;
      
      plane.position.set(0, -1, 0);
      plane.receiveShadow = true;
      plane.rotation.x = -0.5 * Math.PI;
      
      scene.add(plane);
      scene.add(wall);
      
      setCube(wall);
      
      // 建立光源
      let ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      // 設置聚光燈幫忙照亮物體
      let spotLight = new THREE.SpotLight(0xf0f0f0);
      spotLight.position.set(-20, 40, 20);
      // spotLight.castShadow = true
      scene.add(spotLight);

      // 移動點光源
      pointLight = new THREE.PointLight(0xccffcc, 1, 100); // 顏色, 強度, 距離
      pointLight.castShadow = true; // 投影
      pointLight.position.set(-10, 30, 20)
      scene.add(pointLight);

      

      // 小球體模擬點光源實體
      const sphereLightGeo = new THREE.SphereGeometry(2, 32, 32);
      const sphereLightMat = new THREE.MeshStandardMaterial({ color: 0xff6600 });
      sphereLightMesh = new THREE.Mesh(sphereLightGeo, sphereLightMat);
      sphereLightMesh.position.set(-10, 10, 20)
      sphereLightMesh.castShadow = true;
      // sphereLightMesh.position.y = 5;
      scene.add(sphereLightMesh);

    }

    const pointLightAnimation = () => {
      if (rotateAngle > 2 * Math.PI) {
        rotateAngle = 0 // 超過 360 度後歸零
      } else {
        rotateAngle += 0.03 // 遞增角度
      }

      // 光源延橢圓軌道繞 Y 軸旋轉
      sphereLightMesh.position.x = 8 * Math.cos(rotateAngle);
      sphereLightMesh.position.z = 4 * Math.sin(rotateAngle);
      console.log(8 * Math.cos(rotateAngle));
      console.log(4 * Math.cos(rotateAngle));
      // 點光源位置與球體同步
      pointLight.position.copy(sphereLightMesh.position);
    }

    let scaleHeadOffset = 0;

    const scaleBody = () => {
      scaleHeadOffset += 0.04
      // setScaleHeadOffset(scaleHeadOffset => scaleHeadOffset += 4);
      let scaleRate = Math.abs(Math.sin(scaleHeadOffset)) / 16 + 1
      wall.scale.set(scaleRate, scaleRate, scaleRate);
    }

    const render = () => {
      cameraControl.update();
      // animate();
      // pointLightAnimation();
      // scaleBody();
      requestAnimationFrame(render);
      renderer.render(scene, camera);

    }
    init();
    render();
  }

  const check = () => {
    setScaleHeadOffset(scaleHeadOffset => scaleHeadOffset += 4);
    let scaleRate = Math.abs(Math.sin(scaleHeadOffset)) / 16 + 1
    cube.scale.set(scaleRate, scaleRate, scaleRate);
  }
  
  
  return (
    <main>
       <div className="three-start-button" onClick={ () => { check() } }>START</div>
      <div ref={ cubContainer }></div>
    </main>
  )

}

export default CubePage;
