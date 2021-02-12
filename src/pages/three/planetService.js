import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const state = {
  background: 0x1a1a1a
};

export const mashMaterialParams = () => {
	return {
		color: 0x016894,
    transparent: false,
    opacity: 1,
    wireframe: false
	}
};

export const cubePruducer = () => {
  // 建立物體
  const geometry = new THREE.BoxGeometry(1, 1, 1); // 幾何體
  // 材質
  const material = new THREE.MeshPhongMaterial(
    {
      color: 0x9999ff
    }
  ); // 材質

};

