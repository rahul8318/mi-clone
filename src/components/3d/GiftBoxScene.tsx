import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { create3DGiftBox, createHeartGeometry, GiftBoxParts } from './ProceduralModels';
import confetti from 'canvas-confetti';

export interface GiftBoxHandle {
  open: () => void;
  reset: () => void;
}

interface GiftBoxSceneProps {
  onBoxOpen?: () => void;
}

export const GiftBoxScene = forwardRef<GiftBoxHandle, GiftBoxSceneProps>(({ onBoxOpen }, ref) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const giftBoxRef = useRef<GiftBoxParts | null>(null);
  const triggerOpenRef = useRef<() => void>(() => {});
  const triggerResetRef = useRef<() => void>(() => {});

  useImperativeHandle(ref, () => ({
    open: () => {
      triggerOpenRef.current();
    },
    reset: () => {
      triggerResetRef.current();
    },
  }));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.8, 5.2);
    camera.lookAt(0, 0.7, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xf8c8dc, 1.6, 8);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Ground platform / pedestal
    const pedestalGeom = new THREE.CylinderGeometry(1.8, 2.0, 0.15, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xfff0f5,
      roughness: 0.3,
      metalness: 0.1,
    });
    const pedestal = new THREE.Mesh(pedestalGeom, pedestalMat);
    pedestal.position.y = -0.08;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // 3D Gift Box
    const giftBox = create3DGiftBox();
    scene.add(giftBox.group);
    giftBoxRef.current = giftBox;

    // Bursting 3D hearts & petals from inside the box
    interface BurstItem {
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      rotVelocity: THREE.Vector3;
      life: number;
    }
    const burstItems: BurstItem[] = [];

    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xff3366,
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0xff1744,
      emissiveIntensity: 0.5,
    });

    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xf8c8dc,
      roughness: 0.3,
      side: THREE.DoubleSide,
    });

    let isBoxOpened = false;

    function burstInsideBox() {
      // 3D Three.js bursting particles
      for (let i = 0; i < 28; i++) {
        const isHeart = Math.random() > 0.4;
        let mesh: THREE.Mesh;

        if (isHeart) {
          mesh = new THREE.Mesh(createHeartGeometry(0.25 + Math.random() * 0.2, 0.12), heartMat);
        } else {
          const petalGeom = new THREE.SphereGeometry(0.18, 8, 8);
          petalGeom.scale(0.5, 1, 0.1);
          mesh = new THREE.Mesh(petalGeom, petalMat);
        }

        mesh.position.set(
          (Math.random() - 0.5) * 0.6,
          1.2,
          (Math.random() - 0.5) * 0.6
        );

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 0.4;
        const speed = 0.05 + Math.random() * 0.06;

        const velocity = new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.cos(phi) * (speed * 1.6) + 0.03,
          Math.sin(phi) * Math.sin(theta) * speed
        );

        const rotVelocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        );

        scene.add(mesh);
        burstItems.push({ mesh, velocity, rotVelocity, life: 1.0 });
      }

      // Also trigger a shower of pastel confetti
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#F8C8DC', '#D8C9F5', '#EFA6B8', '#FFF8F0', '#FF69B4'],
      });
    }

    const openBox = () => {
      if (isBoxOpened) return;
      isBoxOpened = true;
      giftBox.openBox();
      burstInsideBox();

      setTimeout(() => {
        if (onBoxOpen) onBoxOpen();
      }, 700);
    };

    const resetBox = () => {
      isBoxOpened = false;
      giftBox.closeBox();
    };

    triggerOpenRef.current = openBox;
    triggerResetRef.current = resetBox;

    // Click on Box
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouseVector, camera);
      const hits = raycaster.intersectObjects(giftBox.group.children, true);

      if (hits.length > 0) {
        openBox();
      }
    };

    container.addEventListener('click', handleClick);

    // Parallax
    let mouseX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = clock.getElapsedTime();

      // Gift Box animation
      giftBox.update(time);

      // Subtle float & rotation
      giftBox.group.position.y = Math.sin(time * 1.8) * 0.05;
      giftBox.group.rotation.y = time * 0.25 + mouseX * 0.4;

      // Update Burst items
      for (let i = burstItems.length - 1; i >= 0; i--) {
        const item = burstItems[i];
        item.mesh.position.add(item.velocity);
        item.velocity.y -= 0.0018; // gravity
        item.mesh.rotation.x += item.rotVelocity.x;
        item.mesh.rotation.y += item.rotVelocity.y;
        item.mesh.rotation.z += item.rotVelocity.z;
        item.life -= 0.01;

        const scale = Math.max(0, item.life);
        item.mesh.scale.set(scale, scale, scale);

        if (item.life <= 0) {
          scene.remove(item.mesh);
          burstItems.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

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
  }, [onBoxOpen]);

  return (
    <div
      ref={mountRef}
      className="w-full h-[360px] sm:h-[420px] md:h-[480px] relative cursor-pointer select-none"
      title="Click the gift box to open your surprise! 🎁"
    />
  );
});

GiftBoxScene.displayName = 'GiftBoxScene';
