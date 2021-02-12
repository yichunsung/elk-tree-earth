import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { mashMaterialParams, state } from './planetService.js';

const ThreePage = () => {

  const [cube, setCube] = useState(null);

  useEffect(() => {
    run();
  }, []);

  const container = useRef();
  
  const run = () => {
    let scene, renderer, camera, cube, base, sphere;
    // let container = document.getElementById('output');
    // 
    // 初始化場景、渲染器、相機、物體
    const init = () => {
      scene = new THREE.Scene();
      // 建立渲染器
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight); // 場景大小
      renderer.setClearColor(state.background, 1.0); // 預設背景顏色
      renderer.shadowMap.enable = true; // 陰影效果

      // 將渲染器的 DOM 綁到網頁上
      container.current.appendChild(renderer.domElement);

      // 建立相機
      camera = new THREE.PerspectiveCamera(
        15,
        window.innerWidth / window.innerHeight,
        0.1,
        300
      );
      camera.position.set(40, 8, 15);
      camera.lookAt(scene.position);

      let cameraControl = new OrbitControls(camera, renderer.domElement);

      cameraControl.enableDamping = true;
      cameraControl.dampingFactor = 0.25;
      cameraControl.enableZoom = false;

      // 建立光源
      let pointLight = new THREE.PointLight(0xffffff);
      pointLight.position.set(30, 10, -10);
      scene.add(pointLight);

      // 建立物體
      const geometry = new THREE.BoxGeometry(1, 1, 1) // 幾何體
      const baseGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5) // 幾何體
      const material = new THREE.MeshPhongMaterial({
        color: 0x9999ff
      }); // 材質
      const baseMaterial = new THREE.MeshPhongMaterial({
        color: 0xcc0000
      }); // 材質

      // Ball
      const ball = new THREE.SphereGeometry( 5, 32, 32 );
      const ballMaterial = new THREE.MeshPhongMaterial(mashMaterialParams());
      const sphere = new THREE.Mesh( ball, ballMaterial );

      scene.add(sphere);

      //cube = new THREE.Mesh(geometry, material); // 建立網格物件
      //cube.position.set(0, 1, 0);
      //cube.rotation.x = 10;
      //cube.rotation.y = 10;
      
      setCube(sphere);
      //scene.add(cube);

      base = new THREE.Mesh(baseGeometry, baseMaterial); // 建立網格物件
      base.position.set(0, -0.25, 0);
      //cube.rotation.x = 10;
      //cube.rotation.y = 10;
      // 加入場景
      scene.add(base);
    }

    /*const animate = () => {
      cube.rotation.x += 0.06;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.03;
    }*/

    const render = () => {
      // animate();
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

    init();
    render();
  }

  const animate = () => {
    cube.rotation.x += 0.06;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.03;
  }

  return (
    <main>
      <div className="three-start-button" onClick={ () => { animate() } }>START</div>
      <div ref={ container }></div>
    </main>
  )
}

export default ThreePage;
