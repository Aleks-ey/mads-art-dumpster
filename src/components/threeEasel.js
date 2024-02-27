import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const EaselScene = () => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(-1, 5.5, 3);
    camera.lookAt(-3, 0, -10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    container.appendChild(renderer.domElement);

    // Ambient light (general illumination, no shadows)
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // scene.add(ambientLight);

    // Spotlight (directed, can cast shadows)
    const spotlight = new THREE.SpotLight(0xffffff, 20);
    spotlight.position.set(0, 10, 8);
    spotlight.angle = Math.PI / 6; // Narrow spotlight cone
    spotlight.penumbra = 0.4; // Soft edge
    spotlight.decay = 1.9;
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 512; // Shadow resolution
    spotlight.shadow.mapSize.height = 512;
    spotlight.target.position.set(0, 0, -8); // Spotlight points at the easel
    scene.add(spotlight.target);
    scene.add(spotlight);

    // Ground plane (to receive shadows)
    const planeGeometry = new THREE.PlaneGeometry(30, 30);
    // const planeMaterial = new THREE.ShadowMaterial({ opacity: 1 }); // ShadowMaterial is invisible but receives shadows
    const planeMaterial = new THREE.MeshPhongMaterial( { color: 0x808080 } )
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Rotate to lie flat
    plane.position.x = 4; // slighty to the right
    plane.position.y = -1; // Just below the easel
    plane.receiveShadow = true; // This plane should receive shadows
    scene.add(plane);

    // Wall plane (to receive shadows)
    const wallGeometry = new THREE.PlaneGeometry(30, 30);
    const wallMaterial = new THREE.MeshPhongMaterial( { color: 0x808080 } )
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.rotation.x = 0;
    plane.position.x = 4; // slighty to the right
    wall.position.y = 0;
    wall.position.z = -10; // just behind the easel
    plane.receiveShadow = true;
    scene.add(wall);

    // const helper = new THREE.CameraHelper( spotlight.shadow.camera );
    // scene.add( helper );

    // GLTF model loading
    const loader = new GLTFLoader();
    loader.load(
      'wooden_easel/scene.gltf',
      (gltf) => {
        const easel = gltf.scene;
        easel.position.set(0, 2, 0);
        easel.scale.set(1.5, 1.5, 1.5);
        easel.castShadow = true; // Easel will cast a shadow
        easel.receiveShadow = true; // Easel can also receive shadows
        scene.add(easel);
      },
      undefined,
      (error) => console.error('An error happened', error)
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => container && container.removeChild(renderer.domElement);
  }, []);

  return <div id="easel-container" ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default EaselScene;


