import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

function LittleTokyo() {

  const [cube, setCube] = useState(null);

  const cubContainer = useRef();

  useEffect(() => {
    main();
  }, []);

  const main = () => {
    let scene, renderer, camera, wall;

    const init = () => {
      scene = new THREE.Scene();
      // Renderer building.
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight); // 場景大小
      renderer.setClearColor(0x1a1a1a, 1.0); // 預設背景顏色
      renderer.shadowMap.enable = true; // 陰影效果

      // 將渲染器的 DOM 綁到網頁上
      cubContainer.current.appendChild(renderer.domElement);

      // 建立相機
      camera = new THREE.PerspectiveCamera(
        15,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(20, 20, 40);
      camera.lookAt(scene.position);

      let cameraControl = new OrbitControls(camera, renderer.domElement);

      cameraControl.enableDamping = true;
      cameraControl.dampingFactor = 0.25;
      cameraControl.enableZoom = true;

      // 建立光源
      let pointLight = new THREE.AmbientLightProbe(0xffffff, 2);
      pointLight.position.set(-10, 20, 20)
      scene.add(pointLight);

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

        headMaterials.push(new THREE.MeshStandardMaterial({ map: map }))
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
      const planeGeometry = new THREE.PlaneGeometry(10, 10, 32, 32); // 幾何體
      const planeMaterial = new THREE.MeshStandardMaterial({
        transparent: false,
        metalness: 0.8,
        opacity: 1,
        wireframe: false,
        map: grassMap
      }); // 材質

      wall = new THREE.Mesh(geometry, headMaterials); // 建立網格物件
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      wall.position.set(0, 0, 0);
      plane.position.set(0, -1, 0);
      plane.rotation.x = -0.5 * Math.PI;
      // scene.add(wall);
      // scene.add(plane);
      

      // envmap
      const path = '/';
      const format = '.jpg';
      const envMap = new THREE.CubeTextureLoader().load( [
        path + 'posx' + format, path + 'negx' + format,
        path + 'posy' + format, path + 'negy' + format,
        path + 'posz' + format, path + 'negz' + format
      ] );
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath( '/draco/gltf/' );

      const loader = new GLTFLoader();
      loader.setDRACOLoader( dracoLoader );
      loader.load( '/LittlestTokyo.glb', function ( gltf ) {
        console.log(gltf);
        const model = gltf.scene;
        model.position.set( 1, 1, 0 );
        model.scale.set( 0.01, 0.01, 0.01 );
        model.traverse( function ( child ) {
        
        if ( child.isMesh ) {
          child.material.envMap = envMap;
        }

      });

        scene.add( model );
      }, undefined, function ( e ) {

        console.error( e );

      });
      setCube(wall);
    }

    const render = () => {
      // animate();
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

    init();
    render();
  }
  
  return (
    <main>
      <div ref={ cubContainer }></div>
    </main>
  )

}

export default LittleTokyo;
