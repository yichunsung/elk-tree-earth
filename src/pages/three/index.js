import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreePage = () => {

  useEffect(() => {
    run();
  }, []);

  const container = useRef();
  
  const run = () => {
    console.log('Run');

    let scene, renderer, camera, cube;
    // let container = document.getElementById('output');
    // 初始化場景、渲染器、相機、物體
    const init = () => {
      scene = new THREE.Scene();
      // 建立渲染器
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight) // 場景大小
      renderer.setClearColor(0xeeeeee, 1.0) // 預設背景顏色
      renderer.shadowMap.enable = true // 陰影效果

      // 將渲染器的 DOM 綁到網頁上
      container.current.appendChild(renderer.domElement);

      // 建立相機
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      )
      camera.position.set(10, 10, 10)
      camera.lookAt(scene.position)

      // 建立光源
      let pointLight = new THREE.PointLight(0xffffff)
      pointLight.position.set(10, 10, -10)
      scene.add(pointLight)

      // 建立物體
      const geometry = new THREE.BoxGeometry(1, 1, 1) // 幾何體
      const material = new THREE.MeshPhongMaterial({
        color: 0x0000ff
      }) // 材質
      cube = new THREE.Mesh(geometry, material) // 建立網格物件
      cube.position.set(0, 0, 0)
      scene.add(cube)
    }

    const animate = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
    }

    const render = () => {
      animate();
      requestAnimationFrame(render);
      renderer.render(scene, camera)
    }

    init();
    render();
  }

  return (
    <main>
      <div ref={ container }></div>
    </main>
  )
}

export default ThreePage;