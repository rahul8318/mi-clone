import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCuteTeddyBear, createFlowerMesh, TeddyBearParts } from './ProceduralModels';

interface HeroSceneProps {
  onTeddyClick?: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ onTeddyClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const teddyPartsRef = useRef<TeddyBearParts | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 6.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff0f5, 1.8);
    mainLight.position.set(4, 6, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xd8c9f5, 1.0);
    rimLight.position.set(-5, 3, -3);
    scene.add(rimLight);

    const warmFill = new THREE.PointLight(0xf8c8dc, 1.2, 10);
    warmFill.position.set(0, -2, 3);
    scene.add(warmFill);

    // Cute Teddy Bear
    const teddy = createCuteTeddyBear();
    teddy.group.position.set(0, -0.7, 0);
    scene.add(teddy.group);
    teddyPartsRef.current = teddy;

    // Floating 3D Flowers
    const flowers: { group: THREE.Group; initialY: number; speed: number; rotSpeed: { x: number; y: number; z: number } }[] = [];
    const flowerColors = [0xf8c8dc, 0xd8c9f5, 0xefa6b8, 0xffe4e1];
    
    for (let i = 0; i < 9; i++) {
      const color = flowerColors[i % flowerColors.length];
      const flower = createFlowerMesh(color);
      
      const angle = (i / 9) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const radius = 2.4 + Math.random() * 1.5;
      const x = Math.cos(angle) * radius;
      const y = -1.2 + Math.random() * 2.8;
      const z = (Math.random() - 0.5) * 2;

      flower.position.set(x, y, z);
      const scale = 0.45 + Math.random() * 0.35;
      flower.scale.set(scale, scale, scale);
      scene.add(flower);

      flowers.push({
        group: flower,
        initialY: y,
        speed: 0.8 + Math.random() * 0.8,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
      });
    }

    // Tiny Glowing Particles
    const particleCount = 60;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      opacities[i] = Math.random();
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 230, 240, 1)');
      grad.addColorStop(0.5, 'rgba(248, 200, 220, 0.6)');
      grad.addColorStop(1, 'rgba(248, 200, 220, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.22,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse Parallax & Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Raycaster for clicking teddy
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(teddy.group.children, true);

      if (intersects.length > 0) {
        // Trigger little hop animation & notify parent
        teddyHop = 0.35;
        if (onTeddyClick) onTeddyClick();
      }
    };

    container.addEventListener('click', handleClick);

    let teddyHop = 0;
    let isVisible = true;
    let animationFrameId: number;

    // Intersection Observer to pause rendering when not in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = clock.getElapsedTime();

      // Update Teddy
      teddy.updateAnimation(time);

      // Mouse tracking
      targetRotY = mouseX * 0.35;
      targetRotX = -mouseY * 0.15;
      teddy.group.rotation.y += (targetRotY - teddy.group.rotation.y) * 0.05;
      teddy.group.rotation.x += (targetRotX - teddy.group.rotation.x) * 0.05;

      // Hop physics
      if (teddyHop > 0) {
        teddy.group.position.y = -0.7 + Math.sin(teddyHop * Math.PI) * 0.4;
        teddyHop -= 0.02;
        if (teddyHop <= 0) {
          teddyHop = 0;
          teddy.group.position.y = -0.7;
        }
      }

      // Update Flowers
      flowers.forEach((f) => {
        f.group.position.y = f.initialY + Math.sin(time * f.speed) * 0.25;
        f.group.rotation.x += f.rotSpeed.x;
        f.group.rotation.y += f.rotSpeed.y;
        f.group.rotation.z += f.rotSpeed.z;
      });

      // Update Particles
      const pos = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += Math.sin(time + i) * 0.003;
        if (pos[i * 3 + 1] > 3) pos[i * 3 + 1] = -3;
      }
      particleGeometry.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onTeddyClick]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] relative cursor-pointer select-none"
      title="Click the teddy for a warm reaction! 🧸"
    />
  );
};
